export const TESLA_SOURCE_SYSTEMS = [
  { name:"SEC submissions", use:"Tesla filing inventory.", url:"https://data.sec.gov/submissions/CIK0001318605.json" },
  { name:"SEC company facts", use:"XBRL-backed annual and quarterly statements.", url:"https://data.sec.gov/api/xbrl/companyfacts/CIK0001318605.json" },
  { name:"Tesla investor relations", use:"Quarterly operating updates and production, delivery and deployment releases.", url:"https://ir.tesla.com/" },
  { name:"Yahoo Finance chart API", use:"Split-adjusted historical market prices.", url:"https://query1.finance.yahoo.com/v8/finance/chart/TSLA" },
];
export const TESLA_CHART_GROUPS = [
  { group:"Annual financials", targetCount:4 }, { group:"Margins and cash flow", targetCount:4 }, { group:"Vehicles and FSD", targetCount:4 }, { group:"Energy and infrastructure", targetCount:3 }, { group:"Valuation and forecast", targetCount:5 },
];
