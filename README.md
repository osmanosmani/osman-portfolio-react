# Osman Portfolio React

Personal portfolio website built with React and Vite. The Direction C redesign introduces a shorter, bilingual Home page and top navigation while retaining the detailed professional content and existing case studies.

## Overview

This project includes:

- Slate & Sand Home with English / Swedish content and a responsive top navigation
- Three-project screenshot selector, keyboard navigation and full-image viewer
- Projects, Experience and Credentials pages, with all eight project entries retained
- Existing project modal, case-study URLs and professional marketing evidence
- React contact form with required Subject, draft preservation and Web3Forms delivery

Home implements the approved v3.1 design. Detailed pages retain their existing components and English content; the Swedish shell explicitly labels this. The Credentials page lists existing qualifications only: no private diplomas or certificate scans have been published. See `docs/DIRECTION-C.md` for migration scope and remaining work.

## Tech Stack

- React
- Vite
- Tailwind CSS 4 for the new shell and Home utilities
- Scoped Direction C styles and self-hosted Public Sans / Fraunces fonts
- Bootstrap retained in a legacy CSS layer for the detailed pages
- Bootstrap Icons
- Web3Forms for browser-to-email contact submissions

## Project Structure

```text
src/
  assets/
    fonts/
    projects/
  components/
    site/
    About.jsx
    Skills.jsx
    Resume.jsx
    Portfolio.jsx
    ProjectCaseStudy.jsx
  data/
    projects.js
    profile.js
    homeContent.js
  pages/
    HomePage.jsx
  hooks/
    useContactForm.js
  styles/
    index.css
    direction-c.css
  utils/
  App.jsx
  App.css
  main.jsx

api/
  contact.php
  config.example.php

public/
  .htaccess
tests/
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

## Contact Form

Both the current portfolio and the Direction C redesign submit directly from the
browser to [Web3Forms](https://web3forms.com/). No PHP server is required.

To activate delivery:

1. Create a free form at Web3Forms and verify the recipient email address.
2. Set the public form access key in `src/data/contactConfig.js`, or supply
   `VITE_WEB3FORMS_ACCESS_KEY` at build time (locally in ignored `.env.local`,
   or in the Vercel project's environment settings).
3. Rebuild and deploy. Send an explicitly authorized test from the production
   form and confirm its arrival in the recipient inbox, including Spam.

The access key is a public form identifier designed for frontend use, not an
email password. An empty key blocks submission locally. This checkout's key must
be configured before publishing the contact change.

Web3Forms uses the visitor's `email` field as Reply-To. The subject is prefixed
with `Portfolio Contact:`. Successful API confirmation clears the form; HTTP
errors, invalid responses, connection failures and timeouts keep the draft.
There is no automatic retry, because a timed-out request may already have been
accepted. The form provides the direct email address as an alternative.

Web3Forms runs its own spam checks. Additional hCaptcha protection can be enabled
in its dashboard and integrated later; it is not enabled by this code. Plan
limits and delivery behavior are managed by the provider.

The files in `api/` and `src/utils/contactApi.js` are retained legacy PHP-host
support, and are not used by either current contact form. No SMTP credentials are
needed for Web3Forms.

## Build

Create a production build with:

```bash
npm run build
```

Quality checks:

```bash
npm run lint
npm test
npm run test:ui
```

UI tests start a loopback-only Vite server on port 5183 with a test-only public form key and intercept Web3Forms submissions; they do not send email. Windows uses installed Google Chrome. On other systems install Playwright Chromium first with `npx playwright install chromium`.

## Live Deployment

### Vercel

The root `vercel.json` serves `index.html` for the React page routes, including
`/case-studies/digital-marketing` and `/projects/<slug>`. This enables direct links
and page refreshes on Vercel, which does not use Apache's `.htaccess`.
The rules also cover the local redesign's Experience, Credentials and Swedish
routes, while leaving `/api/` and static files outside the SPA rewrites.

Deploy the commit containing `vercel.json` through the connected Vercel project,
then open and refresh the case-study URL on the production domain. Vite's local
fallback alone does not verify Vercel routing. Configure the Web3Forms access key
before building a deployment that includes the updated contact form.

### Apache / cPanel

Recommended production setup:

- Upload the contents of `dist/` to your domain document root
- Include `dist/.htaccess`, which enables direct access and refresh for client-side routes on Apache
- Configure the Web3Forms access key before building; the contact form does not require a PHP-capable host
- Existing legacy server configuration is not part of the frontend upload
- Do not upload `src/`, `node_modules/`, local environment files, screenshots from tests, or the handoff ZIP

The build does not deploy automatically. Actual route refresh, HTTP 404 handling and email delivery must still be checked after deployment. Client-side metadata is not prerendering and does not provide per-project social previews by itself.

## GitHub

Repository:

[https://github.com/osmanosmani/osman-portfolio-react](https://github.com/osmanosmani/osman-portfolio-react)
