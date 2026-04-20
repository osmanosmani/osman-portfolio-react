# Osman Portfolio React

Personal portfolio website built with React and Vite, based on a Bootstrap portfolio structure and migrated section by section into reusable React components.

## Overview

This project includes:

- Fixed left sidebar navigation
- Hero, About, Skills, Experience, Portfolio, Contact, and Footer sections
- Responsive mobile sidebar menu
- Real portfolio project images
- Contact form UI with React validation
- PHP contact endpoint for real form submission

## Tech Stack

- React
- Vite
- Bootstrap
- Bootstrap Icons
- PHP contact endpoint for form handling

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

The contact form sends data to:

```text
api/contact.php
```

Important:

- Local form delivery depends on PHP mail/SMTP being configured correctly
- When running the frontend on Vite, the form targets the local WAMP path for this project
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

## Live Deployment

Recommended production setup:

- Upload the contents of `dist/` to your domain document root
- Upload `api/contact.php` to `api/contact.php` on the server
- Create `api/config.php` on the server based on `api/config.example.php`
- Use a PHP-capable host for the contact form

## GitHub

Repository:

[https://github.com/osmanosmani/osman-portfolio-react](https://github.com/osmanosmani/osman-portfolio-react)
