# Planeta Consciente — Website v3

Multi-page bilingual site (PT / EN) for the **Associação Planeta Consciente**, the youth-led environmental movement based in Luanda · Benguela · Lisboa.

**Stack:** Vite 5 · React 18 · TypeScript · Tailwind CSS 3 · React Router 6 · AWS Lambda + Amazon SES · Amazon Amplify hosting.

---

## What's new in v3

| Area | Change |
|---|---|
| Architecture | Single-page → **multi-page** with React Router (10 routes) |
| Menu | Slimmed to 5 items: *Início · Sobre · Projectos · Voluntariado · Donativos* |
| About page | New dedicated page with mission, vision, values, objectives, areas |
| Team page | Founders + visual organisation chart + advisory council |
| Province pages | One page per location (Luanda, Benguela, Lisboa) |
| Project pages | One detail page per project (role, partners, timeline, gallery) |
| Volunteer page | Dedicated application form with structured fields |
| Donate page | IBAN with copy-to-clipboard + fundraising info |
| SDGs | Added ODS 06 (Água e Saneamento) and 07 (Energia) |
| Partners | Marquee replaced by clean logo placeholder grid |
| Privacy | Public email removed from footer — contact only via form |
| Lambda | Now routes by `form_type` (contact vs volunteer) to different inboxes |

---

## Routes

```
/                       Home (curated sections)
/sobre                  About (institutional)
/equipa                 Team & organisation chart
/projectos              Projects index
/projectos/:slug        Project detail (ekoar, angola-verde, …)
/provincias/:slug       Province detail (luanda, benguela, lisboa)
/voluntariado           Volunteer application form
/donativos              Donate (IBAN + info)
/contactos              General contact form
*                       404
```

---

## ⚠️ Critical: SPA rewrite in Amplify

Because this is a single-page app with client-side routing, **you must add a rewrite rule in the Amplify Console**, otherwise refreshing `/sobre` (or any non-root URL) will return a 404.

### How to add it

1. AWS Amplify Console → your app → left sidebar → **Rewrites and redirects**
2. **Add rule** → fill in:
   - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|webm|mp4|mp3|otf|eot)$)([^.]+$)/>`
   - **Target address:** `/index.html`
   - **Type:** `200 (Rewrite)`
3. **Save**.

That regex serves `index.html` for any path that isn't a real static asset. It's the standard pattern for SPAs on Amplify. **Without it, the deploy works but inner pages 404 on refresh.**

---

## Local development

```bash
npm install
npm run dev   # http://localhost:5173
npm run build # production build into dist/
```

---

## Deploy on Amazon Amplify

### 1. Push the repo

```bash
git init && git add . && git commit -m "v3"
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

### 2. Verify a sender in Amazon SES (region: `eu-west-1`)

Console → SES → **Verified identities** → Create identity → Email → `planetaconscienteao@gmail.com`. Click the link in the inbox.

> SES sandbox: as long as `TO_EMAIL` and `TO_EMAIL_VOLUNTEERS` are themselves verified identities, the form will work for *any* visitor in sandbox — because SES rejects sandbox sends *to* unverified addresses, but the destination is fixed and verified.

### 3. Create the Lambda function

Console → Lambda → **Create function** → Node.js 20.x, name `planeta-consciente-forms`.

- **IAM role**: add an inline policy allowing `ses:SendEmail` on `*`.
- **Code**: zip the `lambda/` folder after running `npm install` inside it, upload.
- **Handler**: `contact-handler.handler`
- **Environment variables**:

```
FROM_EMAIL           = planetaconscienteao@gmail.com
TO_EMAIL             = planetaconscienteao@gmail.com   # contact form destination
TO_EMAIL_VOLUNTEERS  = planetaconscienteao@gmail.com   # volunteer applications (optional, falls back to TO_EMAIL)
REPLY_TO             = planetaconscienteao@gmail.com
ALLOWED_ORIGINS      = https://main.<your-app-id>.amplifyapp.com,https://planetaconsciente.org
```

- **Function URL**: create with `Auth: NONE`, CORS allowing `POST, OPTIONS` from the Amplify origin.
- Copy the Function URL — you need it for the next step.

### 4. Deploy on Amplify

Amplify Console → **New app → Host web app** → connect the GitHub repo → branch `main`.

Add **environment variable** in *App settings → Environment variables*:

```
VITE_CONTACT_ENDPOINT = https://xxxxx.lambda-url.eu-west-1.on.aws/
```

Trigger the build. Once it goes green, **add the SPA rewrite rule above**. Then test by visiting `/sobre` directly.

### 5. Custom domain

*Domain management → Add domain → `planetaconsciente.org`*. Amplify will give DNS records; add them at your registrar. Wait for the green check, then update Lambda `ALLOWED_ORIGINS` to include `https://planetaconsciente.org`.

---

## Form payloads

Both forms POST JSON to `VITE_CONTACT_ENDPOINT`. The Lambda discriminates by `form_type`.

### Contact (`form_type: "contact"`)

```json
{
  "form_type": "contact",
  "name": "...",
  "email": "...",
  "phone": "...",
  "org": "...",
  "interest": "...",
  "message": "...",
  "locale": "pt"
}
```

