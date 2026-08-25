export type BerkshireQuarterlyFinancial = {
  period: string;
  fiscalYear: number;
  fiscalQuarter: number;
  reportDate: string;
  filingUrl: string;
  revenue: number | null;
  preTaxEarnings: number | null;
  netIncome: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
  preTaxMargin: number | null;
  netMargin: number | null;
  freeCashFlowMargin: number | null;
  derivedFourthQuarter: boolean;
};

export const BERKSHIRE_QUARTERLY_FINANCIALS_SOURCE_NOTE =
  "Q1 2024-Q2 2026 are generated from SEC XBRL company facts. Q4 income-statement and cash-flow values are derived as full-year minus the first three quarters. Quarterly GAAP earnings include mark-to-market investment gains and losses.";

export const BERKSHIRE_QUARTERLY_FINANCIALS = [
  {
    "period": "2024 Q1",
    "fiscalYear": 2024,
    "fiscalQuarter": 1,
    "reportDate": "2024-03-31",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024053185/brka-20240331.htm",
    "revenue": 89869000000,
    "preTaxEarnings": 15706000000,
    "netIncome": 12702000000,
    "operatingCashFlow": 10566000000,
    "capitalExpenditures": 4393000000,
    "freeCashFlow": 6173000000,
    "preTaxMargin": 17.5,
    "netMargin": 14.1,
    "freeCashFlowMargin": 6.9,
    "derivedFourthQuarter": false
  },
  {
    "period": "2024 Q2",
    "fiscalYear": 2024,
    "fiscalQuarter": 2,
    "reportDate": "2024-06-30",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024090305/brka-20240630.htm",
    "revenue": 93653000000,
    "preTaxEarnings": 38137000000,
    "netIncome": 30348000000,
    "operatingCashFlow": 13602000000,
    "capitalExpenditures": 4535000000,
    "freeCashFlow": 9067000000,
    "preTaxMargin": 40.7,
    "netMargin": 32.4,
    "freeCashFlowMargin": 9.7,
    "derivedFourthQuarter": false
  },
  {
    "period": "2024 Q3",
    "fiscalYear": 2024,
    "fiscalQuarter": 3,
    "reportDate": "2024-09-30",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017024120241/brka-20240930.htm",
    "revenue": 92995000000,
    "preTaxEarnings": 32508000000,
    "netIncome": 26251000000,
    "operatingCashFlow": 1803000000,
    "capitalExpenditures": 4701000000,
    "freeCashFlow": -2898000000,
    "preTaxMargin": 35,
    "netMargin": 28.2,
    "freeCashFlowMargin": -3.1,
    "derivedFourthQuarter": false
  },
  {
    "period": "2024 Q4",
    "fiscalYear": 2024,
    "fiscalQuarter": 4,
    "reportDate": "2024-12-31",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025025210/brka-20241231.htm",
    "revenue": 94916000000,
    "preTaxEarnings": 24025000000,
    "netIncome": 19694000000,
    "operatingCashFlow": 4621000000,
    "capitalExpenditures": 5347000000,
    "freeCashFlow": -726000000,
    "preTaxMargin": 25.3,
    "netMargin": 20.7,
    "freeCashFlowMargin": -0.8,
    "derivedFourthQuarter": true
  },
  {
    "period": "2025 Q1",
    "fiscalYear": 2025,
    "fiscalQuarter": 1,
    "reportDate": "2025-03-31",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025063112/brka-20250331.htm",
    "revenue": 89725000000,
    "preTaxEarnings": 5148000000,
    "netIncome": 4603000000,
    "operatingCashFlow": 10903000000,
    "capitalExpenditures": 4281000000,
    "freeCashFlow": 6622000000,
    "preTaxMargin": 5.7,
    "netMargin": 5.1,
    "freeCashFlowMargin": 7.4,
    "derivedFourthQuarter": false
  },
  {
    "period": "2025 Q2",
    "fiscalYear": 2025,
    "fiscalQuarter": 2,
    "reportDate": "2025-06-30",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000095017025101578/brka-20250630.htm",
    "revenue": 92515000000,
    "preTaxEarnings": 14750000000,
    "netIncome": 12370000000,
    "operatingCashFlow": 10085000000,
    "capitalExpenditures": 4858000000,
    "freeCashFlow": 5227000000,
    "preTaxMargin": 15.9,
    "netMargin": 13.4,
    "freeCashFlowMargin": 5.6,
    "derivedFourthQuarter": false
  },
  {
    "period": "2025 Q3",
    "fiscalYear": 2025,
    "fiscalQuarter": 3,
    "reportDate": "2025-09-30",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312525261548/brka-20250930.htm",
    "revenue": 94972000000,
    "preTaxEarnings": 38105000000,
    "netIncome": 30796000000,
    "operatingCashFlow": 13789000000,
    "capitalExpenditures": 5586000000,
    "freeCashFlow": 8203000000,
    "preTaxMargin": 40.1,
    "netMargin": 32.4,
    "freeCashFlowMargin": 8.6,
    "derivedFourthQuarter": false
  },
  {
    "period": "2025 Q4",
    "fiscalYear": 2025,
    "fiscalQuarter": 4,
    "reportDate": "2025-12-31",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm",
    "revenue": 94232000000,
    "preTaxEarnings": 24456000000,
    "netIncome": 19199000000,
    "operatingCashFlow": 11192000000,
    "capitalExpenditures": 6202000000,
    "freeCashFlow": 4990000000,
    "preTaxMargin": 26,
    "netMargin": 20.4,
    "freeCashFlowMargin": 5.3,
    "derivedFourthQuarter": true
  },
  {
    "period": "2026 Q1",
    "fiscalYear": 2026,
    "fiscalQuarter": 1,
    "reportDate": "2026-03-31",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526202243/brka-20260331.htm",
    "revenue": 93675000000,
    "preTaxEarnings": 12319000000,
    "netIncome": 10106000000,
    "operatingCashFlow": 10438000000,
    "capitalExpenditures": 4986000000,
    "freeCashFlow": 5452000000,
    "preTaxMargin": 13.2,
    "netMargin": 10.8,
    "freeCashFlowMargin": 5.8,
    "derivedFourthQuarter": false
  },
  {
    "period": "2026 Q2",
    "fiscalYear": 2026,
    "fiscalQuarter": 2,
    "reportDate": "2026-06-30",
    "filingUrl": "https://www.sec.gov/Archives/edgar/data/1067983/000119312526341032/brka-20260630.htm",
    "revenue": 101808000000,
    "preTaxEarnings": 32063000000,
    "netIncome": 25667000000,
    "operatingCashFlow": 11215000000,
    "capitalExpenditures": 5645000000,
    "freeCashFlow": 5570000000,
    "preTaxMargin": 31.5,
    "netMargin": 25.2,
    "freeCashFlowMargin": 5.5,
    "derivedFourthQuarter": false
  }
] satisfies BerkshireQuarterlyFinancial[];
export const BERKSHIRE_LATEST_QUARTERLY_FINANCIAL = BERKSHIRE_QUARTERLY_FINANCIALS[BERKSHIRE_QUARTERLY_FINANCIALS.length - 1];
