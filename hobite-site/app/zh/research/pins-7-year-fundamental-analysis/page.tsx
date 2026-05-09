import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest（PINS）七年基本面分析",
  description: "Pinterest 七年收入、Adjusted EBITDA、利润率、AI 商业化与五年前景深度研究。",
};

const METRICS = [
  {
    label: "2025 Revenue",
    value: "$4.22B",
    note: "Pinterest 已经进入大规模商业化阶段。",
  },
  {
    label: "2025 Adj. EBITDA",
    value: "$1.27B",
    note: "盈利能力相比 2022 年明显修复。",
  },
  {
    label: "2026 Q1 Revenue",
    value: "$1.01B",
    note: "季度收入首次稳定站上 10 亿美元级别。",
  },
  {
    label: "核心逻辑",
    value: "AI + Shopping",
    note: "视觉搜索 + 高购买意图流量是长期价值核心。",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 leading-8 text-zinc-700">{children}</div>
    </section>
  );
}

export default function PinsChineseAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">中文研究</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            Pinterest（PINS）七年基本面深度分析
          </h1>
          <p className="mt-5 max-w-4xl text-lg text-zinc-600">
            从收入增长、Adjusted EBITDA、利润率、AI 商业化、国际 ARPU，到未来五年增长空间，对 Pinterest 进行完整长期投资分析。
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/research/pins-7-year-fundamental-analysis"
              className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm"
            >
              English Version
            </a>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {METRICS.map((item) => (
            <div key={item.label} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
              <p className="mt-3 text-sm text-zinc-600">{item.note}</p>
            </div>
          ))}
        </div>

        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">投资核心结论</h2>

          <div className="mt-6 space-y-5 leading-8 text-zinc-700">
            <p>
              Pinterest 并不是传统意义上的社交媒体平台，它更像是一个“视觉搜索 + 消费决策入口”。
              用户进入 Pinterest 时，很多时候已经带有明确消费意图：家居、装修、婚礼、旅行、穿搭、美妆、菜谱等。
            </p>

            <p>
              这意味着 Pinterest 的流量天然更接近电商与广告转化，而不是纯娱乐型内容平台。
              这是其长期最重要的价值来源。
            </p>

            <p>
              AI 的加入，会让 Pinterest 的商业模式发生质变：
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>AI 推荐提高用户停留时间</li>
              <li>AI 广告系统提高广告 ROI</li>
              <li>AI 生成广告素材降低商家门槛</li>
              <li>视觉搜索 + AI Shopping 增强购买转化</li>
            </ul>
          </div>
        </section>

        <Section title="1. 七年增长路径">
          <p>
            2020-2021 年属于 Pinterest 的疫情红利阶段，用户活跃度和广告需求快速提升。
            2022 年数字广告行业整体进入低谷，Pinterest 股价和增长预期也出现明显压缩。
          </p>

          <p>
            但从 2023 年开始，公司重新回到健康增长轨道：
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>收入恢复双位数增长</li>
            <li>Adjusted EBITDA 持续提升</li>
            <li>国际市场变现效率改善</li>
            <li>AI 广告能力开始体现</li>
          </ul>
        </Section>

        <Section title="2. 为什么 Pinterest 很适合 AI？">
          <p>
            Pinterest 是一个高度图片化的平台，而 AI 在图像理解、推荐系统、视觉搜索方面的能力非常强。
          </p>

          <p>
            相比很多纯聊天型 AI 应用，Pinterest 已经拥有：
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>全球大规模用户</li>
            <li>高购买意图流量</li>
            <li>成熟广告系统</li>
            <li>海量图片数据</li>
            <li>品牌广告主关系</li>
          </ul>

          <p>
            因此 AI 更像是对 Pinterest 商业化能力的“放大器”。
          </p>
        </Section>

        <Section title="3. 最关键的长期指标：国际 ARPU">
          <p>
            Pinterest 当前最大的长期机会，并不是用户数量，而是国际用户 monetization。
          </p>

          <p>
            美国和加拿大 ARPU 已经较成熟，但欧洲和 Rest of World 仍明显偏低。
            如果 Pinterest 能持续提升国际广告转化率，那么未来几年收入增长可能会持续超预期。
          </p>

          <p>
            这也是为什么市场越来越把 Pinterest 看成 AI 广告平台，而不是单纯社交媒体公司。
          </p>
        </Section>

        <Section title="4. 盈利能力正在发生变化">
          <p>
            从 Adjusted EBITDA 可以明显看到，Pinterest 已经从“高增长亏损互联网公司”，逐渐转向“具备经营杠杆的平台公司”。
          </p>

          <p>
            一旦收入继续增长，而成本增速低于收入，利润率会出现非常明显扩张。
          </p>

          <p>
            长期来看，市场真正会重新定价的，并不是收入本身，而是：
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>利润率</li>
            <li>自由现金流</li>
            <li>AI 广告效率</li>
            <li>国际 monetization</li>
          </ul>
        </Section>

        <Section title="5. 最大风险是什么？">
          <ul className="list-disc space-y-2 pl-6">
            <li>Meta/TikTok/Google 广告竞争</li>
            <li>广告行业周期波动</li>
            <li>国际市场增长不及预期</li>
            <li>AI 产品落地不达预期</li>
            <li>Stock-based compensation 稀释</li>
          </ul>

          <p>
            另外一个风险是市场叙事风险：
            如果投资者不再相信 Pinterest 可以成为 AI Shopping 平台，那么估值可能重新回到传统社交媒体框架。
          </p>
        </Section>

        <Section title="6. 五年展望">
          <p>
            保守情况下，Pinterest 仍有机会维持低双位数收入增长。
            Base Case 下，随着 AI 广告系统成熟，收入增速和利润率会同步提升。
          </p>

          <p>
            Bull Case 下，Pinterest 有机会从“图片社交平台”，升级为“AI 驱动的视觉购物入口”。
            如果国际 ARPU 持续提升，2030 年收入达到 100 亿美元以上并非不可能。
          </p>
        </Section>

        <Section title="7. 最终结论">
          <p>
            Pinterest 属于典型的“AI Application Layer”机会。
            它不像 Meta 或 Google 那样绝对垄断，但正因为如此，未来如果执行力持续改善，估值提升空间反而更大。
          </p>

          <p>
            长期最值得跟踪的指标包括：
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>季度收入增长</li>
            <li>Adjusted EBITDA Margin</li>
            <li>国际 ARPU</li>
            <li>Free Cash Flow</li>
            <li>AI 广告产品 adoption</li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
