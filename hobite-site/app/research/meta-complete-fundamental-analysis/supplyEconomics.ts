export type MetaSupplyEconomics = { period: string; inventory: number; supplyCommitments: number; aiCloudCommitments: number; thirdPartyLeaseCommitments: number; customerOneRevenueShare: number; customerTwoRevenueShare: number; sourceUrl: string };

export const META_SUPPLY_ECONOMICS: MetaSupplyEconomics[] = [
  { period: "FY2024", inventory: 0, supplyCommitments: 0, aiCloudCommitments: 0, thirdPartyLeaseCommitments: 0, customerOneRevenueShare: 0, customerTwoRevenueShare: 0, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000132680125000017/meta-20241231.htm" },
  { period: "FY2025", inventory: 0, supplyCommitments: 0, aiCloudCommitments: 45_719_000_000, thirdPartyLeaseCommitments: 43_031_000_000, customerOneRevenueShare: 0, customerTwoRevenueShare: 0, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm" },
  { period: "Q2 2026", inventory: 0, supplyCommitments: 0, aiCloudCommitments: 74_798_000_000, thirdPartyLeaseCommitments: 49_113_000_000, customerOneRevenueShare: 14, customerTwoRevenueShare: 12, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm" },
];

export const META_SUPPLY_NOTE = "Meta's disclosed AI build-out exposure is primarily capital intensity: Q2 2026 purchases of property and equipment were $30.1B and finance-lease principal payments were $1.0B. The table deliberately leaves undisclosed GPU and power commitments as zero rather than inventing liabilities.";
