import { VST_GUIDANCE as latest } from "./operatingMetrics";
import { VST_LATEST_PRICE } from "./valuationHistory";

export type Scenario = "bear" | "base" | "bull";
export type ForecastRow = { year:number; revenue:number; revenueGrowth:number; adjustedEbitda:number; fcfBeforeGrowth:number; growthInvestment:number; helixInvestment:number; preferredDistributions:number; closureCash:number; freeCashFlow:number; fcfMargin:number; };
export const VST_MODEL_INPUTS = {
  asOf: "2026-10-04", dilutedShares: latest.dilutedShares,
  debtAndFinancing: latest.carryingDebt + latest.receivablesFinancing + latest.marginFinancing,
  netDebt: latest.carryingDebt + latest.receivablesFinancing + latest.marginFinancing - latest.cash,
  get otherClaims() { return latest.forwardRepurchase + latest.preferredStock + latest.minorityInterest; },
  get enterpriseValue() { return VST_LATEST_PRICE.close * latest.spotShares + this.netDebt + this.otherClaims; },
  get forwardEvEbitda() { return this.enterpriseValue / 7_200_000_000; },
};
export const VST_ASSUMPTIONS = {
  bear: { revenue:19e9, ebitda:6.8e9, conversion:0.55, growth:0.02, revenueGrowth:0.02, growthInvestment:1.3e9, discount:11, terminal:1.5 },
  base: { revenue:20e9, ebitda:7.2e9, conversion:4.325/7.2, growth:0.06, revenueGrowth:0.04, growthInvestment:1.1e9, discount:10, terminal:2 },
  bull: { revenue:21e9, ebitda:7.6e9, conversion:0.64, growth:0.10, revenueGrowth:0.06, growthInvestment:1.0e9, discount:9, terminal:2.5 },
};
const assumptions = VST_ASSUMPTIONS;
export const VST_FORECASTS = Object.fromEntries((Object.keys(assumptions) as Scenario[]).map(scenario => {
  const a = assumptions[scenario];
  return [scenario, Array.from({length:10},(_,index):ForecastRow => {
    const year = 2026 + index;
    const revenue = a.revenue * (1+a.revenueGrowth) ** index;
    const adjustedEbitda = a.ebitda * (1+a.growth) ** index;
    const fcfBeforeGrowth = adjustedEbitda*a.conversion;
    const growthInvestment = a.growthInvestment * 1.02 ** index;
    const helixInvestment = year === 2027 || year === 2028 ? 500e6 : 0;
    const preferredDistributions = 192e6;
    const closureCash = 100e6;
    const freeCashFlow = fcfBeforeGrowth-growthInvestment-helixInvestment-preferredDistributions-closureCash;
    return { year,revenue,revenueGrowth:index===0?(revenue/17.738e9-1)*100:a.revenueGrowth*100,adjustedEbitda,fcfBeforeGrowth,growthInvestment,helixInvestment,preferredDistributions,closureCash,freeCashFlow,fcfMargin:freeCashFlow/revenue*100 };
  })];
})) as Record<Scenario,ForecastRow[]>;

export const VST_DCF_CASES = Object.fromEntries((Object.keys(assumptions) as Scenario[]).map(scenario => {
  const rows = VST_FORECASTS[scenario];
  const a = assumptions[scenario];
  const rate = a.discount/100;
  const terminalGrowth = a.terminal/100;
  const fraction = (Date.UTC(2026,11,31)-Date.UTC(2026,9,4))/(365.25*86400000);
  // Only assumed Q4 cash is still prospective; no H1/Q3 cash is valued again.
  const pvFcf = rows.reduce((sum,row,index)=>sum+(index===0?row.freeCashFlow/4:row.freeCashFlow)/(1+rate)**(fraction+index),0);
  const pvTerminal = rows.at(-1)!.freeCashFlow*(1+terminalGrowth)/(rate-terminalGrowth)/(1+rate)**(fraction+9);
  const equityValue = pvFcf+pvTerminal;
  const valuePerShare = equityValue/latest.dilutedShares;
  return [scenario,{discountRate:a.discount,terminalGrowth:a.terminal,pvFcf,pvTerminal,equityValue,enterpriseValue:equityValue+VST_MODEL_INPUTS.netDebt+VST_MODEL_INPUTS.otherClaims,valuePerShare,upsidePercent:(valuePerShare/VST_LATEST_PRICE.close-1)*100,terminalWeight:pvTerminal/equityValue*100}];
})) as Record<Scenario,{discountRate:number;terminalGrowth:number;pvFcf:number;pvTerminal:number;equityValue:number;enterpriseValue:number;valuePerShare:number;upsidePercent:number;terminalWeight:number}>;

export const VST_DCF_SENSITIVITY = [9, 10, 11].map(discount => ({
  discount,
  values: [1, 2, 3].map(growth => {
    const r = discount / 100;
    const g = growth / 100;
    const fraction = (Date.UTC(2026,11,31)-Date.UTC(2026,9,4))/(365.25*86400000);
    const rows = VST_FORECASTS.base;
    const cash = rows.reduce((sum,row,index) => sum+(index===0?row.freeCashFlow/4:row.freeCashFlow)/(1+r)**(fraction+index),0);
    const terminal = rows.at(-1)!.freeCashFlow*(1+g)/(r-g)/(1+r)**(fraction+9);
    return (cash+terminal)/latest.dilutedShares;
  }),
}));

export const VST_MODEL_NOTE = "Analyst scenarios, not company guidance. Common-equity DCF starts October 4, 2026 and uses one quarter of estimated FY2026 cash plus 2027-2035 full-year cash. This Q4 allocation is a seasonal timing approximation, not reported Q3/Q4 results. Adjusted FCF before growth is reduced for growth capex, $192M/year preferred distributions, $100M/year closure cash and a full $1B Helix commitment spread over 2027-2028. No Helix returns, unclosed Cogentrix uplift, undisclosed PPA premium, new debt proceeds or future buyback share reduction is included. Constant shares and financing costs approximate a stable capital structure. Cost of equity discounts post-interest common cash; no second net-debt deduction. EV adds debt, financing, preferred stock, forward repurchase and minority claims. Nuclear trust assets and restricted collateral are not freely distributable cash. The 2036 terminal cash flow assumes ongoing reinvestment; finite asset lives, licensing and hedge resets remain risks.";
