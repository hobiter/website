export type SourceAuditStatus = "complete" | "partial" | "needs-review";
export type AlibabaSourceAuditItem = { area: string; coverage: string; primarySource: string; sourceUrl: string; status: SourceAuditStatus; note: string };

export const ALIBABA_SOURCE_AUDIT_NOTE = "Source audit map for the Alibaba research hub. SEC filings and company facts are authoritative for historical financials; Form 6-K exhibits are used for interim operating updates; Yahoo Finance chart data is used only for historical market-price context.";

export const ALIBABA_SOURCE_AUDIT_ITEMS: AlibabaSourceAuditItem[] = [
  {
    "area": "SEC filing inventory",
    "coverage": "F-1/F-1/A, 20-F/20-F/A, and 6-K filings",
    "primarySource": "SEC company submissions API",
    "sourceUrl": "https://data.sec.gov/submissions/CIK0001577552.json",
    "status": "complete",
    "note": "Alibaba is a foreign private issuer; 6-K filings are numerous and treated as interim/event updates."
  },
  {
    "area": "Annual financial database",
    "coverage": "FY2015-FY2026",
    "primarySource": "SEC company facts API and Form 20-F",
    "sourceUrl": "https://data.sec.gov/api/xbrl/companyfacts/CIK0001577552.json",
    "status": "partial",
    "note": "Core income statement and balance sheet rows are XBRL-backed. Free cash flow is filled where Alibaba discloses a non-GAAP reconciliation."
  },
  {
    "area": "Interim Form 6-K result releases",
    "coverage": "June quarter FY2026 through March quarter FY2026 plus recent 6-K update classifications",
    "primarySource": "SEC Form 6-K exhibits",
    "sourceUrl": "https://www.sec.gov/Archives/edgar/data/1577552/000110465926060224/tm2614494d1_ex99-1.htm",
    "status": "complete",
    "note": "Alibaba does not file domestic 10-Qs; the hub now tracks official 6-K result-release exhibits as interim context."
  },
  {
    "area": "Segment economics",
    "coverage": "FY2025-FY2026 restated segment revenue",
    "primarySource": "Alibaba FY2026 Form 20-F",
    "sourceUrl": "https://www.sec.gov/Archives/edgar/data/1577552/000119312526231755/baba-20260331.htm",
    "status": "complete",
    "note": "Uses the FY2026 reporting structure and restated FY2025 segment revenue shown in the same table."
  },
  {
    "area": "Forecast and DCF",
    "coverage": "FY2027-FY2036 scenarios",
    "primarySource": "Hobite model using FY2026 Form 20-F base year",
    "sourceUrl": "https://www.sec.gov/Archives/edgar/data/1577552/000119312526231755/baba-20260331.htm",
    "status": "complete",
    "note": "Forecasts are Hobite assumptions, not company guidance."
  },
  {
    "area": "Historical valuation",
    "coverage": "FY2020-FY2026",
    "primarySource": "Yahoo Finance chart API and SEC Form 20-F share counts",
    "sourceUrl": "https://query1.finance.yahoo.com/v8/finance/chart/BABA",
    "status": "complete",
    "note": "Uses 1 ADS = 8 ordinary shares and a constant CNY/USD reference rate for high-level multiple context."
  },
  {
    "area": "Alibaba investor relations",
    "coverage": "Quarterly results link",
    "primarySource": "Alibaba IR",
    "sourceUrl": "https://www.alibabagroup.com/en-US/ir-financial-reports-quarterly-results",
    "status": "needs-review",
    "note": "Linked for reader navigation; SEC remains the source of record for this implementation pass."
  }
];
