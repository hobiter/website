import { TSM_SOURCES as s } from "./operatingMetrics";
export const TSM_AUDIT = [
  {
    area: "Annual IFRS / 年度 IFRS",
    status: "complete",
    url: s.annual,
    en: "2015–2025: SEC IFRS facts plus FY2025 original XBRL instance, exact TWD units and undimensioned consolidated contexts; field-level provenance retained. RevenueFromContractsWithCustomers precedes Revenue.",
    zh: "2015—2025 年：SEC IFRS 公司事实及 2025 年原始 XBRL 实例；筛选准确新台币单位及无维度合并上下文，保留逐字段来源。优先使用客户合同收入标签。",
  },
  {
    area: "Annual history / 年度历史",
    status: "partial",
    url: s.facts,
    en: "No pre-2015 rows in this verified database. No fabricated pre-2013 accounting continuity. ROE uses year-end parent equity. IFRS 16 adoption in 2019 changes lease cash classification.",
    zh: "此核验数据库未纳入 2015 年以前数据，不编造 2013 年前会计连续性。ROE 采用年末归母权益；2019 年 IFRS 16 改变租赁现金分类。",
  },
  {
    area: "Quarterly / 季度",
    status: "partial",
    url: s.quarterly,
    en: "Ten quarters: 2024 Q1–2026 Q2, issuer TIFRS, NTD-million rounding. Q1 2025 income derives from H1 comparison minus Q2; cash = 2025 local annual minus Q2–Q4. EPS stays null for that derived row. Earlier quarterly history not included.",
    zh: "十个季度：2024 年第一季度至 2026 年第二季度，发行人 TIFRS、新台币百万单位舍入。2025 年第一季度利润为半年对比减第二季度；现金为本地全年减第二至第四季度，该行 EPS 保留空值。未纳入更早季度。",
  },
  {
    area: "Accounting bridge / 会计口径",
    status: "complete",
    url: s.annual,
    en: "FY2025 SEC IFRS parent net income NTD 1,697.604B / EPS 65.47 differs from issuer local TIFRS NTD 1,717.883B / EPS 66.25. Do not sum local quarters against IFRS annual net income. Latest-quarter TTM uses local quarters only.",
    zh: "2025 年 SEC IFRS 归母净利 16,976.04 亿新台币、EPS 65.47，与本地 TIFRS 的 17,178.83 亿及 EPS 66.25 不同。不可拿本地季度净利润总和对比 IFRS 全年；滚动四季仅用本地季度。",
  },
  {
    area: "Operating metrics / 经营指标",
    status: "complete",
    url: s.presentation,
    en: "Q2 2026 node/platform mix, wafers, days and balance sheet verified. Platform revenue is not a profit segment; HPC is not exclusively AI. No invented utilization or packaging-yield series.",
    zh: "核验第二季度节点、平台、出货量、周转天数及资产负债表。平台收入不是利润分部，HPC 不是纯 AI；不编造利用率或封装良率。",
  },
  {
    area: "Monthly / 月度",
    status: "complete",
    url: s.monthly,
    en: "January–August 2026 only, unaudited; September and Q3 earnings not reported by cutoff.",
    zh: "仅 2026 年 1—8 月未经审计数据；截止日尚未披露 9 月及第三季度财报。",
  },
  {
    area: "Valuation / 估值",
    status: "partial",
    url: s.presentation,
    en: "Analyst FCFF and lease convention, five shares per ADS and fixed FX disclosed. June balances dated; only cash added. Market series uses TWSE ordinary shares, year-end price and ex-post IFRS annual data, not an investable backtest. Unknown historical shares leave ratios null.",
    zh: "披露分析师 FCFF、租赁口径、每 ADS 五股及固定汇率。余额截至六月，仅加入现金。本地历史估值采用年末价格、普通股股数及事后 IFRS 全年数据，不是可交易回测；未知股数对应估值留空。",
  },
];
