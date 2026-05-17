// AWS Lambda handler — Planeta Consciente form intake
// Runtime: Node.js 20.x | Architecture: arm64 | Memory: 256 MB | Timeout: 10 s
//
// Sends an email to TO_EMAIL via Amazon SES whenever a form is submitted on the site.
// Handles two form types via the `form_type` field in the payload:
//   - "contact"   (general contact form)
//   - "volunteer" (volunteer application form)
//
// Designed for a Lambda Function URL (simplest) but also works with API Gateway.
//
// Required environment variables:
//   FROM_EMAIL           — verified SES sender (e.g. "no-reply@planetaconsciente.org")
//   TO_EMAIL             — destination for general contacts (e.g. "contacto@planetaconsciente.org")
//   TO_EMAIL_VOLUNTEERS  — destination for volunteer applications (e.g. "planetaconscienteao@gmail.com")
//                          OPTIONAL — falls back to TO_EMAIL when unset
//   REPLY_TO             — optional, defaults to FROM_EMAIL
//   AWS_REGION           — set automatically by Lambda; SES must exist in this region
//   ALLOWED_ORIGINS      — comma-separated list, e.g. "https://planetaconsciente.org,https://www.planetaconsciente.org"
//
// IAM permissions (least privilege):
//   ses:SendEmail on the verified identity

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({}); // region inherited from AWS_REGION env

const ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(origin) {
  const allowOrigin =
    ALLOWED.length === 0 || ALLOWED.includes(origin)
      ? origin || "*"
      : ALLOWED[0];
  return {
    "Access-Control-Allow-Origin":  allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age":       "86400",
    "Content-Type":                 "application/json",
  };
}

