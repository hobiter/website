import { SOURCES as S } from "./operatingMetrics";
export type Language = "en" | "zh";
type Chapter = {
  id: string;
  en: { title: string; paragraphs: string[] };
  zh: { title: string; paragraphs: string[] };
  sources: string[];
};
export const REPORT: Chapter[] = [
  {
    id: "thesis",
    en: {
      title: "1. Investment Thesis: Capability Is Not The Same As Return",
      paragraphs: [
        "Rocket Lab is best analyzed as an operating aerospace supplier plus a capital-intensive launch-development option, with a pending communications acquisition that could change both its cash-flow profile and its liabilities. A successful rocket program does not automatically produce an attractive stock return: the entry valuation, additional shares and reinvestment bill still matter.",
        "Our framework separates reported performance, management targets and Hobite assumptions. The standalone scenarios below are anchored to June 30 capital and cash, not a certified October fair value. They exclude Iridium revenue and acquisition consideration together. Reading them as a combined-company price target would be incorrect.",
        "The investment question is whether contracted demand converts into durable, per-share free cash flow after development, replacement capital, working capital and dilution. We would require a larger margin of safety when the answer depends primarily on a distant terminal value rather than funded, repeatable operations.",
      ],
    },
    zh: {
      title: "1. 投资主线：技术能力不等于股东回报",
      paragraphs: [
        "Rocket Lab 应拆分为已有业务的航天供应商、资金密集型新火箭开发期权，以及可能改变现金流和负债结构的待交割通信并购。火箭成功不自动等于股票回报优秀，买入估值、增发与再投资支出同样重要。",
        "本研究区分已报告业绩、管理层目标和 Hobite 假设。下方独立经营情景以 6 月 30 日资本和现金为锚，并非经核验的 10 月公允价值。Iridium 收入与收购对价均不纳入；不能将其视作合并公司的目标价。",
        "核心问题是订单能否在研发、更新资本开支、营运资金及摊薄之后转化为持续的每股自由现金流。如果估值主要依靠遥远终值而非已获融资的可重复经营，就需要更大的安全边际。",
      ],
    },
    sources: [S.quarter, S.neutron, S.financing],
  },
  {
    id: "history",
    en: {
      title: "2. History And Reporting Perimeter",
      paragraphs: [
        "The operating business entered public markets through the 2021 Vector combination; the 2025 holding-company reorganization did not create a new operating history. Our annual series follows operating Rocket Lab rather than treating the earlier blank-check company as an aerospace business. Public-price comparisons begin after the combination, not with pre-deal SPAC trading.",
        "Acquisitions expanded the company from launch into components, spacecraft and payload capabilities. This changes the interpretation of growth: an acquired revenue stream, organic production growth and a new launch program carry different capital requirements. The right comparison follows the operating perimeter and purchase consideration, not just headline sales growth.",
      ],
    },
    zh: {
      title: "2. 历史与报表边界",
      paragraphs: [
        "经营主体通过 2021 年与 Vector 的交易进入公开市场；2025 年控股架构重组并未创造新的经营历史。年度序列采用 Rocket Lab 实体业务，不把早期空白支票公司视为航天企业。公开股价比较从合并之后开始，而非交易前的 SPAC 股价。",
        "并购使业务从发射扩展到部件、整星及载荷。收购所得收入、原有产能增长与新发射项目的资本需求不同，因此必须同时跟踪合并范围和支付对价，不能只看营收增长。",
      ],
    },
    sources: [S.annual, S.submissions],
  },
  {
    id: "business",
    en: {
      title: "3. Business Model: Three Different Economic Engines",
      paragraphs: [
        "Electron and HASTE sell mission capability: orbit, timing, handling and government testing requirements can matter more than the lowest cost per kilogram. Space systems sells components and spacecraft programs, where delivery schedules, cost estimates and acceptance milestones determine recognized earnings. Neutron is a development project whose addressable market is larger but whose commercial economics remain unproven.",
        "Hobite inference: vertical integration can shorten iteration cycles and support bundled missions, but internal transactions do not create external revenue. A rocket launching an affiliated satellite must be evaluated through the combined external cash flows. Crediting both an avoided launch bill and full internal launch revenue would double-count the same benefit.",
      ],
    },
    zh: {
      title: "3. 商业模式：三种不同的经济引擎",
      paragraphs: [
        "Electron 和 HASTE 出售任务能力：轨道、时间、载荷处理与政府试验要求可能比最低每公斤成本更重要。空间系统销售部件和整星项目，交付、成本估计及验收里程碑决定确认利润。Neutron 则仍属开发项目，潜在市场更大，但商业经济性尚待验证。",
        "Hobite 判断：垂直整合可能缩短迭代并支持打包任务，但内部交易不产生外部收入。为关联卫星发射必须按合并后的外部现金流评价；同时计入节省的发射费和完整内部发射收入，会重复计算收益。",
      ],
    },
    sources: [S.annual, S.merger],
  },
  {
    id: "quality",
    en: {
      title: "4. Financial Quality: Gross Profit Before Operating Leverage",
      paragraphs: [
        "The financial tables distinguish gross profit from operating income and operating cash flow. Improving launch utilization can lift gross margin while development and corporate spending still absorb that improvement. Capitalized equipment is not the entire innovation bill: expensed research remains a real cost, even when it builds future capability.",
        "Track revenue growth against incremental gross profit, operating losses, cash consumption and acquisition spend. A higher cash balance funded by equity is not evidence of profitable operations. Adjusted EBITDA should be reconciled rather than used as a substitute for cash available to shareholders; the model retains SBC in operating costs and does not add it back as free money.",
      ],
    },
    zh: {
      title: "4. 财务质量：毛利改善不等于经营杠杆兑现",
      paragraphs: [
        "财务表将毛利、营业利润和经营现金流分开。利用率改善能提升毛利率，但研发和总部费用仍可能吞噬增量毛利。资本化设备并非创新的全部支出；费用化研发即使创造未来能力，也仍是实际成本。",
        "营收增长应同时对照增量毛利、经营亏损、现金消耗与收购支出。增发带来的现金余额增加不证明经营盈利。调整后 EBITDA 需要调节，不能替代股东可得现金；模型保留股权薪酬成本，不将其免费加回。",
      ],
    },
    sources: [S.facts, S.release],
  },
  {
    id: "launch",
    en: {
      title: "5. Launch Economics And The Cadence Test",
      paragraphs: [
        "The operating database shows company-disclosed revenue and cost per launch alongside segment gross profit. Neither is a fully allocated return on invested capital: shared research, headquarters costs and new infrastructure still need funding. Vehicle build counts and completed missions describe different parts of the production cycle and should not be forced to match in every period.",
        "The most useful operating test is repeatability. Can the company sustain production quality, mission reliability and customer pricing while flying more often? A larger manifest is valuable only if vehicles, payloads and range windows are ready. Downtime after an anomaly can reduce both current revenue and the confidence needed to win the next contract.",
      ],
    },
    zh: {
      title: "5. 发射经济性与频次检验",
      paragraphs: [
        "经营数据库同时展示公司披露的单次发射收入、成本及分部毛利。它们都不是完全分摊后的投入资本回报率，共享研发、总部及新设施仍需资金。制造数量和完成任务数对应生产周期不同环节，不应强行要求每期相等。",
        "最重要的是可重复性：提高频次时能否保持制造质量、可靠性和定价？只有火箭、载荷及发射窗口就绪，清单才有价值。事故后的停飞既影响当前收入，也影响赢得后续订单所需的信任。",
      ],
    },
    sources: [S.annual, S.quarter],
  },
  {
    id: "space-systems",
    en: {
      title: "6. Space Systems: Backlog Must Become Cash",
      paragraphs: [
        "Spacecraft programs can produce revenue over time using progress estimates. Changes in expected completion costs therefore affect current profit before final delivery. Examine contract assets, customer advances, catch-up adjustments and potential delay penalties together. Backlog is neither cash nor guaranteed margin, and headline awards including options are not identical to enforceable remaining obligations.",
        "Hobite inference: the stronger moat is likely reliable execution on difficult, qualified programs rather than component volume alone. The proof would be recurring wins, stable estimate-at-completion margins and cash conversion without disproportionate inventory or receivables. Acquisition-driven growth should earn a return on purchase price, not merely improve the revenue chart.",
      ],
    },
    zh: {
      title: "6. 空间系统：订单必须兑现为现金",
      paragraphs: [
        "整星项目可能依据履约进度逐步确认收入，因此预计完工成本变动会在最终交付前影响当期利润。应合并观察合同资产、预收款、累计追补调整和延期赔偿。订单不是现金，也不保证利润；包含选择权的新闻合同金额不同于可执行剩余履约义务。",
        "Hobite 判断：真正护城河更可能来自困难认证项目的可靠交付，而不只是部件数量。验证指标包括重复中标、稳定的预计完工利润和无需库存应收大幅增加的现金转化。并购增长必须对购买价产生回报，而非仅美化营收曲线。",
      ],
    },
    sources: [S.quarter, S.release],
  },
  {
    id: "neutron",
    en: {
      title: "7. Neutron: October Update Resets The Timeline",
      paragraphs: [
        "On October 14, 2026, Rocket Lab changed the expected inaugural Neutron launch to 2027. This supersedes the older Q4 2026 target in earlier reporting. A target is not a completed flight, and a first flight is not proof of production cadence, recovery economics or customer acceptance at scale.",
        "Our mission-count assumptions are explicitly hypothetical, with later commercialization in the bear case. No 2026 Neutron launch revenue is included. Investors should demand evidence on qualification, pad readiness, first-flight outcome, follow-on hardware and repeat missions before treating a high-cadence reusable fleet as an established asset.",
        "A delay can move revenue out while development payroll and facilities continue consuming cash. That asymmetry makes schedule risk an economic risk, not merely a calendar issue. The model exposes the reinvestment and terminal assumptions rather than assigning a standalone speculative technology premium on top of its operating cash flows.",
      ],
    },
    zh: {
      title: "7. Neutron：10 月更新重置时间表",
      paragraphs: [
        "2026 年 10 月 14 日，Rocket Lab 将 Neutron 首飞预期调整至 2027 年，取代此前报告中的 2026 年第四季度目标。目标不等于已完成首飞，首飞也不证明量产频次、回收经济性或大规模客户认可。",
        "模型中的发射次数明确属于假设，悲观情景采用更晚商业化；2026 年不计入 Neutron 发射收入。在把高频可复用机队视为既成资产前，应验证鉴定测试、发射台、首飞结果、后续硬件及重复任务。",
        "延期会推后收入，而研发人员和设施继续消耗现金，因此进度风险就是经济风险。模型公开再投资和终值假设，不在经营现金流之外再叠加一个投机性技术溢价。",
      ],
    },
    sources: [S.neutron, S.neutronFiling],
  },
  {
    id: "capital",
    en: {
      title: "8. Capital Structure: Reconcile Cash And Claims",
      paragraphs: [
        "The bridge starts with reported unrestricted cash and current/non-current marketable securities. Restricted cash is excluded. Debt uses reported carrying amounts as a proxy, with disclosed non-current finance leases and a separate $1m assumed reserve for unresolved current lease claims. Operating lease costs remain in operating margins and are not deducted again as if they were financing leases.",
        "Series A participating preferred shares are included on a one-for-one common-equivalent basis. Residual convertible notes remain debt rather than simultaneously adding their conversion shares. Unvested awards, capped calls, forwards and subsequent transactions are not fully valued; annual dilution is an independent conservative stress, not a solved financing waterfall.",
        "Do not add the entire September ATM total to June liquidity or June shares without reconciling which issuance was already reported. Our standalone bridge deliberately does not do so. Consequently it is not a current fully diluted capital table or October liquidity estimate, and its values should not be advertised as precise current price targets.",
      ],
    },
    zh: {
      title: "8. 资本结构：现金与权利要求必须调节",
      paragraphs: [
        "桥接从已报告非受限现金、流动及非流动有价证券开始，剔除受限现金。债务采用账面值近似，另扣已披露非流动融资租赁及针对未解决流动租赁权利要求的 100 万美元假设准备。经营租赁成本已计入营业利润率，不再次作为融资租赁扣除。",
        "A 类参与型优先股按一比一普通股等价口径计入。剩余可转债保留为债务，不同时计入转股股份。未归属奖励、封顶看涨期权、远期及后续交易未全部估值；年度摊薄是独立保守压力，并非完整融资瀑布。",
        "未调节已在 6 月记录的发行部分前，不能把 9 月 ATM 总额全部加到 6 月现金或股数。本独立桥接刻意不这样做，因此不是当前完全摊薄资本表或 10 月流动性估计，结果不应宣传为精确当前目标价。",
      ],
    },
    sources: [S.quarter, S.financing],
  },
  {
    id: "iridium",
    en: {
      title: "9. Iridium: Strategic Logic And Transaction Math",
      paragraphs: [
        "The pending acquisition would add a satellite-service business to launch and manufacturing. Shareholders approved the transaction in September, but approval is not closing; regulatory conditions remain and the announced timetable is mid-2027. Historical Rocket Lab statements do not consolidate a deal that has not closed.",
        "The consideration combines $27 cash per Iridium share with a collared stock exchange. The relevant price is a defined pre-closing ten-trading-day VWAP, not today's spot quote. Below the collar the stock leg is not guaranteed to be worth $27. The calculator uses a historical illustrative Iridium share count, excludes awards and is not a final purchase-price allocation.",
        "A proper combined-company valuation needs the acquired operating cash flow, satellite replenishment, purchase cash, issued shares, retained debt, fees, taxes and integration costs on one timeline. We do not add acquired EBITDA to standalone cash flow or claim a merger-adjusted fair value without that reconciliation.",
      ],
    },
    zh: {
      title: "9. Iridium：战略逻辑与交易计算",
      paragraphs: [
        "待交割收购将为发射与制造加入卫星服务。股东已于 9 月批准，但批准不等于交割，仍存在监管条件，公布时间表为 2027 年中。Rocket Lab 历史报表不合并尚未交割的交易。",
        "对价为每股 Iridium 27 美元现金加带价格区间保护的股票交换。参考价格是交割前约定的十个交易日 VWAP，不是今日现价。低于区间下限时股票部分不保证价值 27 美元。计算器使用历史示例股数，未含奖励股份，不是最终购买价分摊。",
        "完整合并估值必须在同一时间线上纳入收购业务现金流、卫星更新、现金对价、增发股数、保留债务、费用、税及整合成本。本研究不把被收购 EBITDA 免费加到独立现金流，也不在缺少调节时声称获得并购后公允价值。",
      ],
    },
    sources: [S.merger, S.prospectus, S.approval],
  },
  {
    id: "financing",
    en: {
      title: "10. September Financing Supersedes The Original Bridge",
      paragraphs: [
        "The September 15 update reported $1.944bn gross ATM proceeds and 29.3m shares, an amendment permitting retention of Iridium's $1.775bn term loans, and termination of the original $3.6bn bridge commitment. Treating that cancelled commitment as funded debt would overstate liabilities; treating gross ATM proceeds as uncommitted free cash would overstate flexibility.",
        "The financing announcement describes acquisition funding, not a fresh audited consolidated balance sheet. Commission costs, overlap with earlier issuance, interim cash burn and closing uses still need reconciliation. We keep the latest financing facts visible while marking current capital normalization and merger valuation as partial rather than inventing precision.",
      ],
    },
    zh: {
      title: "10. 9 月融资更新取代最初桥贷方案",
      paragraphs: [
        "9 月 15 日更新披露 ATM 融资毛额 19.44 亿美元、发行 2,930 万股，修订条款允许保留 Iridium 的 17.75 亿美元定期贷款，并取消原 36 亿美元桥贷承诺。将已取消承诺视为已提款债务会高估负债；把 ATM 毛额当作无用途限制的闲置现金也会夸大灵活性。",
        "该公告描述收购融资，不是新的经审计合并资产负债表。佣金、与此前发行的重叠、期间消耗和交割用途仍需调节。本研究展示最新融资事实，同时把当前资本标准化和并购估值标为部分完成，不制造精度。",
      ],
    },
    sources: [S.financing, S.financingFiling],
  },
  {
    id: "competition",
    en: {
      title: "11. Competition, Management And Capital Allocation",
      paragraphs: [
        "Hobite assessment: compare launch providers on reliability, orbital flexibility, availability and sustainable price, not a single headline payload number. SpaceX's rideshare alternative constrains small-launch pricing, while dedicated missions can justify a premium where schedule or orbit is valuable. Neutron will need its own evidence; Electron heritage is not a substitute for qualification of a different vehicle.",
        "For spacecraft and components, aerospace primes, specialist suppliers and in-house customer production create a different competitive landscape. Vertical integration can secure supply but also tie up capital. Management should be assessed by delivery, cash discipline and acquisition returns, not a founder narrative or the largest announced addressable market.",
        "Founder and CEO Sir Peter Beck leads a company attempting several demanding transitions at once. Our management scorecard is therefore delivery versus prior schedules, organic versus acquired growth, incentive dilution and the cash return on each incremental investment. The Neutron schedule revision is a reason to update assumptions, not to assume engineering progress has stopped or that eventual success is assured.",
      ],
    },
    zh: {
      title: "11. 竞争、管理层与资本配置",
      paragraphs: [
        "Hobite 评估：发射商应比较可靠性、轨道灵活性、可用档期及可持续价格，而非单一载荷数字。SpaceX 拼单约束小型发射定价；在时间或轨道价值较高时，专属任务仍可能获得溢价。Neutron 需要自身验证，Electron 历史不能替代另一种火箭的鉴定。",
        "整星和部件面对的是航天主承包商、专业供应商及客户自制等另一套竞争。垂直整合可以保障供应，也可能占用资本。应依据交付、现金纪律和并购回报评价管理层，而非创始人叙事或最大市场规模。",
        "创始人兼 CEO Sir Peter Beck 领导公司同时推进多项高难度转型。管理层评分应比较实际交付与原定时间表、内生与收购增长、激励摊薄及每笔增量投资的现金回报。Neutron 时间修订意味着更新假设，而非断言工程停滞或最终成功已获保证。",
      ],
    },
    sources: [S.annual],
  },
  {
    id: "forecast",
    en: {
      title: "12. Forecast Construction: Units, Margins And Funding",
      paragraphs: [
        "Hobite assumes $950m standalone FY2026 revenue, not company full-year guidance. The $434.414m reported first half is distinct from the assumed second half. From 2027 the model grows the non-Neutron business and adds an explicit Neutron mission count times an assumed revenue per mission. Those prices and flight counts are not disclosed contract terms or confirmed manifests.",
        "Operating margins include development and SBC; depreciation is added back, capital expenditure and incremental working capital are deducted, and taxes apply only to positive EBIT without credit for future tax losses. Five-year and ten-year outputs include an assumed negative H2 2026 cash-flow stub exactly once. Negative funding needs are diagnostics, not a second deduction from enterprise value.",
        "Terminal cash flow retains mature capital expenditure at least equal to depreciation. Nevertheless the terminal assumes a stable business after the chosen horizon, especially aggressive after only five years. Higher growth alone is not a valuation argument if it requires proportionally greater capital or additional shares.",
      ],
    },
    zh: {
      title: "12. 预测：业务量、利润率与资金",
      paragraphs: [
        "Hobite 假设 2026 年独立业务收入 9.5 亿美元，并非公司全年指引；已报告上半年 4.34414 亿美元与假设下半年严格区分。从 2027 年起，模型将非 Neutron 业务增长与明确的 Neutron 次数乘假设单次收入相加。价格和次数不是已披露合同条款或确定排期。",
        "营业利润率包含研发和股权薪酬，之后加回折旧、扣除资本开支及增量营运资金，仅对正 EBIT 计税，不提前确认亏损税盾。五年及十年结果仅纳入一次假设为负的 2026 下半年现金流。负现金需求只是诊断，不再次扣减企业价值。",
        "终值保留至少等于折旧的成熟资本开支，但仍假定在所选期限后进入稳定经营，五年期限尤其激进。若需要同比例更多资本或股份，高增长本身不是高估值理由。",
      ],
    },
    sources: [S.facts, S.release],
  },
  {
    id: "valuation",
    en: {
      title: "13. Valuation And Historical Context",
      paragraphs: [
        "Historical ratios pair year-end price with year-end common-equivalent shares. They are approximate snapshots, not point-in-time investable screens: the annual accounts were published later, and the standalone carrying-value enterprise bridge is not a fully adjusted takeover value. Loss-making periods have no meaningful P/E; a negative FCF yield describes cash burn, not a distribution yield.",
        "The October 15 closing-price observation is separate from the June-anchored DCF. We intentionally do not display a precise upside percentage between mismatched dates and capital structures. Scenario comparisons show how much cash-flow generation and terminal assumptions are required, not a probability-weighted expected return.",
        "A claim that RKLB offers attractive returns needs both a defensible operating case and a purchase price below a conservatively reconciled equity value. Without a current acquisition-adjusted bridge, our conclusion is valuation-sensitive research candidate, not an assertion that the shares are undervalued.",
      ],
    },
    zh: {
      title: "13. 估值与历史比较",
      paragraphs: [
        "历史比率将年末股价与年末普通股等价股份配对，是近似快照而非当时可交易筛选结果：年报稍后公布，账面值独立企业桥接也不是完全调整的收购价值。亏损期市盈率无意义，负自由现金流收益率表示消耗而非可分配收益。",
        "10 月 15 日收盘观测与 6 月锚定的 DCF 分开展示。由于日期和资本结构不匹配，本研究不展示精确上涨空间百分比。情景比较说明需要怎样的现金流与终值假设，不代表概率加权预期收益。",
        "要主张 RKLB 有吸引力，必须既有可辩护经营情景，又有低于保守调节股权价值的买入价格。缺少当前并购调整桥接时，结论是对估值敏感的研究候选，不是股票被低估的断言。",
      ],
    },
    sources: [S.facts, S.quarter],
  },
  {
    id: "risk",
    en: {
      title: "14. Risks And Falsifiable Monitoring",
      paragraphs: [
        "Priority risks are launch failure and grounding, development delays, fixed-price cost overruns, customer or government concentration, export restrictions, acquisition integration and dilution. Some risks arrive together: a failed qualification can push out launches, raise spending and reduce financing flexibility simultaneously. Model them as joint stresses rather than unrelated footnotes.",
        "Each quarterly review should update mission outcomes, build/flight cadence, segment gross profit, backlog-to-revenue conversion, catch-up adjustments, receivables and inventories, SBC, funded liquidity and all share classes. For Iridium, separately track regulatory approvals, the closing VWAP, final shares and awards, debt retained, transaction fees and constellation replacement commitments.",
        "The thesis weakens if backlog grows without cash conversion, recurring cost-estimate resets erode margins, first-flight timing slips without a credible funding plan, or per-share economics deteriorate despite revenue growth. Those are observable disconfirming signals rather than reasons to automatically roll the valuation horizon forward.",
      ],
    },
    zh: {
      title: "14. 风险与可证伪跟踪",
      paragraphs: [
        "优先风险包括事故停飞、开发延期、固定价超支、客户及政府集中、出口限制、并购整合和摊薄。风险可能同步发生：鉴定失败能同时推后发射、增加支出和压缩融资灵活性，应联合施压而非作为无关脚注。",
        "每季更新任务结果、制造与发射频次、分部毛利、订单转化、追补调整、应收库存、股权薪酬、已落实流动性及全部股类。Iridium 另跟踪监管、交割 VWAP、最终股份奖励、保留债务、交易费用及星座更新承诺。",
        "若订单增长却无现金转化、反复重估完工成本侵蚀利润、缺少可信资金计划仍持续推迟首飞，或营收增长而每股经济性恶化，投资论点就应削弱。这些是可观察的反证，不是自动把估值期限继续后移的理由。",
      ],
    },
    sources: [S.annual, S.quarter, S.financing],
  },
  {
    id: "conclusion",
    en: {
      title: "15. Investment Conclusion And Research Limits",
      paragraphs: [
        "Rocket Lab offers exposure to launch and space infrastructure, but the economic engine is still being built. The most attractive outcome requires reliable execution, stronger cash conversion and capital allocation that leaves existing owners with a worthwhile share of the upside. A promising industry and an attractive stock are different propositions.",
        "This report is educational research, not personalized investment advice. Financial facts are dated, long-horizon scenarios are highly uncertain, merger completion is conditional and no ROI is guaranteed. Before publication as a current valuation, refresh the capital table and complete the transaction-adjusted cash and debt reconciliation identified in the source audit.",
      ],
    },
    zh: {
      title: "15. 投资结论与研究局限",
      paragraphs: [
        "Rocket Lab 提供发射与空间基础设施敞口，但经济引擎仍在建设。理想结果需要可靠执行、更好现金转化，以及让现有股东保留足够上行的资本配置。行业有前景与股票有吸引力是两回事。",
        "本报告为教育性研究，不是个性化投资建议。财务事实有日期，长期预测高度不确定，并购有交割条件，也不存在保证 ROI。若要作为当前估值发布，须刷新资本表，并完成来源审计列出的交易后现金与债务调节。",
      ],
    },
    sources: [S.neutron, S.financing, S.approval],
  },
];
