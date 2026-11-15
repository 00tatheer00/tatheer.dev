# Tatheer Hussain — Software Engineer Portfolio

Personal portfolio website for **S. Tatheer Hussain**, Software Engineer and Full-Stack Developer.

This repository contains the static-first portfolio website built with HTML, CSS, and JavaScript, with optional PHP contact form handlers.

## Run locally

Open `index.html` in a browser, or start a local server:

```bash
python -m http.server 4173
```

Visit [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Technology

- HTML for semantic page structure
- CSS for responsive layouts and visual styling
- JavaScript for interactive behavior
- Optional PHP handlers for contact and mailing-list forms

## SEO foundations

The project includes:

- Canonical URL and language metadata
- Open Graph and Twitter card metadata
- Structured data using Schema.org vocabulary
- `robots.txt` and `sitemap.xml`
- Hero image preload and loading priority

## Post-deployment checks

After publishing changes, verify:

1. Canonical URL, redirects, and HTTPS.
2. Sitemap and robots accessibility.
3. Structured data using Google's Rich Results Test and Schema.org Validator.
4. Mobile and desktop performance using Lighthouse and PageSpeed Insights.
5. Contact form delivery and spam protection.

## Repository layout

- `index.html`: primary portfolio page
- `asset/css/styles.css`: active stylesheet
- `asset/js/`: site behavior and scripts
- `asset/images/`: images and visual assets
- `asset/contact/`: optional PHP contact handler
- `robots.txt` and `sitemap.xml`: crawl configuration

## Security and maintenance

- Keep secrets and private configuration out of source control.
- Review server-side form handlers before deployment.
- Do not commit generated logs, operating-system metadata, or local editor files.
- Keep external libraries and dependencies reviewed and up to date.

## Links

- [Live portfolio](https://tatheer.dev)
- [GitHub profile](https://github.com/00tatheer00)
- [LinkedIn](https://www.linkedin.com/in/tatheer-hussain)

## License

No license file was identified during this review. Confirm the intended license before redistribution.

---

## Repository standards

- [Contribution guidelines](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Pull request template](./.github/PULL_REQUEST_TEMPLATE.md)
