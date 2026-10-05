import { MU_RELEASE } from "./operatingMetrics";
import { MU_LATEST_PRICE } from "./valuationHistory";

export type Scenario = "bear" | "base" | "bull";
export const MU_MODEL_INPUTS = {
  date: "2026-10-04",
  balanceDate: MU_RELEASE.end,
  cash: MU_RELEASE.annual.cash / 1000,
  securities: MU_RELEASE.annual.securities / 1000,
  debt:
    (MU_RELEASE.annual.debtCurrent + MU_RELEASE.annual.debtNoncurrent) / 1000,
  contractReserve: MU_RELEASE.annual.noncurrentContractLiabilities / 1000,
  shares: MU_RELEASE.quarter.dilutedShares / 1000,
  firstDiscountYears:
    (Date.parse("2027-09-02") - Date.parse("2026-10-04")) / (365.25 * 86400000),
};
export const MU_ASSUMPTIONS = {
  bear: {
    revenue: [205, 215, 155, 150, 160, 175, 185, 195, 205, 215],
    margins: [0.65, 0.55, 0.2, 0.14, 0.22, 0.25, 0.24, 0.23, 0.22, 0.22],
    capex: [48, 50, 43, 38, 37, 40, 42, 44, 46, 48],
    da: [13, 17, 20, 22, 24, 26, 28, 30, 32, 34],
    tax: 0.22,
    workingCapital: 0.1,
    wacc: 0.12,
    growth: 0.02,
  },
  base: {
    revenue: [245, 280, 225, 210, 240, 270, 305, 330, 360, 390],
    margins: [0.76, 0.7, 0.48, 0.4, 0.48, 0.5, 0.48, 0.47, 0.45, 0.44],
    capex: [48, 56, 54, 50, 55, 61, 68, 73, 79, 85],
    da: [13, 18, 24, 29, 34, 39, 44, 49, 54, 59],
    tax: 0.2,
    workingCapital: 0.1,
    wacc: 0.105,
    growth: 0.03,
  },
  bull: {
    revenue: [285, 345, 355, 350, 395, 450, 510, 565, 620, 680],
    margins: [0.8, 0.78, 0.66, 0.6, 0.65, 0.65, 0.63, 0.61, 0.59, 0.58],
    capex: [50, 65, 70, 72, 78, 88, 99, 109, 120, 131],
    da: [14, 20, 28, 36, 44, 52, 61, 71, 81, 92],
    tax: 0.18,
    workingCapital: 0.1,
    wacc: 0.095,
    growth: 0.035,
  },
} satisfies Record<
  Scenario,
  {
    revenue: number[];
    margins: number[];
    capex: number[];
    da: number[];
    tax: number;
    workingCapital: number;
    wacc: number;
    growth: number;
  }
>;

export function micronForecast(s: Scenario) {
  const a = MU_ASSUMPTIONS[s];
  return a.revenue.map((revenue, i) => {
    const prior = i ? a.revenue[i - 1] : MU_RELEASE.annual.revenue / 1000;
    const operatingIncome = revenue * a.margins[i];
    const nopat = operatingIncome * (1 - a.tax);
    const workingCapital = (revenue - prior) * a.workingCapital;
    // Finance leases are debt: fund new leased assets here, not debt principal.
    const leasedAssets = revenue * 0.002;
    const fcff = nopat + a.da[i] - a.capex[i] - workingCapital - leasedAssets;
    return {
      year: 2027 + i,
      revenue,
      growth: (revenue / prior - 1) * 100,
      operatingIncome,
      margin: a.margins[i] * 100,
      nopat,
      depreciation: a.da[i],
      capex: a.capex[i],
      workingCapital,
      leasedAssets,
      fcff,
      fcffMargin: (fcff / revenue) * 100,
    };
  });
}
export const MU_FORECASTS = {
  bear: micronForecast("bear"),
  base: micronForecast("base"),
  bull: micronForecast("bull"),
};
export function micronDcf(
  s: Scenario,
  wacc = MU_ASSUMPTIONS[s].wacc,
  growth = MU_ASSUMPTIONS[s].growth,
  terminalMargin = MU_ASSUMPTIONS[s].margins[9],
) {
  if (
    !Number.isFinite(wacc) ||
    !Number.isFinite(growth) ||
    wacc <= growth ||
    wacc <= 0 ||
    growth < 0 ||
    terminalMargin < 0 ||
    terminalMargin > 1
  )
    throw new Error("Invalid discount, growth or margin assumption");
  const rows = MU_FORECASTS[s],
    a = MU_ASSUMPTIONS[s],
    last = rows[9];
  const pvCash = rows.reduce(
    (sum, r, i) =>
      sum + r.fcff / (1 + wacc) ** (MU_MODEL_INPUTS.firstDiscountYears + i),
    0,
  );
  const terminalRevenue = last.revenue * (1 + growth);
  const terminalNetCapex = (last.capex - last.depreciation) * (1 + growth);
  const terminalWorkingCapital = last.revenue * growth * a.workingCapital;
  const terminalCash =
    terminalRevenue * terminalMargin * (1 - a.tax) -
    terminalNetCapex -
    terminalWorkingCapital -
    terminalRevenue * 0.002;
  const pvTerminal =
    terminalCash /
    (wacc - growth) /
    (1 + wacc) ** (MU_MODEL_INPUTS.firstDiscountYears + 9);
  const enterpriseValue = pvCash + pvTerminal;
  const equityValue =
    enterpriseValue +
    MU_MODEL_INPUTS.cash +
    MU_MODEL_INPUTS.securities -
    MU_MODEL_INPUTS.debt -
    MU_MODEL_INPUTS.contractReserve;
  const valuePerShare = equityValue / MU_MODEL_INPUTS.shares;
  return {
    scenario: s,
    wacc,
    growth,
    pvCash,
    pvTerminal,
    enterpriseValue,
    equityValue,
    valuePerShare,
    upside: (valuePerShare / MU_LATEST_PRICE.close - 1) * 100,
    terminalWeight: (pvTerminal / enterpriseValue) * 100,
    terminalCash,
    terminalNetCapex,
    terminalWorkingCapital,
  };
}
export const MU_DCF_CASES = {
  bear: micronDcf("bear"),
  base: micronDcf("base"),
  bull: micronDcf("bull"),
};
export const MU_SENSITIVITY = [0.095, 0.105, 0.115].map((wacc) => ({
  wacc,
  values: [0.02, 0.03, 0.04].map(
    (g) => micronDcf("base", wacc, g).valuePerShare,
  ),
}));
export const MU_MARGIN_SENSITIVITY = [0.25, 0.35, 0.44, 0.55].map((margin) => ({
  margin,
  value: micronDcf("base", 0.105, 0.03, margin).valuePerShare,
}));
