export type Size = "mid" | "small";
export type Company = {
  size: Size; rank: number; ticker: string; name: string; price: number; capM: number;
  quarterRevenueM: number; periodEnd: string; source: string;
  layer: [string, string]; facts: [string, string]; thesis: [string, string];
  catalyst: [string, string]; monitor: [string, string]; failure: [string, string];
  growth: [number, number]; cashMargin: [number, number]; dilution: number;
  multiple: number; exposure: string; modelAvailable: boolean;
};
export const MARKET_DATE = "2026-10-02";
export const RESEARCH_DATE = "2026-10-05";
export const COMPANIES: Company[] = [
  {
    "size": "mid",
    "rank": 1,
    "ticker": "INTA",
    "name": "Intapp",
    "price": 36.49,
    "capM": 2878.03928,
    "quarterRevenueM": 152.5,
    "periodEnd": "2026-06-30",
    "source": "https://investors.intapp.com/investor-news/news-details/2026/Intapp-announces-fourth-quarter-and-fiscal-year-2026-financial-results/default.aspx",
    "layer": [
      "Governed professional AI",
      "受监管专业 AI"
    ],
    "facts": [
      "Cloud ARR $495.7M; cloud NRR 123%; FY26 revenue $577.8M.",
      "云 ARR 4.957 亿美元；云净留存率 123%；FY26 收入 5.778 亿美元。"
    ],
    "thesis": [
      "Professional firms need permission-aware knowledge, relationship graphs and auditability. Intapp's opportunity is to own the governed workflow around models rather than compete in foundation-model training. Its position is more defensible when compliance controls are embedded in daily work and difficult to substitute. The rank favors a measurable recurring-revenue base over an impressive demonstration.",
      "专业机构需要带权限的知识、关系图谱与审计。Intapp 的机会是控制模型周边的治理工作流，而非训练基础模型。合规控制越深入日常工作，替换成本越高。排序偏好可衡量的经常性收入，而非漂亮演示。"
    ],
    "catalyst": [
      "Celeste deployment converts into paid expansion and renewed cloud contracts.",
      "Celeste 落地转化为付费扩张与云续约。"
    ],
    "monitor": [
      "Monitor cloud NRR, cloud ARR, GAAP operating loss, sales efficiency and SBC. A decline in retention without lower selling costs would weaken the thesis.",
      "监测云留存、云 ARR、GAAP 营业亏损、销售效率与股权薪酬。留存下降而销售成本不降将削弱逻辑。"
    ],
    "failure": [
      "Microsoft or specialist legal agents bypass Intapp; agents fail governance tests; strong adjusted earnings conceal continuing dilution.",
      "微软或法律代理绕过 Intapp；代理未通过治理要求；调整后利润掩盖持续稀释。"
    ],
    "growth": [
      0.18,
      0.12
    ],
    "cashMargin": [
      -0.04,
      0.18
    ],
    "dilution": 0.025,
    "multiple": 22,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 2,
    "ticker": "PATH",
    "name": "UiPath",
    "price": 13.12,
    "capM": 6861.93056,
    "quarterRevenueM": 410,
    "periodEnd": "2026-07-31",
    "source": "https://ir.uipath.com/financials/sec-filings/content/0001734722-26-000047/path-2026731xex991.htm",
    "layer": [
      "Agent orchestration",
      "智能体编排"
    ],
    "facts": [
      "ARR $1.938B; retention 109%; GAAP operating income $32M.",
      "ARR 19.38 亿美元；净留存 109%；GAAP 营业利润 3200 万美元。"
    ],
    "thesis": [
      "Agents still need deterministic execution, permissions, human escalation and exception handling. UiPath can be a bridge between probabilistic reasoning and regulated business transactions. The installed automation estate is useful only if customers keep paying for orchestration as agents improve. Revenue growth is a better validation test than counting agent partnerships.",
      "智能体仍需确定性执行、权限、人类升级处理与异常管理。UiPath 可连接概率推理与受监管交易。既有自动化基础只有在客户持续付费编排时才有价值。收入增长比合作伙伴数量更能验证商业化。"
    ],
    "catalyst": [
      "Agentic automation upgrades lift net new ARR without destabilizing existing robots.",
      "智能体自动化升级提高新增 ARR，且不破坏既有机器人。"
    ],
    "monitor": [
      "Track ARR growth, retention, recurring versus upfront license recognition, GAAP margin and cash conversion.",
      "跟踪 ARR 增长、留存、经常性与前置许可确认、GAAP 利润率及现金转化。"
    ],
    "failure": [
      "Microsoft bundles orchestration; customers replace robots with native application agents; reported license growth outpaces recurring demand.",
      "微软捆绑编排；客户用原生应用代理替代机器人；许可增长超出持续需求。"
    ],
    "growth": [
      0.12,
      0.08
    ],
    "cashMargin": [
      0.06,
      0.2
    ],
    "dilution": 0.015,
    "multiple": 20,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 3,
    "ticker": "PDFS",
    "name": "PDF Solutions",
    "price": 55.5,
    "capM": 2318.568,
    "quarterRevenueM": 61.5,
    "periodEnd": "2026-06-30",
    "source": "https://www.pdf.com/resources/pdf-solutions-reports-second-quarter-2026-financial-results/",
    "layer": [
      "Manufacturing intelligence",
      "制造智能"
    ],
    "facts": [
      "Backlog $270.7M; GAAP gross margin 69%; GAAP operating margin 8%.",
      "订单积压 2.707 亿美元；GAAP 毛利率 69%；GAAP 营业利润率 8%。"
    ],
    "thesis": [
      "Complex chips and advanced packaging increase the value of yield data. PDF Solutions sells analytics, connectivity and manufacturing tools into that problem. AI is both a demand driver for semiconductor production and an analytical capability in the product. This is not a pure-play GPU vendor, and not every dollar of its revenue should be called AI revenue.",
      "复杂芯片与先进封装提高良率数据价值。PDF Solutions 提供分析、连接与制造工具。AI 既推动半导体需求，也用于产品分析。公司并非纯 GPU 厂商，不能将全部收入称为 AI 收入。"
    ],
    "catalyst": [
      "Backlog conversion and recurring analytics expand with higher-complexity chip production.",
      "订单积压兑现，经常性分析随芯片复杂度提升而扩张。"
    ],
    "monitor": [
      "Watch backlog conversion, analytics mix, GAAP margins, customer concentration and issuance after the 2026 offering.",
      "观察订单兑现、分析业务占比、GAAP 利润率、客户集中与 2026 年增发后的股数。"
    ],
    "failure": [
      "Fab spending stalls, large customers internalize analytics, or booked projects fail to become cash revenue.",
      "晶圆厂投入停滞，大客户自建分析，或订单未转化为现金收入。"
    ],
    "growth": [
      0.17,
      0.1
    ],
    "cashMargin": [
      0.06,
      0.22
    ],
    "dilution": 0.02,
    "multiple": 22,
    "exposure": "Enabler / 支撑型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 4,
    "ticker": "BOX",
    "name": "Box",
    "price": 34.49,
    "capM": 4818.90831,
    "quarterRevenueM": 321.1,
    "periodEnd": "2026-07-31",
    "source": "https://www.boxinvestorrelations.com/news-and-media/news/press-release-details/2026/Box-Reports-Second-Quarter-Fiscal-2027-Financial-Results/default.aspx",
    "layer": [
      "Enterprise content intelligence",
      "企业内容智能"
    ],
    "facts": [
      "Revenue +9%; RPO $1.7B; GAAP operating margin 10.2%.",
      "收入增长 9%；剩余履约义务 17 亿美元；GAAP 营业利润率 10.2%。"
    ],
    "thesis": [
      "Documents need permissions, provenance and retention policies before AI can act on them safely. Box's content repository can become a source of trusted context and workflow automation. Its attraction is a comparatively established business rather than frontier-model speculation. Upside depends on incremental AI monetization exceeding inference and selling costs; merely embedding a model is not a moat.",
      "AI 安全使用文档前需要权限、溯源与保留政策。Box 内容库可成为可信上下文与自动化来源。吸引力在于较成熟业务，而非前沿模型投机。AI 增量收入须超过推理与销售成本，仅嵌入模型不是护城河。"
    ],
    "catalyst": [
      "AI-enabled plans improve expansion and premium-tier mix.",
      "AI 套餐改善扩张与高端订阅占比。"
    ],
    "monitor": [
      "Monitor constant-currency growth, RPO, renewals, inference cost and common-share claims after preferred obligations.",
      "监测固定汇率增长、剩余履约义务、续约、推理成本与优先股之后的普通股权益。"
    ],
    "failure": [
      "Microsoft commoditizes document agents; AI features remain free; preferred or financing obligations reduce common-holder value.",
      "微软使文档代理商品化；AI 功能免费；优先股或融资义务侵蚀普通股价值。"
    ],
    "growth": [
      0.09,
      0.07
    ],
    "cashMargin": [
      0.1,
      0.22
    ],
    "dilution": 0.005,
    "multiple": 18,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 5,
    "ticker": "CAMT",
    "name": "Camtek",
    "price": 165.19,
    "capM": 7457.229491,
    "quarterRevenueM": 133.2,
    "periodEnd": "2026-06-30",
    "source": "https://www.camtek.com/news-and-events/camtek-announces-results-for-the-second-quarter-of-2026/",
    "layer": [
      "Advanced packaging inspection",
      "先进封装检测"
    ],
    "facts": [
      "GAAP gross margin 50.1%; GAAP operating margin 20.4%; Q3 guide $158-160M.",
      "GAAP 毛利率 50.1%；GAAP 营业利润率 20.4%；第三季收入指引 1.58 至 1.60 亿美元。"
    ],
    "thesis": [
      "Packaging density and expensive dies raise the cost of undetected defects. Inspection is a practical bottleneck with a tangible customer return: prevent high-value assemblies from failing. Camtek has a clearer physical role in the AI buildout than many software narratives. However, buying a bottleneck at an excessive multiple can still generate weak stock returns.",
      "封装密度与昂贵晶粒提高漏检成本。检测是实际瓶颈，客户收益是避免高价值组件失败。Camtek 在 AI 建设中的物理角色比许多软件故事更清晰，但高价购买瓶颈仍可能带来低股票回报。"
    ],
    "catalyst": [
      "HBM and advanced-packaging investment converts into accepted inspection systems.",
      "HBM 与先进封装投入转化为验收检测设备。"
    ],
    "monitor": [
      "Track bookings, shipment acceptance, gross margin, packaging concentration and acquisition integration.",
      "跟踪订单、验收、毛利率、封装集中及并购整合。"
    ],
    "failure": [
      "Equipment spending reverses, inspection competitors gain share, or growth already priced in fails to materialize.",
      "设备周期逆转，竞争对手抢份额，或已计价的增长未兑现。"
    ],
    "growth": [
      0.18,
      0.1
    ],
    "cashMargin": [
      0.18,
      0.25
    ],
    "dilution": 0.01,
    "multiple": 22,
    "exposure": "Enabler / 支撑型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 6,
    "ticker": "GTLB",
    "name": "GitLab",
    "price": 49.78,
    "capM": 8398.03534,
    "quarterRevenueM": 286.3,
    "periodEnd": "2026-07-31",
    "source": "https://ir.gitlab.com/news/news-details/2026/GitLab-Reports-Second-Quarter-Fiscal-Year-2027-Financial-Results/default.aspx",
    "layer": [
      "AI software delivery governance",
      "AI 软件交付治理"
    ],
    "facts": [
      "Revenue +21%; GAAP operating margin -20%; adjusted FCF $9.8M.",
      "收入增长 21%；GAAP 营业利润率负 20%；调整后自由现金流 980 万美元。"
    ],
    "thesis": [
      "More generated code can create more work for testing, security and release management. GitLab's opportunity is lifecycle governance and context, not just another code-completion interface. The investment case must survive falling developer-seat growth and competition from integrated coding platforms. Higher code volume creates value only when customers pay for the control layer.",
      "生成代码增多可能带来更多测试、安全与发布工作。GitLab 的机会是全生命周期治理与上下文，而非另一个补全界面。投资逻辑须经受席位增长放缓与集成编程平台竞争。代码量只有在客户为控制层付费时才有价值。"
    ],
    "catalyst": [
      "Agent workflows increase paid platform utilization and enterprise expansion.",
      "代理工作流提高付费平台用量与企业扩张。"
    ],
    "monitor": [
      "Monitor revenue per customer, paid AI attach, retention, GAAP losses and SBC-adjusted economics.",
      "监测客均收入、AI 付费附加率、留存、GAAP 亏损及股权薪酬后的经济性。"
    ],
    "failure": [
      "Agents reduce seats faster than usage pricing grows; GitHub wins governance; recurring share issuance absorbs business growth.",
      "代理减少席位速度快于用量收入增长；GitHub 赢得治理；持续发股吸收业务增长。"
    ],
    "growth": [
      0.18,
      0.11
    ],
    "cashMargin": [
      -0.1,
      0.22
    ],
    "dilution": 0.03,
    "multiple": 22,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 7,
    "ticker": "S",
    "name": "SentinelOne",
    "price": 25.06,
    "capM": 8558.682232,
    "quarterRevenueM": 292,
    "periodEnd": "2026-07-31",
    "source": "https://investors.sentinelone.com/financial-info/quarterly-results/default.aspx",
    "layer": [
      "AI security",
      "AI 安全"
    ],
    "facts": [
      "ARR $1.218B; revenue +21%; GAAP operating margin -31%.",
      "ARR 12.18 亿美元；收入增长 21%；GAAP 营业利润率负 31%。"
    ],
    "thesis": [
      "Autonomous threats and machine identities increase demand for detection and response. SentinelOne's AI-native security positioning is relevant, but a competitive category is not automatically a profitable investment. Distribution, efficacy and renewal behavior matter more than algorithm claims. The stock needs credible operating leverage after compensation, not only favorable adjusted margins.",
      "自主威胁与机器身份增加检测响应需求。SentinelOne 的 AI 安全定位相关，但竞争行业不自动等于有利投资。分发、效果与续约比算法宣传重要。股票需要薪酬成本后的经营杠杆，不仅是调整后利润。"
    ],
    "catalyst": [
      "Platform consolidation expands customer spending without sacrificing detection quality.",
      "平台整合提高客单支出且不降低检测质量。"
    ],
    "monitor": [
      "Watch ARR, large-customer growth, churn, gross margin and GAAP/non-GAAP margin divergence.",
      "观察 ARR、大客户增长、流失、毛利率与 GAAP/非 GAAP 差异。"
    ],
    "failure": [
      "CrowdStrike or Microsoft wins distribution, inference costs rise, or GAAP cash economics remain structurally weak.",
      "CrowdStrike 或微软赢得分发，推理成本上升，或 GAAP 现金经济性长期偏弱。"
    ],
    "growth": [
      0.18,
      0.11
    ],
    "cashMargin": [
      -0.15,
      0.2
    ],
    "dilution": 0.035,
    "multiple": 22,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 8,
    "ticker": "INOD",
    "name": "Innodata",
    "price": 70.07,
    "capM": 2436.40397,
    "quarterRevenueM": 92.1,
    "periodEnd": "2026-06-30",
    "source": "https://investor.innodata.com/news/news-details/2026/Innodata-Reports-Record-Second-Quarter-2026-Results/default.aspx",
    "layer": [
      "AI data and evaluation",
      "AI 数据与评估"
    ],
    "facts": [
      "Revenue +58%; net income $14.4M; adjusted EBITDA margin 27.5%.",
      "收入增长 58%；净利润 1440 万美元；调整后 EBITDA 利润率 27.5%。"
    ],
    "thesis": [
      "Model quality depends on evaluation, specialized data and human feedback. Innodata is a direct beneficiary of that work, with more immediate monetization than many product-stage AI companies. Labor-based delivery can limit scalability and bargaining power, however. The rank discounts the risk that a small number of large customers dictate workloads, prices and acceptance criteria.",
      "模型质量依赖评估、专业数据与人工反馈。Innodata 可直接受益，变现比许多产品阶段公司更直接。但劳动密集交付可能限制规模与议价力。排序折扣考虑少数大客户控制工作量、价格与验收的风险。"
    ],
    "catalyst": [
      "Evaluation and domain-specific data contracts broaden beyond anchor customers.",
      "评估与行业数据合同扩展至核心客户之外。"
    ],
    "monitor": [
      "Track customer concentration, backlog quality, revenue per delivery employee and cash collection.",
      "跟踪客户集中、订单质量、交付人均收入及回款。"
    ],
    "failure": [
      "Customers automate labeling internally or renegotiate prices; rapid growth depends on one program.",
      "客户内部自动化标注或压价；快速增长依赖单个项目。"
    ],
    "growth": [
      0.22,
      0.12
    ],
    "cashMargin": [
      0.12,
      0.18
    ],
    "dilution": 0.02,
    "multiple": 18,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 9,
    "ticker": "AMBA",
    "name": "Ambarella",
    "price": 68.65,
    "capM": 3020.982792,
    "quarterRevenueM": 108.1,
    "periodEnd": "2026-07-31",
    "source": "https://investor.ambarella.com/news-releases/news-release-details/ambarella-inc-announces-second-quarter-fiscal-year-2027",
    "layer": [
      "Edge AI silicon",
      "边缘 AI 芯片"
    ],
    "facts": [
      "GAAP gross margin 57.7%; net loss $6.7M; quarter revenue +13.2%.",
      "GAAP 毛利率 57.7%；净亏损 670 万美元；季度收入增长 13.2%。"
    ],
    "thesis": [
      "Edge inference can save bandwidth and support low-latency perception. Ambarella combines computer vision with specialized silicon, an attractive architecture when power budgets matter. Design wins take time and may never reach meaningful volume. The business should be judged on production revenue, gross profit and customer diversification, not an unverified design-win lifetime value.",
      "边缘推理可节省带宽并支持低延迟感知。Ambarella 将计算机视觉与专用芯片结合，在功耗约束下有吸引力。设计赢单需要时间且未必进入大规模量产。应看量产收入、毛利与客户多元化，而非未核实的终身设计订单价值。"
    ],
    "catalyst": [
      "Computer-vision chips move from sampling into volume automotive and IoT deployment.",
      "视觉芯片从样品转向汽车与物联网规模部署。"
    ],
    "monitor": [
      "Monitor production mix, gross margin, inventory, R&D burden and actual unit shipments.",
      "监测量产组合、毛利率、库存、研发负担与实际出货。"
    ],
    "failure": [
      "General-purpose chips win sockets, automotive launches slip, or higher revenue fails to cover development costs.",
      "通用芯片赢得插槽，汽车上市延期，或收入增长无法覆盖研发。"
    ],
    "growth": [
      0.16,
      0.1
    ],
    "cashMargin": [
      -0.06,
      0.18
    ],
    "dilution": 0.025,
    "multiple": 20,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "mid",
    "rank": 10,
    "ticker": "OUST",
    "name": "Ouster",
    "price": 44.39,
    "capM": 2929.315498,
    "quarterRevenueM": 55,
    "periodEnd": "2026-06-30",
    "source": "https://investors.ouster.com/news-releases/news-release-details/ouster-announces-results-second-quarter-2026",
    "layer": [
      "Physical AI sensing",
      "物理 AI 感知"
    ],
    "facts": [
      "Revenue +56%; GAAP gross margin 49%; GAAP net loss $18M.",
      "收入增长 56%；GAAP 毛利率 49%；GAAP 净亏损 1800 万美元。"
    ],
    "thesis": [
      "Robots and industrial autonomy need reliable sensing, but good sensors are not sufficient for good stock returns. Ouster has an observable product business and exposure to practical automation. Its valuation requires a large expansion in both sales and operating efficiency. Hardware qualification, software attachment and customer budgets must all progress together.",
      "机器人与工业自主需要可靠感知，但好传感器不等于好股票收益。Ouster 有可观察的产品业务与实际自动化敞口。当前估值需要收入与效率大幅扩张。硬件认证、软件附加与客户预算须同步进展。"
    ],
    "catalyst": [
      "Repeated production orders and perception software increase value per deployment.",
      "重复量产订单与感知软件提高每部署价值。"
    ],
    "monitor": [
      "Track sensor shipments, product gross profit, software mix, cash burn and diluted shares.",
      "跟踪传感器出货、产品毛利、软件占比、现金消耗与稀释股数。"
    ],
    "failure": [
      "Lidar pricing collapses, camera-only systems displace demand, or funding dilutes holders before scale.",
      "激光雷达价格下跌，纯摄像头系统替代需求，或规模化前融资稀释股东。"
    ],
    "growth": [
      0.23,
      0.13
    ],
    "cashMargin": [
      -0.25,
      0.16
    ],
    "dilution": 0.04,
    "multiple": 20,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 1,
    "ticker": "PLAB",
    "name": "Photronics",
    "price": 31.49,
    "capM": 1849.02982,
    "quarterRevenueM": 216,
    "periodEnd": "2026-08-02",
    "source": "https://www.sec.gov/Archives/edgar/data/810136/000081013626000006/plabQ32026EarningsEx99-1PR.htm",
    "layer": [
      "Semiconductor photomasks",
      "半导体光罩"
    ],
    "facts": [
      "Quarter revenue +2.7%; high-end IC reached 44% of IC revenue.",
      "季度收入增长 2.7%；高端 IC 占 IC 收入 44%。"
    ],
    "thesis": [
      "Photomasks are necessary to transfer semiconductor designs into production. Photronics offers a less fashionable, indirect route to chip complexity and design activity. It is not a leading-edge EUV monopoly and not all end markets benefit from AI. Its place near the top reflects valuation discipline and established commercial operations rather than a forecast of the fastest AI growth.",
      "光罩将半导体设计转化为生产。Photronics 是较低热度的芯片复杂度与设计活动间接受益路径。它并非先进 EUV 垄断，也非所有终端都受益 AI。靠前排序反映估值纪律与成熟业务，而非最快 AI 增长预测。"
    ],
    "catalyst": [
      "Higher-complexity IC designs and geographic capacity additions improve product mix.",
      "复杂 IC 设计与区域产能扩张改善组合。"
    ],
    "monitor": [
      "Track high-end IC revenue, utilization, capex, minority interests and cash location.",
      "跟踪高端 IC 收入、利用率、资本开支、少数股东权益与现金所在地。"
    ],
    "failure": [
      "Mask pricing falls, display demand weakens, or geopolitical limits strand overseas capacity.",
      "光罩价格下降，显示需求疲弱，或地缘限制使海外产能闲置。"
    ],
    "growth": [
      0.07,
      0.05
    ],
    "cashMargin": [
      0.12,
      0.16
    ],
    "dilution": 0.005,
    "multiple": 15,
    "exposure": "Indirect / 间接型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 2,
    "ticker": "RDVT",
    "name": "Red Violet",
    "price": 79.27,
    "capM": 1146.597823,
    "quarterRevenueM": 26.7,
    "periodEnd": "2026-06-30",
    "source": "https://investors.redviolet.com/news-releases/news-release-details/red-violet-reports-second-quarter-2026-financial-results/",
    "layer": [
      "Identity intelligence",
      "身份智能"
    ],
    "facts": [
      "Revenue +23%; GAAP net income $5M; operating cash flow $10.6M.",
      "收入增长 23%；GAAP 净利润 500 万美元；经营现金流 1060 万美元。"
    ],
    "thesis": [
      "Reliable entity resolution and identity data become more valuable as automated activity rises. Red Violet's attraction is an existing monetized data business rather than a speculative model launch. Differentiated data can support repeat usage, but access rights and compliance are essential parts of the moat. A rich multiple already anticipates successful growth, so business quality must be separated from entry value.",
      "自动化活动增长提高实体解析与身份数据价值。Red Violet 的吸引力是已变现的数据业务，而非投机模型发布。差异数据可支持重复用量，但授权与合规是护城河核心。高倍数已计入增长，业务质量须与买价分开。"
    ],
    "catalyst": [
      "Identity-graph usage expands across consequential transactions and repeat customers.",
      "身份图谱用量在重要交易与重复客户中扩张。"
    ],
    "monitor": [
      "Monitor organic growth, customer count, GAAP margin, data costs and post-offering share count.",
      "监测有机增长、客户数、GAAP 利润率、数据成本与增发后股数。"
    ],
    "failure": [
      "Privacy restrictions reduce usable data, customers concentrate, or share issuance undermines per-share growth.",
      "隐私限制减少可用数据，客户集中，或发股削弱每股增长。"
    ],
    "growth": [
      0.18,
      0.11
    ],
    "cashMargin": [
      0.17,
      0.25
    ],
    "dilution": 0.02,
    "multiple": 22,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 3,
    "ticker": "CEVA",
    "name": "Ceva",
    "price": 37.1,
    "capM": 1044.516071,
    "quarterRevenueM": 29,
    "periodEnd": "2026-06-30",
    "source": "https://www.ceva-ip.com/press/ceva-inc-announces-second-quarter-2026-financial-results/",
    "layer": [
      "Edge AI intellectual property",
      "边缘 AI 知识产权"
    ],
    "facts": [
      "License revenue $18.2M; royalties $10.8M; GAAP operating loss $2.1M.",
      "许可收入 1820 万美元；版税 1080 万美元；GAAP 营业亏损 210 万美元。"
    ],
    "thesis": [
      "Licensing neural-processing, sensing and connectivity IP gives Ceva a capital-light way to participate in smarter devices. The decisive step is converting licenses into royalty-bearing mass production. A license signed today may generate limited royalties for years. AI IP must prove efficiency and integration advantages against internal designs and other licensors.",
      "许可神经处理、感知与连接 IP，使 Ceva 以轻资产参与智能设备。关键是许可转成带版税的量产。今日签署的许可未来数年可能版税有限。AI IP 必须相对自研与其他许可商证明效率与集成优势。"
    ],
    "catalyst": [
      "New AI license programs generate royalty-bearing device shipments.",
      "新增 AI 许可项目转化为带版税设备出货。"
    ],
    "monitor": [
      "Track license/royalty split, shipment volumes, royalty per device and GAAP operating expense.",
      "跟踪许可与版税分拆、出货、单位版税与 GAAP 费用。"
    ],
    "failure": [
      "Customers build internal IP, programs remain pre-production, or royalty economics deteriorate.",
      "客户自研 IP，项目长期停留量产前，或版税经济性恶化。"
    ],
    "growth": [
      0.15,
      0.1
    ],
    "cashMargin": [
      -0.05,
      0.22
    ],
    "dilution": 0.02,
    "multiple": 22,
    "exposure": "Enabler / 支撑型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 4,
    "ticker": "DSP",
    "name": "Viant Technology",
    "price": 12.24,
    "capM": 797.96232,
    "quarterRevenueM": 104.254,
    "periodEnd": "2026-06-30",
    "source": "https://investors.viantinc.com/news-releases/news-release-details/viant-technology-announces-second-quarter-2026-financial-results/",
    "layer": [
      "AI advertising decisions",
      "AI 广告决策"
    ],
    "facts": [
      "Contribution ex-TAC $60.204M; revenue +34%; adjusted EBITDA $14.208M.",
      "扣流量成本贡献 6020.4 万美元；收入增长 34%；调整后 EBITDA 1420.8 万美元。"
    ],
    "thesis": [
      "Programmatic buying turns prediction into measurable advertiser decisions. Viant's identity, content and attention context may help smaller advertisers access connected television effectively. Gross revenue includes media-related economics, so comparing its sales multiple directly with SaaS is misleading. The Up-C structure and tax receivable obligations also make a simple common-equity valuation inadequate.",
      "程序化购买将预测转成可衡量的广告决策。Viant 的身份、内容与注意力上下文可帮助广告主接触联网电视。总收入包含媒体相关经济，直接与 SaaS 销售倍数比较会误导。Up-C 结构与税收应收协议义务也使简化普通股估值不充分。"
    ],
    "catalyst": [
      "CTV campaigns expand while contribution ex-TAC and retained advertiser spend grow.",
      "CTV 广告扩张，同时扣流量成本贡献与留存广告支出增长。"
    ],
    "monitor": [
      "Monitor contribution ex-TAC, advertiser retention, GAAP operating profit and Class A/B economic interests.",
      "监测扣流量成本贡献、广告主留存、GAAP 营业利润与 A/B 类经济权益。"
    ],
    "failure": [
      "Walled gardens restrict inventory, privacy rules impair targeting, or Up-C/TRA claims absorb shareholder upside.",
      "封闭平台限制库存，隐私规则削弱定向，或 Up-C/税收协议吸收股东收益。"
    ],
    "growth": [
      0.16,
      0.1
    ],
    "cashMargin": [
      -0.02,
      0.1
    ],
    "dilution": 0.02,
    "multiple": 20,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 5,
    "ticker": "SLP",
    "name": "Simulations Plus",
    "price": 18.5,
    "capM": 374.4215,
    "quarterRevenueM": 21.9,
    "periodEnd": "2026-05-31",
    "source": "https://www.simulations-plus.com/resource/simulations-plus-reports-third-quarter-fiscal-2026-financial-results/",
    "layer": [
      "AI-assisted drug modeling",
      "AI 辅助药物建模"
    ],
    "facts": [
      "Software $12.6M, flat YoY; services $9.3M; GAAP net income $3.6M.",
      "软件收入 1260 万美元，同比持平；服务 930 万美元；GAAP 净利润 360 万美元。"
    ],
    "thesis": [
      "Drug development can benefit from validated simulation and informed trial design without betting on a single molecule. Simulations Plus sells tools and services into that workflow. Its AI exposure is blended with mechanistic modeling and consulting, not a pure generative-AI business. Improving software growth is necessary before a strong recurring-revenue compounder thesis is justified.",
      "药物研发可通过验证仿真与试验设计受益，而不押注单个分子。Simulations Plus 销售工具与服务。AI 敞口与机理建模、咨询混合，并非纯生成式 AI。软件增长改善是成立经常性复利逻辑的必要条件。"
    ],
    "catalyst": [
      "Validated modeling products gain software renewals and broader development usage.",
      "经验证模型产品提升软件续约与研发用量。"
    ],
    "monitor": [
      "Track software versus services growth, renewals, organic margins, acquisitions and customer R&D budgets.",
      "跟踪软件与服务增长、续约、有机利润率、并购与客户研发预算。"
    ],
    "failure": [
      "Software remains stagnant, consulting replaces high-margin licenses, or acquisition integration disappoints.",
      "软件停滞，咨询替代高利润许可，或并购整合不佳。"
    ],
    "growth": [
      0.09,
      0.07
    ],
    "cashMargin": [
      0.12,
      0.2
    ],
    "dilution": 0.015,
    "multiple": 18,
    "exposure": "Embedded / 嵌入型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 6,
    "ticker": "AOSL",
    "name": "Alpha and Omega Semiconductor",
    "price": 30.24,
    "capM": 901.36368,
    "quarterRevenueM": 170.4,
    "periodEnd": "2026-06-30",
    "source": "https://investor.aosmd.com/press-releases/press-release-details/2026/Alpha-and-Omega-Semiconductor-Reports-Financial-Results-for-Fiscal-Fourth-Quarter-and-Fiscal-Year-Ended-June-30-2026/default.aspx",
    "layer": [
      "AI power management",
      "AI 电源管理"
    ],
    "facts": [
      "FY26 revenue $678.9M; quarterly GAAP gross margin 23.1%; quarterly operating loss $11M.",
      "FY26 收入 6.789 亿美元；季度 GAAP 毛利率 23.1%；季度营业亏损 1100 万美元。"
    ],
    "thesis": [
      "High-current accelerators need reliable power conversion and protection. AOSL's relevant products are controllers, power stages and MOSFETs, supported by its published AI-server portfolio. Diversified consumer and industrial demand remains important. This is a cyclical turnaround candidate, not evidence that every product sale benefits from AI demand.",
      "高电流加速器需要可靠电源转换与保护。AOSL 的相关产品是控制器、功率级与 MOSFET，公司公布的 AI 服务器产品组合提供证据。消费与工业需求仍重要。这是周期性转型候选，不能将每笔销售都归因于 AI。"
    ],
    "catalyst": [
      "Server power content rises while utilization and manufacturing efficiency recover.",
      "服务器电源含量提高，同时利用率与制造效率恢复。"
    ],
    "monitor": [
      "Monitor computing mix, gross margin, inventory, cash capex and GAAP profitability.",
      "监测计算业务组合、毛利率、库存、现金资本开支与 GAAP 盈利。"
    ],
    "failure": [
      "Power devices commoditize, the manufacturing cycle worsens, or AI wins cannot offset legacy-market weakness.",
      "功率器件商品化，制造周期恶化，或 AI 赢单无法抵消传统市场疲弱。"
    ],
    "growth": [
      0.08,
      0.06
    ],
    "cashMargin": [
      -0.03,
      0.09
    ],
    "dilution": 0.02,
    "multiple": 16,
    "exposure": "Enabler / 支撑型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 7,
    "ticker": "CRNC",
    "name": "Cerence",
    "price": 8.09,
    "capM": 386.24896,
    "quarterRevenueM": 69.6,
    "periodEnd": "2026-06-30",
    "source": "https://investors.cerence.com/news-events/press-releases/detail/380/cerence-ai-reports-third-quarter-results-revenue-up-12-yoy-connected-services-revenue-up-20-yoy-operating-cash-flow-of-20m-supports-first-ever-share-repurchase-program",
    "layer": [
      "Automotive conversational AI",
      "汽车对话 AI"
    ],
    "facts": [
      "Connected services +20%; GAAP net income $1.5M; reported FCF $19.6M.",
      "联网服务增长逾 20%；GAAP 净利润 150 万美元；报告自由现金流 1960 万美元。"
    ],
    "thesis": [
      "In-vehicle agents can benefit from embedded OEM relationships and automotive-grade integration. Cerence has a real installed base, but car cycles, fixed license agreements and debt complicate the apparent low sales multiple. A quarter with strong cash collection does not establish durable owner earnings. Evaluate connected-service growth separately from one-time licensing and patent settlements.",
      "车载代理可受益于 OEM 嵌入关系与车规集成。Cerence 有实际装机基础，但汽车周期、固定许可与债务使低销售倍数更复杂。强回款单季不证明持续股东收益。应将联网服务与一次许可、专利和解分开。"
    ],
    "catalyst": [
      "xUI production launches translate into recurring connected services.",
      "xUI 量产上市转化为经常性联网服务。"
    ],
    "monitor": [
      "Track recurring royalties, fixed-license timing, connected attach, debt maturity and normalized cash conversion.",
      "跟踪经常性版税、固定许可时点、联网附加率、债务到期与正常化现金转化。"
    ],
    "failure": [
      "OEMs use alternative assistants, license settlements distort growth, or refinancing consumes equity value.",
      "OEM 使用其他助手，许可和解扭曲增长，或再融资消耗股权价值。"
    ],
    "growth": [
      0.08,
      0.06
    ],
    "cashMargin": [
      0.03,
      0.13
    ],
    "dilution": 0.025,
    "multiple": 16,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 8,
    "ticker": "AI",
    "name": "C3.ai",
    "price": 11.01,
    "capM": 1706.53899,
    "quarterRevenueM": 52.4,
    "periodEnd": "2026-07-31",
    "source": "https://ir.c3.ai/news-releases/news-release-details/c3-ai-announces-fiscal-first-quarter-2027-results",
    "layer": [
      "Enterprise AI turnaround",
      "企业 AI 转型"
    ],
    "facts": [
      "GAAP gross margin 32%; non-GAAP operating loss $36.2M; cash/securities $651.1M.",
      "GAAP 毛利率 32%；非 GAAP 营业亏损 3620 万美元；现金与证券 6.511 亿美元。"
    ],
    "thesis": [
      "C3.ai offers enterprise applications with direct AI relevance, but product relevance is not proof of shareholder returns. The current case is a turnaround: improve paid deployment, delivery cost and sustainable retention. A large cash balance buys time but can disappear if deployments remain services-heavy. Its low rank reflects execution uncertainty and the gap between bookings rhetoric and durable economics.",
      "C3.ai 提供直接相关的企业 AI 应用，但产品相关性不证明股东回报。当前逻辑是转型：改善付费部署、交付成本与留存。大额现金可以买时间，但重服务交付会消耗现金。靠后排序体现执行不确定与订单宣传到持续经济性的差距。"
    ],
    "catalyst": [
      "Repeatable deployments lift gross margin and retention rather than only bookings.",
      "可重复部署提高毛利与留存，而不只是订单。"
    ],
    "monitor": [
      "Track GAAP gross margin, operating loss, cash burn, renewals and dilution; do not extrapolate one positive cash quarter.",
      "跟踪 GAAP 毛利、营业亏损、现金消耗、续约与稀释；不外推单个现金流为正季度。"
    ],
    "failure": [
      "Turnaround fails, project delivery remains costly, or stock compensation dilutes holders faster than revenue grows.",
      "转型失败，项目交付成本居高，或股权薪酬稀释快于收入增长。"
    ],
    "growth": [
      0.17,
      0.11
    ],
    "cashMargin": [
      -0.55,
      0.14
    ],
    "dilution": 0.05,
    "multiple": 18,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 9,
    "ticker": "BBAI",
    "name": "BigBear.ai",
    "price": 2.65,
    "capM": 1269.667791,
    "quarterRevenueM": 36.7,
    "periodEnd": "2026-06-30",
    "source": "https://bigbear.ai/newsroom/bigbear-ai-announces-second-quarter-2026-results-delivers-13-growth-20-new-contract-wins-and-expanded-margins-affirms-full-year-revenue-guidance/",
    "layer": [
      "Defense and mission AI",
      "国防与任务 AI"
    ],
    "facts": [
      "Backlog $269.6M; gross margin 32.8%; adjusted EBITDA loss $11.6M.",
      "订单积压 2.696 亿美元；毛利率 32.8%；调整后 EBITDA 亏损 1160 万美元。"
    ],
    "thesis": [
      "Mission software, secure deployment and procurement relationships can be durable. BigBear.ai offers relevant exposure, including acquired generative-AI capabilities, but government contracting has long cycles and significant services content. Backlog is not the same as funded, high-margin cash flow. Acquisition-led growth needs careful comparison with organic expansion and the shares used to finance it.",
      "任务软件、安全部署与采购关系可能持续。BigBear.ai 提供相关敞口，包括并购来的生成式 AI，但政府合同周期长且服务占比高。积压不等于有资金支持的高利润现金流。并购增长须与有机扩张及融资股数比较。"
    ],
    "catalyst": [
      "Funded defense/security contracts convert into higher-margin repeat deployments.",
      "获拨款的国防安全合同转化为高利润重复部署。"
    ],
    "monitor": [
      "Track funded backlog, organic revenue, gross margin, operating losses, acquisitions and fully diluted claims.",
      "跟踪获拨款积压、有机收入、毛利、营业亏损、并购与完全稀释权益。"
    ],
    "failure": [
      "Budget timing slips, acquired revenue masks weak organic demand, or warrants and issuance absorb upside.",
      "预算延期，并购收入掩盖有机需求疲弱，或权证与增发吸收上行。"
    ],
    "growth": [
      0.16,
      0.1
    ],
    "cashMargin": [
      -0.35,
      0.12
    ],
    "dilution": 0.055,
    "multiple": 18,
    "exposure": "Direct / 直接型",
    "modelAvailable": true
  },
  {
    "size": "small",
    "rank": 10,
    "ticker": "POET",
    "name": "POET Technologies",
    "price": 7.79,
    "capM": 1347.9816,
    "quarterRevenueM": 0.569925,
    "periodEnd": "2026-06-30",
    "source": "https://www.sec.gov/Archives/edgar/data/1437424/000117184326005485/exh_991.htm",
    "layer": [
      "Optical AI interconnects",
      "光学 AI 互连"
    ],
    "facts": [
      "Quarter revenue $0.570M; net loss $11.3M; quote cap corrected with 173.04M shares.",
      "季度收入约 57 万美元；净亏损 1130 万美元；报价市值按 1.7304 亿股修正。"
    ],
    "thesis": [
      "Optical integration addresses an important bandwidth and power problem, but POET remains an early commercialization bet. The potential market is far larger than current sales; that mismatch is a risk, not automatically an opportunity. Orders, qualification and volume cash revenue must be distinguished. Conflicting vendor capitalization also prevents treating a cheap-looking share price as cheap equity.",
      "光学集成解决带宽与功耗问题，但 POET 仍属早期商业化押注。潜在市场远大于收入，这种落差是风险，不自动等于机会。订单、认证与量产现金收入必须区分。供应商市值冲突也阻止将低股价误判为低估值。"
    ],
    "catalyst": [
      "Customer qualification completes and repeated volume revenue becomes material.",
      "客户认证完成，重复量产收入达到实质规模。"
    ],
    "monitor": [
      "Monitor recognized product revenue, shipment acceptance, unit economics, dilution and the post-financing share register.",
      "监测确认产品收入、验收、单位经济、稀释与融资后股东登记。"
    ],
    "failure": [
      "Qualification fails or volume ramps stall; follow-on capital and warrants impair per-share returns. No standard CAGR valuation is published for this pre-scale case.",
      "认证失败或量产停滞；后续资本与权证损害每股回报。此规模前案例不发布标准 CAGR 估值。"
    ],
    "growth": [
      0.4,
      0.2
    ],
    "cashMargin": [
      -1,
      0.12
    ],
    "dilution": 0.08,
    "multiple": 18,
    "exposure": "Direct / 直接型",
    "modelAvailable": false
  }
];
