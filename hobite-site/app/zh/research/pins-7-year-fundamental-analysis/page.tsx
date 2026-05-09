import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest（PINS）七年基本面分析",
  description: "Pinterest 七年收入、Adjusted EBITDA、利润率、AI 商业化与五年前景深度研究。",
};

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
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">中文研究</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                Pinterest（PINS）七年基本面深度分析
              </h1>
            </div>

            <a
              href="/research/pins-7-year-fundamental-analysis"
              className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm"
            >
              EN English
            </a>
          </div>

          <p className="mt-5 max-w-4xl text-lg text-zinc-600">
            从收入增长、Adjusted EBITDA、利润率、AI 商业化、国际 ARPU，到未来五年增长空间，对 Pinterest 进行完整长期投资分析。
          </p>
        </header>

        <Section title="投资核心结论">
          <p>
            Pinterest 并不是传统意义上的社交媒体平台，它更像是一个“视觉搜索 + 消费决策入口”。用户进入 Pinterest 时，很多时候已经带有明确消费意图：家居、装修、婚礼、旅行、穿搭、美妆、菜谱等。
          </p>

          <p>
            AI 的加入，会让 Pinterest 的商业模式发生质变：AI 推荐、AI 广告系统、AI Shopping、视觉搜索，将持续提高广告 ROI 与转化率。
          </p>
        </Section>

        <Section title="1. 七年增长路径">
          <p>
            2020-2021 年属于 Pinterest 的疫情红利阶段，用户活跃度和广告需求快速提升。2022 年数字广告行业整体进入低谷，Pinterest 股价和增长预期也出现明显压缩。
          </p>

          <p>
            但从 2023 年开始，公司重新回到健康增长轨道：收入恢复双位数增长、Adjusted EBITDA 持续提升、国际市场 monetization 改善、AI 广告能力开始体现。
          </p>
        </Section>

        <Section title="2. 为什么 Pinterest 很适合 AI？">
          <p>
            Pinterest 是一个高度图片化的平台，而 AI 在图像理解、推荐系统、视觉搜索方面的能力非常强。
          </p>

          <p>
            相比很多纯聊天型 AI 应用，Pinterest 已经拥有全球大规模用户、高购买意图流量、成熟广告系统以及海量图片数据，因此 AI 更像是对 Pinterest 商业化能力的“放大器”。
          </p>
        </Section>

        <Section title="3. 国际 ARPU 是长期核心变量">
          <p>
            Pinterest 当前最大的长期机会，并不是用户数量，而是国际用户 monetization。美国和加拿大 ARPU 已经较成熟，但欧洲和 Rest of World 仍明显偏低。
          </p>

          <p>
            如果 Pinterest 能持续提升国际广告转化率，那么未来几年收入增长可能会持续超预期。
          </p>
        </Section>

        <Section title="4. 盈利能力变化">
          <p>
            从 Adjusted EBITDA 可以明显看到，Pinterest 已经从“高增长亏损互联网公司”，逐渐转向“具备经营杠杆的平台公司”。
          </p>

          <p>
            长期来看，市场真正会重新定价的，并不是收入本身，而是利润率、自由现金流、AI 广告效率，以及国际 monetization 的提升。
          </p>
        </Section>

        <Section title="5. 风险因素">
          <ul className="list-disc space-y-2 pl-6">
            <li>Meta/TikTok/Google 广告竞争</li>
            <li>广告行业周期波动</li>
            <li>国际市场增长不及预期</li>
            <li>AI 产品落地不达预期</li>
            <li>Stock-based compensation 稀释</li>
          </ul>
        </Section>

        <Section title="6. 五年展望">
          <p>
            保守情况下，Pinterest 仍有机会维持低双位数收入增长。Base Case 下，随着 AI 广告系统成熟，收入增速和利润率会同步提升。
          </p>

          <p>
            Bull Case 下，Pinterest 有机会从“图片社交平台”，升级为“AI 驱动的视觉购物入口”。如果国际 ARPU 持续提升，2030 年收入达到 100 亿美元以上并非不可能。
          </p>
        </Section>

        <Section title="最终结论">
          <p>
            Pinterest 属于典型的“AI Application Layer”机会。它不像 Meta 或 Google 那样绝对垄断，但正因为如此，未来如果执行力持续改善，估值提升空间反而更大。
          </p>

          <p>
            长期最值得跟踪的指标包括：季度收入增长、Adjusted EBITDA Margin、国际 ARPU、Free Cash Flow，以及 AI 广告产品 adoption。
          </p>
        </Section>
      </div>
    </main>
  );
}
