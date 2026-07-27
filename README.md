# NoBarriers

A free web platform for learning **Rwandan Sign Language**, built so that families,
classmates, colleagues and friends of deaf people can learn to sign — and so that
deaf learners see their language treated as a language worth teaching properly.

**Live:** https://nobarriers.co.rw

Lessons are short and interactive: study mode introduces each sign, then a quiz
checks what stuck. Progress, streaks, XP and badges carry across sessions, and the
whole interface is available in 12 languages including Kinyarwanda and Kiswahili.

---

## What's in the repo

| Path | Contents |
|---|---|
| `frontend/` | The Next.js application — pages, API routes, components, translations |
| `lessons/` | Source sign images, organised by topic (alphabet, numbers, family, foods, …) |
| `DESIGN.md` | **The design rulebook.** Read this before changing any UI |
| `reports/` | Generated implementation and financial reports (PDF) |

## Tech stack

- **Next.js 14** (App Router) with **TypeScript**
- **Tailwind CSS** — all colour and type comes from the tokens in `tailwind.config.js`
- **MySQL** via `mysql2` for users and learner progress
- **next-intl** for the 12 supported languages
- Custom authentication — `bcryptjs` for password hashing, JWT sessions via `jose`
- Deployed on **Vercel**

## Running it locally

```bash
cd frontend
npm install
cp .env.example .env.local   # then fill in your database credentials
npm run dev
```

The app runs at http://localhost:3000. Database tables are created automatically
on first request, so an empty MySQL database is all you need to start.

Without database credentials the pages still render, but registration, sign-in
and progress tracking will return errors.

## Course content

Courses, units, lessons and signs are defined in TypeScript under
`frontend/src/data/` rather than in the database, so content ships with the code
and is reviewable in pull requests. Sign images live in `frontend/public/signs/`.

Three courses are currently published:

- **Beginner** — greetings, alphabet, numbers, colours
- **Everyday Life** — family, clothes, foods, drinks, days, months
- **Intermediate** — time, school subjects, advanced numbers and vocabulary

## Design system

The project follows a documented design system called **Deep Water**, defined in
[`DESIGN.md`](DESIGN.md). The short version:

- Use the Tailwind tokens (`bg-brand`, `text-ink`, `bg-paper`, …) — never raw
  palette colours like `bg-teal-600`
- Amber is reserved exclusively for gamification: streaks, XP, quests
- Blue marks course units and wayfinding, never actions
- Nunito for headings, Nunito Sans for body, Caveat for occasional display
  headlines only
- Accessibility is non-negotiable: WCAG AA contrast, visible focus states,
  44px touch targets, and quiz answers must never leak through image alt text

## Contributing

Work happens on branches and merges through pull requests. New user-facing text
must be added to all 12 files in `frontend/messages/` — English alone will leave
gaps in the other languages.
