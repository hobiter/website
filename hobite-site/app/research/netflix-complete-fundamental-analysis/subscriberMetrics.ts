export type NetflixRegion = "UCAN" | "EMEA" | "LATAM" | "APAC";

export type NetflixRegionalMetric = {
  fiscalYear: number;
  region: NetflixRegion;
  streamingRevenue: number;
  paidMembershipsEndOfPeriod: number | null;
  averagePayingMemberships: number | null;
  averageMonthlyRevenuePerPayingMembership: number | null;
  sourceFilingYear: number;
  source: string;
};

export const NETFLIX_SUBSCRIBER_METRICS_SOURCE_NOTE =
  "Regional streaming revenue, paid memberships, average paying memberships, and ARM are manually extracted from Netflix 10-K regional tables. FY2025 no longer discloses regional paid memberships or ARM in the same table, so those fields are null.";

export const NETFLIX_REGIONAL_METRICS: NetflixRegionalMetric[] = [
  { fiscalYear: 2019, region: "UCAN", streamingRevenue: 10051208000, paidMembershipsEndOfPeriod: 67662000, averagePayingMemberships: 66615000, averageMonthlyRevenuePerPayingMembership: 12.57, sourceFilingYear: 2021, source: "Netflix 2021 Form 10-K regional table" },
  { fiscalYear: 2019, region: "EMEA", streamingRevenue: 5543067000, paidMembershipsEndOfPeriod: 51778000, averagePayingMemberships: 44731000, averageMonthlyRevenuePerPayingMembership: 10.33, sourceFilingYear: 2021, source: "Netflix 2021 Form 10-K regional table" },
  { fiscalYear: 2019, region: "LATAM", streamingRevenue: 2795434000, paidMembershipsEndOfPeriod: 31417000, averagePayingMemberships: 28391000, averageMonthlyRevenuePerPayingMembership: 8.21, sourceFilingYear: 2021, source: "Netflix 2021 Form 10-K regional table" },
  { fiscalYear: 2019, region: "APAC", streamingRevenue: 1469521000, paidMembershipsEndOfPeriod: 16233000, averagePayingMemberships: 13247000, averageMonthlyRevenuePerPayingMembership: 9.24, sourceFilingYear: 2021, source: "Netflix 2021 Form 10-K regional table" },
  { fiscalYear: 2020, region: "UCAN", streamingRevenue: 11455396000, paidMembershipsEndOfPeriod: 73936000, averagePayingMemberships: 71689000, averageMonthlyRevenuePerPayingMembership: 13.32, sourceFilingYear: 2022, source: "Netflix 2022 Form 10-K regional table" },
  { fiscalYear: 2020, region: "EMEA", streamingRevenue: 7772252000, paidMembershipsEndOfPeriod: 66698000, averagePayingMemberships: 60425000, averageMonthlyRevenuePerPayingMembership: 10.72, sourceFilingYear: 2022, source: "Netflix 2022 Form 10-K regional table" },
  { fiscalYear: 2020, region: "LATAM", streamingRevenue: 3156727000, paidMembershipsEndOfPeriod: 37537000, averagePayingMemberships: 35297000, averageMonthlyRevenuePerPayingMembership: 7.45, sourceFilingYear: 2022, source: "Netflix 2022 Form 10-K regional table" },
  { fiscalYear: 2020, region: "APAC", streamingRevenue: 2372300000, paidMembershipsEndOfPeriod: 25492000, averagePayingMemberships: 21674000, averageMonthlyRevenuePerPayingMembership: 9.12, sourceFilingYear: 2022, source: "Netflix 2022 Form 10-K regional table" },
  { fiscalYear: 2021, region: "UCAN", streamingRevenue: 12972100000, paidMembershipsEndOfPeriod: 75215000, averagePayingMemberships: 74234000, averageMonthlyRevenuePerPayingMembership: 14.56, sourceFilingYear: 2023, source: "Netflix 2023 Form 10-K regional table" },
  { fiscalYear: 2021, region: "EMEA", streamingRevenue: 9699819000, paidMembershipsEndOfPeriod: 74036000, averagePayingMemberships: 69518000, averageMonthlyRevenuePerPayingMembership: 11.63, sourceFilingYear: 2023, source: "Netflix 2023 Form 10-K regional table" },
  { fiscalYear: 2021, region: "LATAM", streamingRevenue: 3576976000, paidMembershipsEndOfPeriod: 39961000, averagePayingMemberships: 38573000, averageMonthlyRevenuePerPayingMembership: 7.73, sourceFilingYear: 2023, source: "Netflix 2023 Form 10-K regional table" },
  { fiscalYear: 2021, region: "APAC", streamingRevenue: 3266601000, paidMembershipsEndOfPeriod: 32632000, averagePayingMemberships: 28461000, averageMonthlyRevenuePerPayingMembership: 9.56, sourceFilingYear: 2023, source: "Netflix 2023 Form 10-K regional table" },
  { fiscalYear: 2022, region: "UCAN", streamingRevenue: 14084643000, paidMembershipsEndOfPeriod: 74296000, averagePayingMemberships: 74001000, averageMonthlyRevenuePerPayingMembership: 15.86, sourceFilingYear: 2024, source: "Netflix 2024 Form 10-K regional table" },
  { fiscalYear: 2022, region: "EMEA", streamingRevenue: 9745015000, paidMembershipsEndOfPeriod: 76729000, averagePayingMemberships: 73904000, averageMonthlyRevenuePerPayingMembership: 10.99, sourceFilingYear: 2024, source: "Netflix 2024 Form 10-K regional table" },
  { fiscalYear: 2022, region: "LATAM", streamingRevenue: 4069973000, paidMembershipsEndOfPeriod: 41699000, averagePayingMemberships: 40000000, averageMonthlyRevenuePerPayingMembership: 8.48, sourceFilingYear: 2024, source: "Netflix 2024 Form 10-K regional table" },
  { fiscalYear: 2022, region: "APAC", streamingRevenue: 3570221000, paidMembershipsEndOfPeriod: 38023000, averagePayingMemberships: 35019000, averageMonthlyRevenuePerPayingMembership: 8.5, sourceFilingYear: 2024, source: "Netflix 2024 Form 10-K regional table" },
  { fiscalYear: 2023, region: "UCAN", streamingRevenue: 14873783000, paidMembershipsEndOfPeriod: 80128000, averagePayingMemberships: 76126000, averageMonthlyRevenuePerPayingMembership: 16.28, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and prior-year regional membership table" },
  { fiscalYear: 2023, region: "EMEA", streamingRevenue: 10556487000, paidMembershipsEndOfPeriod: 88813000, averagePayingMemberships: 80928000, averageMonthlyRevenuePerPayingMembership: 10.87, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and prior-year regional membership table" },
  { fiscalYear: 2023, region: "LATAM", streamingRevenue: 4446461000, paidMembershipsEndOfPeriod: 45997000, averagePayingMemberships: 42802000, averageMonthlyRevenuePerPayingMembership: 8.66, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and prior-year regional membership table" },
  { fiscalYear: 2023, region: "APAC", streamingRevenue: 3763727000, paidMembershipsEndOfPeriod: 45338000, averagePayingMemberships: 41033000, averageMonthlyRevenuePerPayingMembership: 7.64, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and prior-year regional membership table" },
  { fiscalYear: 2024, region: "UCAN", streamingRevenue: 17359369000, paidMembershipsEndOfPeriod: 89625000, averagePayingMemberships: 84112000, averageMonthlyRevenuePerPayingMembership: 17.2, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and 2024 Form 10-K regional membership table" },
  { fiscalYear: 2024, region: "EMEA", streamingRevenue: 12387035000, paidMembershipsEndOfPeriod: 101133000, averagePayingMemberships: 94200000, averageMonthlyRevenuePerPayingMembership: 10.96, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and 2024 Form 10-K regional membership table" },
  { fiscalYear: 2024, region: "LATAM", streamingRevenue: 4839816000, paidMembershipsEndOfPeriod: 53327000, averagePayingMemberships: 48954000, averageMonthlyRevenuePerPayingMembership: 8.24, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and 2024 Form 10-K regional membership table" },
  { fiscalYear: 2024, region: "APAC", streamingRevenue: 4414746000, paidMembershipsEndOfPeriod: 57541000, averagePayingMemberships: 50466000, averageMonthlyRevenuePerPayingMembership: 7.29, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table and 2024 Form 10-K regional membership table" },
  { fiscalYear: 2025, region: "UCAN", streamingRevenue: 19957152000, paidMembershipsEndOfPeriod: null, averagePayingMemberships: null, averageMonthlyRevenuePerPayingMembership: null, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table" },
  { fiscalYear: 2025, region: "EMEA", streamingRevenue: 14514646000, paidMembershipsEndOfPeriod: null, averagePayingMemberships: null, averageMonthlyRevenuePerPayingMembership: null, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table" },
  { fiscalYear: 2025, region: "LATAM", streamingRevenue: 5357521000, paidMembershipsEndOfPeriod: null, averagePayingMemberships: null, averageMonthlyRevenuePerPayingMembership: null, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table" },
  { fiscalYear: 2025, region: "APAC", streamingRevenue: 5353717000, paidMembershipsEndOfPeriod: null, averagePayingMemberships: null, averageMonthlyRevenuePerPayingMembership: null, sourceFilingYear: 2025, source: "Netflix 2025 Form 10-K regional revenue table" },
];

export const NETFLIX_GLOBAL_MEMBERSHIP_TOTALS = Array.from(
  new Set(NETFLIX_REGIONAL_METRICS.map((row) => row.fiscalYear)),
)
  .map((fiscalYear) => {
    const rows = NETFLIX_REGIONAL_METRICS.filter((row) => row.fiscalYear === fiscalYear);
    const paidMemberships = rows.every((row) => row.paidMembershipsEndOfPeriod != null)
      ? rows.reduce((sum, row) => sum + (row.paidMembershipsEndOfPeriod ?? 0), 0)
      : null;

    return {
      fiscalYear,
      streamingRevenue: rows.reduce((sum, row) => sum + row.streamingRevenue, 0),
      paidMembershipsEndOfPeriod: paidMemberships,
    };
  })
  .sort((a, b) => a.fiscalYear - b.fiscalYear);
