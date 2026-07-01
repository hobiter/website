export type ReportSection = {
  title: string;
  thesis: string;
  bullets: string[];
};

export const NETFLIX_REPORT_SECTIONS: ReportSection[] = [
  {
    title: "Executive Summary",
    thesis:
      "Netflix has completed one of the rare consumer internet transitions from growth story to cash-generative global media platform.",
    bullets: [
      "The core thesis is that Netflix's scale, recommendation system, global content distribution, and pricing power create a durable attention-and-entertainment compounder.",
      "The base case assumes continued paid engagement growth, disciplined content spend, advertising monetization, and modest operating leverage.",
      "The risk case is not insolvency or product irrelevance; it is valuation compression if growth slows before ads, games, and live programming become large enough to matter.",
    ],
  },
  {
    title: "Company History",
    thesis:
      "Netflix's history is a sequence of self-disruption decisions: DVD-by-mail, streaming, originals, international expansion, advertising, live events, and now AI-enabled personalization.",
    bullets: [
      "The 2002 IPO-era company was a domestic DVD subscription business with a small but already visible data advantage in recommendations and fulfillment.",
      "Streaming shifted Netflix from logistics to software distribution, while originals shifted the company from aggregator to content owner and global programmer.",
      "The advertising tier and live-event strategy are the next monetization layers on top of the same global engagement base.",
    ],
  },
  {
    title: "Business Model",
    thesis:
      "Netflix sells recurring access to a global entertainment library, then reinvests subscriber cash flows into content, product, localization, and monetization systems.",
    bullets: [
      "Subscription revenue remains the foundation because it creates recurring cash receipts and predictable engagement data.",
      "Advertising adds a second yield curve for price-sensitive users without forcing the whole member base into a single price ladder.",
      "The model improves when content amortization, technology spend, and marketing grow slower than revenue.",
    ],
  },
  {
    title: "Financial Quality",
    thesis:
      "The financial story has shifted from cash-burning content expansion to high-margin free-cash-flow generation.",
    bullets: [
      "Revenue grew from $153M in FY2002 to $45.2B in FY2025 in the current dataset.",
      "FY2025 operating margin reached 29.5%, a very different profile from the low-margin DVD and early streaming reinvestment years.",
      "Free cash flow reached $9.5B in FY2025, giving Netflix strategic flexibility for content, ads, sports, buybacks, and selective acquisitions.",
    ],
  },
  {
    title: "Subscribers and ARPU",
    thesis:
      "Subscriber analysis should now be treated as a monetization-quality problem rather than only a member-count problem.",
    bullets: [
      "Netflix's decision to reduce quarterly subscriber disclosure makes revenue, ARPU, engagement, churn, and advertising progress more important monitoring variables.",
      "Regional ARPU remains central because mature markets provide pricing power while emerging markets provide long-duration household penetration.",
      "The next data pass should extract every disclosed membership and ARPU table from shareholder letters and annual reports.",
    ],
  },
  {
    title: "Content Economics",
    thesis:
      "Netflix's largest capital allocation decision is content: the company must balance freshness, global taste coverage, local originals, and amortization discipline.",
    bullets: [
      "Content assets and amortization are the bridge between reported margins and cash economics.",
      "The best case is that larger scale allows Netflix to produce more global viewing hours per dollar of content spend.",
      "The bear case is content inflation from competitors, talent costs, and live sports rights.",
    ],
  },
  {
    title: "Balance Sheet and Capital Allocation",
    thesis:
      "Netflix now has a balance sheet that supports offense rather than survival.",
    bullets: [
      "FY2025 cash and equivalents were $9.0B against $13.5B long-term debt in the current SEC dataset.",
      "The capital allocation hierarchy should be content ROI first, platform monetization second, then debt management and buybacks.",
      "Buybacks are attractive only when management can repurchase below conservative intrinsic value.",
    ],
  },
  {
    title: "AI Strategy",
    thesis:
      "AI is not a separate product line for Netflix; it is an operating system for personalization, localization, production efficiency, advertising, and discovery.",
    bullets: [
      "Recommendation quality is a long-standing Netflix advantage because it converts a large catalog into personalized user surfaces.",
      "AI localization and dubbing can increase the global addressable audience for local-language content.",
      "Advertising AI matters because targeting, measurement, and creative optimization determine ad-tier monetization quality.",
    ],
  },
  {
    title: "Advertising",
    thesis:
      "Advertising is the most important new profit pool because it can raise revenue per engagement hour without relying only on subscription price increases.",
    bullets: [
      "The ad tier can expand the funnel for price-sensitive users and improve monetization in mature markets.",
      "The main execution risk is building ad tech, measurement, and demand density without degrading the viewing experience.",
      "Long term, advertising can make Netflix more comparable to scaled attention platforms while preserving subscription revenue quality.",
    ],
  },
  {
    title: "Live Sports and Events",
    thesis:
      "Live programming can increase appointment viewing, ad inventory, and cultural relevance, but rights discipline is critical.",
    bullets: [
      "The strategic logic is engagement frequency and advertiser demand, not simply copying linear television.",
      "Sports rights become dangerous if bidding turns fixed-cost inflation into a margin headwind.",
      "The best fit is selective global or semi-global events where Netflix can amortize rights across a very large member base.",
    ],
  },
  {
    title: "Gaming",
    thesis:
      "Gaming remains an option-value business rather than a core valuation pillar.",
    bullets: [
      "The strategic rationale is deeper engagement and franchise extension.",
      "The risk is that gaming requires different production, distribution, and hit-development capabilities than film and series.",
      "Until gaming contributes visible revenue or retention, it should be valued conservatively.",
    ],
  },
  {
    title: "Competition",
    thesis:
      "Netflix competes with streaming services, creator platforms, social video, gaming, sports, and every other claim on leisure time.",
    bullets: [
      "Disney, Amazon, Apple, Max, and YouTube each pressure different parts of Netflix's value proposition.",
      "Netflix's advantage is focus: streaming entertainment is the core business, not an ancillary bundle component.",
      "The competitive question is whether Netflix can keep content productivity and product engagement high enough to justify recurring price increases.",
    ],
  },
  {
    title: "Management",
    thesis:
      "Netflix management has repeatedly shown willingness to disrupt its own model before the market forces the issue.",
    bullets: [
      "Reed Hastings shaped the culture and long-term transition mindset.",
      "Ted Sarandos and Greg Peters now represent the combined content-and-product operating model.",
      "The key management test is capital discipline as Netflix expands into ads, live events, games, and AI-enabled production tools.",
    ],
  },
  {
    title: "Risks",
    thesis:
      "The biggest risks are content ROI degradation, price elasticity, competitive attention shifts, advertising execution, sports rights inflation, currency, and regulation.",
    bullets: [
      "A large fixed content base magnifies mistakes in programming and rights acquisition.",
      "Advertising could underdeliver if targeting, measurement, or buyer demand develops slower than expected.",
      "Regulatory and cultural risk rises as Netflix becomes a larger global media institution.",
    ],
  },
  {
    title: "Investment Conclusion",
    thesis:
      "Netflix is a high-quality global consumer platform, but the investment case is valuation-sensitive after the business has already proven its margin potential.",
    bullets: [
      "Base-case rating: Quality compounder / valuation-sensitive.",
      "Best investor fit: long-duration investors comfortable underwriting media volatility and content-cycle uncertainty.",
      "Key monitoring metrics: revenue growth, operating margin, FCF margin, ad revenue progress, content amortization, regional monetization, and buyback discipline.",
    ],
  },
];
