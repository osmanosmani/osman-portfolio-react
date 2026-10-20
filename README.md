# Osman Portfolio React

Personal portfolio website built with React and Vite. The Direction C redesign introduces a shorter, bilingual Home page and top navigation while retaining the detailed professional content and existing case studies.

## Overview

This project includes:

- Slate & Sand Home with English / Swedish content and a responsive top navigation
- Three-project screenshot selector, keyboard navigation and full-image viewer
- Projects, Experience and Credentials pages, with all eight project entries retained
- Existing project modal, case-study URLs and professional marketing evidence
- React contact form with required Subject, draft preservation and the existing PHP endpoint

Home implements the approved v3.1 design. Detailed pages retain their existing components and English content; the Swedish shell explicitly labels this. The Credentials page lists existing qualifications only: no private diplomas or certificate scans have been published. See `docs/DIRECTION-C.md` for migration scope and remaining work.

## Tech Stack

- React
- Vite
- Tailwind CSS 4 for the new shell and Home utilities
- Scoped Direction C styles and self-hosted Public Sans / Fraunces fonts
- Bootstrap retained in a legacy CSS layer for the detailed pages
- Bootstrap Icons
- PHP contact endpoint for form handling

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

The contact form sends data to:

```text
api/contact.php
```

Important:

- Local form delivery depends on PHP mail/SMTP being configured correctly
- When running the frontend on Vite, the default remains `http://localhost/profilo/osman-portfolio-react/api/contact.php`
- Set `VITE_CONTACT_API_URL` in an ignored `.env.local` if your PHP endpoint is elsewhere. This is a public URL, never a place for SMTP credentials
- Production requests resolve from the deployment root, not from `/sv/` or a case-study URL
- If mail is not configured in WAMP, the form will show an error message instead of sending
- Production SMTP credentials should be stored in:

```text
api/config.php
```

- Do not commit `api/config.php` to GitHub
- Use `api/config.example.php` as the template for server configuration

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

UI tests start a loopback-only Vite server on port 5183 and intercept contact submissions; they do not send email. Windows uses installed Google Chrome. On other systems install Playwright Chromium first with `npx playwright install chromium`.

## Live Deployment

### Vercel

The root `vercel.json` serves `index.html` for the React page routes, including
`/case-studies/digital-marketing` and `/projects/<slug>`. This enables direct links
and page refreshes on Vercel, which does not use Apache's `.htaccess`.
The rules also cover the local redesign's Experience, Credentials and Swedish
routes, while leaving `/api/` and static files outside the SPA rewrites.

Deploy the commit containing `vercel.json` through the connected Vercel project,
then open and refresh the case-study URL on the production domain. Vite's local
fallback alone does not verify Vercel routing. The existing PHP contact endpoint
still requires a PHP-capable host.

### Apache / cPanel

Recommended production setup:

- Upload the contents of `dist/` to your domain document root
- Include `dist/.htaccess`, which enables direct access and refresh for client-side routes on Apache
- Upload `api/contact.php` to `api/contact.php` on the server
- Create `api/config.php` on the server based on `api/config.example.php`
- Use a PHP-capable host for the contact form
- Preserve the existing server `api/config.php`; do not overwrite credentials when uploading a new frontend build
- Do not upload `src/`, `node_modules/`, local environment files, screenshots from tests, or the handoff ZIP

The build does not deploy automatically. Actual cPanel route refresh, HTTP 404 handling and email delivery must still be checked on the host. Client-side metadata is not prerendering and does not provide per-project social previews by itself.

## GitHub

Repository:

[https://github.com/osmanosmani/osman-portfolio-react](https://github.com/osmanosmani/osman-portfolio-react)
