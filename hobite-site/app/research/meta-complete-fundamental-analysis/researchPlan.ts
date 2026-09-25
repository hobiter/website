export const META_SOURCE_SYSTEMS = [
  { name:"SEC filing submissions", use:"Authoritative filing inventory", url:"https://data.sec.gov/submissions/CIK0001326801.json" },
  { name:"SEC XBRL company facts", use:"Annual and quarterly GAAP financials", url:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001326801.json" },
  { name:"Meta 2025 Form 10-K", use:"Audited business, segment, risk and capital-allocation context", url:"https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm" },
  { name:"Meta Q2 2026 Form 10-Q", use:"Latest financials, balance sheet and cash-flow information", url:"https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm" },
  { name:"Meta Q2 2026 results", use:"Operating metrics and current guidance", url:"https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
];
export const META_CHART_GROUPS = [
  { name:"Annual financials", targetCount:4 }, { name:"Margins and cash flow", targetCount:4 }, { name:"Advertising drivers", targetCount:3 },
  { name:"AI capital intensity", targetCount:4 }, { name:"Valuation history", targetCount:4 }, { name:"Forecast scenarios", targetCount:4 },
];
