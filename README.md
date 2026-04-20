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

## Technical Notes

- Built as a component-based single page application
- Styling is handled through a central `App.css` file with section-based grouping
- Bootstrap utility and grid classes are used where they help layout and responsiveness
- Portfolio project images are imported locally from `src/assets`
- The sidebar navigation supports desktop and mobile behavior
- Scroll-based reveal animations are handled in React with `IntersectionObserver`
- Contact form validation runs on the frontend before sending data to PHP
- The backend endpoint returns JSON responses for success and error handling

## Architecture

- `App.jsx` composes the page sections in order
- `Header.jsx` handles sidebar navigation, mobile toggle, and active section state
- `Hero.jsx`, `About.jsx`, `Skills.jsx`, `Resume.jsx`, `Portfolio.jsx`, `Contact.jsx`, and `Footer.jsx` are split into focused UI sections
- `api/contact.php` handles form validation and mail submission on the server side
- Static images and media are stored under `src/assets`

## Contact Form Flow

```text
React form -> frontend validation -> fetch POST request -> api/contact.php -> PHP validation -> mail() -> JSON response
```

## Environment Notes

- Frontend development runs through Vite on `localhost:5173`
- PHP form handling is intended to run through WAMP/Apache
- For successful email delivery, PHP mail or SMTP must be configured locally or on the production server
- If deployed without PHP support, the contact endpoint should be replaced with a service such as EmailJS, Formspree, or a custom backend

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

## Build

Create a production build with:

```bash
npm run build
```

## Deployment

This repository is ready to be deployed as:

- a static frontend build for the React app
- plus a PHP-capable environment if the contact form should send emails through `api/contact.php`

If the final hosting platform does not support PHP, the contact form should be switched to another mail delivery solution before launch.

## GitHub

Repository:

[https://github.com/osmanosmani/osman-portfolio-react](https://github.com/osmanosmani/osman-portfolio-react)
