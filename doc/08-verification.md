# Phase 8: Verification

## Goal
Verify every page, component, and interaction matches the original site exactly.

## Checklist

### Routes

- [ ] `/` — Hero, branch cards, Quote, blog feed
- [ ] `/blog` — All blog posts listed
- [ ] `/blog/:slug` — Each blog post renders with header, content, sidebar
- [ ] `/totem` — Totem list loads, filter works
- [ ] `/associazione` — Content page
- [ ] `/gruppo` — Content page
- [ ] `/coca` — Staff component with filter
- [ ] `/lc/`, `/lc/lupetti`, `/lc/coccinelle`, etc. — Branch pages with MDX content
- [ ] `/eg/`, `/eg/brownsea`, `/eg/antares`, etc. — Branch pages
- [ ] `/rs/`, `/rs/mdv`, `/rs/noviziato`, etc. — Branch pages
- [ ] `/contatti` — Contact page
- [ ] `/iscrizioni` — Registration page
- [ ] `/archivio-staff` — Past staff page
- [ ] `/archivio-campi-route` — Camps page
- [ ] `/media` — LnkYearGrid with filters + search
- [ ] `/codice-socio` — Member code search
- [ ] `/uniforme` — Uniform info page
- [ ] `/morse` — Morse translator
- [ ] `/alci` — ALCE generator with PDF export
- [ ] `/materiale` — Materials page
- [ ] `/privacy-policy` — Privacy page
- [ ] 404 page — Error display

### Components

- [ ] **Header**: Desktop dropdowns work, mobile drawer works, scroll transparency
- [ ] **Footer**: Credits modal opens/closes, links work
- [ ] **Hero**: Image loads, overlay/opacity correct, title renders
- [ ] **Sidebar**: Birthdays, Weather, DailyWord all load from APIs
- [ ] **Staff**: Filter dropdown works, card grid renders, URL query sync
- [ ] **Fig**: Single image opens lightbox, carousel with prev/next works
- [ ] **Cards/Card**: Grid layout, color variants correct
- [ ] **LnkYearGrid**: Search, type filter, sort, copy link, URL hash
- [ ] **Alci**: Generate strings, copy, export .txt, export PDF
- [ ] **Morse**: Text→Morse, Morse→Text bidirectional
- [ ] **CodiceSocio**: PSK cookie save/clear, search, loading/error states

### Visual

- [ ] DaisyUI `agesci` theme colors match (primary `#462678`, secondary `#6B478D`, etc.)
- [ ] Branch colors: LC yellow, EG green, RS red, CC purple
- [ ] Fonts: Ubuntu (body), Caprasimo (headings), Playfair Display (serif)
- [ ] Material Symbols icons render
- [ ] `.prose-container` typography matches
- [ ] Responsive: mobile, tablet, desktop layouts
- [ ] Scroll behavior (navbar transparency, scroll-padding)

### Performance

- [ ] Lighthouse score (mobile + desktop) — should be equivalent or better
- [ ] No render-blocking resources
- [ ] Images lazily loaded or optimized
- [ ] All pages pass `next build` with no errors

### How to Verify

1. Run `npm run build` — clean build with no errors/warnings
2. Run `npm run start` — serve static output locally
3. Walk through every route in the checklist
4. Compare side-by-side with the live site at `https://mirandola2.it`
5. Test on mobile viewport (375px), tablet (768px), desktop (1280px+)
