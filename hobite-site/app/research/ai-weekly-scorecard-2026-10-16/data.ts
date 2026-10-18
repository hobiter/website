export type Lang = "en" | "zh";
export type Copy = readonly [string, string];
export const pick = (copy: Copy, lang: Lang) => copy[lang === "zh" ? 1 : 0];
export const snapshot = "2026-10-16";
export const published = "2026-10-17";
export const title: Copy = ["AI Investment Scorecard: Capital Efficiency Before Growth", "AI 投资评分：先看资本效率，再看增长"];
export const description: Copy = ["A dated 42-security research screen, portfolio-overlap framework and Rocket Lab operating deep dive.", "42 个标的的时点评分、组合重叠框架与 Rocket Lab 经营深度研究。"];

export const factors: { name: Copy; weight: number }[] = [
  { name: ["Next-full-year growth", "下一完整财年增长"], weight: 20 },
  { name: ["Valuation", "估值"], weight: 20 },
  { name: ["Gross margin", "毛利率"], weight: 10 },
  { name: ["Free cash flow", "自由现金流"], weight: 15 },
  { name: ["Net cash / debt", "净现金／净债务"], weight: 10 },
  { name: ["Drawdown", "高点回撤"], weight: 10 },
  { name: ["AI exposure", "AI 业务暴露"], weight: 15 },
];
export const ranking: { ticker: string; score: number; view: Copy }[] = [
  { ticker: "NVDA", score: 89.5, view: ["Core research candidate", "核心研究候选"] },
  { ticker: "APP", score: 88.5, view: ["Priority cash-generation diligence", "重点核验现金创造能力"] },
  { ticker: "AVGO", score: 87.5, view: ["Custom silicon and networking", "定制芯片与网络"] },
  { ticker: "MU", score: 86.5, view: ["Control memory-cycle exposure", "控制存储周期敞口"] },
  { ticker: "SKHY", score: 84.5, view: ["HBM upside with cyclicality", "HBM 弹性与周期风险"] },
  { ticker: "ORCL", score: 81.5, view: ["Rebound thesis requires financing audit", "反弹逻辑需融资审计"] },
  { ticker: "RDDT", score: 81, view: ["Monetization and earnings watch", "变现与财报观察"] },
  { ticker: "META", score: 80.5, view: ["Quality; consider existing overlap", "优质；考虑已有重叠"] },
  { ticker: "GOOG", score: 80, view: ["Quality; position size matters", "优质；仓位大小很重要"] },
  { ticker: "VRT", score: 78.5, view: ["Power and thermal infrastructure", "供电与热管理基础设施"] },
  { ticker: "MSFT", score: 77.5, view: ["Durable business, price-sensitive", "业务持久，仍需价格纪律"] },
  { ticker: "AMD", score: 75, view: ["Strong business, demanding expectations", "业务强，预期要求高"] },
  { ticker: "TCEHY", score: 75, view: ["China platform candidate", "中国平台型企业候选"] },
  { ticker: "PDD", score: 73.5, view: ["Value thesis versus slowing growth", "价值逻辑与增长放缓"] },
  { ticker: "BABA", score: 72.5, view: ["Cloud / AI opportunity", "云与 AI 机会"] },
  { ticker: "AAOI", score: 72, view: ["High-beta optical satellite position", "高波动光通信卫星仓"] },
  { ticker: "COHR", score: 71.5, view: ["Optical infrastructure", "光通信基础设施"] },
  { ticker: "UPST", score: 71, view: ["Credit turnaround, not core AI", "信贷转型，并非核心 AI"] },
  { ticker: "LITE", score: 70, view: ["Optics growth with valuation risk", "光通信增长与估值风险"] },
  { ticker: "AMZN", score: 69.5, view: ["Long runway, heavy reinvestment", "长期空间与高再投资"] },
  { ticker: "ISRG", score: 69, view: ["Non-AI quality diversification", "非 AI 优质分散资产"] },
  { ticker: "CRWV", score: 68.5, view: ["Growth versus leverage", "增长与杠杆的矛盾"] },
  { ticker: "BIDU", score: 68, view: ["Value thesis needs core recovery", "价值逻辑需要核心业务复苏"] },
  { ticker: "CBRS", score: 67.5, view: ["Technology versus equity valuation", "技术实力不等于股票便宜"] },
  { ticker: "RBLX", score: 67, view: ["Growth versus earnings quality", "增长与盈利质量"] },
  { ticker: "TEAM", score: 66, view: ["AI software; monitor dilution", "AI 软件；关注稀释"] },
  { ticker: "HOOD", score: 63, view: ["Trading-cycle exposure", "交易活动周期暴露"] },
  { ticker: "EROC", score: 61, view: ["Power opportunity; audit ownership", "电力机会；核验所有权结构"] },
  { ticker: "VST", score: 60.5, view: ["Portfolio role exceeds AI score", "组合角色大于 AI 分数"] },
  { ticker: "GLW", score: 60, view: ["Fiber infrastructure", "光纤基础设施"] },
  { ticker: "CIFR", score: 59.5, view: ["Speculative HPC financing thesis", "投机性 HPC 融资逻辑"] },
  { ticker: "SPCX", score: 57, view: ["Space platform; price-sensitive", "航天平台；价格敏感"] },
  { ticker: "BE", score: 56, view: ["Power theme, valuation risk", "电力主题与估值风险"] },
  { ticker: "CRCL", score: 55.5, view: ["USDC growth is not equity value", "USDC 增长不等于股权价值"] },
  { ticker: "TSLA", score: 51.5, view: ["Autonomy / robotics execution", "自动驾驶与机器人执行"] },
  { ticker: "BRK.B", score: 51.5, view: ["AI score understates diversification", "AI 分数低估分散价值"] },
  { ticker: "RKLB", score: 50.5, view: ["Execution milestones before core sizing", "成为核心仓前需跨越执行节点"] },
  { ticker: "HTZ", score: 35.5, view: ["Turnaround and capital-structure risk", "转型与资本结构风险"] },
];
// Source transcript snapshot, not refreshed consensus or independently established fair value.
export const valuations = [
  ["NVDA", 214.13, 17.7, 190, 215], ["APP", 266.13, 14.8, 235, 275],
  ["AVGO", 328.75, 19, 300, 335], ["MU", 878.84, 5, 780, 900],
  ["SKHY", 136.49, 4.4, 120, 140], ["ORCL", 128.23, 15.1, 115, 135],
  ["RDDT", 156.14, 25.8, 135, 160], ["META", 709.33, 22.2, 650, 720],
  ["GOOG", 336.91, 25, 305, 345], ["VRT", 206.42, 26, 180, 210],
] as const;
export const allocation: { ticker: string; weight: number; role: Copy }[] = [
  { ticker: "AVGO", weight: 15, role: ["ASICs, Ethernet and networking", "ASIC、以太网与网络"] },
  { ticker: "MU", weight: 12.5, role: ["HBM / memory cycle", "HBM 与存储周期"] },
  { ticker: "VRT", weight: 12.5, role: ["Power distribution and cooling", "配电与冷却"] },
  { ticker: "SKHY", weight: 10, role: ["HBM exposure", "HBM 暴露"] },
  { ticker: "COHR", weight: 10, role: ["Optical connectivity", "光互联"] },
  { ticker: "APP", weight: 10, role: ["Advertising monetization", "广告变现"] },
  { ticker: "VST", weight: 10, role: ["Electricity generation", "发电"] },
  { ticker: "RDDT", weight: 7.5, role: ["Data and advertising", "数据与广告"] },
  { ticker: "NVDA", weight: 5, role: ["Accelerated computing", "加速计算"] },
  { ticker: "TCEHY", weight: 5, role: ["China internet platform", "中国互联网平台"] },
  { ticker: "BRK.B", weight: 2.5, role: ["Broader capital allocation", "更广泛的资本配置"] },
];
export const etfs: { ticker: string; price: string; role: Copy; caution: Copy }[] = [
  { ticker: "VOO", price: "$701.61", role: ["Broad U.S. equity core", "美国大盘股票核心"], caution: ["Look through mega-cap overlap; not an AI-specific fund.", "穿透核查巨型股重叠；并非 AI 专项基金。"] },
  { ticker: "VGT", price: "$118.83", role: ["Concentrated technology exposure", "集中科技暴露"], caution: ["Direct stocks can duplicate the fund's largest holdings.", "直接持股可能重复基金最大成分。"] },
  { ticker: "VGSH", price: "$57.69", role: ["Short Treasury reserve", "短期国债储备"], caution: ["Not a bank deposit; total return and reinvestment yield vary.", "并非银行存款；总回报与再投资收益率会变化。"] },
  { ticker: "VGLT", price: "~$51.3", role: ["Long-duration Treasury exposure", "长期国债久期暴露"], caution: ["Can fall sharply when long yields rise; not a cash substitute.", "长端利率上升时可能明显下跌；不能替代现金。"] },
];
export const etfSourceMetrics: Copy[] = [
  ["VOO: source forward P/E 19.6x; expense ratio 0.03%; source grade A / illustrative portfolio grade B+.", "VOO：原文远期市盈率 19.6 倍、费率 0.03%；原文评级 A／示例组合评级 B+。"],
  ["VGT: source forward P/E 20.1x; expense ratio 0.09%; source grades A- / C+. Top ten 63.6%, top three 44.7% in the source snapshot.", "VGT：原文远期市盈率 20.1 倍、费率 0.09%；评级 A-／C+。原文前十大占 63.6%、前三大占 44.7%。"],
  ["VGSH: source trailing distribution yield about 3.78%, expense ratio 0.03%; source grades A / A.", "VGSH：原文过去一年分配收益率约 3.78%、费率 0.03%；评级 A／A。"],
  ["VGLT: source trailing distribution yield about 5%, expense ratio 0.03%; source grades B+/A- / A-.", "VGLT：原文过去一年分配收益率约 5%、费率 0.03%；评级 B+/A-／A-。"],
];
export const overlapExample = [
  ["NVDA", 17.59], ["AAPL", 15.91], ["MSFT", 11.16], ["MU", 4.45], ["AVGO", 4.11],
] as const;

