# Direction C migration: Home and shared shell

Reference: `portfolio-redesign-handoff-v3.1.zip`. This is a phased integration, not a copy of the prototype's placeholder content or form behavior.

## Implemented

- Short Home with Slate & Sand tokens, self-hosted licensed fonts, real portrait and screenshots.
- Three-project selector with arrow-key navigation, responsive labels and full-resolution image dialog. The large Nacka image loads only when the viewer opens.
- English and Swedish Home, navigation and contact messages. Switching language preserves the current route and Home form draft; changing project does not remount the form.
- Real contact integration using the existing PHP JSON contract: name, email, subject, message. No SMTP configuration or server code changed.
- Dedicated `/projects`, `/experience` and `/credentials` pages. About, Skills, all Resume training and professional context remain available. Credentials currently lists existing qualifications without document files, a search interface or a document viewer.
- All eight existing `/projects/<slug>` case studies and `/case-studies/digital-marketing` retained. Old root anchors resolve to the corresponding page/section. Swedish-prefixed routes retain English detailed content with an explicit language notice.
- Existing project cards and modal kept. New Home links directly to case-study pages.

## Code boundaries

- `src/styles/index.css` loads Bootstrap and `App.css` in the `legacy` cascade layer. Tailwind utilities use the `tw:` prefix; global Preflight is deliberately omitted. Do not remove Bootstrap until retained pages are migrated and tested.
- `src/styles/direction-c.css` owns the approved visual tokens and new component styles. Generic new-page typography excludes `.dc-legacy` to preserve old CTA contrast and spacing.
- `src/data/homeContent.js` owns EN/SV Home text. Career teaser descriptions should stay aligned with the detailed Resume when professional facts change.
- `src/data/projects.js` remains the project source of truth. Optional `homePreview` fields supply preview order, short titles, localized alt/caption text, mobile crop offsets and full-resolution assets. Existing case-study data is unchanged.
- External apps stay in their own repositories and hosting. Portfolio links use the existing `githubUrl`, `liveUrl` and `isLive` values.
- Old Header, Hero, Footer and Contact components are retained but are no longer used by the new shell.

## Verification

Run `npm run build`, `npm run lint`, `npm test`, and `npm run test:ui`.

The UI suite covers both Home languages at 320, 390, 900, 1024 and 1280px; tabs and keyboard focus; menu and viewer Escape behavior; draft preservation; mocked form errors/success; existing case-study refresh; old anchors; partial-language routes; and explicit not-found UI. Browser tests use Chrome on Windows and Chromium elsewhere. Test output is ignored by Git.

Visual snapshots were inspected at desktop and phone widths. This is not a claim of testing real phones, Safari, Firefox, a screen reader or browser zoom at 200%/400%. Contact delivery is mocked, not a real SMTP test.

## Still separate from this design phase

- Direction C layouts and full Swedish translations for the detailed Projects, Experience, Credentials and case-study pages. The source handoff only finalizes Home.
- Credential document approvals, redaction, search/filter UI and an accessible document viewer. No certificate dates, credentials, verification URLs or private files should be invented.
- Server-side contact abuse protection and deployment email testing. The existing PHP endpoint was deliberately not changed.
- Per-route social metadata/prerendering and real server HTTP 404 behavior. The current Apache fallback still returns the SPA for unknown paths; the visible not-found page is not an HTTP 404 fix.
- Removal of old dependencies, original source images or archived ZIPs only after a dedicated reference check. None were deleted in this integration.
- Dependency audit: `npm audit --omit=dev` reported zero issues during verification; the full audit reported nine development-tool advisories. Review compatible security updates separately before exposing any development server. The preview is bound to `127.0.0.1` only.

No commit, push or production deployment is part of this migration.
