import { MU_RELEASE } from "./operatingMetrics";
export const MU_SOURCES = {
  annual:
    "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
  quarter:
    "https://www.sec.gov/Archives/edgar/data/723125/000072312526000015/mu-20260528.htm",
  release: MU_RELEASE.source,
  ir: "https://investors.micron.com/financials/quarterly-results/default.aspx",
  facts: "https://data.sec.gov/api/xbrl/companyfacts/CIK0000723125.json",
};
export const MU_CASH_BRIDGE = [MU_RELEASE.annual, MU_RELEASE.quarter].map(
  (r, i) => ({
    period: i ? "FY2026 Q4" : "FY2026",
    operatingCash: r.operatingCashFlow / 1000,
    grossCapex: r.capex / 1000,
    sales: r.capexSaleProceeds / 1000,
    incentives: r.governmentIncentives / 1000,
    grossFcf: (r.operatingCashFlow - r.capex) / 1000,
    netCapex: (r.capex - r.capexSaleProceeds - r.governmentIncentives) / 1000,
    adjustedFcf:
      (r.operatingCashFlow -
        r.capex +
        r.capexSaleProceeds +
        r.governmentIncentives) /
      1000,
  }),
);
export const MU_ECONOMICS = [
  {
    en: "HBM is not all cloud revenue",
    zh: "HBM 不等于全部云业务",
    enNote:
      "Cloud Memory includes HBM and other cloud DRAM. Do not assign its entire revenue or rounded segment margin to HBM.",
    zhNote:
      "云业务同时包括 HBM 和其他云端 DRAM，不把整个分部收入或舍入利润率都归于 HBM。",
    source: MU_SOURCES.annual,
  },
  {
    en: "Qualification and supply",
    zh: "认证与供给",
    enNote:
      "Packaging and customer qualification constrain usable output; a wafer-capacity announcement does not establish salable bits or yield.",
    zhNote:
      "封装与客户认证约束可交付产量，晶圆产能公告不能证明可销售位元数量或良率。",
    source: MU_SOURCES.annual,
  },
  {
    en: "Contract durability",
    zh: "合同持续性",
    enNote:
      "Q3 filing describes multi-year take-or-pay agreements with fixed or bounded pricing for many contracts; some remain market-priced. This improves visibility, not immunity to customer credit or execution risk.",
    zhNote:
      "第三季度申报披露多年度照付不议合同，多数采用固定价格或价格区间，部分仍随市定价。可见度改善不等于消除客户信用或执行风险。",
    source: MU_SOURCES.quarter,
  },
  {
    en: "Funding is not earnings",
    zh: "融资不是盈利",
    enNote:
      "FY2026 customer deposits of $12.747B are financing inflows. A $12.895B noncurrent delivery obligation remains; do not add deposits to FCF or treat all cash as permanently surplus.",
    zhNote:
      "2026 财年客户存款 127.47 亿美元属于融资流入，仍有 128.95 亿美元非流动交付义务。不把存款加入自由现金流，也不把全部现金当作永久闲置资金。",
    source: MU_SOURCES.release,
  },
  {
    en: "Cash cost versus subsidy",
    zh: "现金成本与补贴",
    enNote:
      "Gross cash PP&E and incentive-adjusted investment are different measures. Model gross reinvestment; do not extrapolate a past subsidy receipt as a recurring terminal source.",
    zhNote:
      "现金购建固定资产总额与补贴调整后投资不同。模型使用总额再投资，不把历史补贴收款外推为永续现金来源。",
    source: MU_SOURCES.release,
  },
];
export const MU_RISKS = [
  {
    en: "Memory pricing",
    zh: "存储定价",
    enNote:
      "Watch DRAM/NAND price trends, unit growth, inventory and customer procurement. Pricing gains can reverse faster than fab spending.",
    zhNote:
      "跟踪 DRAM/NAND 定价、销量、库存与客户采购，价格收益逆转可能快于工厂支出调整。",
  },
  {
    en: "HBM execution",
    zh: "HBM 执行",
    enNote:
      "Monitor customer qualification, yields and usable packaging capacity; independent numerical yield series are unavailable here.",
    zhNote: "跟踪客户认证、良率及可用封装产能，本数据库没有独立数值良率序列。",
  },
  {
    en: "Supply response",
    zh: "供给响应",
    enNote:
      "Samsung and SK hynix investment and product qualification could reduce scarcity premiums. Do not infer their economics from Micron margins.",
    zhNote:
      "三星与 SK 海力士投资及产品认证可能降低稀缺溢价，不能由美光利润率推断竞争对手经济性。",
  },
  {
    en: "Funding and geography",
    zh: "融资与地域",
    enNote:
      "Customer commitments, government conditions, export controls and regional construction costs can change the timing and recoverability of cash.",
    zhNote:
      "客户承诺、政府条件、出口管制及区域建设成本可能改变现金时点和可回收性。",
  },
];