export type Row = readonly (string | number)[];
export const balanceAssets: Row[] = [
  ["Cash", "现金", 2129.5, 828.7], ["Short-term securities", "短期证券", 172.7, 187.9],
  ["Receivables", "应收账款", 112.9, 39], ["Contract assets", "合同资产", 94.2, 61.6],
  ["Inventory", "库存", 266.9, 158.4], ["Prepaid / other current", "预付及其他流动资产", 119.5, 90],
  ["Current assets", "流动资产合计", 2895.8, 1365.5], ["Net PP&E", "固定资产净额", 393.9, 319.5],
  ["Intangibles", "无形资产", 320.4, 224.7], ["Goodwill", "商誉", 299.1, 205.8],
  ["Right-of-use assets", "使用权资产", 126, 104.3], ["Long-term securities", "长期证券", 85.4, 82.2],
  ["Other long-term assets, approx.", "其他长期资产等（约）", 66.7, 22.5], ["Total assets", "总资产", 4187.4, 2324.5],
];
export const balanceFunding: Row[] = [
  ["Payables", "应付账款", 74.5, 72.7], ["Accrued expenses", "应计费用", 44.2, 19.3],
  ["Employee liabilities", "员工相关负债", 29.1, 25.8], ["Contract liabilities", "合同负债", 351.2, 195.4],
  ["Other current liabilities", "其他流动负债", 29.2, 21.2], ["Current liabilities", "流动负债合计", 528.2, 334.5],
  ["Convertible debt, net", "可转债净额", 13.1, 152.4], ["Long-term borrowings", "长期借款", 1.7, 1.7],
  ["Long-term operating leases", "长期经营租赁负债", 104.4, 85.2], ["Long-term finance leases", "长期融资租赁负债", 14.5, 14.7],
  ["Other long-term liabilities, approx.", "其他长期负债（约）", 33.3, 14.2],
  ["Total liabilities", "总负债", 695.2, 602.6], ["Equity", "股东权益", 3492.2, 1721.9],
  ["Accumulated deficit", "累计亏损", -1106.2, -1011.9],
];
// USD millions; 2026 H1 is a six-month period, not a full year.
export const history: Row[] = [
  ["2021", 39, 23.3, 62.2, -3, -38.1, 55.7, 41.8, -117],
  ["2022", 60.7, 150.3, 211, 9, -11.5, 17.3, 65.2, -136],
  ["2023", 71.9, 172.7, 244.6, 21, 11.2, 25.1, 119.1, -183],
  ["2024", 125.4, 310.8, 436.2, 26.6, 27.6, 26.2, 174.4, -190],
  ["2025", 199, 402.8, 601.8, 34.4, 40.8, 31.3, 270.7, -198],
  ["2026 H1", 108.2, 326.2, 434.4, 37.1, 43.7, 34.9, 162.9, -94],
];
export const unitEconomics: Row[] = [
  ["2021", 8.1, 9.2], ["2022", 6.7, 7.5], ["2023", 7.1, 7],
  ["2024", 7.8, 5.7], ["2025", 8.5, 4.8], ["2026 H1", 9.2, 4.9], ["2026 Q2", 9.1, 4.4],
];
// USD billions; acquisition-dependent illustrative buckets, NOT disclosed reporting segments.
export const forecast: Row[] = [
  ["2027E", .33, .04, .40, .55, .45, 1.77], ["2028E", .39, .18, .52, .72, .90, 2.71],
  ["2029E", .45, .42, .65, .92, .94, 3.38], ["2030E", .51, .70, .80, 1.10, .98, 4.09],
  ["2031E", .57, .98, .95, 1.28, 1.03, 4.81], ["2032E", .63, 1.20, 1.10, 1.45, 1.08, 5.46],
  ["2033E", .69, 1.42, 1.25, 1.62, 1.14, 6.12], ["2034E", .75, 1.64, 1.40, 1.80, 1.20, 6.79],
  ["2035E", .81, 1.85, 1.55, 1.98, 1.27, 7.46], ["2036E", .87, 2.05, 1.70, 2.16, 1.34, 8.12],
];
export const marginPath: Row[] = [
  ["2026-27", "32-37%", "25-38%", "<0", "<0"], ["2028", "36-40%", "18-23%", "0-3%", "~0"],
  ["2030", "40-44%", "12-15%", "8-12%", "6-10%"], ["2033", "44-48%", "8-11%", "16-20%", "12-16%"],
  ["2036", "46-50%", "6-9%", "20-24%", "15-20%"],
];
export const scenarios: { name: Copy; revenue: string; gm: string; fcf: string; condition: Copy }[] = [
  { name: ["Bear", "悲观"], revenue: "$4.5-5.5B", gm: "38-42%", fcf: "5-10%", condition: ["Neutron delays and limited acquisition synergies", "Neutron 延误、并购协同有限"] },
  { name: ["Base", "基准"], revenue: "$8-9B", gm: "46-50%", fcf: "15-20%", condition: ["Neutron ramp, defense execution and successful Iridium integration", "Neutron 爬坡、国防交付与 Iridium 成功整合"] },
  { name: ["Bull", "乐观"], revenue: "$12-15B+", gm: "50%+", fcf: "20%+", condition: ["Scaled medium-lift launch and new space applications", "中型发射规模化与新航天应用"] },
];
export const sources = [
  { label: "RKLB Q2 2026 Form 10-Q", url: "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000062/rklb-20260630.htm", status: ["Historical filing; source-transcribed tables are rounded", "历史申报；转录表格经过取整"] as Copy },
  { label: "RKLB FY2025 Form 10-K", url: "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000013/rklb-20251231.htm", status: ["Annual and segment context", "年度及分部背景"] as Copy },
  { label: "Rocket Lab investor relations", url: "https://investors.rocketlabcorp.com/", status: ["Neutron, contracts and acquisition updates; verify status before trading", "Neutron、合同与并购更新；交易前核验状态"] as Copy },
  { label: "NVIDIA market statistics", url: "https://stockanalysis.com/stocks/nvda/statistics/", status: ["Live page; NOT an archived October 16 consensus dataset", "实时网页；并非 10 月 16 日一致预期存档"] as Copy },
  { label: "Vanguard VGT", url: "https://investor.vanguard.com/investment-products/etfs/profile/vgt", status: ["Current holdings / costs may differ from source snapshot", "当前持仓与费用可能不同于原文快照"] as Copy },
  { label: "Vanguard VOO", url: "https://investor.vanguard.com/investment-products/etfs/profile/voo", status: ["Issuer fund information", "发行人基金资料"] as Copy },
  { label: "Vanguard VGSH", url: "https://investor.vanguard.com/investment-products/etfs/profile/vgsh", status: ["Check SEC yield, duration and expense ratio", "核验 SEC 收益率、久期与费率"] as Copy },
  { label: "Vanguard VGLT", url: "https://investor.vanguard.com/investment-products/etfs/profile/vglt", status: ["Distribution yield is not yield to maturity or guaranteed return", "分配收益率不等于到期收益率或保证回报"] as Copy },
];
