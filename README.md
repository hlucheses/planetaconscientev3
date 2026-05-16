# Planeta Consciente — Landing page bilingue

> _Unidos por um planeta melhor · United for a better planet_

Landing page oficial da **Planeta Consciente**, organização ambiental jovem com presença em Luanda, Benguela e Lisboa. Bilingue (PT/EN), com formulário de contacto integrado em AWS Lambda + Amazon SES, pronta para deploy no Amazon Amplify.

---

## Sumário

1. [Stack](#stack)
2. [Estrutura de pastas](#estrutura-de-pastas)
3. [Correr localmente](#correr-localmente)
4. [Build de produção](#build-de-produção)
5. [Publicar no GitHub](#publicar-no-github)
6. [Ligar ao Amazon Amplify](#ligar-ao-amazon-amplify)
7. [Variáveis de ambiente](#variáveis-de-ambiente)
8. [Backend — Lambda + SES](#backend--lambda--ses)
9. [Substituir imagens placeholder](#substituir-imagens-placeholder)
10. [Editar textos bilingues](#editar-textos-bilingues)
11. [Alterar links das redes sociais](#alterar-links-das-redes-sociais)
12. [Testar o formulário](#testar-o-formulário)
13. [Erros comuns](#erros-comuns)
14. [Próximos passos recomendados](#próximos-passos-recomendados)

---

## Stack

| Camada       | Escolha                              | Porquê |
|--------------|--------------------------------------|--------|
| Bundler      | **Vite 5**                           | Build extremamente rápido, output estático, ideal para Amplify. |
| UI           | **React 18 + TypeScript**            | Standard moderno, ergonomia para equipas pequenas. |
| Styling      | **Tailwind CSS 3**                   | Manutenção rápida, sem CSS órfão, paleta da marca em `tailwind.config.js`. |
| i18n         | Context API custom (`LanguageContext.tsx`) | Zero dependências extra; dois ficheiros `pt.ts` / `en.ts`. |
| Animações    | CSS + IntersectionObserver custom    | Sem libs pesadas; respeita `prefers-reduced-motion`. |
| Backend form | **AWS Lambda** (Node.js 20, `@aws-sdk/client-ses`) + **Amazon SES** | Serverless, baixo custo, alinhado com o ecosistema Amplify. |
| Hosting      | **Amazon Amplify** (SPA estática)    | Pedido do cliente; deploy contínuo via GitHub. |

Tudo escolhido para ser **leve, fácil de manter e barato**.

---

## Estrutura de pastas

```
planeta-consciente/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── README.md            ← lista os nomes de ficheiro esperados
│       └── partners/
├── src/
│   ├── components/              ← Hero, About, Projects, Form, etc.
│   ├── contexts/
│   │   └── LanguageContext.tsx  ← detecção + persistência de idioma
│   ├── hooks/
│   │   └── useReveal.ts         ← scroll-reveal animations
│   ├── i18n/
│   │   ├── pt.ts                ← copy completa em português
│   │   └── en.ts                ← copy completa em inglês
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── lambda/
│   ├── contact-handler.mjs      ← handler AWS Lambda
│   ├── package.json
│   └── README.md                ← deploy passo-a-passo
├── amplify.yml                  ← build settings do Amplify
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Correr localmente

```bash
# 1. Instalar dependências
npm install

# 2. (opcional) configurar endpoint do formulário
cp .env.example .env
# Edita .env e cola o URL da Function Lambda — sem isto o form mostra sucesso simulado em dev.

# 3. Arrancar o dev server
npm run dev
```

A app abre em `http://localhost:5173`.

> O `npm run dev` faz hot-reload de tudo (textos PT/EN, componentes, Tailwind).

---

## Build de produção

```bash
npm run build      # gera /dist
npm run preview    # serve /dist localmente para inspecção
```

O Amplify executa exactamente estes comandos — definidos em `amplify.yml`.

---

## Publicar no GitHub

```bash
git init
git add .
git commit -m "feat: landing page bilingue Planeta Consciente"
git branch -M main
git remote add origin git@github.com:<organização>/<repositório>.git
git push -u origin main
```

---

## Ligar ao Amazon Amplify

1. Entra em [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
2. **Get started** → **Host a web app**.
3. Selecciona **GitHub**, autoriza e escolhe o repositório.
4. Branch: `main`.
5. **Build settings** — o Amplify detecta automaticamente o `amplify.yml` deste repositório. Verifica que diz:
   - Frontend build command: `npm run build`
   - Output directory: `dist`
6. **Environment variables** — adiciona:

   | Nome                     | Valor                                         |
   |--------------------------|-----------------------------------------------|
   | `VITE_CONTACT_ENDPOINT`  | URL da Function Lambda (ver secção seguinte)  |

7. **Save and deploy**.

A primeira build demora ~1–2 minutos. A partir daí, cada `git push` para `main` redeploya automaticamente.

### Domínio próprio

- **Domain management** → **Add domain** → `planetaconsciente.org`.
- Amplify gera os registos DNS (CNAME/ALIAS) que tens de adicionar no teu provedor (Cloudflare, Route 53, etc.).
- O certificado HTTPS é emitido automaticamente pelo ACM.

---

## Variáveis de ambiente

### Frontend (Amplify ou `.env` local)

| Variável                  | Obrigatória | Descrição                                                          |
|---------------------------|:-:|--------------------------------------------------------------------|
| `VITE_CONTACT_ENDPOINT`   | ✓ (em prod) | URL público da Lambda (Function URL ou API Gateway).               |

> **Importante:** variáveis com prefixo `VITE_` são embebidas no bundle frontend — **nunca** coloques aqui chaves AWS.

### Backend (Lambda)

Definidas no console da Lambda. Lista completa em [`lambda/README.md`](./lambda/README.md):

- `FROM_EMAIL`
- `TO_EMAIL`
- `REPLY_TO` (opcional)
- `ALLOWED_ORIGINS`

---

## Backend — Lambda + SES

Passo-a-passo detalhado em [`lambda/README.md`](./lambda/README.md). Resumo:

### 1. Verificar email/domínio no SES

1. AWS Console → **Amazon SES** → escolhe a região (recomendação: a mesma da Lambda; ex. `eu-west-1`).
2. **Identities** → **Create identity**.
3. Opção A — **Email address**: cola `no-reply@planetaconsciente.org`, confirma no inbox.
   Opção B — **Domain**: cola `planetaconsciente.org`, adiciona os 3 registos CNAME DKIM no DNS.
4. (Produção) Pede sair do **sandbox**: SES → **Account dashboard** → **Request production access**. Demora ~24h.

### 2. Criar a Lambda

Segue `lambda/README.md`. Em resumo:
- Runtime Node.js 20.x, arm64, 256 MB, timeout 10 s.
- Upload do `function.zip` com `contact-handler.mjs` + `node_modules`.
- IAM: permite `ses:SendEmail` na identidade verificada.
- Activa a **Function URL** (auth `NONE`, CORS configurado).
- Copia o URL → cola em `VITE_CONTACT_ENDPOINT`.

### 3. Testar end-to-end

1. `npm run dev` (com `.env` apontando para a Function URL).
2. Preenche o form.
3. Verifica que chega email a `planetaconscienteao@gmail.com`.
4. Verifica logs em CloudWatch caso algo falhe.

---

## Substituir imagens placeholder

Os placeholders são gradientes em SVG com identidade visual. Para substituir por fotografias reais, basta colocar ficheiros em `public/images/` com os nomes exactos:

| Secção             | Ficheiro                  | Proporção |
|--------------------|---------------------------|-----------|
| Hero               | `hero-community.jpg`      | 4:5       |
| Quem somos         | `about-community.jpg`     | 5:4       |
| Projecto EKOAR     | `ekoar.jpg`               | 4:3       |
| Projecto Angola Verde | `angola-verde.jpg`     | 4:3       |
| Projecto GCA       | `gca-youth.jpg`           | 4:3       |
| Plantio            | `tree-planting.jpg`       | 1:1       |
| Voluntários        | `volunteers-1.jpg`, `volunteers-2.jpg` | 3:4 |
| Open Graph (social) | `og-cover.jpg`           | 1200×630  |

> Lista completa também em [`public/images/README.md`](./public/images/README.md).

**Recomendações de optimização:**
- Comprime com [Squoosh](https://squoosh.app) ou [TinyPNG](https://tinypng.com).
- Largura máxima 1600px para hero, 1200px para cards.
- Considera servir WebP no futuro — basta trocar a extensão e o `src`.

---

## Editar textos bilingues

Todo o copy está em dois ficheiros:

- `src/i18n/pt.ts` — Português
- `src/i18n/en.ts` — Inglês

As duas estruturas têm de bater certo (o TypeScript chama atenção se faltar uma chave). Para mudar um texto:

```ts
// src/i18n/pt.ts
hero: {
  ...
  titleHighlight: "planeta melhor.",   // ← edita aqui
  ...
}
```

Guarda o ficheiro — o Vite faz hot-reload instantâneo.

### Acrescentar uma língua nova (futuro)

1. Cria `src/i18n/fr.ts` espelhando a estrutura de `pt.ts`.
2. Em `LanguageContext.tsx`, adiciona `"fr"` ao tipo `Locale` e à lógica de detecção.
3. Em `LanguageToggle.tsx`, adiciona o novo botão.

---

## Alterar links das redes sociais

Edita o array `SOCIALS` em `src/components/Footer.tsx`:

```ts
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/planeta_consciente.ao/" },
  { name: "LinkedIn",  href: "..." },
  // ...
];
```

---

## Testar o formulário

**Localmente (sem Lambda):** se `VITE_CONTACT_ENDPOINT` não estiver definida, o formulário simula sucesso após ~700ms e imprime o payload no console — útil para testar o UX.

**Localmente (com Lambda):** define `VITE_CONTACT_ENDPOINT` em `.env`, faz `npm run dev`, submete e verifica:
- Mensagem de sucesso aparece no UI.
- Email recebido em `planetaconscienteao@gmail.com`.
- Sem erros no DevTools → Network.

**Em produção:** mesmo fluxo, garantindo que o domínio está em `ALLOWED_ORIGINS` da Lambda.

**Testar a protecção anti-spam:** abre DevTools, preenche manualmente o input `name="website"` no DOM, submete. O frontend trata como sucesso e o backend descarta — não chega email.

---

## Erros comuns

| Sintoma                                                       | Causa provável                                                       | Solução |
|---------------------------------------------------------------|----------------------------------------------------------------------|---------|
| Form mostra erro a submeter, console mostra `CORS`            | Origin do site não está em `ALLOWED_ORIGINS` da Lambda               | Acrescenta o domínio nas env vars da Lambda e redeploya. |
| `500 ses_failed` no Network                                   | SES em sandbox ou identidade não verificada                          | Verifica o sender em SES; pede production access. |
| Build no Amplify falha em `npm ci`                            | Versão de Node incompatível                                          | Amplify Console → App settings → Build image settings → Node 20. |
| Imagens não aparecem mas o site funciona                      | Filenames diferentes do esperado                                     | Renomeia para o exacto da tabela acima. |
| Idioma sempre PT mesmo com browser em EN                      | `localStorage` tem valor antigo                                      | DevTools → Application → Local Storage → apaga `pc-locale`. |
| Tudo branco em produção                                       | Path de assets errado                                                | Confirma que `vite.config.ts` não tem `base` customizada errada. |

---

## Próximos passos recomendados

1. **Imagens reais** — substituir placeholders por fotografias da Planeta Consciente.
2. **OG image** — desenhar `og-cover.jpg` (1200×630) para partilhas nas redes.
3. **Domínio + HTTPS** — apontar `planetaconsciente.org` para Amplify.
4. **SES production access** — sair da sandbox para conseguir enviar para qualquer email.
5. **Analytics** — adicionar [Plausible](https://plausible.io) ou GA4 (privacidade-friendly recomendado).
6. **Newsletter** — secção opcional ligada a Mailchimp/MailerLite.
7. **Página `/projectos/[slug]`** — quando quiserem expandir cada projecto em página própria, mover para Next.js ou Astro mantendo a estrutura de componentes.
8. **Acessibilidade** — fazer auditoria com axe-core e Lighthouse (objectivo: 100/100).
9. **i18n SEO** — gerar `sitemap.xml` e `hreflang` quando o site crescer.
10. **CMS leve** — se a equipa quiser editar copy sem tocar em código, considerar Sanity ou Tina CMS.

---

## Contactos institucionais

- 🌍 [planetaconsciente.org](https://planetaconsciente.org)
- ✉️ contacto@planetaconsciente.org
- ✉️ helder@planetaconsciente.org
- 📱 [Instagram](https://www.instagram.com/planeta_consciente.ao/) · [LinkedIn](https://www.linkedin.com/company/planeta-consciente) · [TikTok](https://www.tiktok.com/@placonscienteao) · [YouTube](https://www.youtube.com/@PlanetaConscienteAO) · [Facebook](https://www.facebook.com/profile.php?id=61576903401987)

---

> Construído com energia jovem em **Luanda · Benguela · Lisboa**.
