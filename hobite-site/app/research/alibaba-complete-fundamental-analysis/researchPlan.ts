export type SourceSystem = { name: string; url: string; use: string };
export type ChartGroup = { category: string; targetCount: number; examples: string[] };

export const BABA_SOURCE_SYSTEMS: SourceSystem[] = [
  { name: "SEC company submissions", url: "https://data.sec.gov/submissions/CIK0001577552.json", use: "Filing inventory for Alibaba Group Holding Limited." },
  { name: "SEC company facts", url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001577552.json", use: "XBRL-backed financial statement extraction." },
  { name: "Alibaba investor relations", url: "https://www.alibabagroup.com/en-US/ir-financial-reports-quarterly-results", use: "Quarterly results and company commentary." },
  { name: "Yahoo Finance chart API", url: "https://query1.finance.yahoo.com/v8/finance/chart/BABA", use: "Historical BABA ADS adjusted close prices for valuation context." },
];

export const BABA_CHART_GROUPS: ChartGroup[] = [
  { category: "Annual financials", targetCount: 6, examples: ["Revenue", "Gross profit", "Operating income", "Net income", "Assets", "Cash"] },
  { category: "Margins and returns", targetCount: 5, examples: ["Gross margin", "Operating margin", "Net margin", "ROE", "FCF margin"] },
  { category: "Segments", targetCount: 4, examples: ["China e-commerce", "International commerce", "Cloud", "All others"] },
  { category: "Valuation", targetCount: 4, examples: ["P/S", "EV/Sales", "P/E", "FCF yield"] },
];

export const BABA_IMPLEMENTATION_MILESTONES = [
  "Source inventory",
  "Annual financial database",
  "Segment economics",
  "Forecast and DCF",
  "Historical valuation",
  "Chart dashboard",
  "Source audit",
  "Publication QA",
];
