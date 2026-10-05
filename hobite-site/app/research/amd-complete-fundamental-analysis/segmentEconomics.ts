import { AMD_SOURCES } from "./operatingMetrics";
export const AMD_ECONOMICS = [
  {
    en: "Fabless production",
    zh: "无晶圆厂生产",
    enNote:
      "Owned PP&E capex is only part of reinvestment. Foundry wafers, advanced packaging, HBM and supplier prepayments sit in product costs and working capital. A smaller factory balance sheet does not mean unlimited or free capacity.",
    zhNote:
      "自有固定资产支出只是再投资的一部分。代工晶圆、先进封装、HBM 与供应商预付款进入产品成本和营运资本。较轻的厂房资产不代表产能无限或免费。",
    source: AMD_SOURCES.quarter,
  },
  {
    en: "Data Center mix",
    zh: "数据中心结构",
    enNote:
      "EPYC and Instinct are disclosed together with other data-center products. Standalone GPU revenue, GPU gross profit, customer-level realized pricing and accelerator unit shipments are not published in these tables; no synthetic profitability is assigned to HBM or Instinct.",
    zhNote:
      "EPYC 与 Instinct 等数据中心产品合并披露。这些表没有独立 GPU 收入、毛利、客户实际售价或加速器出货量，不推算 HBM 或 Instinct 单独盈利。",
    source: AMD_SOURCES.earnings,
  },
  {
    en: "Segment versus consolidated profit",
    zh: "分部与合并利润",
    enNote:
      "Segment operating income excludes All Other costs. Deduct $1.081B of All Other from Q2 segment profits to reach $1.990B GAAP EBIT. Separately, the adjusted EBIT bridge removes SBC, acquired amortization, acquisition costs and a legal contingency; it is not equivalent to owner cash.",
    zhNote:
      "分部营业利润不含其他类别成本。第二季分部利润扣除 10.81 亿美元其他成本，才是 19.90 亿美元 GAAP 营业利润。调整后利润桥另行加回股权激励、收购摊销、收购费用和法律准备，不等于股东现金。",
    source: AMD_SOURCES.earnings,
  },
  {
    en: "Customer incentives",
    zh: "客户激励",
    enNote:
      "OpenAI and Meta each have a conditional warrant for up to 160M shares at $0.01. Nothing vested at June 27. Milestone delivery and share-price conditions make the final issuance uncertain. Model incremental shares explicitly; future warrant accounting and commercial concessions may reduce revenue/margins beyond dilution.",
    zhNote:
      "OpenAI 和 Meta 各有最多 1.6 亿股、行权价 0.01 美元的附条件认股权证。6 月 27 日尚无归属。交付和股价等条件令最终发行不确定。模型单列增发压力；未来会计处理和商业让利还可能在稀释之外压低收入或利润。",
    source: AMD_SOURCES.quarter,
  },
  {
    en: "Capacity and investment obligations",
    zh: "产能与投资义务",
    enNote:
      "$30.276B procurement commitments and future leases/guarantees are not all current financial debt. The model represents ordinary supplier payments through cost and working capital, operating rent through EBIT, and reserves the full $5B conditional subsequent investment commitment once without adding speculative returns. Lease expansion, guarantee calls and prepayment timing can exceed modeled needs.",
    zhNote:
      "302.76 亿美元采购承诺及未来租赁、担保不全是当前金融债务。模型以成本和营运资本体现日常采购，以营业利润体现租金，并一次预留后续附条件投资承诺全额 50 亿美元，不假设投资回报。租赁扩张、担保触发及预付时间可能超出模型需求。",
    source: AMD_SOURCES.quarter,
  },
];
export const AMD_RISKS = [
  {
    en: "Software and adoption",
    zh: "软件与采用",
    enNote:
      "Track production deployments, ROCm support and repeat orders, not headline accelerator specifications alone.",
    zhNote: "跟踪生产部署、ROCm 支持和复购，而不只看加速器参数。",
  },
  {
    en: "Supplier and geopolitical exposure",
    zh: "供应链与地缘风险",
    enNote:
      "Foundry concentration, packaging/HBM constraints and export licensing can delay delivery or impair inventory.",
    zhNote: "代工集中、封装和 HBM 约束及出口许可可能延迟交付或造成库存减值。",
  },
  {
    en: "Funding and dilution",
    zh: "资金与稀释",
    enNote:
      "Monitor supplier prepayments, payables unwind, lease commitments, guarantees and warrant milestones together.",
    zhNote: "同时监测供应商预付、应付款回落、租赁承诺、担保和权证里程碑。",
  },
  {
    en: "Cyclical demand",
    zh: "需求周期",
    enNote:
      "CPU refreshes, consoles, embedded inventory and hyperscaler AI budgets do not follow one cycle.",
    zhNote: "CPU 更新、主机、嵌入式库存与大型云商 AI 预算不是同一个周期。",
  },
];
