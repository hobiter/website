import type { Company } from "./data";

export type Scenario = "bear" | "base" | "bull";
export const CASES: Scenario[] = ["bear", "base", "bull"];
export const CASE_INPUTS = {
  bear: { growth: -.08, margin: -.10, dilution: .025, multiple: .6 },
  base: { growth: 0, margin: 0, dilution: 0, multiple: 1 },
  bull: { growth: .05, margin: .04, dilution: -.01, multiple: 1.25 },
};

export function forecast(c: Company, scenario: Scenario, horizon: 5 | 10, price = c.price) {
  if (!c.modelAvailable) return null;
  if (!Number.isFinite(price) || price <= 0) throw new Error("Positive finite price required");
  const input = CASE_INPUTS[scenario];
  let revenue = c.quarterRevenueM * 4;
  let shares = c.capM / c.price;
  let funding = 0;
  const rows = Array.from({ length: horizon + 1 }, (_, i) => {
    const year = i + 1;
    const growth = Math.max(-.15, c.growth[i < 5 ? 0 : 1] + input.growth);
    revenue *= 1 + growth;
    const margin = c.cashMargin[0] + (c.cashMargin[1] - c.cashMargin[0]) * Math.min(1, i / 4) + input.margin;
    const ownerCash = revenue * margin;
    // Next-year cash determines exit value, but next-year issuance/funding is not incurred at exit.
    if (year <= horizon) {
      shares *= 1 + Math.max(0, c.dilution + input.dilution);
      funding = funding * 1.10 + Math.max(0, -ownerCash);
    }
    return { year, growth, revenue, margin, ownerCash, shares, funding };
  });
  const terminal = Math.max(0, rows[horizon].ownerCash) * c.multiple * input.multiple;
  const exitEquity = Math.max(0, terminal - funding);
  const exitPrice = exitEquity / shares;
  const cagr = Math.pow(exitPrice / price, 1 / horizon) - 1;
  const hurdle = c.size === "mid" ? .15 : .20;
  return { rows: rows.slice(0, horizon), terminal, funding, exitPrice, cagr, hurdle, hurdlePrice: exitPrice / Math.pow(1 + hurdle, horizon) };
}