function jsonResponse(status, body, origin) {
  return {
    statusCode: status,
    headers:    corsHeaders(origin),
    body:       JSON.stringify(body),
  };
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function row(label, value) {
  return `<tr><td style="padding:6px 0;color:#0A2E1F77;width:160px;vertical-align:top">${escapeHtml(label)}</td><td>${escapeHtml(value || "—")}</td></tr>`;
}

// ─── Contact form mapping ─────────────────────────────────────────────────────
function buildContactEmail(d) {
  const subject = `[planetaconsciente.org] ${d.interest} — ${d.name}`;

  const text = [
    `Novo contacto via website`,
    `--------------------------------`,
    `Idioma:      ${d.locale || "pt"}`,
    `Interesse:   ${d.interest}`,
    ``,
    `Nome:        ${d.name}`,
    `Email:       ${d.email}`,
    `Telefone:    ${d.phone || "—"}`,
    `Organização: ${d.org || "—"}`,
    ``,
    `Mensagem:`,
    d.message,
    ``,
    `--`,
    `Enviado em ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:640px;margin:auto;background:#FAF7F0;padding:32px;border-radius:16px;color:#0A2E1F">
      <p style="margin:0;color:#0A2E1F77;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Planeta Consciente</p>
      <h2 style="margin:6px 0 8px;font-family:Georgia,serif;color:#1E5A3E">Novo contacto via website</h2>
      <p style="margin:0 0 24px;color:#0A2E1F99;font-size:12px">${escapeHtml(new Date().toISOString())}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tbody>
          ${row("Idioma",       d.locale)}
          ${row("Interesse",    d.interest)}
          ${row("Nome",         d.name)}
          ${row("Email",        d.email)}
          ${row("Telefone",     d.phone)}
          ${row("Organização",  d.org)}
        </tbody>
      </table>
      <hr style="border:none;border-top:1px solid #0A2E1F22;margin:20px 0" />
      <h3 style="margin:0 0 8px;font-family:Georgia,serif">Mensagem</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(d.message)}</p>
    </div>
  `;

  return { subject, text, html };
}

// ─── Volunteer form mapping ───────────────────────────────────────────────────
function buildVolunteerEmail(d) {
  const subject = `[Voluntariado] ${d.fullName} — ${d.city}`;

  const areas = Array.isArray(d.areas) ? d.areas.join(", ") : (d.areas || "");

  const text = [
    `Nova candidatura a voluntário`,
    `--------------------------------`,
    `Idioma:           ${d.locale || "pt"}`,
    ``,
    `Nome completo:    ${d.fullName}`,
    `Email:            ${d.email}`,
    `Telefone:         ${d.phone}`,
    `Data nascimento:  ${d.birthDate || "—"}`,
    `Cidade:           ${d.city}`,
    `Ocupação:         ${d.occupation}`,
    `Áreas:            ${areas}`,
    `Disponibilidade:  ${d.availability}`,
    `Como nos conheceu: ${d.howFound || "—"}`,
    ``,
    `Experiência prévia:`,
    d.experience || "—",
    ``,
    `Motivação:`,
    d.motivation,
    ``,
    `--`,
    `Enviado em ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:640px;margin:auto;background:#FAF7F0;padding:32px;border-radius:16px;color:#0A2E1F">
      <p style="margin:0;color:#0A2E1F77;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Planeta Consciente · Voluntariado</p>
      <h2 style="margin:6px 0 8px;font-family:Georgia,serif;color:#1E5A3E">Nova candidatura a voluntário</h2>
      <p style="margin:0 0 24px;color:#0A2E1F99;font-size:12px">${escapeHtml(new Date().toISOString())}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tbody>
          ${row("Nome completo",     d.fullName)}
          ${row("Email",             d.email)}
          ${row("Telefone",          d.phone)}
          ${row("Data nascimento",   d.birthDate)}
          ${row("Cidade",            d.city)}
          ${row("Ocupação",          d.occupation)}
          ${row("Áreas",             areas)}
          ${row("Disponibilidade",   d.availability)}
          ${row("Como nos conheceu", d.howFound)}
        </tbody>
      </table>
      <hr style="border:none;border-top:1px solid #0A2E1F22;margin:20px 0" />
      <h3 style="margin:0 0 8px;font-family:Georgia,serif">Experiência prévia</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0 0 16px">${escapeHtml(d.experience || "—")}</p>
      <h3 style="margin:0 0 8px;font-family:Georgia,serif">Motivação</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(d.motivation)}</p>
    </div>
  `;

  return { subject, text, html };
}

// ─── Validation per form type ─────────────────────────────────────────────────
function validate(formType, d) {
  if (formType === "volunteer") {
    if (!d.fullName || !isValidEmail(d.email) || !d.phone || !d.city || !d.occupation || !d.availability || !d.motivation) {
      return "missing_fields";
    }
    if ((d.fullName || "").length > 120 || (d.motivation || "").length > 4000) {
      return "too_long";
    }
    return null;
  }
  // default: contact
  if (!d.name || !isValidEmail(d.email) || !d.interest || !d.message) {
    return "missing_fields";
  }
  if ((d.name || "").length > 120 || (d.message || "").length > 4000) {
    return "too_long";
  }
  return null;
}

export const handler = async (event) => {
  const origin =
    event?.headers?.origin || event?.headers?.Origin || event?.headers?.ORIGIN || "";

  const method =
    event?.requestContext?.http?.method || event?.httpMethod || (event?.body ? "POST" : "GET");
  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(origin), body: "" };
  }
  if (method !== "POST") {
    return jsonResponse(405, { ok: false, error: "method_not_allowed" }, origin);
  }

  // Parse body
  let data;
  try {
    data = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" }, origin);
  }

  // Honeypot — silently accept
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return jsonResponse(200, { ok: true }, origin);
  }

  const formType = (data.form_type || "contact").toString();

  const validationError = validate(formType, data);
  if (validationError) {
    return jsonResponse(400, { ok: false, error: validationError }, origin);
  }

  const { subject, text, html } =
    formType === "volunteer" ? buildVolunteerEmail(data) : buildContactEmail(data);

  // Route to the appropriate destination
  const destination =
    formType === "volunteer"
      ? (process.env.TO_EMAIL_VOLUNTEERS || process.env.TO_EMAIL)
      : process.env.TO_EMAIL;

  const replyTo = process.env.REPLY_TO || data.email || process.env.FROM_EMAIL;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: process.env.FROM_EMAIL,
        Destination: { ToAddresses: [destination] },
        ReplyToAddresses: [replyTo],
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
            Html: { Data: html, Charset: "UTF-8" },
          },
        },
      })
    );

    return jsonResponse(200, { ok: true }, origin);
  } catch (err) {
    console.error("SES error:", err);
    return jsonResponse(500, { ok: false, error: "ses_failed" }, origin);
  }
};
