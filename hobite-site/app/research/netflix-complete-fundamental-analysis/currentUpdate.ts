export const NETFLIX_CURRENT_UPDATE = {
  asOf: "2026-10-04",
  referencePrice: 67,
  resultsDate: "2026-07-16",
  letterUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000211/ex991_q226.htm",
  filingUrl: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000212/nflx-20260630.htm",
  cash: 9_099_232_000,
  debt: 2_483_758_000 + 11_825_548_000,
  dilutedShares: 4_261_300_000,
  revenueGuidanceLow: 51_000_000_000,
  revenueGuidanceHigh: 51_400_000_000,
  revenueGuidanceMidpoint: 51_200_000_000,
  operatingMarginGuidance: 31.5,
  reportedFcfGuidance: 12_500_000_000,
  adsRevenueGuidance: 3_000_000_000,
  q3RevenueGuidance: 12_860_000_000,
  q3MarginGuidance: 33.2,
  q3EpsGuidance: 0.82,
  h1ReportedFcf: 6_619_243_000,
  // Analyst normalization, not a company-disclosed adjusted measure.
  assumedAfterTaxTerminationBenefit: 2_000_000_000,
  contentAssets: 33_837_573_000,
  contentObligations: 25_106_705_000,
};

const update = NETFLIX_CURRENT_UPDATE;
export const NETFLIX_CURRENT_VALUATION = {
  netDebt: update.debt - update.cash,
  normalizedFcf: update.reportedFcfGuidance - update.assumedAfterTaxTerminationBenefit,
  // A diluted valuation proxy, not exchange-reported market capitalization.
  dilutedEquityValue: update.referencePrice * update.dilutedShares,
  get enterpriseValue() { return this.dilutedEquityValue + this.netDebt; },
  get forwardPriceToSales() { return this.dilutedEquityValue / update.revenueGuidanceMidpoint; },
  get forwardEvToSales() { return this.enterpriseValue / update.revenueGuidanceMidpoint; },
  get reportedFcfYield() { return update.reportedFcfGuidance / this.dilutedEquityValue * 100; },
  get normalizedFcfYield() { return this.normalizedFcf / this.dilutedEquityValue * 100; },
};
