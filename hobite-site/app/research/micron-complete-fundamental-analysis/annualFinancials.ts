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
  stockComp: number | null;
  cash: number | null;
  securities: number | null;
  assets: number | null;
  liabilities: number | null;
  equity: number | null;
  totalEquity: number | null;
  debtCurrent: number | null;
  debtNoncurrent: number | null;
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
export const MU_ANNUAL: FinancialRow[] = [
  {
    accessionNumber: "0000723125-11-000189",
    form: "10-K",
    filed: "2011-10-25",
    end: "2011-09-01",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
    year: 2011,
    quarter: null,
    period: "FY2011",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2010-09-03",
        end: "2011-09-01",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2011-09-01",
        filed: "2011-10-25",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312511000189/mu-912011x10k.htm",
      },
    },
    revenue: 8788000000,
    costOfSales: 7030000000,
    operatingIncome: 761000000,
    netIncome: 167000000,
    dilutedEps: 0.17,
    dilutedShares: 1007500000,
    operatingCashFlow: 2484000000,
    capex: 2550000000,
    depreciation: 2162000000,
    stockComp: 76000000,
    cash: 2160000000,
    securities: null,
    assets: 14752000000,
    liabilities: 4900000000,
    equity: 8470000000,
    totalEquity: 9852000000,
    debtCurrent: 140000000,
    debtNoncurrent: 1861000000,
    inventory: 2080000000,
    receivables: 1105000000,
    ppe: 7555000000,
    spotShares: 984300000,
    grossProfit: 1758000000,
    freeCashFlow: -66000000,
    debt: 2001000000,
    balanceOutsideEquity: 0,
    grossMargin: 20.004551661356395,
    operatingMargin: 8.659535730541648,
    netMargin: 1.9003186162949475,
    fcfMargin: -0.7510241238051889,
    roe: 1.971664698937426,
  },
  {
    accessionNumber: "0000723125-12-000156",
    form: "10-K",
    filed: "2012-10-29",
    end: "2012-08-30",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
    year: 2012,
    quarter: null,
    period: "FY2012",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2011-09-02",
        end: "2012-08-30",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2012-08-30",
        filed: "2012-10-29",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312512000156/a2012q4.htm",
      },
    },
    revenue: 8234000000,
    costOfSales: 7266000000,
    operatingIncome: -612000000,
    netIncome: -1032000000,
    dilutedEps: -1.04,
    dilutedShares: 991000000,
    operatingCashFlow: 2114000000,
    capex: 1699000000,
    depreciation: 2222000000,
    stockComp: 87000000,
    cash: 2459000000,
    securities: 100000000,
    assets: 14328000000,
    liabilities: 5911000000,
    equity: 7700000000,
    totalEquity: 8417000000,
    debtCurrent: 224000000,
    debtNoncurrent: 3038000000,
    inventory: 1812000000,
    receivables: 933000000,
    ppe: 7103000000,
    spotShares: 1017700000,
    grossProfit: 968000000,
    freeCashFlow: 415000000,
    debt: 3262000000,
    balanceOutsideEquity: 0,
    grossMargin: 11.756133106631042,
    operatingMargin: -7.432596550886568,
    netMargin: -12.533398105416566,
    fcfMargin: 5.040077726499879,
    roe: -13.402597402597403,
  },
  {
    accessionNumber: "0000723125-13-000228",
    form: "10-K",
    filed: "2013-10-28",
    end: "2013-08-29",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
    year: 2013,
    quarter: null,
    period: "FY2013",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2012-08-31",
        end: "2013-08-29",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2013-08-29",
        filed: "2013-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312513000228/a2013q4.htm",
      },
    },
    revenue: 9073000000,
    costOfSales: 7226000000,
    operatingIncome: 236000000,
    netIncome: 1190000000,
    dilutedEps: 1.13,
    dilutedShares: 1057000000,
    operatingCashFlow: 1811000000,
    capex: 1442000000,
    depreciation: 1926000000,
    stockComp: 91000000,
    cash: 2880000000,
    securities: 221000000,
    assets: 19118000000,
    liabilities: 9112000000,
    equity: 9142000000,
    totalEquity: 10006000000,
    debtCurrent: 1585000000,
    debtNoncurrent: 4452000000,
    inventory: 2649000000,
    receivables: 2069000000,
    ppe: 7626000000,
    spotShares: 1044400000,
    grossProfit: 1847000000,
    freeCashFlow: 369000000,
    debt: 6037000000,
    balanceOutsideEquity: 0,
    grossMargin: 20.35710349388295,
    operatingMargin: 2.6011242147029647,
    netMargin: 13.115838201256475,
    fcfMargin: 4.067012013666924,
    roe: 13.016845329249618,
  },
  {
    accessionNumber: "0000723125-14-000195",
    form: "10-K",
    filed: "2014-10-27",
    end: "2014-08-28",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
    year: 2014,
    quarter: null,
    period: "FY2014",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2013-08-30",
        end: "2014-08-28",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2014-08-28",
        filed: "2014-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312514000195/a2014q4.htm",
      },
    },
    revenue: 16358000000,
    costOfSales: 10921000000,
    operatingIncome: 3087000000,
    netIncome: 3045000000,
    dilutedEps: 2.54,
    dilutedShares: 1198000000,
    operatingCashFlow: 5699000000,
    capex: 3107000000,
    depreciation: 2270000000,
    stockComp: 115000000,
    cash: 4150000000,
    securities: 384000000,
    assets: 22498000000,
    liabilities: 10868000000,
    equity: 10771000000,
    totalEquity: 11573000000,
    debtCurrent: 1638000000,
    debtNoncurrent: 4955000000,
    inventory: 2455000000,
    receivables: 2524000000,
    ppe: 8682000000,
    spotShares: 1073000000,
    grossProfit: 5437000000,
    freeCashFlow: 2592000000,
    debt: 6593000000,
    balanceOutsideEquity: 57000000,
    grossMargin: 33.23755960386355,
    operatingMargin: 18.871500183396503,
    netMargin: 18.614745078860494,
    fcfMargin: 15.845457879936422,
    roe: 28.2703555844397,
  },
  {
    accessionNumber: "0000723125-15-000112",
    form: "10-K",
    filed: "2015-10-27",
    end: "2015-09-03",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
    year: 2015,
    quarter: null,
    period: "FY2015",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2014-08-29",
        end: "2015-09-03",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2015-09-03",
        filed: "2015-10-27",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312515000112/a2015q4.htm",
      },
    },
    revenue: 16192000000,
    costOfSales: 10977000000,
    operatingIncome: 2998000000,
    netIncome: 2899000000,
    dilutedEps: 2.47,
    dilutedShares: 1170000000,
    operatingCashFlow: 5208000000,
    capex: 4021000000,
    depreciation: 2805000000,
    stockComp: 168000000,
    cash: 2287000000,
    securities: 1234000000,
    assets: 24143000000,
    liabilities: 10855000000,
    equity: 12302000000,
    totalEquity: 13239000000,
    debtCurrent: 1089000000,
    debtNoncurrent: 6252000000,
    inventory: 2340000000,
    receivables: 2188000000,
    ppe: 10554000000,
    spotShares: 1084000000,
    grossProfit: 5215000000,
    freeCashFlow: 1187000000,
    debt: 7341000000,
    balanceOutsideEquity: 49000000,
    grossMargin: 32.207262845849804,
    operatingMargin: 18.515316205533598,
    netMargin: 17.903903162055336,
    fcfMargin: 7.330780632411067,
    roe: 23.565273939196878,
  },
  {
    accessionNumber: "0000723125-16-000269",
    form: "10-K",
    filed: "2016-10-28",
    end: "2016-09-01",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
    year: 2016,
    quarter: null,
    period: "FY2016",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "SalesRevenueNet",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2015-09-04",
        end: "2016-09-01",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2016-09-01",
        filed: "2016-10-28",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312516000269/a2016q4.htm",
      },
    },
    revenue: 12399000000,
    costOfSales: 9894000000,
    operatingIncome: 168000000,
    netIncome: -276000000,
    dilutedEps: -0.27,
    dilutedShares: 1036000000,
    operatingCashFlow: 3168000000,
    capex: 5817000000,
    depreciation: 2980000000,
    stockComp: 191000000,
    cash: 4140000000,
    securities: 258000000,
    assets: 27540000000,
    liabilities: 14612000000,
    equity: 12080000000,
    totalEquity: 12928000000,
    debtCurrent: 756000000,
    debtNoncurrent: 9154000000,
    inventory: 2889000000,
    receivables: 1765000000,
    ppe: 14686000000,
    spotShares: 1094000000,
    grossProfit: 2505000000,
    freeCashFlow: -2649000000,
    debt: 9910000000,
    balanceOutsideEquity: 0,
    grossMargin: 20.20324219695137,
    operatingMargin: 1.3549479796757804,
    netMargin: -2.22598596661021,
    fcfMargin: -21.364626179530607,
    roe: -2.28476821192053,
  },
  {
    accessionNumber: "0000723125-17-000131",
    form: "10-K",
    filed: "2017-10-26",
    end: "2017-08-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
    year: 2017,
    quarter: null,
    period: "FY2017",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2016-09-02",
        end: "2017-08-31",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2017-08-31",
        filed: "2017-10-26",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312517000131/a2017q4.htm",
      },
    },
    revenue: 20322000000,
    costOfSales: 11886000000,
    operatingIncome: 5868000000,
    netIncome: 5089000000,
    dilutedEps: 4.41,
    dilutedShares: 1154000000,
    operatingCashFlow: 8153000000,
    capex: 4734000000,
    depreciation: 3861000000,
    stockComp: 215000000,
    cash: 5109000000,
    securities: 319000000,
    assets: 35336000000,
    liabilities: 15845000000,
    equity: 18621000000,
    totalEquity: 19470000000,
    debtCurrent: 1262000000,
    debtNoncurrent: 9872000000,
    inventory: 3123000000,
    receivables: 3490000000,
    ppe: 19431000000,
    spotShares: 1112000000,
    grossProfit: 8436000000,
    freeCashFlow: 3419000000,
    debt: 11134000000,
    balanceOutsideEquity: 21000000,
    grossMargin: 41.51166223796871,
    operatingMargin: 28.875110717449072,
    netMargin: 25.04182659187088,
    fcfMargin: 16.82413148312174,
    roe: 27.329359325492725,
  },
  {
    accessionNumber: "0000723125-18-000092",
    form: "10-K",
    filed: "2018-10-15",
    end: "2018-08-30",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
    year: 2018,
    quarter: null,
    period: "FY2018",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2017-09-01",
        end: "2018-08-30",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      securities: {
        tag: "AvailableForSaleSecuritiesCurrent",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2018-08-30",
        filed: "2018-10-15",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312518000092/a2018q4.htm",
      },
    },
    revenue: 30391000000,
    costOfSales: 12500000000,
    operatingIncome: 14994000000,
    netIncome: 14135000000,
    dilutedEps: 11.51,
    dilutedShares: 1229000000,
    operatingCashFlow: 17400000000,
    capex: 8879000000,
    depreciation: 4759000000,
    stockComp: 198000000,
    cash: 6506000000,
    securities: 296000000,
    assets: 43376000000,
    liabilities: 10112000000,
    equity: 32294000000,
    totalEquity: 33164000000,
    debtCurrent: 859000000,
    debtNoncurrent: 3777000000,
    inventory: 3595000000,
    receivables: 5056000000,
    ppe: 23672000000,
    spotShares: 1161000000,
    grossProfit: 17891000000,
    freeCashFlow: 8521000000,
    debt: 4636000000,
    balanceOutsideEquity: 100000000,
    grossMargin: 58.8694021256293,
    operatingMargin: 49.33697476226514,
    netMargin: 46.51048007633839,
    fcfMargin: 28.03790595900102,
    roe: 43.76974050907289,
  },
  {
    accessionNumber: "0000723125-19-000094",
    form: "10-K",
    filed: "2019-10-17",
    end: "2019-08-29",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
    year: 2019,
    quarter: null,
    period: "FY2019",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2018-08-31",
        end: "2019-08-29",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2019-08-29",
        filed: "2019-10-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312519000094/a2019q4.htm",
      },
    },
    revenue: 23406000000,
    costOfSales: 12704000000,
    operatingIncome: 7376000000,
    netIncome: 6313000000,
    dilutedEps: 5.51,
    dilutedShares: 1143000000,
    operatingCashFlow: 13189000000,
    capex: 9780000000,
    depreciation: 5424000000,
    stockComp: 243000000,
    cash: 7152000000,
    securities: null,
    assets: 48887000000,
    liabilities: 12019000000,
    equity: 35881000000,
    totalEquity: 36770000000,
    debtCurrent: 1310000000,
    debtNoncurrent: 4541000000,
    inventory: 5118000000,
    receivables: 2778000000,
    ppe: 28240000000,
    spotShares: 1106000000,
    grossProfit: 10702000000,
    freeCashFlow: 3409000000,
    debt: 5851000000,
    balanceOutsideEquity: 98000000,
    grossMargin: 45.723318807143464,
    operatingMargin: 31.51328719131847,
    netMargin: 26.97171665384944,
    fcfMargin: 14.564641544903017,
    roe: 17.59426994788328,
  },
  {
    accessionNumber: "0000723125-20-000082",
    form: "10-K",
    filed: "2020-10-19",
    end: "2020-09-03",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
    year: 2020,
    quarter: null,
    period: "FY2020",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2019-08-30",
        end: "2020-09-03",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2020-09-03",
        filed: "2020-10-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312520000082/mu-20200903.htm",
      },
    },
    revenue: 21435000000,
    costOfSales: 14883000000,
    operatingIncome: 3003000000,
    netIncome: 2687000000,
    dilutedEps: 2.37,
    dilutedShares: 1131000000,
    operatingCashFlow: 8306000000,
    capex: 8223000000,
    depreciation: 5650000000,
    stockComp: 328000000,
    cash: 7624000000,
    securities: null,
    assets: 53678000000,
    liabilities: 14682000000,
    equity: 38996000000,
    totalEquity: 38996000000,
    debtCurrent: 270000000,
    debtNoncurrent: 6373000000,
    inventory: 5607000000,
    receivables: 3494000000,
    ppe: null,
    spotShares: 1113000000,
    grossProfit: 6552000000,
    freeCashFlow: 83000000,
    debt: 6643000000,
    balanceOutsideEquity: 0,
    grossMargin: 30.566829951014697,
    operatingMargin: 14.009797060881734,
    netMargin: 12.535572661534871,
    fcfMargin: 0.38721716818287844,
    roe: 6.890450302595139,
  },
  {
    accessionNumber: "0000723125-21-000065",
    form: "10-K",
    filed: "2021-10-08",
    end: "2021-09-02",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
    year: 2021,
    quarter: null,
    period: "FY2021",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2020-09-04",
        end: "2021-09-02",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2021-09-02",
        filed: "2021-10-08",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312521000065/mu-20210902.htm",
      },
    },
    revenue: 27705000000,
    costOfSales: 17282000000,
    operatingIncome: 6283000000,
    netIncome: 5861000000,
    dilutedEps: 5.14,
    dilutedShares: 1141000000,
    operatingCashFlow: 12468000000,
    capex: 10030000000,
    depreciation: 6214000000,
    stockComp: 378000000,
    cash: 7763000000,
    securities: null,
    assets: 58849000000,
    liabilities: 14916000000,
    equity: 43933000000,
    totalEquity: 43933000000,
    debtCurrent: 155000000,
    debtNoncurrent: 6621000000,
    inventory: 4487000000,
    receivables: 4920000000,
    ppe: null,
    spotShares: 1119000000,
    grossProfit: 10423000000,
    freeCashFlow: 2438000000,
    debt: 6776000000,
    balanceOutsideEquity: 0,
    grossMargin: 37.62136798411839,
    operatingMargin: 22.67821692835228,
    netMargin: 21.15502616856163,
    fcfMargin: 8.79985562172893,
    roe: 13.340768898094826,
  },
  {
    accessionNumber: "0000723125-22-000048",
    form: "10-K",
    filed: "2022-10-07",
    end: "2022-09-01",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
    year: 2022,
    quarter: null,
    period: "FY2022",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2021-09-03",
        end: "2022-09-01",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2022-09-01",
        filed: "2022-10-07",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312522000048/mu-20220901.htm",
      },
    },
    revenue: 30758000000,
    costOfSales: 16860000000,
    operatingIncome: 9702000000,
    netIncome: 8687000000,
    dilutedEps: 7.75,
    dilutedShares: 1122000000,
    operatingCashFlow: 15181000000,
    capex: 12067000000,
    depreciation: 7116000000,
    stockComp: 514000000,
    cash: 8262000000,
    securities: null,
    assets: 66283000000,
    liabilities: 16376000000,
    equity: 49907000000,
    totalEquity: 49907000000,
    debtCurrent: 103000000,
    debtNoncurrent: 6803000000,
    inventory: 6663000000,
    receivables: 4765000000,
    ppe: null,
    spotShares: 1094000000,
    grossProfit: 13898000000,
    freeCashFlow: 3114000000,
    debt: 6906000000,
    balanceOutsideEquity: 0,
    grossMargin: 45.184992522270626,
    operatingMargin: 31.54301319981793,
    netMargin: 28.243058716431495,
    fcfMargin: 10.124195331295923,
    roe: 17.40637585909792,
  },
  {
    accessionNumber: "0000723125-23-000054",
    form: "10-K",
    filed: "2023-10-06",
    end: "2023-08-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
    year: 2023,
    quarter: null,
    period: "FY2023",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2022-09-02",
        end: "2023-08-31",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2023-08-31",
        filed: "2023-10-06",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312523000054/mu-20230831.htm",
      },
    },
    revenue: 15540000000,
    costOfSales: 16956000000,
    operatingIncome: -5745000000,
    netIncome: -5833000000,
    dilutedEps: -5.34,
    dilutedShares: 1093000000,
    operatingCashFlow: 1559000000,
    capex: 7676000000,
    depreciation: 7756000000,
    stockComp: 596000000,
    cash: 8577000000,
    securities: null,
    assets: 64254000000,
    liabilities: 20134000000,
    equity: 44120000000,
    totalEquity: 44120000000,
    debtCurrent: 278000000,
    debtNoncurrent: 13052000000,
    inventory: 8387000000,
    receivables: 2048000000,
    ppe: null,
    spotShares: 1098000000,
    grossProfit: -1416000000,
    freeCashFlow: -6117000000,
    debt: 13330000000,
    balanceOutsideEquity: 0,
    grossMargin: -9.111969111969112,
    operatingMargin: -36.969111969111964,
    netMargin: -37.53539253539254,
    fcfMargin: -39.36293436293437,
    roe: -13.220761559383497,
  },
  {
    accessionNumber: "0000723125-24-000027",
    form: "10-K",
    filed: "2024-10-04",
    end: "2024-08-29",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
    year: 2024,
    quarter: null,
    period: "FY2024",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2023-09-01",
        end: "2024-08-29",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2024-08-29",
        filed: "2024-10-04",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312524000027/mu-20240829.htm",
      },
    },
    revenue: 25111000000,
    costOfSales: 19498000000,
    operatingIncome: 1304000000,
    netIncome: 778000000,
    dilutedEps: 0.7,
    dilutedShares: 1118000000,
    operatingCashFlow: 8507000000,
    capex: 8386000000,
    depreciation: 7780000000,
    stockComp: 833000000,
    cash: 7041000000,
    securities: null,
    assets: 69416000000,
    liabilities: 24285000000,
    equity: 45131000000,
    totalEquity: 45131000000,
    debtCurrent: 431000000,
    debtNoncurrent: 12966000000,
    inventory: 8875000000,
    receivables: 5419000000,
    ppe: null,
    spotShares: 1109000000,
    grossProfit: 5613000000,
    freeCashFlow: 121000000,
    debt: 13397000000,
    balanceOutsideEquity: 0,
    grossMargin: 22.352753773246782,
    operatingMargin: 5.192943331607662,
    netMargin: 3.098243797538927,
    fcfMargin: 0.48186053920592564,
    roe: 1.7238705102922605,
  },
  {
    accessionNumber: "0000723125-25-000028",
    form: "10-K",
    filed: "2025-10-03",
    end: "2025-08-28",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
    year: 2025,
    quarter: null,
    period: "FY2025",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "RevenueFromContractWithCustomerExcludingAssessedTax",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingIncome: {
        tag: "OperatingIncomeLoss",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      capex: {
        tag: "PaymentsToAcquirePropertyPlantAndEquipment",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2024-08-30",
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      liabilities: {
        tag: "Liabilities",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtAndCapitalLeaseObligations",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
      ppe: null,
      spotShares: {
        tag: "CommonStockSharesOutstanding",
        unit: "shares",
        start: null,
        end: "2025-08-28",
        filed: "2025-10-03",
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm",
      },
    },
    revenue: 37378000000,
    costOfSales: 22505000000,
    operatingIncome: 9770000000,
    netIncome: 8539000000,
    dilutedEps: 7.59,
    dilutedShares: 1125000000,
    operatingCashFlow: 17525000000,
    capex: 15857000000,
    depreciation: 8352000000,
    stockComp: 972000000,
    cash: 9642000000,
    securities: null,
    assets: 82798000000,
    liabilities: 28633000000,
    equity: 54165000000,
    totalEquity: 54165000000,
    debtCurrent: 560000000,
    debtNoncurrent: 14017000000,
    inventory: 8355000000,
    receivables: 7163000000,
    ppe: null,
    spotShares: 1122000000,
    grossProfit: 14873000000,
    freeCashFlow: 1668000000,
    debt: 14577000000,
    balanceOutsideEquity: 0,
    grossMargin: 39.79078602386431,
    operatingMargin: 26.138370164267748,
    netMargin: 22.84498903098079,
    fcfMargin: 4.4625180587511375,
    roe: 15.76479276285424,
  },
  {
    year: 2026,
    quarter: null,
    period: "FY2026",
    end: "2026-09-03",
    filed: "2026-09-30",
    form: "8-K exhibit",
    source:
      "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
    accessionNumber: "0000723125-26-000018",
    status: "Unaudited GAAP earnings release; FY2026 10-K not filed by cutoff",
    provenance: {
      revenue: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      costOfSales: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      operatingIncome: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      netIncome: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      dilutedEps: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD/shares",
        method: "Curated unaudited release table",
      },
      dilutedShares: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "shares",
        method: "Curated unaudited release table",
      },
      operatingCashFlow: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      capex: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      depreciation: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      stockComp: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      cash: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      securities: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      longTermSecurities: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      assets: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      liabilities: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      equity: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      totalEquity: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      debtCurrent: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      debtNoncurrent: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      inventory: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      receivables: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      ppe: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      capexSaleProceeds: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      governmentIncentives: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      customerDeposits: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
      noncurrentContractLiabilities: {
        source:
          "https://www.sec.gov/Archives/edgar/data/723125/000072312526000018/a2026q4ex991-pressrelease.htm",
        filed: "2026-09-30",
        end: "2026-09-03",
        unit: "USD",
        method: "Curated unaudited release table",
      },
    },
    revenue: 133188000000,
    costOfSales: 25684000000,
    operatingIncome: 99340000000,
    netIncome: 84969000000,
    dilutedEps: 74.33,
    dilutedShares: 1143000000,
    operatingCashFlow: 89675000000,
    capex: 30712000000,
    depreciation: 9503000000,
    stockComp: 1333000000,
    cash: 38364000000,
    securities: 5070000000,
    assets: 195888000000,
    liabilities: 57510000000,
    equity: 138378000000,
    totalEquity: 138378000000,
    debtCurrent: 491000000,
    debtNoncurrent: 4688000000,
    inventory: 10372000000,
    receivables: 36197000000,
    ppe: 63310000000,
    spotShares: null,
    longTermSecurities: 30019000000,
    capexSaleProceeds: 29000000,
    governmentIncentives: 3316000000,
    customerDeposits: 12747000000,
    noncurrentContractLiabilities: 12895000000,
    grossProfit: 107504000000,
    freeCashFlow: 58963000000,
    debt: 5179000000,
    balanceOutsideEquity: 0,
    grossMargin: 80.71598041865633,
    operatingMargin: 74.58629906598192,
    netMargin: 63.796287953869715,
    fcfMargin: 44.27050485028681,
    roe: 61.403546806573296,
  },
];
