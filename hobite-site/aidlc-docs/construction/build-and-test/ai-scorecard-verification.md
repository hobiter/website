# AI scorecard verification

## Story

Research library -> dated article -> typed data -> rendered rankings, tables, chart, disclosures and bilingual navigation. SVIM mirrors the same content through its existing lazy rich-research registry. No API, database, authentication or new environment variables are involved.

## Commands

Hobite, from `hobite-site`:

```sh
npm run research:ai-scorecard:mirror
npm run research:ai-scorecard:test
npx eslint app/research/ai-weekly-scorecard-2026-10-16 scripts/mirror-ai-scorecard.mjs scripts/test-ai-scorecard.mjs
npm run build
```

SVIM, from `project-albatross`:

```sh
npx eslint src/content/hobiteResearch/research/ai-weekly-scorecard-2026-10-16 src/content/researchArticles.ts src/content/richResearchPages.ts
npm run build
```

## Test boundaries

- 38 unique companies, four ETFs, correct descending source ranking and ten aligned valuation rows.
- Factor weights and hypothetical allocation each sum to 100%; allocation dollars sum to $200,000.
- All ten forecast years sum across the five product buckets; rounded segment totals reconcile within $0.11M.
- Both period balance-sheet equations reconcile; subtotal rows are not summed again.
- EN/ZH static rendering includes all sections, tickers, forecasts, accessible table headers and limitation notices.
- Personal account amounts are absent from rendered articles.
- All four mirrored modules match the platform adapter; both language routes appear in each registry.
- Responsive tables have local horizontal scrolling and keyboard-focusable named regions.

## Results

- Data, arithmetic, privacy, SSR and mirror parity: pass.
- Focused Hobite and SVIM lint: pass.
- Initial Hobite and SVIM production builds: pass. SVIM retains its existing large-chunk warning.
- Desktop Hobite browser rendering: pass; low-contrast dark-theme links were identified and adjusted.
- Final post-adjustment Hobite and SVIM production builds: pass.
- All four HTTP routes: 200. Hobite provides prerendered article HTML; SVIM delivers its SPA shell and renders the article through the rich registry.
- Desktop browser checks: EN and ZH render on both platforms; language switching and the adapted SVIM RKLB Chinese cross-link pass. Hobite dark-theme and SVIM light-theme screenshots inspected.
- Dedicated mobile viewport screenshots: not executed in this session; tables use bounded local overflow, wrapping navigation and a small-screen typography rule.
- React review: static server-compatible components, no hooks or client waterfalls, escaped JSX content, accessible named table regions and no new dependencies.
- Independent financial audit: not completed; prominently disclosed in both languages.
- New scheduled updates, brokerage access, production deployment and automatic trading: not implemented or claimed.
