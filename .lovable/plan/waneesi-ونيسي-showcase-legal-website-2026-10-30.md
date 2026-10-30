# Waneesi (ونيسي) Showcase & Legal Website

Bilingual (AR/EN, full RTL), light/dark promotional site using the Waneesi palette, with legal pages ready for App Store and Google Play review.

## Pages (each gets its own address and share preview)
- `/` Home: sticky glass nav, hero with floating animated phone (reels loop + quick-action chips), store badges + QR popup, social proof counters, persona tabs (5), 8 superpowers grid, interactive 4-screen phone showcase, partner banner, testimonials, FAQ, footer.
- `/partners` Join as a Partner: benefits for vets, clinics, stores, hotels, groomers + interest form (front-end only; shows a confirmation).
- `/privacy` Privacy Policy (data collected, GPS, media, encryption, children/COPPA, no data selling, contact).
- `/terms` Terms & Conditions (conduct, anti-cruelty/illegal trade, medical disclaimer, marketplace rules).
- `/delete-account` Account & Data Deletion: in-app steps (Settings > Delete Account) + web request form (front-end; shows confirmation, notes 30-day processing).
- `/community-guidelines` Community Guidelines.

Nav links to home sections scroll in-page; Legal links open the dedicated pages (stores require real URLs, not modals).

## Design
- Colors: Persian Green #2A9D8F primary, Sandy Brown #F4A261, Burnt Sienna #E76F51 (SOS/hearts), Saffron #E9C46A (ratings), Charcoal #264653; light bg #FAFAFA, dark #12181B / cards #1B282E.
- Fonts: Plus Jakarta Sans (EN), Cairo (AR).
- Glassmorphism, floating paws/sparkles, hover lifts, Framer Motion animations.
- Logo: `/assets/icons/logo.png` with glowing paw fallback if missing.

## Behavior
- Language toggle switches all text and `dir`; saved in browser.
- Theme toggle with system detection, saved, applied before paint (no flash).
- Fully responsive; semantic HTML.

## Notes / placeholders
- Store links, QR target, stats, testimonials, and contact email (e.g. privacy@waneesi.app) are placeholders — please send real ones later.
- Forms don't send anywhere yet; can connect to Lovable Cloud later to store requests.
- Legal text is a solid template, not legal advice — have a lawyer review.

## Technical
- TanStack Start routes per page; i18n via a typed dictionary + React context; theme via `.dark` class + inline pre-hydration script.
- Install framer-motion, qrcode.react; lucide-react icons; shadcn accordion/tabs/dialog.
- Tokens in src/styles.css (oklch); per-route head() metadata.
