import { VST_SOURCES } from "./operatingMetrics";
export const VST_SEGMENTS = [
  { name: "Retail", fy2024: 1_463_000_000, fy2025: 1_622_000_000, q22025: 756_000_000, q22026: 773_000_000 },
  { name: "Texas", fy2024: 2_032_000_000, fy2025: 1_834_000_000, q22025: 142_000_000, q22026: 311_000_000 },
  { name: "East", fy2024: 2_017_000_000, fy2025: 2_282_000_000, q22025: 418_000_000, q22026: 642_000_000 },
  { name: "West", fy2024: 225_000_000, fy2025: 244_000_000, q22025: 49_000_000, q22026: 68_000_000 },
  { name: "Corporate / Other", fy2024: -94_000_000, fy2025: -70_000_000, q22025: -16_000_000, q22026: -27_000_000 },
  { name: "Asset Closure (excluded)", fy2024: -104_000_000, fy2025: -74_000_000, q22025: -17_000_000, q22026: -23_000_000 },
];
export const VST_SEGMENT_NOTE = "Adjusted EBITDA, not revenue. Ongoing operations exclude Asset Closure; rounded segment sums can differ by $1M. FY2024/FY2025 use the latest annual-release presentation; Q2 uses the quarterly release.";
export const VST_SEGMENT_SOURCES = [VST_SOURCES.annual, VST_SOURCES.q2];
export const VST_CASH_BRIDGE = {
  year: 2026, fcfBeforeGrowthMidpoint: 4_325_000_000,
  assumedGrowthInvestment: 1_100_000_000, assumedPreferredDistributions: 192_000_000,
  assumedClosureCash: 100_000_000,
  note: "Analyst bridge, not a company reconciliation. The growth, preferred distribution and closure deductions are explicit estimates. Working-capital and collateral changes excluded by adjusted FCFbG can still consume cash; no borrowing proceeds are treated as operating cash generation.",
};
