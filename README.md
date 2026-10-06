# PieceWise AI — Hong Kong AI Intelligence Hub

A Hong Kong Traditional Chinese AI learning and intelligence website, with a lime-and-ink visual system and an interactive CSS 3D piecewise sculpture.

## Run locally

Use Node.js 22.18+ or 24 LTS.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Optional configuration is documented in `.env.example`. Keep real secrets in `.env.local` or the server environment.

```bash
npm run typecheck
npm test
npm run build
npm start
```

## Visitor features

- Responsive navigation, global search, keyboard focus and Escape dismissal.
- Pointer-responsive 3D hero, pause control and reduced-motion support; no WebGL dependency.
- News keyword/source/Hong Kong filters with source links and Hong Kong timestamps.
- Model search, provider filtering and price/context sorting.
- Selection of up to four models for side-by-side comparison.
- Token-based API calculator with live USD/HKD conversion and editable reference rate.
- Searchable Skills/MCP directories with type and sort controls.
- Existing Codex/Hermes guides, model/resource detail pages and PWA retained.

## Data and updates

The SQLite store is created in `data/aihub.sqlite`, or at `SQLITE_PATH`. Initial model records are examples and are labeled accordingly. A fresh database contains no news; the UI shows an honest empty state until news is imported.

The existing `POST /api/refresh` endpoint requires `x-cron-secret` matching `CRON_SECRET`. A deployed scheduler is required for automatic updates. Source imports and optional AI summarization remain in `lib/refresh.ts`; paid summarization needs `OPENAI_API_KEY`. This redesign does not call a paid refresh or configure the production scheduler.

Model scores currently include seeded examples and a context-length heuristic. They are not independent benchmark results. See `/methodology`. Zero-priced models remain free in the calculator; missing prices are excluded.

## Restricted Windows builds

The build uses webpack and one worker for portability and modest VPS memory use. Some sandboxed Windows environments deny creation of nested build output folders. `PIECEWISE_PRESERVE_BUILD=1` disables output cleaning only when explicitly enabled; ordinary builds still clean by default. The local validation prepared output directories and used this flag. See `docs/REDESIGN.md` for validation details.

Deploy by rebuilding this branch on the existing host. Pushing source alone does not deploy the live website.
