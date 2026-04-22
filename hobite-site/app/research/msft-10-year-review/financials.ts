export const MSFT_FINANCIALS = [
  { year: 2016, revenue: 91.154, operatingIncome: 26.078, operatingCashFlow: 33.325 },
  { year: 2017, revenue: 96.571, operatingIncome: 29.025, operatingCashFlow: 39.507 },
  { year: 2018, revenue: 110.36, operatingIncome: 35.058, operatingCashFlow: 43.884 },
  { year: 2019, revenue: 125.843, operatingIncome: 42.959, operatingCashFlow: 52.185 },
  { year: 2020, revenue: 143.015, operatingIncome: 52.959, operatingCashFlow: 60.675 },
  { year: 2021, revenue: 168.088, operatingIncome: 69.916, operatingCashFlow: 76.74 },
  { year: 2022, revenue: 198.27, operatingIncome: 83.383, operatingCashFlow: 89.035 },
  { year: 2023, revenue: 211.915, operatingIncome: 88.523, operatingCashFlow: 87.582 },
  { year: 2024, revenue: 245.122, operatingIncome: 109.433, operatingCashFlow: 118.548 },
  { year: 2025, revenue: 281.724, operatingIncome: 128.528, operatingCashFlow: 136.162 },
] as const;

export function pctGrowth(start: number, end: number) {
  return ((end - start) / start) * 100;
}
