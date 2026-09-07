import { NVIDIA_LATEST_VALUATION } from "./valuationHistory";

export type NvidiaScenario = "bear" | "base" | "bull";
export type NvidiaForecastRow = { year: number; revenue: number; revenueGrowth: number; freeCashFlow: number; freeCashFlowMargin: number };
export type NvidiaDcfCase = { label: string; discountRate: number; terminalGrowth: number; pvFreeCashFlow: number; pvTerminalValue: number; enterpriseValue: number; equityValue: number; valuePerShare: number; upsideToReferencePrice: number };

const inputs: Record<NvidiaScenario, { label: string; startRevenue: number; growth: number[]; margins: number[]; discountRate: number; terminalGrowth: number }> = {
  bear: { label: "Bear", startRevenue: 390_000_000_000, growth: [0,15,10,8,7,6,5,5,4,4], margins: [28,27,26,25,24,24,24,24,24,24], discountRate: 12, terminalGrowth: 3 },
  base: { label: "Base", startRevenue: 405_000_000_000, growth: [0,30,22,18,15,12,10,9,8,7], margins: [33,34,35,36,37,38,38,38,38,38], discountRate: 10.5, terminalGrowth: 3.5 },
  bull: { label: "Bull", startRevenue: 420_000_000_000, growth: [0,42,32,25,20,17,14,12,10,9], margins: [35,38,40,42,43,44,44,44,44,44], discountRate: 9.5, terminalGrowth: 4 },
};

function buildForecast(input: (typeof inputs)[NvidiaScenario]): NvidiaForecastRow[] { let revenue=input.startRevenue; return input.growth.map((growth,index)=>{if(index>0)revenue*=1+growth/100;const margin=input.margins[index] ?? 0;return{year:2027+index,revenue:Math.round(revenue),revenueGrowth:growth,freeCashFlow:Math.round(revenue*margin/100),freeCashFlowMargin:margin};}); }

export const NVIDIA_FORECASTS: Record<NvidiaScenario,NvidiaForecastRow[]> = { bear:buildForecast(inputs.bear), base:buildForecast(inputs.base), bull:buildForecast(inputs.bull) };
export const NVIDIA_DCF_INPUTS = { referencePrice: NVIDIA_LATEST_VALUATION.adjustedClose ?? 230.36, referencePriceDate: NVIDIA_LATEST_VALUATION.priceDate, dilutedShares: 24_338_000_000, netCash: 99_369_000_000-33_366_000_000 };

function valueScenario(scenario: NvidiaScenario): NvidiaDcfCase { const input=inputs[scenario];const forecast=NVIDIA_FORECASTS[scenario];const rate=input.discountRate/100;const terminalGrowth=input.terminalGrowth/100;const pvFreeCashFlow=forecast.reduce((sum,row,index)=>sum+row.freeCashFlow/(1+rate)**(index+1),0);const terminalValue=forecast.at(-1)!.freeCashFlow*(1+terminalGrowth)/(rate-terminalGrowth);const pvTerminalValue=terminalValue/(1+rate)**forecast.length;const enterpriseValue=pvFreeCashFlow+pvTerminalValue;const equityValue=enterpriseValue+NVIDIA_DCF_INPUTS.netCash;const valuePerShare=equityValue/NVIDIA_DCF_INPUTS.dilutedShares;return{label:input.label,discountRate:input.discountRate,terminalGrowth:input.terminalGrowth,pvFreeCashFlow,pvTerminalValue,enterpriseValue,equityValue,valuePerShare,upsideToReferencePrice:(valuePerShare/NVIDIA_DCF_INPUTS.referencePrice-1)*100}; }

export const NVIDIA_DCF_CASES: Record<NvidiaScenario,NvidiaDcfCase> = { bear:valueScenario("bear"), base:valueScenario("base"), bull:valueScenario("bull") };
export const NVIDIA_FORECAST_NOTE = "Hobite FY2027-FY2036 scenarios are assumptions, not NVIDIA guidance. They explicitly vary AI infrastructure demand duration, platform cadence, competition and free-cash-flow conversion.";
export const NVIDIA_VALUATION_NOTE = "The DCF values cash flows, not headline accelerator demand. Contractual supply, cloud and guarantee exposures are reflected through lower bear-case growth and margins rather than treated as debt at face value.";
