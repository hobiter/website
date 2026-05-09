import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest (PINS) 7-Year Fundamental Analysis",
  description:
    "Pinterest quarterly revenue, adjusted EBITDA, margin charts, five-year outlook, and long-form fundamental analysis.",
};

type QuarterRow = {
  quarter: string;
  revenue: number;
  adjustedEbitda: number;
};

type ScenarioRow = {
  year: string;
  conservative: number;
  base: number;
  bull: number;
};

const QUARTERLY_DATA: QuarterRow[] = [
  { quarter: "2020 Q1", revenue: 0.272, adjustedEbitda: -0.053 },
  { quarter: "2020 Q2", revenue: 0.272, adjustedEbitda: -0.034 },
  { quarter: "2020 Q3", revenue: 0.443, adjustedEbitda: 0.093 },
  { quarter: "2020 Q4", revenue: 0.706, adjustedEbitda: 0.299 },
  { quarter: "2021 Q1", revenue: 0.485, adjustedEbitda: 0.084 },
  { quarter: "2021 Q2", revenue: 0.613, adjustedEbitda: 0.178 },
  { quarter: "2021 Q3", revenue: 0.633, adjustedEbitda: 0.201 },
  { quarter: "2021 Q4", revenue: 0.847, adjustedEbitda: 0.351 },
  { quarter: "2022 Q1", revenue: 0.575, adjustedEbitda: 0.077 },
  { quarter: "2022 Q2", revenue: 0.666, adjustedEbitda: 0.092 },
  { quarter: "2022 Q3", revenue: 0.685, adjustedEbitda: 0.143 },
  { quarter: "2022 Q4", revenue: 0.877, adjustedEbitda: 0.196 },
  { quarter: "2023 Q1", revenue: 0.603, adjustedEbitda: 0.113 },
  { quarter: "2023 Q2", revenue: 0.708, adjustedEbitda: 0.185 },
  { quarter: "2023 Q3", revenue: 0.763, adjustedEbitda: 0.185 },
  { quarter: "2023 Q4", revenue: 0.981, adjustedEbitda: 0.365 },
  { quarter: "2024 Q1", revenue: 0.740, adjustedEbitda: 0.172 },
  { quarter: "2024 Q2", revenue: 0.854, adjustedEbitda: 0.251 },
  { quarter: "2024 Q3", revenue: 0.898, adjustedEbitda: 0.242 },
  { quarter: "2024 Q4", revenue: 1.154, adjustedEbitda: 0.471 },
  { quarter: "2025 Q1", revenue: 0.855, adjustedEbitda: 0.192 },
  { quarter: "2025 Q2", revenue: 0.998, adjustedEbitda: 0.251 },
  { quarter: "2025 Q3", revenue: 1.049, adjustedEbitda: 0.306 },
  { quarter: "2025 Q4", revenue: 1.318, adjustedEbitda: 0.522 },
  { quarter: "2026 Q1", revenue: 1.008, adjustedEbitda: 0.207 },
];

const OUTLOOK: ScenarioRow[] = [
  { year: "2026E", conservative: 4.85, base: 5.05, bull: 5.25 },
  { year: "2027E", conservative: 5.45, base: 5.95, bull: 6.35 },
  { year: "2028E", conservative: 6.10, base: 7.00, bull: 7.75 },
  { year: "2029E", conservative: 6.85, base: 8.20, bull: 9.45 },
  { year: "2030E", conservative: 7.70, base: 9.60, bull: 11.50 },
];

const SUMMARY_CARDS = [
  { label: "2025 Revenue", value: "$4.22B", note: "Scale is now large enough to support durable operating leverage." },
  { label: "2025 Adj. EBITDA", value: "$1.27B", note: "Profitability has recovered from the 2022 reset." },
  { label: "2026 Q1 Revenue", value: "$1.01B", note: "Crossed the $1B quarterly revenue mark early in the year." },
  { label: "Core thesis", value: "AI + Shopping", note: "Visual discovery, intent data, and ad automation drive the upside case." },
];

function margin(row: QuarterRow) {
  return (row.adjustedEbitda / row.revenue) * 100;
}

