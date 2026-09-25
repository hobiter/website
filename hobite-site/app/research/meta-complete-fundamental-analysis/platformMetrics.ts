export type MetaPlatformMetric = { period: string; dataCenterRevenue: number; hyperscaleRevenue: number; aiCloudEnterpriseRevenue: number; edgeComputingRevenue: number; dataCenterGrowth: number; sourceUrl: string };

export const META_PLATFORM_METRICS: MetaPlatformMetric[] = [
  { period: "Q2 2025", dataCenterRevenue: 47_516_000_000, hyperscaleRevenue: 3_490_000_000, aiCloudEnterpriseRevenue: 6, edgeComputingRevenue: 11, dataCenterGrowth: 22, sourceUrl: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
  { period: "Q1 2026", dataCenterRevenue: 56_311_000_000, hyperscaleRevenue: 3_430_000_000, aiCloudEnterpriseRevenue: 10, edgeComputingRevenue: 7, dataCenterGrowth: 33, sourceUrl: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-First-Quarter-2026-Results/" },
  { period: "Q2 2026", dataCenterRevenue: 60_801_000_000, hyperscaleRevenue: 3_600_000_000, aiCloudEnterpriseRevenue: 14, edgeComputingRevenue: 12, dataCenterGrowth: 28, sourceUrl: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
];

export const META_LATEST_PLATFORM_METRIC = META_PLATFORM_METRICS.at(-1)!;
export const META_PLATFORM_METRICS_NOTE = "Meta does not disclose revenue by AI product. This operating table instead tracks reported Family daily active people (DAP), ad-impression growth and average-price-per-ad growth alongside total revenue growth.";
