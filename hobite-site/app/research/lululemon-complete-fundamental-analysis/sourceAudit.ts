import { SOURCES } from "./operatingMetrics";
export const AUDIT = [
  {
    area: ["Financial history", "财务历史"],
    status: "complete",
    source: SOURCES.annual,
    note: [
      "FY2015-25 and Q1 2020-Q2 2026. Each SEC fact retains tag, dates and accession-linked source. Cash fallback includes restricted cash; not assumed freely distributable.",
      "FY2015-25 与 2020Q1-2026Q2；每个 SEC 数据保留标签、日期及文件来源。现金备用标签含受限现金，不假设可全部分配。",
    ],
  },
  {
    area: ["Retail operations", "零售运营"],
    status: "partial",
    source: SOURCES.annual,
    note: [
      "FY2024/25 and Q2 FY2026 snapshots. Undisclosed store profit, CAC, retention and country margins remain absent.",
      "仅 FY2024/25 和 2026Q2 快照；未披露单店利润、获客成本、留存及各国利润率，不估造。",
    ],
  },
  {
    area: ["Current normalization", "当期调节"],
    status: "complete",
    source: SOURCES.release,
    note: [
      "Narrow refund removal, not comprehensive adjusted results; cash-flow repurchase tags differ from headline buyback cost because of settlement/tax conventions.",
      "仅剔除退款，非完整调整财务；现金流回购标签与公告成本因结算/税务口径可能不同。",
    ],
  },
  {
    area: ["Market valuation", "市场估值"],
    status: "partial",
    source: SOURCES.market,
    note: [
      "Fiscal-end closing prices; diluted weighted shares approximate market cap. Historical table has reporting look-ahead. Refresh script blocks publication if splits require reconciliation.",
      "财年末收盘价与稀释加权股数估算市值；历史表有报告前视。若发现拆股，更新脚本阻止发布直至核对。",
    ],
  },
  {
    area: ["Management", "管理层"],
    status: "complete",
    source: SOURCES.leadership,
    note: [
      "October 7 announcement reviewed; October 26 appointments are not yet effective at cutoff.",
      "核对十月七日公告；截至研究日，十月二十六日任命尚未生效。",
    ],
  },
  {
    area: ["Forecast", "预测"],
    status: "needs-review",
    source: SOURCES.release,
    note: [
      "Independent assumptions; no consensus probabilities or precise enterprise-value claim. All cash held as reserve. Model excludes FY2026 stub and does not forecast GAAP statements.",
      "独立假设，无一致预期概率或精确企业价值主张。现金保留为储备；未预测 FY2026 剩余部分或完整 GAAP 报表。",
    ],
  },
];
export const PUBLICATION_QA = [
  [
    "SEC source coverage",
    "SEC 来源覆盖",
    "pass",
    "Field-level provenance plus explicit Q4/YTD derivations. / 数据溯源及 Q4/YTD 推导。",
  ],
  [
    "Model convention",
    "模型口径",
    "pass",
    "Direct equity owner cash; no double-counted leases, cash or buybacks. / 直接股权现金，不重复计租赁、现金与回购。",
  ],
  [
    "Operating history",
    "运营历史",
    "warning",
    "Selected snapshots, not a full country/customer database. / 精选快照，不是完整地域客户库。",
  ],
  [
    "Valuation precision",
    "估值精度",
    "warning",
    "Weighted shares and assumed margins; not investment advice. / 加权股数与假设利润率，非投资建议。",
  ],
  [
    "Build and browser record",
    "构建与浏览器记录",
    "warning",
    "See PR verification record for executed checks; this table does not self-certify a future deployment. / 实际检查以 PR 记录为准，不认证未来部署。",
  ],
];