### Volunteer (`form_type: "volunteer"`)

```json
{
  "form_type": "volunteer",
  "fullName": "...",
  "email": "...",
  "phone": "...",
  "birthDate": "...",
  "city": "Luanda",
  "occupation": "...",
  "areas": ["Educação ambiental", "Plantio de árvores"],
  "availability": "...",
  "experience": "...",
  "motivation": "...",
  "howFound": "Instagram",
  "locale": "pt"
}
```

Both have a `website` honeypot field that, if filled, silently 200s without sending email.

---

## Images

Drop images into `public/images/` and `public/images/projects/<slug>/`. Components fall back to gradient placeholders when files are missing — you can deploy with placeholders and replace them later without rebuilding code.

### Expected filenames

```
public/images/
├── hero-community.jpg            (Hero, 4:5 portrait)
├── about-community.jpg           (About section, 5:4 landscape)
├── tree-planting.jpg             (TreePlanting section, square)
├── volunteers-1.jpg              (Volunteers section, 3:4)
├── volunteers-2.jpg              (Volunteers section, 3:4)
├── og-cover.jpg                  (Social share, 1200×630)
├── ekoar.jpg                     (Project card, 4:3)
├── angola-verde.jpg              (Project card, 4:3)
├── gca-youth.jpg                 (Project card, 4:3)
├── esta-tudo-conectado.jpg       (Project card, 4:3)
├── arborizacao-luanda.jpg        (Project card, 4:3)
├── greentalks.jpg                (Project card, 4:3)
├── provinces/luanda.jpg          (Province page hero, 5:4)
├── provinces/benguela.jpg
├── provinces/lisboa.jpg
└── projects/<slug>/hero.jpg      (Project detail hero, 21:9)
└── projects/<slug>/1.jpg ... 5.jpg  (Project gallery placeholders)
```

### Partner logos (optional upgrade)

Currently `src/components/Partners.tsx` renders text-based placeholders. To use real logos, drop `partners/<slug>.svg` (or PNG) in `public/images/` and set the `logo` field on the matching entry in the `PARTNERS` array inside the component:

```ts
{ name: "People In Need", slug: "pin", logo: "/images/partners/pin.svg" },
```

---

## File map

```
src/
├── App.tsx                     React Router routes
├── main.tsx
├── index.css                   Tailwind + custom utilities
├── vite-env.d.ts
├── contexts/
│   └── LanguageContext.tsx     PT/EN with localStorage persistence
├── i18n/
│   ├── pt.ts                   All Portuguese copy
│   └── en.ts                   All English copy (typed against pt)
├── hooks/
│   └── useReveal.ts            Scroll-triggered reveal animations
├── layout/
│   └── RootLayout.tsx          Wraps Navbar + <Outlet /> + Footer
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── TeamPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailPage.tsx
│   ├── ProvincePage.tsx
│   ├── VolunteerPage.tsx
│   ├── DonatePage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
└── components/
    ├── Navbar.tsx              5-item menu, mobile drawer, active states
    ├── Footer.tsx              No public email, router links
    ├── LanguageToggle.tsx
    ├── Hero.tsx
    ├── About.tsx               Province links
    ├── WhatWeDo.tsx
    ├── SDGs.tsx                8 ODS with official UN colours
    ├── Impact.tsx
    ├── Projects.tsx            Featured mode for Home, full list otherwise
    ├── TreePlanting.tsx
    ├── Volunteers.tsx
    ├── Partners.tsx            Logo placeholder grid (swap to real logos)
    ├── HowToParticipate.tsx
    ├── ContactForm.tsx         form_type=contact
    ├── VolunteerForm.tsx       form_type=volunteer
    ├── FinalCTA.tsx
    ├── PageHeader.tsx          Reusable inner-page hero
    ├── TeamCard.tsx            Profile card with initials fallback
    ├── OrgChart.tsx            Visual organisation chart
    ├── ProjectGallery.tsx      6-slot gallery for project pages
    └── PlaceholderImage.tsx    Branded gradient fallback

lambda/
├── contact-handler.mjs         Node 20, form_type routing, CORS, honeypot
├── package.json
└── README.md
```

---

## Common deployment errors

| Symptom | Likely cause | Fix |
|---|---|---|
| `/sobre` 404 on refresh | Missing SPA rewrite | Add the rewrite rule above |
| `npm ci` fails on Amplify | Missing `package-lock.json` | Commit the lock file |
| Form submits but no email | SES sandbox + `TO_EMAIL` not verified | Verify the destination email in SES |
| `MessageRejected` in Lambda logs | `FROM_EMAIL` not verified | Verify the sender in SES |
| CORS error in browser | `ALLOWED_ORIGINS` doesn't match | Set Lambda env var and Function URL CORS to your real domain |
| Form silently accepts but no email | Honeypot triggered or browser autofilled it | Inspect submitted JSON — `website` should always be empty |

---

## Contact

- Site: planetaconsciente.org
- Tel: +244 946 273 911
- Instagram: @planeta_consciente.ao
- LinkedIn: planeta-consciente
