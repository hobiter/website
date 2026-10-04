import { AMZN_SOURCES as sources } from "./operatingMetrics";

export const AMZN_REPORT = [
  {
    id: "thesis",
    title: "1. Investment Thesis",
    titleZh: "1. 投资论点",
    thesis:
      "Amazon is a retail distribution network, a seller-services marketplace and an infrastructure platform with different capital needs. AWS profit growth is real, but the investable question is whether new infrastructure produces cash after replacement spending. A low headline P/E following private-investment gains is not proof of cheap operating assets.",
    thesisZh:
      "亚马逊同时是零售分销网络、卖家服务市场与基础设施平台，三者资本需求不同。AWS 营业利润的增长是真实的，但投资关键是新增基础设施在更新支出之后能否创造现金。私募投资收益压低表面市盈率，并不意味着经营资产便宜。",
    bullets: [
      "Retail logistics and Prime reinforce purchase frequency; advertising monetizes existing purchase intent.",
      "AWS and custom silicon can improve economics, but hardware refresh cycles and power constraints consume capital.",
      "Separate core enterprise value from liquid assets, financing claims and risky private-investment optionality.",
    ],
    bulletsZh: [
      "物流与 Prime 增强购买频率，广告将已有购买意图变现。",
      "AWS 与自研芯片可能改善经济性，但硬件更新与电力限制消耗资本。",
      "将核心企业价值、流动资产、融资债权和高风险私募投资可选性分开。",
    ],
    source: sources.annual,
  },
  {
    id: "history",
    title: "2. Financial History",
    titleZh: "2. 财务历史",
    thesis:
      "FY2011-2025 captures the transition from low-margin merchandise sales to a services-heavy mix. FY2025 revenue reached $716.924B and operating income $79.975B, yet company-defined FCF fell to $11.194B. Improving margins and weakening cash conversion can occur together when investment expands faster than earnings.",
    thesisZh:
      "2011—2025 财年体现了从低利润率商品销售转向服务占比提升的过程。2025 年收入为 7,169.24 亿美元，营业利润 799.75 亿美元，但公司口径自由现金流降至 111.94 亿美元。资本投入增长快于利润时，利润率改善与现金转化恶化可以同时发生。",
    bullets: [
      "The 15-year financial window is not a complete IPO-to-present audited database; the filing inventory extends further where available.",
      "Pre-2022 EPS and shares are normalized for the 20-for-1 split. Original filing values are otherwise retained, not silently restated.",
      "Gross margin excludes fulfillment and technology costs from cost of sales; ROE uses year-end equity, not average equity.",
    ],
    bulletsZh: [
      "十五年财务窗口并非从 IPO 至今的完整审计数据库；申报文件目录在可取得范围内延伸至更早年份。",
      "2022 年拆股前每股收益及股数按一拆二十调整；其余数据保留原始申报口径，不静默改为重述值。",
      "销售成本不包括履约与技术费用，故毛利率不能直接代表零售单位利润；ROE 分母为年末权益，并非平均权益。",
    ],
    source: sources.annual,
  },
  {
    id: "quarter",
    title: "3. Latest Quarter",
    titleZh: "3. 最新季度",
    thesis:
      "Q2 2026 revenue rose about 20% to $200.606B and operating income reached $27.461B. The $62.647B net income includes unusually large non-operating investment income. The operating result is the cleaner anchor for an earnings-power discussion; stripping a pretax gain directly out of after-tax profit would be misleading.",
    thesisZh:
      "2026 年第二季度收入增长约 20% 至 2,006.06 亿美元，营业利润为 274.61 亿美元。626.47 亿美元净利润包含巨额非经营投资收益。评估持续盈利能力应主要参考营业利润，不能简单从税后净利润直接减去税前投资收益。",
    bullets: [
      "AWS revenue grew 36.7%; the $169B annualized run rate is not reported full-year revenue.",
      "Q3 sales guidance is $197-202B and operating income $22.5-26.5B, issued July 30; Q3 results are not yet in this report.",
      "Prime Day timing and foreign exchange affect the Q3 growth comparison. Seasonality makes straight-line quarterly extrapolation unreliable.",
    ],
    bulletsZh: [
      "AWS 收入增长 36.7%；1,690 亿美元年化运行率并非已实现全年收入。",
      "7 月 30 日发布的第三季度收入指引为 1,970—2,020 亿美元，营业利润 225—265 亿美元；本报告尚无第三季度实际业绩。",
      "Prime Day 时间与汇率影响第三季度同比，季节性使简单季度年化存在偏差。",
    ],
    source: sources.release,
  },
  {
    id: "segments",
    title: "4. Segment Economics",
    titleZh: "4. 分部经济性",
    thesis:
      "The three reported segments are North America, International and AWS. Q2 AWS generated $16.621B of the group's $27.461B operating profit, despite representing roughly one fifth of sales. Geography-based retail segments already include advertising and seller services: those channels cannot be added again as a fourth segment.",
    thesisZh:
      "公司披露北美、国际与 AWS 三个分部。第二季度 AWS 仅占约五分之一收入，却贡献集团 274.61 亿美元营业利润中的 166.21 亿美元。按地区划分的零售分部已包含广告和卖家服务，不能再把这些渠道作为第四分部重复加总。",
    bullets: [
      "Retail productivity depends on delivery density, inventory placement and fulfillment cost per unit, not just GMV.",
      "Seller-services revenue is not seller GMV; advertising revenue does not disclose standalone operating profit.",
      "The dashboard uses disclosed segment profit and channel revenue. Prime subscriber count, take rate and cohort CAC remain N/A where not disclosed.",
    ],
    bulletsZh: [
      "零售生产率取决于配送密度、库存布局及单位履约成本，而非仅看 GMV。",
      "卖家服务收入不等于卖家 GMV，广告收入也未单独披露营业利润。",
      "图表采用已披露的分部利润与渠道收入；未披露的 Prime 用户数、抽佣率与分组获客成本保留为 N/A。",
    ],
    source: sources.q2,
  },
  {
    id: "moat",
    title: "5. Moat and Competition",
    titleZh: "5. 护城河与竞争",
    thesis:
      "Amazon's advantage combines selection, delivery reliability, merchant demand and enterprise switching costs. These advantages do not guarantee constant pricing power. Retail competes with local stores and other marketplaces; AWS competes with hyperscalers, specialized clouds and customer-owned infrastructure.",
    thesisZh:
      "亚马逊的优势来自商品选择、配送可靠性、卖家需求及企业客户切换成本，但这些优势不保证持续定价权。零售面对本地商店与其他平台，AWS 面对大型云厂商、专业云及客户自建基础设施。",
    bullets: [
      "Microsoft Azure and Google Cloud are qualitative AWS competitors; no unsourced market-share or peer-multiple table is used.",
      "Delivery speed can increase retention while raising fulfillment cost. Ads can monetize demand but excessive ad load can degrade discovery.",
      "Watch operating margins and cash return on new investment rather than assuming scale alone proves an economic moat.",
    ],
    bulletsZh: [
      "Azure 与 Google Cloud 是 AWS 的定性竞争参照，本报告不使用无来源的市场份额或同行估值表。",
      "更快配送可提高留存，也会增加成本；广告提高变现，但过多广告会损害发现体验。",
      "关注营业利润率及新增投资现金回报，不能仅凭规模认定护城河。",
    ],
    source: sources.annual,
  },
  {
    id: "ai",
    title: "6. AI Infrastructure",
    titleZh: "6. AI 基础设施",
    thesis:
      "Trainium, Graviton, Bedrock and the broader AWS stack offer several ways to serve AI demand. The key risk is duration mismatch: equipment is purchased up front while utilization, pricing and customer funding evolve. Management's AI and chips run-rate disclosures overlap AWS and can overlap one another; they are not incremental consolidated sales.",
    thesisZh:
      "Trainium、Graviton、Bedrock 与 AWS 技术栈提供多种 AI 变现路径。核心风险是期限错配：设备先购买，利用率、定价及客户融资能力随后变化。管理层披露的 AI 与芯片运行率均属于 AWS，彼此也可能重叠，不能当作集团新增收入。",
    bullets: [
      "RPO of $496B has a 6.4-year weighted remaining life; backlog is neither cash collected nor revenue guaranteed next year.",
      "Contracts with major AI labs link compute demand and strategic financing. Stress-test counterparty funding rather than equating commitments with risk-free receipts.",
      "The model assumes total investment of $225-235B in 2026, including noncash additions; this is our estimate, not a verified latest capex guidance quote.",
    ],
    bulletsZh: [
      "4,960 亿美元剩余履约义务的加权剩余期限为 6.4 年，不等于已收现金，也不保证下一年全部确认收入。",
      "与 AI 实验室的合同将算力需求与战略融资连接，应压力测试客户资金来源，不能视承诺为无风险收款。",
      "模型假设 2026 年含非现金增加的总投入为 2,250—2,350 亿美元，这是分析师估算，不冒充已核实的最新资本支出指引。",
    ],
    source: sources.strategy,
  },
  {
    id: "cash",
    title: "7. Cash Flow Quality",
    titleZh: "7. 现金流质量",
    thesis:
      "Company FCF is operating cash flow less property purchases net of asset-sale proceeds and incentives. It is not cash available after all lease principal or strategic investments. Positive operating cash flow can coexist with negative distributable cash, particularly when SBC, vendor timing and infrastructure growth are substantial.",
    thesisZh:
      "公司自由现金流为经营现金流减去扣除资产销售及补贴后的设备投入，并非扣除全部租赁本金及战略投资后的可分配现金。股权薪酬、供应商付款时间与基础设施增长规模较大时，经营现金流为正仍可伴随可分配现金为负。",
    bullets: [
      "TTM company FCF is -$7.604B; after finance-lease and financing-obligation principal it is -$9.511B, still before strategic investments.",
      "H1 adds $2.128B of finance-leased equipment and $20.620B of unpaid-equipment increases beyond cash purchasing; these are distinct timing and financing disclosures.",
      "Historical aggregate D&A includes operating-lease and content components. The enterprise model does not blindly add that aggregate to EBIT; SBC stays an economic cost.",
    ],
    bulletsZh: [
      "过去十二个月公司自由现金流为负 76.04 亿美元；扣融资租赁及融资义务本金后为负 95.11 亿美元，仍未扣除战略投资。",
      "上半年现金采购外另有 21.28 亿美元融资租赁设备及 206.20 亿美元未付款设备增加，分别反映融资与支付时间。",
      "历史综合折旧摊销含经营租赁及内容等项目，企业模型不会直接把该总额全部加回 EBIT；股权薪酬保留为经济成本。",
    ],
    source: sources.q2,
  },
  {
    id: "balance",
    title: "8. Balance Sheet and Claims",
    titleZh: "8. 资产负债表与债权",
    thesis:
      "Liquidity must be assessed alongside funded debt, financing leases and additional commitments. The DCF bridge uses debt carrying value rather than debt face value. Operating lease payments are already costs in the projected operating profit, so subtracting the full operating lease liability as well would mix incompatible valuation conventions.",
    thesisZh:
      "流动性必须结合已融资债务、融资租赁及额外承诺评估。DCF 桥接采用债务账面价值而非面值。经营租赁付款已包含在预测营业利润成本中，若同时扣除全部经营租赁负债，会混用估值口径。",
    bullets: [
      "June cash plus marketable securities totals $122.988B; restricted cash is excluded. Known subsequent OpenAI funding reduces the pro-forma liquid pool by $21.3B.",
      "Long-term debt carrying amount is $132.224B; finance-lease liability is $13.451B. Financing obligations use the note's rounded approximately $9.315B total.",
      "Uncommenced lease payments and purchase commitments are future nominal obligations, not additional current debt at full nominal value. Their operating and investment implications remain risks.",
    ],
    bulletsZh: [
      "六月现金及有价证券合计 1,229.88 亿美元，不含受限现金；已知期后 OpenAI 出资使模拟流动资产再减少 213 亿美元。",
      "长期债务含流动部分账面金额 1,322.24 亿美元，融资租赁负债 134.51 亿美元；融资义务采用附注约 93.15 亿美元的四舍五入合计。",
      "未开始租赁付款及采购承诺为未来名义义务，不直接按名义总额加入当前债务，但相关经营及投入风险仍需考虑。",
    ],
    source: sources.q2,
  },
  {
    id: "allocation",
    title: "9. Capital Allocation and Investments",
    titleZh: "9. 资本配置与投资",
    thesis:
      "Anthropic and OpenAI positions create potentially valuable upside and concentrated financing exposure. Accounting marks are not distributable cash, and preferred-stock rights, conversion conditions, lockups and future funding affect realized returns. Model the investment portfolio outside core operating cash rather than capitalizing investment gains as recurring EBIT.",
    thesisZh:
      "Anthropic 与 OpenAI 持仓带来潜在上行，也形成集中融资敞口。会计估值并非可分配现金，优先股权利、转换条件、锁定期及后续出资决定最终回报。应将投资组合与核心经营现金分开，而非把投资收益作为持续 EBIT 资本化。",
    bullets: [
      "Anthropic preferred shares and notes total about $190.4B at June carrying/fair values. Q2 includes $50.5B upward preferred-stock marks; note gains can sit in OCI.",
      "OpenAI funded cost reaches $50B after the disclosed subsequent payment. The model uses that cost, not an invented current market valuation.",
      "25/50/75% recovery scenarios and a 20% proceeds reserve are deliberate haircuts, not fair-value certifications. The potential remaining $15B Anthropic facility is deducted in all cases.",
    ],
    bulletsZh: [
      "六月 Anthropic 优先股及票据账面或公允价值约 1,904 亿美元。第二季度优先股向上调整 505 亿美元；票据收益可进入其他综合收益。",
      "已披露期后支付后 OpenAI 出资成本达到 500 亿美元，模型采用成本，不虚构当前市场估值。",
      "25/50/75% 回收情景与 20% 回收额准备是主动折价，而非公允价值认证；所有情景均扣除潜在 Anthropic 剩余 150 亿美元出资。",
    ],
    source: sources.q2,
  },
  {
    id: "forecast",
    title: "10. Ten-Year Operating Forecast",
    titleZh: "10. 十年经营预测",
    thesis:
      "The model grows North America, International and AWS separately, then applies segment margins. It explicitly charges full investment and incremental working capital against after-tax operating earnings. A revenue growth story only creates equity value when incremental returns exceed financing and replacement costs.",
    thesisZh:
      "模型分别预测北美、国际与 AWS 收入及利润率，再从税后经营利润中扣除完整投入和增量营运资本。只有新增回报超过融资与更新成本，收入增长故事才能创造股东价值。",
    bullets: [
      "Base 2026 sales assumptions are $460B North America, $170B International and $178B AWS; they are not management segment guidance.",
      "AWS growth fades toward 12% and its margin toward 32% by 2035 in the base case, allowing for competition and hardware-heavy mix.",
      "Full-investment intensity fades to 14% of sales while non-operating-lease depreciation reaches 10.5%. These unverified assumptions are the central model risks, not hidden outputs.",
    ],
    bulletsZh: [
      "基准情景 2026 年北美、国际及 AWS 收入分别假设为 4,600、1,700、1,780 亿美元，并非管理层分部指引。",
      "基准情景至 2035 年 AWS 增速降至 12%、利润率降至 32%，反映竞争与硬件占比影响。",
      "完整投入占收入比降至 14%，不含经营租赁的折旧占比升至 10.5%；这些未经验证的假设是主要模型风险，不是隐藏结果。",
    ],
    source: sources.annual,
  },
  {
    id: "valuation",
    title: "11. Valuation and Sensitivity",
    titleZh: "11. 估值与敏感性",
    thesis:
      "The reference price is the October 2, 2026 close of $251.52, not a live quote. Discount unlevered operating cash with WACC, add pro-forma liquid assets, deduct financing claims once and add haircut investment optionality. Show core value and investment value separately so a private-asset mark cannot disguise a weak operating valuation.",
    thesisZh:
      "参考股价为 2026 年 10 月 2 日收盘的 251.52 美元，并非实时报价。以 WACC 折现无杠杆经营现金，加模拟流动资产、一次性扣融资债权，再加折价投资可选性。核心价值与投资价值单列，避免私募估值掩盖经营估值不足。",
    bullets: [
      "Historical market capitalization uses split-adjusted close times annual diluted weighted shares: a comparability proxy, not exact year-end equity capitalization.",
      "P/E is omitted in loss years; negative FCF yield is retained rather than relabeled. Recent net profit is distorted by investment marks.",
      "The first year includes only an estimated quarter of cash still prospective at October 4. The terminal calculation keeps reinvestment and adjusts working capital to terminal growth.",
    ],
    bulletsZh: [
      "历史市值为拆股调整收盘价乘全年摊薄加权股数，是可比性近似值，非精确年末股权市值。",
      "亏损年份不显示市盈率，负自由现金流收益率如实保留；近期净利润受投资重估影响。",
      "估值自 10 月 4 日起，仅纳入当年估计四分之一现金；终值保留再投资并按永续增速重算营运资本。",
    ],
    source: sources.q2,
  },
  {
    id: "risks",
    title: "12. Risks and Thesis Breakers",
    titleZh: "12. 风险与论点失效条件",
    thesis:
      "The most important downside is not a single weak quarter but a sustained gap between infrastructure spending and cash generation. Power availability, equipment useful lives, AI customer funding, retail competition and regulation can jointly impair returns. A model requiring lower investment intensity is vulnerable if growth needs continuous elevated replacement spending.",
    thesisZh:
      "最重要的下行并非一个季度疲弱，而是基础设施支出与现金创造持续脱节。电力供给、设备寿命、AI 客户融资、零售竞争及监管可能共同损害回报。若增长持续需要高额更新投入，依赖投入强度下降的模型将失效。",
    bullets: [
      "Reconsider the thesis if AWS margin falls while capex stays elevated and new capacity fails to lift cash generation over several reporting periods.",
      "Watch lease commencements, equipment payment catch-up, dilution and strategic funding rather than only headline OCF growth.",
      "Security outages, antitrust remedies, tariffs and changes in seller/customer behavior can weaken otherwise durable platforms.",
    ],
    bulletsZh: [
      "若 AWS 利润率下降、资本投入持续高企且新增产能连续多个报告期未改善现金创造，应重新评估论点。",
      "除经营现金流增速外，跟踪租赁开始、设备付款补足、摊薄与战略出资。",
      "安全事件、服务中断、反垄断措施、关税及卖家或客户行为变化均可能削弱平台。",
    ],
    source: sources.annual,
  },
  {
    id: "monitor",
    title: "13. Monitoring and Conclusion",
    titleZh: "13. 跟踪指标与结论",
    thesis:
      "Amazon's operating franchise is strengthening, but the stock is an investment in future cash returns rather than reported investment gains. The scenario range is a decision framework, not a price target or recommendation. Update the model when Q3 results and investment funding disclosures arrive, keeping the same cash and claim conventions.",
    thesisZh:
      "亚马逊经营平台正在增强，但购买股票是在投资未来现金回报，而非账面投资收益。情景区间是决策框架，不是目标价或买卖建议。第三季度业绩与投资出资披露后应更新模型，并维持一致的现金及债权口径。",
    bullets: [
      "Quarterly checklist: AWS growth and margin; retail segment profit; net cash capex; noncash equipment additions; OCF less all investment.",
      "Annual checklist: replacement lives, SBC and share count, lease/debt maturities, realized investment proceeds and cash-tax normalization.",
      "No personalized investment advice. Historical results, unaudited interim accounts and analyst forecasts have distinct evidentiary status.",
    ],
    bulletsZh: [
      "季度清单：AWS 增长及利润率、零售分部利润、净现金资本支出、非现金设备增加及扣投入后现金。",
      "年度清单：设备更新寿命、股权薪酬与股数、租赁和债务到期、实际投资回收及现金税率正常化。",
      "本报告不提供个性化投资建议；历史业绩、未经审计中期报表与分析师预测具有不同证据等级。",
    ],
    source: sources.release,
  },
];
