import { QUARTERLY } from "./secData";
import { LATEST_PRICE } from "./valuationHistory";
export const CASES = {
  bear: {
    growth: [-0.02, 0.01],
    margin: [0.06, 0.07],
    discount: 0.13,
    terminal: 0.01,
  },
  base: {
    growth: [0.04, 0.03],
    margin: [0.1, 0.12],
    discount: 0.11,
    terminal: 0.025,
  },
  bull: {
    growth: [0.08, 0.05],
    margin: [0.13, 0.16],
    discount: 0.1,
    terminal: 0.03,
  },
} as const;
export type Scenario = keyof typeof CASES;
export const BASELINE = 10425; // FY2026 management revenue-range midpoint; future years are assumptions.
export const SHARES = QUARTERLY.at(-1)!.p.shares.value!; // Latest quarter weighted diluted shares, not a spot share count.
export function forecast(
  scenario: Scenario,
  horizon: 5 | 10 = 10,
  price: number = LATEST_PRICE.close,
  discount: number = CASES[scenario].discount,
  terminal: number = CASES[scenario].terminal,
) {
  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isFinite(discount) ||
    !Number.isFinite(terminal) ||
    discount <= terminal ||
    discount <= 0 ||
    terminal < 0
  )
    throw Error("Invalid valuation inputs");
  const c = CASES[scenario];
  let revenue = BASELINE;
  const rows = Array.from({ length: horizon }, (_, i) => {
    const year = i + 1;
    const growth = c.growth[i < 5 ? 0 : 1];
    revenue *= 1 + growth;
    const margin =
      c.margin[0] + (c.margin[1] - c.margin[0]) * Math.min(i / 4, 1);
    const cash = revenue * margin;
    return {
      fy: 2026 + year,
      year,
      growth,
      revenue,
      margin,
      cash,
      pv: cash / (1 + discount) ** year,
    };
  });
  const terminalValue =
    (rows.at(-1)!.cash * (1 + terminal)) / (discount - terminal);
  const terminalPv = terminalValue / (1 + discount) ** horizon;
  const cashPv = rows.reduce((s, r) => s + r.pv, 0);
  const equity = cashPv + terminalPv;
  // Illustrative distribution IRR: all annual owner cash paid out; no simultaneous buyback uplift.
  const npv = (rate: number) =>
    rows.reduce((s, r) => s + r.cash / SHARES / (1 + rate) ** r.year, -price) +
    terminalValue / SHARES / (1 + rate) ** horizon;
  let lo = -0.9,
    hi = 10;
  const bracketed = npv(lo) > 0 && npv(hi) < 0;
  for (let i = 0; i < 100 && bracketed; i++) {
    const mid = (lo + hi) / 2;
    if (npv(mid) > 0) lo = mid;
    else hi = mid;
  }
  return {
    rows,
    terminalValue,
    terminalPv,
    cashPv,
    equity,
    value: equity / SHARES,
    upside: equity / SHARES / price - 1,
    irr: bracketed ? (lo + hi) / 2 : null,
    terminalWeight: terminalPv / equity,
  };
}
