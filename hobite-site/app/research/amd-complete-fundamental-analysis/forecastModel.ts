import { AMD_QUARTERLY } from "./quarterlyFinancials";
import { AMD_LATEST_PRICE } from "./valuationHistory";
export type Scenario = "bear" | "base" | "bull";
const balance = AMD_QUARTERLY.at(-1)!;
export const AMD_MODEL_INPUTS = {
  date: "2026-10-04",
  balanceDate: balance.end,
  cash: balance.cash! / 1e9,
  securities: balance.securities! / 1e9,
  debt: balance.debt! / 1e9,
  shares: balance.dilutedShares! / 1e9,
  investmentReserve: 5,
  revenue2026: 48,
  firstDiscountYears:
    (Date.parse("2027-12-25") - Date.parse("2026-10-04")) / (365.25 * 86400000),
  stubDiscountYears:
    (Date.parse("2026-12-26") - Date.parse("2026-10-04")) / (365.25 * 86400000),
};
export const AMD_ASSUMPTIONS = {
  bear: {
    revenue: [55, 60, 58, 62, 66, 70, 74, 78, 82, 86],
    margins: [0.17, 0.18, 0.13, 0.16, 0.17, 0.18, 0.18, 0.19, 0.19, 0.2],
    tax: 0.22,
    wacc: 0.12,
    growth: 0.02,
    warrantShares: 0,
    stubCash: 0.5,
  },
  base: {
    revenue: [70, 92, 115, 140, 165, 190, 215, 240, 265, 290],
    margins: [0.22, 0.25, 0.27, 0.29, 0.3, 0.3, 0.3, 0.3, 0.29, 0.28],
    tax: 0.2,
    wacc: 0.105,
    growth: 0.03,
    warrantShares: 0.16,
    stubCash: 1,
  },
  bull: {
    revenue: [85, 125, 170, 215, 260, 305, 350, 395, 440, 485],
    margins: [0.26, 0.3, 0.33, 0.35, 0.36, 0.36, 0.36, 0.35, 0.35, 0.34],
    tax: 0.18,
    wacc: 0.095,
    growth: 0.035,
    warrantShares: 0.32,
    stubCash: 1.5,
  },
} satisfies Record<
  Scenario,
  {
    revenue: number[];
    margins: number[];
    tax: number;
    wacc: number;
    growth: number;
    warrantShares: number;
    stubCash: number;
  }
>;
export function amdForecast(s: Scenario) {
  const a = AMD_ASSUMPTIONS[s];
  return a.revenue.map((revenue, i) => {
    const prior = i ? a.revenue[i - 1] : AMD_MODEL_INPUTS.revenue2026;
    const operatingIncome = revenue * a.margins[i];
    const nopat = operatingIncome * (1 - a.tax);
    const otherDa = revenue * 0.02;
    const acquiredAmortization = [2, 1.8, 1.5, 1.2, 0.9, 0.6, 0.3, 0, 0, 0][i];
    const capex = revenue * (i < 3 ? 0.05 : 0.04);
    const workingCapital = (revenue - prior) * 0.12;
    const fcff =
      nopat + otherDa + acquiredAmortization - capex - workingCapital;
    return {
      year: 2027 + i,
      revenue,
      growth: (revenue / prior - 1) * 100,
      margin: a.margins[i] * 100,
      operatingIncome,
      nopat,
      otherDa,
      acquiredAmortization,
      capex,
      workingCapital,
      fcff,
      fcffMargin: (fcff / revenue) * 100,
    };
  });
}
export const AMD_FORECASTS = {
  bear: amdForecast("bear"),
  base: amdForecast("base"),
  bull: amdForecast("bull"),
};
export function amdDcf(
  s: Scenario,
  wacc = AMD_ASSUMPTIONS[s].wacc,
  growth = AMD_ASSUMPTIONS[s].growth,
  terminalMargin = AMD_ASSUMPTIONS[s].margins[9],
  warrantShares = AMD_ASSUMPTIONS[s].warrantShares,
) {
  if (
    ![wacc, growth, terminalMargin, warrantShares].every(Number.isFinite) ||
    wacc <= growth ||
    wacc <= 0 ||
    growth < 0 ||
    terminalMargin < 0 ||
    terminalMargin > 1 ||
    warrantShares < 0 ||
    warrantShares > 0.32
  )
    throw new Error("Invalid DCF assumption");
  const a = AMD_ASSUMPTIONS[s],
    last = AMD_FORECASTS[s][9];
  const pvStub = a.stubCash / (1 + wacc) ** AMD_MODEL_INPUTS.stubDiscountYears;
  const pvCash = AMD_FORECASTS[s].reduce(
    (sum, r, i) =>
      sum + r.fcff / (1 + wacc) ** (AMD_MODEL_INPUTS.firstDiscountYears + i),
    0,
  );
  const terminalRevenue = last.revenue * (1 + growth);
  const terminalNetCapex = terminalRevenue * 0.02;
  const terminalWorkingCapital = last.revenue * growth * 0.12;
  const terminalCash =
    terminalRevenue * terminalMargin * (1 - a.tax) -
    terminalNetCapex -
    terminalWorkingCapital;
  const pvTerminal =
    terminalCash /
    (wacc - growth) /
    (1 + wacc) ** (AMD_MODEL_INPUTS.firstDiscountYears + 9);
  const enterpriseValue = pvStub + pvCash + pvTerminal;
  const exerciseProceeds = warrantShares * 0.01;
  const equityValue =
    enterpriseValue +
    AMD_MODEL_INPUTS.cash +
    AMD_MODEL_INPUTS.securities -
    AMD_MODEL_INPUTS.debt -
    AMD_MODEL_INPUTS.investmentReserve +
    exerciseProceeds;
  const shares = AMD_MODEL_INPUTS.shares + warrantShares;
  const valuePerShare = equityValue / shares;
  return {
    scenario: s,
    wacc,
    growth,
    pvStub,
    pvCash,
    pvTerminal,
    enterpriseValue,
    equityValue,
    exerciseProceeds,
    shares,
    warrantShares,
    valuePerShare,
    upside: (valuePerShare / AMD_LATEST_PRICE.close - 1) * 100,
    terminalWeight: (pvTerminal / enterpriseValue) * 100,
    terminalCash,
    terminalNetCapex,
    terminalWorkingCapital,
  };
}
export const AMD_DCF_CASES = {
  bear: amdDcf("bear"),
  base: amdDcf("base"),
  bull: amdDcf("bull"),
};
export const AMD_SENSITIVITY = [0.095, 0.105, 0.115].map((wacc) => ({
  wacc,
  values: [0.02, 0.03, 0.04].map((g) => amdDcf("base", wacc, g).valuePerShare),
}));
export const AMD_DILUTION_SENSITIVITY = [0, 0.16, 0.32].map((shares) => ({
  shares,
  value: amdDcf("base", 0.105, 0.03, 0.28, shares).valuePerShare,
}));
export const AMD_MARGIN_SENSITIVITY = [0.2, 0.25, 0.28, 0.35].map((margin) => ({
  margin,
  value: amdDcf("base", 0.105, 0.03, margin).valuePerShare,
}));
