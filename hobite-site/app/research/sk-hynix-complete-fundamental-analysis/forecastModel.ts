import { SKHY_ANNUAL, SKHY_QUARTERLY } from "./financialHistory";
import { SKHY_BALANCE, SKHY_CAPITAL, SKHY_MARKET } from "./companyData";

export type SKHYScenario = "bear" | "base" | "bull";
export const SKHY_MODEL_INPUTS = {
  asOf: "2026-10-02",
  latestQuarterEnd: "2026-06-30",
  lastTwelveMonthRevenueKrwTrillion: SKHY_QUARTERLY.filter((row) => (row.year === 2025 && (row.quarter ?? 0) >= 3) || row.year === 2026).reduce((sum, row) => sum + row.revenue / 1000, 0),
  h1AnnualizedRevenueKrwTrillion: SKHY_QUARTERLY.filter((row) => row.year === 2026).reduce((sum, row) => sum + row.revenue / 1000, 0) * 2,
  postOfferingCommonShares: SKHY_CAPITAL.postOfferingCommonShares,
  totalAdsEquivalent: SKHY_CAPITAL.postOfferingCommonShares * SKHY_CAPITAL.adsPerCommon,
  reportedCashAndCurrentFinancialInstrumentsKrwTrillion: SKHY_BALANCE.cashKrwTrillion + SKHY_BALANCE.shortTermFinancialInstrumentsKrwTrillion,
  reportedBorrowingsKrwTrillion: SKHY_BALANCE.borrowingsKrwTrillion,
  ipoNetProceedsKrwTrillion: SKHY_CAPITAL.netProceedsUsdBillions * SKHY_MARKET.currencyKrwPerUsd / 1000,
  currentPriceUsd: SKHY_MARKET.priceUsd,
  currentImpliedEquityValueUsdTrillion: SKHY_CAPITAL.postOfferingCommonShares * SKHY_CAPITAL.adsPerCommon * SKHY_MARKET.priceUsd / 1e12,
  filingAnnuals: SKHY_ANNUAL.length,
};

export const SKHY_ASSUMPTIONS = {
  bear: {
    revenue: [250, 260, 250, 255, 270, 285, 300, 310, 320, 330],
    margin: [0.28, 0.23, 0.17, 0.19, 0.21, 0.22, 0.22, 0.23, 0.23, 0.23],
    capex: [0.29, 0.28, 0.25, 0.24, 0.23, 0.22, 0.22, 0.21, 0.21, 0.20],
    da: 0.15, tax: 0.22, workingCapital: 0.05, wacc: 0.12, growth: 0.015,
  },
  base: {
    revenue: [300, 345, 385, 420, 455, 490, 520, 550, 580, 610],
    margin: [0.36, 0.34, 0.28, 0.30, 0.31, 0.31, 0.30, 0.30, 0.29, 0.28],
    capex: [0.25, 0.24, 0.23, 0.22, 0.22, 0.21, 0.21, 0.20, 0.20, 0.20],
    da: 0.15, tax: 0.20, workingCapital: 0.05, wacc: 0.105, growth: 0.02,
  },
  bull: {
    revenue: [350, 430, 510, 590, 670, 750, 820, 890, 950, 1010],
    margin: [0.39, 0.38, 0.35, 0.36, 0.36, 0.35, 0.34, 0.34, 0.33, 0.32],
    capex: [0.26, 0.25, 0.24, 0.23, 0.22, 0.22, 0.21, 0.21, 0.20, 0.20],
    da: 0.15, tax: 0.18, workingCapital: 0.05, wacc: 0.095, growth: 0.025,
  },
} as const;

export function skhyForecast(scenario: SKHYScenario) {
  const assumptions = SKHY_ASSUMPTIONS[scenario];
  const priorRevenue = SKHY_MODEL_INPUTS.h1AnnualizedRevenueKrwTrillion;
  return assumptions.revenue.map((revenue, index) => {
    const operatingProfit = revenue * assumptions.margin[index];
    const da = revenue * assumptions.da;
    const capex = revenue * assumptions.capex[index];
    const workingCapital = (revenue - (index ? assumptions.revenue[index - 1] : priorRevenue)) * assumptions.workingCapital;
    const fcff = operatingProfit * (1 - assumptions.tax) + da - capex - workingCapital;
    return {
      year: 2027 + index,
      revenue,
      growthPct: (revenue / (index ? assumptions.revenue[index - 1] : priorRevenue) - 1) * 100,
      marginPct: assumptions.margin[index] * 100,
      da,
      capex,
      workingCapital,
      fcff,
      fcffMarginPct: fcff / revenue * 100,
    };
  });
}

export function skhyDcf(scenario: SKHYScenario, wacc: number = SKHY_ASSUMPTIONS[scenario].wacc, terminalGrowth: number = SKHY_ASSUMPTIONS[scenario].growth) {
  if (!(wacc > terminalGrowth && terminalGrowth >= 0 && wacc < 0.3)) throw new Error("Invalid WACC / terminal growth assumptions");
  const forecast = skhyForecast(scenario);
  const pvFcff = forecast.reduce((sum, row, index) => sum + row.fcff / (1 + wacc) ** (index + 1), 0);
  const terminalFcff = forecast.at(-1)!.fcff * (1 + terminalGrowth);
  const pvTerminal = terminalFcff / (wacc - terminalGrowth) / (1 + wacc) ** forecast.length;
  const enterpriseValue = pvFcff + pvTerminal;
  const netCash = SKHY_MODEL_INPUTS.reportedCashAndCurrentFinancialInstrumentsKrwTrillion
    - SKHY_MODEL_INPUTS.reportedBorrowingsKrwTrillion
    + SKHY_MODEL_INPUTS.ipoNetProceedsKrwTrillion;
  const equityValue = enterpriseValue + netCash;
  const priceUsdPerAds = equityValue * 1e12 / SKHY_MODEL_INPUTS.totalAdsEquivalent / SKHY_MARKET.currencyKrwPerUsd;
  return { forecast, pvFcff, pvTerminal, enterpriseValue, netCash, equityValue, priceUsdPerAds, upsidePct: (priceUsdPerAds / SKHY_MARKET.priceUsd - 1) * 100 };
}

export const SKHY_DCF_CASES = {
  bear: skhyDcf("bear"), base: skhyDcf("base"), bull: skhyDcf("bull"),
};
export const SKHY_SENSITIVITY = [0.09, 0.10, 0.105, 0.11, 0.12].map((wacc) => ({
  waccPct: wacc * 100,
  priceUsdPerAds: skhyDcf("base", wacc, 0.02).priceUsdPerAds,
}));
