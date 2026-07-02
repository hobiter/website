# Company Research Standard Workflow

This is the standard Hobite workflow for building a complete fundamental research hub for a public company.

## Objective

Create a publishable, institutional-grade company research page with:

- SEC-backed historical financials
- Filing inventory
- Operating metrics
- Company-specific economics
- Forecast and valuation model
- Historical valuation context
- Chart dashboard
- Source audit
- Publication QA record

## Recommended Route Structure

Use one dedicated route per company:

```text
app/research/{company-slug}-complete-fundamental-analysis/
```

Recommended files:

```text
page.tsx
filings.ts
annualFinancials.ts
quarterlyFinancials.ts
subscriberMetrics.ts / operatingMetrics.ts
contentEconomics.ts / unitEconomics.ts / segmentEconomics.ts
forecastModel.ts
valuationHistory.ts
reportContent.ts
researchPlan.ts
sourceAudit.ts
publicationQa.ts
```

Use company-specific modules when the business model requires them. For example:

- Netflix: `contentEconomics.ts`, `subscriberMetrics.ts`
- Bank: deposits, loans, credit losses, capital ratios
- SaaS: ARR, NRR, RPO, customers, margins
- Semiconductor: revenue by segment, gross margin, inventory, capex
- Retail: stores, comps, traffic, inventory, unit economics

## Source Hierarchy

1. SEC filings are authoritative.
2. Company investor relations materials support commentary and operating metrics.
3. Market data supports valuation history.
4. Peer filings support competition and benchmarking.
5. Third-party industry data is optional and should be clearly labeled.

## Phase 1: Source Inventory

Create a filing inventory from SEC submissions:

```text
https://data.sec.gov/submissions/CIK{CIK}.json
```

Include:

- S-1 / S-1/A if available
- 10-K / 10-K/A
- 10-Q / 10-Q/A

Output:

- `filings.ts`
- latest annual filing
- latest quarterly filing
- registration filings
- annual filings
- quarterly filings

## Phase 2: Annual Financial Database

Build annual rows from SEC XBRL company facts:

```text
https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK}.json
```

Core fields:

- Revenue
- Gross profit
- Operating income
- Net income
- Diluted EPS
- Operating cash flow
- Capital expenditures
- Free cash flow
- Cash and equivalents
- Total assets
- Total liabilities
- Long-term debt
- Shareholder equity
- Diluted shares
- Gross margin
- Operating margin
- Net margin
- FCF margin
- ROE

If early-year XBRL is incomplete, manually extract audited 10-K tables and flag those rows for second-pass audit.

Output:

- `annualFinancials.ts`

## Phase 3: Quarterly Financial Database

Build quarterly rows from SEC XBRL frames.

Core fields:

- Revenue
- Operating income
- Operating margin
- Net income
- Diluted EPS
- Operating cash flow
- Capital expenditures
- Free cash flow
- FCF margin

For Q4 flow metrics, derive:

```text
Q4 = Full-year annual fact - Q1 - Q2 - Q3
```

Leave Q4 EPS null unless weighted-share reconciliation is reliable.

Output:

- `quarterlyFinancials.ts`

## Phase 4: Company-Specific Operating Metrics

Add the operating metrics that actually explain the company.

Examples:

- Subscribers, ARPU, regional revenue
- ARR, NRR, RPO
- GMV, take rate, active buyers
- Stores, comps, average ticket
- Loans, deposits, net interest margin
- Segment revenue, units, backlog

Use audited filings first. If disclosure changes, keep null fields rather than guessing.

Output examples:

- `subscriberMetrics.ts`
- `operatingMetrics.ts`
- `segmentEconomics.ts`

## Phase 5: Company-Specific Economics

Create a dedicated economics module for the business model.

Examples:

- Netflix: content assets, amortization, content liabilities, obligations
- SaaS: CAC, payback, gross retention, sales efficiency
- Bank: credit losses, reserves, CET1, charge-offs
- Retail: inventory turns, store productivity, lease obligations
- Industrial: backlog, book-to-bill, capacity, utilization

