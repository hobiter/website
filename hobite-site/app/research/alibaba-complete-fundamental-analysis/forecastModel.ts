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
  valuePerAdsRmb: number;
  valuePerAdsUsd: number;
};

export const ALIBABA_FORECAST_SOURCE_NOTE =
  "Scenario model built from FY2026 Form 20-F revenue and cash flow base. Forecasts are Hobite assumptions, not Alibaba guidance. FY2026 free cash flow was depressed by elevated AI/cloud infrastructure investment, so scenarios focus on whether capex intensity normalizes.";

export const ALIBABA_FORECASTS: Record<"bear" | "base" | "bull", ForecastRow[]> = {
  "bear": [
    {
      "year": 2027,
      "revenue": 1033906700000,
      "revenueGrowth": 1,
      "freeCashFlow": -20678134000,
      "freeCashFlowMargin": -2
    },
    {
      "year": 2028,
      "revenue": 1054584834000,
      "revenueGrowth": 2,
      "freeCashFlow": 10545848340,
      "freeCashFlowMargin": 1
    },
    {
      "year": 2029,
      "revenue": 1086222379020,
      "revenueGrowth": 3,
      "freeCashFlow": 43448895161,
      "freeCashFlowMargin": 4
    },
    {
      "year": 2030,
      "revenue": 1118809050391,
      "revenueGrowth": 3,
      "freeCashFlow": 67128543023,
      "freeCashFlowMargin": 6
    },
    {
      "year": 2031,
      "revenue": 1152373321903,
      "revenueGrowth": 3,
      "freeCashFlow": 80666132533,
      "freeCashFlowMargin": 7
    },
    {
      "year": 2032,
      "revenue": 1186944521560,
      "revenueGrowth": 3,
      "freeCashFlow": 94955561725,
      "freeCashFlowMargin": 8
    },
    {
      "year": 2033,
      "revenue": 1210683411991,
      "revenueGrowth": 2,
      "freeCashFlow": 96854672959,
      "freeCashFlowMargin": 8
    },
    {
      "year": 2034,
      "revenue": 1234897080231,
      "revenueGrowth": 2,
      "freeCashFlow": 104966251820,
      "freeCashFlowMargin": 8.5
    },
    {
      "year": 2035,
      "revenue": 1259595021836,
      "revenueGrowth": 2,
      "freeCashFlow": 113363551965,
      "freeCashFlowMargin": 9
    },
    {
      "year": 2036,
      "revenue": 1284786922273,
      "revenueGrowth": 2,
      "freeCashFlow": 115630823005,
      "freeCashFlowMargin": 9
    }
  ],
  "base": [
    {
      "year": 2027,
      "revenue": 1074853500000,
      "revenueGrowth": 5,
      "freeCashFlow": 21497070000,
      "freeCashFlowMargin": 2
    },
    {
      "year": 2028,
      "revenue": 1139344710000,
      "revenueGrowth": 6,
      "freeCashFlow": 56967235500,
      "freeCashFlowMargin": 5
    },
    {
      "year": 2029,
      "revenue": 1207705392600,
      "revenueGrowth": 6,
      "freeCashFlow": 96616431408,
      "freeCashFlowMargin": 8
    },
    {
      "year": 2030,
      "revenue": 1268090662230,
      "revenueGrowth": 5,
      "freeCashFlow": 126809066223,
      "freeCashFlowMargin": 10
    },
    {
      "year": 2031,
      "revenue": 1331495195342,
      "revenueGrowth": 5,
      "freeCashFlow": 146464471488,
      "freeCashFlowMargin": 11
    },
    {
      "year": 2032,
      "revenue": 1384755003156,
      "revenueGrowth": 4,
      "freeCashFlow": 166170600379,
      "freeCashFlowMargin": 12
    },
    {
      "year": 2033,
      "revenue": 1440145203282,
      "revenueGrowth": 4,
      "freeCashFlow": 180018150410,
      "freeCashFlowMargin": 12.5
    },
    {
      "year": 2034,
      "revenue": 1497751011413,
      "revenueGrowth": 4,
      "freeCashFlow": 194707631484,
      "freeCashFlowMargin": 13
    },
    {
      "year": 2035,
      "revenue": 1542683541755,
      "revenueGrowth": 3,
      "freeCashFlow": 200548860428,
      "freeCashFlowMargin": 13
    },
    {
      "year": 2036,
      "revenue": 1588964048008,
      "revenueGrowth": 3,
      "freeCashFlow": 214510146481,
      "freeCashFlowMargin": 13.5
    }
  ],
  "bull": [
    {
      "year": 2027,
      "revenue": 1105563600000,
      "revenueGrowth": 8,
      "freeCashFlow": 44222544000,
      "freeCashFlowMargin": 4
    },
    {
      "year": 2028,
      "revenue": 1205064324000,
      "revenueGrowth": 9,
      "freeCashFlow": 96405145920,
      "freeCashFlowMargin": 8
    },
    {
      "year": 2029,
      "revenue": 1313520113160,
      "revenueGrowth": 9,
      "freeCashFlow": 144487212448,
      "freeCashFlowMargin": 11
    },
    {
      "year": 2030,
      "revenue": 1418601722213,
      "revenueGrowth": 8,
      "freeCashFlow": 184418223888,
      "freeCashFlowMargin": 13
    },
    {
      "year": 2031,
      "revenue": 1517903842768,
      "revenueGrowth": 7,
      "freeCashFlow": 212506537988,
      "freeCashFlowMargin": 14
    },
    {
      "year": 2032,
      "revenue": 1608978073334,
      "revenueGrowth": 6,
      "freeCashFlow": 241346711000,
      "freeCashFlowMargin": 15
    },
    {
      "year": 2033,
      "revenue": 1689426977001,
      "revenueGrowth": 5,
      "freeCashFlow": 261861181435,
      "freeCashFlowMargin": 15.5
    },
    {
      "year": 2034,
      "revenue": 1773898325851,
      "revenueGrowth": 5,
      "freeCashFlow": 283823732136,
      "freeCashFlowMargin": 16
    },
    {
      "year": 2035,
      "revenue": 1844854258885,
      "revenueGrowth": 4,
      "freeCashFlow": 295176681422,
      "freeCashFlowMargin": 16
    },
    {
      "year": 2036,
      "revenue": 1918648429240,
      "revenueGrowth": 4,
      "freeCashFlow": 316576990825,
      "freeCashFlowMargin": 16.5
    }
  ]
};

