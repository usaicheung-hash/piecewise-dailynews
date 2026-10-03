# Architecture

Next.js App Router serves UI and API routes. Production target: Docker Compose with Next.js app, PostgreSQL, scheduled worker, and Caddy/Nginx TLS reverse proxy.

Data domains: models, model metrics/prices/usage, news articles/clusters/daily digest, extensions/categories/tags/metrics/security/events, tutorials, refresh jobs.
