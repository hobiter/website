export const SOURCES = {
  annual:
    "https://www.sec.gov/Archives/edgar/data/1397187/000139718726000020/lulu-20260201.htm",
  quarter:
    "https://www.sec.gov/Archives/edgar/data/1397187/000139718726000127/lulu-20260802.htm",
  release:
    "https://www.sec.gov/Archives/edgar/data/1397187/000139718726000126/lulu-20260802xex991.htm",
  leadership:
    "https://corporate.lululemon.com/newsroom/press-releases/2026/10-07-2026-210554290",
  history: "https://corporate.lululemon.com/about-us/our-history",
  market: "https://finance.yahoo.com/quote/LULU/history/",
};
// USD millions; operating disclosures are not inferred from companywide revenue.
export const OPERATIONS = [
  {
    period: "FY2024",
    stores: 767,
    salesPerSqFt: 1574,
    chinaRevenue: 1361.337,
    restRevenue: 1298.633,
    comps: null,
    source: SOURCES.annual,
  },
  {
    period: "FY2025",
    stores: 811,
    salesPerSqFt: 1426,
    chinaRevenue: 1754.799,
    restRevenue: 1500.757,
    comps: 2,
    source: SOURCES.annual,
  },
  {
    period: "Q2 FY2026",
    stores: 825,
    salesPerSqFt: null,
    chinaRevenue: null,
    restRevenue: null,
    comps: -9,
    source: SOURCES.release,
  },
];
export const CURRENT = {
  revenue: 2415.631,
  refund: 134.5,
  interest: 4.1,
  reportedEps: 2.92,
  refundEps: 0.86,
  americasGrowth: -8,
  internationalGrowth: 4,
  americasComps: -12,
  internationalComps: -3,
  inventoryUnitGrowth: -7,
  guidanceRevenue: [10350, 10500],
  guidanceEps: [9.48, 9.73],
  guidanceDate: "2026-09-03",
  cash: 1389.737,
  leases: 2141.127,
};
