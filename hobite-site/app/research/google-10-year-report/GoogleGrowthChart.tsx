import { GOOGLE_10Y_DATA, toIndex } from "./googleData";

function linePoints(values: number[], width: number, height: number, pad: number, minValue: number, maxValue: number) {
  const usableWidth = width - pad * 2;
  const usableHeight = height - pad * 2;

  return values
    .map((value, i) => {
      const x = pad + (i / (values.length - 1)) * usableWidth;
      const yRatio = (value - minValue) / (maxValue - minValue || 1);
      const y = height - pad - yRatio * usableHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

function yPos(value: number, height: number, pad: number, minValue: number, maxValue: number) {
  const usableHeight = height - pad * 2;
  const yRatio = (value - minValue) / (maxValue - minValue || 1);
  return height - pad - yRatio * usableHeight;
}

export default function GoogleGrowthChart() {
  const years = GOOGLE_10Y_DATA.map((row) => row.fiscalYear);
  const revenueIndex = toIndex(GOOGLE_10Y_DATA.map((row) => row.revenue));
  const operatingIncomeIndex = toIndex(GOOGLE_10Y_DATA.map((row) => row.operatingIncome));
  const operatingCashFlowIndex = toIndex(GOOGLE_10Y_DATA.map((row) => row.operatingCashFlow));

  const all = [...revenueIndex, ...operatingIncomeIndex, ...operatingCashFlowIndex];
  const minValue = Math.floor(Math.min(...all) / 20) * 20;
  const maxValue = Math.ceil(Math.max(...all) / 20) * 20;
  const ticks = Array.from({ length: 7 }, (_, i) => minValue + ((maxValue - minValue) / 6) * i);

  const width = 940;
  const height = 430;
  const pad = 60;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Decade growth diagram (indexed, FY2016 = 100)</h2>
      <p className="mt-2 text-sm text-zinc-600">Y-axis shows index values; X-axis shows fiscal year.</p>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[780px] w-full" role="img" aria-label="Google 10-year indexed growth chart">
          {ticks.map((tick) => {
            const y = yPos(tick, height, pad, minValue, maxValue);
            return (
              <g key={tick}>
                <line x1={pad} y1={y} x2={width - pad} y2={y} stroke="#e4e4e7" strokeDasharray="4 4" />
                <text x={pad - 12} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[11px]">
                  {Math.round(tick)}
                </text>
              </g>
            );
          })}

          <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#a1a1aa" />
          <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#a1a1aa" />

          <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={linePoints(revenueIndex, width, height, pad, minValue, maxValue)} />
          <polyline fill="none" stroke="#9333ea" strokeWidth="3" points={linePoints(operatingIncomeIndex, width, height, pad, minValue, maxValue)} />
          <polyline fill="none" stroke="#059669" strokeWidth="3" points={linePoints(operatingCashFlowIndex, width, height, pad, minValue, maxValue)} />

          {years.map((year, i) => {
            const x = pad + (i / (years.length - 1)) * (width - pad * 2);
            return (
              <text key={year} x={x} y={height - pad + 20} textAnchor="middle" className="fill-zinc-500 text-[11px]">
                {year}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />Revenue index</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-purple-600" />Operating income index</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />Operating cash flow index</span>
      </div>
    </section>
  );
}
