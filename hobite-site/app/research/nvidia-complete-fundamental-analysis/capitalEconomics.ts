export type NvidiaCapitalEconomics = { period: string; cashAndInvestments: number; totalDebt: number; capitalExpenditures: number; freeCashFlow: number; researchAndDevelopment: number; stockRepurchases: number; sourceUrl: string };

export const NVIDIA_CAPITAL_ECONOMICS: NvidiaCapitalEconomics[] = [
  { period: "FY2024", cashAndInvestments: 25_984_000_000, totalDebt: 9_709_000_000, capitalExpenditures: 1_069_000_000, freeCashFlow: 27_021_000_000, researchAndDevelopment: 8_675_000_000, stockRepurchases: 9_533_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581024000029/nvda-20240128.htm" },
  { period: "FY2025", cashAndInvestments: 43_210_000_000, totalDebt: 8_463_000_000, capitalExpenditures: 3_236_000_000, freeCashFlow: 60_853_000_000, researchAndDevelopment: 12_914_000_000, stockRepurchases: 33_706_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581025000023/nvda-20250126.htm" },
  { period: "FY2026", cashAndInvestments: 62_556_000_000, totalDebt: 8_468_000_000, capitalExpenditures: 6_042_000_000, freeCashFlow: 96_676_000_000, researchAndDevelopment: 18_497_000_000, stockRepurchases: 39_800_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm" },
  { period: "H1 FY2027", cashAndInvestments: 99_369_000_000, totalDebt: 33_366_000_000, capitalExpenditures: 4_434_000_000, freeCashFlow: 69_987_000_000, researchAndDevelopment: 13_375_000_000, stockRepurchases: 39_044_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
];

export const NVIDIA_LATEST_CAPITAL_ECONOMICS = NVIDIA_CAPITAL_ECONOMICS.at(-1)!;
export const NVIDIA_CAPITAL_NOTE = "Free cash flow is operating cash flow less purchases related to property, equipment and intangible assets. H1 FY2027 cash and investments include marketable debt and equity securities; $25B of senior notes were issued in June 2026.";
