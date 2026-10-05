# TSMC Research Hub

## Routes

- Hobite English: /research/tsmc-complete-fundamental-analysis
- Hobite Chinese: /research/tsmc-complete-fundamental-analysis/zh
- SVIM English: /research/tsmc-complete-fundamental-analysis (also /blog/tsmc-complete-fundamental-analysis)
- SVIM Chinese: /research/zh-tsmc-complete-fundamental-analysis (also /blog/zh-tsmc-complete-fundamental-analysis)

## Source And Accounting Contract

Cutoff October 4, 2026. Latest completed quarterly earnings are Q2 2026; September sales and Q3 earnings are not treated as reported. ADS closing price is October 2, 2026, USD 472.7799987792969. Source: versioned Yahoo chart URL in valuationHistory.ts.

Annual database: 2015–2025, SEC IFRS namespace plus original FY2025 20-F XBRL instance. Select TWD, ordinary-share TWD EPS and consolidated undimensioned contexts. Prefer RevenueFromContractsWithCustomers before Revenue. Preserve field-level tag, filing date and URL. Unknown fields remain null. Verified coverage does not claim 15 years or complete historical quarters.

Quarterly database: ten quarters, 2024 Q1–2026 Q2, local TIFRS issuer financial statements rounded to NTD millions. Versioned manual inputs reside in scripts/data/tsmc-quarterly-inputs.json. Q1 2025 income = H1 2025 comparative minus Q2; cash flows = local TIFRS FY2025 minus Q2–Q4. Its EPS is null. SEC annual IFRS parent income and local TIFRS annual/quarterly parent income differ: FY2025 NTD 1,697.604B / EPS 65.47 versus local NTD 1,717.883B / 66.25. TTM uses local quarters only. No mixed-basis net-income reconciliation.

Historical valuation uses 2330.TW ordinary-share price and ordinary shares, matching TWD statements. Ratios are ex-post year-end comparisons, not historical tradeable signals. FY2015 shares are unavailable and its ratios stay null. Price feed uses split-adjusted close, not dividend-adjusted price.

## Model Contract

Ten explicit years, 2026–2035, bear/base/bull analyst assumptions. FCFF = (EBIT minus lease interest) after normalized tax + total D&A minus cash PP&E, incremental working capital and lease principal. SBC remains expense. Lease cash is included in forecast, so no second lease-liability deduction. Dividends are financing distributions, not another FCFF expense. Positive net reinvestment survives the terminal period.

October 4 timing discounts one quarter of estimated 2026 annual cash as Q4 approximation; later years are full-year. Equity = enterprise value + June 2026 cash − current bonds/bank debt − noncurrent bonds − noncurrent bank loans − minority equity. No marketable instruments or long-term investments are added. June balance-sheet proxy is not represented as October actual balances.

USD per ADS = TWD equity / ordinary shares × 5 / assumed NTD per USD. FX 32 is a scenario assumption anchored to Q3 guidance, not current spot. Base 30/32/34 translation sensitivity holds TWD operations constant. Indicative ADS outputs: bear 134.72, base 333.15, bull 645.92. These are assumption-dependent values, not guaranteed price targets. Disruption, currency operating effects and subsidy risk require judgment beyond the deterministic model.

## Reproduction And Verification

From hobite-site:

```powershell
npm run research:tsm:data
npm run research:tsm:mirror
npm run research:tsm:test
npm run build
```

Data regeneration fetches SEC filing inventory, companyfacts, FY2025 instance and market series. It regenerates quarterly results from the curated issuer JSON snapshot; it does not automatically extract or discover new quarterly PDFs. When updating cutoff, verify new source statements, update snapshot and operating disclosures, revise forecast assumptions and report prose, then mirror and test. Optional formatting must run before mirroring.

SVIM reproduction: run npm run build in project-albatross. mirror-tsmc-research.mjs strips Next metadata and adapts only internal literal route links; financial numbers, bilingual report and model are otherwise identical. test-tsmc-research.mjs checks exact adapted parity, financial arithmetic, TIFRS reconciliation, DCF monotonicity, terminal reinvestment, share/FX conversions and coverage.

## Publication QA

Both production builds passed; Hobite prerenders both routes. SVIM retains its existing main-bundle >500 KB warning. Twelve charts and eight major sections verified across both languages and desktop/mobile. Mobile width 390: document width 375, wide tables internally scroll, forecast anchors clear sticky navigation. Some issuer PDFs reject automated downloads; accessible SEC exhibits and archived issuer views were used, and no unverified transcript-derived latest capital-budget figure is asserted as company guidance.

No new runtime dependency, API, database or authentication change. Both PRs remain unmerged for review.

## Pull Requests

- [Hobite #76](https://github.com/hobiter/website/pull/76)
- [SVIM #77](https://github.com/svim-labs/project-albatross/pull/77)
