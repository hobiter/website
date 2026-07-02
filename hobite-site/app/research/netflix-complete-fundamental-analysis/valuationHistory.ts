export type NetflixValuationHistory = {
  fiscalYear: number;
  priceDate: string;
  adjustedClose: number;
  dilutedShares: number | null;
  splitAdjustedDilutedShares: number | null;
  marketCap: number | null;
  enterpriseValue: number | null;
  netDebt: number | null;
  priceToSales: number | null;
  enterpriseValueToSales: number | null;
  priceToEarnings: number | null;
  freeCashFlowYield: number | null;
  revenue: number | null;
  netIncome: number | null;
  freeCashFlow: number | null;
  source: string;
};

export const NETFLIX_VALUATION_HISTORY_SOURCE_NOTE =
  "Historical valuation rows combine Yahoo Finance split-adjusted year-end NFLX close prices with Netflix SEC Form 10-K financial rows. FY2020-FY2022 diluted share counts are normalized to the same split-adjusted basis as the historical adjusted prices.";

export const NETFLIX_VALUATION_HISTORY_COVERAGE = {
  fromFiscalYear: 2020,
  throughFiscalYear: 2025,
  marketDataSource: "Yahoo Finance historical adjusted close",
  fundamentalDataSource: "Netflix SEC Form 10-K financials",
};

export const NETFLIX_VALUATION_HISTORY: NetflixValuationHistory[] = [
  {
    fiscalYear: 2020,
    priceDate: "2020-12-31",
    adjustedClose: 54.073,
    dilutedShares: 454208000,
    splitAdjustedDilutedShares: 4542080000,
    marketCap: 245603900295,
    enterpriseValue: 253207445295,
    netDebt: 7603545000,
    priceToSales: 9.83,
    enterpriseValueToSales: 10.13,
    priceToEarnings: 88.9,
    freeCashFlowYield: 0.8,
    revenue: 24996056000,
    netIncome: 2761395000,
    freeCashFlow: 1929154000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
  {
    fiscalYear: 2021,
    priceDate: "2021-12-31",
    adjustedClose: 60.244,
    dilutedShares: 455372000,
    splitAdjustedDilutedShares: 4553720000,
    marketCap: 274334305318,
    enterpriseValue: 282999573318,
    netDebt: 8665268000,
    priceToSales: 9.24,
    enterpriseValueToSales: 9.53,
    priceToEarnings: 53.6,
    freeCashFlowYield: 0,
    revenue: 29697844000,
    netIncome: 5116228000,
    freeCashFlow: -131975000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
  {
    fiscalYear: 2022,
    priceDate: "2022-12-30",
    adjustedClose: 29.488,
    dilutedShares: 451290000,
    splitAdjustedDilutedShares: 4512900000,
    marketCap: 133076399125,
    enterpriseValue: 142282299125,
    netDebt: 9205900000,
    priceToSales: 4.21,
    enterpriseValueToSales: 4.5,
    priceToEarnings: 29.6,
    freeCashFlowYield: 1.2,
    revenue: 31615550000,
    netIncome: 4491924000,
    freeCashFlow: 1618528000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
  {
    fiscalYear: 2023,
    priceDate: "2023-12-29",
    adjustedClose: 48.688,
    dilutedShares: 4494966000,
    splitAdjustedDilutedShares: 4494966000,
    marketCap: 218850903373,
    enterpriseValue: 225877407373,
    netDebt: 7026504000,
    priceToSales: 6.49,
    enterpriseValueToSales: 6.7,
    priceToEarnings: 40.5,
    freeCashFlowYield: 3.2,
    revenue: 33723297000,
    netIncome: 5407990000,
    freeCashFlow: 6925749000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
  {
    fiscalYear: 2024,
    priceDate: "2024-12-31",
    adjustedClose: 89.132,
    dilutedShares: 4392608000,
    splitAdjustedDilutedShares: 4392608000,
    marketCap: 391521952878,
    enterpriseValue: 397515570878,
    netDebt: 5993618000,
    priceToSales: 10.04,
    enterpriseValueToSales: 10.19,
    priceToEarnings: 44.9,
    freeCashFlowYield: 1.8,
    revenue: 39000966000,
    netIncome: 8711631000,
    freeCashFlow: 6921826000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
  {
    fiscalYear: 2025,
    priceDate: "2025-12-31",
    adjustedClose: 93.76,
    dilutedShares: 4343863000,
    splitAdjustedDilutedShares: 4343863000,
    marketCap: 407280604159,
    enterpriseValue: 411710894159,
    netDebt: 4430290000,
    priceToSales: 9.01,
    enterpriseValueToSales: 9.11,
    priceToEarnings: 37.1,
    freeCashFlowYield: 2.3,
    revenue: 45183036000,
    netIncome: 10981201000,
    freeCashFlow: 9461053000,
    source: "Yahoo Finance historical adjusted close and Netflix SEC Form 10-K financials",
  },
];

export const NETFLIX_LATEST_VALUATION_HISTORY = NETFLIX_VALUATION_HISTORY[NETFLIX_VALUATION_HISTORY.length - 1];
