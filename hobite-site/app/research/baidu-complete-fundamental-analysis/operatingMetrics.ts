export type BaiduOperatingMetric = {
  period: string;
  aiPoweredBusiness: number;
  aiCloudInfrastructure: number;
  aiApplications: number;
  aiNativeMarketing: number;
  onlineMarketing: number;
  baiduAppMau: number | null;
  sourceUrl: string;
};

const sourceUrl = "https://ir.baidu.com/news-releases/news-release-details/baidu-announces-second-quarter-2026-results";

export const BAIDU_OPERATING_METRICS: BaiduOperatingMetric[] = [
  { period: "Q2 2025", aiPoweredBusiness: 10_000_000_000, aiCloudInfrastructure: 4_867_000_000, aiApplications: 2_500_000_000, aiNativeMarketing: 2_600_000_000, onlineMarketing: 16_200_000_000, baiduAppMau: null, sourceUrl },
  { period: "Q1 2026", aiPoweredBusiness: 13_600_000_000, aiCloudInfrastructure: 8_800_000_000, aiApplications: 2_500_000_000, aiNativeMarketing: 2_300_000_000, onlineMarketing: 13_700_000_000, baiduAppMau: null, sourceUrl },
  { period: "Q2 2026", aiPoweredBusiness: 12_500_000_000, aiCloudInfrastructure: 7_300_000_000, aiApplications: 2_500_000_000, aiNativeMarketing: 2_600_000_000, onlineMarketing: 13_100_000_000, baiduAppMau: 644_000_000, sourceUrl },
];

export const BAIDU_OPERATING_METRICS_NOTE = "Baidu-defined operating categories are not all reported as audited segments. Q2 2025 category values are reconstructed from disclosed Q2 2026 growth rates and are rounded.";
