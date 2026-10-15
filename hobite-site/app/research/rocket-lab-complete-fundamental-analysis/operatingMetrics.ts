export const SOURCES = {
  annual:
    "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000013/rklb-20251231.htm",
  quarter:
    "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000062/rklb-20260630.htm",
  release:
    "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000061/rklb-08102026ex991.htm",
  neutron:
    "https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-provides-update-neutron-development-and-adjusts",
  neutronFiling:
    "https://www.sec.gov/Archives/edgar/data/1819994/000181999426000067/rklb-20261014.htm",
  financing:
    "https://www.sec.gov/Archives/edgar/data/1819994/000175392626001769/g085951_ex99-1.htm",
  financingFiling:
    "https://www.sec.gov/Archives/edgar/data/1819994/000175392626001769/g085951_8k.htm",
  merger:
    "https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-acquire-iridium-historic-deal-creating-fully",
  approval:
    "https://www.sec.gov/Archives/edgar/data/1418819/000095010326014464/dp253851_8k.htm",
  prospectus:
    "https://www.sec.gov/Archives/edgar/data/1819994/000175392626001452/g085840_s4.htm",
  facts: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001819994.json",
  submissions: "https://data.sec.gov/submissions/CIK0001819994.json",
};

// Manual extraction: Note 21 in FY2025, Note 18 and MD&A in Q2 2026. USD millions.
export const OPERATIONS = [
  {
    period: "FY2023",
    launchRevenue: 71.894,
    spaceRevenue: 172.698,
    launchGP: 8.067,
    spaceGP: 43.342,
    launches: 10,
    builds: 11,
    revenuePerLaunch: 7.1,
    costPerLaunch: 7.0,
    backlog: 1046.126,
    source: SOURCES.annual,
  },
  {
    period: "FY2024",
    launchRevenue: 125.376,
    spaceRevenue: 310.838,
    launchGP: 34.59,
    spaceGP: 81.559,
    launches: 16,
    builds: 14,
    revenuePerLaunch: 7.8,
    costPerLaunch: 5.7,
    backlog: 1067.037,
    source: SOURCES.annual,
  },
  {
    period: "FY2025",
    launchRevenue: 199.042,
    spaceRevenue: 402.757,
    launchGP: 81.27,
    spaceGP: 125.911,
    launches: 21,
    builds: 24,
    revenuePerLaunch: 8.5,
    costPerLaunch: 4.8,
    backlog: 1847.322,
    source: SOURCES.annual,
  },
  {
    period: "H1 2026",
    launchRevenue: 108.249,
    spaceRevenue: 326.165,
    launchGP: 47.333,
    spaceGP: 113.736,
    launches: 12,
    builds: 11,
    revenuePerLaunch: 9.2,
    costPerLaunch: 4.9,
    backlog: 2355.949,
    source: SOURCES.quarter,
  },
  {
    period: "Q2 2026",
    launchRevenue: 44.586,
    spaceRevenue: 189.48,
    launchGP: 19.11,
    spaceGP: 65.466,
    launches: 6,
    builds: null,
    revenuePerLaunch: 9.1,
    costPerLaunch: 4.4,
    backlog: 2355.949,
    source: SOURCES.quarter,
  },
];

export const ECONOMICS = {
  backlogWithin12Months: 0.45,
  governmentCustomerH1Share: 0.42,
  q2RevenueCatchup: 8.089,
  q2IndividualContractCatchup: 5.948,
  h1ContractAssets: 94.245,
  h1ContractLiabilities: 351.193,
  h1AcquiredContractLiabilities: 76.015,
  h1CashAcquisitions: 44.271,
  h1EquityAcquisitionConsideration: 160.802,
  h1AtmGross: 1529.639,
  h1AtmIssueCosts: 16.722,
  mayAtmGrossAtJune: 1055.63,
  mayAtmSharesAtJune: 7.783458,
  septemberAtmGross: 1944,
  septemberAtmShares: 29.3,
  assumedIridiumTermLoan: 1775,
  cancelledBridgeCommitment: 3600,
  iridiumCashPerShare: 27,
  collarFloor: 67.5,
  collarCeiling: 112.5,
  iridiumIllustrativeShares: 105.956272,
  // Reference count June 24 from S-4; not a forecast of closing shares/awards.
  expectedClosing: "mid-2027",
  firstNeutronTarget: "2027",
  guidance: {
    quarter: "Q3 2026",
    revenueLow: 250,
    revenueHigh: 265,
    grossMarginLow: 0.29,
    grossMarginHigh: 0.31,
    adjustedEbitdaLow: -23,
    adjustedEbitdaHigh: -17,
    sbcLow: 18,
    sbcHigh: 20,
  },
};

export function exchangeRatio(referenceVwap: number) {
  if (!Number.isFinite(referenceVwap) || referenceVwap <= 0)
    throw Error("Positive merger reference VWAP required");
  return referenceVwap <= ECONOMICS.collarFloor
    ? 0.4
    : referenceVwap >= ECONOMICS.collarCeiling
      ? 0.24
      : Math.round((27 / referenceVwap) * 10000) / 10000;
}
export function transactionIllustration(
  referenceVwap: number,
  iridiumShares = ECONOMICS.iridiumIllustrativeShares,
) {
  if (!Number.isFinite(iridiumShares) || iridiumShares <= 0)
    throw Error("Positive Iridium share count required");
  const ratio = exchangeRatio(referenceVwap);
  return {
    ratio,
    newShares: ratio * iridiumShares,
    cashConsideration: 27 * iridiumShares,
    valuePerIridiumShare: 27 + ratio * referenceVwap,
  };
}
