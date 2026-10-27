# Proposal requirements checklist

Maps each requirement in "ASU CIS 591 Annuit Website Project Proposal" to where the project covers it.
Status: ✅ done · 🟡 built, waiting on Annuit's input · ⬜ needs an action outside the code

## Goal and success criteria
| Requirement | Status | Where |
|---|---|---|
| Visitor can say what Annuit does after the hero and demo | ✅ | Hero headline, subhead and product mockup; demo video slot directly below |
| Site matches the agreed spec | ✅ | Every homepage section below, in the brief's order |
| Team changes copy and images without the engineer | ✅ | `content/*.yaml`, `site.yaml`, `static/img/`; README explains editing on GitHub |
| Next engineer can take the code without a walkthrough | ✅ | `README.md`, one build script, commented templates |

## Homepage sections (top to bottom)
| Section | Status | Notes |
|---|---|---|
| Navigation: Features, Solutions, Security, Resources, Pricing; Sign in; Book a demo; Get started | ✅ | Language switch added |
| Hero: headline, one-line subhead, two buttons | ✅ | New pitch "Stop chasing client documents." (brief invites a better one-liner) |
| Trust line: Princeton Tax & Accounting, Paul Niu CPA | ✅ | Names set in `site.yaml` |
| Demo video (2 minutes) | 🟡 | `[DEMO VIDEO]` until `demo_video_url` is set |
| Value strip: three statements | ✅ | Rewritten as outcomes (brief said welcome to change) |
| Feature 1: Organize, before/after file names | ✅ | Shows renaming, filing to client and year, and a wrong-year flag |
| Feature 2: Track, received / wrong year / missing | ✅ | Checklist built from last year's return |
| Solutions: Intake, Review, Follow-up | ✅ | Kept as requested |
| Security: "Client documents stay private, encrypted, and yours" plus four proof points | 🟡 | Line kept as subhead under the IRS framing; four points tagged `[VERIFY]` until Annuit confirms |
| Testimonial | 🟡 | `[TESTIMONIAL]` until supplied |
| Pricing / CTA with Stripe embeddable table and two buttons | 🟡 | Table slot on homepage and Pricing page; placeholder until Stripe IDs are set |
| Footer: Product, Resources, Company links | ✅ | |

## Pages beyond the homepage
| Page | Status |
|---|---|
| Pricing | ✅ (Stripe table 🟡) |
| Security | ✅ |
| Contact / Book a demo | ✅ (booking tool 🟡) |
| Privacy | 🟡 text from Annuit |
| Terms | 🟡 text from Annuit |
| Features and Solutions as homepage anchors | ✅ `#features`, `#solutions` |
| "Get started" goes to sign-up at www.annuit.com | 🟡 URL in `site.yaml`; confirm exact path |

## Deliverables
| # | Deliverable | Status | Where |
|---|---|---|---|
| 1 | Site map and page briefs | ✅ | `docs/SITEMAP.md` |
| 2 | Final copy in a doc Annuit can comment on | ✅ | `docs/annuit-site-copy.docx` (regenerate with `python build.py --copy-doc`) |
| 3 | Desktop and phone layouts for every page, brown #2B1A13 / yellow #FFD400 | ✅ | `design/` PNGs and `annuit-layouts-en.pdf` (regenerate with `python tools/screenshots.py`). Owl logo and Canva fonts 🟡 |
| 4 | Working site on staging, then annuit.com | ⬜ | Built and deployable; needs Vercel and DNS access from Annuit |
| 5 | Content system for text, images, video, testimonial | ✅ | YAML files plus `static/img/` |
| 6 | Analytics: page views, demo bookings, sign-up clicks | ✅ | Set `analytics.provider`; events listed in README |
| 7 | Handoff README: run, deploy, content, account owners | ✅ | `README.md` (fill in owner names) |
| 8 | Launch note | ✅ template | `docs/LAUNCH_NOTE.md`, completed at launch |

## Other items from the brief
| Item | Status | Notes |
|---|---|---|
| Clearly marked placeholders so work never blocks | ✅ | Search the project for `[` |
| Better one-line pitch (students invited) | ✅ | Hero |
| Resources content at launch (open question) | ✅ | Customer story plus a trilingual client checklist |
| Chatbot (open question) | ✅ decided | Not built; the hours calculator serves the same "engage the visitor" job with no risk of wrong answers |
| Spanish and Chinese differentiator | ✅ | Full site in three languages plus the follow-up language toggle |
| SEO basics (Marketing role) | ✅ | Titles, descriptions, canonical, hreflang, share tags, sitemap.xml, robots.txt |
| Competitor site analysis (Marketing role) | ⬜ | A research deliverable, not part of the code |
| Weekly check-ins, decisions log, timeline | ⬜ | Project management, outside the code |
| Native-speaker review of ES and ZH copy | ⬜ | Required before launch |
