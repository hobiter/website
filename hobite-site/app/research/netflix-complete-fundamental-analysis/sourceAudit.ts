export type NetflixSourceAuditItem = {
  area: string;
  coverage: string;
  primarySource: string;
  sourceUrl: string;
  status: "complete" | "partial" | "needs-review";
  note: string;
};

export const NETFLIX_SOURCE_AUDIT_NOTE =
  "Second-pass citation audit map for the Netflix research hub. SEC filings are treated as authoritative for historical financials, subscribers, regional revenue, content economics, and filing inventory. Market valuation history uses Yahoo Finance adjusted close data joined to SEC fundamentals.";

export const NETFLIX_SOURCE_AUDIT_ITEMS: NetflixSourceAuditItem[] = [
  {
    area: "SEC filing inventory",
    coverage: "Registration statements, 10-K, 10-K/A, 10-Q, and 10-Q/A filings",
    primarySource: "SEC company submissions API",
    sourceUrl: "https://data.sec.gov/submissions/CIK0001065280.json",
    status: "complete",
    note: "Filing list is generated from Netflix CIK 0001065280 and preserves amended filings.",
  },
  {
    area: "Annual financial database",
    coverage: "FY2002-FY2025",
    primarySource: "SEC company facts plus audited 10-K statement tables",
    sourceUrl: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json",
    status: "partial",
    note: "FY2009-FY2025 use SEC XBRL company facts. FY2002-FY2008 are manual audited 10-K extractions and remain flagged for source-tie second pass.",
  },
  {
    area: "Quarterly financial database",
    coverage: "2009 Q1 through 2026 Q2",
    primarySource: "SEC company facts quarterly frames and annual filings",
    sourceUrl: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json",
    status: "partial",
    note: "Quarterly frames or YTD differences supply flows. Q2 2026 revenue, operating income, EPS, OCF, capex and FCF were reconciled to the shareholder letter. Q4 diluted EPS remains intentionally null.",
  },
  {
    area: "Subscriber and regional economics",
    coverage: "FY2019-FY2025 streaming revenue; FY2019-FY2024 memberships and ARM",
    primarySource: "Netflix audited 10-K regional tables",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm",
    status: "complete",
    note: "FY2025 regional membership and ARM are null because Netflix changed disclosure and no longer provides the same regional membership table.",
  },
  {
    area: "Content economics",
    coverage: "FY2020-FY2025",
    primarySource: "Netflix audited 10-K content asset and contractual obligation notes",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm",
    status: "complete",
    note: "Dataset is regenerated from 10-K HTML tables and includes content assets, amortization, liabilities, obligations, and tax incentive benefits where disclosed.",
  },
  {
    area: "Forecast and DCF",
    coverage: "FY2026-FY2035 scenarios",
    primarySource: "Q2 2026 SEC shareholder letter and Hobite assumptions",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000211/ex991_q226.htm",
    status: "complete",
    note: "October 4 update uses a user-specified $67 price, Q2 split-adjusted diluted shares, and company guidance. $10.5B normalized FCF and the $2B after-tax one-time adjustment are analyst assumptions. Equity DCF excludes elapsed-year cash; debt is not subtracted twice. Historical prices remain unchanged.",
  },
  {
    area: "Historical valuation",
    coverage: "FY2020-FY2025 year-end multiples",
    primarySource: "Yahoo Finance chart API and Netflix SEC annual financials",
    sourceUrl: "https://query1.finance.yahoo.com/v8/finance/chart/NFLX",
    status: "complete",
    note: "FY2020-FY2022 diluted shares are normalized to the same split-adjusted basis as Yahoo adjusted historical prices. Yahoo's browser history page may block automated checks, so the chart API is the audit endpoint.",
  },
  {
    area: "Company commentary and investor communications",
    coverage: "Quarterly earnings and shareholder communication links",
    primarySource: "Netflix investor relations",
    sourceUrl: "https://ir.netflix.net/financials/quarterly-earnings/default.aspx",
    status: "needs-review",
    note: "IR page is linked for reader reference; local automated fetch may be blocked by Cloudflare, so SEC filings remain the source of record.",
  },
];
