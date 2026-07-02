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
    coverage: "2009 Q1 through 2026 Q1",
    primarySource: "SEC company facts quarterly frames and annual filings",
    sourceUrl: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json",
    status: "partial",
    note: "Q1-Q3 rows use quarterly frames. Q4 flow metrics are derived from full-year facts less Q1-Q3 frames; Q4 diluted EPS remains intentionally null.",
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
    primarySource: "Hobite model using FY2025 SEC financial base year",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm",
    status: "complete",
    note: "Forecasts are explicitly labeled as Hobite assumptions, not company guidance.",
  },
  {
    area: "Historical valuation",
    coverage: "FY2020-FY2025 year-end multiples",
    primarySource: "Yahoo Finance adjusted close and Netflix SEC annual financials",
    sourceUrl: "https://finance.yahoo.com/quote/NFLX/history/",
    status: "complete",
    note: "FY2020-FY2022 diluted shares are normalized to the same split-adjusted basis as Yahoo adjusted historical prices.",
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
