export type Lang = "en" | "zh";
export type Copy = readonly [string, string];
export const pick = (text: Copy, lang: Lang) => text[lang === "zh" ? 1 : 0];
export const title: Copy = ["Broadcom's AI Semiconductor Moat: How Marvell Changes the Equation", "博通 AI 半导体护城河：Marvell 如何改变竞争格局"];
export const description: Copy = ["Custom XPUs, networking, switching costs, Google's dual-supplier strategy and the competitive implications for Broadcom after 2028.", "定制 XPU、网络、转换成本、Google 多供应商策略，以及 2028 年后对博通的竞争影响。"];
export const researchDate = "2026-10-18";
export const googleWarrant = { totalShares: 58970907, timeShares: 1360867, performanceShares: 57610040, tranches: 240, revenuePerTranche: 500000000, exercisePrice: 206.58 };
export const sources = {
  broadcomQ3: { label: "Broadcom Q3 FY2026 results", url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial", status: ["Reported quarter and next-quarter guidance checked", "已核对报告季度与下一季度指引"] as Copy },
  googleAvgo: { label: "Broadcom April 6, 2026 Form 8-K", url: "https://www.sec.gov/Archives/edgar/data/1730168/000119312526144028/d87999d8k.htm", status: ["TPU / supply agreement scope checked; no exclusivity inferred", "已核对 TPU／供货协议范围；不推断独家性"] as Copy },
  meta: { label: "Broadcom / Meta extended partnership", url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-announces-extended-partnership-meta-deploy-technology", status: ["Announcement checked; future rollout remains forward-looking", "已核对公告；未来部署仍为前瞻计划"] as Copy },
  openai: { label: "OpenAI / Broadcom Jalapeno announcement", url: "https://investors.broadcom.com/news-releases/news-release-details/openai-and-broadcom-unveil-llm-optimized-intelligence-processor", status: ["Multi-generation platform announcement checked", "已核对多代平台公告"] as Copy },
  ofc: { label: "Broadcom OFC 2026 portfolio", url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-showcases-industry-leading-solutions-scaling-ai", status: ["Vendor specifications, not independent cluster benchmarks", "厂商规格，不是独立集群测试"] as Copy },
  ultra: { label: "Tomahawk Ultra / BCM78920", url: "https://www.broadcom.com/products/ethernet-connectivity/switching/strataxgs/bcm78920-series", status: ["51.2 Tb/s and 250ns product specification checked", "已核对 51.2 Tb/s 与 250ns 产品规格"] as Copy },
  googleMrvl: { label: "Marvell August 19, 2026 Form 8-K", url: "https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-356217/d412696d8k.htm", status: ["Commercial scope, dates and discretionary purchase terms checked", "已核对商业范围、日期与自主采购条款"] as Copy },
  warrant: { label: "Google warrant, Exhibit 4.1", url: "https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-356217/d412696dex41.htm", status: ["Vesting arithmetic and measuring / exercise periods checked", "已核对归属算术及计量／行权期间"] as Copy },
  mrvlAnnual: { label: "Marvell FY2026 Form 10-K", url: "https://investor.marvell.com/sec-filings/all-sec-filings/content/0001835632-26-000011/mrvl-20260131.htm", status: ["Celestial and XConn completion context checked", "已核对 Celestial 与 XConn 交割背景"] as Copy },
  celestial: { label: "Marvell completes Celestial AI acquisition", url: "https://www.marvell.com/company/newsroom/marvell-completes-acquisition-of-celestial-ai.html", status: ["Exit annualized revenue expectations, not realized annual sales", "期末年化收入预期，不是已实现全年收入"] as Copy },
  nvidia: { label: "NVIDIA / Marvell NVLink Fusion partnership", url: "https://investor.marvell.com/news-events/press-releases/detail/1019/nvidia-ai-ecosystem-expands-as-marvell-joins-forces-through-nvlink-fusion", status: ["Partnership and $2B investment checked; no customer win inferred", "已核对合作与 20 亿美元投资；不推断客户订单"] as Copy },
  investorDay: { label: "Marvell investor events", url: "https://investor.marvell.com/news-events/ir-calendar/past", status: ["October 6 event confirmed; transcript targets below not independently reconciled to slides", "确认 10 月 6 日活动；下述原文目标未与演示稿独立调节"] as Copy },
};
export type SourceKey = keyof typeof sources;
export const stack: { layer: Copy; products: string; role: Copy }[] = [
  { layer: ["Custom compute", "定制计算"], products: "TPU / MTIA / custom XPU", role: ["Translate customer architecture into production silicon", "把客户架构变为量产芯片"] },
  { layer: ["Scale-up", "纵向扩展"], products: "Tomahawk Ultra", role: ["Low-latency accelerator communication", "低延迟加速器通信"] },
  { layer: ["Scale-out", "横向扩展"], products: "Tomahawk", role: ["Connect racks and larger fabrics", "连接机架及更大网络"] },
  { layer: ["Scale-across", "跨集群扩展"], products: "Jericho", role: ["Connect large distributed AI systems", "连接大型分布式 AI 系统"] },
  { layer: ["Connectivity", "连接"], products: "NIC / PCIe / SerDes", role: ["Move data between compute, memory and fabric", "在计算、内存与网络间搬运数据"] },
  { layer: ["Optics", "光学"], products: "DSP / EML / VCSEL / CW laser", role: ["Reach, bandwidth and energy efficiency", "传输距离、带宽与能效"] },
  { layer: ["Packaging", "封装"], products: "2.5D / 3D / XDSiP", role: ["Integrate compute, chiplets and memory", "整合计算、芯粒与内存"] },
];
export const capability: { area: Copy; avgo: number; mrvl: number; note: Copy }[] = [
  { area: ["Custom XPU", "定制 XPU"], avgo: 10, mrvl: 8, note: ["Source favors Broadcom's execution history", "原文更看重博通交付历史"] },
  { area: ["Hyperscaler relationships", "超大规模客户关系"], avgo: 10, mrvl: 9, note: ["Gap narrowing", "差距缩小"] },
  { area: ["SerDes", "SerDes"], avgo: 10, mrvl: 9, note: ["Both are credible", "双方都有实力"] },
  { area: ["Scale-out Ethernet", "横向扩展以太网"], avgo: 10, mrvl: 7.5, note: ["Source sees Broadcom ahead", "原文判断博通领先"] },
  { area: ["Scale-up", "纵向扩展"], avgo: 9.5, mrvl: 8.5, note: ["Marvell / NVIDIA route strengthens competition", "Marvell／NVIDIA 路线增强竞争"] },
  { area: ["Optical DSP", "光 DSP"], avgo: 9, mrvl: 10, note: ["Marvell strength", "Marvell 强项"] },
  { area: ["Silicon photonics", "硅光"], avgo: 8.5, mrvl: 9.5, note: ["Celestial broadens Marvell's roadmap", "Celestial 扩展 Marvell 路线"] },
  { area: ["PCIe / CXL", "PCIe／CXL"], avgo: 9, mrvl: 9, note: ["XConn fills portfolio gaps", "XConn 补齐产品组合"] },
  { area: ["Advanced packaging", "先进封装"], avgo: 10, mrvl: 9, note: ["Source favors Broadcom", "原文更看好博通"] },
  { area: ["Supply-chain scale", "供应链规模"], avgo: 10, mrvl: 8, note: ["Scale advantage, not guaranteed capacity", "规模优势不等于容量保证"] },
  { area: ["R&D resources", "研发资源"], avgo: 10, mrvl: 8, note: ["Financial capacity differs", "财务资源不同"] },
  { area: ["Diversification potential", "客户分散潜力"], avgo: 9, mrvl: 9.5, note: ["Potential is not realized diversification", "潜力不等于已实现分散"] },
];
export const threats: { area: Copy; level: Copy; horizon: string }[] = [
  { area: ["Optics / interconnect", "光学／互联"], level: ["High", "高"], horizon: "Current" },
  { area: ["NIC / attach silicon", "NIC／周边芯片"], level: ["High", "高"], horizon: "Current" },
  { area: ["Memory / CXL", "内存／CXL"], level: ["High", "高"], horizon: "2027-2029" },
  { area: ["Scale-up networking", "纵向扩展网络"], level: ["Medium-high", "中高"], horizon: "2027-2030" },
  { area: ["New custom XPU customers", "新定制 XPU 客户"], level: ["Medium-high", "中高"], horizon: "2028-2031" },
  { area: ["Google core TPU", "Google 核心 TPU"], level: ["Medium", "中"], horizon: "2029+" },
  { area: ["Meta MTIA", "Meta MTIA"], level: ["Medium-low", "中低"], horizon: "2028+" },
  { area: ["OpenAI XPU", "OpenAI XPU"], level: ["Medium-low", "中低"], horizon: "2028+" },
  { area: ["Scale-out Ethernet", "横向扩展以太网"], level: ["Medium", "中"], horizon: "2028+" },
];
export const competition = [
  { fy: 2028, original: 230, adjusted: 230 },
  { fy: 2029, original: 270, adjusted: 260 },
  { fy: 2030, original: 300, adjusted: 280 },
  { fy: 2031, original: 327, adjusted: 300 },
  { fy: 2032, original: 350, adjusted: 315 },
];
export const metrics: { metric: Copy; evidence: Copy }[] = [
  { metric: ["XPU customer production conversion", "XPU 客户量产转化"], evidence: ["Named or disclosed production ramps, not just design pipelines", "具名或已披露量产，而不只是设计管线"] },
  { metric: ["Next-generation Google core TPU supplier", "下一代 Google 核心 TPU 供应商"], evidence: ["Explicit core-compute scope; distinguish peripheral programs", "明确核心计算范围，区分周边项目"] },
  { metric: ["Google / Marvell qualifying revenue", "Google／Marvell 合格收入"], evidence: ["Actual purchases, vesting and economic dilution, not the $120B threshold", "实际采购、归属与经济稀释，而非 1,200 亿美元门槛"] },
  { metric: ["Broadcom networking attach", "博通网络附加销售"], evidence: ["AI networking dollars, mix and margin, not mix alone", "AI 网络收入、占比与利润率，不能只看占比"] },
  { metric: ["Marvell custom silicon growth", "Marvell 定制芯片增长"], evidence: ["Comparable reporting scope and realized gross / cash contribution", "可比披露口径及已实现毛利／现金贡献"] },
  { metric: ["NVLink Fusion production wins", "NVLink Fusion 量产订单"], evidence: ["Customer qualification, deployment and volume revenue", "客户验证、部署与规模收入"] },
];

export type Chapter = { id: string; heading: Copy; paragraphs: Copy[]; refs?: SourceKey[] };
export const chapters: Chapter[] = [
  { id: "thesis", heading: ["1. The moat is a system, not a single chip", "一、护城河是一套系统，而不只是一颗芯片"], paragraphs: [
    ["Broadcom remains a leading custom-AI-silicon platform; Marvell is a serious challenger rather than a hypothetical second supplier. The source thesis is that competition may first change peripheral content, customer bargaining power and networking economics, then influence future core-XPU generations. Treat the proposed 2029-2031 timing as a scenario, not a protected period before which competition cannot matter.", "博通仍是定制 AI 芯片的重要平台；Marvell 已是严肃的挑战者，而非假想中的第二供应商。原文认为竞争可能先改变周边芯片价值量、客户议价权与网络经济性，再影响未来核心 XPU 世代。2029–2031 年这一时点属于情景判断，不是竞争此前无法产生影响的保护期。"],
    ["Both companies can grow as custom silicon expands. Broadcom could lose percentage share while increasing absolute revenue. The investment question is whether the additional revenue retains attractive margins, funding requirements and value per diluted share.", "定制芯片市场扩大可以让两家公司同时增长。博通可能份额下降而绝对收入上升。投资问题在于新增收入能否保留有吸引力的利润率、融资需求与摊薄后每股价值。"],
  ] },
  { id: "stack", heading: ["2. What Broadcom sells around the XPU", "二、博通在 XPU 周围还能卖什么"], paragraphs: [
    ["The source maps Broadcom across custom accelerators, three networking scales, connectivity, optics and packaging. This is an analytical product map, not seven separately disclosed revenue segments. One customer's XPU deployment can create additional silicon opportunities without guaranteeing that Broadcom wins every component.", "原文将博通拆为定制加速器、三种网络扩展、连接、光学与封装。这是分析性的产品地图，不是七个独立披露的收入分部。客户部署 XPU 可以带来额外芯片机会，但不保证博通拿到每一个组件。"],
    ["Broadcom reported Q3 FY2026 AI semiconductor revenue of $16.7B, up 221% year over year, and guided Q4 AI revenue to $21.7B. These are a reported result and guidance respectively. The source's FY2026 $58B and 73% XPU mix claims are retained as unverified transcript inputs, not separate audited segment disclosures.", "博通报告 FY2026 Q3 AI 半导体收入 167 亿美元、同比增长 221%，并指引 Q4 为 217 亿美元。前者是已报告结果，后者是指引。原文 FY2026 580 亿美元及 XPU 占比 73% 的说法保留为未独立核验的对话输入，不是单独审计的分部披露。"],
  ], refs: ["broadcomQ3"] },
  { id: "codesign", heading: ["3. Co-design and manufacturing execution", "三、协同设计与量产执行"], paragraphs: [
    ["Hyperscalers often own the workload, model, architecture and software stack. A silicon partner contributes physical design, high-speed interfaces, chiplet integration, verification, packaging, signal and power integrity, yield learning and foundry coordination. The value is turning architecture into a qualified, manufacturable product on schedule, rather than simply providing design labor.", "超大规模客户通常掌握工作负载、模型、架构与软件栈；芯片伙伴贡献物理设计、高速接口、芯粒整合、验证、封装、信号与电源完整性、良率学习及晶圆厂协调。价值在于按时把架构变成通过验证、可制造的产品，而不是单纯提供设计人力。"],
    ["Architecture, IP integration, floorplanning, physical design, tape-out, package/HBM integration, validation, firmware and rack qualification form a tightly coupled chain. Switching suppliers late within a generation can be costly and disruptive. Between generations, the customer can redesign interfaces, rebid work or add suppliers. Broadcom's switching-cost moat is substantial but renewable, not permanent.", "架构、IP 集成、布局、物理设计、流片、封装／HBM 整合、验证、固件与机架认证形成紧密链条。同代后期更换供应商代价高、干扰大；跨代时客户可以重设接口、重新招标或增加供应商。博通的转换成本护城河很强，但需要持续续约，不是永久壁垒。"],
  ] },
  { id: "customers", heading: ["4. Multi-generation relationships: Google, Meta and OpenAI", "四、多代客户关系：Google、Meta 与 OpenAI"], paragraphs: [
    ["Broadcom's April 6 filing describes future Google TPU development and supply, plus networking and rack-component supply arrangements through up to 2031. That supports relationship breadth, not an exclusive commitment for every future TPU or guaranteed annual revenue. Anthropic's associated compute expansion also depends on its commercial success.", "博通 4 月 6 日申报描述了未来 Google TPU 的开发供应，以及最长至 2031 年的网络和机架组件供货安排。这支持关系广度，但不能解读为所有未来 TPU 的独家承诺或年度收入保证；相关 Anthropic 算力扩张也依赖其商业成功。"],
    ["The April Meta announcement includes 2nm MTIA and planned collaboration through 2029. The June OpenAI announcement introduces Jalapeno as the first accelerator in a multi-generation platform. These examples support transferability beyond one long-standing customer, but announced roadmaps do not establish future volume, exclusivity or program profitability.", "4 月 Meta 公告包括 2nm MTIA 及计划延续至 2029 年的合作；6 月 OpenAI 公告将 Jalapeño 定位为多代平台的首款加速器。这些案例支持能力不只局限于一个老客户，但路线图公告不等于未来销量、独家性或项目利润保证。"],
  ], refs: ["googleAvgo", "meta", "openai"] },
  { id: "ip", heading: ["5. Reusable IP and the networking feedback loop", "五、可复用 IP 与网络反馈循环"], paragraphs: [
    ["A large library of validated SerDes, Ethernet, PCIe, memory-interface, die-to-die and packaging capabilities can reduce repeated engineering work and qualification risk. The economic benefit depends on reuse rights, licensing terms, interoperability and actual performance, not simply the number of IP blocks. No proprietary patent or IP-rights audit is claimed here.", "大量经过验证的 SerDes、以太网、PCIe、内存接口、芯粒互联及封装能力，可以降低重复工程与认证风险。但经济收益取决于复用权、许可条款、互操作性和实际性能，而不是 IP 模块数量。本文不声称完成了专有专利或 IP 权利审计。"],
    ["The feedback-loop thesis is that XPU deployments inform communication requirements; those requirements guide switches, interfaces and packaging; the resulting learning helps the next XPU. This is an analyst inference about cross-product learning, not a claim that all customer architecture or intellectual property belongs to Broadcom.", "反馈循环的逻辑是：XPU 部署揭示通信需求，需求指导交换芯片、接口与封装，学习成果再帮助下一代 XPU。这是跨产品学习的分析推断，不意味着客户架构或知识产权都属于博通。"],
  ] },
  { id: "network", heading: ["6. Networking provides a second way to win", "六、网络提供第二条获胜路径"], paragraphs: [
    ["Broadcom's OFC materials describe 102.4T Tomahawk 6, Jericho 4 fabrics designed for million-plus-XPU architectures, 800G Thor Ultra NICs and 3.5D XDSiP packaging. Tomahawk Ultra's product specification lists 51.2 Tb/s and 250ns switch latency. These are vendor product capabilities, not evidence of identical application latency or a million-XPU production customer deployment.", "博通 OFC 资料描述了 102.4T Tomahawk 6、面向百万级 XPU 架构的 Jericho 4 网络、800G Thor Ultra NIC 与 3.5D XDSiP 封装；Tomahawk Ultra 规格列出 51.2 Tb/s 与 250ns 交换延迟。这些是厂商产品能力，不等于相同的应用端到端延迟，也不证明已有百万 XPU 量产客户部署。"],
    ["Even if a customer awards some compute work elsewhere, Broadcom may still supply Ethernet switches, interfaces and optics. That creates a partial hedge against lost compute share. It is not automatic: a rival ecosystem can win the surrounding network too. Track absolute networking revenue, attachment and margins, not just the percentage of AI sales labeled networking.", "即使客户把部分计算项目交给其他厂商，博通仍可能供应以太网交换、接口与光学。这能部分对冲计算份额流失，但并非自动发生：竞争生态也可以拿走周边网络。应看网络绝对收入、附加销售与利润率，而不只看 AI 收入中的网络占比。"],
  ], refs: ["ofc", "ultra"] },
  { id: "scale", heading: ["7. Supply assurance and financial capacity", "七、供货保障与财务资源"], paragraphs: [
    ["Wafer starts, HBM, packaging, substrates and qualification capacity can constrain a good design. Supplier relationships and purchasing scale therefore matter alongside engineering. The source claims capacity has been secured through 2028; that claim is not independently reconciled here to purchase commitments. Reserved inputs do not guarantee customer sites, power, yields or revenue recognition.", "晶圆投片、HBM、封装、基板与认证产能都会约束优秀设计，因此供应商关系和采购规模与工程同样重要。原文称产能已锁定至 2028 年，本文未将该说法与采购承诺独立调节。预留投入也不保证客户场地、电力、良率或收入确认。"],
    ["The source contrasts Broadcom's approximately $13.7B quarterly FCF with Marvell's approximately $8.2B FY2026 revenue to illustrate different financial scale. They are deliberately different metrics and periods, not an efficiency ratio. A fair investment comparison requires aligned R&D, operating cash, capex, working capital, share compensation and acquisition commitments. Strong cash generation helps fund parallel programs but does not ensure their success.", "原文用博通约 137 亿美元季度 FCF 与 Marvell 约 82 亿美元 FY2026 全年收入说明财务规模差异。这是不同指标、不同期间，不能当作效率比率。公平比较应统一研发、经营现金、资本支出、营运资金、股权薪酬与并购承诺。现金创造有助于并行项目，但不保证成功。"],
  ], refs: ["broadcomQ3", "mrvlAnnual"] },
  { id: "google", heading: ["8. Google can use both suppliers without replacing core TPU", "八、Google 可以同时使用两家，而不必替换核心 TPU"], paragraphs: [
    ["Marvell's filing dates the Google commercial agreement to July 29, 2026. Its scope includes inference accelerators, storage and network controllers, memory-interface controllers and near-memory compute attached to the TPU ecosystem. That is evidence of meaningful scope, not proof that Marvell has replaced Broadcom as the core TPU partner. An inference accelerator is still a strategically important compute program; 'attach' should not be dismissed as trivial.", "Marvell 申报显示 Google 商业协议签于 2026 年 7 月 29 日，范围包括 TPU 生态相关推理加速器、存储与网络控制器、内存接口控制器及近内存计算。这证明范围有分量，但不能证明 Marvell 已取代博通成为核心 TPU 伙伴。推理加速器仍是战略计算项目，不能因归为周边就轻视。"],
    ["The August 18 warrant covers up to 58,970,907 shares at $206.58; 1,360,867 are time-based and 57,610,040 performance-based. The latter vest over 240 qualifying $500M revenue tranches. $120B is the full-vesting revenue threshold, NOT a committed order, backlog or guaranteed revenue. Purchases are discretionary. The measuring period ends January 29, 2033; the stated exercise expiry is August 18, 2033, subject to agreement terms.", "8 月 18 日权证最多覆盖 58,970,907 股、行权价 206.58 美元，其中 1,360,867 股按时间归属、57,610,040 股按业绩归属；后者对应 240 个各 5 亿美元合格收入阶梯。1,200 亿美元是完全归属的收入门槛，不是已承诺订单、在手订单或保证收入；采购为自主决定。计量期至 2033 年 1 月 29 日，约定行权到期日为 2033 年 8 月 18 日，受协议条款约束。"],
    ["For investors, measure realized qualifying sales, program margins and warrant economics together. The existence of a large ceiling does not establish its likelihood, and customer equity incentives can improve commercial alignment while diluting other shareholders.", "投资者应把已实现合格销售、项目利润与权证经济性放在一起看。巨大上限不证明实现概率；客户股权激励能增强商业一致性，同时也可能稀释其他股东。"],
  ], refs: ["googleMrvl", "warrant"] },
  { id: "challenger", heading: ["9. Marvell is assembling a broader connectivity platform", "九、Marvell 正在拼出更完整的连接平台"], paragraphs: [
    ["The source emphasizes optical DSP, PAM signaling, SerDes, silicon photonics, PCIe/CXL and custom silicon. It reports data-center mix of about 74%, optics at about half of that segment and custom silicon at about one quarter; the fine-grained mix and historical CAGR are not independently verified in this adaptation. Those categories should not be treated as comparable to Broadcom's AI revenue definition without reconciliation.", "原文强调光 DSP、PAM 信号、SerDes、硅光、PCIe／CXL 与定制芯片，并引用数据中心占比约 74%、其中光互联约一半、定制芯片约四分之一。细分结构与历史 CAGR 在本次整理中未独立核验，未调节前也不能与博通 AI 收入口径直接比较。"],
    ["Marvell's filing records Celestial AI completion on February 2, 2026 and XConn on February 10. Celestial expands optical scale-up; XConn adds PCIe/CXL switching. Acquisition closes do not establish customer adoption, successful integration or attractive returns on the purchase price.", "Marvell 申报记录 Celestial AI 于 2026 年 2 月 2 日完成交割、XConn 于 2 月 10 日完成。Celestial 扩展光学纵向互联，XConn 增加 PCIe／CXL 交换。并购交割不等于客户采用、整合成功或收购价上的良好回报。"],
    ["Celestial's announced milestones are a $500M annualized exit rate in Q4 FY2028 and $1B in Q4 FY2029, with meaningful contributions expected from H2 FY2028. These are management expectations, not full-year revenue. A $500M annualized quarterly exit rate corresponds to roughly $125M for that quarter if measured as quarter revenue times four.", "Celestial 公布的目标是 FY2028 Q4 期末年化收入 5 亿美元、FY2029 Q4 为 10 亿美元，预计 FY2028 下半年开始有显著贡献。这是管理层预期，不是全年收入；若按季度收入乘四，5 亿美元年化相当于该季度约 1.25 亿美元。"],
  ], refs: ["mrvlAnnual", "celestial"] },
  { id: "nvidia", heading: ["10. NVLink Fusion changes the alternative stack", "十、NVLink Fusion 改变替代技术栈"], paragraphs: [
    ["The March 31 announcement states that NVIDIA invested $2B in Marvell. Marvell contributes custom XPUs and NVLink Fusion-compatible scale-up networking, with NVIDIA supplying supporting compute and networking technologies. The companies also plan silicon-photonics collaboration. This gives customers another integration route; it does not prove superior total cost or a hyperscaler production win.", "3 月 31 日公告称 NVIDIA 向 Marvell 投资 20 亿美元。Marvell 提供定制 XPU 与兼容 NVLink Fusion 的纵向网络，NVIDIA 提供配套计算和网络技术，双方也计划在硅光合作。这为客户提供另一条整合路线，但不能证明总成本更低或已获得超大规模客户量产订单。"],
    ["The source sees a potentially useful combination of custom-silicon efficiency and NVIDIA ecosystem compatibility. Adoption still depends on qualification, software, power, latency, commercial terms and switching costs. Compatibility can also create ecosystem dependence, so the partnership is both an opportunity and a strategic constraint.", "原文看重定制芯片效率与 NVIDIA 生态兼容性的组合；实际采用仍取决于认证、软件、功耗、延迟、商务条款与转换成本。兼容也可能带来生态依赖，所以合作既是机会，也是战略约束。"],
    ["The source quotes Marvell Investor Day aspirations of about $20B FY2028 revenue, $12B FY2029 custom silicon and $70-90B FY2031 total revenue. The event date was checked, but those exact figures were not reconciled to primary slides here. They are retained as source-reported aspirations, not verified guidance, contracted demand or a base-case valuation.", "原文引用 Marvell 投资者日的约 200 亿美元 FY2028 收入、120 亿美元 FY2029 定制芯片收入与 700–900 亿美元 FY2031 总收入目标。本次核对了活动日期，但未把这些数值与一手演示稿调节，因此仅保留为原文引用的愿景，不是已核实指引、已签需求或基准估值。"],
  ], refs: ["nvidia", "investorDay"] },
  { id: "comparison", heading: ["11. Capability scores and threat timing", "十一、能力评分与威胁时间表"], paragraphs: [
    ["The following scores reproduce the source's subjective comparison. They are not engineering benchmarks, a weighted quantitative ranking or probabilities. The source's overall Broadcom moat score is 9/10 and Marvell competitive capability 8-8.5/10; those are separate judgments, not averages of the table. The threat horizons below are likewise analyst scenarios, not confirmed contract expirations or announced design losses.", "下表复现原文主观比较，不是工程基准、加权量化排名或概率。原文给博通总体护城河 9/10、Marvell 竞争能力 8–8.5/10，这是另行判断，不是表格平均值。威胁时间同样是分析情景，不是已确认合同到期日或已公布丢单。"],
  ] },
  { id: "economics", heading: ["12. Bargaining power may matter before lost revenue", "十二、收入流失之前，议价权可能先变化"], paragraphs: [
    ["A credible alternative can change NRE fees, unit pricing, supply obligations and contract terms even if the incumbent retains the core design. Hyperscaler concentration strengthens buyers' negotiating leverage. Competitive pressure can therefore appear in margins and cash conversion before reported market share, and a larger sales base can conceal lower economics per program.", "可信替代供应商即使没有拿走核心设计，也能改变 NRE 费用、单价、供货责任与合同条款。超大规模客户集中增强买方议价权，所以竞争压力可能先出现在利润率和现金转化，而不是市场份额；更大销售规模也可能掩盖单项目经济性下降。"],
    ["The source expects peripheral pressure before widespread core-XPU displacement. A plausible development sequence is design, tape-out, qualification and volume ramp across several years. Actual programs can run faster, slip or fail. Keep AI capex demand, supplier share, silicon content per rack and gross-to-operating-margin conversion separate rather than explaining every earnings change with Marvell.", "原文预计周边压力早于核心 XPU 大范围替换。设计、流片、验证到量产可能跨越数年，但实际项目可以更快、延后或失败。应分开分析 AI 资本需求、供应商份额、每机架芯片价值量及毛利向营业利润的转化，不能把所有盈利变化都归因于 Marvell。"],
  ] },
  { id: "scenario", heading: ["13. A competition haircut after 2028", "十三、2028 年后的竞争折价情景"], paragraphs: [
    ["The source retains $115B FY2027 and $230B FY2028 AI revenue anchors, then reduces later years. These figures are source model assumptions here, NOT newly verified management guidance. Contracts and reserved supply improve visibility but do not ensure volumes, customer deployment or margins. They do not justify treating early years as risk-free.", "原文保留 FY2027 1,150 亿美元与 FY2028 2,300 亿美元 AI 收入锚，再削减后续年份。本文将其视为原文模型假设，而不是新核实的管理层指引。合同与预留供货改善可见度，但不保证数量、客户部署与利润率，也不能让前两年变成无风险。"],
    ["The reduction can represent Marvell, internal design teams, other ASIC partners, semi-custom alternatives and dual sourcing. It is an illustrative sensitivity, not an estimate of Marvell's revenue gains. Lower Broadcom sales do not map dollar-for-dollar to a competitor. No probabilities, updated EPS, enterprise value or share-price target are inferred from this revenue-only table.", "折价可以代表 Marvell、客户内部团队、其他 ASIC 伙伴、半定制替代与双源采购。这是示例敏感性，不是 Marvell 收入增量估计；博通减少的销售不会一比一流向竞争者。本文不从这张纯收入表推断概率、新 EPS、企业价值或股价目标。"],
  ] },
  { id: "monitor", heading: ["14. Six indicators that can change the thesis", "十四、能改变逻辑的六个指标"], paragraphs: [
    ["The most consequential distinction is whether Marvell wins future core TPU compute or remains primarily in adjacent programs. Avoid inferring either outcome from a supplier announcement alone. Production evidence, comparable segment definitions and cash economics matter more than a large pipeline number.", "最关键的区别是 Marvell 是否赢得未来核心 TPU 计算项目，还是主要留在相邻项目。不能仅凭供应商公告推断任何一种结果；量产证据、可比的分部定义与现金经济性，比庞大的管线数字更重要。"],
    ["Bottom line: Broadcom has the broader established system in the source thesis; Marvell offers a strengthening alternative with optical, switching and ecosystem options. That supports a higher long-term competition sensitivity, not a declaration that Broadcom's moat has already collapsed. A durable business moat is also not proof that either stock is attractively priced. This article does not update share prices or reproduce the earlier spreadsheet valuation.", "结论：原文逻辑中，博通拥有更成熟完整的系统，Marvell 则通过光学、交换与生态选项形成更强替代。这支持提高长期竞争敏感度，而不是宣称博通护城河已经崩塌。持久护城河也不证明任一股票定价有吸引力。本文不更新股价，也不转载前面的电子表格估值。"],
  ] },
];
