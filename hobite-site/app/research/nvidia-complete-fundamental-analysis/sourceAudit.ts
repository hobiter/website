export type NvidiaSourceAuditItem = { area:string; coverage:string; status:"complete"|"partial"|"needs-review"; note:string; sourceUrl:string };
export const NVIDIA_SOURCE_AUDIT_NOTE = "SEC filings are authoritative for GAAP history. NVIDIA IR supports guidance and platform commentary; Yahoo Finance is used only for price context.";
export const NVIDIA_SOURCE_AUDIT_ITEMS: NvidiaSourceAuditItem[] = [
  { area:"Filing inventory", coverage:"FY2017-FY2026 10-K and recent 10-Q", status:"complete", note:"Generated from NVIDIA's current CIK.", sourceUrl:"https://data.sec.gov/submissions/CIK0001045810.json" },
  { area:"Annual financials", coverage:"FY2017-FY2026", status:"complete", note:"Exact report-date and accession matching limits comparative-fact contamination.", sourceUrl:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001045810.json" },
  { area:"Quarterly financials", coverage:"FY2025 Q1-FY2027 Q2", status:"complete", note:"Q4 flow values are derived and identified.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { area:"Platform metrics", coverage:"Q2 FY2026-Q2 FY2027 recast presentation", status:"complete", note:"Uses the latest market-platform definitions.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { area:"Supply and capital", coverage:"FY2024-Q2 FY2027", status:"complete", note:"Separates balance-sheet items, commitments and guarantees.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { area:"Forecast and DCF", coverage:"FY2027-FY2036", status:"complete", note:"All long-range figures are Hobite scenarios, not management guidance.", sourceUrl:"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/default.aspx" },
  { area:"Historical valuation", coverage:"FY2024-FY2027", status:"complete", note:"Prices and shares normalize NVIDIA's 2021 and 2024 splits.", sourceUrl:"https://query1.finance.yahoo.com/v8/finance/chart/NVDA" },
];
