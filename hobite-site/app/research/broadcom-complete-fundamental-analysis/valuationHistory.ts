export type BroadcomValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const BROADCOM_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance split-adjusted closes nearest Broadcom's fiscal year-end with SEC financials and split-adjusted diluted shares. FY2026 uses the September 3, 2026 market snapshot, company Q4 revenue guidance and a Hobite full-year FCF estimate. The July 2024 ten-for-one split is normalized.";
export const BROADCOM_VALUATION_HISTORY: BroadcomValuationHistory[] = [
  {
    "fiscalYear": 2020,
    "priceDate": "2020-10-30",
    "adjustedClose": 31.072769165039062,
    "splitAdjustedDilutedShares": 4210000000,
    "marketCapitalization": 130816358184.81445,
    "enterpriseValue": 164260358184.81445,
    "priceToSales": 5.476237365405829,
    "enterpriseValueToSales": 6.876270855024048,
    "priceToEarnings": 44.19471560297786,
    "freeCashFlowYield": 8.865863689321332,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2021,
    "priceDate": "2021-10-29",
    "adjustedClose": 48.75704574584961,
    "splitAdjustedDilutedShares": 4290000000,
    "marketCapitalization": 209167726249.69482,
    "enterpriseValue": 236734726249.69482,
    "priceToSales": 7.6199535974387915,
    "enterpriseValueToSales": 8.624215892520759,
    "priceToEarnings": 31.052215892175596,
    "freeCashFlowYield": 6.36857331618072,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2022,
    "priceDate": "2022-10-28",
    "adjustedClose": 44.67585372924805,
    "splitAdjustedDilutedShares": 4230000000,
    "marketCapitalization": 188978861274.71924,
    "enterpriseValue": 215807861274.71924,
    "priceToSales": 5.691620072725936,
    "enterpriseValueToSales": 6.499649467660128,
    "priceToEarnings": 16.440092324899457,
    "freeCashFlowYield": 8.631653238870557,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2023,
    "priceDate": "2023-10-27",
    "adjustedClose": 81.30624389648438,
    "splitAdjustedDilutedShares": 4270000000,
    "marketCapitalization": 347177661437.9883,
    "enterpriseValue": 370638661437.9883,
    "priceToSales": 9.692555946229328,
    "enterpriseValueToSales": 10.347543522655247,
    "priceToEarnings": 24.654002374519834,
    "freeCashFlowYield": 5.0789558080912265,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2024,
    "priceDate": "2024-11-01",
    "adjustedClose": 166.34713745117188,
    "splitAdjustedDilutedShares": 4778000000,
    "marketCapitalization": 794806622741.6992,
    "enterpriseValue": 853024622741.6992,
    "priceToSales": 15.410994352613704,
    "enterpriseValueToSales": 16.53981895415712,
    "priceToEarnings": 134.82724728442736,
    "freeCashFlowYield": 2.442606722756168,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-10-31",
    "adjustedClose": 367.5700988769531,
    "splitAdjustedDilutedShares": 4853000000,
    "marketCapitalization": 1783817689849.8535,
    "enterpriseValue": 1832775689849.8535,
    "priceToSales": 27.92145021443883,
    "enterpriseValueToSales": 28.687772001343834,
    "priceToEarnings": 77.13472670802791,
    "freeCashFlowYield": 1.508786472583159,
    "source": "Yahoo Finance adjusted close and Broadcom SEC filings"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-09-03",
    "adjustedClose": 357.16,
    "splitAdjustedDilutedShares": 4884000000,
    "marketCapitalization": 1744369440000.0002,
    "enterpriseValue": 1779813440000.0002,
    "priceToSales": 16.473566092795288,
    "enterpriseValueToSales": 16.808293968212,
    "priceToEarnings": null,
    "freeCashFlowYield": 2.6313233279298904,
    "source": "Yahoo Finance September 3 market snapshot and Broadcom Q3 release/FY2026 guidance"
  }
];
export const BROADCOM_LATEST_VALUATION = BROADCOM_VALUATION_HISTORY.at(-1)!;
