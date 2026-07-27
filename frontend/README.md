# NoBarriers — frontend

The Next.js application. See the [project README](../README.md) for an overview
and [`DESIGN.md`](../DESIGN.md) for the design rules that govern all UI changes.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in database credentials
npm run dev
```

Runs at http://localhost:3000.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve a production build locally |
| `npm run lint` | ESLint |

## Layout

```
app/            Routes (App Router) and API endpoints
  api/auth/     Register, login, logout, session
  api/progress/ Learner progress read/write
  learn/        Course pathway
  study/        Study mode — learn the signs
  lesson/       Quiz mode — assessment
src/
  components/   UI components, grouped by area
  data/         Course, unit, lesson and sign definitions
  lib/          Database pool and auth helpers
  store/        Progress context
messages/       Translations — 12 locale files
public/signs/   Sign images served to learners
```

## Notes

- Tailwind config changes require a dev-server restart to take effect.
- Any new interface text must be added to **all** files in `messages/`.
- Database tables are created on first request by `initDB()` in `src/lib/db.ts`.
