const DATA = [
  ["2024Q1",243],
  ["2024Q2",281],
  ["2024Q3",348],
  ["2024Q4",428],
  ["2025Q1",392],
  ["2025Q2",500],
  ["2025Q3",585],
  ["2025Q4",726],
  ["2026Q1",663],
];

function Bar({ value, max }: { value:number; max:number }) {
  return <div className="h-3 rounded-full bg-orange-500" style={{ width: `${(value / max) * 100}%` }} />;
}

export default function RevenueChart() {
  const max = Math.max(...DATA.map((d) => d[1]));

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Quarterly Revenue</h2>
      <div className="mt-6 space-y-4">
        {DATA.map(([quarter, revenue]) => (
          <div key={quarter}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{quarter}</span>
              <span>${revenue}M</span>
            </div>
            <Bar value={revenue as number} max={max} />
          </div>
        ))}
      </div>
    </section>
  );
}
