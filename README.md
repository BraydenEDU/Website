# Annuit marketing site

Static site for annuit.com, generated with Python (Jinja2 + YAML). The output is plain HTML, CSS and JS that any static host can serve: Vercel, Netlify, Cloudflare Pages or S3.

## Run it

```bash
pip install -r requirements.txt
python build.py --serve      # builds dist/ and serves it at http://localhost:8000
```

`python build.py` builds without serving. Deploy the `dist/` folder.

| Command | What it does |
|---|---|
| `python build.py --copy-doc` | Exports every word on the site to `docs/annuit-site-copy.docx` for Annuit to comment on |
| `python tools/screenshots.py` | Captures desktop and phone layouts of every page into `design/` (add `--lang es` or `--lang zh`) |

Project docs: `docs/BRIEF_CHECKLIST.md` (every requirement in the proposal and where it is met), `docs/SITEMAP.md` (page briefs), `docs/LAUNCH_NOTE.md` (launch template).

## Where things live

| What | File |
|---|---|
| Every word on the site (English) | `content/en.yaml` |
| Spanish and Chinese copy | `content/es.yaml`, `content/zh.yaml` (missing keys fall back to English) |
| Links, customers, video URL, testimonial, Stripe IDs, analytics, sample client data | `site.yaml` |
| Page layouts | `templates/` (`base.html` holds the nav and footer) |
| Images (logo, share image) | `static/img/`, referenced by file name in `site.yaml` |
| Styles and brand colors | `static/styles.css` (tokens at the top) |
| Interactions and event tracking | `static/main.js` |

## Changing content without touching code

Open the YAML file on GitHub, click the pencil icon, edit the text between the quotes, and commit. If the host is connected to the repo, the site rebuilds and redeploys on its own. The two rules: keep the quotes, and keep the indentation.

## Deploy (Vercel)

Everything Vercel needs is in the repo: `vercel.json` (build settings, clean URLs, security headers), `build.sh` (installs Python packages and builds) and `requirements.txt`. No settings need changing in the Vercel dashboard.

1. Push this repo to GitHub (see "First push" below).
2. In Vercel: **Add New > Project**, import the repo, leave every setting on its default, click **Deploy**.
3. The staging URL (`<project>.vercel.app`) is ready in about a minute. Every push to `main` redeploys; every other branch or pull request gets its own preview URL.
4. At launch: **Project > Settings > Domains**, add `annuit.com` and `www.annuit.com`, and set the DNS records Vercel shows at Annuit's domain registrar.

What happens on each deploy: Vercel runs `bash build.sh`, which uses the build machine's Python if one is available, or installs one with uv if not, then runs `python build.py` and serves `dist/`. Pages are served without `.html` (`annuit.com/pricing`), and `404.html` handles unknown URLs.

Command-line alternative: `npm i -g vercel`, then `vercel` (staging) or `vercel --prod` from this folder.

### First push

```bash
git remote add origin https://github.com/<your-org>/annuit-website.git
git push -u origin main
```

### Local tools (optional)

`pip install -r requirements-dev.txt && playwright install chromium` adds the copy-doc export and the layout screenshots. Vercel ignores `docs/`, `design/` and `tools/` (see `.vercelignore`).

## Analytics

In `site.yaml`, set `analytics.provider` to `plausible` or `vercel`. Every button carrying a `data-track` attribute sends a named event: `hero_book_demo`, `nav_get_started`, `calculator_used`, `demo_request_submitted`, `demo_video_play` and others. Demo bookings and sign-up clicks are tracked from day one.

## Placeholders waiting on Annuit

Search the project for `[` to find all of them.

- `[DEMO VIDEO]`: set `demo_video_url` in site.yaml
- `[TESTIMONIAL]`, `[NAME]`, `[TITLE, FIRM]`: the `testimonial` block in site.yaml
- `[STRIPE PRICING TABLE]`: `stripe.pricing_table_id` and `stripe.publishable_key`
- `[BOOKING EMBED]`: set `booking_url` (Cal.com, Calendly or HubSpot) to replace the demo form
- `[FINAL PRICING WORDING]`, privacy policy and terms text: the content YAML files
- `[OWL LOGO]`: put the logo in `static/img/` and set `logo` in site.yaml; add a 1200x630 `share_image` too
- `[VERIFY]` tags on the security proof points: confirm each claim with Annuit, then delete `security.verify` from en.yaml
- Sign-up URL and contact and security emails in `site.yaml`
- Brand fonts: the Canva kit fonts replace the Google Fonts link in `base.html` and the `--f-*` tokens

Have a native speaker review the Spanish and Chinese files before launch.

## Accounts

| Account | Owner |
|---|---|
| GitHub repo | [NAME] |
| Hosting (Vercel) | [NAME] |
| annuit.com DNS | Annuit |
| Analytics | [NAME] |
| Stripe | Annuit |
