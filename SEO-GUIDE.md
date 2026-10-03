# NoBarriers search visibility guide

Canonical website: **https://nobarriers.co.rw**. Subject: **learning Rwandan Sign Language**. Updated 1 October 2026.

The aim is to help people looking for Rwandan Sign Language find a useful, trustworthy learning resource. A sitemap and metadata make discovery easier; they do not guarantee indexing, first place, or worldwide recognition. Focus first on specific searches that match the product, then grow toward broader sign-language learning searches.

## What is implemented

- `/`: the approved launch countdown, with a sign-language-specific description and a link to the public learning resources.
- `/rwandan-sign-language`: an introduction, beginner guidance and Rwandan reference links.
- `/sign-language`: an introductory guide to choosing and learning a sign language.
- `/courses`: public outlines generated from the actual course and unit data. The lessons remain behind sign-in.
- `/sitemap.xml`: only those four canonical public pages; no account screens or authenticated lessons.
- `/robots.txt`: public crawling allowed, API crawling excluded, sitemap declared.
- Unique public titles, descriptions, canonical URLs, Open Graph and Twitter cards.
- `/images/social-card.png`: a 1200 × 630 sharing image served as a static asset.
- Organization and WebSite JSON-LD on the homepage; breadcrumb JSON-LD on the three guides. No invented ratings, reviews, credentials, addresses or endorsements.
- Other existing routes inherit `noindex, follow`; the intended public pages explicitly enable indexing. This keeps the old account/app screens out of search while the public site is being rebuilt.
- Vercel preview environments disable indexing and sitemap entries. Production pages use the configured canonical origin.
- Optional Google and Bing ownership verification tokens via deployment environment variables.

The public guides are English pages. They do not claim translated versions or publish hreflang links to nonexistent translations. The app's current cookie-based language switching is not a multilingual SEO strategy.

## Your first steps after deployment

1. **Confirm the production domain in Vercel.** Connect `nobarriers.co.rw` to the production project, check HTTPS, and set `SITE_URL=https://nobarriers.co.rw`. Redirect any connected `www` or alternate hostname permanently to this primary hostname. Verify the Vercel project builds the `frontend` directory. Keep platform protection on preview deployments.
2. **Verify ownership in [Google Search Console](https://search.google.com/search-console).** Add the Domain property `nobarriers.co.rw`. Copy Google's TXT record into the DNS provider for the domain, then return to Search Console and verify. Keep that DNS record. This requires your Google account and DNS access.
3. **Submit the sitemap.** In Search Console's Sitemaps section submit `https://nobarriers.co.rw/sitemap.xml`. Confirm it is fetched successfully. A successful submission is not confirmation that every URL has been indexed.
4. **Inspect each public URL.** Use URL Inspection and Test Live URL for the homepage and each guide. Check that Google sees the text, canonical address and indexing permission, then request indexing. Check again after Google has had time to crawl; repeated requests do not speed it up.
5. **Validate structured data.** Use Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). Breadcrumb or organization markup may be valid without producing a special search appearance.
6. **Add Bing.** Verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/) and submit the same sitemap. You can use its Search Console import if it is available for your account.
7. **Publish accurate identity information.** Supply the real team names, contact email, official social profile URLs and any teaching qualifications you want published. Add author and reviewer biographies once confirmed. The site's source links do not establish a partnership with RNUD or NCPD.

Alternative to DNS verification: add a Google URL-prefix property for `https://nobarriers.co.rw/`, choose the HTML-tag method, and put only the tag's `content` value in Vercel's `GOOGLE_SITE_VERIFICATION`. Redeploy, then verify. Bing's optional HTML-tag value belongs in `BING_SITE_VERIFICATION`. Never put account credentials in these variables. `.env.example` documents all three values; real secrets stay in deployment settings or ignored local files.

## The teaching content that will grow the site

Recruit fluent Rwandan signers, preferably Deaf educators, to create and review demonstrations. Credit and compensate contributors, get permission to publish their recordings, and explain the editorial process publicly. Keep the hands, face, movement and relevant body position visible; provide replay controls, captions and readable explanations. Do not use generated hands as authoritative teaching demonstrations.

Build a small number of useful public topic pages first. Each should answer a real question and include an original, reviewed demonstration, a clear explanation, practice advice, sources and a next step. Avoid publishing many thin pages with rewritten versions of the same text.

| Priority | Search intent | Suggested content |
| --- | --- | --- |
| First | learn Rwandan Sign Language; Rwandan Sign Language for beginners | Expand the existing introduction with a reviewed first lesson and teacher profiles. |
| First | Rwandan Sign Language greetings | Demonstrate a few greetings, movement and common mistakes; offer a short practice exchange. |
| First | Rwandan Sign Language alphabet; numbers | Create accurate video-based lessons and explain when fingerspelling or numbers are used. |
| Next | sign language courses Rwanda; learn sign language online | Add real course expectations, teacher details, access requirements and accurate pricing when decided. |
| Next | sign language for families in Rwanda | Practical conversations developed with families and Deaf educators. |
| Later | Rwandan Sign Language versus ASL | A reviewed explanation with examples, without implying the languages are interchangeable. |

