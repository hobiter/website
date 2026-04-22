import type { Metadata } from "next";
import GoogleGrowthChart from "../../../research/google-10-year-report/GoogleGrowthChart";
import { GOOGLE_10Y_DATA, GOOGLE_SOURCE_LINKS, cagr } from "../../../research/google-10-year-report/googleData";

export const metadata: Metadata = {
  title: "Google（Alphabet）十年财报深度报告",
  description: "基于 Google 过去 10 年（FY2016-FY2025）年报的中文长文研究。",
};

export default function GoogleTenYearReportZhPage() {
  const first = GOOGLE_10Y_DATA[0];
  const last = GOOGLE_10Y_DATA[GOOGLE_10Y_DATA.length - 1];
  const periods = GOOGLE_10Y_DATA.length - 1;

  const revenueCagr = cagr(first.revenue, last.revenue, periods);
  const operatingIncomeCagr = cagr(first.operatingIncome, last.operatingIncome, periods);
  const operatingCashFlowCagr = cagr(first.operatingCashFlow, last.operatingCashFlow, periods);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">长文研究</p>
          <h1 className="mt-3 text-4xl font-semibold">Google / Alphabet 十年年报研究（FY2016–FY2025）</h1>
          <p className="mt-4 text-zinc-700 leading-7">
            本报告基于 Alphabet 近十年公开年报数据，聚焦收入规模、盈利能力、现金流质量、资本开支与 AI 时代
            的战略风险，帮助投资者从长期维度理解 Google 的经营质量与未来关键变量。
          </p>
          <a href="/research/google-10-year-report" className="mt-4 inline-block text-sm text-zinc-600 underline">
            English Version
          </a>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">收入 CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{revenueCagr.toFixed(1)}%</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">经营利润 CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{operatingIncomeCagr.toFixed(1)}%</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-4">
              <p className="text-xs uppercase text-zinc-500">经营现金流 CAGR</p>
              <p className="mt-1 text-2xl font-semibold">{operatingCashFlowCagr.toFixed(1)}%</p>
            </div>
          </div>
        </header>

        <GoogleGrowthChart />

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm space-y-5 leading-7 text-zinc-700">
          <h2 className="text-2xl font-semibold text-zinc-900">1）十年核心结论</h2>
          <p>
            FY2016 到 FY2025，Alphabet 从以广告为核心的高增长平台，逐步演进为以 AI 能力为底座的全栈科技公司。
            收入从 {first.revenue.toFixed(1)}B 增长到 {last.revenue.toFixed(1)}B，经营现金流从 {first.operatingCashFlow.toFixed(1)}B 增长到
            {" "}{last.operatingCashFlow.toFixed(1)}B，显示出极强的规模化变现能力。
          </p>
          <p>
            未来投资核心不再只是“是否增长”，而是“AI 驱动的新增收入能否持续覆盖算力与基础设施成本上行”。
            只要现金流转换率稳定、云业务利润率改善、搜索商业化效率维持，长期复利逻辑仍然成立。
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">2）增长结构与盈利质量</h2>
          <p>
            十年维度看，Google 搜索仍是高质量现金流主引擎，YouTube 扩展了内容与品牌广告场景，Cloud 提供了第二增长曲线。
            经营利润整体增速快于收入，说明规模效应与运营效率持续释放。
          </p>
          <p>
            但 AI 时代会提升训练与推理成本，利润率波动可能放大。因而评估 Google 的关键，应从静态利润率转向“单位算力回报率”与
            “AI 产品货币化速度”。
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900">3）风险框架与跟踪要点</h2>
          <p>
            主要风险包括：反垄断与监管约束、搜索入口行为变化、流量获取成本（TAC）变化、以及新一代 AI 交互方式对传统搜索分发
            的替代压力。
          </p>
          <p>
            建议重点跟踪：搜索商业化效率、云业务利润率、AI 推理成本曲线、资本开支与自由现金流转换、以及订阅/企业产品贡献占比。
            这些指标将决定 Google 在下一阶段的估值中枢与盈利弹性。
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">十年财务数据（十亿美元）</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-2 pr-4">财年</th>
                  <th className="py-2 pr-4">收入</th>
                  <th className="py-2 pr-4">经营利润</th>
                  <th className="py-2 pr-4">净利润</th>
                  <th className="py-2 pr-4">经营现金流</th>
                </tr>
              </thead>
              <tbody>
                {GOOGLE_10Y_DATA.map((row) => (
                  <tr key={row.fiscalYear} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{row.fiscalYear}</td>
                    <td className="py-2 pr-4">{row.revenue.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.netIncome.toFixed(1)}</td>
                    <td className="py-2 pr-4">{row.operatingCashFlow.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">参考来源</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            {GOOGLE_SOURCE_LINKS.map((source) => (
              <li key={source.href}>
                <a href={source.href} className="underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
