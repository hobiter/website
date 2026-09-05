export type TeslaValuationHistory = { fiscalYear: number; priceDate: string; adjustedClose: number | null; splitAdjustedDilutedShares: number; marketCapitalization: number | null; enterpriseValue: number | null; priceToSales: number | null; enterpriseValueToSales: number | null; priceToEarnings: number | null; freeCashFlowYield: number | null; source: string };
export const TESLA_VALUATION_HISTORY_NOTE = "Historical rows combine Yahoo Finance split-adjusted closes nearest Tesla's year-end with SEC financials and split-normalized diluted shares. FY2026 uses the September 4, 2026 market snapshot and Hobite full-year estimates.";
export const TESLA_VALUATION_HISTORY: TeslaValuationHistory[] = [
  {
    "fiscalYear": 2019,
    "priceDate": "2019-12-31",
    "adjustedClose": 27.8886661529541,
    "splitAdjustedDilutedShares": 2655000000,
    "marketCapitalization": 74044408636.09314,
    "enterpriseValue": 79577408636.09314,
    "priceToSales": 3.012629531942922,
    "enterpriseValueToSales": 3.2377495579824696,
    "priceToEarnings": null,
    "freeCashFlowYield": 1.4558830570152277,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2020,
    "priceDate": "2020-12-31",
    "adjustedClose": 235.22332763671875,
    "splitAdjustedDilutedShares": 3249000000,
    "marketCapitalization": 764240591491.6992,
    "enterpriseValue": 755076591491.6992,
    "priceToSales": 24.23391018175099,
    "enterpriseValueToSales": 23.94332164801177,
    "priceToEarnings": 1059.9730811257964,
    "freeCashFlowYield": 0.3645448869134374,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2021,
    "priceDate": "2021-12-31",
    "adjustedClose": 352.260009765625,
    "splitAdjustedDilutedShares": 3387000000,
    "marketCapitalization": 1193104653076.1719,
    "enterpriseValue": 1180870653076.1719,
    "priceToSales": 22.167189734428998,
    "enterpriseValueToSales": 21.939889138029688,
    "priceToEarnings": 216.18131057730963,
    "freeCashFlowYield": 0.42033194548943104,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2022,
    "priceDate": "2022-12-30",
    "adjustedClose": 123.18000030517578,
    "splitAdjustedDilutedShares": 3475000000,
    "marketCapitalization": 428050501060.48584,
    "enterpriseValue": 407910501060.48584,
    "priceToSales": 5.2546033863701584,
    "enterpriseValueToSales": 5.00737154821249,
    "priceToEarnings": 34.091311011507315,
    "freeCashFlowYield": 1.7675484507681682,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2023,
    "priceDate": "2023-12-29",
    "adjustedClose": 248.47999572753906,
    "splitAdjustedDilutedShares": 3485000000,
    "marketCapitalization": 865952785110.4736,
    "enterpriseValue": 841515785110.4736,
    "priceToSales": 8.948289141707642,
    "enterpriseValueToSales": 8.695770360642676,
    "priceToEarnings": 57.74173402083574,
    "freeCashFlowYield": 0.5032606944550713,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2024,
    "priceDate": "2024-12-31",
    "adjustedClose": 403.8399963378906,
    "splitAdjustedDilutedShares": 3498000000,
    "marketCapitalization": 1412632307189.9414,
    "enterpriseValue": 1383947307189.9414,
    "priceToSales": 14.460357326133089,
    "enterpriseValueToSales": 14.1667244056704,
    "priceToEarnings": 199.2148226188043,
    "freeCashFlowYield": 0.25371074849119235,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2025,
    "priceDate": "2025-12-31",
    "adjustedClose": 449.7200012207031,
    "splitAdjustedDilutedShares": 3528000000,
    "marketCapitalization": 1586612164306.6406,
    "enterpriseValue": 1550706164306.6406,
    "priceToSales": 16.731649891978453,
    "enterpriseValueToSales": 16.353002460339784,
    "priceToEarnings": 418.1898166332738,
    "freeCashFlowYield": 0.3920302730515229,
    "source": "Yahoo Finance adjusted close and Tesla SEC filings"
  },
  {
    "fiscalYear": 2026,
    "priceDate": "2026-09-04",
    "adjustedClose": 354.08,
    "splitAdjustedDilutedShares": 3540000000,
    "marketCapitalization": 1253443200000,
    "enterpriseValue": 1218980200000,
    "priceToSales": 11.29228108108108,
    "enterpriseValueToSales": 10.981803603603604,
    "priceToEarnings": null,
    "freeCashFlowYield": 0.1994506013515411,
    "source": "Yahoo Finance September 4 market snapshot, Tesla Q2 filing and Hobite FY2026 estimate"
  }
];
export const TESLA_LATEST_VALUATION = TESLA_VALUATION_HISTORY.at(-1)!;
