// AWS Lambda handler — Planeta Consciente contact form
// Runtime: Node.js 20.x | Architecture: arm64 | Memory: 256 MB | Timeout: 10 s
//
// Sends an email to TO_EMAIL via Amazon SES whenever the landing-page form is submitted.
// Designed for use as a Lambda Function URL (simpler) but also works with API Gateway.
//
// Required environment variables:
//   FROM_EMAIL          — verified SES sender (e.g. "no-reply@planetaconsciente.org")
//   TO_EMAIL            — destination ("planetaconscienteao@gmail.com")
//   REPLY_TO            — optional, defaults to FROM_EMAIL
//   AWS_REGION          — set automatically by Lambda; SES must exist in this region
//   ALLOWED_ORIGINS     — comma-separated list, e.g. "https://planetaconsciente.org,https://www.planetaconsciente.org"
//
// IAM permissions (least privilege):
//   ses:SendEmail on the verified identity (resource: arn:aws:ses:REGION:ACCOUNT:identity/FROM_EMAIL)

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({}); // region inherited from AWS_REGION env

const ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(origin) {
  const allowOrigin = ALLOWED.length === 0 || ALLOWED.includes(origin) ? origin || "*" : ALLOWED[0];
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

// Very small HTML escape to keep the outgoing email safe
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

export const handler = async (event) => {
  const origin =
    event?.headers?.origin || event?.headers?.Origin || event?.headers?.ORIGIN || "";

  // Preflight
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

  // Validation
  const name     = (data.name     || "").toString().trim();
  const email    = (data.email    || "").toString().trim();
  const phone    = (data.phone    || "").toString().trim();
  const org      = (data.org      || "").toString().trim();
  const interest = (data.interest || "").toString().trim();
  const message  = (data.message  || "").toString().trim();
  const locale   = (data.locale   || "pt").toString().trim();

  if (!name || !isValidEmail(email) || !interest || !message) {
    return jsonResponse(400, { ok: false, error: "missing_fields" }, origin);
  }
  if (name.length > 120 || message.length > 4000) {
    return jsonResponse(400, { ok: false, error: "too_long" }, origin);
  }

  const subject = `[planetaconsciente.org] ${interest} — ${name}`;

  const textBody = [
    `Novo contacto via landing page`,
    `--------------------------------`,
    `Idioma:      ${locale}`,
    `Interesse:   ${interest}`,
    ``,
    `Nome:        ${name}`,
    `Email:       ${email}`,
    `Telefone:    ${phone || "—"}`,
    `Organização: ${org || "—"}`,
    ``,
    `Mensagem:`,
    message,
    ``,
    `--`,
    `Enviado em ${new Date().toISOString()}`,
  ].join("\n");

  const htmlBody = `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:640px;margin:auto;background:#FAF7F0;padding:32px;border-radius:16px;color:#0A2E1F">
      <h2 style="margin:0 0 8px;font-family:Georgia,serif;color:#1E5A3E">Novo contacto via landing page</h2>
      <p style="margin:0 0 24px;color:#0A2E1F99">${escapeHtml(new Date().toISOString())}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tbody>
          <tr><td style="padding:6px 0;color:#0A2E1F77;width:140px">Idioma</td><td>${escapeHtml(locale)}</td></tr>
          <tr><td style="padding:6px 0;color:#0A2E1F77">Interesse</td><td><strong>${escapeHtml(interest)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#0A2E1F77">Nome</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#0A2E1F77">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#0A2E1F77">Telefone</td><td>${escapeHtml(phone || "—")}</td></tr>
          <tr><td style="padding:6px 0;color:#0A2E1F77">Organização</td><td>${escapeHtml(org || "—")}</td></tr>
        </tbody>
      </table>
      <hr style="border:none;border-top:1px solid #0A2E1F22;margin:20px 0" />
      <h3 style="margin:0 0 8px;font-family:Georgia,serif">Mensagem</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: process.env.FROM_EMAIL,
        Destination: { ToAddresses: [process.env.TO_EMAIL] },
        ReplyToAddresses: [process.env.REPLY_TO || email],
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: textBody, Charset: "UTF-8" },
            Html: { Data: htmlBody, Charset: "UTF-8" },
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
