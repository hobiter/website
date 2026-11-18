# Q3 2026 13F publication QA

Date: 2026-11-17. Scope: Hobite only. Branch: codex/q3-2026-13f-manager-report.

## Reproduce

Run from the Hobite site with the existing Node 24/npm dependencies installed:

```powershell
npm run research:13f:data
npm run research:13f:test
npm run build
npm start -- --port 3000
```

Data regeneration requires SEC network access and fast-xml-parser. It caches public documents under ignored `.cache/q3-2026-13f/`, limits request rate and uses a dated November 17 cutoff. Clear that named cache deliberately to re-fetch source bytes if needed. No application credentials, database migrations or new environment variables are needed. Do not replace this report with later amended data without reviewing the dated scope.

## Results

- Data extraction: 20/20 managers, both quarters, 42 report documents, 28,707 long-SH comparison rows. Original XML hashes, information-table counts and cover totals reconcile, with disclosed rounding tolerance and two explicit legacy-scale adjustments.
- `research:13f:test`: PASS. Synthetic namespaced XML, numeric validation, duplicate aggregation, option/principal exclusions, share/value math, new/exit conventions, split flags, amendment replacement/addition, ranking order and exclusions, totals, source provenance, download manifest parity and bilingual server rendering. All 42 cached reports independently re-extracted and hashes checked. Without the optional cache, deterministic snapshot/math/render tests still run; the original-byte audit is reported as zero cached reports, not claimed.
- Aggregate change proxies checked against aggregate share deltas times quarter-specific implied prices. Fully exited securities use Q2, continuing securities use Q3. Gross-category values include only participating managers.
- Four cross-filer unit-scale checks (two managers x two quarters) have over ten common securities and median normalized/reference price ratios within 1%.
- Bilingual SSR: 105 nonempty tables, 20 manager disclosures, seven numbered sections, one H1, source links and limitations present. Categories with fewer than ten rows are not padded; empty categories show an explicit message.
- Focused ESLint: PASS, no errors/warnings in changed TSX and scripts.
- `npm run build`: PASS, TypeScript and all 79 static pages, including both new routes.
- HTTP: 200 for research library, English report, Chinese report, comparisons.csv and source-manifest.json. Full CSV is about 6.25 MB, not a sample export.
- Desktop browser at default 1280 width: report and tables render; Berkshire expands to four nonempty tables; SEC source links visible; library link opens report; EN/ZH navigation works; CSV download completes.
- Narrow viewport 390 x 844: both language versions have document width 375 (scrollbar excluded), no page-wide table overflow. Chinese table container width 341 versus content 1092; keyboard right-arrow changes internal scrollLeft to 7. Screenshot inspected for Chinese title/warnings/metrics and table clipping within its scroll area. Temporary viewport override reset afterward.
- Fixed during QA: article in the site's column-flex layout initially grew to table minimum width. Explicit article width 100% now constrains tables and enables internal scrolling.
- Local preview remains at `http://localhost:3000/research/q3-2026-13f-investment-managers` with `/zh` translation. Preview server started hidden (PID 7064); no production deployment or automatic merge performed.

## Residual limits

No complete corporate-action/security-master audit, current-price feed, transaction ledger, net fund exposures, outstanding-share ownership data or personalized recommendations. Normalized values for two filers are analytical assumptions supported by same-security cross-checks, not amended SEC statements. Long-SH denominators include funds and some other share classes; equity-oriented rankings use disclosed heuristic exclusions. Totals may economically overlap across managers. No global unrelated-report test suite or SVIM build is claimed.
