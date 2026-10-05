import { LLY_SOURCES as s } from "./operatingMetrics";
export const LLY_AUDIT = [
  {
    en: "SEC inventory",
    zh: "SEC 申报清单",
    status: "complete",
    enNote:
      "374 electronic 10-K/Q/8-K and S-1 forms including amendments. Not a paper-era IPO archive.",
    zhNote: "374 份电子 10-K/Q/8-K 与 S-1（含修订）；不是纸质时代上市档案。",
    source: s.results,
  },
  {
    en: "Financial history",
    zh: "历史财务",
    status: "partial",
    enNote:
      "15 annuals and 62 quarters through Q2 2026. Core sources and derived facts are traced. Older capex, standalone IPR&D, share and operating fields may be N/A; accounting perimeter changed.",
    zhNote:
      "15 个年度与截至 2026 第二季的 62 个季度。来源和推导可追溯；早期资本开支、独立 IPR&D、股数及营业字段可能缺失，历史范围变化。",
    source: s.annual,
  },
  {
    en: "Latest evidence",
    zh: "最新证据",
    status: "complete",
    enNote:
      "Q2 release/10-Q anchors, product/geography revenue, GAAP operating and adjusted-net bridges, H1 investing-classified cash expenditure verified. Product/geography totals can differ by $1M rounding.",
    zhNote:
      "已核验第二季公告与 10-Q、产品地域收入、GAAP 营业及调整净利润桥、上半年投资分类现金支出。产品地域可有百万美元舍入差异。",
    source: s.quarter,
  },
  {
    en: "Pipeline and competition",
    zh: "管线与竞争",
    status: "partial",
    enNote:
      "August filings plus September EASD issuer update and Novo Q2 material. Retatrutide remains investigational. No trial-level probability model, complete patent schedule or clinical efficacy ranking.",
    zhNote:
      "八月申报、九月 EASD 公司更新及诺和诺德第二季材料。Retatrutide 仍为研究药物；未提供试验级概率、完整专利表或疗效排名。",
    source: s.september,
  },
  {
    en: "Market and valuation",
    zh: "市场与估值",
    status: "complete",
    enNote:
      "Dated Yahoo daily closes; no splits in retrieved interval. Ratios join annuals ex post with participating end-shares when available. DCF uses dated Q2 diluted-share proxy; noncurrent strategic investments excluded.",
    zhNote:
      "Yahoo 日收盘价有日期，取得区间无拆股。历史比率事后匹配参与期末股数（若可得）。DCF 采用第二季稀释股数代理，排除长期战略投资。",
    source: "https://finance.yahoo.com/quote/LLY/history/",
  },
  {
    en: "Forecast conventions",
    zh: "预测约定",
    status: "partial",
    enNote:
      "Independent aggregate scenarios, not issuer guidance. Normalized margins exclude acquired IPR&D/special charges but retain internal R&D/SBC/rent; recurring pipeline cash reserve deducted once. No full deal-by-deal M&A, rebate-liability run-off or current cash bridge.",
    zhNote:
      "独立汇总情景，非公司指引。规范化利润率剔除购入 IPR&D/特殊费用，但保留内部研发、股权激励及租金；持续管线现金预留仅扣一次。未完整建模逐笔收购、返利余额释放或当前现金桥。",
    source: s.earnings,
  },
];
