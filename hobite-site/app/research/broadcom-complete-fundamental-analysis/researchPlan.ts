export type BroadcomSourceSystem = { name: string; url: string; use: string };
export type BroadcomChartGroup = { category: string; targetCount: number; examples: string[] };

export const BROADCOM_SOURCE_SYSTEMS: BroadcomSourceSystem[] = [
  { name: "SEC submissions", url: "https://data.sec.gov/submissions/CIK0001730168.json", use: "Broadcom Inc. filing inventory." },
  { name: "SEC company facts", url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001730168.json", use: "XBRL-backed annual and quarterly statements." },
  { name: "Broadcom predecessor 10-K", url: "https://www.sec.gov/Archives/edgar/data/1649338/000164933817000158/avgo-10292017x10k.htm", use: "Audited FY2016-FY2017 comparative history." },
  { name: "Broadcom investor relations", url: "https://investors.broadcom.com/financial-information/quarterly-results", use: "Latest results, guidance, AI revenue and non-GAAP metrics." },
  { name: "Yahoo Finance chart API", url: "https://query1.finance.yahoo.com/v8/finance/chart/AVGO", use: "Split-adjusted historical market prices." },
];

export const BROADCOM_CHART_GROUPS: BroadcomChartGroup[] = [
  { category: "Annual financials", targetCount: 5, examples: ["Revenue", "Gross profit", "Operating income", "FCF", "Assets"] },
  { category: "Segments and AI", targetCount: 4, examples: ["Semiconductor", "Software", "AI revenue", "Segment growth"] },
  { category: "Margins", targetCount: 3, examples: ["Gross margin", "Operating margin", "FCF margin"] },
  { category: "Capital allocation", targetCount: 4, examples: ["Net debt", "SBC", "Dividends", "Repurchases"] },
  { category: "Valuation and forecast", targetCount: 4, examples: ["EV/Sales", "FCF yield", "Scenario revenue", "DCF"] },
];

export const BROADCOM_IMPLEMENTATION_MILESTONES = ["Source inventory", "SEC databases", "Q3 release bridge", "Segment and AI economics", "Capital economics", "Forecast and DCF", "Historical valuation", "Report", "Source audit", "Publication QA"];
