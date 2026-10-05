export const TSM_SOURCES = {
  annual:
    "https://www.sec.gov/Archives/edgar/data/1046179/000162828026025362/tsm-20251231.htm",
  quarterly: "https://investor.tsmc.com/english/quarterly-results/2026/q2",
  fullInterim:
    "https://www.sec.gov/Archives/edgar/data/1046179/000104617926000541/a2026q2consolidatedreport-.htm",
  release:
    "https://www.sec.gov/Archives/edgar/data/1046179/000104617926000451/a2q26e_withguidancexfinal.htm",
  presentation:
    "https://www.sec.gov/Archives/edgar/data/1046179/000104617926000451/a2q26presentatione.htm",
  monthly: "https://investor.tsmc.com/english/monthly-revenue/2026",
  facts: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001046179.json",
  submissions: "https://data.sec.gov/submissions/CIK0001046179.json",
};
export const TSM_OPERATING = {
  asOf: "2026-10-04",
  quarter: "2026 Q2",
  cash: 3134.218e9,
  currentMarketableInstruments: 383.795e9,
  debtCurrent: 167.41e9,
  bondsNoncurrent: 815.036716e9,
  bankNoncurrent: 49.226958e9,
  noncontrolling: 41.952647e9,
  ordinaryDilutedShares: 25.932e9,
  inventory: 385.525e9,
  receivables: 440.923e9,
  equipmentPayables: 290.85e9,
  waferShipmentThousands: 4336,
  inventoryDays: 87,
  receivableDays: 29,
  usdRevenue: 40.201e9,
  incomeAverageFx: 31.601,
  balanceClosingFx: 31.918,
  clients2025: 534,
  products2025: 12682,
  processTechnologies2025: 305,
  h126Revenue: 2404.484e9,
  h126NetIncome: 1279.042e9,
  h126OperatingCashFlow: 1482.341e9,
  h126Capex: 846.765e9,
  h126DepreciationAmortization: 363.988e9,
};
export const TSM_GUIDANCE = {
  quarter: "2026 Q3",
  usdRevenueLow: 44.6e9,
  usdRevenueHigh: 45.8e9,
  fx: 32,
  grossMarginLow: 65,
  grossMarginHigh: 67,
  operatingMarginLow: 56,
  operatingMarginHigh: 58,
  annualUsdGrowth: "slightly above 40%",
  source: TSM_SOURCES.presentation,
};
export const TSM_NODES = [
  { en: "2 nm", zh: "2 纳米", share: 3 },
  { en: "3 nm", zh: "3 纳米", share: 30 },
  { en: "5 nm", zh: "5 纳米", share: 33 },
  { en: "7 nm", zh: "7 纳米", share: 11 },
  { en: "16/20 nm", zh: "16/20 纳米", share: 6 },
  { en: "28 nm", zh: "28 纳米", share: 6 },
  { en: "40/45 nm", zh: "40/45 纳米", share: 2 },
  { en: "65 nm", zh: "65 纳米", share: 4 },
  { en: "90 nm–0.13 μm", zh: "90 纳米至 0.13 微米", share: 2 },
  { en: "≥0.15 μm", zh: "≥0.15 微米", share: 3 },
];
export const TSM_PLATFORMS = [
  { en: "HPC", zh: "高性能计算", share: 66, growth: 20 },
  { en: "Smartphone", zh: "智能手机", share: 22, growth: -4 },
  { en: "IoT", zh: "物联网", share: 5, growth: 4 },
  { en: "Automotive", zh: "汽车", share: 4, growth: 15 },
  { en: "Digital consumer", zh: "数字消费电子", share: 1, growth: 5 },
  { en: "Others", zh: "其他", share: 2, growth: 5 },
];
export const TSM_MONTHLY = [
  401255, 317657, 415191, 410726, 416975, 442680, 467580, 514806,
].map((revenue, i) => ({
  month: `2026-${String(i + 1).padStart(2, "0")}`,
  revenue: revenue * 1e6,
  yoy: [36.8, 22.2, 45.2, 17.5, 30.1, 67.9, 44.7, 53.3][i],
}));
export const TSM_MONTHLY_NOTE = {
  en: "January–August 2026 unaudited revenue: NTD 3,386.870B, +39.3% YoY. September and Q3 earnings were not published at this October 4 cutoff. Monthly sales are not quarterly profit or cash flow.",
  zh: "2026 年 1—8 月未经审计收入为 33,868.70 亿新台币，同比增长 39.3%。截至 10 月 4 日，9 月收入及第三季度财报尚未公布；月度收入不代表季度利润或现金流。",
};
