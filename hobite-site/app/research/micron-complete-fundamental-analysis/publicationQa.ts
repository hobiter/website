export const MU_QA = [
  {
    area: "Financial/model invariants / 财务及模型恒等式",
    status: "pass",
    en: "Fiscal flow reconciliation, release anchors, unit filtering, capex/FCF bridges, terminal reinvestment and DCF monotonicity passed on October 4.",
    zh: "10 月 4 日财年现金流勾稽、公告锚点、单位筛选、资本支出与 FCF 桥、永续再投资和 DCF 单调性验证通过。",
  },
  {
    area: "Production builds and mirror / 生产构建与镜像",
    status: "pass",
    en: "Both production builds and 14-file mirror parity passed on October 4. SVIM reports bundle-size warnings for its main bundle and lazy research module. Implementation is verified locally, not yet deployed.",
    zh: "10 月 4 日两个生产构建及 14 文件镜像一致性通过。SVIM 主包和研究懒加载模块有体积警告。已完成本地验证，尚未部署。",
  },
  {
    area: "Browser verification / 浏览器核验",
    status: "pass",
    en: "Both sites and languages checked at 1280px and 390px: library discovery, translation links, section anchors, 12 charts and contained wide tables passed.",
    zh: "两个站点中英文均完成 1280px 和 390px 检查：研究库入口、语言链接、章节导航、12 张图表和宽表格内部溢出通过。",
  },
  {
    area: "Coverage limitations / 覆盖限制",
    status: "warning",
    en: "Latest fiscal year is unaudited. Some older balance/debt facts are unavailable; no synthesized yield, share count or HBM profitability. Market history is ex-post, not tradeable historical information.",
    zh: "最新财年未经审计，部分旧余额和债务字段缺失。不合成良率、股数或 HBM 盈利。市场历史为事后比较，不是历史时点可交易信息。",
  },
];
