import { MSFT_10Y_DATA, toIndexedSeries } from "./msftData";

type LabelCopy = {
  revenue: string;
  ebita: string;
  cashFlow: string;
};

function createPolyline(values: number[], width: number, height: number, padding: number) {
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return values
    .map((value, index) => {
      const x = padding + (index / (values.length - 1)) * usableWidth;
      const normalized = (value - minValue) / (maxValue - minValue || 1);
      const y = height - padding - normalized * usableHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function FinancialGrowthChart({
  labels,
  title,
}: {
  labels: LabelCopy;
  title: string;
}) {
  const years = MSFT_10Y_DATA.map((row) => row.fiscalYear);
  const revenue = toIndexedSeries(MSFT_10Y_DATA.map((row) => row.revenue));
  const ebita = toIndexedSeries(MSFT_10Y_DATA.map((row) => row.ebita));
  const cashFlow = toIndexedSeries(MSFT_10Y_DATA.map((row) => row.operatingCashFlow));

  const width = 900;
  const height = 360;
  const padding = 48;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">Indexed growth (FY2016 = 100)</p>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] w-full" role="img" aria-label={title}>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d4d4d8" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d4d4d8" />

          <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={createPolyline(revenue, width, height, padding)} />
          <polyline fill="none" stroke="#9333ea" strokeWidth="3" points={createPolyline(ebita, width, height, padding)} />
          <polyline fill="none" stroke="#059669" strokeWidth="3" points={createPolyline(cashFlow, width, height, padding)} />

          {years.map((year, index) => {
            const x = padding + (index / (years.length - 1)) * (width - padding * 2);
            return (
              <text key={year} x={x} y={height - padding + 20} textAnchor="middle" className="fill-zinc-500 text-[11px]">
                {year}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />{labels.revenue}</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-purple-600" />{labels.ebita}</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />{labels.cashFlow}</span>
      </div>
    </section>
  );
}
