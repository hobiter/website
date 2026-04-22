export type MsftFinancialRow = {
  fiscalYear: number;
  revenue: number;
  ebita: number;
  operatingCashFlow: number;
};

// USD billions, fiscal year ending in June.
export const MSFT_10Y_DATA: MsftFinancialRow[] = [
  { fiscalYear: 2016, revenue: 85.3, ebita: 33.4, operatingCashFlow: 33.3 },
  { fiscalYear: 2017, revenue: 90.0, ebita: 35.1, operatingCashFlow: 39.5 },
  { fiscalYear: 2018, revenue: 110.4, ebita: 45.3, operatingCashFlow: 43.9 },
  { fiscalYear: 2019, revenue: 125.8, ebita: 53.0, operatingCashFlow: 52.2 },
  { fiscalYear: 2020, revenue: 143.0, ebita: 64.2, operatingCashFlow: 60.7 },
  { fiscalYear: 2021, revenue: 168.1, ebita: 83.4, operatingCashFlow: 76.7 },
  { fiscalYear: 2022, revenue: 198.3, ebita: 97.8, operatingCashFlow: 89.0 },
  { fiscalYear: 2023, revenue: 211.9, ebita: 105.0, operatingCashFlow: 87.6 },
  { fiscalYear: 2024, revenue: 245.1, ebita: 128.5, operatingCashFlow: 118.5 },
  { fiscalYear: 2025, revenue: 261.8, ebita: 136.4, operatingCashFlow: 133.2 },
];

export function toIndexedSeries(values: number[]) {
  const base = values[0];
  return values.map((value) => (value / base) * 100);
}
