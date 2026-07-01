export type ForecastRow = {
  year: number;
  revenue: number;
  revenueGrowth: number;
  freeCashFlow: number;
  freeCashFlowMargin: number;
};

export type DcfCase = {
  label: string;
  discountRate: number;
  terminalGrowth: number;
  pvFcf: number;
  pvTerminal: number;
  enterpriseValue: number;
  equityValue: number;
  valuePerShare: number;
};

export const NETFLIX_FORECAST_SOURCE_NOTE =
  "Scenario model built from FY2025 SEC financials. Forecasts are Hobite assumptions, not company guidance.";

export const NETFLIX_FORECASTS: Record<"bear" | "base" | "bull", ForecastRow[]> = {
  bear: [
    { year: 2026, revenue: 48797678880, revenueGrowth: 8, freeCashFlow: 8783582198, freeCashFlowMargin: 18 },
    { year: 2027, revenue: 52213516402, revenueGrowth: 7, freeCashFlow: 9398432952, freeCashFlowMargin: 18 },
    { year: 2028, revenue: 55346327386, revenueGrowth: 6, freeCashFlow: 10239070566, freeCashFlowMargin: 18.5 },
    { year: 2029, revenue: 58667107029, revenueGrowth: 6, freeCashFlow: 11146750335, freeCashFlowMargin: 19 },
    { year: 2030, revenue: 61600462380, revenueGrowth: 5, freeCashFlow: 11704087852, freeCashFlowMargin: 19 },
    { year: 2031, revenue: 64680485499, revenueGrowth: 5, freeCashFlow: 12612694672, freeCashFlowMargin: 19.5 },
    { year: 2032, revenue: 67267704919, revenueGrowth: 4, freeCashFlow: 13117202459, freeCashFlowMargin: 19.5 },
    { year: 2033, revenue: 69958413116, revenueGrowth: 4, freeCashFlow: 13991682623, freeCashFlowMargin: 20 },
    { year: 2034, revenue: 72756749641, revenueGrowth: 4, freeCashFlow: 14551349928, freeCashFlowMargin: 20 },
    { year: 2035, revenue: 75667019626, revenueGrowth: 4, freeCashFlow: 15133403925, freeCashFlowMargin: 20 },
  ],
  base: [
    { year: 2026, revenue: 51056830680, revenueGrowth: 13, freeCashFlow: 10977218596, freeCashFlowMargin: 21.5 },
    { year: 2027, revenue: 57183650362, revenueGrowth: 12, freeCashFlow: 12580403080, freeCashFlowMargin: 22 },
    { year: 2028, revenue: 62902015398, revenueGrowth: 10, freeCashFlow: 14152953464, freeCashFlowMargin: 22.5 },
    { year: 2029, revenue: 68563196784, revenueGrowth: 9, freeCashFlow: 15769535260, freeCashFlowMargin: 23 },
    { year: 2030, revenue: 74048252526, revenueGrowth: 8, freeCashFlow: 17401339344, freeCashFlowMargin: 23.5 },
    { year: 2031, revenue: 79972112728, revenueGrowth: 8, freeCashFlow: 18793446491, freeCashFlowMargin: 23.5 },
    { year: 2032, revenue: 85570160619, revenueGrowth: 7, freeCashFlow: 20536838549, freeCashFlowMargin: 24 },
    { year: 2033, revenue: 91560071863, revenueGrowth: 7, freeCashFlow: 21974417247, freeCashFlowMargin: 24 },
    { year: 2034, revenue: 97053676174, revenueGrowth: 6, freeCashFlow: 23778150663, freeCashFlowMargin: 24.5 },
    { year: 2035, revenue: 102876896745, revenueGrowth: 6, freeCashFlow: 25204839703, freeCashFlowMargin: 24.5 },
  ],
  bull: [
    { year: 2026, revenue: 52864152120, revenueGrowth: 17, freeCashFlow: 12158754988, freeCashFlowMargin: 23 },
    { year: 2027, revenue: 60793774938, revenueGrowth: 15, freeCashFlow: 14286537110, freeCashFlowMargin: 23.5 },
    { year: 2028, revenue: 68696965680, revenueGrowth: 13, freeCashFlow: 16830756592, freeCashFlowMargin: 24.5 },
    { year: 2029, revenue: 76940601562, revenueGrowth: 12, freeCashFlow: 19235150390, freeCashFlowMargin: 25 },
    { year: 2030, revenue: 85404067733, revenueGrowth: 11, freeCashFlow: 21778037272, freeCashFlowMargin: 25.5 },
    { year: 2031, revenue: 93944474507, revenueGrowth: 10, freeCashFlow: 24425563372, freeCashFlowMargin: 26 },
    { year: 2032, revenue: 102399477212, revenueGrowth: 9, freeCashFlow: 27135861461, freeCashFlowMargin: 26.5 },
    { year: 2033, revenue: 111615430161, revenueGrowth: 9, freeCashFlow: 30136166144, freeCashFlowMargin: 27 },
    { year: 2034, revenue: 120544664574, revenueGrowth: 8, freeCashFlow: 32547059435, freeCashFlowMargin: 27 },
    { year: 2035, revenue: 130188237740, revenueGrowth: 8, freeCashFlow: 35801765379, freeCashFlowMargin: 27.5 },
  ],
};

export const NETFLIX_DCF_CASES: Record<"bear" | "base" | "bull", DcfCase> = {
  bear: {
    label: "Bear",
    discountRate: 9.5,
    terminalGrowth: 2.5,
    pvFcf: 72418402748,
    pvTerminal: 89417239383,
    enterpriseValue: 161835642131,
    equityValue: 157405352131,
    valuePerShare: 36.24,
  },
  base: {
    label: "Base",
    discountRate: 9,
    terminalGrowth: 3,
    pvFcf: 109132815024,
    pvTerminal: 182770009615,
    enterpriseValue: 291902824639,
    equityValue: 287472534639,
    valuePerShare: 66.18,
  },
  bull: {
    label: "Bull",
    discountRate: 8.5,
    terminalGrowth: 3.5,
    pvFcf: 142327454104,
    pvTerminal: 327776192256,
    enterpriseValue: 470103646360,
    equityValue: 465673356360,
    valuePerShare: 107.2,
  },
};

export const NETFLIX_DCF_ASSUMPTIONS = {
  netDebt: 4430290000,
  dilutedShares: 4343863000,
  note: "Per-share values use the FY2025 split-adjusted diluted share count from SEC XBRL.",
};
