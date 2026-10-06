# PieceWise AI redesign plan

Target: `usaicheung-hash/piecewise-dailynews`. Reference: local `Claude/Piecewisehk-ai` brand plan and website source. The reference is not the application being changed.

## Direction

A lime-and-ink AI editorial studio: generous whitespace, bold type, restrained glass surfaces, and a dimensional piecewise sculpture. Retain Hong Kong Traditional Chinese, all existing public routes, the SQLite data store, and refresh integration.

## Changes

1. Replace the duplicate sidebar/top navigation with a single responsive header and grouped resource menu. Add search across models, news, resources, and guides.
2. Create a homepage with a pointer-responsive CSS 3D sculpture, latest source-backed stories, purposeful entrances, and clear routes to reading, comparing, and learning. Pause motion and support reduced-motion preferences.
3. Make the price calculator recalculate from numeric token inputs and exchange rate; support USD/HKD and honest missing-price handling.
4. Let visitors select up to four models to compare. Add model search, provider filtering, and sorting.
5. Make resource search, type filters, and sorting work; add news search and source filtering with useful empty states.
6. Surface sample data and distinguish heuristic scores from benchmark evidence. Do not describe seeded records as recently verified.
7. Unify listing, detail, and guide styling; improve table scrolling, keyboard focus, mobile sizing, and load/error states.

## Verification and handoff

Run TypeScript, existing tests, targeted calculation tests, production build, and browser checks at desktop/mobile sizes. Check input changes, selection limits, search reset, keyboard navigation, and reduced motion. Commit and push a redesign branch to GitHub with a pull request for review.

## Audit findings

- Calculator inputs are decorative and costs are fixed.
- Comparison always shows the first four models.
- Resource search/type/sort inputs have no behavior.
- Header search claims to search models but links only to resources.
- Current stylesheet stacks several conflicting visual systems.
- Seeded model scores are presented as real rankings. OpenRouter refresh uses context length to generate a heuristic score.
- Local development has no news until an existing refresh or database supplies records. Empty news must remain honest, without fabricated headlines.

Live server credentials, paid summarization, and production deployment are outside this source redesign; the existing refresh integration is retained.

## Completed implementation and validation

- Replaced the stacked visual systems with a single lime, off-white and deep-green design aligned with the local Piecewise brand plan.
- Added a six-face CSS 3D cube sculpture with pointer tilt, staggered floating, pause control and reduced-motion CSS.
- Consolidated navigation, added global search, functional model/resource/news filters, four-model comparison and a live token calculator.
- Marked sample and heuristic model data, clarified methodology, fixed zero/missing price imports, corrected resource update labels and changed the sitemap to use database records.
- Fixed a pre-existing scoring module collision (`scoring.mjs` vs `scoring.ts`) by naming the runtime TypeScript module `model-scoring.ts`.
- Changed the inaccessible private npm mirror to public npm. Pinned Next 16.3.8 and a Windows-compatible better-sqlite3 12.11.1; applied compatible transitive audit fixes.

Checks completed:

- TypeScript with `npm run typecheck`.
- Existing scoring tests plus calculation tests covering changed volumes, zero/free pricing, missing pricing, invalid values and tiny costs.
- Production webpack build. Local Windows sandbox required precreated output directories and `PIECEWISE_PRESERVE_BUILD=1`; production host clean builds were not executed.
- Browser testing against the production build: USD 6.50 to HKD 50.70 at rate 7.8 after doubling the default GPT-5 token volumes; invalid token rejection; selection capped at four; clearing comparison; model provider filtering and context sorting; resource search/type filters/reset; global Codex search.
- Temporary local news fixtures tested source filtering, Hong Kong filtering, combined no-match state and reset. Both fixtures were removed; no fabricated news is included in the deliverable.
- Desktop visual inspection and 390-pixel mobile homepage/guide checks, with no horizontal page overflow. Mobile menu opens, Escape closes it, and pause stops the cube animation. Reduced-motion rules are included; OS-level reduced-motion emulation was not available in the browser tool.
- 25 public page/metadata/health routes returned HTTP 200, including all guides and representative model/resource detail pages.
- `npm audit` reported zero known vulnerabilities after dependency fixes.

Limits: paid/live refresh, production credentials, Docker build, production deployment, and production database contents were not tested or changed. News freshness still depends on the existing server scheduler. The GitHub branch and pull request deliver source changes for deployment.
