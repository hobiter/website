# CRWV Research Workflow

Request: "follow this standard procedure to do the similar Financial Analysis work for CRWV, Generate the same PR for both hobite website, and svim.io."

Research cutoff October 13, 2026. Existing company standard, reverse-engineering artifacts and standing autonomous completion authorization apply. Extensions remain disabled. Separate scoped branches from remote main; no new infrastructure or automatic merge.

## Requirements And Design

English/Chinese CoreWeave hub in both research libraries. SEC filing inventory, available annual and quarterly history, field provenance, GPU infrastructure/capex/debt/customer economics, long report, charts, historical valuation, interactive enterprise-to-equity scenarios, sensitivity, source audit and QA. Pre-IPO periods are not assigned public prices. Unavailable gross profit, utilization and GPU-level margins stay null. Gross profit cannot be inferred simply from revenue less cost of revenue because technology/infrastructure expense contains significant depreciation.

Model: explicit unlevered operating profit, tax, depreciation, economic capex and working-capital investment produce FCFF. Include negative cash flows in enterprise PV; do not also deduct their funding deficit. Subtract existing principal debt and finance lease obligations, add only eligible unrestricted cash. Operating lease payments remain in operating costs. Future issuance is an independently disclosed dilution stress, not a solved financing waterfall. No liquidation loss floor, full covenant simulation or GAAP forecast claimed.

## Plan

- [x] Inspect clean repositories, standard workflow and existing hubs.
- [x] Build available SEC annual/quarterly history and financial provenance.
- [x] Audit operating disclosures, financing and dated market data.
- [x] Implement bilingual long report, charts, enterprise model and audit.
- [x] Register and mirror English/Chinese pages in SVIM.
- [x] Verify data/model/parity, both builds and server-rendered/HTTP route delivery.
- [ ] Desktop/mobile visual review: browser tool unavailable after initialization and reset; manual review still required.
- [x] Commit, push, create matching cross-linked PRs and attach them; do not merge.

Matching draft PRs: [Hobite #84](https://github.com/hobiter/website/pull/84), [SVIM #86](https://github.com/svim-labs/project-albatross/pull/86). Both attached to the chat and unmerged. Visual review remains open; no production deployment claimed.

## Verification

Passed: data generation, adapted mirror parity, dedicated data/model/sensitivity and English/Chinese server-render tests, focused lint and both production builds. Both Hobite pages and both SVIM SPA route endpoints return HTTP 200; Hobite library links verified. Representative SEC and issuer PDF endpoints return 200. Actual browser screenshots and live mobile/control tests are not claimed: browser tool initialization fails with missing runtime assets even after reset. Matching PRs will be drafts pending visual review.

Full SVIM parity retains pre-existing unrelated Netflix omissions and older report divergences; no CRWV missing metadata, source mismatch or unresolved import. Existing bundle-size warnings unchanged. Optional extensions remain disabled; compliance N/A.

## Model And Research Limits

Four annual periods (FY2022-25), six quarters (2025Q1-2026Q2), not synthetic ten-year public history. FY2022 manually audited to IPO tables and filing date from submissions; earlier balance values missing. Capital payables and current October liquidity are not fully reconciled. Model is June-anchored plus known September financing, including a full H2 deployment stub; comparison with October price is approximate. Pre-IPO price history absent. Disclosure qualifiers, anonymous customer labels, RPO/backlog distinction, EBITDA/GAAP and cash/economic capex separation retained. No guarantee of ROI or solved financing/covenant waterfall.

Commands: `npm run research:crwv:data`, `npm run research:crwv:mirror`, `npm run research:crwv:test`, `npm run research:crwv:routes` (preview servers required), both sites' `npm run build`.
