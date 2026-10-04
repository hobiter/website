import { NETFLIX_CURRENT_UPDATE as update, NETFLIX_CURRENT_VALUATION as valuation } from "./currentUpdate";

export type ForecastRow = {
  year: number; revenue: number; revenueGrowth: number; freeCashFlow: number; freeCashFlowMargin: number;
};
export type DcfCase = {
  label: string; discountRate: number; terminalGrowth: number; pvFcf: number; pvTerminal: number;
  enterpriseValue: number; equityValue: number; valuePerShare: number; upsidePercent: number;
};

export const NETFLIX_FORECAST_SOURCE_NOTE =
  "Updated October 4, 2026 using Q2 results. FY2026 scenario revenues are $51.0B/$51.2B/$51.4B; recurring FCF is $9.0B/$10.5B/$11.5B. Company FCF guidance is $12.5B including a termination payment. The base case subtracts an assumed $2.0B after-tax one-time benefit, not a company-disclosed reconciliation. Later growth and margins are analyst assumptions.";

function forecast(revenue: number, fcf: number, growth: number[], margins: number[]): ForecastRow[] {
  return Array.from({ length: 10 }, (_, index) => {
    if (index > 0) revenue *= 1 + growth[index - 1] / 100;
    const freeCashFlow = index === 0 ? fcf : revenue * margins[index - 1] / 100;
    return {
      year: 2026 + index, revenue, freeCashFlow,
      revenueGrowth: index === 0 ? (revenue / 45_183_036_000 - 1) * 100 : growth[index - 1],
      freeCashFlowMargin: freeCashFlow / revenue * 100,
    };
  });
}

export const NETFLIX_FORECASTS = {
  bear: forecast(update.revenueGuidanceLow, 9_000_000_000, [7, 6, 6, 5, 5, 4, 4, 4, 4], [18, 18.5, 19, 19, 19.5, 19.5, 20, 20, 20]),
  base: forecast(update.revenueGuidanceMidpoint, valuation.normalizedFcf, [12, 10, 9, 8, 8, 7, 7, 6, 6], [22, 22.5, 23, 23.5, 23.5, 24, 24, 24.5, 24.5]),
  bull: forecast(update.revenueGuidanceHigh, 11_500_000_000, [15, 13, 12, 11, 10, 9, 9, 8, 8], [23.5, 24.5, 25, 25.5, 26, 26.5, 27, 27, 27.5]),
};

export const NETFLIX_DCF_ASSUMPTIONS = {
  netDebt: valuation.netDebt,
  dilutedShares: update.dilutedShares,
  note: "Equity DCF discounts FCF after interest at a cost of equity; net debt is not subtracted again. EV = equity value + June 30 carrying debt less cash ($5.210B), excluding short-term investments. Q2 weighted-average diluted shares (4.2613B) are a fixed split-adjusted proxy, not spot shares outstanding. FY2026 cash already realized or estimated through September is excluded: normalized H1 FCF plus half of assumed H2 FCF. Q3 actuals are not yet reported. Year-end cash flows are discounted from October 4, 2026. No future buyback uplift is assumed.",
};

function dcf(scenario: keyof typeof NETFLIX_FORECASTS, discountRate: number, terminalGrowth: number): DcfCase {
  const rows = NETFLIX_FORECASTS[scenario];
  const rate = discountRate / 100;
  const growth = terminalGrowth / 100;
  const normalizedH1 = update.h1ReportedFcf - update.assumedAfterTaxTerminationBenefit;
  const yearFraction = (Date.UTC(2026, 11, 31) - Date.parse(`${update.asOf}T00:00:00Z`)) / (365.25 * 86_400_000);
  // Q3 is an estimate: spread the remaining normalized H2 cash evenly across Q3/Q4.
  const remaining2026 = Math.max(0, (rows[0].freeCashFlow - normalizedH1) / 2);
  const pvFcf = rows.reduce((sum, row, index) =>
    sum + (index === 0 ? remaining2026 : row.freeCashFlow) / (1 + rate) ** (yearFraction + index), 0);
  const terminal = rows[rows.length - 1].freeCashFlow * (1 + growth) / (rate - growth);
  const pvTerminal = terminal / (1 + rate) ** (yearFraction + rows.length - 1);
  const equityValue = pvFcf + pvTerminal;
  const valuePerShare = equityValue / update.dilutedShares;
  return {
    label: scenario[0].toUpperCase() + scenario.slice(1), discountRate, terminalGrowth,
    pvFcf, pvTerminal, equityValue, enterpriseValue: equityValue + valuation.netDebt,
    valuePerShare, upsidePercent: (valuePerShare / update.referencePrice - 1) * 100,
  };
}

export const NETFLIX_DCF_CASES = {
  bear: dcf("bear", 9.5, 2.5), base: dcf("base", 9, 3), bull: dcf("bull", 8.5, 3.5),
};
