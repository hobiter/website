export type Copy = readonly [string, string];
type Scenario = readonly [growth: number, margin: number, shareGrowth: number, multiple: number];
type Chip = {
  name: string; slug: string; period: string; release: string; close: number; october: number;
  revenue: number; priorRevenue: number; gross: number; eps: number; priorEps: number;
  sources: readonly [Copy, string][]; facts: readonly [Copy, string][];
  thesis: Copy; guidance: Copy; drivers: Copy; risk: Copy;
  ytd: number; guidanceInModelCurrency: number; fiscal: number; shares: number;
  cases: readonly [Scenario, Scenario, Scenario];
  ads?: { ratio: number; twdPerUsd: number };
};

export const priceDate = "2026-11-27";
const tsmQ4Fx = 31.8;
export const chips = {
  TSM: {
    name: "TSMC", slug: "tsmc", period: "Q3 2026", release: "2026-10-15", close: 350.37, october: 406.13,
    revenue: 1494.24, priorRevenue: 989.92, gross: 66.4, eps: 29.43, priorEps: 17.44,
    facts: [[["IFRS operating margin", "IFRS 营业利润率"], "58.7%"], [["Diluted earnings per ADS", "每 ADS 稀释盈利"], "$4.60"], [["N2 / N3 / N5 share of wafer revenue", "N2／N3／N5 晶圆营收占比"], "8% / 33% / 28%"], [["October sales (monthly disclosure)", "10 月营收（月度披露）"], "NT$586.89B (+59.7% YoY)"]],
    thesis: ["The N2 ramp is now visible in recognized wafer revenue. The investment question is whether pricing and utilization offset the cost of expanding overseas fabs and advanced packaging.", "N2 放量已经体现在确认的晶圆营收中。投资判断的关键，是定价和稼动率能否抵消海外工厂和先进封装扩产的成本。"],
    guidance: ["Q4 revenue of $52.3–54.3B, gross margin of 65–67%, and operating margin of 56.5–58.5%; management assumes NT$31.80 per USD.", "第四季度营收指引为 523–543 亿美元，毛利率 65%–67%，营业利润率 56.5%–58.5%；假设 1 美元兑 31.80 新台币。"],
    drivers: ["Leading nodes were 79% of wafer revenue at N7 and below. Watch how N2 mix, yield and utilization flow through to margins: an expensive wafer is not necessarily a more profitable wafer during ramp. CoWoS qualification supports throughput but announced capacity is not delivered product.", "7 纳米及以下占晶圆营收 79%。应跟踪 N2 组合、良率和稼动率如何影响利润：爬坡期单片售价高，单片利润不一定更高。CoWoS 认证有助于提升产出，但公告产能不等于实际交付。"],
    risk: ["Nine-month operating cash flow reached NT$2.402T. Compare its growth against cash fab investment and depreciation, not simply net income. Monitor overseas margin dilution, customer concentration and Taiwan exposure. A weaker Taiwan dollar reduces USD ADS value at unchanged local earnings.", "前九个月经营现金流达 2.402 万亿新台币。判断回报时要同时看现金建厂支出和折旧，而不是只看净利润。观察海外厂利润稀释、客户集中及台湾地域风险；在本币盈利不变时，新台币走弱将压低美元 ADS 估值。"],
    ytd: 3898.727, guidanceInModelCurrency: 53.3 * tsmQ4Fx, fiscal: 2026, shares: 25.93,
    cases: [[.05,.36,0,15], [.135,.47,0,23], [.20,.52,0,29]],
    ads: { ratio: 5, twdPerUsd: tsmQ4Fx },
    sources: [
      [["Quarterly results, statements and outlook","季度业绩、财务报表及指引"],"https://investor.tsmc.com/english/quarterly-results/2026/q3"],
      [["Monthly sales and year-to-date baseline","月度营收及年初至今数据"],"https://investor.tsmc.com/english/monthly-revenue/2026"],
    ],
  },
  NVDA: {
    name: "NVIDIA", slug: "nvidia", period: "Q3 FY2027", release: "2026-11-17", close: 150.49, october: 204.64,
    revenue: 115.844, priorRevenue: 57.006, gross: 74.8, eps: 2.70, priorEps: 1.30,
    facts: [[["Data Center revenue","数据中心营收"],"$107.6B (+110% YoY)"],[["GAAP operating income","GAAP 营业利润"],"$77.520B"],[["Operating cash / company-defined FCF","经营现金流／公司口径自由现金流"],"$48.253B / $43.777B"],[["Cash returned through buybacks and dividends","回购及股息返还"],"$28.1B"]],
    thesis: ["Revenue more than doubled year over year as Data Center approached 93% of sales. The price reset improves the starting yield; it does not remove hyperscaler, supply or platform-transition risks.", "营收同比翻倍以上，数据中心接近总营收的 93%。股价回调改善起始估值，但没有移除云厂商客户集中、供应和平台切换风险。"],
    guidance: ["Q4 revenue of $130B ±3%, with 71–72% gross margin and no China Data Center compute revenue assumed.", "第四季度营收指引为 1,300 亿美元、上下浮动 3%，毛利率 71%–72%；指引未计入中国数据中心计算收入。"],
    drivers: ["Vera Rubin has begun shipping. Follow accepted racks and sustained deployment, not just orders or reservations. CUDA and libraries support portability across NVIDIA systems, but customer ASICs can still win high-volume, stable workloads. Monitor sequential gross margin during the transition.", "Vera Rubin 已开始出货。应关注机柜验收和持续部署，而非只看订单和预留。CUDA 与软件库提高 NVIDIA 平台内的可移植性，但客户自研 ASIC 仍可能赢得量大且稳定的负载。跟踪切换期间的毛利率环比变化。"],
    risk: ["The quarter's $43.777B FCF follows NVIDIA's definition, including specified equipment/intangible principal payments; do not annualize it mechanically. Separate recurring operating profit from investment gains. NVIDIA disclosed Huang's reinstatement separately after earnings; the governance event is not evidence that shipment or demand changed.", "本季 437.77 亿美元自由现金流使用 NVIDIA 口径，扣除特定设备／无形资产本金支付，不宜机械年化。区分经常性营业利润与投资收益。黄仁勋复任在财报后另行披露，人事变化不是交付或需求变化的证据。"],
    ytd: 293.681, guidanceInModelCurrency: 130, fiscal: 2027, shares: 24.186,
    cases: [[.02,.35,0,14], [.125,.48,-.006,22], [.205,.54,-.01,30]],
    sources: [
      [["Q3 FY2027 disclosure and cash-flow reconciliation","2027 财年 Q3 披露及现金流调节"],"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/default.aspx"],
      [["Quarterly earnings filing Form 8-K","季度业绩申报 8-K"],"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000088/nvda-20261117.htm"],
      [["CEO reinstatement Form 8-K","CEO 复任 8-K"],"https://www.sec.gov/Archives/edgar/data/1045810/000104581026000090/nvda-20261122.htm"],
    ],
  },
  AVGO: {
    name: "Broadcom", slug: "broadcom", period: "Q3 FY2026", release: "2026-09-02", close: 312.34, october: 326.08,
    revenue: 29.591, priorRevenue: 15.952, gross: 69, eps: 2.68, priorEps: .85,
    facts: [[["AI semiconductor revenue (subset)","AI 半导体营收（子项）"],"$16.7B (+221% YoY)"],[["Semiconductors / infrastructure software","半导体／基础设施软件"],"$20.839B / $8.752B"],[["Operating cash / free cash flow","经营现金流／自由现金流"],"$14.197B / $13.665B"],[["GAAP / adjusted operating margin","GAAP／调整后营业利润率"],"53.9% / 67.9%"]],
    thesis: ["Custom accelerators and AI networking are driving the mix, while infrastructure software remains material. The cash generation is real; its durability depends on design renewals, contract terms and enterprise software retention.", "定制加速器和 AI 网络推动结构变化，基础设施软件仍占重要地位。现金创造能力已体现，但其持续性取决于设计续单、合同条款以及企业软件客户留存。"],
    guidance: ["Q4 guidance: $34.8B total revenue, $21.7B AI semiconductor revenue and ~66% adjusted operating margin. Q4 was scheduled for December 9 and had not been reported at this cutoff.", "第四季度指引：总营收 348 亿美元，AI 半导体营收 217 亿美元，调整后营业利润率约 66%。第四季度财报计划于 12 月 9 日发布，本截点尚未公布。"],
    drivers: ["A custom XPU design win can generate multiyear silicon and networking revenue, but deployments are concentrated and design cycles can reset market share. Separate chip volumes, networking attach and customer-specific pricing. AI revenue is part of Semiconductor Solutions, not incremental to it.", "定制 XPU 设计定点可能带来多年芯片与网络营收，但部署集中，换代可能重置市场份额。应拆分芯片出货、网络搭售与客户定价。AI 营收是半导体解决方案的一部分，不能重复加总。"],
    risk: ["Infrastructure software is not all recurring VMware revenue. License recognition and the timing of customer cash receipts can diverge. Watch renewals, free cash flow after capex, acquisition-related amortization, stock compensation and debt service before applying a software multiple to the group.", "基础设施软件不是全部经常性 VMware 营收；授权确认与回款时间可能不同。给集团套用软件估值前，需跟踪续约、资本开支后现金流、收购相关摊销、股权激励和偿债。"],
    ytd: 71.089, guidanceInModelCurrency: 34.8, fiscal: 2026, shares: 4.884,
    cases: [[.03,.30,.005,16], [.135,.43,0,24], [.20,.49,-.005,32]],
    sources: [
      [["Q3 FY2026 earnings release and guidance","2026 财年 Q3 财报及指引"],"https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial"],
      [["Quarterly Form 10-Q","季度 10-Q"],"https://www.sec.gov/Archives/edgar/data/1730168/000173016826000080/avgo-20260802.htm"],
      [["Fiscal fourth quarter reporting calendar","第四财季发布日程"],"https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announce-fourth-quarter-and-fiscal-year-2026"],
    ],
  },
  AMD: {
    name: "AMD", slug: "amd", period: "Q3 FY2026", release: "2026-11-03", close: 424.54, october: 504.80,
    revenue: 13.377, priorRevenue: 9.246, gross: 54, eps: 1.46, priorEps: .75,
    facts: [[["Data Center revenue","数据中心营收"],"$8.5B (+97% YoY)"],[["Client & Gaming / Embedded","客户端及游戏／嵌入式"],"$3.7B / $1.1B"],[["Continuing-operations cash flow / FCF","持续经营现金流／自由现金流"],"$1.202B / $0.554B"],[["GAAP / adjusted diluted EPS","GAAP／调整后稀释 EPS"],"$1.46 / $2.09"]],
    thesis: ["MI450 and EPYC helped nearly double Data Center sales. The hurdle is to turn rack deployment into repeat customer purchases, GAAP margins and cash after investment and dilution.", "MI450 和 EPYC 推动数据中心营收接近翻倍。估值真正的门槛，是能否把机柜部署转为重复采购、GAAP 利润及投资与摊薄之后的现金回报。"],
    guidance: ["Q4 revenue of approximately $17B ±3%, and about 55% adjusted gross margin. The margin figure is not GAAP.", "第四季度营收约 170 亿美元，上下浮动 3%，调整后毛利率约 55%，不是 GAAP 口径。"],
    drivers: ["EPYC and Instinct contribute to the same Data Center segment; the segment is not a GPU-only proxy. Follow repeat Helios deployments, ROCm performance and operating reliability at customer scale. Reported Q3 free cash flow was only about 4% of revenue; compare the nine-month trend rather than assuming that one quarter defines normalized conversion.", "EPYC 与 Instinct 同属数据中心分部；不能将整个分部视为 GPU 收入。跟踪 Helios 复购、ROCm 表现和客户规模下的可靠性。本季自由现金流仅约占收入 4%，应结合九个月趋势，不能用单季定义正常现金转化。"],
    risk: ["The filing reports $13.3B of not-yet-commenced data-center lease payments expected to be assigned or subleased, not unconditional recovery. Taalas and World Labs were announced as pending transactions in the filing; their economics and customer warrants can affect funding and dilution. The scenarios do not separately book pending deal revenue.", "10-Q 披露尚未起租的数据中心租约未来付款合计 133 亿美元，预期转让或转租，并不保证回收。申报时 Taalas 和 World Labs 为待完成交易，并购及客户权证可影响融资和摊薄。情景未单列计入待完成并购收入。"],
    ytd: 35.166, guidanceInModelCurrency: 17, fiscal: 2026, shares: 1.66,
    cases: [[.065,.15,.018,19], [.20,.25,.012,29], [.31,.34,.008,40]],
    sources: [
      [["Q3 FY2026 earnings release and FCF bridge","2026 财年 Q3 财报及自由现金流调节"],"https://ir.amd.com/news-events/press-releases/detail/1303/amd-reports-third-quarter-2026-financial-results"],
      [["Quarterly Form 10-Q and commitments","季度 10-Q 与承诺事项"],"https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000191/amd-20260926.htm"],
    ],
  },
} satisfies Record<string, Chip>;

export type Ticker = keyof typeof chips;
export const revenueAnchor = (chip: Chip) => chip.ytd + chip.guidanceInModelCurrency;
function usdFactor(chip: Chip) {
  return chip.ads ? chip.ads.ratio / chip.ads.twdPerUsd : 1;
}
export function project(chip: Chip, [growth,margin,dilution,multiple]: Scenario, years: number) {
  const sales = revenueAnchor(chip) * (1 + growth) ** years;
  const income = sales * margin;
  const eps = income / (chip.shares * (1 + dilution) ** years) * usdFactor(chip);
  const value = eps * multiple;
  return { sales, income, eps, value, annualized: (value / chip.close) ** (1 / years) - 1 };
}
export function requiredGrowth(chip: Chip, returnRate: number, years: number) {
  const [,margin,dilution,multiple] = chip.cases[1];
  return (chip.close * (1 + returnRate) ** years * chip.shares * (1 + dilution) ** years /
    (revenueAnchor(chip) * margin * multiple * usdFactor(chip))) ** (1 / years) - 1;
}
