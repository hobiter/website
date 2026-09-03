export type BroadcomSegmentMetric = {
  period: string;
  periodType: "annual" | "quarter";
  semiconductorRevenue: number;
  infrastructureSoftwareRevenue: number;
  aiSemiconductorRevenue: number | null;
  semiconductorGrowth: number | null;
  softwareGrowth: number | null;
  aiGrowth: number | null;
  sourceUrl: string;
};

export const BROADCOM_SEGMENT_SOURCE_NOTE =
  "Segment revenue is from Broadcom filings and earnings releases. FY2025 AI revenue is approximately $19.9B, summed from the four quarterly AI disclosures. AI revenue includes custom accelerators and AI networking and is a subset of semiconductor solutions.";

export const BROADCOM_SEGMENT_METRICS: BroadcomSegmentMetric[] = [
  { period: "FY2023", periodType: "annual", semiconductorRevenue: 28_182_000_000, infrastructureSoftwareRevenue: 7_637_000_000, aiSemiconductorRevenue: 3_800_000_000, semiconductorGrowth: null, softwareGrowth: null, aiGrowth: null, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016823000096/avgo-20231029.htm" },
  { period: "FY2024", periodType: "annual", semiconductorRevenue: 30_096_000_000, infrastructureSoftwareRevenue: 21_478_000_000, aiSemiconductorRevenue: 12_200_000_000, semiconductorGrowth: 7, softwareGrowth: 181, aiGrowth: 220, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016824000139/avgo-20241103.htm" },
  { period: "FY2025", periodType: "annual", semiconductorRevenue: 36_858_000_000, infrastructureSoftwareRevenue: 27_029_000_000, aiSemiconductorRevenue: 19_900_000_000, semiconductorGrowth: 22, softwareGrowth: 26, aiGrowth: 63, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/avgo-20251102.htm" },
  { period: "FY2026 Q1", periodType: "quarter", semiconductorRevenue: 12_515_000_000, infrastructureSoftwareRevenue: 6_796_000_000, aiSemiconductorRevenue: 8_400_000_000, semiconductorGrowth: 52, softwareGrowth: 1, aiGrowth: 106, sourceUrl: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial" },
  { period: "FY2026 Q2", periodType: "quarter", semiconductorRevenue: 15_009_000_000, infrastructureSoftwareRevenue: 7_178_000_000, aiSemiconductorRevenue: 10_800_000_000, semiconductorGrowth: 79, softwareGrowth: 9, aiGrowth: 143, sourceUrl: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial" },
  { period: "FY2026 Q3", periodType: "quarter", semiconductorRevenue: 20_839_000_000, infrastructureSoftwareRevenue: 8_752_000_000, aiSemiconductorRevenue: 16_700_000_000, semiconductorGrowth: 127, softwareGrowth: 29, aiGrowth: 221, sourceUrl: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial" },
];

export const BROADCOM_LATEST_SEGMENT_METRIC = BROADCOM_SEGMENT_METRICS.at(-1)!;
