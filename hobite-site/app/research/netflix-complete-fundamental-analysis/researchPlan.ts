export type ResearchSection = {
  title: string;
  slug: string;
  objective: string;
  primaryOutputs: string[];
  sourcePriority: string[];
};

export type ChartGroup = {
  category: string;
  examples: string[];
  targetCount: number;
};

export const NFLX_RESEARCH_SECTIONS: ResearchSection[] = [
  {
    title: "Executive Summary",
    slug: "executive-summary",
    objective: "Condense the long-term Netflix investment case into a clear bull, base, and bear framework.",
    primaryOutputs: [
      "Investment thesis",
      "Moat assessment",
      "Risk summary",
      "Rating framework",
    ],
    sourcePriority: ["Latest Form 10-K", "Latest shareholder letter", "Management commentary"],
  },
  {
    title: "Company History",
    slug: "company-history",
    objective: "Trace Netflix from DVD-by-mail to streaming, originals, international scale, advertising, sports, gaming, and AI.",
    primaryOutputs: [
      "Timeline",
      "Strategic decision map",
      "Management transition notes",
    ],
    sourcePriority: ["IPO S-1", "Annual reports", "Shareholder letters"],
  },
  {
    title: "Financial History",
    slug: "financial-history",
    objective: "Build a complete annual financial database from IPO through the latest fiscal year.",
    primaryOutputs: [
      "Income statement",
      "Balance sheet",
      "Cash flow statement",
      "Margin and return metrics",
      "CAGR calculations",
    ],
    sourcePriority: ["SEC 10-K filings", "Company annual reports", "XBRL company facts"],
  },
  {
    title: "Quarterly Analysis",
    slug: "quarterly-analysis",
    objective: "Build a quarterly operating and financial history for growth, margin, EPS, and free cash flow trends.",
    primaryOutputs: [
      "Quarterly revenue",
      "Quarterly operating margin",
      "Quarterly net income and EPS",
      "Quarterly free cash flow",
    ],
    sourcePriority: ["SEC 10-Q filings", "Quarterly shareholder letters", "Earnings releases"],
  },
  {
    title: "Business Model",
    slug: "business-model",
    objective: "Explain how Netflix converts subscribers, engagement, pricing, ads, and content scale into cash generation.",
    primaryOutputs: [
      "Revenue architecture",
      "Cost structure",
      "Unit economics",
      "Pricing power framework",
    ],
    sourcePriority: ["Annual reports", "Shareholder letters", "Investor presentations"],
  },
  {
    title: "Subscribers",
    slug: "subscribers",
    objective: "Analyze member growth, regional mix, ARPU, and the post-2025 reporting transition.",
    primaryOutputs: [
      "Historical members",
      "Regional subscribers",
      "Regional ARPU",
      "Reporting metric change explanation",
    ],
    sourcePriority: ["Shareholder letters", "Annual reports", "Segment disclosures"],
  },
  {
    title: "Content Economics",
    slug: "content-economics",
    objective: "Separate content cash investment, content assets, amortization, licensed content, and originals.",
    primaryOutputs: [
      "Content asset schedule",
      "Amortization trend",
      "Cash content spend",
      "Accounting explanation",
    ],
    sourcePriority: ["10-K notes", "Cash flow statements", "Management discussion and analysis"],
  },
  {
    title: "Balance Sheet",
    slug: "balance-sheet",
    objective: "Evaluate liquidity, leverage, debt maturity, equity evolution, and balance sheet flexibility.",
    primaryOutputs: [
      "Cash and investments",
      "Debt history",
      "Debt maturity schedule",
      "Equity and leverage metrics",
    ],
    sourcePriority: ["10-K balance sheets", "Debt footnotes", "Cash flow statements"],
  },
  {
    title: "Cash Flow",
    slug: "cash-flow",
    objective: "Analyze operating cash flow, investing cash flow, financing cash flow, and free cash flow conversion.",
    primaryOutputs: [
      "OCF bridge",
      "FCF bridge",
      "Cash conversion history",
      "Capital efficiency metrics",
    ],
    sourcePriority: ["10-K cash flow statements", "10-Q cash flow statements", "Shareholder letters"],
  },
  {
    title: "AI Strategy",
    slug: "ai-strategy",
    objective: "Assess Netflix's AI usage in recommendations, localization, ads, production workflows, and future product surfaces.",
    primaryOutputs: [
      "AI use case map",
      "Personalization moat analysis",
      "Advertising AI analysis",
      "Production workflow opportunities",
    ],
    sourcePriority: ["Annual reports", "Product disclosures", "Management commentary"],
  },
  {
    title: "Competition",
    slug: "competition",
    objective: "Compare Netflix with Disney, Amazon Prime Video, Apple TV+, YouTube, Max, TikTok, and other attention platforms.",
    primaryOutputs: [
      "Competitive matrix",
      "Pricing comparison",
      "Content strategy comparison",
      "Profitability comparison",
    ],
    sourcePriority: ["Peer filings", "Company disclosures", "Industry datasets"],
  },
  {
    title: "Valuation",
    slug: "valuation",
    objective: "Track valuation cycles across P/E, EV/Sales, EV/EBIT, EV/FCF, FCF yield, and stock price drawdowns.",
    primaryOutputs: [
      "Historical multiple tables",
      "Valuation cycle charts",
      "Stock price context",
      "Peer valuation comparison",
    ],
    sourcePriority: ["Market data", "SEC financials", "Share count history"],
  },
  {
    title: "Forecast",
    slug: "forecast",
    objective: "Build 2026-2035 bear, base, and bull financial scenarios.",
    primaryOutputs: [
      "Revenue forecast",
      "Operating margin forecast",
      "EPS forecast",
      "FCF forecast",
      "Ads, gaming, and sports scenarios",
    ],
    sourcePriority: ["Historical financial database", "Management outlook", "Scenario assumptions"],
  },
  {
    title: "DCF",
    slug: "dcf",
    objective: "Translate the scenario model into intrinsic value ranges and sensitivity tables.",
    primaryOutputs: [
      "DCF model",
      "Terminal value bridge",
      "Discount rate sensitivity",
      "Terminal growth sensitivity",
    ],
    sourcePriority: ["Forecast model", "Market data", "Capital structure data"],
  },
  {
    title: "Investment Conclusion",
    slug: "investment-conclusion",
    objective: "Summarize strengths, weaknesses, moat durability, expected returns, and suitable investor profile.",
    primaryOutputs: [
      "Final rating",
      "Expected CAGR range",
      "Key monitoring metrics",
      "Risk/reward summary",
    ],
    sourcePriority: ["All completed sections", "Forecast model", "DCF model"],
  },
];

