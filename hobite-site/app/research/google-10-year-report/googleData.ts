export type GoogleFinancialRow = {
  fiscalYear: number;
  revenue: number;
  operatingIncome: number;
  netIncome: number;
  operatingCashFlow: number;
};

// USD billions, annual values (FY2016-FY2025) compiled from Alphabet annual filings / investor materials.
export const GOOGLE_10Y_DATA: GoogleFinancialRow[] = [
  { fiscalYear: 2016, revenue: 90.3, operatingIncome: 23.7, netIncome: 19.5, operatingCashFlow: 36.0 },
  { fiscalYear: 2017, revenue: 110.9, operatingIncome: 26.1, netIncome: 12.7, operatingCashFlow: 49.4 },
  { fiscalYear: 2018, revenue: 136.8, operatingIncome: 30.7, netIncome: 30.7, operatingCashFlow: 47.0 },
  { fiscalYear: 2019, revenue: 161.9, operatingIncome: 34.2, netIncome: 34.3, operatingCashFlow: 54.5 },
  { fiscalYear: 2020, revenue: 182.5, operatingIncome: 41.2, netIncome: 40.3, operatingCashFlow: 65.1 },
  { fiscalYear: 2021, revenue: 257.6, operatingIncome: 78.7, netIncome: 76.0, operatingCashFlow: 91.7 },
  { fiscalYear: 2022, revenue: 282.8, operatingIncome: 74.8, netIncome: 60.0, operatingCashFlow: 91.5 },
  { fiscalYear: 2023, revenue: 307.4, operatingIncome: 84.3, netIncome: 73.8, operatingCashFlow: 101.7 },
  { fiscalYear: 2024, revenue: 350.0, operatingIncome: 112.4, netIncome: 100.1, operatingCashFlow: 125.3 },
  { fiscalYear: 2025, revenue: 402.8, operatingIncome: 129.0, netIncome: 132.2, operatingCashFlow: 164.7 },
];

export const GOOGLE_SOURCE_LINKS = [
  { label: "Alphabet Investor Relations", href: "https://abc.xyz/investor/" },
  { label: "Alphabet FY2025 Form 10-K (SEC)", href: "https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/goog10-k2025.htm" },
  { label: "Alphabet FY2024 Form 10-K (SEC)", href: "https://www.sec.gov/Archives/edgar/data/1652044/000165204425000043/goog-20241231.htm" },
];

export function toIndex(values: number[]) {
  const base = values[0];
  return values.map((value) => (value / base) * 100);
}

export function cagr(start: number, end: number, periods: number) {
  return (Math.pow(end / start, 1 / periods) - 1) * 100;
}
