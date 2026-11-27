import history from "./history.json" with { type: "json" };

export type ChipTicker = keyof typeof history;
export const chipHistory = history;
export const metrics = ["revenue", "fcf", "eps"] as const;
export type Metric = typeof metrics[number];
export type Scenario = readonly [salesGrowth: number, netMargin: number, shareGrowth: number, exitMultiple: number];
export type ForecastInput = {
  fiscalYear: number;
  salesBillions: number;
  sharesBillions: number;
  scenarios: readonly [Scenario, Scenario, Scenario];
};
export function cagr(start: number | null, end: number | null, intervals: number) {
  return start != null && end != null && start > 0 && end > 0 && intervals > 0
    ? Math.expm1(Math.log(end / start) / intervals) : null;
}
export function historicalFcfMargin(ticker: ChipTicker) {
  const sample = history[ticker].filter(row=>row.fcf!=null).slice(-3);
  return {
    first: sample[0].year,
    last: sample[sample.length-1].year,
    latestMargin: (sample[sample.length-1].fcf??0) / sample[sample.length-1].revenue,
    margin: sample.reduce((sum,r)=>sum+(r.fcf??0),0) / sample.reduce((sum,r)=>sum+r.revenue,0),
  };
}
export function buildForecast(ticker: ChipTicker, inputs: ForecastInput) {
  const { margin, latestMargin } = historicalFcfMargin(ticker);
  return inputs.scenarios.map(([growth, netMargin, shareGrowth], index) => {
    const cashMargin = margin + [-.06, 0, .06][index];
    return {
      growth, netMargin, shareGrowth, cashMargin,
      rows: Array.from({length:11},(_,years)=>{
        const revenue = inputs.salesBillions * 1e9 * (1+growth)**years;
        const shares = inputs.sharesBillions * 1e9 * (1+shareGrowth)**years;
        const yearMargin = latestMargin + (cashMargin-latestMargin) * Math.min(years/5,1);
        return {year:inputs.fiscalYear+years, revenue, fcf:revenue*yearMargin, eps:revenue*netMargin/shares, yearMargin};
      }),
    };
  });
}