function formatBillions(value: number) {
  return `$${value.toFixed(value >= 10 ? 1 : 2)}B`;
}

function BarChart({
  title,
  subtitle,
  data,
  valueAccessor,
  valueSuffix = "",
  valuePrefix = "",
}: {
  title: string;
  subtitle: string;
  data: QuarterRow[];
  valueAccessor: (row: QuarterRow) => number;
  valueSuffix?: string;
  valuePrefix?: string;
}) {
  const width = 1120;
  const height = 440;
  const paddingLeft = 60;
  const paddingRight = 24;
  const paddingTop = 42;
  const paddingBottom = 78;
  const values = data.map(valueAccessor);
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barGap = 5;
  const barWidth = chartWidth / data.length - barGap;
  const zeroY = paddingTop + ((maxValue - 0) / range) * chartHeight;
  const ticks = Array.from({ length: 5 }, (_, index) => minValue + (range / 4) * index);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[980px] w-full" role="img" aria-label={title}>
          {ticks.map((tick) => {
            const y = paddingTop + ((maxValue - tick) / range) * chartHeight;
            return (
              <g key={tick}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e4e4e7" strokeDasharray="4 4" />
                <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[11px]">
                  {valuePrefix}{tick.toFixed(valueSuffix === "%" ? 0 : 1)}{valueSuffix}
                </text>
              </g>
            );
          })}
          <line x1={paddingLeft} y1={zeroY} x2={width - paddingRight} y2={zeroY} stroke="#a1a1aa" />
          {data.map((row, index) => {
            const value = valueAccessor(row);
            const x = paddingLeft + index * (barWidth + barGap) + 2;
            const y = paddingTop + ((maxValue - Math.max(value, 0)) / range) * chartHeight;
            const barHeight = Math.abs((value / range) * chartHeight);
            const actualY = value >= 0 ? y : zeroY;
            return (
              <g key={row.quarter}>
                <rect x={x} y={actualY} width={barWidth} height={Math.max(2, barHeight)} rx="4" className="fill-zinc-900" opacity={value >= 0 ? 0.9 : 0.35} />
                {index % 2 === 0 && (
                  <text x={x + barWidth / 2} y={height - 36} textAnchor="end" transform={`rotate(-45 ${x + barWidth / 2} ${height - 36})`} className="fill-zinc-500 text-[10px]">
                    {row.quarter.replace("20", "'").replace(" Q", "Q")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function OutlookChart() {
  const width = 900;
  const height = 380;
  const padding = 54;
  const values = OUTLOOK.flatMap((row) => [row.conservative, row.base, row.bull]);
  const maxValue = Math.ceil(Math.max(...values));
  const minValue = 0;

  function points(key: keyof Pick<ScenarioRow, "conservative" | "base" | "bull">) {
    return OUTLOOK.map((row, index) => {
      const x = padding + (index / (OUTLOOK.length - 1)) * (width - padding * 2);
      const y = height - padding - ((row[key] - minValue) / (maxValue - minValue)) * (height - padding * 2);
      return `${x},${y}`;
    }).join(" ");
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Five-year revenue outlook</h2>
      <p className="mt-2 text-sm text-zinc-600">Illustrative scenario model, not a price target. The key variable is international ARPU expansion.</p>
      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] w-full" role="img" aria-label="Pinterest five-year revenue outlook">
          {[0, 3, 6, 9, 12].map((tick) => {
            const y = height - padding - (tick / maxValue) * (height - padding * 2);
            return (
              <g key={tick}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e4e4e7" strokeDasharray="4 4" />
                <text x={padding - 10} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[11px]">${tick}B</text>
              </g>
            );
          })}
          <polyline fill="none" stroke="#71717a" strokeWidth="3" points={points("conservative")} />
          <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points("base")} />
          <polyline fill="none" stroke="#16a34a" strokeWidth="3" points={points("bull")} />
          {OUTLOOK.map((row, index) => {
            const x = padding + (index / (OUTLOOK.length - 1)) * (width - padding * 2);
            return (
              <text key={row.year} x={x} y={height - padding + 24} textAnchor="middle" className="fill-zinc-500 text-[12px]">{row.year}</text>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />Conservative</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />Base</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-600" />Bull</span>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-zinc-700 leading-7">{children}</div>
    </section>
  );
}

export default function PinsFundamentalAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">Equity Research</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Pinterest (PINS) 7-Year Fundamental Analysis
          </h1>
          <p className="mt-5 max-w-4xl text-lg text-zinc-600">
            A long-form research page covering quarterly revenue, adjusted EBITDA, margin progression, AI-driven monetization, competitive position, risks, and a five-year outlook.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Data note: Pinterest IPO was in 2019. Quarterly public-company data begins meaningfully from 2020; figures are rounded to billions of USD for readability.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {SUMMARY_CARDS.map((card) => (
            <div key={card.label} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-zinc-500">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold">{card.value}</p>
              <p className="mt-3 text-sm text-zinc-600">{card.note}</p>
            </div>
          ))}
        </div>

        <BarChart
          title="Quarterly Revenue"
          subtitle="Revenue rose from a sub-$300M pandemic-era quarter to more than $1B per quarter, with clear Q4 seasonality."
          data={QUARTERLY_DATA}
          valueAccessor={(row) => row.revenue}
          valuePrefix="$"
        />

        <BarChart
          title="Quarterly Adjusted EBITDA"
          subtitle="Adjusted EBITDA turned structurally positive after 2020 and expanded as revenue recovered, ad systems improved, and cost discipline strengthened."
          data={QUARTERLY_DATA}
          valueAccessor={(row) => row.adjustedEbitda}
          valuePrefix="$"
        />

        <BarChart
          title="Quarterly Adjusted EBITDA Margin"
          subtitle="Margins are seasonal, but the normalized direction shows a move from reset to operating leverage."
          data={QUARTERLY_DATA}
          valueAccessor={margin}
          valueSuffix="%"
        />

        <OutlookChart />

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="1. Business model">
            <p>
              Pinterest is best understood as a visual discovery and shopping-intent platform, not a traditional social network. Users often arrive before a purchase decision: home design, wedding planning, fashion, beauty, recipes, travel, and lifestyle inspiration. This gives Pinterest a commercial intent layer that is structurally different from passive entertainment feeds.
            </p>
            <p>
              The company monetizes primarily through advertising. The most important long-term drivers are monthly active users, ad load, ad relevance, conversion measurement, auction density, and average revenue per user. AI matters because it can improve targeting, creative generation, bidding, personalization, and product matching at the same time.
            </p>
          </Section>

          <Section title="2. Seven-year operating arc">
            <p>
              The 2020-2021 period showed rapid pandemic-era engagement and ad recovery. 2022 was a reset year as digital advertising slowed, growth normalized, and investors repriced unprofitable or low-margin internet names. 2023-2025 showed a healthier phase: revenue growth resumed, adjusted EBITDA improved, and Pinterest shifted from user-growth story to monetization-and-efficiency story.
            </p>
            <p>
              The key observation from the quarterly bars is that Q4 is consistently the strongest quarter, reflecting holiday retail demand. The investment question is whether Q1-Q3 can continue stepping higher each year, not only whether Q4 spikes.
            </p>
          </Section>

          <Section title="3. Revenue quality">
            <p>
              Revenue quality is improving because Pinterest has already built global scale. The biggest remaining lever is not simply adding users; it is monetizing existing users better. U.S. and Canada monetization is mature relative to Europe and Rest of World, which creates a long runway if the company can close part of that ARPU gap.
            </p>
            <p>
              This is why Pinterest can be a more interesting AI application candidate than many smaller consumer apps: it already has distribution, intent data, advertiser relationships, and a product surface where AI can directly influence ad ROI.
            </p>
          </Section>

          <Section title="4. Profitability and margins">
            <p>
              Adjusted EBITDA margin has become the most important proof point. Pinterest has demonstrated that it can grow while producing meaningful adjusted EBITDA. The margin chart also shows cyclicality: Q4 tends to be strongest, while Q1 is often lower. Investors should evaluate trailing-twelve-month margin rather than one quarter in isolation.
            </p>
            <p>
              Long term, the base case assumes 30%-plus adjusted EBITDA margin is achievable if revenue compounds at a mid-teens pace and infrastructure, R&D, sales, and G&A do not grow as fast as revenue.
            </p>
          </Section>

          <Section title="5. AI and product strategy">
            <p>
              The AI thesis has three layers. First, better recommendation models increase engagement and save user time. Second, AI-powered ad products improve conversion and advertiser ROI. Third, generative creative tools can make it easier for small and mid-sized advertisers to create campaigns, which increases auction density.
            </p>
            <p>
              Pinterest has a natural right to win in visual search because the product is already image-native. If the company can become a shopping discovery layer between inspiration and purchase, the multiple can expand from small social platform toward higher-quality ad platform.
            </p>
          </Section>

          <Section title="6. Competitive position">
            <p>
              Pinterest competes with Meta, Google, TikTok, Amazon, Snap, and retail media networks for ad dollars. Its advantage is that users often come with planning intent rather than pure entertainment intent. Its disadvantage is smaller scale, lower time spent, and weaker direct commerce infrastructure compared with Amazon or TikTok Shop.
            </p>
            <p>
              The moat is not absolute. The company needs continuous product improvement, advertiser tools, measurement, and shopping integrations. The upside case requires Pinterest to become a more measurable performance-ad channel, not just a brand-awareness channel.
            </p>
          </Section>

          <Section title="7. Five-year outlook">
            <p>
              Conservative case: revenue grows low-double-digits, international ARPU improves slowly, and adjusted EBITDA margin stays around the high-20s to low-30s. Base case: revenue compounds in the mid-teens, AI ad tools lift conversion, and adjusted EBITDA margin trends into the low-to-mid 30s. Bull case: Pinterest becomes a scaled AI shopping discovery platform, international monetization closes faster, and revenue approaches or exceeds $11B by 2030.
            </p>
            <p>
              The bull case does not require Pinterest to beat Meta or Google. It only requires Pinterest to become meaningfully better at converting its own high-intent visual discovery traffic into measurable advertiser outcomes.
            </p>
          </Section>

          <Section title="8. Key risks">
            <p>
              The biggest risks are ad-budget cyclicality, execution risk in AI products, slower international ARPU growth, competition from Meta/TikTok/Amazon, and dilution from stock-based compensation. Another risk is narrative risk: if investors stop believing Pinterest can be a shopping platform, the stock can trade like a niche social-media company.
            </p>
            <p>
              Watch for revenue growth deceleration below low-teens, weakening Q4 seasonality, falling adjusted EBITDA margin, or user growth without ARPU growth. Those would signal that monetization is not keeping pace with the AI thesis.
            </p>
          </Section>

          <Section title="9. Investment conclusion">
            <p>
              Pinterest is a higher-risk but potentially attractive AI application-layer compounder. The company has real scale, improving profitability, and a credible path to monetization upside through AI-driven advertising and shopping discovery. It is not as dominant as Meta or Google, but that is exactly why the upside can be larger if execution improves.
            </p>
            <p>
              The most important metrics to monitor are quarterly revenue growth, Europe and Rest of World ARPU, adjusted EBITDA margin, free cash flow, stock-based compensation, and advertiser adoption of AI-powered performance products.
            </p>
          </Section>
        </div>

        <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold">Quarterly data table</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-600">
                  <th className="py-3 pr-5">Quarter</th>
                  <th className="py-3 pr-5">Revenue</th>
                  <th className="py-3 pr-5">Adjusted EBITDA</th>
                  <th className="py-3 pr-5">Adjusted EBITDA Margin</th>
                </tr>
              </thead>
              <tbody>
                {QUARTERLY_DATA.map((row) => (
                  <tr key={row.quarter} className="border-b border-zinc-100">
                    <td className="py-3 pr-5 font-medium">{row.quarter}</td>
                    <td className="py-3 pr-5">{formatBillions(row.revenue)}</td>
                    <td className="py-3 pr-5">{formatBillions(row.adjustedEbitda)}</td>
                    <td className="py-3 pr-5">{margin(row).toFixed(1)}%</td>
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
