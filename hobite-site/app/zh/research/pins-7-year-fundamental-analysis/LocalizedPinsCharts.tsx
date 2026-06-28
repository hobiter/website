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

function margin(row: QuarterRow) {
  return (row.adjustedEbitda / row.revenue) * 100;
}

function chartValue(row: QuarterRow, metric: "revenue" | "adjustedEbitda" | "margin") {
  if (metric === "margin") return margin(row);
  return row[metric];
}

function BarChart({
  title,
  subtitle,
  metric,
  prefix = "",
  suffix = "",
}: {
  title: string;
  subtitle: string;
  metric: "revenue" | "adjustedEbitda" | "margin";
  prefix?: string;
  suffix?: string;
}) {
  const width = 1120;
  const height = 440;
  const paddingLeft = 62;
  const paddingRight = 24;
  const paddingTop = 42;
  const paddingBottom = 78;
  const values = QUARTERLY_DATA.map((row) => chartValue(row, metric));
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barGap = 5;
  const barWidth = chartWidth / QUARTERLY_DATA.length - barGap;
  const zeroY = paddingTop + ((maxValue - 0) / range) * chartHeight;
  const ticks = Array.from({ length: 5 }, (_, index) => minValue + (range / 4) * index);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[980px] w-full" role="img" aria-label={title}>
          {ticks.map((tick) => {
            const y = paddingTop + ((maxValue - tick) / range) * chartHeight;
            return (
              <g key={tick}>
                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e4e4e7" strokeDasharray="4 4" />
                <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[11px]">
                  {prefix}{tick.toFixed(suffix === "%" ? 0 : 1)}{suffix}
                </text>
              </g>
            );
          })}
          <line x1={paddingLeft} y1={zeroY} x2={width - paddingRight} y2={zeroY} stroke="#a1a1aa" />
          {QUARTERLY_DATA.map((row, index) => {
            const value = chartValue(row, metric);
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

  function points(key: keyof Pick<ScenarioRow, "conservative" | "base" | "bull">) {
    return OUTLOOK.map((row, index) => {
      const x = padding + (index / (OUTLOOK.length - 1)) * (width - padding * 2);
      const y = height - padding - (row[key] / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    }).join(" ");
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">未来五年收入展望</h2>
      <p className="mt-2 text-sm text-zinc-600">情景模型，不是目标价。核心变量是国际 ARPU 和 AI 广告效率。</p>
      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px] w-full" role="img" aria-label="Pinterest 未来五年收入展望">
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
            return <text key={row.year} x={x} y={height - padding + 24} textAnchor="middle" className="fill-zinc-500 text-[12px]">{row.year}</text>;
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />保守</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />Base Case</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-600" />Bull Case</span>
      </div>
    </section>
  );
}

export default function LocalizedPinsCharts() {
  return (
    <div className="space-y-8">
      <BarChart title="季度收入" subtitle="收入从疫情早期的低基数逐步增长到单季 10 亿美元以上，并呈现明显 Q4 旺季特征。" metric="revenue" prefix="$" />
      <BarChart title="季度 Adjusted EBITDA" subtitle="2020 年后 Adjusted EBITDA 结构性转正，广告系统改善和成本纪律带来经营杠杆。" metric="adjustedEbitda" prefix="$" />
      <BarChart title="季度 Adjusted EBITDA Margin" subtitle="利润率有明显季节性，但长期方向是从低谷修复到稳定经营杠杆。" metric="margin" suffix="%" />
      <OutlookChart />
    </div>
  );
}
