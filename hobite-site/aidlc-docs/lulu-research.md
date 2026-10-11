# LULU Research Workflow

Request: "follow this standard procedure to do the similar Financial Analysis work for LULU, Generate the same PR for both hobite website, and svim.io."

Research cutoff: October 11, 2026. Reuse the company research standard, existing reverse engineering and standing automatic-completion authorization. Existing extensions remain disabled. No infrastructure change or automatic merge.

## Requirements, Stories And Design

Readers can inspect SEC annual and quarterly history, retail operating metrics, lease/inventory economics, current normalization, long-form English/Chinese analysis, historical valuation, interactive scenarios, source audit and publication caveats. All financial flows have field-level provenance. Missing disclosures remain null. A shared company view is mirrored into SVIM with route adapters; no new dependencies.

Valuation uses modeled owner free cash flow, discounted directly to equity; operating leases are treated as operating costs and not subtracted a second time. Cash retained as a liquidity reserve is not added to value. No buyback accretion is assumed. Discount rate must exceed terminal growth. Fiscal dates differ from calendar years. Q4 flows are annual less first three quarters; Q4 EPS remains null. Cumulative cash flows are differenced to obtain discrete quarters.

## Plan

- [x] Inspect workflow, clean repositories and article registration patterns.
- [x] Build SEC filing inventory and provenance-backed financial history.
- [x] Research retail operations, current events and dated market data.
- [x] Implement bilingual report, dashboard, model, audit and QA.
- [x] Register and mirror both languages into SVIM.
- [x] Run model/data/mirror tests, builds and browser checks.
- [x] Commit scoped changes, create and cross-link both PRs; do not merge.

Matching open PRs: [Hobite #83](https://github.com/hobiter/website/pull/83) and [SVIM #84](https://github.com/svim-labs/project-albatross/pull/84). Both are attached to the chat. Neither was merged; no production deployment claimed.

## Verification

Passed: `npm run research:lulu:data`, `npm run research:lulu:mirror`, `npm run research:lulu:test`, focused ESLint and both site `npm run build`. Browser checks cover desktop/mobile English/Chinese, title contrast, independent table overflow, scenario and horizon controls, invalid-price feedback and library navigation. At 390px the document width remains 375px (scrollbar allowance), with no page-level horizontal overflow. Representative SEC/IR endpoints return HTTP 200. The data tests verify eleven annual periods, twenty-six quarters, Q4 cash-flow reconciliation, the October 9 close, DCF/IRR identities, sensitivity and exact adapted mirror parity.

SVIM repository-wide `verify:research` still fails for pre-existing unrelated report omissions and divergences. It reports no LULU mismatch, missing metadata or unresolved import. Existing bundle-size warnings remain. Extension compliance: N/A; all three optional extensions retain disabled configuration.

Research limits: selected retail snapshots only; no complete regional profitability, customer retention or store-level returns. Valuation uses weighted diluted shares, retains starting cash as a reserve, excludes a partial FY2026 stub and is not a complete GAAP forecast. Historical valuation is retrospective with reporting look-ahead. These caveats are visible in both languages.
