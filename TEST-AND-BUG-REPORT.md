# Verification and follow-up — 3 October 2026

## Passed

- Production build on Next.js 14.2.35, including TypeScript validation and all 24 generated pages.
- Production-server HTTP smoke checks: registration, correct-password login, session identity, incorrect-password rejection, anonymous learner redirect, authenticated learner dashboard, study, quiz, profile and review routes.
- Progress save/readback for a temporary account, anonymous progress rejection, and logout cookie removal. The temporary account and its progress were removed afterward.
- Public routes, unique metadata, canonical URLs, JSON-LD, sitemap, robots, account noindex, lesson protection and sharing image, using `npm run verify:seo` against both development and production servers.
- Source-file scan of the Git candidate files: no matches for the configured database password or JWT secret; no matches for the private-key, AWS access-key or GitHub-token patterns checked. `.env.local` remains ignored. This is a limited scan, not proof that all secrets or historical leaks are absent.

## Follow-up priorities

1. **Dependency security:** `npm audit` reported 23 affected packages: 1 critical, 16 high, 4 moderate and 2 low. Next.js was marked critical; direct dependencies also flagged included mysql2, next-intl, postcss, tailwindcss, tailwindcss-animate and Vite. Plan upgrades and rerun the audit; do not blindly apply forced major-version upgrades. These are advisory matches, not confirmed exploit tests.
2. **Predictable authentication fallback:** `src/lib/auth.ts` and `middleware.ts` use the public string `fallback-secret` if `JWT_SECRET` is missing. Require a strong configured secret and fail closed if it is absent. No session-forgery test was performed against real users.
3. **Database TLS:** local connection settings disable certificate verification. Configure the Aiven CA certificate and retain verification rather than relying on `DB_SSL_REJECT_UNAUTHORIZED=false`.
4. **Progress integrity:** `/api/progress` accepts browser-supplied XP, hearts, streaks, badges and lesson completion with no server-side validation of earned rewards or lesson sequence. Derive rewards and progression from validated lesson events on the server.
5. **Error disclosure:** progress GET/POST return raw database exception messages. Replace them with safe public messages; retain diagnostics on the server.
6. **Authentication abuse protection:** login and registration have no visible rate limiting. Add protection against repeated attempts. Session cookies should set `secure` in production.
7. **Quiz answer exposure:** filenames and bundled lesson data reveal sign answers. Neutral image filenames reduce accidental disclosure; server-controlled assessment is needed if tamper resistance matters.
8. **Registration consistency:** user insertion, progress creation and token issuance are separate operations. A later failure can leave a partial registration; use a transaction.
9. **Lint debt:** after restoring a missing file in the local lint dependency, source lint reported 19 errors and 10 warnings, chiefly explicit `any`, unused imports/variables and hook dependencies. The default ESLint configuration also needs to exclude generated Next.js caches.
10. **Build warnings:** jose imports CompressionStream/DecompressionStream code into the Edge middleware bundle. Review Edge-compatible imports; the tested authenticated routes worked in the production smoke run.
11. **Existing placeholders:** several old-site footer links point to `#`; forgot-password functionality and remaining onboarding routes need dedicated interaction checks.

## Practical limits

These checks cover production build, HTTP routes and account/progress API behavior. They do not certify every browser interaction, translation, device, lesson, accessibility requirement or deployment environment. The smoke test requested study and quiz pages but did not answer a complete lesson through the browser. No load, penetration or exhaustive visual test was performed.

The database connection issue observed earlier was resolved after powering on the Aiven service. Free-service inactivity power-offs can interrupt sign-in again.

## Interaction feedback follow-up

- Added shared route loading, immediate internal-link navigation status, a slow-navigation retry link, and progress-loading feedback before learners interact with default progress.
- Added visible save status, load/save errors and retry. Progress writes are serialized; follow-up updates read the latest local state. Lesson completion saves rewards and completion together in one request.
- Login and registration show spinners and stay pending during redirect. Study-to-quiz controls show pending state. Logout failures re-enable the control and show an error. Flashcards support Enter and Space.
- Feedback copy is present in all 12 locales. New standalone components and updated account/sidebar/profile code pass targeted ESLint checks; existing lint debt elsewhere remains.
- Controlled React-renderer tests passed for pending saves, failed-save visibility, retry of the latest snapshot, preserved heart count, one-write lesson completion, failed-load recovery, internal-link feedback in the capture phase, clearing feedback on route change, and ignoring modified clicks.
- Live browser verification was limited by repeated browser-control timeouts; these tests do not replace a full visual or slow-network browser pass.
