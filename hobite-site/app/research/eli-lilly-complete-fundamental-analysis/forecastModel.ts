import { LLY_QUARTERLY } from "./quarterlyFinancials";
import { LLY_LATEST_PRICE } from "./valuationHistory";
export type Scenario = "bear" | "base" | "bull";
const balance = LLY_QUARTERLY.at(-1)!;
export const LLY_MODEL_INPUTS = {
  date: "2026-10-04",
  balanceDate: balance.end,
  cash: balance.cash! / 1e9,
  debt: balance.debt! / 1e9,
  shares: balance.dilutedShares! / 1e9,
  revenue2026: 86,
  firstDiscountYears:
    (Date.parse("2027-12-31") - Date.parse("2026-10-04")) / (365.25 * 86400000),
  stubDiscountYears:
    (Date.parse("2026-12-31") - Date.parse("2026-10-04")) / (365.25 * 86400000),
  daRate: 0.025,
  terminalCapexRate: 0.045,
  workingCapitalRate: 0.18,
  pipelineCashRate: 0.05,
};
export const LLY_ASSUMPTIONS = {
  bear: {
    revenue: [88, 92, 98, 100, 96, 90, 86, 85, 86, 88],
    margins: [0.38, 0.37, 0.36, 0.34, 0.32, 0.3, 0.29, 0.28, 0.28, 0.28],
    tax: 0.22,
    wacc: 0.11,
    growth: 0.015,
    stubCash: 5,
  },
  base: {
    revenue: [100, 113, 126, 138, 150, 161, 170, 179, 187, 195],
    margins: [0.45, 0.46, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.4, 0.4],
    tax: 0.2,
    wacc: 0.09,
    growth: 0.025,
    stubCash: 7,
  },
  bull: {
    revenue: [110, 132, 156, 181, 205, 227, 247, 264, 279, 294],
    margins: [0.48, 0.49, 0.49, 0.49, 0.48, 0.47, 0.46, 0.45, 0.44, 0.44],
    tax: 0.18,
    wacc: 0.085,
    growth: 0.03,
    stubCash: 9,
  },
} satisfies Record<
  Scenario,
  {
    revenue: number[];
    margins: number[];
    tax: number;
    wacc: number;
    growth: number;
    stubCash: number;
  }
>;
export function llyForecast(s: Scenario) {
  const a = LLY_ASSUMPTIONS[s],
    m = LLY_MODEL_INPUTS;
  return a.revenue.map((revenue, i) => {
    const prior = i ? a.revenue[i - 1] : m.revenue2026;
    // Normalized operating profit excludes acquired IPR&D; replace with cash reserve once.
    const operatingIncome = revenue * a.margins[i],
      nopat = operatingIncome * (1 - a.tax);
    const depreciation = revenue * m.daRate,
      capex = revenue * (i < 3 ? 0.1 : i < 6 ? 0.07 : 0.045);
    const workingCapital = (revenue - prior) * m.workingCapitalRate,
      pipelineCash = revenue * m.pipelineCashRate;
    const fcff = nopat + depreciation - capex - workingCapital - pipelineCash;
    return {
      year: 2027 + i,
      revenue,
      growth: (revenue / prior - 1) * 100,
      margin: a.margins[i] * 100,
      operatingIncome,
      nopat,
      depreciation,
      capex,
      workingCapital,
      pipelineCash,
      fcff,
      fcffMargin: (fcff / revenue) * 100,
    };
  });
}
export const LLY_FORECASTS = {
  bear: llyForecast("bear"),
  base: llyForecast("base"),
  bull: llyForecast("bull"),
};
export function llyDcf(
  s: Scenario,
  wacc = LLY_ASSUMPTIONS[s].wacc,
  growth = LLY_ASSUMPTIONS[s].growth,
  terminalMargin = LLY_ASSUMPTIONS[s].margins[9],
  extraShares = 0,
  pipelineRate = LLY_MODEL_INPUTS.pipelineCashRate,
) {
  if (
    ![wacc, growth, terminalMargin, extraShares, pipelineRate].every(
      Number.isFinite,
    ) ||
    wacc <= growth ||
    wacc <= 0 ||
    growth < 0 ||
    terminalMargin < 0 ||
    terminalMargin > 1 ||
    extraShares < 0 ||
    extraShares > 0.1 ||
    pipelineRate < 0 ||
    pipelineRate > 0.2
  )
    throw new Error("Invalid DCF assumption");
  const a = LLY_ASSUMPTIONS[s],
    m = LLY_MODEL_INPUTS,
    last = LLY_FORECASTS[s][9];
  const pvStub = a.stubCash / (1 + wacc) ** m.stubDiscountYears;
  const pvCash = LLY_FORECASTS[s].reduce(
    (sum, r, i) =>
      sum +
      (r.fcff + r.pipelineCash - r.revenue * pipelineRate) /
        (1 + wacc) ** (m.firstDiscountYears + i),
    0,
  );
  const terminalRevenue = last.revenue * (1 + growth),
    terminalNetCapex = terminalRevenue * (m.terminalCapexRate - m.daRate);
  const terminalWorkingCapital = last.revenue * growth * m.workingCapitalRate,
    terminalPipelineCash = terminalRevenue * pipelineRate;
  const terminalCash =
    terminalRevenue * terminalMargin * (1 - a.tax) -
    terminalNetCapex -
    terminalWorkingCapital -
    terminalPipelineCash;
  const pvTerminal =
    terminalCash / (wacc - growth) / (1 + wacc) ** (m.firstDiscountYears + 9);
  const enterpriseValue = pvStub + pvCash + pvTerminal,
    equityValue = enterpriseValue + m.cash - m.debt;
  const shares = m.shares + extraShares,
    valuePerShare = equityValue / shares;
  return {
    scenario: s,
    wacc,
    growth,
    pvStub,
    pvCash,
    pvTerminal,
    enterpriseValue,
    equityValue,
    shares,
    extraShares,
    valuePerShare,
    upside: (valuePerShare / LLY_LATEST_PRICE.close - 1) * 100,
    terminalWeight: (pvTerminal / enterpriseValue) * 100,
    terminalCash,
    terminalNetCapex,
    terminalWorkingCapital,
    terminalPipelineCash,
  };
}
export const LLY_DCF_CASES = {
  bear: llyDcf("bear"),
  base: llyDcf("base"),
  bull: llyDcf("bull"),
};
export const LLY_SENSITIVITY = [0.08, 0.09, 0.1].map((wacc) => ({
  wacc,
  values: [0.015, 0.025, 0.035].map(
    (g) => llyDcf("base", wacc, g).valuePerShare,
  ),
}));
export const LLY_PIPELINE_SENSITIVITY = [0.03, 0.05, 0.07].map((rate) => ({
  rate,
  value: llyDcf("base", 0.09, 0.025, 0.4, 0, rate).valuePerShare,
}));
export const LLY_DILUTION_SENSITIVITY = [0, 0.01, 0.03].map((shares) => ({
  shares,
  value: llyDcf("base", 0.09, 0.025, 0.4, shares).valuePerShare,
}));
