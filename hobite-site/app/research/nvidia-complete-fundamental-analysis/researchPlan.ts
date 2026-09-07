export const NVIDIA_SOURCE_SYSTEMS = [
  { name:"SEC filing submissions", use:"Authoritative filing inventory", url:"https://data.sec.gov/submissions/CIK0001045810.json" },
  { name:"SEC XBRL company facts", use:"Annual and quarterly GAAP financials", url:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001045810.json" },
  { name:"NVIDIA FY2026 Form 10-K", use:"Audited segments, end markets, concentration and supply economics", url:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm" },
  { name:"NVIDIA Q2 FY2027 Form 10-Q", use:"Latest financials, market platforms, commitments and risks", url:"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { name:"NVIDIA Q2 FY2027 results", use:"Quarter summary and Q3 guidance", url:"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/default.aspx" },
];

export const NVIDIA_CHART_GROUPS = [
  { name:"Annual financials", targetCount:4 }, { name:"Margins and cash flow", targetCount:4 }, { name:"Platform mix", targetCount:4 },
  { name:"Supply and capital", targetCount:4 }, { name:"Valuation history", targetCount:4 }, { name:"Forecast scenarios", targetCount:4 },
];
