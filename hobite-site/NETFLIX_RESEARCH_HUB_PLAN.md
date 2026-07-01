# Netflix (NFLX) Complete Fundamental Research Hub Plan

## Objective

Create a publishable, institutional-grade Netflix investment research hub for Hobite Capital. The final page should be deeper than the existing single-page reports, with SEC-backed financial databases, more than 100 charts, scenario forecasts, DCF valuation, and a final investment conclusion.

## Canonical Route

- Working URL: `/research/netflix-complete-fundamental-analysis`
- Main route file: `app/research/netflix-complete-fundamental-analysis/page.tsx`
- Plan/data manifest: `app/research/netflix-complete-fundamental-analysis/researchPlan.ts`

## Source Hierarchy

1. SEC filings are authoritative.
2. Netflix investor relations disclosures are the main company commentary source.
3. Market data is used for valuation history and stock price context.
4. Peer company filings are used for competition analysis.
5. Third-party industry data can support market share and attention-share framing only when company disclosures are insufficient.

## Required Source Systems

| Source | URL | Use |
| --- | --- | --- |
| SEC company submissions | `https://data.sec.gov/submissions/CIK0001065280.json` | Master filing index for S-1, 10-K, 10-Q, and 8-K documents |
| SEC company facts | `https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json` | XBRL annual and quarterly financial facts |
| Netflix quarterly earnings | `https://ir.netflix.net/financials/quarterly-earnings/default.aspx` | Shareholder letters, quarterly releases, operating commentary |
| Netflix SEC filings page | `https://ir.netflix.net/financials/sec-filings/default.aspx` | Company filing archive and investor relations references |

## Deliverable Structure

1. Executive Summary
2. Company History
3. Financial History
4. Quarterly Analysis
5. Business Model
6. Subscribers
7. Content Economics
8. Balance Sheet
9. Cash Flow
10. Capital Allocation
11. AI Strategy
12. Advertising Business
13. Live Sports
14. Gaming
15. Management
16. Competition
17. Valuation
18. Forecast
19. DCF
20. Risks
21. Investment Conclusion

## Data Model

### Annual Financial Rows

- Fiscal year
- Filing accession number
- Filing URL
- Revenue
- Gross profit
- Operating income
- Net income
- Diluted EPS
- Operating cash flow
- Capital expenditures
- Free cash flow
- Cash and equivalents
- Current assets
- Total assets
- Current liabilities
- Total liabilities
- Long-term debt
- Shareholders' equity
- Diluted shares outstanding
- Gross margin
- Operating margin
- Net margin
- FCF margin
- ROIC
- ROE
- Revenue CAGR
- EPS CAGR
- FCF CAGR

### Quarterly Financial Rows

- Fiscal quarter
- Filing accession number
- Filing URL
- Revenue
- Operating income
- Operating margin
- Net income
- Diluted EPS
- Operating cash flow
- Capital expenditures
- Free cash flow

### Subscriber Rows

- Period
- Region
- Paid memberships
- Revenue
- ARPU
- Sequential member growth
- Year-over-year member growth
- Disclosure source

### Content Economics Rows

- Fiscal year
- Content assets
- Current content assets
- Non-current content assets
- Content amortization
- Additions to content assets
- Licensed content commentary
- Original content commentary
- Cash content investment
- Source note

### Valuation Rows

- Period
- Share price
- Diluted shares
- Market capitalization
- Cash
- Debt
- Enterprise value
- Revenue
- EBIT
- Free cash flow
- P/E
- EV/Sales
- EV/EBIT
- EV/FCF
- FCF yield

## Chart Inventory Target

Target: 110 charts minimum.

| Group | Target Count | Examples |
| --- | ---: | --- |
| Annual financials | 28 | Revenue, gross profit, operating income, net income, EPS, CAGRs |
| Margins and returns | 16 | Gross margin, operating margin, net margin, ROIC, ROE, FCF margin |
| Cash flow and capital allocation | 18 | OCF, capex, FCF, debt issuance, debt repayment, buybacks, share count |
| Subscribers and regions | 18 | Global members, regional members, ARPU, subscriber mix, revenue per member |
| Content economics | 12 | Content assets, amortization, cash content investment, content spend intensity |
| Valuation and forecast | 18 | P/E, EV/Sales, EV/EBIT, EV/FCF, FCF yield, DCF sensitivity, 2035 scenarios |

## Implementation Phases

### Phase 1: Research Infrastructure

- Create the route shell.
- Create the typed research manifest.
- Add the report to the research library and homepage list.
- Define source URLs, section map, and chart inventory.

### Phase 2: Filing Inventory

- Download or index all Netflix S-1, 10-K, 10-Q, and relevant 8-K filings.
- Store filing metadata: form, fiscal period, filing date, accession number, filing URL.
- Mark annual filings that need manual review because of accounting changes or restatements.

### Phase 3: Financial Database

- Extract annual financial statements from SEC XBRL facts where possible.
- Reconcile against annual report tables.
- Calculate FCF, margins, ROIC, ROE, and CAGRs.
- Store notes for non-comparable years.

### Phase 4: Operating Database

- Build subscriber, ARPU, region, content economics, ads, sports, gaming, and AI datasets.
- Tag every row with source references.
- Document Netflix's reporting metric changes after 2025.

### Phase 5: Chart System

- Build reusable chart components.
- Render annual, quarterly, subscriber, content, valuation, and forecast charts.
- Keep chart styling consistent with Hobite research pages.

### Phase 6: Long-Form Writing

- Draft each section with citations.
- Keep claims tied to filings, shareholder letters, or investor presentations.
- Add source links close to relevant tables and sections.

### Phase 7: Forecast and DCF

- Build 2026-2035 bear, base, and bull model.
- Add DCF assumptions, sensitivity tables, terminal value bridge, and implied return scenarios.
- Separate facts from assumptions in the UI.

### Phase 8: Publication QA

- Type-check and lint.
- Verify all links.
- Audit tables and charts against source rows.
- Confirm every major claim has a source.
- Review page responsiveness and table overflow.

## Current Status

- Phase 1 complete.
- Phase 2 started.
- Phase 3 started.
- Route shell and typed manifest have been created.
- SEC filing inventory has been generated from Netflix CIK `0001065280`.
- Current core filing inventory: 7 registration statement filings, 26 annual filings, and 74 quarterly filings.
- Latest annual filing in the inventory: Form 10-K for fiscal year ended December 31, 2025, filed January 23, 2026.
- Latest quarterly filing in the inventory: Form 10-Q for quarter ended March 31, 2026, filed April 17, 2026.
- Draft annual financial database has been generated from SEC company facts.
- Annual financial database now covers FY2002-FY2025.
- FY2002-FY2008 are manually extracted from audited 10-K statement tables because full-year duration facts are incomplete in the SEC company facts endpoint.
- FY2009-FY2025 are generated from SEC XBRL company facts.
- Quarterly financial database now covers 2009 Q1 through 2026 Q1, with 69 rows.
- Q4 quarterly flow metrics are derived from annual full-year facts less Q1-Q3 quarterly frames; Q4 diluted EPS remains null until weighted-share reconciliation.
- Regeneration script added: `npm run research:nflx:data`.
- The next implementation step is subscriber and ARPU database extraction from Netflix shareholder letters and operating disclosures.
