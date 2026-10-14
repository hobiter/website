import { SOURCES } from "./operatingMetrics";
export const REPORT = [
  {
    title: [
      "1. Executive summary: own the economics, not the AI label",
      "1. 摘要：研究经济性，而非 AI 标签",
    ],
    source: SOURCES.quarter,
    paragraphs: [
      [
        "CoreWeave provides a relatively direct listed exposure to the expansion of AI computing capacity. That exposure is economically different from owning a semiconductor designer or an asset-light software platform. It procures and operates infrastructure, signs customer contracts and raises substantial capital before the resulting capacity earns revenue. The opportunity is to capture demand for specialized compute; the central risk is that financing and hardware replacement absorb much of the value created by that demand.",
        "CoreWeave 是 AI 算力扩张较直接的上市敞口，但经济性不同于芯片设计或轻资产软件。它采购运营基础设施、签客户合同，并在产能产生收入前筹集大量资本。机会是承接专业算力需求，核心风险是融资与硬件更新吸收需求创造的大部分价值。",
      ],
      [
        "Our investment question is therefore not whether AI spending will grow. It is whether CoreWeave can deliver its committed deployments, recover the economic cost of the equipment and leave a durable residual for common shareholders. Revenue growth, backlog and adjusted EBITDA are useful evidence but cannot answer that question alone. The report treats equity as a residual claim after reinvestment and financing, and does not force a favorable valuation simply because the industry outlook is attractive.",
        "问题不是 AI 支出是否增长，而是 CoreWeave 能否交付承诺产能、收回设备经济成本，并给普通股留下持久剩余。收入、订单和调整 EBITDA 有用，但不能单独回答。本文把股权视为再投入与融资后的剩余索取权，不因行业前景好就强行给出有利估值。",
      ],
    ],
  },
  {
    title: [
      "2. History, listing and the limits of the record",
      "2. 历史、上市与数据边界",
    ],
    source: SOURCES.ipo,
    paragraphs: [
      [
        "The company was established in 2017, launched its cloud platform in 2020 and became publicly listed in March 2025. Its financial history is much shorter than the mature companies in this research library. The database covers available audited annual results from 2022 through 2025 and discrete quarters from 2025 onward. A manually extracted 2022 row is labeled, and unavailable early balance-sheet values are not filled by extrapolation.",
        "公司成立于 2017 年，2020 年推出云平台，2025 年三月上市。其财务记录远短于研究库成熟企业。数据库涵盖 2022 至 2025 年可得审计年度结果及 2025 年起独立季度；手工提取的 2022 行明确标记，早期资产负债缺项不外推填充。",
      ],
      [
        "Pre-IPO financing, preferred-stock conversion, stock splits and the introduction of publicly traded Class A shares complicate per-share comparisons. Historical weighted shares do not equal the economically outstanding shares at a later date. The public-market series starts after listing, with no invented private-market valuation for earlier years. A recent listing also means investors have observed only a short portion of the equipment and contract replacement cycle.",
        "上市前融资、优先股转换、拆股与 A 类公开交易令每股比较复杂。历史加权股数不等于后来经济流通股数。公开市场序列从上市后开始，不编造早年私募估值。上市时间短也意味着尚未充分观察设备与合同更新周期。",
      ],
    ],
  },
  {
    title: [
      "3. Business model: service delivery backed by physical capital",
      "3. 商业模式：实体资本支撑的服务交付",
    ],
    source: SOURCES.annual,
    paragraphs: [
      [
        "Committed contracts and on-demand usage create different revenue patterns. Committed arrangements generally give customers access to specified capacity over time and may include take-or-pay features and prepayments. Those terms reduce some utilization and collection uncertainty, but do not remove the provider’s obligation to make the infrastructure available. Delivery delays, service-level failures, customer financial distress and renewal pricing remain important. A signed contract is not the same asset as collected, distributable cash.",
        "承诺合同与按需使用形成不同收入模式。承诺安排通常在一定期间提供容量，可含照付不议与预付款；可降低部分利用率和收款不确定性，但不取消提供基础设施的责任。延期、服务水平失败、客户财务困难和续约价格仍重要。签约不是已收可分配现金。",
      ],
      [
        "The platform layer matters because orchestration, networking, storage and observability can improve usable compute rather than merely installed GPU count. Faster workload completion and reliable deployment can support differentiation. The moat test is whether these capabilities create measurable customer value after factoring in price and switching cost. We do not assign an unsupported standalone software valuation to every product initiative or assume software-like margins for the consolidated hardware-intensive business.",
        "平台层的编排、网络、存储和可观测性可提升可用算力，而不仅是装机 GPU 数。更快任务完成与可靠部署可带来差异化。护城河检验是计入价格与转换成本后是否创造客户价值。本文不为每个产品项目编造独立软件价值，也不假设硬件密集整体拥有软件利润率。",
      ],
    ],
  },
  {
    title: [
      "4. Demand evidence: RPO is not backlog or annual revenue",
      "4. 需求证据：RPO 不等于订单或年度收入",
    ],
    source: SOURCES.quarter,
    paragraphs: [
      [
        "SEC-reported remaining performance obligations represent contracted transaction consideration for undelivered or partly undelivered services. The company’s broader revenue backlog also includes estimated additional amounts under committed contracts. We show both measures and the reconciliation rather than treating them as interchangeable. The recognition schedule is a management expectation over multi-year windows, not a guarantee of annual revenue, operating margin or cash collection.",
        "SEC 剩余履约义务表示未交付或部分未交付服务的合同对价。更广泛的收入订单还含承诺合同下预计额外金额。本文同时列出与调节，不混为一谈。确认计划是管理层对多年窗口的预期，非年度收入、利润或收款保证。",
      ],
      [
        "New commitments are valuable only if the associated capacity is funded, built and accepted on workable terms. Backlog growth can increase both future opportunity and near-term capital requirements. The investor should monitor recognized revenue, remaining commitments, delivery timing and incremental investment together. Adding all subsequently announced commitments to quarter-end RPO would mix dates and definitions, so the report keeps later announcements separate.",
        "新承诺只有在相关产能能以可行条件融资、建设和验收时才有价值。订单增长同时增加未来机会和近期资本需求。应一起监控已确认收入、未履约承诺、交付时间与增量投资。把之后宣布承诺全部加到期末 RPO 会混合日期与口径，因此分开列示。",
      ],
    ],
  },
  {
    title: [
      "5. Customer concentration and the circularity question",
      "5. 客户集中与循环关系",
    ],
    source: SOURCES.annual,
    paragraphs: [
      [
        "Microsoft represented a large share of 2025 revenue according to the annual filing. The latest quarter instead identifies significant customers anonymously; its letter labels must not be casually assigned to named companies or matched across periods. Diversifying from one customer into a small number of large AI buyers can reduce a single exposure without creating a broadly diversified customer base. The new mix also changes delivery demands and counterparty credit risk.",
        "年报披露 Microsoft 占 2025 收入较大比例。最新季度对重要客户匿名，不能把字母随意对应名称或跨期匹配。从一个客户分散到少数大型 AI 买家，可降低单一敞口，但不等于广泛客户群；新结构也改变交付与信用风险。",
      ],
      [
        "Some customers, suppliers, strategic investors and financing participants have overlapping relationships in the AI ecosystem. That does not by itself prove improper revenue, but it makes the economics harder to evaluate from headline announcements. Investors should examine contract consideration, equity incentives, prepayments, collateral and the independence of end demand. We do not net customer-related investments against backlog or assume that an investment guarantees future cash collection.",
        "AI 生态中客户、供应商、战略投资者与融资参与者可能关系重叠，不能单凭此认定收入不当，但标题公告不足以评估经济性。应检查对价、股权激励、预付款、抵押和最终需求独立性。不把客户相关投资与订单相抵，也不假设投资保证收款。",
      ],
    ],
  },
  {
    title: [
      "6. GAAP losses, EBITDA and cash conversion",
      "6. GAAP 亏损、EBITDA 与现金转换",
    ],
    source: SOURCES.release,
    paragraphs: [
      [
        "Adjusted EBITDA can illuminate a deployment’s operating contribution before depreciation and financing, but those exclusions are exceptionally consequential here. GPU and infrastructure assets consume capital, and substantial debt generates interest obligations. The report displays GAAP operating loss, net loss, adjusted operating income and adjusted EBITDA side by side. These are not competing answers to the same question; each occupies a different point in the cash and earnings waterfall.",
        "调整 EBITDA 可说明折旧融资前经营贡献，但此处被剔除项目尤其重要：GPU 与基础设施消耗资本，大量债务产生利息。报告并列 GAAP 经营亏损、净亏损、调整经营利润与 EBITDA；它们处于现金和盈利瀑布不同位置，不是同一问题的竞争答案。",
      ],
      [
        "Gross profit is not supplied as a comparable standalone margin because technology and infrastructure expenses contain major asset costs outside the cost-of-revenue caption. Simply subtracting that caption from revenue would make the business look more profitable than a fully burdened infrastructure operation. Operating cash flow is also affected by customer advances and collections. A positive OCF number cannot be read as equity free cash when cash equipment purchases are much larger.",
        "不提供可比独立毛利率，因为技术与基础设施费用包含收入成本标题之外的重要资产成本。简单相减会夸大完整基础设施盈利。经营现金流还受客户预付与收款影响；当设备现金购置更大时，正 OCF 不等于股权自由现金。",
      ],
    ],
  },
  {
    title: [
      "7. GPU life, replacement and economic capital expenditure",
      "7. GPU 寿命、更新与经济资本支出",
    ],
    source: SOURCES.annual,
    paragraphs: [
      [
        "The accounting useful life for technology equipment is not a prediction of competitive rental economics. An older GPU can remain physically useful while its achievable price declines or its power efficiency becomes unattractive for a particular workload. Conversely, older hardware may remain valuable for inference or less demanding jobs. The report therefore does not assume either immediate obsolescence or a guaranteed six-year premium rental stream. Equipment-vintage utilization, realized pricing and renewal terms would be needed to resolve this question precisely.",
        "设备会计寿命不预测竞争租赁经济。旧 GPU 仍可用，但可实现价格可能下降，某些任务的能效也可能失去吸引力；推理或轻负载仍可能有价值。因此不假设立即淘汰，也不保证六年高价出租。精确判断需设备代际利用率、实际价格与续约条款。",
      ],
      [
        "Cash capex, additions to property and equipment, financed purchases and the issuer’s capex measure have different timing and scope. The table preserves those distinctions. It does not add a disclosed PPE-liability amount mechanically to cash capex, since doing so can double count settlements or financed additions. The forecast instead models replacement investment plus incremental capital needed for revenue growth, with an additional replacement-cost stress. This is an economic assumption rather than an audited capex schedule.",
        "现金资本支出、固定资产新增、融资采购和公司资本支出口径的范围与时点不同。表格保留差异，不机械将披露 PPE 负债加到现金支出，避免重复结算或融资新增。预测采用更新投资加收入增长所需增量资本，并加入额外更新成本压力，属于经济假设而非审计资本计划。",
      ],
    ],
  },
  {
    title: [
      "8. Power, data centers and deployment constraints",
      "8. 电力、数据中心与部署瓶颈",
    ],
    source: SOURCES.release,
    paragraphs: [
      [
        "Active power and contracted power are not synonyms. Contracted capacity must still become available, be equipped and support customer workloads; some projects can be delayed by utility interconnection, construction, cooling or component delivery. Increasing rack density can improve compute per facility but may require specialized physical systems. Counting every contracted megawatt as already monetized would overstate current scale and ignore the lead time between signed demand and revenue.",
        "运行电力与签约电力不是同义。签约容量仍需可用、安装设备并承载任务，项目可能受电网接入、建设、冷却或零件交付影响。高机架密度可提升单设施算力，但需专用实体系统。把所有签约兆瓦视为已变现会高估规模并忽略收入滞后。",
      ],
      [
        "Power economics depend on site location, contract terms, cooling efficiency and utilization. The public disclosures do not provide a complete per-site profitability or PUE series, so we leave these metrics unquantified. The monitoring framework pairs active-power growth with revenue conversion, capital deployment and contractual service performance. A capacity target is informative about ambition, not sufficient evidence that the associated investment earns an attractive return.",
        "电力经济取决于地点、合同、冷却与利用率。公开披露没有完整站点利润或 PUE 序列，因此不编造量化。监测把运行电力增长与收入转换、资本部署及服务履约相连。容量目标说明规划，不能证明投资回报有吸引力。",
      ],
    ],
  },
  {
    title: [
      "9. Debt, prepayments and liquidity are different resources",
      "9. 债务、预付款与流动性",
    ],
    source: SOURCES.quarter,
    paragraphs: [
      [
        "Asset-backed lending can match portions of infrastructure investment to customer contracts, but it also encumbers the assets and contractual cash flows. Subsidiary non-recourse borrowing still affects the residual value of the consolidated business. Parent liquidity cannot automatically access every subsidiary’s cash. Restricted balances and collateral requirements therefore remain distinct from unrestricted cash, while an undrawn loan commitment is not counted as cash already received.",
        "资产支持贷款可匹配基础设施与客户合同，也会抵押资产和合同现金。子公司无追索借款仍影响合并业务剩余价值，母公司不能自动动用全部子公司现金。受限余额与抵押要求因此区别于非受限现金，未提款承诺不算已收到现金。",
      ],
      [
        "Customer prepayments can fund deployment and reduce collection uncertainty, but they create obligations to deliver future service. Treating the inflow as recurring profit would overstate economic cash generation. Debt principal repayments, cash interest and capitalized interest also have different financial-statement locations. The maturity table shows the quarter-end principal schedule only; later debt transactions change it, and a full monthly covenant and liquidity waterfall is outside this model.",
        "客户预付款可资助部署并降低收款不确定性，但对应未来服务义务，不能视为重复利润。本金、现金利息和资本化利息处于不同报表位置。到期表仅展示季度末本金计划，后续交易会改变；模型不声称完整月度契约与流动性瀑布。",
      ],
    ],
  },
  {
    title: [
      "10. September financing and per-share claims",
      "10. 九月融资与每股索取权",
    ],
    source: SOURCES.convertible,
    paragraphs: [
      [
        "The completed September convertible offering must be read from the final closing filing rather than the earlier marketing presentation. The report records final principal, net proceeds before remaining expenses, capped-call cost and conversion terms. A lower coupon does not make the capital free: conversion rights have economic value and capped calls consume cash. The model’s default treats the notes as debt, with no automatic conversion or simultaneous equity dilution from those same instruments.",
        "已完成九月可转债应以最终交割文件而非早期营销展示为准。报告列出最终本金、剩余费用前净所得、封顶看涨成本与转换条款。低票息不代表资本免费，转换权有价值，封顶看涨消耗现金。默认将票据作债务，不同时为同一工具自动计转换与股数稀释。",
      ],
      [
        "The bridge combines June balances with this known issuance and assumes its remaining proceeds are retained. It is an explicitly incomplete pro forma, not a reconciled October balance sheet. Other draws, repayments, equipment payables, investment spending and offering expenses may materially change liquidity. An editable eligible-cash input and a separate dilution stress expose some of this uncertainty, but cannot replace an issuer-specific fully diluted capital-structure audit.",
        "桥接结合六月余额与已知发行，并假设剩余所得留存，是明确不完整的模拟合并，不是已核对十月资产负债表。其他提款、还款、设备应付、投资支出和发行费用可显著改变流动性。可编辑现金与独立稀释压力揭示部分不确定性，但不替代完整资本结构审计。",
      ],
    ],
  },
  {
    title: [
      "11. Competition, management and capital discipline",
      "11. 竞争、管理层与资本纪律",
    ],
    source: SOURCES.annual,
    paragraphs: [
      [
        "The competitive set includes hyperscale clouds, specialist providers and customer-built infrastructure. Large platforms can bundle services and finance capacity from diversified cash flows. CoreWeave’s response depends on specialized performance, deployment speed and usable platform capabilities, not simply owning NVIDIA equipment. The customer may also be a competitor; that relationship can be commercially beneficial while limiting long-run pricing power. We do not assume all industry growth accrues to this one provider.",
        "竞争来自大型云、专业提供商及客户自建。大型平台可打包服务，以多元现金流融资。CoreWeave 依赖专业性能、部署速度与可用平台能力，而非仅拥有 NVIDIA 设备。客户亦可为竞争者，关系有商业价值但可能限制长期定价权。不假设行业增长全归一家。",
      ],
      [
        "Founders and management have executed unusually rapid scaling, but the appropriate test is returns after capital and financing costs. Governance also matters when voting power differs from economic ownership. Investors should monitor project delivery, contract quality, related-party arrangements, dilution and the terms of new financing. Faster growth is not necessarily a better outcome if the incremental project requires expensive capital and leaves common equity with little surplus.",
        "创始团队实现快速扩张，但检验应是资本和融资成本后的回报。投票权与经济所有权不同时，治理也重要。应监控交付、合同质量、关联安排、稀释与新融资条件。若增量项目需昂贵资本且普通股剩余少，快增长未必更好。",
      ],
    ],
  },
  {
    title: [
      "12. Forecast design and the financing burden",
      "12. 预测设计与融资负担",
    ],
    source: SOURCES.outlook,
    paragraphs: [
      [
        "The revenue starting point is the midpoint of the dated 2026 guidance. The model explicitly charges an illustrative second-half 2026 deployment stub rather than jumping over the largest near-term investment phase. Subsequent fiscal years contain research growth, GAAP-like operating margins including normal compensation, replacement depreciation, growth investment and working-capital assumptions. Loss periods receive no automatic cash tax benefit. A financing-need indicator is diagnostic and is not subtracted again from enterprise value.",
        "收入起点为注明日期的 2026 指引中点。模型明确计入示例 2026 下半年部署部分，不跳过重大近期投资。后续年度包含研究增长、含正常薪酬的类 GAAP 经营率、更新折旧、增长投资和营运资本假设。亏损期不自动给现金税利益。融资需求指标仅供诊断，不再从企业价值重复扣除。",
      ],
      [
        "FCFF is operating profit after assumed tax plus depreciation less economic capex and working-capital investment. Replacement capex equals modeled depreciation; net growth investment uses an explicit incremental capital-to-sales ratio. At the terminal stage, reinvestment falls only as growth falls, not because GPUs cease needing replacement. These equations make the cost of scale visible, but they do not solve project-by-project collateral, tax shields or the actual mix of debt and equity financing.",
        "FCFF 为假设税后经营利润加折旧，减经济资本支出与营运资本投资。更新支出等于模型折旧，净增长投资用明确增量资本/销售比。终值再投资下降来自增速下降，不是 GPU 不再更新。方程揭示规模成本，但不解决项目抵押、税盾或真实债股融资组合。",
      ],
    ],
  },
  {
    title: [
      "13. Valuation, timing and scenario interpretation",
      "13. 估值、时点与情景解释",
    ],
    source: SOURCES.quarter,
    paragraphs: [
      [
        "Enterprise value includes the negative cash flows of expansion as well as mature cash generation. The bridge then deducts current debt and reported finance leases and adds eligible cash; operating lease costs remain in operating margins rather than being subtracted twice. The time convention is anchored to June 30 with a half-year stub and subsequent year-end cash flows. Comparing this result with the October market quote is approximate, not a verified current target price.",
        "企业价值含扩张负现金与成熟现金创造，再扣当前债务和披露融资租赁、加可用现金；经营租赁成本留在经营率中，不重复扣。时点锚定六月三十日，计半年部分及之后年末现金。与十月报价比较是近似，非核实的当前目标价。",
      ],
      [
        "If enterprise value is below senior claims, the mathematical residual can be negative. We display that raw result and floor the common-equity scenario at zero rather than report a negative share price. The floor is not a bankruptcy forecast or a cap on investment losses. Bull cases can depend heavily on terminal value and ambitious capital productivity; bear cases can impair the entire residual. No scenario probabilities or guaranteed five-/ten-year return ranking are assigned.",
        "若企业价值低于优先索取权，数学剩余可能负，本文展示原始值并将普通股情景归零，不报负股价。归零非破产预测或损失限制。乐观情景可能高度依赖终值和积极资本效率，悲观可减值全部剩余。不赋予概率或保证五/十年回报排名。",
      ],
    ],
  },
  {
    title: [
      "14. Risk map and thesis failure conditions",
      "14. 风险地图与逻辑失效",
    ],
    source: SOURCES.annual,
    paragraphs: [
      [
        "The thesis fails if capacity arrives too late to meet contracted demand, replacement economics worsen, refinancing becomes unavailable or large customers cannot or do not pay as expected. Power restrictions, cooling requirements, component shortages, cybersecurity incidents and service-level failures can connect operational problems to financing stress. Collateral values may also decline when newer equipment becomes more efficient. A smooth revenue forecast does not represent this nonlinear downside.",
        "产能过迟、更新经济恶化、再融资不可得或大客户未按预期支付，均可使逻辑失效。电力限制、冷却、零件短缺、网络安全及服务失败可把运营问题连接至融资压力。新设备更高效时抵押价值亦可下降，平滑收入预测不代表这些非线性下行。",
      ],
      [
        "There is also a distinction between long-term AI usefulness and the economics of a leveraged provider at a particular purchase price. Even strong industry demand can coexist with poor shareholder returns if equipment prices, competition and financing consume the surplus. A funding squeeze could require new equity on unfavorable terms. The separate dilution input is a stress test, not assurance that the assumed amount of issuance would solve a real liquidity shortfall.",
        "长期 AI 实用性与特定买价下杠杆提供商的经济性不同。强行业需求也可伴随差股东回报，若设备、竞争与融资消耗剩余。资金挤压可要求不利条件股权融资。独立稀释输入是压力，不保证该发股量解决真实现金缺口。",
      ],
    ],
  },
  {
    title: [
      "15. Conclusion and the quarterly monitoring checklist",
      "15. 结论与季度监测清单",
    ],
    source: SOURCES.quarter,
    paragraphs: [
      [
        "CoreWeave is a serious infrastructure business with unusually visible committed demand, but common equity is not a simple claim on backlog. Our conditional conclusion is to require evidence that deployments produce durable returns after replacement investment and financing. The strongest future confirmation would combine successful delivery, improving fully burdened margins, manageable maturity requirements and less dependence on external funding. A large announced contract alone is insufficient.",
        "CoreWeave 是有显著承诺需求的基础设施企业，但普通股不是订单的简单索取权。有条件结论是需要部署在更新与融资后创造持久回报的证据。交付成功、完整成本利润改善、到期要求可管理、外部融资依赖下降共同出现才是强确认。大合同公告不足。",
      ],
      [
        "Track RPO conversion rather than its headline alone; active power rather than contracted power alone; cash and economic capex rather than EBITDA alone; and the full debt-and-share bridge rather than one quoted multiple. Refresh the analysis after each filing and material financing transaction. Missing utilization and project-level profitability should remain unknown until disclosed. This research is educational, not a personalized recommendation or a substitute for a financing and covenant audit.",
        "跟踪 RPO 转换而非仅标题、运行电力而非仅签约电力、现金和经济投资而非仅 EBITDA，以及完整债务股数桥接而非单一倍数。每次申报和重大融资后刷新。利用率和项目利润缺项应保持未知，直到披露。研究仅供教育，非个人建议或融资契约审计替代。",
      ],
    ],
  },
];
