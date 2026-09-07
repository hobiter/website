export type NvidiaValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const NVIDIA_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance split-adjusted closes nearest NVIDIA's year-end with SEC financials and split-normalized diluted shares. FY2027 uses the September 4, 2026 market snapshot and Hobite full-year estimates.";
export const NVIDIA_VALUATION_HISTORY: NvidiaValuationHistory[] = [
  {
    "fiscalYear": 2024,
    "priceDate": "2024-01-26",
    "adjustedClose": 60.92271423339844,
    "splitAdjustedDilutedShares": 24940000000,
    "marketCapitalization": 1519412492980.957,
    "enterpriseValue": 1503137492980.957,
    "priceToSales": 24.940292389956944,
    "enterpriseValueToSales": 24.673147516183924,
    "priceToEarnings": 51.0555273179085,
    "freeCashFlowYield": 1.7783847457372892,
    "source": "Yahoo Finance adjusted close and NVIDIA SEC filings"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-01-24",
    "adjustedClose": 142.4073028564453,
    "splitAdjustedDilutedShares": 24804000000,
    "marketCapitalization": 3532270740051.2695,
    "enterpriseValue": 3497523740051.2695,
    "priceToSales": 27.067830985013217,
    "enterpriseValueToSales": 26.801564327542163,
    "priceToEarnings": 48.466942097300624,
    "freeCashFlowYield": 1.722772813250344,
    "source": "Yahoo Finance adjusted close and NVIDIA SEC filings"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-01-23",
    "adjustedClose": 187.44137573242188,
    "splitAdjustedDilutedShares": 24514000000,
    "marketCapitalization": 4594937884704.59,
    "enterpriseValue": 4592800884704.59,
    "priceToSales": 21.27896842938524,
    "enterpriseValueToSales": 21.269072070245116,
    "priceToEarnings": 38.269781744397626,
    "freeCashFlowYield": 2.1039675056720673,
    "source": "Yahoo Finance adjusted close and NVIDIA SEC filings"
  },
  {
    "fiscalYear": 2027,
    "priceDate": "2026-09-04",
    "adjustedClose": 230.36,
    "splitAdjustedDilutedShares": 24285000000,
    "marketCapitalization": 5594292600000,
    "enterpriseValue": 5605215600000,
    "priceToSales": 13.813068148148147,
    "enterpriseValueToSales": 13.840038518518519,
    "priceToEarnings": null,
    "freeCashFlowYield": 2.413173740679921,
    "source": "Yahoo Finance September 4 market snapshot, NVIDIA Q2 filing and Hobite FY2027 estimate"
  }
];
export const NVIDIA_LATEST_VALUATION = NVIDIA_VALUATION_HISTORY.at(-1)!;
