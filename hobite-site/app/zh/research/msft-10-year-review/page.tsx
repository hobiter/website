import type { Metadata } from "next";
import FinancialGrowthChart from "../../../research/msft-10-year-review/FinancialGrowthChart";
import { MSFT_10Y_DATA } from "../../../research/msft-10-year-review/msftData";

export const metadata: Metadata = {
  title: "微软 MSFT 十年复盘",
  description: "微软近十年收入、EBITA 与经营现金流增长可视化。",
};

export default function MsftTenYearReviewZhPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">研究</p>
          <h1 className="mt-3 text-4xl font-semibold">微软（MSFT）十年复盘</h1>
          <p className="mt-3 max-w-3xl text-zinc-600">
            下面的图表展示了微软过去十年在收入、EBITA 与经营现金流方面的增长轨迹。
          </p>
          <a href="/research/msft-10-year-review" className="mt-3 inline-block text-sm text-zinc-600 underline">
            English Version
          </a>
        </header>

        <FinancialGrowthChart
          title="收入 vs EBITA vs 经营现金流"
          labels={{
            revenue: "收入",
            ebita: "EBITA",
            cashFlow: "经营现金流",
          }}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">基础数据（十亿美元）</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-2 pr-4">财年</th>
                  <th className="py-2 pr-4">收入</th>
                  <th className="py-2 pr-4">EBITA</th>
                  <th className="py-2 pr-4">经营现金流</th>
                </tr>
              </thead>
              <tbody>
                {MSFT_10Y_DATA.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.ebita.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingCashFlow.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
