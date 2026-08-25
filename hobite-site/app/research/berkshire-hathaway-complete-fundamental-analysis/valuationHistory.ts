export type BerkshireValuationHistory = {
  year: number;
  priceDate: string;
  classBPrice: number;
  classAEquivalentShares: number;
  marketCapitalization: number;
  shareholdersEquity: number;
  operatingEarnings: number;
  priceToBook: number;
  operatingEarningsMultiple: number;
  source: string;
};

export const BERKSHIRE_VALUATION_HISTORY_SOURCE_NOTE =
  "Year-end BRK.B prices are Yahoo Finance adjusted closes. Share counts, equity and operating earnings are from Berkshire annual reports and earnings releases. The 2026 row uses the August 24 price, June 30 equity/share count and annualized H1 operating earnings.";

const rows = [
  { year: 2022, priceDate: "2022-12-30", classBPrice: 308.9, classAEquivalentShares: 1_459_733, shareholdersEquity: 473_424_000_000, operatingEarnings: 30_793_000_000 },
  { year: 2023, priceDate: "2023-12-29", classBPrice: 356.66, classAEquivalentShares: 1_441_483, shareholdersEquity: 561_273_000_000, operatingEarnings: 37_350_000_000 },
  { year: 2024, priceDate: "2024-12-31", classBPrice: 453.28, classAEquivalentShares: 1_438_223, shareholdersEquity: 649_368_000_000, operatingEarnings: 47_437_000_000 },
  { year: 2025, priceDate: "2025-12-31", classBPrice: 502.65, classAEquivalentShares: 1_438_223, shareholdersEquity: 717_419_000_000, operatingEarnings: 44_486_000_000 },
  { year: 2026, priceDate: "2026-08-24", classBPrice: 504.32, classAEquivalentShares: 1_431_693, shareholdersEquity: 747_910_000_000, operatingEarnings: 48_658_000_000 },
];

export const BERKSHIRE_VALUATION_HISTORY: BerkshireValuationHistory[] = rows.map((row) => {
  const marketCapitalization = row.classBPrice * row.classAEquivalentShares * 1_500;
  return {
    ...row,
    marketCapitalization,
    priceToBook: marketCapitalization / row.shareholdersEquity,
    operatingEarningsMultiple: marketCapitalization / row.operatingEarnings,
    source: row.year === 2026 ? "Yahoo Finance and Berkshire Q2 2026 Form 10-Q" : "Yahoo Finance and Berkshire annual reports",
  };
});

export const BERKSHIRE_LATEST_VALUATION = BERKSHIRE_VALUATION_HISTORY.at(-1)!;
