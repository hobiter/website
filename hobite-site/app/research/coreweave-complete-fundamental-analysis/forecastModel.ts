import { QUARTERLY } from "./secData";
import { DISCLOSURES } from "./operatingMetrics";
import { LATEST_PRICE } from "./valuationHistory";
export const CASES = {
  bear: {
    growth: [0.15, 0.05],
    operatingMargin: [0, 0.15],
    capitalSales: [3, 2],
    da: 0.4,
    wc: 0.05,
    tax: 0.25,
    discount: 0.17,
    terminal: 0.015,
    dilution: 0.04,
  },
  base: {
    growth: [0.35, 0.1],
    operatingMargin: [0.08, 0.25],
    capitalSales: [2.5, 1.5],
    da: 0.35,
    wc: 0.04,
    tax: 0.25,
    discount: 0.14,
    terminal: 0.025,
    dilution: 0.025,
  },
  bull: {
    growth: [0.5, 0.15],
    operatingMargin: [0.12, 0.3],
    capitalSales: [2, 0.8],
    da: 0.35,
    wc: 0.03,
    tax: 0.25,
    discount: 0.12,
    terminal: 0.03,
    dilution: 0.015,
  },
} as const;
export type Scenario = keyof typeof CASES;
const latest = QUARTERLY.at(-1)!;
export const BASELINE = 12800;
export const SHARES =
  DISCLOSURES.julyShares.classA + DISCLOSURES.julyShares.classB;
export const BRIDGE = {
  reference: "2026-06-30 + September issuance pro forma",
  reportedDebt: latest.p.debtPrincipal.value!,
  newNotes: DISCLOSURES.september.principal,
  debt: latest.p.debtPrincipal.value! + DISCLOSURES.september.principal,
  financeLease: latest.p.financeLease.value!,
  oldCash: latest.p.cash.value!,
  newNetCash:
    DISCLOSURES.september.netBeforeExpenses -
    DISCLOSURES.september.cappedCallCost,
  cash:
    latest.p.cash.value! +
    DISCLOSURES.september.netBeforeExpenses -
    DISCLOSURES.september.cappedCallCost,
  restricted:
    latest.p.restrictedCurrent.value! + latest.p.restrictedNoncurrent.value!,
};
export function forecast(
  scenario: Scenario,
  horizon: 5 | 10 = 10,
  price: number = LATEST_PRICE.close,
  discount: number = CASES[scenario].discount,
  terminal: number = CASES[scenario].terminal,
  cash: number = BRIDGE.cash,
  extraCapex: number = 0,
  dilution: number = CASES[scenario].dilution,
) {
  if (
    ![price, discount, terminal, cash, extraCapex, dilution].every(
      Number.isFinite,
    ) ||
    price <= 0 ||
    discount <= terminal ||
    terminal < 0 ||
    cash < 0 ||
    extraCapex < 0 ||
    dilution < 0 ||
    discount <= 0
  )
    throw Error("Invalid valuation inputs");
  const c = CASES[scenario];
  // June-anchored H2 bridge avoids omitting the large unreported deployment spend.
  const stubRevenue = BASELINE - DISCLOSURES.h1Revenue;
  const stubEbit = stubRevenue * 0.04,
    stubTax = Math.max(0, stubEbit) * 0.25,
    stubDa = stubRevenue * 0.45;
  const stubCapex = 37000 - DISCLOSURES.h1IssuerCapex;
  const stubWc = Math.max(0, stubRevenue - DISCLOSURES.h1Revenue) * c.wc;
  const stubCash = stubEbit - stubTax + stubDa - stubCapex - stubWc;
  const stubPv = stubCash / (1 + discount) ** 0.5;
  let revenue = BASELINE;
  const rows = Array.from({ length: horizon }, (_, i) => {
    const year = i + 1,
      growth = c.growth[i < 5 ? 0 : 1],
      old = revenue;
    revenue *= 1 + growth;
    const phase = Math.min(i / 4, 1);
    const margin =
      c.operatingMargin[0] +
      (c.operatingMargin[1] - c.operatingMargin[0]) * phase;
    const capitalSales =
      c.capitalSales[0] + (c.capitalSales[1] - c.capitalSales[0]) * phase;
    const ebit = revenue * margin,
      tax = Math.max(0, ebit) * c.tax,
      da = revenue * c.da,
      netInvestment = (revenue - old) * capitalSales,
      capex = da + netInvestment + extraCapex * revenue,
      wc = (revenue - old) * c.wc,
      fcff = ebit - tax + da - capex - wc,
      time = year + 0.5;
    return {
      fy: 2026 + year,
      year,
      time,
      growth,
      revenue,
      margin,
      ebit,
      tax,
      da,
      capitalSales,
      capex,
      wc,
      fcff,
      pv: fcff / (1 + discount) ** time,
      shares: SHARES * (1 + dilution) ** year,
    };
  });
  const last = rows.at(-1)!,
    nextRevenue = last.revenue * (1 + terminal);
  const terminalCash =
    nextRevenue * c.operatingMargin[1] * (1 - c.tax) -
    (nextRevenue - last.revenue) * (c.capitalSales[1] + c.wc) -
    nextRevenue * extraCapex;
  const terminalValue = terminalCash / (discount - terminal),
    terminalPv = terminalValue / (1 + discount) ** last.time;
  const flowPv = stubPv + rows.reduce((s, r) => s + r.pv, 0),
    enterprise = flowPv + terminalPv;
  const rawEquity = enterprise - BRIDGE.debt - BRIDGE.financeLease + cash;
  const equity = Math.max(0, rawEquity),
    value = equity / last.shares;
  return {
    rows,
    stub: {
      revenue: stubRevenue,
      ebit: stubEbit,
      tax: stubTax,
      da: stubDa,
      capex: stubCapex,
      wc: stubWc,
      fcff: stubCash,
      pv: stubPv,
    },
    terminalCash,
    terminalValue,
    terminalPv,
    flowPv,
    enterprise,
    rawEquity,
    equity,
    shares: last.shares,
    value,
    upside: value / price - 1,
    terminalShare: enterprise > 0 ? terminalPv / enterprise : null,
    negativeFunding:
      Math.max(0, -stubCash) +
      rows.reduce((s, r) => s + Math.max(0, -r.fcff), 0),
  };
}
