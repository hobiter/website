export const BIDU_FINANCIALS = [
  { year: 2005, revenue: 0.319, netIncome: 0.048, assets: 1.136, equity: 1.005 },
  { year: 2006, revenue: 0.838, netIncome: 0.302, assets: 1.668, equity: 1.357 },
  { year: 2007, revenue: 1.744, netIncome: 0.629, assets: 2.656, equity: 2.021 },
  { year: 2008, revenue: 3.198, netIncome: 1.048, assets: 3.938, equity: 3.089 },
  { year: 2009, revenue: 4.448, netIncome: 1.485, assets: 6.157, equity: 4.753 },
  { year: 2010, revenue: 7.915, netIncome: 3.525, assets: 11.05, equity: 8.406 },
  { year: 2011, revenue: 14.5, netIncome: 6.62, assets: 23.34, equity: 15.39 },
  { year: 2012, revenue: 22.31, netIncome: 10.39, assets: 45.67, equity: 26.18 },
  { year: 2013, revenue: 31.94, netIncome: 10.36, assets: 70.99, equity: 40.67 },
  { year: 2014, revenue: 49.06, netIncome: 12.25, assets: 99.12, equity: 51.07 },
  { year: 2015, revenue: 66.382, onlineMarketing: 64.037, otherRevenue: 2.345, netIncome: 33.664, assets: 147.853, equity: 80.256, employees: 41467 },
  { year: 2016, revenue: 70.549, onlineMarketing: 64.525, otherRevenue: 6.024, netIncome: 11.632, assets: 181.997, equity: 92.274, employees: 45887 },
  { year: 2017, revenue: 84.809, onlineMarketing: 73.146, otherRevenue: 11.663, netIncome: 18.301, assets: 251.728, equity: 115.346, employees: 39343 },
  { year: 2018, revenue: 102.277, onlineMarketing: 81.912, otherRevenue: 20.365, netIncome: 27.573, assets: 297.566, equity: 162.897, employees: 42267 },
  { year: 2019, revenue: 107.413, onlineMarketing: 78.093, otherRevenue: 29.32, netIncome: 2.057, assets: 301.316, equity: 163.599, employees: 37779 },
  { year: 2020, revenue: 107.074, onlineMarketing: 72.84, otherRevenue: 34.234, netIncome: 22.472, assets: 332.708, equity: 140.865, employees: 41000 },
  { year: 2021, revenue: 124.493, onlineMarketing: 80.695, otherRevenue: 43.798, netIncome: 10.226, assets: 380.034, equity: 156.082, employees: 45500 },
  { year: 2022, revenue: 123.675, onlineMarketing: 74.711, otherRevenue: 48.964, netIncome: 7.559, assets: 390.973, equity: 153.168, employees: 41300 },
  { year: 2023, revenue: 134.598, onlineMarketing: 81.203, otherRevenue: 53.395, netIncome: 20.315, assets: 406.759, equity: 144.151, employees: 39800 },
  { year: 2024, revenue: 133.125, onlineMarketing: 78.563, otherRevenue: 54.562, netIncome: 23.76, assets: 427.78, equity: 144.168, employees: 35900 },
] as const;

export const IPO_FACTS = {
  ticker: "BIDU",
  ipoDate: "2005-08-05",
  ipoPrice: 27,
  firstDayClose: 122.54,
  firstDayGainPct: 353.85,
};

export function cagr(start: number, end: number, years: number) {
  return (Math.pow(end / start, 1 / years) - 1) * 100;
}