export const NFLX_SOURCE_SYSTEMS = [
  {
    name: "SEC EDGAR company submissions",
    url: "https://data.sec.gov/submissions/CIK0001065280.json",
    use: "Master filing index for Netflix Form S-1, 10-K, 10-Q, and 8-K documents.",
  },
  {
    name: "SEC EDGAR company facts",
    url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001065280.json",
    use: "XBRL-backed annual and quarterly financial statement extraction.",
  },
  {
    name: "Netflix quarterly earnings",
    url: "https://ir.netflix.net/financials/quarterly-earnings/default.aspx",
    use: "Shareholder letters, earnings releases, and company operating commentary.",
  },
  {
    name: "Netflix SEC filings page",
    url: "https://ir.netflix.net/financials/sec-filings/default.aspx",
    use: "Company investor relations filing archive and presentation links.",
  },
];

export const NFLX_CHART_GROUPS: ChartGroup[] = [
  {
    category: "Annual financials",
    targetCount: 28,
    examples: [
      "Revenue",
      "Gross profit",
      "Operating income",
      "Net income",
      "Diluted EPS",
      "Revenue CAGR",
      "EPS CAGR",
    ],
  },
  {
    category: "Margins and returns",
    targetCount: 16,
    examples: [
      "Gross margin",
      "Operating margin",
      "Net margin",
      "ROIC",
      "ROE",
      "FCF margin",
    ],
  },
  {
    category: "Cash flow and capital allocation",
    targetCount: 18,
    examples: [
      "Operating cash flow",
      "Capital expenditures",
      "Free cash flow",
      "Debt issuance and repayment",
      "Share repurchases",
      "Share count",
    ],
  },
  {
    category: "Subscribers and regions",
    targetCount: 18,
    examples: [
      "Global paid memberships",
      "Regional memberships",
      "Regional ARPU",
      "Subscriber mix",
      "Revenue per member",
    ],
  },
  {
    category: "Content economics",
    targetCount: 12,
    examples: [
      "Content assets",
      "Content amortization",
      "Cash content investment",
      "Licensed vs original content discussion charts",
    ],
  },
  {
    category: "Valuation and forecast",
    targetCount: 18,
    examples: [
      "P/E",
      "EV/Sales",
      "EV/EBIT",
      "EV/FCF",
      "FCF yield",
      "2035 scenario revenue",
      "DCF sensitivity",
    ],
  },
];

export const NFLX_IMPLEMENTATION_MILESTONES = [
  "Source inventory and filing downloader",
  "Annual financial database",
  "Quarterly financial database",
  "Subscriber and ARPU database",
  "Content economics database",
  "Chart component system",
  "Long-form research writing",
  "Forecast and DCF model",
  "Publication QA and citation audit",
];
