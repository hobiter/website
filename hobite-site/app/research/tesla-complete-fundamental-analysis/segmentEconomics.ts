export type TeslaSegmentEconomics = { period: string; automotiveRevenue: number; energyRevenue: number; servicesRevenue: number; regulatoryCredits: number; automotiveGrossMargin: number | null; energyGrossMargin: number | null; sourceUrl: string };

export const TESLA_SEGMENT_ECONOMICS: TeslaSegmentEconomics[] = [
  { period: "FY2023", automotiveRevenue: 82_419_000_000, energyRevenue: 6_035_000_000, servicesRevenue: 8_319_000_000, regulatoryCredits: 1_790_000_000, automotiveGrossMargin: 18.2, energyGrossMargin: 18.9, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "FY2024", automotiveRevenue: 77_070_000_000, energyRevenue: 10_086_000_000, servicesRevenue: 10_534_000_000, regulatoryCredits: 2_763_000_000, automotiveGrossMargin: 16.9, energyGrossMargin: 26.2, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "FY2025", automotiveRevenue: 69_526_000_000, energyRevenue: 12_771_000_000, servicesRevenue: 12_530_000_000, regulatoryCredits: 1_993_000_000, automotiveGrossMargin: 16.2, energyGrossMargin: 29.8, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm" },
  { period: "Q2 2026", automotiveRevenue: 20_516_000_000, energyRevenue: 3_139_000_000, servicesRevenue: 4_581_000_000, regulatoryCredits: 146_000_000, automotiveGrossMargin: 16.9, energyGrossMargin: 20.4, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm" },
];

export const TESLA_SEGMENT_NOTE = "Automotive includes sales, regulatory credits and leasing. Tesla's reportable automotive segment also includes services and other; the table keeps services visible as a revenue line for analytical clarity.";
