export type BerkshireInsuranceEconomics = {
  period: string;
  insuranceFloat: number;
  insuranceUnderwritingEarnings: number | null;
  insuranceInvestmentIncome: number | null;
  cashAndTreasuryBills: number;
  equitySecurities: number;
  notesAndBorrowings: number | null;
  classAEquivalentShares: number | null;
  shareRepurchases: number | null;
  sourceUrl: string;
};

export const BERKSHIRE_INSURANCE_ECONOMICS_SOURCE_NOTE =
  "Float and operating-earnings figures are Berkshire non-GAAP disclosures. Cash and Treasury bills combine Insurance and Other cash, Railroad/Utilities/Energy cash, and short-term U.S. Treasury bills. Notes and borrowings combine Insurance and Other with Railroad, Utilities and Energy. Values are point-in-time and in USD.";

export const BERKSHIRE_INSURANCE_ECONOMICS: BerkshireInsuranceEconomics[] = [
  {
    period: "FY2023",
    insuranceFloat: 169_000_000_000,
    insuranceUnderwritingEarnings: 5_428_000_000,
    insuranceInvestmentIncome: 9_567_000_000,
    cashAndTreasuryBills: 167_600_000_000,
    equitySecurities: 353_842_000_000,
    notesAndBorrowings: 128_300_000_000,
    classAEquivalentShares: 1_441_483,
    shareRepurchases: 9_200_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/2023ar/2023ar.pdf",
  },
  {
    period: "FY2024",
    insuranceFloat: 171_000_000_000,
    insuranceUnderwritingEarnings: 9_020_000_000,
    insuranceInvestmentIncome: 13_670_000_000,
    cashAndTreasuryBills: 334_201_000_000,
    equitySecurities: 271_588_000_000,
    notesAndBorrowings: 124_762_000_000,
    classAEquivalentShares: 1_438_223,
    shareRepurchases: 2_900_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/2024ar/2024ar.pdf",
  },
  {
    period: "FY2025",
    insuranceFloat: 176_400_000_000,
    insuranceUnderwritingEarnings: 7_258_000_000,
    insuranceInvestmentIncome: 12_513_000_000,
    cashAndTreasuryBills: 373_311_000_000,
    equitySecurities: 297_778_000_000,
    notesAndBorrowings: 129_081_000_000,
    classAEquivalentShares: 1_438_223,
    shareRepurchases: 0,
    sourceUrl: "https://www.berkshirehathaway.com/2025ar/2025ar.pdf",
  },
  {
    period: "Q2 2026",
    insuranceFloat: 177_500_000_000,
    insuranceUnderwritingEarnings: 3_448_000_000,
    insuranceInvestmentIncome: 5_738_000_000,
    cashAndTreasuryBills: 365_514_000_000,
    equitySecurities: 323_779_000_000,
    notesAndBorrowings: 128_599_000_000,
    classAEquivalentShares: 1_431_693,
    shareRepurchases: 4_800_000_000,
    sourceUrl: "https://www.berkshirehathaway.com/qtrly/2ndqtr26.pdf",
  },
];

export const BERKSHIRE_LATEST_INSURANCE_ECONOMICS = BERKSHIRE_INSURANCE_ECONOMICS.at(-1)!;

export const BERKSHIRE_LATEST_LIQUIDITY = {
  insuranceAndOtherCash: 35_096_000_000,
  railroadUtilitiesEnergyCash: 5_513_000_000,
  shortTermTreasuryBills: 324_905_000_000,
  cashAndTreasuryBills: 365_514_000_000,
  equitySecurities: 323_779_000_000,
  sourceUrl: "https://www.berkshirehathaway.com/qtrly/2ndqtr26.pdf",
};
