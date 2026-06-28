const KPI = [
  ["TTM Revenue", "$2.47B"],
  ["Gross Margin", "91%"],
  ["FCF Margin", "35%"],
  ["Cash", "$2.8B"],
  ["Debt", "$21M"],
  ["DAUq", "126.8M"],
];

export default function KPIDashboard() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {KPI.map(([k, v]) => (
        <div key={k} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-zinc-500">{k}</div>
          <div className="mt-2 text-3xl font-semibold">{v}</div>
        </div>
      ))}
    </section>
  );
}
