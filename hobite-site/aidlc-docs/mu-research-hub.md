# Micron Research Hub

## Requirements And Workflow

Apply COMPANY_RESEARCH_STANDARD_WORKFLOW.md. Publish matching English and Chinese Micron (MU) reports, registered in both Hobite and SVIM research libraries, and create separate linked PRs. Standing automatic-completion authorization applies; no automatic merge.

Brownfield architecture is unchanged: Next.js static research modules mirrored into SVIM lazy rich pages. Reuse prior reverse-engineering artifacts; no new infrastructure, API, auth, dependencies or data storage. Security, resiliency and property extensions remain disabled under existing configuration.

Reader stories: discover either language in the library; inspect historical evidence and sources; distinguish actual results, guidance and forecasts; compare ten-year scenarios and sensitivity; navigate wide tables on mobile.

## Financial Design

US GAAP, USD, Micron fiscal years (52/53 weeks, August/September year end), not calendar quarters. Latest FY2026/Q4 earnings release is unaudited until its 10-K is filed. Generate filed annual/quarterly history from SEC companyfacts with field provenance, exact currency units and fiscal period matching. Derive cash-flow quarters from YTD only with complete prior quarters; Q4 EPS stays null unless directly disclosed. Missing data remain null.

FCF is operating cash minus gross cash PP&E. Company adjusted FCF also adds equipment-sale and government-incentive receipts; show both without confusing them. Customer deposits classified as financing are not operating cash flow or free cash flow. Forecast enterprise FCFF from after-tax operating earnings plus total D&A minus gross cash capex, incremental working capital and new finance-leased asset investment (0.2% revenue). Reported debt includes finance leases and is deducted once; do not also expense financing principal or interest in FCFF. Operating rent and SBC remain in EBIT. Include only cash and current securities in conservative equity bridge, exclude long-term securities and reserve noncurrent customer contract liabilities once as a conservative future-delivery funding adjustment. Explain that this is an analyst convention, not legal debt. No future subsidy receipts assumed. Ten-year FY2027-2036 cycle-normalization cases with WACC/growth and terminal-margin sensitivities.

## Implementation Plan

1. [x] Inspect workflow and clean repositories; branch both from current origin/main.
2. [x] Generate SEC inventory, fiscal financial history, dated prices and latest curated release; verify source anchors.
3. [x] Implement Micron operating/economic evidence and ten-year cycle-aware model with tests.
4. [x] Write bilingual 13-section memo, charts, tables, audit and publication QA; register Hobite routes.
5. [x] Mirror and register both languages in SVIM.
6. [x] Run financial/parity tests and production builds; verify desktop/mobile and navigation.
7. [ ] Commit/push, create and attach linked PRs; record outcome and caveats.

## Verification Commands

From hobite-site: npm run research:mu:data, npm run research:mu:mirror, npm run research:mu:test, npm run build. From project-albatross: npm run build. Data generation refreshes SEC and market data; release snapshot updates require manual source verification. Wide tables scroll internally; negative cash-flow bars have explicit negative values.

## Data And Accounting Contract

- Cutoff: October 4, 2026; market close October 2. Latest filed annual is FY2025; latest filed quarter is FY2026 Q3. FY2026 and Q4 are from the September 30 unaudited earnings exhibit, not a filed FY2026 10-K.
- Coverage: 16 fiscal years FY2011-FY2026, 64 quarters, 527 electronic filing entries and 12 chart groups. Inventory includes amendments; it is not a count of unique reporting periods.
- SEC flow facts use latest comparable disclosures at cutoff; original accession contexts preserve balance sheets. Fiscal-end historical valuation requires actual spot shares, never weighted-average EPS shares. Missing observations remain N/A; this is not a point-in-time backtest.
- Noncurrent debt uses LongTermDebtAndCapitalLeaseObligations before LongTermDebtNoncurrent. FY2025 debt is $14.577B and FY2026 Q3 debt is $5.722B, inclusive of finance leases. Redeemable instruments outside liabilities/equity remain a separately identified historical balance residual, not invented debt.
- FY2026 gross-capex FCF is $58.963B; issuer adjusted FCF is $62.308B after equipment-sale and incentive receipts. $12.747B customer deposits are financing, not operating cash flow. Q4 segment revenue leaves an explicitly disclosed $6M rounding gap.
- Model forecasts FY2027-FY2036 without assigned probabilities. October 2 price is $1,074.89. Bear/base/bull values are $221.02/$965.08/$2,750.55; these are assumption-dependent scenarios, not recommendations. Base terminal EBIT margin of 44% is explicitly optimistic relative to earlier cycles.
- Equity bridge excludes $30.019B long-term securities, includes cash/current securities, subtracts reported debt once and conservatively reserves $12.895B noncurrent customer contract liabilities. That reserve is an analyst funding adjustment, not legal debt. Q4 weighted diluted shares of 1.147B are a dated proxy, not exact current shares.
- Financing lease principal is not an FCFF expense when lease debt is in the equity bridge. New finance-leased asset investment is modeled separately as 0.2% of revenue. Terminal cash and leased investment retain positive net reinvestment.

## Primary Sources

- [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm)
- [FY2026 Q3 10-Q](https://www.sec.gov/Archives/edgar/data/723125/000072312526000015/mu-20260528.htm)
- [FY2026/Q4 unaudited earnings exhibit](https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm)
- [Issuer quarterly results](https://investors.micron.com/financials/quarterly-results/default.aspx)
- [Issuer company timeline](https://www.micron.com/about/company/company-timeline)

## Verification Record

Financial tests verify release anchors, 16 annual/64 quarterly periods, complete fiscal-flow sums, currency units, provenance, balance residuals, cash bridges, lease-inclusive debt, FCFF arithmetic, terminal reinvestment, DCF monotonicity, loss-year valuation suppression and all 14 mirrored files. Browser checks cover both languages/sites at 1280px and 390px, 8 sections, 12 charts, library entries, language switching and section anchors. No page-level horizontal overflow; wide financial tables have internal overflow containers. Desktop preview saved to C:/Users/sunyo/AppData/Local/Temp/mu-report-verified.png.

Final production builds passed after publication QA updates: Hobite generated 55 routes; SVIM transformed 8,942 modules. SVIM warns about the existing large main bundle and the new lazy research module (approximately 595KB uncompressed / 65KB gzip); these are size warnings, not compilation failures. Financial/parity tests and both whitespace checks passed. Browser consoles reported no errors. No dependency, authentication, database or deployment configuration changes.

## Routes And Maintenance

Hobite: /research/micron-complete-fundamental-analysis and /research/micron-complete-fundamental-analysis/zh. SVIM canonical research routes: /research/micron-complete-fundamental-analysis and /research/zh-micron-complete-fundamental-analysis, with existing /blog aliases. Both library registries and rich-page lazy loaders are updated.

SEC generation deliberately refuses to silently replace the curated release once a FY2026 10-K is available or the snapshot cutoff is incompatible. Reverify the annual filing, release snapshot, source audit and assumptions before advancing the cutoff. After data generation, format generated modules, mirror into SVIM and rerun financial/parity checks and both builds. Never merge either PR automatically.
