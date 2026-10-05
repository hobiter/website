import { COMPANIES, type Company } from "./investmentData";

export type Scenario = "bear" | "base" | "bull";
export const CASES: Scenario[] = ["bear", "base", "bull"];
export const CASE_INPUTS = {
  bear: { growthShift: -.055, marginShift: -.09, capexShift: .035, multipleScale: .65, terminalRetention: .65 },
  base: { growthShift: 0, marginShift: 0, capexShift: 0, multipleScale: 1, terminalRetention: 1 },
  bull: { growthShift: .04, marginShift: .025, capexShift: -.01, multipleScale: 1.15, terminalRetention: 1 },
} as const;
const lerp = (start: number, end: number, year: number) => start + (end - start) * Math.min(1, (year - 1) / 9);

export function project(company: Company, scenario: Scenario, years = 20) {
  const input = CASE_INPUTS[scenario];
  let revenue = company.revenue;
  return Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    const growth = Math.max(-.10, company.growth[i < 5 ? 0 : i < 10 ? 1 : 2] + input.growthShift);
    const previousRevenue = revenue;
    revenue *= 1 + growth;
    const margin = Math.max(.02, lerp(...company.margin, year) + input.marginShift);
    const ebit = revenue * margin;
    // EBIT includes recurring stock compensation. It is not added back to owner cash flow.
    const interest = company.interest * Math.pow(1.02, i);
    const tax = Math.max(0, ebit - interest) * company.tax;
    const netIncome = ebit - interest - tax;
    const depreciation = revenue * lerp(...company.da, year);
    const capex = revenue * Math.max(0, lerp(...company.capex, year) + input.capexShift);
    const workingCapital = (revenue - previousRevenue) * company.workingCapital;
    const preferred = company.preferred;
    const ownerCash = netIncome + depreciation - capex - workingCapital - preferred;
    return { year, growth, revenue, margin, ebit, interest, tax, netIncome, depreciation, capex, workingCapital, preferred, ownerCash };
  });
}

export function presentValue(cash: number[], rate: number) {
  return cash.reduce((sum, value, i) => sum + value / Math.pow(1 + rate, i + 1), 0);
}

// The ranking model has one initial outflow; later funding deficits are financed at 8% to maturity.
export function irr(initial: number, cash: number[]): number | null {
  if (!(initial > 0) || cash.some((x) => x < 0) || !cash.some((x) => x > 0)) return null;
  let low = -.999, high = 10;
  if (presentValue(cash, high) > initial) return null;
  for (let i = 0; i < 180; i++) {
    const mid = (low + high) / 2;
    if (presentValue(cash, mid) > initial) low = mid; else high = mid;
  }
  return (low + high) / 2;
}

export function valuation(company: Company, scenario: Scenario, horizon: 10 | 20, price = company.price, hurdle = .12) {
  const rows = project(company, scenario, horizon + 1);
  const input = CASE_INPUTS[scenario];
  const terminal = Math.max(0, rows[horizon].ownerCash) * company.terminalMultiple * input.multipleScale * input.terminalRetention;
  const funding = rows.slice(0, horizon).reduce((sum, row) => sum + Math.max(0, -row.ownerCash) * Math.pow(1.08, horizon - row.year), 0);
  const cash = rows.slice(0, horizon).map((row) => Math.max(0, row.ownerCash));
  cash[horizon - 1] += Math.max(0, terminal - funding);
  const shares = company.equityValue / company.price;
  const equity = shares * price;
  const value = presentValue(cash, hurdle);
  return { rows: rows.slice(0, horizon), terminal, funding, cash, irr: irr(equity, cash), value, entryPrice: value / shares, terminalShare: Math.max(0, terminal - funding) / Math.pow(1 + hurdle, horizon) / Math.max(value, .0001) };
}

export function rankedCompanies() {
  return COMPANIES.map((company) => {
    const ten = valuation(company, "base", 10);
    const twenty = valuation(company, "base", 20);
    const bear = valuation(company, "bear", 10);
    // Explicit subjective score, not a probability estimate or an expected-return calculation.
    const score = 50 * ((ten.irr ?? -.5) + (twenty.irr ?? -.5)) + 20 * (bear.irr ?? -.5) + 1.5 * company.durability - company.risk;
    return { company, ten, twenty, bear, score };
  }).sort((a, b) => b.score - a.score);
}

export function dataCentre(utilization = .65, revenuePerBilledKwYear = 25000) {
  const itMw = 100, pue = 1.2, powerPrice = 70;
  const capex = 5000, compute = 3500, facility = 1500;
  const renewal = compute / 4 + facility / 20;
  const power = itMw * 1000 * pue * 8760 * powerPrice / 1e6 / 1000;
  const revenue = itMw * 1000 * utilization * revenuePerBilledKwYear / 1e6;
  const operatingCost = power + 200;
  const preTaxOwnerCash = revenue - operatingCost - renewal;
  const hurdleRevenue = operatingCost + renewal + capex * .12 / .8;
  return { capex, power, renewal, revenue, operatingCost, preTaxOwnerCash, afterTaxOwnerCash: preTaxOwnerCash * .8, breakEvenUtilization: hurdleRevenue / (itMw * 1000 * revenuePerBilledKwYear / 1e6) };
}
