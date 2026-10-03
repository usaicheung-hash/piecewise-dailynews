# PieceWise AI — Hong Kong AI Intelligence Hub

Production-oriented Next.js UI/UX foundation for a Hong Kong-first AI intelligence website.

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## What is built
- Responsive dark/light UI system with Hong Kong Traditional Chinese content
- Homepage dashboard: news digest, model cards, Skills/MCP cards
- Model leaderboard, detail pages, comparison, price calculator
- News and Hong Kong news pages
- Skills/MCP hub, directory pages, detail pages with permission/security blocks
- Learn section architecture for Codex/Hermes guides
- Admin console UI and `/api/refresh` scaffold
- Scoring tests

## API keys needed for full live data
`OPENAI_API_KEY`, `ARTIFICIAL_ANALYSIS_API_KEY`, `OPENROUTER_API_KEY`, `GITHUB_TOKEN`, database credentials.

## Automatic updates
Use cron/systemd or hosted scheduler to call `POST /api/refresh` with `x-cron-secret`. The implementation scaffold is ready for source connectors.
