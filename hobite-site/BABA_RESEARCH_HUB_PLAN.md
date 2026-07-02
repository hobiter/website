# Alibaba (BABA) Complete Fundamental Research Hub Plan

## Objective

Build a BABA research hub following `COMPANY_RESEARCH_STANDARD_WORKFLOW.md`: SEC-backed annual financials, foreign-private-issuer filing inventory, segment economics, forecast and DCF, valuation history, chart dashboard, source audit, and publication QA.

## Canonical Route

- Working URL: `/research/alibaba-complete-fundamental-analysis`
- Main route file: `app/research/alibaba-complete-fundamental-analysis/page.tsx`

## Source Hierarchy

1. SEC Form 20-F and company facts are authoritative for historical financials.
2. Alibaba investor relations supports quarterly/result navigation.
3. Yahoo Finance chart API provides historical BABA ADS adjusted close prices for valuation context.

## Current Status

- Route shell and full research page implemented.
- SEC filing inventory generated from Alibaba CIK `0001577552`.
- Core filing inventory includes registration filings, annual Form 20-F reports/amendments, and Form 6-K filings.
- Latest annual filing: Form 20-F for fiscal year ended March 31, 2026, filed May 20, 2026.
- Annual financial database covers FY2015-FY2026 in RMB.
- Segment economics database covers FY2025-FY2026 restated segment revenue from the FY2026 Form 20-F.
- Forecast and DCF model added for FY2027-FY2036 bear/base/bull scenarios.
- Historical valuation database added for FY2020-FY2026 using BABA ADS prices and 1 ADS = 8 ordinary shares.
- Chart dashboard, source audit, and publication QA added.
- Research index link added.
- Regeneration script registered as `npm run research:baba:data`.
- TypeScript diagnostics pass with 0 errors.
- Static QA found all route-local imports resolved, 379 embedded source URLs, no malformed URL strings, and representative SEC/Yahoo endpoints returning HTTP 200.
- Remaining implementation work: none for this implementation pass; next optional step is live browser visual review once the local dev server is available.
