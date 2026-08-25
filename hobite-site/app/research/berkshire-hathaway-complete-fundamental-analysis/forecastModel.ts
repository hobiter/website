export type BerkshireScenario = "bear" | "base" | "bull";

export type BerkshireForecastRow = {
  year: number;
  operatingEarnings: number;
  growth: number;
};

export type BerkshireValuationCase = {
  label: string;
  normalizedOperatingEarnings: number;
  operatingEarningsMultiple: number;
  operatingEarningsValue: number;
  priceToBook: number;
  bookValue: number;
  bookValueEstimate: number;
  blendedEquityValue: number;
  valuePerClassBShare: number;
  upsideToReferencePrice: number;
};

export const BERKSHIRE_FORECAST_SOURCE_NOTE =
  "Hobite scenario model anchored to H1 2026 operating earnings annualized at $48.7B. Forecasts are assumptions, not Berkshire guidance. They model recurring after-tax operating earnings and intentionally exclude mark-to-market investment gains and losses.";

const scenarioInputs: Record<BerkshireScenario, { start: number; growth: number[] }> = {
  bear: { start: 46_000_000_000, growth: [0, 1, 1.5, 2, 2, 2, 2, 2, 2, 2] },
  base: { start: 49_000_000_000, growth: [0, 5, 5, 5, 4.5, 4.5, 4, 4, 3.5, 3.5] },
  bull: { start: 52_000_000_000, growth: [0, 7, 7, 7, 6.5, 6, 6, 5.5, 5, 5] },
};

function buildForecast(input: { start: number; growth: number[] }): BerkshireForecastRow[] {
  let earnings = input.start;
  return input.growth.map((growth, index) => {
    if (index > 0) earnings *= 1 + growth / 100;
    return { year: 2026 + index, operatingEarnings: Math.round(earnings), growth };
  });
}

export const BERKSHIRE_FORECASTS: Record<BerkshireScenario, BerkshireForecastRow[]> = {
  bear: buildForecast(scenarioInputs.bear),
  base: buildForecast(scenarioInputs.base),
  bull: buildForecast(scenarioInputs.bull),
};

export const BERKSHIRE_VALUATION_INPUTS = {
  referencePrice: 504.32,
  referencePriceDate: "2026-08-24",
  classAEquivalentShares: 1_431_693,
  classBEquivalentShares: 1_431_693 * 1_500,
  latestBookValue: 747_910_000_000,
  latestBookValueDate: "2026-06-30",
  note: "One Class A share is economically equivalent to 1,500 Class B shares. The market-price snapshot is used for context, not as a live quote.",
};

const valuationInputs: Record<BerkshireScenario, Omit<BerkshireValuationCase, "operatingEarningsValue" | "bookValueEstimate" | "blendedEquityValue" | "valuePerClassBShare" | "upsideToReferencePrice">> = {
  bear: { label: "Bear", normalizedOperatingEarnings: 46_000_000_000, operatingEarningsMultiple: 18, priceToBook: 1.2, bookValue: BERKSHIRE_VALUATION_INPUTS.latestBookValue },
  base: { label: "Base", normalizedOperatingEarnings: 50_000_000_000, operatingEarningsMultiple: 22, priceToBook: 1.5, bookValue: BERKSHIRE_VALUATION_INPUTS.latestBookValue },
  bull: { label: "Bull", normalizedOperatingEarnings: 55_000_000_000, operatingEarningsMultiple: 25, priceToBook: 1.75, bookValue: BERKSHIRE_VALUATION_INPUTS.latestBookValue },
};

function valueCase(input: (typeof valuationInputs)[BerkshireScenario]): BerkshireValuationCase {
  const operatingEarningsValue = input.normalizedOperatingEarnings * input.operatingEarningsMultiple;
  const bookValueEstimate = input.bookValue * input.priceToBook;
  const blendedEquityValue = (operatingEarningsValue + bookValueEstimate) / 2;
  const valuePerClassBShare = blendedEquityValue / BERKSHIRE_VALUATION_INPUTS.classBEquivalentShares;
  return {
    ...input,
    operatingEarningsValue,
    bookValueEstimate,
    blendedEquityValue,
    valuePerClassBShare,
    upsideToReferencePrice: (valuePerClassBShare / BERKSHIRE_VALUATION_INPUTS.referencePrice - 1) * 100,
  };
}

export const BERKSHIRE_VALUATION_CASES: Record<BerkshireScenario, BerkshireValuationCase> = {
  bear: valueCase(valuationInputs.bear),
  base: valueCase(valuationInputs.base),
  bull: valueCase(valuationInputs.bull),
};

export const BERKSHIRE_VALUATION_NOTE =
  "The primary valuation averages an operating-earnings capitalization and a price-to-book cross-check. It is intentionally transparent: book value captures the investment portfolio and owned businesses, while recurring operating earnings reduces dependence on volatile GAAP investment gains. It is not a sum-of-the-parts appraisal or investment advice.";
