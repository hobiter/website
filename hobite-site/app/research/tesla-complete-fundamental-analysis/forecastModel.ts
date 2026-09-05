import { TESLA_LATEST_VALUATION } from "./valuationHistory";

export type TeslaScenario = "bear" | "base" | "bull";
export type TeslaForecastRow = { year: number; revenue: number; revenueGrowth: number; freeCashFlow: number; freeCashFlowMargin: number };
export type TeslaDcfCase = { label: string; discountRate: number; terminalGrowth: number; pvFreeCashFlow: number; pvTerminalValue: number; enterpriseValue: number; equityValue: number; valuePerShare: number; upsideToReferencePrice: number };

const inputs: Record<TeslaScenario, { label: string; startRevenue: number; growth: number[]; margins: number[]; discountRate: number; terminalGrowth: number }> = {
  bear: { label: "Bear", startRevenue: 105_000_000_000, growth: [0,3,4,5,5,4,4,3,3,3], margins: [0,2,4,6,7,8,8,8,8,8], discountRate: 12, terminalGrowth: 3 },
  base: { label: "Base", startRevenue: 111_000_000_000, growth: [0,10,12,14,14,12,10,9,8,7], margins: [2.3,5,8,11,14,16,18,19,20,20], discountRate: 11, terminalGrowth: 3.5 },
  bull: { label: "Bull", startRevenue: 115_000_000_000, growth: [0,20,25,25,22,18,15,13,11,10], margins: [3,8,13,18,22,25,27,28,29,30], discountRate: 10, terminalGrowth: 4 },
};

function buildForecast(input: (typeof inputs)[TeslaScenario]): TeslaForecastRow[] {
  let revenue=input.startRevenue;
  return input.growth.map((growth,index)=>{if(index>0)revenue*=1+growth/100;const margin=input.margins[index] ?? 0;return{year:2026+index,revenue:Math.round(revenue),revenueGrowth:growth,freeCashFlow:Math.round(revenue*margin/100),freeCashFlowMargin:margin};});
}

export const TESLA_FORECASTS: Record<TeslaScenario,TeslaForecastRow[]> = { bear:buildForecast(inputs.bear), base:buildForecast(inputs.base), bull:buildForecast(inputs.bull) };
export const TESLA_DCF_INPUTS = { referencePrice: TESLA_LATEST_VALUATION.adjustedClose ?? 354.08, referencePriceDate: TESLA_LATEST_VALUATION.priceDate, dilutedShares: TESLA_LATEST_VALUATION.splitAdjustedDilutedShares, netCash: 43_524_000_000-9_061_000_000 };

function valueScenario(scenario: TeslaScenario): TeslaDcfCase {
  const input=inputs[scenario];const forecast=TESLA_FORECASTS[scenario];const rate=input.discountRate/100;const terminalGrowth=input.terminalGrowth/100;const pvFreeCashFlow=forecast.reduce((sum,row,index)=>sum+row.freeCashFlow/(1+rate)**(index+1),0);const terminalValue=forecast.at(-1)!.freeCashFlow*(1+terminalGrowth)/(rate-terminalGrowth);const pvTerminalValue=terminalValue/(1+rate)**forecast.length;const enterpriseValue=pvFreeCashFlow+pvTerminalValue;const equityValue=enterpriseValue+TESLA_DCF_INPUTS.netCash;const valuePerShare=equityValue/TESLA_DCF_INPUTS.dilutedShares;return{label:input.label,discountRate:input.discountRate,terminalGrowth:input.terminalGrowth,pvFreeCashFlow,pvTerminalValue,enterpriseValue,equityValue,valuePerShare,upsideToReferencePrice:(valuePerShare/TESLA_DCF_INPUTS.referencePrice-1)*100};
}

export const TESLA_DCF_CASES: Record<TeslaScenario,TeslaDcfCase> = { bear:valueScenario("bear"), base:valueScenario("base"), bull:valueScenario("bull") };
export const TESLA_FORECAST_NOTE = "Hobite FY2026-FY2035 scenarios are assumptions, not Tesla guidance. The base and bull cases require progressively material contributions from energy, software, autonomy and robotics; the bear case assigns no large autonomy profit pool.";
export const TESLA_VALUATION_NOTE = "Tesla cannot be valued responsibly from a single automotive multiple. This DCF makes autonomy optionality explicit through revenue growth and FCF margin scenarios, while avoiding a separate unverified robotaxi terminal value.";
