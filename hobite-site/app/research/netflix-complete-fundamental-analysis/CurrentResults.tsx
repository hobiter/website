import { NETFLIX_CURRENT_UPDATE as update, NETFLIX_CURRENT_VALUATION as valuation } from "./currentUpdate";
import { NETFLIX_DCF_CASES, NETFLIX_DCF_ASSUMPTIONS } from "./forecastModel";
import { NETFLIX_LATEST_QUARTERLY_FINANCIAL as quarter } from "./quarterlyFinancials";

const billions = (value: number) => `$${(value / 1e9).toFixed(2)}B`;

export default function CurrentResults({ chinese = false }: { chinese?: boolean }) {
  const labels = chinese ? {
    title: "$67 参考价：最新财报与估值", price: "用户指定参考价（非实时行情）", revenue: "Q2 收入", margin: "Q2 经营利润率", fcf: "Q2 自由现金流",
    equity: "摊薄股权价值估算", sales: "2026 预期 EV / 收入", reported: "指引 FCF 收益率", normalized: "正常化 FCF 收益率",
  } : {
    title: "$67 Reference Price: Latest Results and Valuation", price: "User-specified reference price (not a live quote)", revenue: "Q2 revenue", margin: "Q2 operating margin", fcf: "Q2 free cash flow",
    equity: "Diluted equity-value proxy", sales: "2026 forward EV / sales", reported: "Guidance FCF yield", normalized: "Normalized FCF yield",
  };
  const metrics = [
    [labels.price, `$${update.referencePrice.toFixed(2)}`],
    [labels.revenue, billions(quarter.revenue!)],
    [labels.margin, `${quarter.operatingMargin!.toFixed(1)}%`],
    [labels.fcf, billions(quarter.freeCashFlow!)],
    [labels.equity, billions(valuation.dilutedEquityValue)],
    [labels.sales, `${valuation.forwardEvToSales.toFixed(2)}x`],
    [labels.reported, `${valuation.reportedFcfYield.toFixed(2)}%`],
    [labels.normalized, `${valuation.normalizedFcfYield.toFixed(2)}%`],
  ];
  return (
    <section className="border-y border-zinc-200 py-8" aria-labelledby="current-results-title">
      <h2 id="current-results-title" className="text-2xl font-semibold">{labels.title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {chinese ? "更新于" : "Updated"} {update.asOf} · {quarter.period} · {chinese ? "财报发布于" : "Results released"} {update.resultsDate}.
        {chinese ? "截至更新日，Q3 实际业绩尚未公布。" : " Q3 actual results were not yet published as of this update."}
      </p>
      <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => <div key={label}>
          <dt className="text-sm text-zinc-600">{label}</dt><dd className="mt-1 text-2xl font-semibold">{value}</dd>
        </div>)}
      </dl>
      <div className="mt-6 space-y-3 leading-7 text-zinc-700">
        <p>{chinese
          ? "Q2 收入同比增长 13.4%，经营利润同比增长约 11%，经营利润率从上年同期 34.1% 降至 33.4%。净利润为 $3.40B，摊薄 EPS 为 $0.80。季度现金流受税款支付影响，不能简单年化；Q1 净利润和 H1 现金流包含 Warner Bros. 解约费影响。"
          : "Q2 revenue grew 13.4% and operating income grew approximately 11%; operating margin declined from 34.1% to 33.4% year over year. Net income was $3.40B and diluted EPS was $0.80. Cash tax timing depressed quarterly FCF; neither Q2 FCF nor Q1 earnings should be annualized mechanically. Q1 earnings and H1 cash flow include the Warner Bros. termination payment."}</p>
        <p>{chinese
          ? "2026 公司指引：收入 $51.0B–$51.4B、经营利润率 31.5%、广告收入约 $3B、FCF 约 $12.5B。正常化 FCF $10.5B = 指引 $12.5B 减去分析师假设的税后一次性收益 $2.0B；这不是公司披露的调整后指引。Q3 指引为收入 $12.86B、经营利润率 33.2%、EPS $0.82，属于预测而非实际值。"
          : "FY2026 company guidance: revenue $51.0B–$51.4B, operating margin 31.5%, advertising revenue approximately $3B and FCF approximately $12.5B. Normalized FCF of $10.5B equals guidance less an analyst-assumed $2.0B after-tax one-time benefit; this is not company-adjusted guidance. Q3 guidance is $12.86B revenue, 33.2% operating margin and $0.82 EPS, not actual results."}</p>
        <p>{chinese
          ? "Q2 区域收入：UCAN $5.432B、EMEA $4.034B、LATAM $1.584B、APAC $1.510B。期末内容资产 $33.84B、内容义务 $25.11B；Q2 回购约 $4.7B。季度会员数量已不再常规披露，因此不推算最新会员数或 ARPU。"
          : "Q2 regional revenue: UCAN $5.432B, EMEA $4.034B, LATAM $1.584B and APAC $1.510B. Ending content assets were $33.84B and content obligations $25.11B; quarterly buybacks were approximately $4.7B. Regular quarterly membership reporting has stopped; no current subscriber count or ARPU is inferred."}</p>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead><tr className="border-b border-zinc-200">
            <th className="py-3">{chinese ? "情景" : "Scenario"}</th><th>{chinese ? "DCF 每股价值" : "DCF per share"}</th><th>{chinese ? "相对 $67 涨跌空间" : "Upside / downside vs $67"}</th>
          </tr></thead>
          <tbody>{(["bear", "base", "bull"] as const).map((scenario, index) => <tr key={scenario} className="border-b border-zinc-200">
            <td className="py-3">{chinese ? ["熊市", "基础", "牛市"][index] : NETFLIX_DCF_CASES[scenario].label}</td>
            <td>${NETFLIX_DCF_CASES[scenario].valuePerShare.toFixed(2)}</td>
            <td>{NETFLIX_DCF_CASES[scenario].upsidePercent >= 0 ? "+" : ""}{NETFLIX_DCF_CASES[scenario].upsidePercent.toFixed(1)}%</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 leading-7 text-zinc-700">{chinese
        ? "投资结论：$67 相对于基础情景接近合理价值，而非明显低估。增长、广告变现和内容投入效率仍是关键；正常化现金流收益率较低，投资回报依赖持续增长。DCF 是假设驱动的估算，不是保证收益或个性化投资建议。"
        : "Investment conclusion: $67 is near base-case fair value, not an obvious bargain. Growth, advertising execution and content efficiency remain the key drivers; the modest normalized cash yield leaves returns dependent on continued growth. DCF values are assumption-driven estimates, not guaranteed returns or personalized investment advice."}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{chinese
        ? "模型采用股权 DCF：对扣除利息后的 FCF 按股权资本成本贴现，不重复扣除净债务。Q2 摊薄加权平均股数为 42.613 亿，已按 2025 年 10 比 1 拆股调整，作为固定股数近似值；并非即时流通股数。排除 H1 正常化现金流与估计 Q3 现金流，仅计入剩余 Q4 及以后现金流；Q3 按 H2 正常化 FCF 的一半估计。2026 年末距估值日约 0.24 年。熊市/基础/牛市股权折现率为 9.5%/9%/8.5%，永续增长率为 2.5%/3%/3.5%，不假设后续回购提升。"
        : NETFLIX_DCF_ASSUMPTIONS.note}</p>
      <p className="mt-4 flex flex-wrap gap-4 text-sm underline">
        <a href={update.letterUrl}>{chinese ? "Q2 股东信（实际值与指引）" : "Q2 shareholder letter (results and guidance)"}</a>
        <a href={update.filingUrl}>{chinese ? "Q2 SEC 10-Q" : "Q2 SEC Form 10-Q"}</a>
      </p>
    </section>
  );
}
