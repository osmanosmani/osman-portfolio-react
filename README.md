# Osman Portfolio React

Personal portfolio website built with React and Vite, based on a Bootstrap portfolio structure and migrated section by section into reusable React components.

## Overview

This project includes:

- Fixed left sidebar navigation
- Hero, About, Skills, Experience, Portfolio, Contact, and Footer sections
- Responsive mobile sidebar menu
- Real portfolio project images
- Contact form UI with React validation
- Web3Forms email delivery with validation, draft preservation and direct email fallback

## Tech Stack

- React
- Vite
- Bootstrap
- Bootstrap Icons
- Web3Forms for browser-to-email contact submissions

## Project Structure

```text
src/
  assets/
  components/
    Header.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Resume.jsx
    Portfolio.jsx
    Contact.jsx
    Footer.jsx
  App.jsx
  App.css
  main.jsx

api/
  contact.php
  config.example.php
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

The contact form submits directly from the
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

The files in `api/` are retained legacy PHP-host support and are not used by
the current contact form. No SMTP credentials are
needed for Web3Forms.

## Build

Create a production build with:

```bash
npm run build
```

## Live Deployment

### Vercel

Push a validated commit to the connected production branch. Vercel builds and
publishes the frontend; `vercel.json` enables direct links to React page routes.
The Web3Forms access key must be set before building. No PHP server is required.
After deploying, verify the form in the browser and confirm an authorized test
message arrives in the recipient inbox.

### Other static hosting

Recommended production setup:

- Upload the contents of `dist/` to your domain document root
- Include `dist/.htaccess` when using Apache, so client-side route refreshes work
- Configure the Web3Forms public access key before building; the legacy PHP files are not needed

## GitHub

Repository:

[https://github.com/osmanosmani/osman-portfolio-react](https://github.com/osmanosmani/osman-portfolio-react)
