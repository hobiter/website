export type BerkshireOperatingEarnings = {
  period: string;
  periodType: "annual" | "quarter" | "year-to-date";
  insuranceUnderwriting: number;
  insuranceInvestmentIncome: number;
  bnsf: number;
  berkshireHathawayEnergy: number;
  manufacturingServiceRetailing: number;
  other: number;
  operatingEarnings: number;
  sourceUrl: string;
};

export const BERKSHIRE_OPERATING_EARNINGS_SOURCE_NOTE =
  "After-tax operating earnings are Berkshire's non-GAAP presentation excluding investment gains and losses, goodwill and intangible impairments, and other-than-temporary equity-method investment impairments. Annual rows come from the FY2025 Form 10-K and February 28, 2026 earnings release; 2026 rows come from the August 8, 2026 earnings release and June 30, 2026 Form 10-Q.";

export const BERKSHIRE_OPERATING_EARNINGS: BerkshireOperatingEarnings[] = [
  {
    period: "FY2023",
    periodType: "annual",
    insuranceUnderwriting: 5_428_000_000,
    insuranceInvestmentIncome: 9_567_000_000,
    bnsf: 5_087_000_000,
    berkshireHathawayEnergy: 2_331_000_000,
    manufacturingServiceRetailing: 13_362_000_000,
    other: 1_575_000_000,
    operatingEarnings: 37_350_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/2025ar/2025ar.pdf",
  },
  {
    period: "FY2024",
    periodType: "annual",
    insuranceUnderwriting: 9_020_000_000,
    insuranceInvestmentIncome: 13_670_000_000,
    bnsf: 5_031_000_000,
    berkshireHathawayEnergy: 3_730_000_000,
    manufacturingServiceRetailing: 13_072_000_000,
    other: 2_914_000_000,
    operatingEarnings: 47_437_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/2025ar/2025ar.pdf",
  },
  {
    period: "FY2025",
    periodType: "annual",
    insuranceUnderwriting: 7_258_000_000,
    insuranceInvestmentIncome: 12_513_000_000,
    bnsf: 5_476_000_000,
    berkshireHathawayEnergy: 3_979_000_000,
    manufacturingServiceRetailing: 13_647_000_000,
    other: 1_613_000_000,
    operatingEarnings: 44_486_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/news/feb2826.pdf",
  },
  {
    period: "Q2 2026",
    periodType: "quarter",
    insuranceUnderwriting: 1_731_000_000,
    insuranceInvestmentIncome: 3_059_000_000,
    bnsf: 1_558_000_000,
    berkshireHathawayEnergy: 891_000_000,
    manufacturingServiceRetailing: 4_470_000_000,
    other: 1_274_000_000,
    operatingEarnings: 12_983_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/news/aug0826.pdf",
  },
  {
    period: "H1 2026",
    periodType: "year-to-date",
    insuranceUnderwriting: 3_448_000_000,
    insuranceInvestmentIncome: 5_738_000_000,
    bnsf: 2_935_000_000,
    berkshireHathawayEnergy: 2_005_000_000,
    manufacturingServiceRetailing: 7_669_000_000,
    other: 2_534_000_000,
    operatingEarnings: 24_329_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/news/aug0826.pdf",
  },
];

export const BERKSHIRE_LATEST_OPERATING_EARNINGS = BERKSHIRE_OPERATING_EARNINGS.at(-1)!;

export const BERKSHIRE_H1_2026_GROWTH = {
  operatingEarnings: 17.0,
  underwriting: 3.6,
  insuranceInvestmentIncome: -8.3,
  bnsf: 9.5,
  berkshireHathawayEnergy: 11.5,
  manufacturingServiceRetailing: 15.1,
};
