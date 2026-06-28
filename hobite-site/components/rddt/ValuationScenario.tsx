export default function ValuationScenario() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold">Valuation Scenario Model</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-100">
              <th className="border p-3">Scenario</th>
              <th className="border p-3">2035 Revenue</th>
              <th className="border p-3">Margin</th>
              <th className="border p-3">Narrative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3">Conservative</td>
              <td className="border p-3">$9B</td>
              <td className="border p-3">30%</td>
              <td className="border p-3">Moderate monetization and slower DAU expansion</td>
            </tr>
            <tr>
              <td className="border p-3">Base</td>
              <td className="border p-3">$15B</td>
              <td className="border p-3">35%-40%</td>
              <td className="border p-3">Advertising, search, AI data, and international growth</td>
            </tr>
            <tr>
              <td className="border p-3">Bull</td>
              <td className="border p-3">$25B+</td>
              <td className="border p-3">40%+</td>
              <td className="border p-3">Human knowledge graph and AI answer layer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
