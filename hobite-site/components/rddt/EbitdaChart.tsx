const DATA: [string, number][] = [
  ["2024Q1", 10],
  ["2024Q2", 39.5],
  ["2024Q3", 94],
  ["2024Q4", 154],
  ["2025Q1", 115],
  ["2025Q2", 167],
  ["2025Q3", 236],
  ["2025Q4", 327],
  ["2026Q1", 266],
];

export default function EbitdaChart() {
  const max = Math.max(...DATA.map((d) => d[1]));
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Adjusted EBITDA</h2>
      <div className="mt-6 space-y-4">
        {DATA.map(([quarter, value]) => (
          <div key={quarter}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{quarter}</span>
              <span>${value}M</span>
            </div>
            <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${(value / max) * 100}%` }} />
          </div>
        ))}
      </div>
    </section>
  );
}
