export type BroadcomLatestQuarter = {
  period: string;
  reportDate: string;
  releaseDate: string;
  revenue: number;
  revenueGrowth: number;
  gaapOperatingIncome: number;
  nonGaapOperatingIncome: number;
  gaapNetIncome: number;
  nonGaapNetIncome: number;
  dilutedEps: number;
  operatingCashFlow: number;
  capitalExpenditures: number;
  freeCashFlow: number;
  semiconductorRevenue: number;
  infrastructureSoftwareRevenue: number;
  aiSemiconductorRevenue: number;
  aiRevenueGrowth: number;
  cash: number;
  sourceUrl: string;
};

export const BROADCOM_Q3_2026: BroadcomLatestQuarter = {
  period: "FY2026 Q3",
  reportDate: "2026-08-02",
  releaseDate: "2026-09-02",
  revenue: 29_591_000_000,
  revenueGrowth: 86,
  gaapOperatingIncome: 15_955_000_000,
  nonGaapOperatingIncome: 20_095_000_000,
  gaapNetIncome: 13_088_000_000,
  nonGaapNetIncome: 16_372_000_000,
  dilutedEps: 2.68,
  operatingCashFlow: 14_197_000_000,
  capitalExpenditures: 532_000_000,
  freeCashFlow: 13_665_000_000,
  semiconductorRevenue: 20_839_000_000,
  infrastructureSoftwareRevenue: 8_752_000_000,
  aiSemiconductorRevenue: 16_700_000_000,
  aiRevenueGrowth: 221,
  cash: 23_975_000_000,
  sourceUrl: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
};

export const BROADCOM_Q4_2026_GUIDANCE = {
  revenue: 34_800_000_000,
  nonGaapOperatingMargin: 66,
  aiSemiconductorRevenue: 21_700_000_000,
  aiRevenueGrowth: 236,
  sourceUrl: BROADCOM_Q3_2026.sourceUrl,
  note: "Company guidance as of September 2, 2026; actual results may differ materially.",
};
