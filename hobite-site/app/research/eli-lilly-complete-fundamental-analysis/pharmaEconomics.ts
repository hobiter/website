import { LLY_SOURCES as s } from "./operatingMetrics";
export const LLY_ECONOMICS = [
  {
    en: "Revenue is not prescriptions",
    zh: "收入不等于处方数",
    bodyEn:
      "Reported sales are net of rebates, discounts and returns, and include collaboration income. Geography, channel inventory and retrospective estimates change realized revenue. No patient count, net price per prescription or product-level profit is inferred.",
    bodyZh:
      "报告收入扣除返利、折扣与退货，并含合作收入。地域、渠道库存和历史估计调整会改变实现收入。不推算患者数、每张处方净价或单品利润。",
    source: s.quarter,
  },
  {
    en: "Two brands, one molecule",
    zh: "两个品牌、同一分子",
    bodyEn:
      "Mounjaro and Zepbound are both tirzepatide franchises. Different indications and market labels do not remove shared clinical, manufacturing and competitive exposure. Analyze their combined concentration, not seven independent product bets.",
    bodyZh:
      "Mounjaro 与 Zepbound 都属于替尔泊肽。不同适应证与市场标签不能消除共同的临床、生产及竞争风险。应分析合计集中度，而不是把品牌当作独立投资。",
    source: s.earnings,
  },
  {
    en: "Pipeline replacement costs cash",
    zh: "管线替换需要现金",
    bodyEn:
      "Internal R&D is expensed. Acquired IPR&D charges may be added back in CFO while purchase cash is investing. Our normalized-margin forecast excludes those charges and subtracts a recurring 5% revenue cash reserve without a tax shield. It is not a disclosed budget; failure and full business acquisitions can cost more.",
    bodyZh:
      "内部研发费用化。购入 IPR&D 费用可在经营现金中加回，但购买现金列投资活动。模型从规范化利润率剔除这些费用，再扣收入 5% 的持续现金预留，不计税盾。它不是披露预算；失败和完整企业收购可能耗费更多。",
    source: s.quarter,
  },
  {
    en: "Capacity is not immediately productive",
    zh: "产能不会立即兑现",
    bodyEn:
      "New facilities require commissioning, qualification and utilization. Inventory and receivables tie up cash before sales mature. Forecast capex remains 10% of sales initially, then 7% and 4.5%; D&A is 2.5%, so terminal net reinvestment stays positive.",
    bodyZh:
      "新设施需投产、认证及利用率爬升；库存和应收在销售成熟前占用现金。模型初期资本开支为收入 10%，之后 7% 与 4.5%；折旧摊销 2.5%，终值净再投资始终为正。",
    source: s.quarter,
  },
  {
    en: "Patent life versus terminal value",
    zh: "专利期限与终值",
    bodyEn:
      "A perpetual terminal value belongs to a renewing research platform, not an immortal drug. Bear stresses franchise erosion, base moderates growth and margins, bull assumes successful renewal. No molecule receives a guaranteed approval date or a clinical probability in this aggregate model.",
    bodyZh:
      "永久终值属于能够更新的研发平台，而不是永不过期的药品。悲观情景压测产品衰退，基准放缓增长与利润率，乐观假设成功更新。汇总模型不赋予单一分子必然获批时间或临床概率。",
    source: s.annual,
  },
];
export const LLY_RISKS = [
  {
    en: "Access and net-price pressure",
    zh: "准入与净价压力",
    enText:
      "Volume expansion can coexist with price erosion and one-time rebate benefits. Coverage rules, cash-pay channels and government negotiations alter economics.",
    zhText:
      "销量扩张可与净价下降、一次性返利收益并存。医保规则、自费渠道与政府谈判改变经济回报。",
  },
  {
    en: "Concentration and renewal",
    zh: "集中度与更新",
    enText:
      "Shared tirzepatide exposure, patent challenges, clinical setbacks and rival oral/injectable products can impair durable growth.",
    zhText:
      "替尔泊肽共同风险、专利挑战、临床挫折及竞争口服/注射产品可损害持久增长。",
  },
  {
    en: "Capital allocation and leverage",
    zh: "资本配置与杠杆",
    enText:
      "Acquisition cash, manufacturing commitments and shareholder distributions compete for liquidity. Headline FCF does not measure all of those claims.",
    zhText:
      "收购现金、制造投入及股东分配争夺流动性；表面自由现金流无法衡量全部支出。",
  },
  {
    en: "Execution, safety and valuation",
    zh: "执行、安全与估值",
    enText:
      "Quality disruptions and safety findings can affect a correlated franchise. A high valuation leaves limited room for cash conversion or launch delays.",
    zhText:
      "质量中断与安全发现可能影响相关产品群；高估值给现金转化不及预期及上市延迟留下的空间有限。",
  },
];
