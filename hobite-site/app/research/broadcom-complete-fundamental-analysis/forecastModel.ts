export type BroadcomScenario = "bear" | "base" | "bull";
export type BroadcomForecastRow = { year: number; revenue: number; revenueGrowth: number; freeCashFlow: number; freeCashFlowMargin: number };
export type BroadcomDcfCase = { label: string; discountRate: number; terminalGrowth: number; pvFreeCashFlow: number; pvTerminalValue: number; enterpriseValue: number; equityValue: number; valuePerShare: number; upsideToReferencePrice: number };

export const BROADCOM_FORECAST_NOTE =
  "Hobite scenarios begin with FY2026 estimates informed by reported Q1-Q3 results and Broadcom's September 2 Q4 guidance. FY2027-FY2035 figures are assumptions, not management guidance. DCF subtracts Q3 net debt and uses split-adjusted diluted shares.";

const inputs: Record<BroadcomScenario, { startRevenue: number; growth: number[]; margins: number[]; discountRate: number; terminalGrowth: number; label: string }> = {
  bear: { label: "Bear", startRevenue: 103_000_000_000, growth: [0, 15, 10, 8, 6, 5, 4, 4, 3.5, 3], margins: [40.8, 40, 39.5, 39, 38.5, 38.5, 38.5, 38.5, 38, 38], discountRate: 11.5, terminalGrowth: 3 },
  base: { label: "Base", startRevenue: 105_889_000_000, growth: [0, 30, 22, 16, 12, 10, 8, 7, 6, 5.5], margins: [43.4, 44, 44.5, 45, 45, 45, 44.5, 44.5, 44, 44], discountRate: 10, terminalGrowth: 3.5 },
  bull: { label: "Bull", startRevenue: 108_000_000_000, growth: [0, 40, 35, 22, 16, 13, 11, 10, 9, 8], margins: [44.4, 45, 46, 47, 47, 47, 46.5, 46.5, 46, 46], discountRate: 9, terminalGrowth: 4 },
};

function buildForecast(input: (typeof inputs)[BroadcomScenario]): BroadcomForecastRow[] {
  let revenue = input.startRevenue;
  return input.growth.map((growth, index) => {
    if (index > 0) revenue *= 1 + growth / 100;
    const margin = input.margins[index];
    return { year: 2026 + index, revenue: Math.round(revenue), revenueGrowth: growth, freeCashFlow: Math.round(revenue * margin / 100), freeCashFlowMargin: margin };
  });
}

export const BROADCOM_FORECASTS: Record<BroadcomScenario, BroadcomForecastRow[]> = {
  bear: buildForecast(inputs.bear),
  base: buildForecast(inputs.base),
  bull: buildForecast(inputs.bull),
};

export const BROADCOM_DCF_INPUTS = {
  referencePrice: 357.16,
  referencePriceDate: "2026-09-03",
  dilutedShares: 4_884_000_000,
  netDebt: 35_444_000_000,
};

function valueScenario(scenario: BroadcomScenario): BroadcomDcfCase {
  const input = inputs[scenario];
  const forecast = BROADCOM_FORECASTS[scenario];
  const rate = input.discountRate / 100;
  const terminalGrowth = input.terminalGrowth / 100;
  const pvFreeCashFlow = forecast.reduce((sum, row, index) => sum + row.freeCashFlow / (1 + rate) ** (index + 1), 0);
  const terminalValue = forecast.at(-1)!.freeCashFlow * (1 + terminalGrowth) / (rate - terminalGrowth);
  const pvTerminalValue = terminalValue / (1 + rate) ** forecast.length;
  const enterpriseValue = pvFreeCashFlow + pvTerminalValue;
  const equityValue = enterpriseValue - BROADCOM_DCF_INPUTS.netDebt;
  const valuePerShare = equityValue / BROADCOM_DCF_INPUTS.dilutedShares;
  return { label: input.label, discountRate: input.discountRate, terminalGrowth: input.terminalGrowth, pvFreeCashFlow, pvTerminalValue, enterpriseValue, equityValue, valuePerShare, upsideToReferencePrice: (valuePerShare / BROADCOM_DCF_INPUTS.referencePrice - 1) * 100 };
}

export const BROADCOM_DCF_CASES: Record<BroadcomScenario, BroadcomDcfCase> = {
  bear: valueScenario("bear"),
  base: valueScenario("base"),
  bull: valueScenario("bull"),
};

export const BROADCOM_VALUATION_NOTE =
  "DCF is highly sensitive to AI revenue durability, customer concentration, FCF conversion and terminal assumptions. The model does not treat management's long-range AI commentary as committed backlog and should be read as a scenario range, not a price target.";
