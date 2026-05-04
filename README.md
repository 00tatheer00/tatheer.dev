# S Tatheer Hussain Portfolio

Personal portfolio website for S Tatheer Hussain (Software Developer and Technical Trainer), built as a static-first site with HTML, CSS, JS, and optional PHP form handlers.

## Run Locally

- Open `index.html` directly in a browser, or
- Serve with a local server:
  - `python -m http.server 4173`
  - then visit `http://127.0.0.1:4173`

## Tech Stack

- Markup: `index.html`
- Styling: `asset/css/styles.css` (CSS-only workflow)
- Scripts: `asset/js/main.js` + vendor scripts
- Optional backend handlers:
  - `asset/contact/contact-process.php`
  - `asset/mail/subscribe.php`
  - `asset/mail/subscribe-mailchimp.php`

## SEO Implementation (Professional Baseline)

This project includes high-level on-page and technical SEO foundations:

- Canonical URL and hreflang (`en`, `x-default`)
- Advanced robots directives for major crawlers
- Open Graph and Twitter card metadata for rich social previews
- Semantic structured data (`@graph`) with:
  - `Person`
  - `WebSite`
  - `WebPage`
  - `ProfessionalService`
  - `FAQPage`
- Crawl controls:
  - `robots.txt`
  - `sitemap.xml` with `<lastmod>`
- Better above-the-fold rendering signal:
  - hero image preload + eager loading priority

## SEO Validation Workflow

After each production deploy, validate:

1. **Indexing / coverage**
   - Google Search Console
   - Bing Webmaster Tools
2. **Structured data**
   - Google Rich Results Test
   - Schema.org Validator
3. **Performance + Core Web Vitals**
   - PageSpeed Insights (mobile + desktop)
   - Lighthouse

## External SEO Tasks (Required)

Complete these outside the codebase for best ranking performance:

- Verify ownership in Google Search Console and Bing Webmaster Tools
- Submit sitemap: `https://tatheer.dev/sitemap.xml`
- Configure analytics:
  - Google Analytics 4
  - Google Tag Manager
  - Microsoft Clarity (recommended)
- Ensure hosting-level SEO hygiene:
  - HTTPS redirect + canonical host redirect
  - Brotli/Gzip compression
  - browser caching for static assets
  - HTTP/2 or HTTP/3 enabled

## Notes

- Legacy SCSS source is archived at `backup/scss-backup-2026-05-04`.
- Active styling source of truth is `asset/css/styles.css`.
