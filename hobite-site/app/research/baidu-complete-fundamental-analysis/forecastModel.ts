import { BAIDU_LATEST_CONTEXT, BAIDU_Q2_2026 } from "./latestQuarter";
import { BAIDU_LATEST_VALUATION } from "./valuationHistory";

export type BaiduScenario = "bear" | "base" | "bull";
export type BaiduForecastRow = { year: number; revenue: number; revenueGrowth: number; freeCashFlow: number; freeCashFlowMargin: number };
export type BaiduDcfCase = { label: string; discountRate: number; terminalGrowth: number; enterpriseValueRmb: number; equityValueRmb: number; valuePerAdsUsd: number; upsideToReferencePrice: number };

const inputs: Record<BaiduScenario, { label: string; startRevenue: number; growth: number[]; margins: number[]; discountRate: number; terminalGrowth: number }> = {
  bear: { label: "Bear", startRevenue: 125_000_000_000, growth: [0,0,1,2,3,3,3,3,3,3], margins: [5,6,7,8,9,9,10,10,10,10], discountRate: 12, terminalGrowth: 2 },
  base: { label: "Base", startRevenue: 128_000_000_000, growth: [0,3,5,7,8,8,7,6,5,5], margins: [9.4,11,13,15,16,17,18,18,18,18], discountRate: 10.5, terminalGrowth: 2.5 },
  bull: { label: "Bull", startRevenue: 132_000_000_000, growth: [0,6,9,11,12,11,10,9,8,7], margins: [12,14,17,19,21,22,23,23,23,23], discountRate: 9, terminalGrowth: 3 },
};

function buildForecast(input: (typeof inputs)[BaiduScenario]): BaiduForecastRow[] {
  let revenue = input.startRevenue;
  return input.growth.map((growth, index) => {
    if (index > 0) revenue *= 1 + growth / 100;
    const margin = input.margins[index] ?? 0;
    return { year: 2026 + index, revenue: Math.round(revenue), revenueGrowth: growth, freeCashFlow: Math.round(revenue * margin / 100), freeCashFlowMargin: margin };
  });
}

export const BAIDU_FORECASTS: Record<BaiduScenario, BaiduForecastRow[]> = {
  bear: buildForecast(inputs.bear), base: buildForecast(inputs.base), bull: buildForecast(inputs.bull),
};

export const BAIDU_DCF_INPUTS = {
  referencePrice: BAIDU_LATEST_VALUATION.adjustedCloseUsd ?? 88.08,
  referencePriceDate: BAIDU_LATEST_VALUATION.priceDate,
  adsShares: BAIDU_LATEST_CONTEXT.adsShares,
  netCashRmb: BAIDU_Q2_2026.cashAndInvestments - BAIDU_LATEST_CONTEXT.totalDebtEstimate,
  rmbPerUsd: BAIDU_LATEST_CONTEXT.rmbPerUsd,
};

function valueScenario(scenario: BaiduScenario): BaiduDcfCase {
  const input = inputs[scenario];
  const forecast = BAIDU_FORECASTS[scenario];
  const rate = input.discountRate / 100;
  const terminalGrowth = input.terminalGrowth / 100;
  const pvFreeCashFlow = forecast.reduce((sum, row, index) => sum + row.freeCashFlow / (1 + rate) ** (index + 1), 0);
  const terminalValue = forecast.at(-1)!.freeCashFlow * (1 + terminalGrowth) / (rate - terminalGrowth);
  const enterpriseValueRmb = pvFreeCashFlow + terminalValue / (1 + rate) ** forecast.length;
  const equityValueRmb = enterpriseValueRmb + BAIDU_DCF_INPUTS.netCashRmb;
  const valuePerAdsUsd = equityValueRmb / BAIDU_DCF_INPUTS.rmbPerUsd / BAIDU_DCF_INPUTS.adsShares;
  return { label: input.label, discountRate: input.discountRate, terminalGrowth: input.terminalGrowth, enterpriseValueRmb, equityValueRmb, valuePerAdsUsd, upsideToReferencePrice: (valuePerAdsUsd / BAIDU_DCF_INPUTS.referencePrice - 1) * 100 };
}

export const BAIDU_DCF_CASES: Record<BaiduScenario, BaiduDcfCase> = { bear: valueScenario("bear"), base: valueScenario("base"), bull: valueScenario("bull") };
export const BAIDU_FORECAST_NOTE = "Hobite FY2026-FY2035 scenarios are assumptions, not Baidu guidance. They vary search erosion, AI Cloud and application growth, and the conversion of infrastructure spending into free cash flow.";
export const BAIDU_VALUATION_NOTE = "The DCF treats reported cash and investments less estimated debt as non-operating value. Liquidity quality, offshore accessibility and strategic investment marks can differ from cash at par.";
