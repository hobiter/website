export type BroadcomCapitalEconomics = {
  period: string;
  cash: number;
  totalDebt: number;
  netDebt: number;
  stockBasedCompensation: number | null;
  dividendsPaid: number;
  repurchases: number;
  goodwillAndIntangibles: number | null;
  sourceUrl: string;
};

export const BROADCOM_CAPITAL_ECONOMICS_NOTE =
  "Broadcom's acquisition model produces substantial debt, intangible amortization and stock compensation. Free cash flow is strong, but investors should evaluate it alongside dilution, dividends, repurchases and debt reduction.";

export const BROADCOM_CAPITAL_ECONOMICS: BroadcomCapitalEconomics[] = [
  { period: "FY2023", cash: 14_189_000_000, totalDebt: 37_650_000_000, netDebt: 23_461_000_000, stockBasedCompensation: 2_171_000_000, dividendsPaid: 7_645_000_000, repurchases: 5_824_000_000, goodwillAndIntangibles: 43_750_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/avgo-20231029.htm" },
  { period: "FY2024", cash: 9_348_000_000, totalDebt: 67_566_000_000, netDebt: 58_218_000_000, stockBasedCompensation: 5_670_000_000, dividendsPaid: 9_814_000_000, repurchases: 7_176_000_000, goodwillAndIntangibles: 138_456_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/avgo-20241103.htm" },
  { period: "FY2025", cash: 16_178_000_000, totalDebt: 65_136_000_000, netDebt: 48_958_000_000, stockBasedCompensation: 7_568_000_000, dividendsPaid: 11_142_000_000, repurchases: 2_450_000_000, goodwillAndIntangibles: 130_074_000_000, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/avgo-20251102.htm" },
  { period: "FY2026 Q3 YTD", cash: 23_975_000_000, totalDebt: 59_419_000_000, netDebt: 35_444_000_000, stockBasedCompensation: null, dividendsPaid: 9_281_000_000, repurchases: 8_450_000_000, goodwillAndIntangibles: null, sourceUrl: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial" },
];

export const BROADCOM_LATEST_CAPITAL_ECONOMICS = BROADCOM_CAPITAL_ECONOMICS.at(-1)!;
