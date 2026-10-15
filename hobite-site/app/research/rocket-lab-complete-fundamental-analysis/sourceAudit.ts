import { SOURCES as S } from "./operatingMetrics";
export const AUDIT = [
  {
    en: "Financial statements",
    zh: "财务报表",
    status: "complete",
    source: S.facts,
    noteEn:
      "FY2020-25 operating company, ten quarters through Q2 2026; field-level tags, dates and links. Pre-merger Vector accounts excluded.",
    noteZh:
      "2020-25 实体业务，至 2026 Q2 共十季；逐字段标签、日期、链接；剔除合并前 Vector 报表。",
  },
  {
    en: "Filing inventory",
    zh: "文件清单",
    status: "complete",
    source: S.submissions,
    noteEn:
      "SEC submissions through October 15; includes S-1, S-4/amendments, final prospectuses, 10-K/Q and 8-K. Earlier SPAC registrations are labeled inventory only.",
    noteZh:
      "截至 10 月 15 日 SEC 清单，含注册、并购及最终招股文件、年季报和临时报告；早期 SPAC 注册仅列入清单。",
  },
  {
    en: "Segment and launch economics",
    zh: "分部及发射经济",
    status: "complete",
    source: S.quarter,
    noteEn:
      "Manual extraction from annual and quarterly tables. Half-year and quarterly periods overlap; never sum together. Per-launch metrics are issuer definitions, not total segment revenue divided by missions.",
    noteZh:
      "人工摘录年季报；半年与季度重叠，不可相加；单次指标按公司定义，不以分部收入简单除任务数。",
  },
  {
    en: "Latest Neutron schedule",
    zh: "最新 Neutron 时间表",
    status: "complete",
    source: S.neutron,
    noteEn:
      "October 14 first-flight target 2027 supersedes Q4 2026; not a flight guarantee.",
    noteZh: "10 月 14 日首飞目标改为 2027 年，取代原 2026 Q4，非保证。",
  },
  {
    en: "Acquisition status and funding",
    zh: "收购进展及融资",
    status: "complete",
    source: S.financing,
    noteEn:
      "September financing supersedes original bridge commitment. Shareholder approval September 24 is not closing; mid-2027 remains conditional.",
    noteZh:
      "9 月融资取代原桥贷承诺；9 月 24 日股东批准不等于交割，2027 年中仍有条件。",
  },
  {
    en: "Current capital and merger valuation",
    zh: "当前资本及合并估值",
    status: "partial",
    source: S.prospectus,
    noteEn:
      "June-only standalone DCF bridge. ATM overlap, interim cash, current lease claims, awards/forwards, final consideration and Iridium financial model are not fully reconciled. No current target price or merger-adjusted upside claim.",
    noteZh:
      "仅采用 6 月独立 DCF 桥接；ATM 重叠、期间现金、流动租赁、奖励远期、最终对价与 Iridium 模型尚未完全调节，不声称当前目标价或并购上涨空间。",
  },
  {
    en: "Economic return on capital",
    zh: "经济资本回报",
    status: "partial",
    source: S.annual,
    noteEn:
      "Segment gross profit is disclosed; fully allocated segment EBIT, maintenance capex and lifetime Neutron investment returns are not. No fabricated ROIC or project IRR.",
    noteZh:
      "披露分部毛利，但未披露完整分摊 EBIT、维护资本开支或 Neutron 全周期回报，不编造 ROIC 或项目 IRR。",
  },
] as const;
