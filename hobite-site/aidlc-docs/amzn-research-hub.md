# Amazon (AMZN) Research Hub

## User Request
follow this standard procedure to do the similar Financial Analysis work for AMZN, Generate the same PR for both hobite website, and svim.io.

## Requirements and Workflow
Continue the established COMPANY_RESEARCH_STANDARD_WORKFLOW.md and standing authorization for automatic implementation. Brownfield Next.js/React and SVIM React/Vite research systems already have reusable patterns. Deliver matching English/Chinese reports, research-library discovery, typed SEC data, operating economics, ten-year forecasts, valuation history, sources and publication QA. One reviewable PR per repository; do not merge. No backend, authentication or infrastructure changes. Existing Security, Resiliency and Property-Based extensions remain disabled and are skipped.

## Reader Stories
- An investor can distinguish AWS/retail operating results from investment revaluation gains.
- A reader can inspect historical cash flows, leases, capex and stock compensation with filing links.
- English/Chinese readers can inspect identical assumptions and computed valuations on either site.

## Functional Design
- Snapshot October 4, 2026; latest published quarter Q2. Financial database FY2011-2025 and quarters through Q2 2026; filing inventory includes all available registrations/annual/quarterly filings.
- Original annual accession matching; direct quarter facts or YTD differences; Q4 flows equal annual minus first three quarters, never EPS subtraction.
- Parse SEC XBRL instance XML for Amazon-specific capex incentives and operating dimensions, supplementing SEC companyfacts.
- Normalize pre-June-2022 EPS/shares to the 20-for-1 split; split-adjusted raw price (not dividend-adjusted total return).
- Distinguish gross-capex FCF proxy from Amazon FCF net of equipment sale proceeds/incentives, and show finance-lease/financing principal separately.
- Enterprise DCF uses after-tax operating income plus depreciation less full investment and working capital. SBC remains an economic expense; do not add it back without dilution compensation.
- Debt/finance obligations included in EV bridge, operating leases excluded because lease expense remains in operating cash. Liquid securities separated from illiquid investment marks. Investment optionality gets an explicit haircut, not full reported fair value.
- Show partial-year timing, negative early cash flows, terminal weights, sensitivity and scenario assumptions. No annualized single-quarter EPS target or invented Prime subscriber counts/advertising margins.

## Implementation Plan
1. [x] SEC/IR inventory and generated financial/operating/market databases: 15 annual, 62 quarterly, 96 segment, 7 channel and 123 filing rows.
2. [x] Company economics, bilingual 13-section memo and source audit.
3. [x] Ten-year segment forecasts, DCF and sensitivity; independent model tests pass.
4. [x] English/Chinese pages, charts and both research registries.
5. [x] Focused parity, production HTML, both builds, scoped lint and responsive browser QA.
6. [x] Push and create both PRs; record caveats. Hobite #75 and SVIM #76 are open for review, not merged.

## Pull Requests
- Hobite: https://github.com/hobiter/website/pull/75
- SVIM: https://github.com/svim-labs/project-albatross/pull/76

## Verification (2026-10-04)
- PASS: `npm run research:amzn:test -- --built`: annual/quarterly anchors, original versus gross/net cash capex, split-adjusted EPS/shares, segment/channel reconciliation, financing bridge, independently recomputed FCFF/DCF, WACC/g sensitivity, 13-section translation and exact adapted SVIM source parity.
- PASS: Hobite `npm run build` (both static routes); SVIM `npm run build` (TypeScript + Vite).
- PASS: focused ESLint on Amazon modules and generator/mirror/test scripts.
- PASS: browser screenshots on desktop 1280x720 and mobile 390x844; both languages, both sites; language links and SVIM EN/ZH research-library discovery. No document-level horizontal overflow; wide financial tables scroll internally. Section anchors include sticky-header clearance.
- Browser verification caught and corrected fractional terminal-growth display. Negative early cash explains >100% terminal weight in the bear case; report warns that scenario ranges are not price targets.
- Source verification corrected original pre-2017 capex classification and legacy XML cash-flow tags. Original cash-flow presentation changes are explicitly disclosed, not silently restated.

## Residual Caveats
- Entire-library parity checker reports 2 missing legacy Netflix modules and 18 divergent non-Amazon modules, with no unresolved imports, unregistered pages or Amazon differences. Those report sources are unchanged by this task.
- SVIM retains its pre-existing >500kB main-chunk warning; the new Amazon report is lazy-loaded in its own chunk.
- Hobite dependency audit reports 15 findings (1 critical, 11 high, 2 moderate, 1 low) in existing packages. Added dev-only fast-xml-parser has no audit finding. Framework/security upgrades are outside this company-report change and remain necessary separately.
- Model uses dated June balances plus known OpenAI subsequent funding, not an asserted October balance sheet. Private-asset recovery, future margins, non-lease depreciation and capital intensity are analyst assumptions. No precise maintenance/growth capex split or standalone ad profit is fabricated.
