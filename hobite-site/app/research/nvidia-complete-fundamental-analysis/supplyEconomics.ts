export type NvidiaSupplyEconomics = { period: string; inventory: number; supplyCommitments: number; aiCloudCommitments: number; thirdPartyLeaseCommitments: number; customerOneRevenueShare: number; customerTwoRevenueShare: number; sourceUrl: string };

export const NVIDIA_SUPPLY_ECONOMICS: NvidiaSupplyEconomics[] = [
  { period: "FY2024", inventory: 5_282_000_000, supplyCommitments: 48_700_000_000, aiCloudCommitments: 0, thirdPartyLeaseCommitments: 0, customerOneRevenueShare: 13, customerTwoRevenueShare: 0, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581024000029/nvda-20240128.htm" },
  { period: "FY2025", inventory: 10_080_000_000, supplyCommitments: 35_600_000_000, aiCloudCommitments: 0, thirdPartyLeaseCommitments: 0, customerOneRevenueShare: 12, customerTwoRevenueShare: 11, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581025000023/nvda-20250126.htm" },
  { period: "FY2026", inventory: 21_403_000_000, supplyCommitments: 95_200_000_000, aiCloudCommitments: 0, thirdPartyLeaseCommitments: 22_700_000_000, customerOneRevenueShare: 22, customerTwoRevenueShare: 14, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm" },
  { period: "Q2 FY2027", inventory: 31_575_000_000, supplyCommitments: 279_000_000_000, aiCloudCommitments: 36_000_000_000, thirdPartyLeaseCommitments: 20_000_000_000, customerOneRevenueShare: 0, customerTwoRevenueShare: 0, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
];

export const NVIDIA_SUPPLY_NOTE = "Commitments are contractual exposure, not debt or guaranteed loss. Q2 FY2027 also disclosed $3.5B of AI-cloud land, power and shell guarantees and a later $105B capped SB Energy guarantee that generally begins as construction phases enter service.";
