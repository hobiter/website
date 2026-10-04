# Vistra (VST) Research Hub

## Requirements and Design
Follow COMPANY_RESEARCH_STANDARD_WORKFLOW.md. Deliver matching English and Chinese company hubs in Hobite and project-albatross, register them in both research libraries, and create one reviewable PR per repository. No new backend or authentication work. Existing disabled AI-DLC extensions remain disabled.

## Research Boundaries
- Snapshot: October 4, 2026; latest published quarter Q2 2026.
- Financial history begins with the post-reorganization reporting entity; do not splice predecessor results into a continuous growth series.
- Use consolidated operating revenue including hedge effects, not only customer-contract revenue.
- Distinguish GAAP OCF less capex from ongoing adjusted FCF before growth.
- Forecast common-shareholder cash after growth investment, preferred distributions and asset-closure cash costs.
- Use an equity DCF without deducting debt a second time. Separately cross-check enterprise value against adjusted EBITDA and include preferred and financing claims.
- No undisclosed PPA economics or unclosed acquisition synergies in the base case.
- Use dated market observations, never present a stale reference as a live price.

## Implementation Plan
1. [x] SEC filing inventory, annual/quarterly data and historical prices.
2. [x] Power, hedging, segment and capital-allocation metrics; bilingual narrative.
3. [x] Ten-year scenarios, computed valuation and assumption audit.
4. [x] Company hub, compact chart dashboard and research discovery.
5. [x] SVIM adaptation with identical numbers and sources.
6. [x] Financial assertions, builds, responsive browser checks and both PRs.

## Verification Record
- Reviewable PRs: https://github.com/hobiter/website/pull/74 and https://github.com/svim-labs/project-albatross/pull/75. Neither merged nor deployed by this task.
- Both production builds passed; focused financial/DCF/translation/mirror assertions passed.
- Desktop and 390px mobile browser checks on both sites; fixed intrinsic table overflow and SVIM title contrast.
- VST research routes registered in both libraries, with English/Chinese pairing.
- Whole-library SVIM parity has pre-existing missing Netflix update modules and other non-VST divergences; no VST missing/divergent/unreachable module.
- Financial limitations remain explicit: partial 2017, early EPS/share gaps, capex proxy, no historical EV or undisclosed PPA premium.
- September preferred-refinancing announcement disclosed; June balances remain a labeled baseline, not an October pro-forma balance sheet.

## Sources
- https://www.sec.gov/Archives/edgar/data/1692819/000169281926000019/vistra-20260630.htm
- https://www.sec.gov/Archives/edgar/data/1692819/000169281926000017/vistra-20260630xearningsre.htm
- https://www.sec.gov/Archives/edgar/data/1692819/000119312526073364/d21122dex991.htm
- https://data.sec.gov/api/xbrl/companyfacts/CIK0001692819.json
- https://query1.finance.yahoo.com/v8/finance/chart/VST
