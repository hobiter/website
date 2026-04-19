import { MSFT_FINANCIALS } from "./financials";

function Bar({ value, max }: { value: number; max: number }) {
  const width = (value / max) * 100;
  return <div className="h-2 bg-zinc-900" style={{ width: `${width}%` }} />;
}

function Chart({
  title,
  field,
}: {
  title: string;
  field: "revenue" | "operatingIncome" | "operatingCashFlow";
}) {
  const max = Math.max(...MSFT_FINANCIALS.map((d) => d[field]));

  return (
    <div className="p-6 rounded-3xl border bg-white">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {MSFT_FINANCIALS.map((d) => (
          <div key={d.year}>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>{d.year}</span>
              <span>{d[field].toFixed(0)}B</span>
            </div>
            <Bar value={d[field]} max={max} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Chart title="Revenue (B$)" field="revenue" />
      <Chart title="Operating Income (B$)" field="operatingIncome" />
      <Chart title="Cash Flow (B$)" field="operatingCashFlow" />
    </div>
  );
}
