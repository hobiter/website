export const BAIDU_SOURCE_AUDIT_NOTE = "Primary-source-first audit. Estimates, reconstructed values and market-data inputs are labeled separately from reported results.";
export const BAIDU_SOURCE_AUDIT_ITEMS = [
  { area: "Annual financials", status: "verified", coverage: "FY2018-FY2025", note: "Generated from SEC company facts and linked Forms 20-F.", sourceUrl: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001329099.json" },
  { area: "Latest quarter", status: "verified", coverage: "Q2 2026", note: "Revenue, earnings, liquidity and AI operating metrics trace to Baidu IR.", sourceUrl: "https://ir.baidu.com/news-releases/news-release-details/baidu-announces-second-quarter-2026-results" },
  { area: "ADS structure", status: "verified", coverage: "1 ADS = 8 Class A shares", note: "Confirmed in the latest Form 20-F.", sourceUrl: "https://www.sec.gov/Archives/edgar/data/1329099/000119312526109289/d38065d20f.htm" },
  { area: "Forecast and DCF", status: "modeled", coverage: "FY2026-FY2035", note: "Hobite scenarios; not management guidance.", sourceUrl: "https://ir.baidu.com/" },
];
