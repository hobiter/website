import { QUARTERLY } from "./secData";
const last = QUARTERLY[QUARTERLY.length - 1];
const v = (k: string) => last.p[k].value ?? 0;
export const BRIDGE = {
  date: "2026-06-30",
  cash: v("cash"),
  securities: v("investmentsCurrent") + v("investmentsNoncurrent"),
  debtCarrying: v("borrowings") + v("convertible"),
  financeLeaseNoncurrent: v("financeLeaseNoncurrent"),
  currentLeaseReserve: 1,
  shares: v("commonShares") + v("preferredShares"),
};
export type Scenario = {
  growth: number;
  laterGrowth: number;
  firstCoreMargin: number;
  coreMargin: number;
  neutronPrice: number;
  neutronMargin: number;
  neutronMissions: number[];
  capex: number;
  matureCapex: number;
  da: number;
  workingCapital: number;
  discount: number;
  terminalGrowth: number;
  dilution: number;
};
export const BASELINE = {
  year: 2026,
  revenue: 950,
  h1Revenue: 434.414,
  h2Fcff: -200,
};
export const CASES: Record<"bear" | "base" | "bull", Scenario> = {
  bear: {
    growth: 0.15,
    laterGrowth: 0.08,
    firstCoreMargin: -0.1,
    coreMargin: 0.12,
    neutronPrice: 50,
    neutronMargin: 0.15,
    neutronMissions: [0, 1, 2, 3, 4, 6, 8, 10, 12, 14],
    capex: 0.2,
    matureCapex: 0.1,
    da: 0.06,
    workingCapital: 0.15,
    discount: 0.16,
    terminalGrowth: 0.02,
    dilution: 0.035,
  },
  base: {
    growth: 0.25,
    laterGrowth: 0.12,
    firstCoreMargin: -0.02,
    coreMargin: 0.2,
    neutronPrice: 60,
    neutronMargin: 0.25,
    neutronMissions: [1, 3, 6, 10, 14, 18, 22, 26, 30, 34],
    capex: 0.16,
    matureCapex: 0.07,
    da: 0.06,
    workingCapital: 0.1,
    discount: 0.13,
    terminalGrowth: 0.025,
    dilution: 0.02,
  },
  bull: {
    growth: 0.35,
    laterGrowth: 0.15,
    firstCoreMargin: 0.04,
    coreMargin: 0.25,
    neutronPrice: 70,
    neutronMargin: 0.3,
    neutronMissions: [2, 6, 12, 20, 30, 40, 50, 60, 70, 80],
    capex: 0.14,
    matureCapex: 0.06,
    da: 0.06,
    workingCapital: 0.08,
    discount: 0.11,
    terminalGrowth: 0.03,
    dilution: 0.01,
  },
};
export function forecast(s: Scenario, horizon: 5 | 10 = 10) {
  if (
    ![5, 10].includes(horizon) ||
    Object.entries(s).some(
      ([k, x]) => k !== "neutronMissions" && !Number.isFinite(x),
    ) ||
    s.neutronMissions.length !== 10 ||
    s.neutronMissions.some((x) => !Number.isInteger(x) || x < 0) ||
    s.discount <= s.terminalGrowth ||
    s.terminalGrowth < 0 ||
    s.terminalGrowth > 0.08 ||
    s.discount <= 0 ||
    s.discount > 0.4 ||
    s.growth < 0 ||
    s.growth > 1 ||
    s.laterGrowth < 0 ||
    s.laterGrowth > 1 ||
    s.dilution < 0 ||
    s.dilution > 0.2 ||
    s.neutronPrice <= 0 ||
    s.neutronPrice > 200 ||
    s.capex < 0 ||
    s.matureCapex < s.da ||
    s.matureCapex > 0.5 ||
    s.da < 0 ||
    s.workingCapital < 0 ||
    s.coreMargin > 0.6 ||
    s.coreMargin < -0.6 ||
    s.firstCoreMargin > 0.6 ||
    s.firstCoreMargin < -0.6 ||
    s.neutronMargin > 0.6 ||
    s.neutronMargin < -0.6
  )
    throw Error("Invalid scenario assumptions");
  let core = BASELINE.revenue,
    priorRevenue = core;
  const rows = [];
  for (let year = 1; year <= horizon; year++) {
    core *= 1 + (year <= 5 ? s.growth : s.laterGrowth);
    const ramp = Math.min((year - 1) / 4, 1);
    const neutron = s.neutronMissions[year - 1] * s.neutronPrice;
    const revenue = core + neutron;
    const coreMargin =
      s.firstCoreMargin + ramp * (s.coreMargin - s.firstCoreMargin);
    const neutronMargin = -0.5 + ramp * (s.neutronMargin + 0.5);
    const ebit = core * coreMargin + neutron * neutronMargin;
    const tax = Math.max(0, ebit) * 0.25;
    const depreciation = revenue * s.da;
    const capexRate = s.capex + ramp * (s.matureCapex - s.capex);
    const capex = revenue * capexRate;
    const workingCapital = (revenue - priorRevenue) * s.workingCapital;
    // GAAP operating margins retain SBC as an expense; no free SBC addback.
    const fcff = ebit - tax + depreciation - capex - workingCapital;
    const t = year + 0.5;
    rows.push({
      year: BASELINE.year + year,
      core,
      missions: s.neutronMissions[year - 1],
      neutron,
      revenue,
      coreMargin,
      neutronMargin,
      ebit,
      tax,
      depreciation,
      capex,
      workingCapital,
      fcff,
      fcfMargin: fcff / revenue,
      t,
      pv: fcff / (1 + s.discount) ** t,
    });
    priorRevenue = revenue;
  }
  const last = rows[rows.length - 1];
  const nextRevenue = last.revenue * (1 + s.terminalGrowth);
  const stableMargin =
    (last.core * s.coreMargin + last.neutron * s.neutronMargin) / last.revenue;
  const terminalFcff =
    nextRevenue * stableMargin * 0.75 +
    nextRevenue * s.da -
    nextRevenue * s.matureCapex -
    (nextRevenue - last.revenue) * s.workingCapital;
  const terminalValue = terminalFcff / (s.discount - s.terminalGrowth);
  const terminalPV = terminalValue / (1 + s.discount) ** (horizon + 0.5);
  const stubPV = BASELINE.h2Fcff / (1 + s.discount) ** 0.5;
  const pvFlows = rows.reduce((sum, r) => sum + r.pv, 0) + stubPV;
  const enterprise = pvFlows + terminalPV;
  const rawEquity =
    enterprise +
    BRIDGE.cash +
    BRIDGE.securities -
    BRIDGE.debtCarrying -
    BRIDGE.financeLeaseNoncurrent -
    BRIDGE.currentLeaseReserve;
  const equity = Math.max(0, rawEquity);
  const dilutedShares = BRIDGE.shares * (1 + s.dilution) ** (horizon + 0.5);
  return {
    rows,
    terminalFcff,
    terminalValue,
    terminalPV,
    stubPV,
    pvFlows,
    enterprise,
    rawEquity,
    equity,
    dilutedShares,
    valuePerShare: equity / dilutedShares,
    negativeCashNeeds:
      Math.max(0, -BASELINE.h2Fcff) +
      rows.reduce((n, r) => n + Math.max(0, -r.fcff), 0),
    terminalShare: enterprise > 0 ? terminalPV / enterprise : null,
  };
}
