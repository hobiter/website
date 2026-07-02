# Alibaba (BABA) Complete Fundamental Research Hub Plan

## Objective

Build a BABA research hub following `COMPANY_RESEARCH_STANDARD_WORKFLOW.md`: SEC-backed annual financials, foreign-private-issuer filing inventory, segment economics, forecast and DCF, valuation history, chart dashboard, source audit, and publication QA.

## Canonical Route

- Working URL: `/research/alibaba-complete-fundamental-analysis`
- Main route file: `app/research/alibaba-complete-fundamental-analysis/page.tsx`

## Source Hierarchy

1. SEC Form 20-F and company facts are authoritative for historical financials.
2. SEC Form 6-K result-release exhibits provide foreign-private-issuer interim operating updates.
3. Alibaba investor relations supports quarterly/result navigation.
4. Yahoo Finance chart API provides historical BABA ADS adjusted close prices for valuation context.

## Current Status

- Route shell and full research page implemented.
- SEC filing inventory generated from Alibaba CIK `0001577552`.
- Core filing inventory includes registration filings, annual Form 20-F reports/amendments, and Form 6-K filings.
- Latest annual filing: Form 20-F for fiscal year ended March 31, 2026, filed May 20, 2026.
- Annual financial database covers FY2015-FY2026 in RMB.
- Interim Form 6-K result-release tracker added for FY2026 quarterly operating context and recent 6-K update classifications.
- Segment economics database covers FY2025-FY2026 restated segment revenue from the FY2026 Form 20-F.
- Forecast and DCF model added for FY2027-FY2036 bear/base/bull scenarios.
- Historical valuation database added for FY2020-FY2026 using BABA ADS prices and 1 ADS = 8 ordinary shares.
- Chart dashboard, source audit, and publication QA added.
- Research index link added.
- Regeneration script registered as `npm run research:baba:data`.
- Regeneration script was executed through the Node runtime and now preserves Alibaba's Form 20-F non-GAAP free cash flow reconciliation, including FY2026 negative free cash flow.
- TypeScript diagnostics pass with 0 errors.
- Static QA found 11 route-local modules, 13 rendered report sections, all route-local imports resolved, 364 unique embedded source URLs, no missing local imports, and representative SEC/Yahoo endpoints returning HTTP 200.
- Completion checklist added at `BABA_RESEARCH_COMPLETION_CHECKLIST.md`.
- Live browser visual review is blocked locally because the dev server cannot be started through PowerShell due the Windows CET runtime error and sandboxed process spawning is blocked.
- Remaining implementation work: none for this implementation pass.
