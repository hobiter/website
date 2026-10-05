export const SKHY_QA = [
  {
    area: "Data and unit checks / 数据与单位检查",
    status: "pass",
    en: "16 annual rows, 62 quarterly rows, KRW conversion, issuer anchors, reviewed statements and explicit 10-ADS-per-common ratio are tested.",
    zh: "已测试 16 个年度数据、62 个季度数据、韩元换算、公司主要数据、经审阅报表及每普通股 10 份 ADS 比例。",
  },
  {
    area: "Model checks / 模型检查",
    status: "pass",
    en: "FCFF, terminal reinvestment, nonnegative WACC-growth spread, post-IPO net-cash bridge and sensitivity direction are tested.",
    zh: "已测试 FCFF、终值再投资、WACC 与增长率差额、IPO 后净现金桥及敏感性方向。",
  },
  {
    area: "Bilingual and mirror / 双语与镜像",
    status: "pass",
    en: "English and Chinese pages share the same dated source facts; all SKHY page modules and route mappings are checked on both sites. The repository-wide legacy parity suite still reports unrelated pre-existing mismatches.",
    zh: "中英文页面共用同一组有日期的来源数据；两站的 SKHY 页面模块及路由映射均已核验。全仓旧有镜像检查仍会报告与 SKHY 无关的既存差异。",
  },
  {
    area: "Boundaries / 研究边界",
    status: "warning",
    en: "K-IFRS and older issuer release precision vary. Pro-forma IPO cash is not a post-offering audited balance. Forecasts are analyst assumptions, not company guidance. No personalized investment advice.",
    zh: "K-IFRS 历史口径及旧公告精度存在差异。IPO 备考现金并非发行后经审计余额。预测属于分析师假设，而非公司指引。本报告不构成个性化投资建议。",
  },
];
