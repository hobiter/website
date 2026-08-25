export type BerkshireReportSection = { title: string; thesis: string; bullets: string[] };

export const BERKSHIRE_REPORT_SECTIONS: BerkshireReportSection[] = [
  {
    title: "Executive Summary",
    thesis: "Berkshire is a decentralized operating conglomerate, an insurance-funded investment portfolio and a capital-allocation platform; recurring operating earnings and book-value compounding are more informative than quarterly GAAP net income.",
    bullets: [
      "H1 2026 operating earnings rose 17% to $24.3B, led by manufacturing, service and retailing, BNSF and BHE.",
      "June 2026 cash and Treasury bills were $365.5B, providing exceptional liquidity but creating reinvestment risk.",
      "The base valuation is near the August 24 reference price, so future returns depend more on compounding than multiple expansion.",
    ],
  },
  {
    title: "Business Architecture",
    thesis: "Insurance float finances a broad asset base while wholly owned businesses produce durable cash flows across rail, utilities, manufacturing, services and retailing.",
    bullets: [
      "GEICO, General Re and Berkshire Hathaway Reinsurance Group create underwriting earnings and investable float.",
      "BNSF and Berkshire Hathaway Energy provide capital-intensive, regulated or network-like earnings streams.",
      "The manufacturing, service and retailing group diversifies cash generation but makes consolidated revenue less useful as a valuation anchor.",
    ],
  },
  {
    title: "Financial Quality",
    thesis: "The accounting statements are strong, but equity-security marks make reported profit unusually volatile and mechanical free cash flow understates the economics of regulated reinvestment.",
    bullets: [
      "Book value increased from $282.1B in 2016 to $717.4B in 2025.",
      "FY2025 operating earnings were $44.5B versus $67.0B of GAAP net income.",
      "Recurring underwriting profitability and disciplined leverage matter more than any single quarter's investment gain.",
    ],
  },
  {
    title: "Insurance Economics",
    thesis: "Float is valuable only when underwriting is at least break-even over time and liquidity remains adequate for extreme claims.",
    bullets: [
      "Float reached $177.5B in June 2026, up from $169.0B at year-end 2023.",
      "H1 2026 underwriting earnings were $3.45B despite catastrophe volatility.",
      "Investment income declined 8% in H1 as lower short-term rates began to offset the larger liquidity base.",
    ],
  },
  {
    title: "Capital Allocation",
    thesis: "The central question is whether Berkshire can redeploy its growing liquidity at returns that preserve per-share compounding.",
    bullets: [
      "Cash and Treasury bills exceeded $365B at June 2026, while public equities totaled $323.8B.",
      "No shares were repurchased in 2025; approximately $4.8B were repurchased in H1 2026.",
      "Class A equivalent shares fell to 1.432M, but future buybacks remain price dependent rather than programmatic.",
    ],
  },
  {
    title: "Valuation",
    thesis: "A blended operating-earnings and price-to-book framework produces a wide range because investment assets, float economics and controlled businesses cannot be reduced to one clean multiple.",
    bullets: [
      "The August 24 reference price implies about 1.45x June book value and 22.3x annualized H1 operating earnings.",
      "The base case applies 22x to $50B of normalized earnings and 1.5x to June book value, then averages the two cross-checks.",
      "The bear case is driven by weak underwriting, lower short-rate income and poor cash deployment; the bull case requires stronger operating growth and productive capital allocation.",
    ],
  },
  {
    title: "Risks",
    thesis: "The largest risks are catastrophe losses, regulated-utility liabilities, capital intensity, succession execution and the drag from an oversized cash balance.",
    bullets: [
      "Insurance losses can be severe, correlated and difficult to model from historical averages.",
      "BHE faces wildfire, regulatory and major capital-spending exposure.",
      "A smaller opportunity set and leadership transition may reduce Berkshire's historical capital-allocation advantage.",
    ],
  },
  {
    title: "Investment Conclusion",
    thesis: "Berkshire remains a high-quality defensive compounder, but at the reference valuation it is better framed as a patient compounding decision than an obvious statistical bargain.",
    bullets: [
      "The quality case rests on balance-sheet resilience, diversified earning power and tax-efficient internal compounding.",
      "The key monitor is per-share operating earnings and book value, not headline GAAP net income.",
      "The thesis improves when deployment opportunities expand or the share price offers a wider discount to conservative value.",
    ],
  },
];
