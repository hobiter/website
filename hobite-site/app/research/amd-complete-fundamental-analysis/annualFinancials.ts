export type FinancialRow = {
  year: number;
  quarter: number | null;
  period: string;
  end: string;
  filed: string;
  form: string;
  source: string;
  accessionNumber: string;
  status: string;
  provenance: Record<
    string,
    {
      tag?: string;
      unit?: string;
      start?: string | null;
      end?: string;
      filed?: string;
      source?: string;
      method?: string;
      priorSources?: string[];
    } | null
  >;
  revenue: number | null;
  costOfSales: number | null;
  operatingIncome: number | null;
  netIncome: number | null;
  dilutedEps: number | null;
  dilutedShares: number | null;
  operatingCashFlow: number | null;
  capex: number | null;
  depreciation: number | null;
  otherDa: number | null;
  acquiredAmortization: number | null;
  research: number | null;
  stockComp: number | null;
  cash: number | null;
  securities: number | null;
  assets: number | null;
  liabilities: number | null;
  equity: number | null;
  totalEquity: number | null;
  debtCurrent: number | null;
  debtNoncurrent: number | null;
  reportedDebt: number | null;
  goodwill: number | null;
  intangibles: number | null;
  commitments: number | null;
  inventory: number | null;
  receivables: number | null;
  ppe: number | null;
  spotShares: number | null;
  grossProfit: number | null;
  freeCashFlow: number | null;
  debt: number | null;
  balanceOutsideEquity: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  fcfMargin: number | null;
  roe: number | null;
  longTermSecurities?: number;
  capexSaleProceeds?: number;
  governmentIncentives?: number;
  customerDeposits?: number;
  noncurrentContractLiabilities?: number;
};
export const AMD_ANNUAL: FinancialRow[] = [
  {
    accessionNumber: "0001193125-12-075837",
    form: "10-K",
    filed: "2012-02-24",
    end: "2011-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
    year: 2011,
    quarter: null,
    period: "FY2011",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      depreciation: {
        tag: "DepreciationAndAmortization",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2010-12-26",
        end: "2011-12-31",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
        end: "2011-12-31",
        filed: "2012-02-24",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebt",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312512075837/d257108d10k.htm",
      },
    },
    revenue: 6568000000,
    costOfSales: 3628000000,
    operatingIncome: 368000000,
    netIncome: 491000000,
    dilutedEps: 0.66,
    dilutedShares: 742000000,
    operatingCashFlow: 382000000,
    capex: 250000000,
    depreciation: 317000000,
    otherDa: 217000000,
    acquiredAmortization: 29000000,
    research: 1453000000,
    stockComp: 90000000,
    cash: 869000000,
    securities: 896000000,
    assets: 4954000000,
    liabilities: 3364000000,
    equity: 1590000000,
    totalEquity: 1590000000,
    debtCurrent: null,
    debtNoncurrent: 2065000000,
    reportedDebt: null,
    goodwill: 323000000,
    intangibles: null,
    commitments: null,
    inventory: 476000000,
    receivables: 919000000,
    ppe: 726000000,
    spotShares: 698000000,
    grossProfit: 2940000000,
    freeCashFlow: 132000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 44.76248477466504,
    operatingMargin: 5.602923264311815,
    netMargin: 7.47563946406821,
    fcfMargin: 2.0097442143727164,
    roe: 30.880503144654085,
  },
  {
    accessionNumber: "0001193125-13-069422",
    form: "10-K",
    filed: "2013-02-21",
    end: "2012-12-29",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
    year: 2012,
    quarter: null,
    period: "FY2012",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      depreciation: {
        tag: "DepreciationAndAmortization",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-29",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
        end: "2012-12-29",
        filed: "2013-02-21",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: null,
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      commitments: {
        tag: "UnrecordedUnconditionalPurchaseObligationBalanceSheetAmount",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2012-12-29",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312513069422/d486815d10k.htm",
      },
      spotShares: null,
    },
    revenue: 5422000000,
    costOfSales: 4187000000,
    operatingIncome: -1056000000,
    netIncome: -1183000000,
    dilutedEps: -1.6,
    dilutedShares: 741000000,
    operatingCashFlow: -338000000,
    capex: 133000000,
    depreciation: 260000000,
    otherDa: 179000000,
    acquiredAmortization: 14000000,
    research: 1354000000,
    stockComp: 97000000,
    cash: 549000000,
    securities: 453000000,
    assets: 4000000000,
    liabilities: 3462000000,
    equity: 538000000,
    totalEquity: 538000000,
    debtCurrent: null,
    debtNoncurrent: null,
    reportedDebt: null,
    goodwill: 553000000,
    intangibles: 96000000,
    commitments: 299000000,
    inventory: 562000000,
    receivables: 630000000,
    ppe: 658000000,
    spotShares: null,
    grossProfit: 1235000000,
    freeCashFlow: -471000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 22.777572851346367,
    operatingMargin: -19.476208041313168,
    netMargin: -21.81851715234231,
    fcfMargin: -8.686831427517522,
    roe: -219.88847583643124,
  },
  {
    accessionNumber: "0001193125-14-057240",
    form: "10-K",
    filed: "2014-02-18",
    end: "2013-12-28",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
    year: 2013,
    quarter: null,
    period: "FY2013",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2012-12-30",
        end: "2013-12-28",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
        end: "2013-12-28",
        filed: "2014-02-18",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: null,
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2013-12-28",
        filed: "2014-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312514057240/d674550d10k.htm",
      },
      spotShares: null,
    },
    revenue: 5299000000,
    costOfSales: 3321000000,
    operatingIncome: 103000000,
    netIncome: -83000000,
    dilutedEps: -0.11,
    dilutedShares: 754000000,
    operatingCashFlow: -148000000,
    capex: 84000000,
    depreciation: 236000000,
    otherDa: 139000000,
    acquiredAmortization: 18000000,
    research: 1201000000,
    stockComp: 91000000,
    cash: 869000000,
    securities: 228000000,
    assets: 4337000000,
    liabilities: 3793000000,
    equity: 544000000,
    totalEquity: 544000000,
    debtCurrent: null,
    debtNoncurrent: null,
    reportedDebt: null,
    goodwill: 553000000,
    intangibles: 78000000,
    commitments: null,
    inventory: 884000000,
    receivables: 832000000,
    ppe: 346000000,
    spotShares: null,
    grossProfit: 1978000000,
    freeCashFlow: -232000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 37.327797697678804,
    operatingMargin: 1.9437629741460651,
    netMargin: -1.5663332704283828,
    fcfMargin: -4.378184563125117,
    roe: -15.257352941176471,
  },
  {
    accessionNumber: "0001193125-15-054362",
    form: "10-K",
    filed: "2015-02-19",
    end: "2014-12-27",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
    year: 2014,
    quarter: null,
    period: "FY2014",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2013-12-29",
        end: "2014-12-27",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
        end: "2014-12-27",
        filed: "2015-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2014-12-27",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000119312515054362/d871455d10k.htm",
      },
      spotShares: null,
    },
    revenue: 5506000000,
    costOfSales: 3667000000,
    operatingIncome: -155000000,
    netIncome: -403000000,
    dilutedEps: -0.53,
    dilutedShares: 768000000,
    operatingCashFlow: -98000000,
    capex: 95000000,
    depreciation: 203000000,
    otherDa: 115000000,
    acquiredAmortization: 14000000,
    research: 1072000000,
    stockComp: 81000000,
    cash: 805000000,
    securities: 235000000,
    assets: 3767000000,
    liabilities: 3580000000,
    equity: 187000000,
    totalEquity: 187000000,
    debtCurrent: null,
    debtNoncurrent: 2025000000,
    reportedDebt: null,
    goodwill: 320000000,
    intangibles: 65000000,
    commitments: null,
    inventory: 685000000,
    receivables: 818000000,
    ppe: 302000000,
    spotShares: null,
    grossProfit: 1839000000,
    freeCashFlow: -193000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 33.399927351979656,
    operatingMargin: -2.8151107882310207,
    netMargin: -7.319288049400654,
    fcfMargin: -3.505266981474755,
    roe: -215.50802139037435,
  },
  {
    accessionNumber: "0000002488-16-000111",
    form: "10-K",
    filed: "2016-02-18",
    end: "2015-12-26",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
    year: 2015,
    quarter: null,
    period: "FY2015",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2014-12-28",
        end: "2015-12-26",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
        end: "2015-12-26",
        filed: "2016-02-18",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2015-12-26",
        filed: "2016-02-18",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248816000111/amd-12262015x10k.htm",
      },
    },
    revenue: 3991000000,
    costOfSales: 2911000000,
    operatingIncome: -481000000,
    netIncome: -660000000,
    dilutedEps: -0.84,
    dilutedShares: 783000000,
    operatingCashFlow: -226000000,
    capex: 96000000,
    depreciation: 167000000,
    otherDa: 94000000,
    acquiredAmortization: 3000000,
    research: 947000000,
    stockComp: 63000000,
    cash: 785000000,
    securities: 0,
    assets: 3109000000,
    liabilities: 3521000000,
    equity: -412000000,
    totalEquity: -412000000,
    debtCurrent: null,
    debtNoncurrent: 2025000000,
    reportedDebt: null,
    goodwill: 278000000,
    intangibles: 0,
    commitments: null,
    inventory: 678000000,
    receivables: 533000000,
    ppe: 188000000,
    spotShares: 792000000,
    grossProfit: 1080000000,
    freeCashFlow: -322000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 27.060886995740418,
    operatingMargin: -12.052117263843648,
    netMargin: -16.53720871961914,
    fcfMargin: -8.068153345026309,
    roe: null,
  },
  {
    accessionNumber: "0000002488-17-000043",
    form: "10-K",
    filed: "2017-02-21",
    end: "2016-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
    year: 2016,
    quarter: null,
    period: "FY2016",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2015-12-27",
        end: "2016-12-31",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
        end: "2016-12-31",
        filed: "2017-02-21",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248817000043/amd-12312016x10k.htm",
      },
    },
    revenue: 4319000000,
    costOfSales: 3316000000,
    operatingIncome: -373000000,
    netIncome: -498000000,
    dilutedEps: -0.6,
    dilutedShares: 835000000,
    operatingCashFlow: 81000000,
    capex: 77000000,
    depreciation: 133000000,
    otherDa: 71000000,
    acquiredAmortization: 0,
    research: 1008000000,
    stockComp: 86000000,
    cash: 1264000000,
    securities: null,
    assets: 3321000000,
    liabilities: 2905000000,
    equity: 416000000,
    totalEquity: 416000000,
    debtCurrent: null,
    debtNoncurrent: 1435000000,
    reportedDebt: null,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 751000000,
    receivables: 311000000,
    ppe: 164000000,
    spotShares: 935000000,
    grossProfit: 1003000000,
    freeCashFlow: 4000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 23.222968279694374,
    operatingMargin: -8.636258393146562,
    netMargin: -11.5304468626997,
    fcfMargin: 0.09261403102570039,
    roe: -119.71153846153845,
  },
  {
    accessionNumber: "0000002488-18-000042",
    form: "10-K",
    filed: "2018-02-27",
    end: "2017-12-30",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
    year: 2017,
    quarter: null,
    period: "FY2017",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-30",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
        end: "2017-12-30",
        filed: "2018-02-27",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2017-12-30",
        filed: "2018-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248818000042/amd-12302017x10k.htm",
      },
    },
    revenue: 5253000000,
    costOfSales: 3466000000,
    operatingIncome: 127000000,
    netIncome: -33000000,
    dilutedEps: -0.03,
    dilutedShares: 952000000,
    operatingCashFlow: 12000000,
    capex: 113000000,
    depreciation: 144000000,
    otherDa: 77000000,
    acquiredAmortization: 0,
    research: 1196000000,
    stockComp: 97000000,
    cash: 1185000000,
    securities: null,
    assets: 3540000000,
    liabilities: 2929000000,
    equity: 611000000,
    totalEquity: 611000000,
    debtCurrent: null,
    debtNoncurrent: 1325000000,
    reportedDebt: null,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 739000000,
    receivables: 400000000,
    ppe: 261000000,
    spotShares: 967000000,
    grossProfit: 1787000000,
    freeCashFlow: -101000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 34.01865600609176,
    operatingMargin: 2.417666095564439,
    netMargin: -0.6282124500285551,
    fcfMargin: -1.922710831905578,
    roe: -5.400981996726677,
  },
  {
    accessionNumber: "0000002488-19-000011",
    form: "10-K",
    filed: "2019-02-08",
    end: "2018-12-29",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
    year: 2018,
    quarter: null,
    period: "FY2018",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      acquiredAmortization: null,
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2017-12-31",
        end: "2018-12-29",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
        end: "2018-12-29",
        filed: "2019-02-08",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2018-12-29",
        filed: "2019-02-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248819000011/amd-12292018x10k.htm",
      },
    },
    revenue: 6475000000,
    costOfSales: 4028000000,
    operatingIncome: 451000000,
    netIncome: 337000000,
    dilutedEps: 0.32,
    dilutedShares: 1064000000,
    operatingCashFlow: 34000000,
    capex: 163000000,
    depreciation: 170000000,
    otherDa: 170000000,
    acquiredAmortization: null,
    research: 1434000000,
    stockComp: 137000000,
    cash: 1078000000,
    securities: 78000000,
    assets: 4556000000,
    liabilities: 3290000000,
    equity: 1266000000,
    totalEquity: 1266000000,
    debtCurrent: 136000000,
    debtNoncurrent: 1114000000,
    reportedDebt: null,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 845000000,
    receivables: 1235000000,
    ppe: 348000000,
    spotShares: 1005000000,
    grossProfit: 2447000000,
    freeCashFlow: -129000000,
    debt: 1250000000,
    balanceOutsideEquity: 0,
    grossMargin: 37.79150579150579,
    operatingMargin: 6.9652509652509655,
    netMargin: 5.204633204633204,
    fcfMargin: -1.9922779922779923,
    roe: 26.619273301737756,
  },
  {
    accessionNumber: "0000002488-20-000008",
    form: "10-K",
    filed: "2020-02-04",
    end: "2019-12-28",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
    year: 2019,
    quarter: null,
    period: "FY2019",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      acquiredAmortization: null,
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2018-12-30",
        end: "2019-12-28",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      securities: {
        tag: "MarketableSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
        end: "2019-12-28",
        filed: "2020-02-04",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2019-12-28",
        filed: "2020-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248820000008/amdform10-kfy2019.htm",
      },
    },
    revenue: 6731000000,
    costOfSales: 3863000000,
    operatingIncome: 631000000,
    netIncome: 341000000,
    dilutedEps: 0.3,
    dilutedShares: 1120000000,
    operatingCashFlow: 493000000,
    capex: 217000000,
    depreciation: 222000000,
    otherDa: 222000000,
    acquiredAmortization: null,
    research: 1547000000,
    stockComp: 197000000,
    cash: 1466000000,
    securities: 37000000,
    assets: 6028000000,
    liabilities: 3201000000,
    equity: 2827000000,
    totalEquity: 2827000000,
    debtCurrent: 0,
    debtNoncurrent: 486000000,
    reportedDebt: null,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 982000000,
    receivables: 1859000000,
    ppe: 500000000,
    spotShares: 1170000000,
    grossProfit: 2868000000,
    freeCashFlow: 276000000,
    debt: 486000000,
    balanceOutsideEquity: 0,
    grossMargin: 42.608824840291184,
    operatingMargin: 9.374535730203535,
    netMargin: 5.066112019016491,
    fcfMargin: 4.100430842371119,
    roe: 12.062256809338521,
  },
  {
    accessionNumber: "0001628280-21-001185",
    form: "10-K",
    filed: "2021-01-29",
    end: "2020-12-26",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
    year: 2020,
    quarter: null,
    period: "FY2020",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      depreciation: null,
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      acquiredAmortization: null,
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2019-12-29",
        end: "2020-12-26",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
        end: "2020-12-26",
        filed: "2021-01-29",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2020-12-26",
        filed: "2021-01-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000162828021001185/amd-20201226.htm",
      },
    },
    revenue: 9763000000,
    costOfSales: 5416000000,
    operatingIncome: 1369000000,
    netIncome: 2490000000,
    dilutedEps: 2.06,
    dilutedShares: 1207000000,
    operatingCashFlow: 1071000000,
    capex: 294000000,
    depreciation: null,
    otherDa: 312000000,
    acquiredAmortization: null,
    research: 1983000000,
    stockComp: 274000000,
    cash: 1595000000,
    securities: 695000000,
    assets: 8962000000,
    liabilities: 3125000000,
    equity: 5837000000,
    totalEquity: 5837000000,
    debtCurrent: null,
    debtNoncurrent: 330000000,
    reportedDebt: null,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 1399000000,
    receivables: 2066000000,
    ppe: 641000000,
    spotShares: 1211000000,
    grossProfit: 4347000000,
    freeCashFlow: 777000000,
    debt: null,
    balanceOutsideEquity: 0,
    grossMargin: 44.525248386766364,
    operatingMargin: 14.022329202089523,
    netMargin: 25.504455597664656,
    fcfMargin: 7.9586192768616195,
    roe: 42.65890011992462,
  },
  {
    accessionNumber: "0000002488-22-000016",
    form: "10-K",
    filed: "2022-02-03",
    end: "2021-12-25",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
    year: 2021,
    quarter: null,
    period: "FY2021",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      depreciation: null,
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      acquiredAmortization: null,
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2020-12-27",
        end: "2021-12-25",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
        end: "2021-12-25",
        filed: "2022-02-03",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2021-12-25",
        filed: "2022-02-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248822000016/amd-20211225.htm",
      },
    },
    revenue: 16434000000,
    costOfSales: 8505000000,
    operatingIncome: 3648000000,
    netIncome: 3162000000,
    dilutedEps: 2.57,
    dilutedShares: 1229000000,
    operatingCashFlow: 3521000000,
    capex: 301000000,
    depreciation: null,
    otherDa: 407000000,
    acquiredAmortization: null,
    research: 2845000000,
    stockComp: 379000000,
    cash: 2535000000,
    securities: 1073000000,
    assets: 12419000000,
    liabilities: 4922000000,
    equity: 7497000000,
    totalEquity: 7497000000,
    debtCurrent: null,
    debtNoncurrent: 1000000,
    reportedDebt: 313000000,
    goodwill: 289000000,
    intangibles: null,
    commitments: null,
    inventory: 1955000000,
    receivables: 2706000000,
    ppe: 702000000,
    spotShares: 1207000000,
    grossProfit: 7929000000,
    freeCashFlow: 3220000000,
    debt: 313000000,
    balanceOutsideEquity: 0,
    grossMargin: 48.24753559693319,
    operatingMargin: 22.197882438846296,
    netMargin: 19.240598758671048,
    fcfMargin: 19.593525617622003,
    roe: 42.17687074829932,
  },
  {
    accessionNumber: "0000002488-23-000047",
    form: "10-K",
    filed: "2023-02-27",
    end: "2022-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
    year: 2022,
    quarter: null,
    period: "FY2022",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      depreciation: null,
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      acquiredAmortization: null,
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2021-12-26",
        end: "2022-12-31",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
        end: "2022-12-31",
        filed: "2023-02-27",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248823000047/amd-20221231.htm",
      },
    },
    revenue: 23601000000,
    costOfSales: 12998000000,
    operatingIncome: 1264000000,
    netIncome: 1320000000,
    dilutedEps: 0.84,
    dilutedShares: 1571000000,
    operatingCashFlow: 3565000000,
    capex: 450000000,
    depreciation: null,
    otherDa: 626000000,
    acquiredAmortization: null,
    research: 5005000000,
    stockComp: 1081000000,
    cash: 4835000000,
    securities: 1020000000,
    assets: 67580000000,
    liabilities: 12830000000,
    equity: 54750000000,
    totalEquity: 54750000000,
    debtCurrent: null,
    debtNoncurrent: 2467000000,
    reportedDebt: 2467000000,
    goodwill: 24177000000,
    intangibles: 24118000000,
    commitments: null,
    inventory: 3771000000,
    receivables: 4126000000,
    ppe: 1513000000,
    spotShares: 1612000000,
    grossProfit: 10603000000,
    freeCashFlow: 3115000000,
    debt: 2467000000,
    balanceOutsideEquity: 0,
    grossMargin: 44.92606245498072,
    operatingMargin: 5.355705266725986,
    netMargin: 5.592983348163213,
    fcfMargin: 13.198593279945763,
    roe: 2.410958904109589,
  },
  {
    accessionNumber: "0000002488-24-000012",
    form: "10-K",
    filed: "2024-01-31",
    end: "2023-12-30",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
    year: 2023,
    quarter: null,
    period: "FY2023",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      depreciation: {
        method: "Other D&A plus acquired-intangible amortization",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
        end: "2023-12-30",
        filed: "2024-01-31",
      },
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-30",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
        end: "2023-12-30",
        filed: "2024-01-31",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      debtCurrent: null,
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2023-12-30",
        filed: "2024-01-31",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248824000012/amd-20231230.htm",
      },
    },
    revenue: 22680000000,
    costOfSales: 12220000000,
    operatingIncome: 401000000,
    netIncome: 854000000,
    dilutedEps: 0.53,
    dilutedShares: 1625000000,
    operatingCashFlow: 1667000000,
    capex: 546000000,
    depreciation: 3442000000,
    otherDa: 642000000,
    acquiredAmortization: 2800000000,
    research: 5872000000,
    stockComp: 1384000000,
    cash: 3933000000,
    securities: 1840000000,
    assets: 67885000000,
    liabilities: 11993000000,
    equity: 55892000000,
    totalEquity: 55892000000,
    debtCurrent: null,
    debtNoncurrent: 1717000000,
    reportedDebt: 2468000000,
    goodwill: 24262000000,
    intangibles: 21363000000,
    commitments: null,
    inventory: 4351000000,
    receivables: 5376000000,
    ppe: 1589000000,
    spotShares: 1616000000,
    grossProfit: 10460000000,
    freeCashFlow: 1121000000,
    debt: 2468000000,
    balanceOutsideEquity: 0,
    grossMargin: 46.119929453262785,
    operatingMargin: 1.7680776014109347,
    netMargin: 3.7654320987654324,
    fcfMargin: 4.942680776014109,
    roe: 1.5279467544550203,
  },
  {
    accessionNumber: "0000002488-25-000012",
    form: "10-K",
    filed: "2025-02-05",
    end: "2024-12-28",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
    year: 2024,
    quarter: null,
    period: "FY2024",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      depreciation: {
        method: "Other D&A plus acquired-intangible amortization",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
        end: "2024-12-28",
        filed: "2025-02-05",
      },
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2023-12-31",
        end: "2024-12-28",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
        end: "2024-12-28",
        filed: "2025-02-05",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2024-12-28",
        filed: "2025-02-05",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248825000012/amd-20241228.htm",
      },
    },
    revenue: 25785000000,
    costOfSales: 13060000000,
    operatingIncome: 1900000000,
    netIncome: 1641000000,
    dilutedEps: 1,
    dilutedShares: 1637000000,
    operatingCashFlow: 3041000000,
    capex: 636000000,
    depreciation: 3071000000,
    otherDa: 671000000,
    acquiredAmortization: 2400000000,
    research: 6456000000,
    stockComp: 1407000000,
    cash: 3787000000,
    securities: 1345000000,
    assets: 69226000000,
    liabilities: 11658000000,
    equity: 57568000000,
    totalEquity: 57568000000,
    debtCurrent: 0,
    debtNoncurrent: 1721000000,
    reportedDebt: 1721000000,
    goodwill: 24839000000,
    intangibles: 18930000000,
    commitments: null,
    inventory: 5734000000,
    receivables: 6192000000,
    ppe: 1802000000,
    spotShares: 1622000000,
    grossProfit: 12725000000,
    freeCashFlow: 2405000000,
    debt: 1721000000,
    balanceOutsideEquity: 0,
    grossMargin: 49.350397517936784,
    operatingMargin: 7.368625169672289,
    netMargin: 6.364165212332752,
    fcfMargin: 9.327128175295716,
    roe: 2.8505419677598667,
  },
  {
    accessionNumber: "0000002488-26-000018",
    form: "10-K",
    filed: "2026-02-04",
    end: "2025-12-27",
    source:
      "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
    year: 2025,
    quarter: null,
    period: "FY2025",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      depreciation: {
        method: "Other D&A plus acquired-intangible amortization",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
        end: "2025-12-27",
        filed: "2026-02-04",
      },
      otherDa: {
        tag: "OtherDepreciationAndAmortization",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2024-12-29",
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
        end: "2025-12-27",
        filed: "2026-02-04",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2025-12-27",
        filed: "2026-02-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm",
      },
    },
    revenue: 34639000000,
    costOfSales: 17487000000,
    operatingIncome: 3694000000,
    netIncome: 4335000000,
    dilutedEps: 2.65,
    dilutedShares: 1636000000,
    operatingCashFlow: 7709000000,
    capex: 974000000,
    depreciation: 3050000000,
    otherDa: 750000000,
    acquiredAmortization: 2300000000,
    research: 8091000000,
    stockComp: 1638000000,
    cash: 5539000000,
    securities: 5013000000,
    assets: 76926000000,
    liabilities: 13927000000,
    equity: 62999000000,
    totalEquity: 62999000000,
    debtCurrent: 874000000,
    debtNoncurrent: 2348000000,
    reportedDebt: 3222000000,
    goodwill: 25126000000,
    intangibles: 16705000000,
    commitments: null,
    inventory: 7920000000,
    receivables: 6315000000,
    ppe: 2312000000,
    spotShares: 1630000000,
    grossProfit: 17152000000,
    freeCashFlow: 6735000000,
    debt: 3222000000,
    balanceOutsideEquity: 0,
    grossMargin: 49.51644100580271,
    operatingMargin: 10.664280146655504,
    netMargin: 12.514795461762754,
    fcfMargin: 19.443401945783652,
    roe: 6.881061604152447,
  },
];
