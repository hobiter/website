export type NvidiaPlatformMetric = { period: string; dataCenterRevenue: number; hyperscaleRevenue: number; aiCloudEnterpriseRevenue: number; edgeComputingRevenue: number; dataCenterGrowth: number; sourceUrl: string };

export const NVIDIA_PLATFORM_METRICS: NvidiaPlatformMetric[] = [
  { period: "Q2 FY2026", dataCenterRevenue: 41_096_000_000, hyperscaleRevenue: 24_168_000_000, aiCloudEnterpriseRevenue: 16_928_000_000, edgeComputingRevenue: 5_647_000_000, dataCenterGrowth: 56, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { period: "Q1 FY2027", dataCenterRevenue: 75_246_000_000, hyperscaleRevenue: 43_050_000_000, aiCloudEnterpriseRevenue: 32_196_000_000, edgeComputingRevenue: 6_369_000_000, dataCenterGrowth: 95, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
  { period: "Q2 FY2027", dataCenterRevenue: 89_023_000_000, hyperscaleRevenue: 48_710_000_000, aiCloudEnterpriseRevenue: 40_313_000_000, edgeComputingRevenue: 7_198_000_000, dataCenterGrowth: 117, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
];

export const NVIDIA_LATEST_PLATFORM_METRIC = NVIDIA_PLATFORM_METRICS.at(-1)!;
export const NVIDIA_PLATFORM_METRICS_NOTE = "NVIDIA changed market-platform presentation in Q1 FY2027 and recast comparable periods. Q2 FY2027 also reclassified one company from AI Clouds, Industrial & Enterprise to Hyperscale.";
