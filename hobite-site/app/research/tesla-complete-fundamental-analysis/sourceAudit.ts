export type TeslaSourceAuditItem = { area:string; coverage:string; status:"complete"|"partial"|"needs-review"; note:string; sourceUrl:string };
export const TESLA_SOURCE_AUDIT_NOTE = "SEC filings are authoritative for GAAP history. Tesla updates support operating metrics; Yahoo Finance is used only for price context.";
export const TESLA_SOURCE_AUDIT_ITEMS: TeslaSourceAuditItem[] = [
  { area:"Filing inventory", coverage:"FY2016-FY2025 10-K and recent 10-Q", status:"complete", note:"Generated from Tesla's current CIK.", sourceUrl:"https://data.sec.gov/submissions/CIK0001318605.json" },
  { area:"Annual financials", coverage:"FY2016-FY2025", status:"complete", note:"Exact report-date and accession matching limits comparative-fact contamination.", sourceUrl:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001318605.json" },
  { area:"Quarterly financials", coverage:"FY2024 Q1-FY2026 Q2", status:"complete", note:"Q4 flow values are derived and identified.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm" },
  { area:"Operating metrics", coverage:"Q2 2025-Q2 2026", status:"complete", note:"Uses Tesla's Q2 update definitions, including FSD subscription caveat.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
  { area:"Segment economics", coverage:"FY2023-FY2025 and Q2 2026", status:"complete", note:"Separates automotive, energy, services and regulatory credits.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { area:"Forecast and DCF", coverage:"FY2026-FY2035", status:"complete", note:"Autonomy and physical-AI contributions are scenario assumptions, not backlog.", sourceUrl:"https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm" },
  { area:"Historical valuation", coverage:"FY2019-FY2026", status:"complete", note:"Prices and shares normalize both Tesla stock splits.", sourceUrl:"https://query1.finance.yahoo.com/v8/finance/chart/TSLA" },
];