Use null for fields that are not directly disclosed.

Output examples:

- `contentEconomics.ts`
- `unitEconomics.ts`
- `creditEconomics.ts`

## Phase 6: Forecast and DCF

Build bear, base, and bull cases.

Each case should include:

- Revenue forecast
- Revenue growth
- Free cash flow
- FCF margin
- Discount rate
- Terminal growth
- Present value of FCF
- Present value of terminal value
- Enterprise value
- Equity value
- Value per share

Label forecasts clearly as Hobite assumptions, not company guidance.

Output:

- `forecastModel.ts`

## Phase 7: Historical Valuation

Join historical year-end market data with annual financials.

Common metrics:

- Market cap
- Enterprise value
- P/S
- EV/Sales
- P/E
- FCF yield

Important:

- Use split-adjusted prices.
- Normalize share counts to the same split-adjusted basis.
- Document market data source.

Output:

- `valuationHistory.ts`

## Phase 8: Long-Form Report Content

Write a structured investment report.

Recommended sections:

1. Executive Summary
2. Company History
3. Business Model
4. Financial Quality
5. Operating Metrics
6. Company-Specific Economics
7. Balance Sheet and Capital Allocation
8. Growth Drivers
9. Competition
10. Management
11. Risks
12. Valuation
13. Investment Conclusion

Output:

- `reportContent.ts`

## Phase 9: Page Implementation

The page should render:

- Header and research summary
- Key metric cards
- Finished investment report
- Chart dashboard
- Forecast and DCF
- Historical valuation
- Operating metrics database
- Company-specific economics database
- Annual financial database
- Quarterly financial database
- SEC filing inventory
- Research structure
- Source audit
- Publication QA
- Source system
- Chart inventory

Output:

- `page.tsx`

## Phase 10: Chart Dashboard

Render compact chart panels across major datasets.

Recommended chart groups:

- Annual financials
- Margins and returns
- Cash flow and capital allocation
- Operating metrics
- Company-specific economics
- Valuation and forecast

Charts should be scan-friendly and backed by typed data modules.

## Phase 11: Source Audit

Create a source audit table.

Fields:

- Area
- Coverage
- Primary source
- Source URL
- Status: `complete`, `partial`, or `needs-review`
- Note

Output:

- `sourceAudit.ts`

## Phase 12: Publication QA

Create a publication QA table.

Checks:

- TypeScript diagnostics
- Local imports
- Route section coverage
- Source URL shape
- Representative source endpoints
- Market data endpoint
- Company IR endpoint
- Build command status

Statuses:

- `pass`
- `warning`
- `blocked`

Document environment caveats clearly.

Output:

- `publicationQa.ts`

## Regeneration Script

Add or update a company data script:

```text
scripts/update-{company}-sec-data.mjs
```

The script should regenerate:

- Filing inventory
- Annual financials
- Quarterly financials
- Company-specific economics when practical

Add a package script:

```json
{
  "scripts": {
    "research:{ticker}:data": "node scripts/update-{company}-sec-data.mjs"
  }
}
```

## Verification Standard

Before marking implementation complete:

- Run TypeScript diagnostics.
- Confirm local imports resolve.
- Scan embedded URLs for malformed strings.
- Check representative source endpoints.
- Confirm all major sections render from typed data.
- Update the plan/status Markdown.
- Document blocked commands rather than hiding them.

## Final Completion Criteria

Implementation is complete when:

- Route exists and renders the full research hub.
- Core data modules exist and are typed.
- Major historical financials are SEC-backed.
- Company-specific economics are included.
- Forecast and valuation are included.
- Historical valuation is included.
- Chart dashboard is included.
- Source audit is included.
- Publication QA is included.
- TypeScript diagnostics pass.
- Remaining caveats are explicitly documented.
