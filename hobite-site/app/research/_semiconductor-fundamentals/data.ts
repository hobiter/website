type Copy = [string, string];
type Row = [period: string, revenue: number, eps: number, operatingCash?: number, investment?: number];
type Scenario = [growth: number, netMargin: number, annualShareChange: number, multiple: number];
type Report = {
  name: string; ticker: string; slug: string; currency: "EUR" | "USD"; price: number; octoberClose: number; quote: string;
  basis: Copy; annual: Row[]; quarterly: Row[]; annualSource: string; latestSource: string; supplemental?: string;
  release: string; gross: number; guidance: Copy; shares: number; modelRevenue: number; modelStart: number;
  scenarios: [Scenario, Scenario, Scenario]; thesis: Copy; metrics: [Copy, string][]; sections: [Copy, Copy][];
};

export const reports: Report[] = [
  {
    name: "ASML", ticker: "ASML", slug: "asml-complete-fundamental-analysis", currency: "EUR", price: 1131.60, octoberClose: 1412.80,
    quote: "https://makkler.com/labs/markets/symbol/asml-as/history",
    basis: ["US GAAP basic EPS; Amsterdam ordinary share", "美国 GAAP 基本每股盈利；阿姆斯特丹普通股"],
    annual: [["2023", 27.559, 19.91, 5.443, 2.196], ["2024", 28.263, 19.25, 11.166, 2.083], ["2025", 32.667, 24.73, 12.659, 1.631]],
    quarterly: [["Q3 2025", 7.516, 5.49], ["Q2 2026", 9.326, 7.59], ["Q3 2026", 11.662, 12.95]],
    annualSource: "https://www.sec.gov/Archives/edgar/data/937966/000162828026011378/asml-20251231.htm",
    supplemental: "https://www.asml.com/en/investors/annual-report/2025",
    latestSource: "https://www.investor.asml.com/news-releases/news-release-details/asml-reports-eu11.7-billion-total-net-sales-and-eu5.0-billion-net-income-q3-2026",
    release: "2026-10-14", gross: 57.5, guidance: ["FY2026 sales €44–45B and ~56% gross margin; Q4 sales €14.2–15.2B.", "2026 年营收 440–450 亿欧元、毛利率约 56%；第四季度营收 142–152 亿欧元。"],
    shares: .383, modelRevenue: 44.5, modelStart: 2026,
    scenarios: [[.03,.29,0,19],[.095,.35,-.009,29],[.145,.395,-.012,37]],
    thesis: ["The scarce asset is qualified EUV throughput, not just scanner shipments. Upgrades monetize installed machines, while High-NA economics turn on the cost per good patterned wafer.", "稀缺的是通过量产验证的 EUV 曝光能力，不只是出货台数。升级可变现存量设备；High-NA 能否普及，取决于每片合格图形晶圆的成本。"],
    metrics: [[["Installed base sales","装机基础管理收入"],"€3.289B"],[["New / used lithography systems sold","新／二手光刻系统销量"],"113 / 8"],[["Cash and short-term investments","现金及短期投资"],"€12.735B"]],
    sections: [
      [["Technology and moat","技术与护城河"],["ASML is the sole EUV scanner manufacturer, not the sole lithography vendor across all wavelengths. Compare a single High-NA exposure with multi-patterning at the layer level: added masks, overlay steps, uptime, throughput and good die yield matter more than nominal resolution. High-NA also requires customers to validate resist, masks and metrology.", "ASML 是 EUV 整机的独家制造商，不垄断所有波段的光刻市场。比较 High-NA 单次曝光与多重图形化时，要逐层看掩模、套刻、稼动率、产出和良率，而非只比解析度。客户还须验证光刻胶、掩模和量测流程。"]],
      [["What changes the thesis","哪些信号会推翻判断"],["Installed base management was about 28% of quarterly sales, including upgrades; it is not a fixed subscription. Monitor field upgrade conversion, system acceptance, customer fab readiness and export licenses. The base case requires durable service demand and capacity expansion, not just one quarter of strong tool recognition.", "装机基础管理约占本季营收 28%，包含升级，不能等同订阅。观察现场升级兑现、设备验收、客户厂房进度和出口许可。基准情景要求服务需求和产能持续增长，并非押注单季集中确认。"]],
    ],
  },
  {
    name: "Applied Materials", ticker: "AMAT", slug: "applied-materials-complete-fundamental-analysis", currency: "USD", price: 311.18, octoberClose: 390.09,
    quote: "https://finabase.io/symbol/amat/history", basis: ["US GAAP diluted EPS", "美国 GAAP 稀释每股盈利"],
    annual: [["FY2024",27.176,8.61],["FY2025",28.368,8.66,7.958,2.260],["FY2026",34.446,12.62,8.868,2.672]],
    quarterly: [["Q4 FY2025",6.800,2.38,2.828,.785],["Q4 FY2026",10.409,3.40,3.300,.684]],
    annualSource: "https://www.sec.gov/Archives/edgar/data/6951/000162828025056742/amat-20251026.htm",
    latestSource: "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-fourth-quarter-and-fiscal-year-2026",
    release:"2026-11-12", gross:50.4, guidance:["Q1 FY2027 revenue $11.1B ± $0.5B.", "2027 财年第一季度营收指引 111 亿美元，上下浮动 5 亿。"],
    shares:.79, modelRevenue:34.446, modelStart:2026,
    scenarios:[[.03,.23,-.008,16],[.095,.30,-.018,23],[.145,.34,-.02,30]],
    thesis:["Applied sells process integration across materials steps. Test whether the current systems surge converts into cash after EPIC spending and working capital, rather than treating gross margin as shareholder cash.", "应用材料的优势是多道材料工艺协同。判断设备放量能否在 EPIC 投入和营运资金占用之后转成现金，不能把毛利率直接当股东现金。"],
    metrics:[[[ "Semiconductor Systems revenue","半导体系统收入"],"$7.996B"],[["Applied Global Services revenue","全球服务收入"],"$1.896B"],[["GAAP / adjusted operating margin","GAAP／调整后营业利润率"],"35.1% / 35.3%"]],
    sections:[
      [["Process integration","工艺整合"],["Gate-all-around and backside power add selective deposition, material removal and interfaces that must be controlled together. The competitive test is whether a process flow improves defect density and tool productivity enough to earn production-of-record slots against TEL, Lam and others; breadth alone does not establish share gains.", "环绕栅极和背面供电增加选择性沉积、去除和界面控制步骤。能否在缺陷密度与工具生产率上取得足够改善，才决定是否能从东京电子、Lam 等竞争者手中拿到量产设备位置；产品广不等于份额必涨。"]],
      [["Cash conversion and comparability","现金转化与可比性"],["FY2026 cash after capex was $6.196B, only about 18% of sales, versus roughly 32% operating margin. Track inventory, receivables, EPIC and order acceptance. The company recast segment history after moving 200-mm equipment from services into systems and allocating corporate support; do not splice unrecast segment series.", "2026 财年经营现金流减资本开支为 61.96 亿美元，约占营收 18%，而营业利润率约 32%。关注库存、应收、EPIC 投资和设备验收。公司将 200 毫米设备从服务转入系统并重新分摊总部成本，应使用重述后的分部口径。"]],
    ],
  },
  {
    name:"Lam Research", ticker:"LRCX", slug:"lam-research-complete-fundamental-analysis", currency:"USD", price:185.01, octoberClose:239.11,
    quote:"https://finabase.io/symbol/lrcx/history", basis:["US GAAP diluted EPS, split-adjusted", "美国 GAAP 稀释每股盈利，已按拆股调整"],
    annual:[["FY2024",14.905,2.90,4.652,.397],["FY2025",18.436,4.15,6.173,.759],["FY2026",23.233,5.76,5.858,.966]],
    quarterly:[["Q1 FY2026",5.324,1.24],["Q4 FY2026",6.722,1.81],["Q1 FY2027",8.219,2.19]],
    annualSource:"https://www.sec.gov/Archives/edgar/data/707549/000070754926000037/lrcx-20260628.htm",
    latestSource:"https://www.sec.gov/Archives/edgar/data/707549/000070754926000052/lrcx_exhibitx991xq1x2027.htm",
    supplemental:"https://www.sec.gov/Archives/edgar/data/707549/000070754926000054/lrcx-20260927.htm",
    release:"2026-10-21", gross:52.3, guidance:["December quarter revenue $8.6B ± $0.4B.", "12 月季度营收 86 亿美元，上下浮动 4 亿。"],
    shares:1.255, modelRevenue:23.233, modelStart:2026,
    scenarios:[[.025,.23,-.008,17],[.11,.32,-.016,25],[.17,.355,-.02,32]],
    thesis:["Scaling more layers raises etch and deposition intensity per wafer. It also raises process risk, making customer acceptance and sustained cash conversion better tests than headline WFE growth.", "堆叠层数增长推高每片晶圆的刻蚀和沉积强度，同时加大工艺难度。比设备行业总支出更有用的验证，是客户验收和持续现金转化。"],
    metrics:[[[ "Systems revenue","系统收入"],"$5.733B"],[["Support-related and other revenue","客户支持及其他收入"],"$2.487B"],[["China share of total revenue","中国收入占比"],"35%"]],
    sections:[
      [["Where process difficulty matters","工艺难度为什么值钱"],["A deep NAND channel must maintain profile and critical dimension from top to bottom. A poorly controlled etch can cause bowing or non-uniform depths; more steps and higher productivity requirements can raise tool value per wafer. DRAM and advanced logic add different opportunities, so do not project NAND layer counts directly onto all systems revenue.", "NAND 深孔刻蚀必须从顶部到底部控制形貌和关键尺寸。偏差会导致弯曲或深度不均；步骤增加与生产率要求提高可推升单片设备价值。DRAM 和先进逻辑的工艺机会不同，不能以 NAND 层数直接外推全部系统收入。"]],
      [["Working capital and geographic risk","营运资金与地域风险"],["Fiscal 2026 revenue rose 26%, but operating cash declined to $5.86B as receivables rose. The support line includes spares, upgrades and Reliant tools, not just recurring service fees. Track memory wafer starts, shipment-to-collection lag and license exposure as geography changes.", "2026 财年收入增长 26%，但应收增加，经营现金流降至 58.6 亿美元。客户支持口径含备件、升级和 Reliant 设备，不全是经常性服务费。跟踪存储投片量、出货至回款间隔和地域变化下的许可证风险。"]],
    ],
  },
  {
    name:"Arm Holdings", ticker:"ARM", slug:"arm-complete-fundamental-analysis", currency:"USD", price:161.51, octoberClose:205.97,
    quote:"https://finabase.io/symbol/arm/history", basis:["US GAAP diluted EPS; Nasdaq ADS", "美国 GAAP 稀释每股盈利；纳斯达克 ADS"],
    annual:[["FY2024",3.233,.29,1.090,.092],["FY2025",4.007,.75,.397,.219],["FY2026",4.920,.85,1.524,.545]],
    quarterly:[["Q2 FY2026",1.135,.22],["Q4 FY2026",1.490,.29],["Q2 FY2027",1.443,.12]],
    annualSource:"https://www.sec.gov/Archives/edgar/data/1973239/000197323926000097/arm-20260331.htm",
    latestSource:"https://investors.arm.com/static-files/0b5baa2e-fc47-4d05-b724-e49de7bd4356",
    supplemental:"https://investors.arm.com/financials/quarterly-annual-results",
    release:"2026-11-04", gross:97.1, guidance:["Q3 FY2027 revenue $1.54B ± $50M; adjusted EPS $0.56 ± $0.04, not GAAP.", "2027 财年第三季度营收 15.4 亿美元，上下浮动 5000 万；调整后 EPS 为 0.56 美元，上下浮动 0.04，不是 GAAP。"],
    shares:1.079, modelRevenue:4.920, modelStart:2026,
    scenarios:[[.09,.16,.025,26],[.23,.27,.014,43],[.34,.37,.01,59]],
    thesis:["A design license is not a royalty stream until a chip ships. Higher royalty content and data-center design wins matter, but a direct silicon business changes both capital needs and partner incentives.", "设计授权要等芯片出货才会变成版税。单片版税提升和数据中心设计导入很重要，但自营芯片会改变资本需求和合作伙伴激励。"],
    metrics:[[[ "License and other revenue","授权及其他收入"],"$773M"],[["Royalty revenue","版税收入"],"$670M"],[["GAAP / adjusted operating margin","GAAP／调整后营业利润率"],"13.9% / 44.2%"],[["Related party revenue","关联方收入"],"$424M"]],
    sections:[
      [["Separate license, royalty and silicon economics","拆分授权、版税和芯片经济"],["License timing produces lumpiness; royalties depend on shipped volumes, architecture and contract-specific economics. CSS can increase the value per design but does not eliminate customer alternatives such as x86 or RISC-V. Arm planned first commercial AGI CPU deliveries for fiscal Q4 FY2027 as of the November letter; orders are not booked revenue.", "授权签署时点造成波动；版税取决于实际出货、架构和合同单价。CSS 可提高单一设计价值，但客户仍可选择 x86 或 RISC-V。11 月股东信称首批 AGI CPU 商业交付计划在 2027 财年第四季度；订单不等于已确认收入。"]],
      [["Why adjusted margins need a second look","调整后利润为何需要复核"],["Quarterly equity-settled compensation was $377M, before related employer taxes. Reported operating cash adds back noncash compensation; per-share value still depends on dilution or the cash needed to offset it. Track the royalty share of revenue, customer concentration, related parties, and whether Arm can launch silicon without weakening license partner trust.", "季度权益结算股权激励为 3.77 亿美元，尚未计相关雇主税。经营现金流加回非现金激励，但每股价值仍受摊薄或回购对冲所需现金影响。跟踪版税占比、客户和关联方集中，以及自研芯片是否冲击授权伙伴的信任。"]],
    ],
  },
];

export const asOf = "2026-11-25";
export function project(report: Report, scenario: Scenario, years: number) {
  const [growth, margin, shareChange, multiple] = scenario;
  const revenue = report.modelRevenue * (1 + growth) ** years;
  const shares = report.shares * (1 + shareChange) ** years;
  const netIncome = revenue * margin;
  const eps = netIncome / shares;
  const value = eps * multiple;
  return { revenue, shares, netIncome, eps, value, cagr: (value / report.price) ** (1 / years) - 1 };
}
