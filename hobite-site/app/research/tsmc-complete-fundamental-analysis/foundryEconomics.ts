import { TSM_SOURCES } from "./operatingMetrics";
export const TSM_CONCENTRATION = [
  { year: 2023, largest: 25, second: 11, topTen: 70 },
  { year: 2024, largest: 22, second: 12, topTen: 76 },
  { year: 2025, largest: 19, second: 17, topTen: 78 },
];
export const TSM_ECONOMICS = [
  {
    en: "Leading-edge nodes",
    zh: "先进制程",
    metric: "77%",
    enNote:
      "Q2 2026 wafer revenue at 7 nm and below; wafer revenue is a different denominator from consolidated platform revenue.",
    zhNote:
      "2026 年第二季度 7 纳米及以下占晶圆收入 77%，与合并收入平台占比的分母不同。",
    source: TSM_SOURCES.release,
  },
  {
    en: "Wafer shipment",
    zh: "晶圆出货",
    metric: "4,336K",
    enNote:
      "Q2 2026 12-inch-equivalent wafers. Revenue/wafer is a mix proxy, not disclosed wafer ASP or yield.",
    zhNote:
      "第二季度出货 433.6 万片十二英寸等效晶圆；收入除以出货量只是组合代理，不代表披露的晶圆售价或良率。",
    source: TSM_SOURCES.presentation,
  },
  {
    en: "Inventory days",
    zh: "存货周转天数",
    metric: "87",
    enNote:
      "Up from 80 days in Q1 and 76 days a year earlier; monitor ramp inventory and cash absorption.",
    zhNote:
      "高于第一季度的 80 天及上年同期的 76 天；跟踪新制程爬坡备货及其现金占用。",
    source: TSM_SOURCES.presentation,
  },
  {
    en: "Customer concentration",
    zh: "客户集中度",
    metric: "78%",
    enNote:
      "Top ten share of FY2025 revenue. Largest two were 19% and 17%; do not assign anonymous customer identities.",
    zhNote:
      "2025 年前十大客户收入占比 78%，前两大分别为 19% 和 17%；不推测未具名客户的身份。",
    source: TSM_SOURCES.annual,
  },
  {
    en: "Equipment payables",
    zh: "设备及工程应付款",
    metric: "NTD 290.850B",
    enNote:
      "June 2026 balance. Cash capex and asset additions need not coincide; payables can defer cash consumption.",
    zhNote:
      "2026 年六月余额为 2,908.50 亿新台币；现金资本支出与资产增加并非同一时点，应付款可延后现金流出。",
    source: TSM_SOURCES.fullInterim,
  },
  {
    en: "Utilization / CoWoS yield",
    zh: "产能利用率 / CoWoS 良率",
    metric: "N/A",
    enNote:
      "No consistently disclosed company-wide numeric utilization or packaging yield series is manufactured here.",
    zhNote: "不编造未持续披露的公司整体利用率或先进封装良率序列。",
    source: TSM_SOURCES.quarterly,
  },
];
export const TSM_RISKS = [
  {
    en: "Taiwan disruption",
    zh: "台湾生产中断",
    enWatch:
      "Geopolitics, power/water, earthquakes, logistics and insurance exclusions; model discontinuity outside a normal DCF.",
    zhWatch:
      "地缘政治、电力及水资源、地震、物流与保险例外；极端中断应在正常 DCF 之外判断。",
  },
  {
    en: "AI demand concentration",
    zh: "AI 需求集中",
    enWatch:
      "Customer capex, advanced packaging orders, inventory days and wafer mix; HPC is not exclusively AI.",
    zhWatch:
      "客户资本预算、先进封装订单、库存天数及晶圆组合；高性能计算不等同于纯 AI。",
  },
  {
    en: "Overseas economics",
    zh: "海外工厂经济性",
    enWatch:
      "Ramp timing, labor and equipment costs, subsidy conditions and depreciation; geographical diversification is not immediate margin protection.",
    zhWatch:
      "爬坡时点、劳动力与设备成本、补贴条件及折旧；地域分散并不立即保护利润率。",
  },
  {
    en: "Competition and execution",
    zh: "竞争与执行",
    enWatch:
      "Qualified yield, performance per watt, process design kits, packaging and customer qualification; compare like-for-like nodes, not marketing labels.",
    zhWatch:
      "合格良率、能效、工艺设计工具、封装与客户认证；比较实际能力而非节点营销名称。",
  },
  {
    en: "FX and export controls",
    zh: "汇率及出口管制",
    enWatch:
      "Revenue conversion, foreign costs, hedges and customer eligibility; ADS pricing can depart from local-share FX parity.",
    zhWatch:
      "收入换算、海外成本、套期保值及客户资格；ADS 价格可能偏离本地股票的汇率平价。",
  },
];
