export const VST_SOURCES = {
  financing: "https://investor.vistracorp.com/2026-09-10-Vistra-Prices-Registered-Offering-of-1-5-Billion-of-Junior-Subordinated-Notes",
  q2: "https://www.sec.gov/Archives/edgar/data/1692819/000169281926000017/vistra-20260630xearningsre.htm",
  q1: "https://www.sec.gov/Archives/edgar/data/1692819/000169281926000011/vistra-20260331xearningsre.htm",
  annual: "https://www.sec.gov/Archives/edgar/data/1692819/000119312526073364/d21122dex991.htm",
  filing: "https://www.sec.gov/Archives/edgar/data/1692819/000169281926000019/vistra-20260630.htm",
  meta: "https://investor.vistracorp.com/2026-01-09-Vistra-and-Meta-Announce-Agreements-to-Support-Nuclear-Plants-in-PJM-and-Add-New-Nuclear-Generation-to-the-Grid",
};
export const VST_OPERATING = [
  { period: "FY2024", adjustedEbitda: 5_643_000_000, fcfBeforeGrowth: null, source: VST_SOURCES.annual },
  { period: "FY2025", adjustedEbitda: 5_912_000_000, fcfBeforeGrowth: 3_592_000_000, source: VST_SOURCES.annual },
  { period: "2026 Q1", adjustedEbitda: 1_494_000_000, fcfBeforeGrowth: null, source: VST_SOURCES.q1 },
  { period: "2026 Q2", adjustedEbitda: 1_767_000_000, fcfBeforeGrowth: null, source: VST_SOURCES.q2 },
];
export const VST_GUIDANCE = {
  asOf: "2026-08-07", ebitdaLow: 6_800_000_000, ebitdaHigh: 7_600_000_000,
  fcfLow: 3_925_000_000, fcfHigh: 4_725_000_000,
  opportunity2027Low: 7_400_000_000, opportunity2027High: 7_800_000_000,
  cash: 435_000_000, liquidity: 6_295_000_000,
  spotShares: 335_961_328, dilutedShares: 339_230_976,
  carryingDebt: 19_595_000_000, receivablesFinancing: 300_000_000,
  marginFinancing: 438_000_000, forwardRepurchase: 613_000_000,
  preferredStock: 2_476_000_000, minorityInterest: 12_000_000,
  source: VST_SOURCES.q2,
};
export const VST_HEDGING = [
  { year: 2026, hedgedPercent: 100 }, { year: 2027, hedgedPercent: 94 }, { year: 2028, hedgedPercent: 72 },
];
export const VST_CONTRACTS = [
  { name: "AWS / Comanche Peak", capacityMw: 1200, durationYears: 20, incrementalMw: null, source: VST_SOURCES.annual },
  { name: "Meta / PJM nuclear", capacityMw: 2609, durationYears: 20, incrementalMw: 433, source: VST_SOURCES.meta },
];