These are content ideas, not measured search-volume claims. Use Search Console data to see the actual queries people use. Ask prospective learners which questions they need answered.

## Videos and public lesson pages

Create a dedicated public watch/lesson page for each useful demonstration when the videos are ready. Make the main video easy to find, include a unique title, description, stable thumbnail, transcript or explanation, publication date and reviewer credit. Add `VideoObject` markup using the actual video URL, thumbnail, upload date and duration. Add video sitemap entries only for real public watch pages. We cannot accurately create video markup before those assets exist.

Publish companion videos on YouTube using titles such as "Rwandan Sign Language greetings | NoBarriers" and link to the matching website lesson. Include captions and a short useful description. Publish consistent, accurate demonstrations rather than unrelated viral content.

## Languages and international discovery

Begin with English and professionally reviewed Kinyarwanda content. When translated public guides are ready, give each language its own stable URL, for example `/en/rwandan-sign-language` and `/rw/rwandan-sign-language`. Each page needs matching visible text, title, description, HTML language and canonical URL. Add reciprocal hreflang references and include the genuine language variants in the sitemap. Preserve existing URLs with redirects if moving them.

Changing an interface label by cookie does not give Google a separate translated page to index. Explain clearly that the teaching language is Rwandan Sign Language, even when the explanation is written in English, French or Kinyarwanda. Add other languages based on learner demand and review capacity.

## Build recognition outside the website

- Use the same name, domain and concise description across official profiles: "NoBarriers helps people learn Rwandan Sign Language."
- Approach schools, Deaf associations, universities and accessibility programmes with a useful resource they can evaluate. Ask for a resource link only when the material is relevant; do not claim partnerships before agreement.
- Share a reviewed lesson, workshop or educator story with relevant publications and communities. Give people a reason to cite your work.
- Add official profile URLs to Organization `sameAs` only after they are supplied and verified.
- Collect authentic feedback and permission to quote it. Publish real feedback; do not manufacture reviews or add aggregate-rating markup without a valid basis.
- Avoid paid link packages, keyword stuffing and mass-produced location pages. Use a Google Business Profile only if the real operation meets its eligibility requirements; a website alone is not an eligible physical business.

## A practical first 90 days

**Week 1:** deploy the foundations, connect the domain, verify Search Console/Bing, submit the sitemap, inspect the pages and confirm who will review lessons.

**Weeks 2–4:** improve the public guides with educator input; record and publish two strong beginner lessons; establish official profiles and a clear contact channel.

**Month 2:** publish one reviewed useful lesson each week if the team can sustain it; publish companion videos and approach relevant educators/organisations with the strongest resources.

**Month 3:** review queries and pages that earn impressions; improve weak explanations and snippets; add reviewed Kinyarwanda pages if ready; build new topics around questions learners actually ask.

## Measure progress

Check Search Console monthly for indexed public pages, impressions, clicks, queries, countries and devices. Compare similar time periods; separate searches for "NoBarriers" from searches about learning sign language. Search rankings differ by location and person, so searching your own brand is not a reliable measurement.

If desired, choose an analytics tool and implement it with appropriate privacy information. Track useful outcomes such as course-interest clicks, registrations after launch and completed lessons. Agree a baseline first; set targets from actual results rather than promised traffic numbers.

When the countdown ends, update the homepage copy, replace the dated launch notice, and check that public resources remain linked. The existing timer reaching zero does not automatically launch the learning product. If a guide URL changes, add a permanent redirect and update sitemap/internal links. Do not remove the public guides just because the dashboard is available.

## Implementation locations and verification

- Shared site origin, public route list, metadata and JSON-LD serialization: `frontend/src/lib/seo.ts`.
- Crawler files: `frontend/app/robots.ts` and `frontend/app/sitemap.ts`.
- Public content: `frontend/app/sign-language/page.tsx`, `frontend/app/rwandan-sign-language/page.tsx`, `frontend/app/courses/page.tsx`.
- Shared guide design: `frontend/src/components/public/PublicGuide.tsx`; sharing image: `frontend/public/images/social-card.png`, generated by `frontend/scripts/generate-social-card.ps1`.
- Default noindex and optional verification tokens: `frontend/app/layout.tsx`. Any future public page must explicitly use public metadata, link from the site, and join `publicPages`.

Check `/robots.txt`, `/sitemap.xml`, `/images/social-card.png`, canonical tags and JSON-LD after production deployment. On a preview deployment, confirm noindex and `Disallow: /`. Account pages should remain noindex; authenticated pages must remain access-controlled. robots.txt is not an access-control mechanism.

Run `npm run verify:seo` inside `frontend` with the local server running to check public HTML, canonical URLs, metadata, JSON-LD, sitemap entries, account noindex, sign-in gating and the sharing image. After deployment, run `npm run verify:seo -- https://nobarriers.co.rw` against production. This check expects production indexing settings, so it is not intended for Vercel preview deployments.

## Official references

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Verify Search Console ownership](https://support.google.com/webmasters/answer/9008080)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Managing multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video)

Indexing and rich-result appearance are Google's decisions. These changes make the site discoverable and its subject clear; sustained recognition requires accurate lessons, real community participation and useful resources.
