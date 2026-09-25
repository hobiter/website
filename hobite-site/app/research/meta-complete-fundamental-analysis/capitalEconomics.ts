export type MetaCapitalEconomics = { period: string; cashAndInvestments: number; totalDebt: number; capitalExpenditures: number; freeCashFlow: number; researchAndDevelopment: number; stockRepurchases: number; sourceUrl: string };

export const META_CAPITAL_ECONOMICS: MetaCapitalEconomics[] = [
  { period: "FY2024", cashAndInvestments: 77_810_000_000, totalDebt: 28_826_000_000, capitalExpenditures: 39_230_000_000, freeCashFlow: 52_100_000_000, researchAndDevelopment: 43_870_000_000, stockRepurchases: 29_750_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000132680125000017/meta-20241231.htm" },
  { period: "FY2025", cashAndInvestments: 81_592_000_000, totalDebt: 58_744_000_000, capitalExpenditures: 72_220_000_000, freeCashFlow: 43_700_000_000, researchAndDevelopment: 58_860_000_000, stockRepurchases: 44_800_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm" },
  { period: "H1 2026", cashAndInvestments: 90_260_000_000, totalDebt: 83_664_000_000, capitalExpenditures: 50_918_000_000, freeCashFlow: 12_284_000_000, researchAndDevelopment: 39_354_000_000, stockRepurchases: 0, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm" },
];

export const META_LATEST_CAPITAL_ECONOMICS = META_CAPITAL_ECONOMICS.at(-1)!;
export const META_CAPITAL_NOTE = "Meta's reported free cash flow subtracts purchases of property and equipment and principal payments on finance leases. Capex is now the central valuation variable: the company guided FY2026 capex including finance leases to $130B-$145B.";
