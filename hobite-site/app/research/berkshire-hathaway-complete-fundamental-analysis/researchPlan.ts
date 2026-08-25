export type BerkshireSourceSystem = { name: string; url: string; use: string };
export type BerkshireChartGroup = { category: string; targetCount: number; examples: string[] };

export const BERKSHIRE_SOURCE_SYSTEMS: BerkshireSourceSystem[] = [
  { name: "SEC company submissions", url: "https://data.sec.gov/submissions/CIK0001067983.json", use: "10-K, 10-Q and registration filing inventory." },
  { name: "SEC company facts", url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001067983.json", use: "XBRL-backed annual and quarterly financial statements." },
  { name: "Berkshire annual reports", url: "https://www.berkshirehathaway.com/reports.html", use: "Operating earnings, insurance float, segment context and shareholder communications." },
  { name: "Berkshire quarterly reports", url: "https://www.berkshirehathaway.com/reports.html", use: "Latest operating results, liquidity, investments and share count." },
  { name: "Yahoo Finance chart API", url: "https://query1.finance.yahoo.com/v8/finance/chart/BRK-B", use: "Historical Class B adjusted closes for valuation context." },
];

export const BERKSHIRE_CHART_GROUPS: BerkshireChartGroup[] = [
  { category: "Annual financials", targetCount: 4, examples: ["Revenue", "Book value", "Operating cash flow", "Free cash flow"] },
  { category: "Operating earnings", targetCount: 3, examples: ["Total operating earnings", "Business components", "H1 growth"] },
  { category: "Insurance economics", targetCount: 3, examples: ["Float", "Underwriting", "Investment income"] },
  { category: "Capital allocation", targetCount: 3, examples: ["Cash and Treasury bills", "Equity securities", "Repurchases"] },
  { category: "Valuation", targetCount: 3, examples: ["Price/book", "Operating earnings multiple", "Scenario value"] },
];

export const BERKSHIRE_IMPLEMENTATION_MILESTONES = [
  "Source inventory",
  "Annual and quarterly financial databases",
  "Operating earnings bridge",
  "Insurance and capital allocation economics",
  "Forecast scenarios",
  "Historical and scenario valuation",
  "Research narrative",
  "Source audit and publication QA",
];
