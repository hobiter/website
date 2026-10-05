import { MU_SOURCES } from "./memoryEconomics";
export const MU_AUDIT = [
  {
    area: "Filed financial history / 已申报财务历史",
    status: "complete",
    en: "FY2011-2025 annuals and 63 filed/derived quarters through FY2026 Q3; SEC USD facts with field-level provenance, fiscal duration filters and YTD/Q4 differences. FY2013/2014 OCF uses continuing-operations tags.",
    zh: "2011—2025 财年年报及截至 2026 财年第三季度的 63 个已申报或差分季度，SEC 美元单位，逐字段来源、财年时长筛选及 YTD/Q4 差分。2013/2014 年经营现金使用持续经营标签。",
    source: MU_SOURCES.facts,
  },
  {
    area: "Latest release / 最新公告",
    status: "partial",
    en: "FY2026 and Q4 are September 30 unaudited GAAP release rows. Latest audited annual is FY2025; FY2026 10-K was not available at cutoff. Curated snapshot is versioned; regeneration does not automatically extract new releases.",
    zh: "2026 财年及第四季度为 9 月 30 日未经审计 GAAP 公告数据。最新审计年度仍为 2025 财年，截止日尚无 2026 财年 10-K。快照有版本记录，更新脚本不会自动抽取新公告。",
    source: MU_SOURCES.release,
  },
  {
    area: "Cash conventions / 现金口径",
    status: "complete",
    en: "Show gross-capex FCF and issuer adjusted FCF separately. Customer deposits are financing; no inclusion in OCF or FCF. Forecast gross capex has no assumed recurring subsidy.",
    zh: "总资本支出口径 FCF 与公司调整后 FCF 分开。客户存款为融资，不计入经营现金或 FCF；预测不假设持续补贴。",
    source: MU_SOURCES.release,
  },
  {
    area: "Balance-sheet continuity / 余额连续性",
    status: "partial",
    en: "Parent equity differs from total equity in older years. Retain the disclosed balance outside reported equity as an arithmetic residual, not inferred debt; FY2014 original 10-K reports $57M redeemable convertible notes. Historical EV is debt/cash-only context, not an exhaustive takeover bridge.",
    zh: "较早年度母公司权益与总权益不同。保留报告权益外的余额差额，不推定为债务；2014 年原始 10-K 列示 5,700 万美元可赎回可转换票据。历史 EV 仅为债务与现金口径背景，不是完整收购估值桥。",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
  },
  {
    area: "Operating economics / 经营经济",
    status: "partial",
    en: "Four business units, Q4/Q3/prior-Q4 revenue and latest rounded margins. Do not splice old segment definitions or invent HBM-only margins, yields or contract-by-contract economics. Q4 segment rounding/unallocated gap: $6M.",
    zh: "四个业务单位，第四/第三季度及上年第四季度收入、最新舍入利润率。不拼接旧分部定义，不编造 HBM 独立利润率、良率或逐合同经济性。第四季度舍入或未分配差额为 600 万美元。",
    source: MU_SOURCES.release,
  },
  {
    area: "Valuation / 估值",
    status: "partial",
    en: "Fiscal-end local common-share closes, not calendar-end prices; actual spot shares only where filed. FY2026 historical ratios remain N/A without fiscal-end outstanding shares. Latest quote is October 2. Model shares and balances are dated proxies, not live values.",
    zh: "采用财年末普通股收盘价而非自然年末，只有申报的时点股数才用于历史倍数。2026 财年末流通股数缺失，历史倍数保留 N/A。最新报价为 10 月 2 日，模型股数与余额是有日期代理而非实时值。",
    source: "https://finance.yahoo.com/quote/MU/history/",
  },
];
