export type MetaSourceAuditItem = { area:string; coverage:string; status:"complete"|"partial"|"needs-review"; note:string; sourceUrl:string };
export const META_SOURCE_AUDIT_NOTE = "SEC filings are authoritative for GAAP history. Meta Investor Relations supports current operating metrics and guidance; Yahoo Finance is used only for price context.";
export const META_SOURCE_AUDIT_ITEMS: MetaSourceAuditItem[] = [
  { area:"Filing inventory", coverage:"FY2017-FY2025 10-K and recent 10-Q", status:"complete", note:"Generated from Meta's current CIK.", sourceUrl:"https://data.sec.gov/submissions/CIK0001326801.json" },
  { area:"Annual financials", coverage:"FY2017-FY2025", status:"complete", note:"Exact report-date and accession matching limits comparative-fact contamination.", sourceUrl:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001326801.json" },
  { area:"Quarterly financials", coverage:"2024 Q1-2026 Q2", status:"complete", note:"Q4 flows are derived and identified.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm" },
  { area:"Advertising drivers", coverage:"Q2 2025-Q2 2026", status:"complete", note:"Uses Meta-reported Family DAP, impression growth and price-per-ad growth.", sourceUrl:"https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
  { area:"AI capital intensity", coverage:"FY2024-H1 2026", status:"complete", note:"Separates reported capex, finance-lease principal payments, cash and debt; undisclosed commitments remain unmodeled.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm" },
  { area:"Forecast and DCF", coverage:"FY2026-FY2035", status:"complete", note:"All long-range figures are Hobite scenarios, not management guidance.", sourceUrl:"https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
  { area:"Historical valuation", coverage:"FY2018-FY2026", status:"complete", note:"Prices use Yahoo Finance adjusted-close context and SEC financials.", sourceUrl:"https://query1.finance.yahoo.com/v8/finance/chart/META" },
];
