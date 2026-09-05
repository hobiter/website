export type TeslaOperatingMetric = { period: string; production: number; deliveries: number; fsdSubscriptions: number; inventoryDays: number; storageGwh: number; superchargerStations: number; superchargerConnectors: number; sourceUrl: string };

export const TESLA_OPERATING_METRICS: TeslaOperatingMetric[] = [
  { period: "Q2 2025", production: 410244, deliveries: 384122, fsdSubscriptions: 950000, inventoryDays: 24, storageGwh: 9.6, superchargerStations: 7377, superchargerConnectors: 70228, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
  { period: "Q3 2025", production: 447450, deliveries: 497099, fsdSubscriptions: 1040000, inventoryDays: 10, storageGwh: 12.5, superchargerStations: 7753, superchargerConnectors: 73817, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
  { period: "Q4 2025", production: 434358, deliveries: 418227, fsdSubscriptions: 1100000, inventoryDays: 15, storageGwh: 14.2, superchargerStations: 8182, superchargerConnectors: 77682, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
  { period: "Q1 2026", production: 408386, deliveries: 358023, fsdSubscriptions: 1280000, inventoryDays: 27, storageGwh: 8.8, superchargerStations: 8463, superchargerConnectors: 79918, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
  { period: "Q2 2026", production: 451758, deliveries: 480126, fsdSubscriptions: 1480000, inventoryDays: 15, storageGwh: 13.5, superchargerStations: 8704, superchargerConnectors: 82357, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/tsla-20260722-gen.pdf" },
];

export const TESLA_LATEST_OPERATING_METRIC = TESLA_OPERATING_METRICS.at(-1)!;
export const TESLA_OPERATING_METRICS_NOTE = "Tesla Q2 2026 update. FSD subscriptions include upfront and monthly subscriptions and exclude free trials; company definitions may change between periods.";
