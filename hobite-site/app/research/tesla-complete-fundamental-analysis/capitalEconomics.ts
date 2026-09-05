export type TeslaCapitalEconomics = { period: string; cashAndInvestments: number; totalDebt: number; capitalExpenditures: number; freeCashFlow: number; researchAndDevelopment: number; regulatoryCredits: number; sourceUrl: string };

export const TESLA_CAPITAL_ECONOMICS: TeslaCapitalEconomics[] = [
  { period: "FY2023", cashAndInvestments: 29_094_000_000, totalDebt: 4_657_000_000, capitalExpenditures: 8_898_000_000, freeCashFlow: 4_358_000_000, researchAndDevelopment: 3_969_000_000, regulatoryCredits: 1_790_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "FY2024", cashAndInvestments: 36_563_000_000, totalDebt: 7_878_000_000, capitalExpenditures: 11_339_000_000, freeCashFlow: 3_584_000_000, researchAndDevelopment: 4_540_000_000, regulatoryCredits: 2_763_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "FY2025", cashAndInvestments: 44_059_000_000, totalDebt: 8_153_000_000, capitalExpenditures: 8_527_000_000, freeCashFlow: 6_220_000_000, researchAndDevelopment: 6_411_000_000, regulatoryCredits: 1_993_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "H1 2026", cashAndInvestments: 43_524_000_000, totalDebt: 9_061_000_000, capitalExpenditures: 8_282_000_000, freeCashFlow: 352_000_000, researchAndDevelopment: 4_317_000_000, regulatoryCredits: 526_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm" },
];

export const TESLA_LATEST_CAPITAL_ECONOMICS = TESLA_CAPITAL_ECONOMICS.at(-1)!;
export const TESLA_CAPITAL_NOTE = "Debt excludes finance leases. H1 2026 free cash flow is operating cash flow less capital expenditures; Tesla expects full-year 2026 capex above $20B.";