export const ALIBABA_DCF_ASSUMPTIONS = {
  currency: "RMB",
  netCash: 75669000000,
  adsEquivalentDilutedShares: 2404375000,
  referenceCnyUsdRate: 7.1108,
  note: "DCF adds net cash to enterprise value and divides by ADS-equivalent diluted shares using 1 ADS = 8 ordinary shares."
};

export const ALIBABA_DCF_CASES: Record<"bear" | "base" | "bull", DcfCase> = {
  "bear": {
    "label": "Bear",
    "discountRate": 12,
    "terminalGrowth": 1,
    "pvFcf": 321727814333,
    "pvTerminal": 341839369417,
    "enterpriseValue": 663567183750,
    "equityValue": 739236183750,
    "valuePerAdsRmb": 307,
    "valuePerAdsUsd": 43.24
  },
  "base": {
    "label": "Base",
    "discountRate": 11,
    "terminalGrowth": 2,
    "pvFcf": 720684619666,
    "pvTerminal": 856200966809,
    "enterpriseValue": 1576885586476,
    "equityValue": 1652554586476,
    "valuePerAdsRmb": 687,
    "valuePerAdsUsd": 96.66
  },
  "bull": {
    "label": "Bull",
    "discountRate": 10,
    "terminalGrowth": 3,
    "pvFcf": 1136595182628,
    "pvTerminal": 1795939406177,
    "enterpriseValue": 2932534588805,
    "equityValue": 3008203588805,
    "valuePerAdsRmb": 1251,
    "valuePerAdsUsd": 175.95
  }
};
