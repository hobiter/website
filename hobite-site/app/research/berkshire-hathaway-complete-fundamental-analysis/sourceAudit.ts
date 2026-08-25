export type BerkshireSourceAuditStatus = "complete" | "partial" | "needs-review";
export type BerkshireSourceAuditItem = { area: string; coverage: string; primarySource: string; sourceUrl: string; status: BerkshireSourceAuditStatus; note: string };

export const BERKSHIRE_SOURCE_AUDIT_NOTE =
  "SEC filings are the source of record for GAAP history. Berkshire reports and releases supply non-GAAP operating earnings and insurance float. Yahoo Finance is used only for historical market-price context.";

export const BERKSHIRE_SOURCE_AUDIT_ITEMS: BerkshireSourceAuditItem[] = [
  { area: "Filing inventory", coverage: "Available S-3/S-4, FY2016-FY2025 10-K and recent 10-Q filings", primarySource: "SEC submissions API", sourceUrl: "https://data.sec.gov/submissions/CIK0001067983.json", status: "complete", note: "Generated directly from the SEC filing index." },
  { area: "Annual financials", coverage: "FY2016-FY2025", primarySource: "SEC company facts and 10-K", sourceUrl: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001067983.json", status: "complete", note: "Core statements are XBRL-backed; FCF is the site's mechanical OCF-minus-capex calculation." },
  { area: "Quarterly financials", coverage: "Q1 2024-Q2 2026", primarySource: "SEC company facts and 10-Q", sourceUrl: "https://www.sec.gov/Archives/edgar/data/1067983/000119312526341032/brka-20260630.htm", status: "complete", note: "Q4 values are derived as full year less the first nine months and are labeled." },
  { area: "Operating earnings", coverage: "FY2023-H1 2026", primarySource: "Berkshire reports and earnings releases", sourceUrl: "https://www.berkshirehathaway.com/news/aug0826.pdf", status: "complete", note: "Non-GAAP figures are kept separate from SEC GAAP net income." },
  { area: "Insurance and capital allocation", coverage: "FY2023-Q2 2026", primarySource: "Berkshire annual and quarterly reports", sourceUrl: "https://www.berkshirehathaway.com/qtrly/2ndqtr26.pdf", status: "complete", note: "Float, investments, liquidity, debt, shares and repurchases are explicitly sourced." },
  { area: "Forecast and valuation", coverage: "FY2026-FY2035 and 2022-2026 history", primarySource: "Hobite model, Berkshire filings and Yahoo Finance", sourceUrl: "https://query1.finance.yahoo.com/v8/finance/chart/BRK-B", status: "complete", note: "Forecasts are Hobite assumptions. The 2026 quote is a dated snapshot, not a live feed." },
];
