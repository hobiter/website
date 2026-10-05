# Eli Lilly Research Hub

## Requirements And Workflow

Complete English and Chinese Eli Lilly (LLY) research hubs in Hobite and SVIM, with linked unmerged PRs. Apply COMPANY_RESEARCH_STANDARD_WORKFLOW.md and AI-DLC using standing automatic-completion authorization. AMD PRs are merged. Clean branches `codex/lly-research-hub` start from origin/main. Reuse the existing Next.js research routes and SVIM lazy rich-page registry. No dependency, auth, API, database or infrastructure changes. Existing security/resiliency/property extension opt-outs retained and skipped; financial invariant testing remains required.

Reader stories: discover either language; inspect historical financials and source provenance; distinguish GAAP, issuer adjusted results and independent assumptions; understand product concentration and pharmaceutical economics; compare ten-year scenarios; use charts/tables and translations on desktop/mobile.

## Financial Design

USD US GAAP and December year-end calendar quarters. SEC filings/companyfacts establish annual and quarterly history with exact units, original balance contexts, latest comparable flow facts, explicit missing values and calculation provenance. Q4 additive flows equal annual minus Q1-Q3, never subtract EPS or weighted shares. Operating profit may be derived from revenue less all disclosed operating expense categories; do not confuse pretax profit with EBIT. Discontinued-operation and acquisition presentations require disclosure.

Lilly-specific evidence: Mounjaro/Zepbound and other product/geography revenue, gross margin and pricing/volume bridge, expensed R&D, acquired IPR&D, intangible amortization, inventory and production capex. Lilly has one operating segment; product sales do not establish product profitability. Do not fabricate prescriptions, net price or patient economics. Recurring research stays expensed. Treat IPR&D/asset acquisitions consistently across operating profit and cash flow; do not add it back and also omit replacement spending. GAAP historical CFO-minus-capex is not acquisition-inclusive owner cash.

Forecast FCFF in bear/base/bull over ten years with margin/capex/working-capital reinvestment, patent/replacement risk, terminal growth below WACC and positive terminal reinvestment. Retain SBC and lease rent in margins. Date the cash/debt/share bridge and market price; no fabricated FY2026 actual or future regulatory approval. Independent assumptions separated from issuer guidance. Pharmaceutical pipeline assumptions are valuation stresses, not clinical advice or approval probabilities.

## Plan

1. [x] Inspect rules, architecture, repository state; branch and record requirements/stories/design.
2. [x] Generate filing/annual/quarterly/market data and verify latest release anchors.
3. [x] Implement pharmaceutical economics and ten-year valuation with invariant tests.
4. [x] Write complete EN/ZH report, charts/tables/audits; register Hobite pages.
5. [x] Mirror all modules and register both SVIM pages.
6. [x] Pass financial/parity tests, both builds and desktop/mobile browser QA.
7. [ ] Commit/push, create/attach cross-linked PRs; record completion without merging.

## Verification Plan

Validate additive fiscal sums, GAAP operating bridge, balance identity, cash capex and IPR&D perimeter, diluted EPS/share units, model FCFF arithmetic, terminal reinvestment, WACC/growth/dilution monotonicity, direct source URL shapes, report translations and exact mirror parity. Build both apps. Verify both languages/sites at 1280px and 390px: library discovery, language/navigation, charts, contained table scrolling and filing expansion. Record limits and reproducible commands.

Historical verification supplements companyfacts with original, non-dimensional USD XBRL contexts for separate IPR&D and special charges. FY2011 Q1's separate $388 million IPR&D expense is included in derived EBIT of $1,285.1 million, with an explicit regression test. Missing expense components remain N/A rather than zero. Older net productive-asset purchase tags and discontinued-operation comparatives are explicitly identified as partial comparability, not a uniform backtest.

## Verification Results

`npm run research:lly:test` passes 15 annuals, 62 quarters, original-filing IPR&D regression, GAAP/cash bridges, FCFF/terminal/sensitivity identities, EN/ZH chapters and exact 14-module mirror parity. Both `npm run build` commands pass; SVIM's existing large-chunk warning remains. No dependencies added.

Browser checks: Hobite `/research/eli-lilly-complete-fundamental-analysis` and `/zh`; SVIM `/research/eli-lilly-complete-fundamental-analysis` and `/research/zh-eli-lilly-complete-fundamental-analysis` (also registered `/blog` aliases). English/Chinese render at 1280x900 and 390x844 without page-level horizontal overflow. Twelve chart groups contain nonzero bars. Wide tables scroll within their parents; all eight section anchors work. Research-library entries, language links, 374-filing inventory and latest-quarter field provenance are accessible and expandable. Next dev initially served a stale 404; restarting the local preview with webpack resolved it, with production builds already passing.

Reproduction: `npm run research:lly:data`, format generated modules, `npm run research:lly:mirror`, `npm run research:lly:test`, then production builds in each app. Source data cutoff is October 4, 2026, last market close October 2; current balances are not fabricated beyond June 30. Independent renewal/patent scenarios are not clinical probabilities. Publication QA retains explicit historical comparability and forecast limitations. Local verification does not establish live deployment.
