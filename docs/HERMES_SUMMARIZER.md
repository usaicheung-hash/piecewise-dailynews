# Hermes Summarizer Workflow

This site does **not** require OpenAI API for summaries.

Two summarization modes exist:

1. `OPENAI_API_KEY` mode: `/api/refresh` calls OpenAI-compatible summarizer directly.
2. Hermes editor mode: a Hermes cron job uses the currently configured Hermes model/provider to read new RSS rows from SQLite, write Traditional Chinese summaries, and update the website database.

Current Hermes cron job:

- Name: `aihub-hermes-daily-editor`
- Schedule: `20 7 * * *` Hong Kong time
- Workdir: `/home/ubuntu/hk-ai-intelligence-hub`
- Delivery: local only

The normal RSS/model/GitHub refresh still runs first via `/usr/local/bin/aihub-refresh`, then Hermes generates editorial summaries into:

```text
/home/ubuntu/hk-ai-intelligence-hub/data/aihub.sqlite
```

The website reads the DB dynamically, so no Next.js restart is required after summary updates.
