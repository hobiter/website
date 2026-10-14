import { SOURCES } from "./operatingMetrics";
export const AUDIT = [
  {
    area: ["SEC history", "SEC 历史"],
    status: "partial",
    source: SOURCES.annual,
    note: [
      "Four available annual periods, six quarters. 2022 manual IPO-table extraction; some early balance fields unavailable. Recent rounded disclosures and older precise facts may produce small Q4 rounding differences.",
      "四个可得年度、六个季度；2022 手工 IPO 表格提取，早期资产负债缺项。较新取整披露与旧精确数据会使 Q4 有少量取整差。",
    ],
  },
  {
    area: ["GPU economics", "GPU 经济"],
    status: "partial",
    source: SOURCES.quarter,
    note: [
      "No complete utilization, per-GPU profitability, renewal-price or per-site return disclosure. Cost-of-revenue alone is not a fully burdened gross margin.",
      "无完整利用率、每 GPU 利润、续约价格或站点回报；仅收入成本不能代表完整毛利率。",
    ],
  },
  {
    area: ["Capex and operating measures", "投资与运营指标"],
    status: "complete",
    source: SOURCES.presentation,
    note: [
      "Cash capex and issuer capex shown separately. RPO/backlog reconciled; power and GPU qualifiers preserved. Historical GPU counts use IPO evidence.",
      "现金与公司投资口径分开，RPO/订单调节，电力与 GPU 量词保留；历史 GPU 数取 IPO 证据。",
    ],
  },
  {
    area: ["September transaction", "九月交易"],
    status: "complete",
    source: SOURCES.convertible,
    note: [
      "Final $4.2B issuance, $4.137B net before remaining expenses, $566.2M capped-call cost. Older marketing figures not used as final terms.",
      "采用最终 42 亿发行、费用扣除前剩余净所得 41.37 亿与 5.662 亿封顶看涨成本，不把旧营销数字当最终条款。",
    ],
  },
  {
    area: ["Current equity bridge", "当前股权桥接"],
    status: "needs-review",
    source: SOURCES.quarter,
    note: [
      "June balances plus known September issuance only. Not an October cash/debt reconciliation. Netting, capital payables, other draw/spend/repayment and remaining fees not fully modeled; outputs are scenario estimates, not certified current fair values.",
      "仅六月余额加已知九月发行，非十月现金债务核对。净额、资本应付、其他提款/支出/还款与剩余费用未完全建模；是情景估计，非认证当前公允价值。",
    ],
  },
  {
    area: ["Forecast timing", "预测时点"],
    status: "needs-review",
    source: SOURCES.outlook,
    note: [
      "June-anchored H2 stub and five/ten future full years. Comparison with October quote is approximate; no solved funding/covenant waterfall or GAAP forecast.",
      "六月锚定下半年部分加五/十个未来完整年度，与十月价格比较近似；无完整融资契约瀑布或 GAAP 预测。",
    ],
  },
  {
    area: ["Public valuation history", "公开估值历史"],
    status: "partial",
    source: SOURCES.market,
    note: [
      "No public prices before March 2025. FY2025 cap uses January 31, 2026 combined A/B share proxy with fiscal-end price; retrospective with look-ahead, not a point-in-time backtest.",
      "2025 年三月前无公开价格；FY2025 市值用次年一月三十一日 A/B 合计股数代理与年末价，含前视，不作时点回测。",
    ],
  },
];
export const QA = [
  [
    "Data provenance",
    "数据溯源",
    "pass",
    "Reported facts, manual 2022 audit and derived cash quarters are distinguished. / 区分报告、2022 手工核对与推导现金季度。",
  ],
  [
    "Economic claims",
    "经济索取权",
    "warning",
    "Partial pro-forma bridge; financing and capital payable reconciliation required. / 模拟桥接不完整，须核对融资与资本应付。",
  ],
  [
    "Forecast mechanics",
    "预测机制",
    "pass",
    "Negative FCFF retained; no duplicated deficit charge; r > g enforced. / 保留负 FCFF，不重复扣缺口，要求 r > g。",
  ],
  [
    "Deployment record",
    "发布记录",
    "warning",
    "See PR verification for executed build/browser checks. No automatic merge or deployment. / 实际构建浏览器检查见 PR，无自动合并或部署。",
  ],
];
