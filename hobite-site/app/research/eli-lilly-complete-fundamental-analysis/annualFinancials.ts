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
  marketing: number | null;
  iprd: number | null;
  specialCharges: number | null;
  iprdCash: number | null;
  acquisitionCash: number | null;
  dividends: number | null;
  buybacks: number | null;
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
  issuedShares: number | null;
  trustShares: number | null;
  grossProfit: number | null;
  freeCashFlow: number | null;
  debt: number | null;
  balanceOutsideEquity: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  netMargin: number | null;
  fcfMargin: number | null;
  roe: number | null;
};
export const LLY_ANNUAL: FinancialRow[] = [
  {
    accessionNumber: "0001193125-12-078393",
    form: "10-K",
    filed: "2012-02-24",
    end: "2011-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
    year: 2011,
    quarter: null,
    period: "FY2011",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
        end: "2011-12-31",
        filed: "2012-02-24",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/lly-20111231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      iprdCash: {
        tag: "lly:PurchaseOfInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/lly-20111231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2011-01-01",
        end: "2011-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
        end: "2011-12-31",
        filed: "2012-02-24",
      },
      equity: null,
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
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
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
        end: "2011-12-31",
        filed: "2012-02-24",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2011-12-31",
        filed: "2012-02-24",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000119312512078393/d266023d10k.htm",
      },
    },
    revenue: 24286500000,
    costOfSales: 5067900000,
    operatingIncome: 5528500000,
    netIncome: 4347700000,
    dilutedEps: 3.9,
    dilutedShares: 1113967000,
    operatingCashFlow: 7234500000,
    capex: 672000000,
    depreciation: 1373600000,
    otherDa: 732400000,
    acquiredAmortization: 469000000,
    research: 5020800000,
    marketing: 7879900000,
    iprd: 388000000,
    specialCharges: 401400000,
    iprdCash: -388000000,
    acquisitionCash: 307800000,
    dividends: 2180100000,
    buybacks: 0,
    stockComp: 147400000,
    cash: 5922500000,
    securities: 974600000,
    assets: 33659800000,
    liabilities: 20124200000,
    equity: null,
    totalEquity: 13535600000,
    debtCurrent: 1516800000,
    debtNoncurrent: 5464700000,
    reportedDebt: null,
    goodwill: 1434700000,
    intangibles: null,
    commitments: null,
    inventory: 2299800000,
    receivables: 3597700000,
    ppe: 7760300000,
    spotShares: 1108644000,
    issuedShares: 1158644000,
    trustShares: 50000000,
    grossProfit: 19218600000,
    freeCashFlow: 6562500000,
    debt: 6981500000,
    balanceOutsideEquity: 0,
    grossMargin: 79.13285158421345,
    operatingMargin: 22.76367529285817,
    netMargin: 17.9017149445165,
    fcfMargin: 27.021184608733247,
    roe: null,
  },
  {
    accessionNumber: "0000059478-13-000007",
    form: "10-K",
    filed: "2013-02-21",
    end: "2012-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
    year: 2012,
    quarter: null,
    period: "FY2012",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
        end: "2012-12-31",
        filed: "2013-02-21",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2012-01-01",
        end: "2012-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
        end: "2012-12-31",
        filed: "2013-02-21",
      },
      equity: null,
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
        end: "2012-12-31",
        filed: "2013-02-21",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2012-12-31",
        filed: "2013-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947813000007/lly-20121231x10k.htm",
      },
    },
    revenue: 22603400000,
    costOfSales: 4796500000,
    operatingIncome: 4734200000,
    netIncome: 4088600000,
    dilutedEps: 3.66,
    dilutedShares: 1117294000,
    operatingCashFlow: 5304800000,
    capex: 905400000,
    depreciation: 1462200000,
    otherDa: 754000000,
    acquiredAmortization: 563000000,
    research: 5278100000,
    marketing: 7513500000,
    iprd: 0,
    specialCharges: 281100000,
    iprdCash: 0,
    acquisitionCash: 199300000,
    dividends: 2187400000,
    buybacks: 721100000,
    stockComp: 141500000,
    cash: 4018800000,
    securities: 1665500000,
    assets: 34398900000,
    liabilities: 19625000000,
    equity: null,
    totalEquity: 14773900000,
    debtCurrent: 11900000,
    debtNoncurrent: 5519400000,
    reportedDebt: null,
    goodwill: 1501300000,
    intangibles: null,
    commitments: null,
    inventory: 2643800000,
    receivables: 3336300000,
    ppe: 7760200000,
    spotShares: 1096493000,
    issuedShares: 1146493000,
    trustShares: 50000000,
    grossProfit: 17806900000,
    freeCashFlow: 4399400000,
    debt: 5531300000,
    balanceOutsideEquity: 0,
    grossMargin: 78.77974110089633,
    operatingMargin: 20.94463664758399,
    netMargin: 18.088429174372,
    fcfMargin: 19.463443552739854,
    roe: null,
  },
  {
    accessionNumber: "0000059478-14-000078",
    form: "10-K",
    filed: "2014-02-19",
    end: "2013-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
    year: 2013,
    quarter: null,
    period: "FY2013",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
        end: "2013-12-31",
        filed: "2014-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2013-01-01",
        end: "2013-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
        end: "2013-12-31",
        filed: "2014-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      debtCurrent: {
        tag: "LongTermDebtCurrent",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      reportedDebt: null,
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      intangibles: null,
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
        end: "2013-12-31",
        filed: "2014-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2013-12-31",
        filed: "2014-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947814000078/lly-20131231x10k.htm",
      },
    },
    revenue: 23113100000,
    costOfSales: 4908100000,
    operatingIncome: 5370400000,
    netIncome: 4684800000,
    dilutedEps: 4.32,
    dilutedShares: 1084766000,
    operatingCashFlow: 5735000000,
    capex: 1012100000,
    depreciation: 1445600000,
    otherDa: 774800000,
    acquiredAmortization: 555000000,
    research: 5531300000,
    marketing: 7125600000,
    iprd: 57100000,
    specialCharges: 120600000,
    iprdCash: 57100000,
    acquisitionCash: 43700000,
    dividends: 2120700000,
    buybacks: 1698100000,
    stockComp: 144900000,
    cash: 3830200000,
    securities: 1567100000,
    assets: 35248700000,
    liabilities: 17608000000,
    equity: 17631400000,
    totalEquity: 17640700000,
    debtCurrent: 1012600000,
    debtNoncurrent: 4200300000,
    reportedDebt: null,
    goodwill: 1516800000,
    intangibles: null,
    commitments: null,
    inventory: 2928800000,
    receivables: 3434400000,
    ppe: 7975500000,
    spotShares: 1067628000,
    issuedShares: 1117628000,
    trustShares: 50000000,
    grossProfit: 18205000000,
    freeCashFlow: 4722900000,
    debt: 5212900000,
    balanceOutsideEquity: 0,
    grossMargin: 78.76485629361703,
    operatingMargin: 23.23530811531123,
    netMargin: 20.269024925258837,
    fcfMargin: 20.433866508603344,
    roe: 26.57077713624556,
  },
  {
    accessionNumber: "0000059478-15-000100",
    form: "10-K",
    filed: "2015-02-19",
    end: "2014-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
    year: 2014,
    quarter: null,
    period: "FY2014",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
        end: "2014-12-31",
        filed: "2015-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2014-01-01",
        end: "2014-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
        end: "2014-12-31",
        filed: "2015-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
        end: "2014-12-31",
        filed: "2015-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2014-12-31",
        filed: "2015-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947815000100/lly-20141231x10k.htm",
      },
    },
    revenue: 19615600000,
    costOfSales: 4932500000,
    operatingIncome: 2659800000,
    netIncome: 2390500000,
    dilutedEps: 2.23,
    dilutedShares: 1074286000,
    operatingCashFlow: 4458400000,
    capex: 1162600000,
    depreciation: 1379000000,
    otherDa: 759100000,
    acquiredAmortization: 535900000,
    research: 4733600000,
    marketing: 6620800000,
    iprd: 200200000,
    specialCharges: 468700000,
    iprdCash: 95000000,
    acquisitionCash: 551400000,
    dividends: 2101200000,
    buybacks: 800000000,
    stockComp: 156000000,
    cash: 3871600000,
    securities: 955400000,
    assets: 37178200000,
    liabilities: 21790100000,
    equity: 15373200000,
    totalEquity: 15388100000,
    debtCurrent: 2688700000,
    debtNoncurrent: 5367700000,
    reportedDebt: 8056400000,
    goodwill: 1758100000,
    intangibles: 2884200000,
    commitments: null,
    inventory: 2740000000,
    receivables: 3234600000,
    ppe: 7963900000,
    spotShares: 1061437000,
    issuedShares: 1111437000,
    trustShares: 50000000,
    grossProfit: 14683100000,
    freeCashFlow: 3295800000,
    debt: 8056400000,
    balanceOutsideEquity: 0,
    grossMargin: 74.85419767939803,
    operatingMargin: 13.559615815983198,
    netMargin: 12.186728930035278,
    fcfMargin: 16.801933155243788,
    roe: 15.549787942653449,
  },
  {
    accessionNumber: "0000059478-16-000321",
    form: "10-K",
    filed: "2016-02-19",
    end: "2015-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
    year: 2015,
    quarter: null,
    period: "FY2015",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsSold",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
        end: "2015-12-31",
        filed: "2016-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2015-01-01",
        end: "2015-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
        end: "2015-12-31",
        filed: "2016-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
        end: "2015-12-31",
        filed: "2016-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2015-12-31",
        filed: "2016-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947816000321/lly-20151231x10k.htm",
      },
    },
    revenue: 19958700000,
    costOfSales: 5037200000,
    operatingIncome: 2689400000,
    netIncome: 2408400000,
    dilutedEps: 2.26,
    dilutedShares: 1065720000,
    operatingCashFlow: 2964600000,
    capex: 1066200000,
    depreciation: 1427700000,
    otherDa: 717600000,
    acquiredAmortization: 631800000,
    research: 4796400000,
    marketing: 6533000000,
    iprd: 535000000,
    specialCharges: 367700000,
    iprdCash: 560000000,
    acquisitionCash: 5283100000,
    dividends: 2127300000,
    buybacks: 749500000,
    stockComp: 217800000,
    cash: 3666400000,
    securities: 785400000,
    assets: 35568900000,
    liabilities: 20978600000,
    equity: 14571300000,
    totalEquity: 14590300000,
    debtCurrent: 6100000,
    debtNoncurrent: 7972400000,
    reportedDebt: 7978500000,
    goodwill: 4039900000,
    intangibles: 5034800000,
    commitments: null,
    inventory: 3445800000,
    receivables: 3513000000,
    ppe: 8053500000,
    spotShares: 1056063000,
    issuedShares: 1106063000,
    trustShares: 50000000,
    grossProfit: 14921500000,
    freeCashFlow: 1898400000,
    debt: 7978500000,
    balanceOutsideEquity: 0,
    grossMargin: 74.76188328899177,
    operatingMargin: 13.47482551468783,
    netMargin: 12.0669181860542,
    fcfMargin: 9.511641539779644,
    roe: 16.5283811327747,
  },
  {
    accessionNumber: "0000059478-17-000098",
    form: "10-K",
    filed: "2017-02-21",
    end: "2016-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
    year: 2016,
    quarter: null,
    period: "FY2016",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
        end: "2016-12-31",
        filed: "2017-02-21",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2016-01-01",
        end: "2016-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
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
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
        end: "2016-12-31",
        filed: "2017-02-21",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2016-12-31",
        filed: "2017-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947817000098/lly-20161231x10xk.htm",
      },
    },
    revenue: 21222100000,
    costOfSales: 5710100000,
    operatingIncome: 3261200000,
    netIncome: 2737600000,
    dilutedEps: 2.58,
    dilutedShares: 1061825000,
    operatingCashFlow: 4851000000,
    capex: 1037000000,
    depreciation: 1496600000,
    otherDa: 716200000,
    acquiredAmortization: 687900000,
    research: 5310300000,
    marketing: 6528000000,
    iprd: 30000000,
    specialCharges: 382500000,
    iprdCash: 55000000,
    acquisitionCash: 45000000,
    dividends: 2158500000,
    buybacks: 600100000,
    stockComp: 255300000,
    cash: 4582100000,
    securities: 1456500000,
    assets: 38805900000,
    liabilities: 24725400000,
    equity: 14007700000,
    totalEquity: 14080500000,
    debtCurrent: 1937400000,
    debtNoncurrent: 8367800000,
    reportedDebt: 10305200000,
    goodwill: 3972700000,
    intangibles: 4357900000,
    commitments: null,
    inventory: 3561900000,
    receivables: 4029400000,
    ppe: 8252600000,
    spotShares: 1051586000,
    issuedShares: 1101586000,
    trustShares: 50000000,
    grossProfit: 15512000000,
    freeCashFlow: 3814000000,
    debt: 10305200000,
    balanceOutsideEquity: 0,
    grossMargin: 73.09361467526776,
    operatingMargin: 15.366999495808614,
    netMargin: 12.89976015568676,
    fcfMargin: 17.97183125138417,
    roe: 19.54353676906273,
  },
  {
    accessionNumber: "0000059478-18-000089",
    form: "10-K",
    filed: "2018-02-20",
    end: "2017-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
    year: 2017,
    quarter: null,
    period: "FY2017",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
        end: "2017-12-31",
        filed: "2018-02-20",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2017-01-01",
        end: "2017-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
        end: "2017-12-31",
        filed: "2018-02-20",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
        end: "2017-12-31",
        filed: "2018-02-20",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2017-12-31",
        filed: "2018-02-20",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947818000089/lly-20171231x10xk.htm",
      },
    },
    revenue: 19973800000,
    costOfSales: 4447700000,
    operatingIncome: 2003300000,
    netIncome: -204100000,
    dilutedEps: -0.19,
    dilutedShares: 1052023000,
    operatingCashFlow: 5615600000,
    capex: 1076800000,
    depreciation: 1567300000,
    otherDa: 681700000,
    acquiredAmortization: 462200000,
    research: 5096200000,
    marketing: 5982400000,
    iprd: 1112600000,
    specialCharges: 1331600000,
    iprdCash: 1086800000,
    acquisitionCash: 882100000,
    dividends: 2192100000,
    buybacks: 299800000,
    stockComp: 281300000,
    cash: 6536200000,
    securities: 1497900000,
    assets: 44981000000,
    liabilities: 33313100000,
    equity: 11592200000,
    totalEquity: 11667900000,
    debtCurrent: 3706600000,
    debtNoncurrent: 9940500000,
    reportedDebt: 13647100000,
    goodwill: 4370100000,
    intangibles: 4029200000,
    commitments: null,
    inventory: 4458300000,
    receivables: 4546300000,
    ppe: 8826500000,
    spotShares: 1050672000,
    issuedShares: 1100672000,
    trustShares: 50000000,
    grossProfit: 15526100000,
    freeCashFlow: 4538800000,
    debt: 13647100000,
    balanceOutsideEquity: 0,
    grossMargin: 77.7323293514504,
    operatingMargin: 10.029638826863192,
    netMargin: -1.0218386085772362,
    fcfMargin: 22.7237681362585,
    roe: -1.7606666551646797,
  },
  {
    accessionNumber: "0000059478-19-000082",
    form: "10-K",
    filed: "2019-02-19",
    end: "2018-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
    year: 2018,
    quarter: null,
    period: "FY2018",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
        end: "2018-12-31",
        filed: "2019-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2018-01-01",
        end: "2018-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
        end: "2018-12-31",
        filed: "2019-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
        end: "2018-12-31",
        filed: "2019-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2018-12-31",
        filed: "2019-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947819000082/lly-20181231x10xk.htm",
      },
    },
    revenue: 21493300000,
    costOfSales: 4681700000,
    operatingIncome: 3534500000,
    netIncome: 3232000000,
    dilutedEps: 3.13,
    dilutedShares: 1033667000,
    operatingCashFlow: 5524500000,
    capex: 1210600000,
    depreciation: 1609000000,
    otherDa: 797100000,
    acquiredAmortization: 361300000,
    research: 5051200000,
    marketing: 5975100000,
    iprd: 1983900000,
    specialCharges: 266900000,
    iprdCash: 1807600000,
    acquisitionCash: 0,
    dividends: 2311800000,
    buybacks: 4150700000,
    stockComp: 279500000,
    cash: 7998200000,
    securities: 88200000,
    assets: 43908400000,
    liabilities: 32999300000,
    equity: 9828700000,
    totalEquity: 10909100000,
    debtCurrent: 1131200000,
    debtNoncurrent: 11639700000,
    reportedDebt: 12770900000,
    goodwill: 4347500000,
    intangibles: 3521000000,
    commitments: null,
    inventory: 4111800000,
    receivables: 5246500000,
    ppe: 8919500000,
    spotShares: 1007639000,
    issuedShares: 1057639000,
    trustShares: 50000000,
    grossProfit: 16811600000,
    freeCashFlow: 4313900000,
    debt: 12770900000,
    balanceOutsideEquity: 0,
    grossMargin: 78.21786324110303,
    operatingMargin: 16.444659498541405,
    netMargin: 15.037244164460553,
    fcfMargin: 20.070905817161627,
    roe: 32.88329077090562,
  },
  {
    accessionNumber: "0000059478-20-000057",
    form: "10-K",
    filed: "2020-02-19",
    end: "2019-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
    year: 2019,
    quarter: null,
    period: "FY2019",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
        end: "2019-12-31",
        filed: "2020-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk_htm.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      iprdCash: null,
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2019-01-01",
        end: "2019-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
        end: "2019-12-31",
        filed: "2020-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
        end: "2019-12-31",
        filed: "2020-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2019-12-31",
        filed: "2020-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947820000057/lly-20191231x10xk.htm",
      },
    },
    revenue: 22319500000,
    costOfSales: 4721200000,
    operatingIncome: 4974300000,
    netIncome: 8318400000,
    dilutedEps: 8.89,
    dilutedShares: 935684000,
    operatingCashFlow: 4836600000,
    capex: 1033900000,
    depreciation: 1232600000,
    otherDa: 814700000,
    acquiredAmortization: 225800000,
    research: 5595000000,
    marketing: 6213800000,
    iprd: 239600000,
    specialCharges: 575600000,
    iprdCash: null,
    acquisitionCash: 6917700000,
    dividends: 2409800000,
    buybacks: 4400000000,
    stockComp: 312400000,
    cash: 2337500000,
    securities: 101000000,
    assets: 39286100000,
    liabilities: 36587000000,
    equity: 2606900000,
    totalEquity: 2699100000,
    debtCurrent: 1499300000,
    debtNoncurrent: 13817900000,
    reportedDebt: 15317200000,
    goodwill: 3679400000,
    intangibles: 6618000000,
    commitments: null,
    inventory: 3190700000,
    receivables: 4547300000,
    ppe: 7872900000,
    spotShares: 908056000,
    issuedShares: 958056000,
    trustShares: 50000000,
    grossProfit: 17598300000,
    freeCashFlow: 3802700000,
    debt: 15317200000,
    balanceOutsideEquity: 0,
    grossMargin: 78.84719639776877,
    operatingMargin: 22.286789578619594,
    netMargin: 37.26965209794126,
    fcfMargin: 17.037568045879166,
    roe: 319.09164141317274,
  },
  {
    accessionNumber: "0000059478-21-000083",
    form: "10-K",
    filed: "2021-02-17",
    end: "2020-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
    year: 2020,
    quarter: null,
    period: "FY2020",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
        end: "2020-12-31",
        filed: "2021-02-17",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpense",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      iprd: {
        tag: "lly:AcquiredInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231_htm.xml",
        method: "Original structured XBRL instance; nondimensional USD context",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      iprdCash: null,
      acquisitionCash: {
        tag: "PaymentsToAcquireBusinessesNetOfCashAcquired",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2020-01-01",
        end: "2020-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
        end: "2020-12-31",
        filed: "2021-02-17",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
        end: "2020-12-31",
        filed: "2021-02-17",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2020-12-31",
        filed: "2021-02-17",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947821000083/lly-20201231.htm",
      },
    },
    revenue: 24539800000,
    costOfSales: 5483300000,
    operatingIncome: 6167400000,
    netIncome: 6193700000,
    dilutedEps: 6.79,
    dilutedShares: 912505000,
    operatingCashFlow: 6499600000,
    capex: 1387900000,
    depreciation: 1323900000,
    otherDa: 765200000,
    acquiredAmortization: 428200000,
    research: 5976300000,
    marketing: 6121200000,
    iprd: 660400000,
    specialCharges: 131200000,
    iprdCash: null,
    acquisitionCash: 849300000,
    dividends: 2687100000,
    buybacks: 500000000,
    stockComp: 308100000,
    cash: 3657100000,
    securities: 24200000,
    assets: 46633100000,
    liabilities: 40807900000,
    equity: 5641600000,
    totalEquity: 5825200000,
    debtCurrent: 8700000,
    debtNoncurrent: 16586600000,
    reportedDebt: 16595300000,
    goodwill: 3766500000,
    intangibles: 7450000000,
    commitments: null,
    inventory: 3980300000,
    receivables: 5875300000,
    ppe: 8681900000,
    spotShares: -49042923,
    issuedShares: 957077,
    trustShares: 50000000,
    grossProfit: 19056500000,
    freeCashFlow: 5111700000,
    debt: 16595300000,
    balanceOutsideEquity: 0,
    grossMargin: 77.65548211476866,
    operatingMargin: 25.132234166537625,
    netMargin: 25.239407004132065,
    fcfMargin: 20.830243115265812,
    roe: 109.78623085649461,
  },
  {
    accessionNumber: "0000059478-22-000068",
    form: "10-K",
    filed: "2022-02-23",
    end: "2021-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
    year: 2021,
    quarter: null,
    period: "FY2021",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
        end: "2021-12-31",
        filed: "2022-02-23",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      iprd: {
        tag: "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      acquisitionCash: {
        tag: "OtherPaymentsToAcquireBusinesses",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2021-01-01",
        end: "2021-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
        end: "2021-12-31",
        filed: "2022-02-23",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
        end: "2021-12-31",
        filed: "2022-02-23",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2021-12-31",
        filed: "2022-02-23",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947822000068/lly-20211231.htm",
      },
    },
    revenue: 28318400000,
    costOfSales: 7312800000,
    operatingIncome: 6357100000,
    netIncome: 5581700000,
    dilutedEps: 6.12,
    dilutedShares: 911681000,
    operatingCashFlow: 7365900000,
    capex: 1309800000,
    depreciation: 1547600000,
    otherDa: 787000000,
    acquiredAmortization: 628800000,
    research: 6930700000,
    marketing: 6431600000,
    iprd: 970100000,
    specialCharges: 316100000,
    iprdCash: 668600000,
    acquisitionCash: 747400000,
    dividends: 3086800000,
    buybacks: 1250000000,
    stockComp: 342800000,
    cash: 3818500000,
    securities: 90100000,
    assets: 48806000000,
    liabilities: 39651200000,
    equity: 8979200000,
    totalEquity: 9154800000,
    debtCurrent: 1538300000,
    debtNoncurrent: 15346400000,
    reportedDebt: 16884700000,
    goodwill: 3892000000,
    intangibles: 7691900000,
    commitments: null,
    inventory: 3886000000,
    receivables: 6672800000,
    ppe: 8985100000,
    spotShares: -49045884,
    issuedShares: 954116,
    trustShares: 50000000,
    grossProfit: 21005600000,
    freeCashFlow: 6056100000,
    debt: 16884700000,
    balanceOutsideEquity: 0,
    grossMargin: 74.17650714729646,
    operatingMargin: 22.448655291259392,
    netMargin: 19.71050624329058,
    fcfMargin: 21.38574213232386,
    roe: 62.16255345687812,
  },
  {
    accessionNumber: "0000059478-23-000082",
    form: "10-K",
    filed: "2023-02-22",
    end: "2022-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
    year: 2022,
    quarter: null,
    period: "FY2022",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
        end: "2022-12-31",
        filed: "2023-02-22",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      iprd: {
        tag: "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      acquisitionCash: {
        tag: "OtherPaymentsToAcquireBusinesses",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2022-01-01",
        end: "2022-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
        end: "2022-12-31",
        filed: "2023-02-22",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
        end: "2022-12-31",
        filed: "2023-02-22",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2022-12-31",
        filed: "2023-02-22",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947823000082/lly-20221231.htm",
      },
    },
    revenue: 28541400000,
    costOfSales: 6629800000,
    operatingIncome: 7127300000,
    netIncome: 6244800000,
    dilutedEps: 6.9,
    dilutedShares: 904619000,
    operatingCashFlow: 7585700000,
    capex: 1854300000,
    depreciation: 1522500000,
    otherDa: 816600000,
    acquiredAmortization: 579700000,
    research: 7190800000,
    marketing: 6440400000,
    iprd: 908500000,
    specialCharges: 244600000,
    iprdCash: 1131000000,
    acquisitionCash: 327200000,
    dividends: 3535800000,
    buybacks: 1500000000,
    stockComp: 371100000,
    cash: 2067000000,
    securities: 144800000,
    assets: 49489800000,
    liabilities: 38714400000,
    equity: 10649800000,
    totalEquity: 10775400000,
    debtCurrent: 1501100000,
    debtNoncurrent: 14737500000,
    reportedDebt: 16238600000,
    goodwill: 4073000000,
    intangibles: 7206600000,
    commitments: null,
    inventory: 4309700000,
    receivables: 6896000000,
    ppe: 10144000000,
    spotShares: 900632000,
    issuedShares: 950632000,
    trustShares: 50000000,
    grossProfit: 21911600000,
    freeCashFlow: 5731400000,
    debt: 16238600000,
    balanceOutsideEquity: 0,
    grossMargin: 76.77128662223997,
    operatingMargin: 24.971795356920122,
    netMargin: 21.879795665244174,
    fcfMargin: 20.081005136398357,
    roe: 58.63772089616707,
  },
  {
    accessionNumber: "0000059478-24-000065",
    form: "10-K",
    filed: "2024-02-21",
    end: "2023-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
    year: 2023,
    quarter: null,
    period: "FY2023",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
        end: "2023-12-31",
        filed: "2024-02-21",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprd: {
        tag: "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquisitionCash: {
        tag: "OtherPaymentsToAcquireBusinesses",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2023-01-01",
        end: "2023-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
        end: "2023-12-31",
        filed: "2024-02-21",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
        end: "2023-12-31",
        filed: "2024-02-21",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2023-12-31",
        filed: "2024-02-21",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947824000065/lly-20231231.htm",
      },
    },
    revenue: 34124000000,
    costOfSales: 7082000000,
    operatingIncome: 6457000000,
    netIncome: 5240000000,
    dilutedEps: 5.8,
    dilutedShares: 903300000,
    operatingCashFlow: 4240000000,
    capex: 3448000000,
    depreciation: 1527000000,
    otherDa: 902000000,
    acquiredAmortization: 506000000,
    research: 9313000000,
    marketing: 7404000000,
    iprd: 3800000000,
    specialCharges: 68000000,
    iprdCash: 3944000000,
    acquisitionCash: 1044000000,
    dividends: 4069000000,
    buybacks: 750000000,
    stockComp: 629000000,
    cash: 2818600000,
    securities: 109100000,
    assets: 64006300000,
    liabilities: 53142600000,
    equity: 10771900000,
    totalEquity: 10863700000,
    debtCurrent: 6904500000,
    debtNoncurrent: 18320800000,
    reportedDebt: 25225300000,
    goodwill: 4939700000,
    intangibles: 6906600000,
    commitments: null,
    inventory: 5772800000,
    receivables: 9090500000,
    ppe: 12913600000,
    spotShares: 899781000,
    issuedShares: 949781000,
    trustShares: 50000000,
    grossProfit: 27042000000,
    freeCashFlow: 792000000,
    debt: 25225300000,
    balanceOutsideEquity: 0,
    grossMargin: 79.24627827921698,
    operatingMargin: 18.92216621732505,
    netMargin: 15.355761340991677,
    fcfMargin: 2.320947133981948,
    roe: 48.645085825156194,
  },
  {
    accessionNumber: "0000059478-25-000067",
    form: "10-K",
    filed: "2025-02-19",
    end: "2024-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
    year: 2024,
    quarter: null,
    period: "FY2024",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
        end: "2024-12-31",
        filed: "2025-02-19",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprd: {
        tag: "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquisitionCash: {
        tag: "OtherPaymentsToAcquireBusinesses",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2024-01-01",
        end: "2024-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      securities: {
        tag: "ShortTermInvestments",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
        end: "2024-12-31",
        filed: "2025-02-19",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
        end: "2024-12-31",
        filed: "2025-02-19",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2024-12-31",
        filed: "2025-02-19",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
      },
    },
    revenue: 45043000000,
    costOfSales: 8418000000,
    operatingIncome: 12899000000,
    netIncome: 10590000000,
    dilutedEps: 11.71,
    dilutedShares: 904100000,
    operatingCashFlow: 8818000000,
    capex: 5058000000,
    depreciation: 1767000000,
    otherDa: 1058000000,
    acquiredAmortization: 553000000,
    research: 10991000000,
    marketing: 8594000000,
    iprd: 3280000000,
    specialCharges: 861000000,
    iprdCash: 3346000000,
    acquisitionCash: 948000000,
    dividends: 4680000000,
    buybacks: 2500000000,
    stockComp: 646000000,
    cash: 3268400000,
    securities: 154800000,
    assets: 78714900000,
    liabilities: 64443300000,
    equity: 14192100000,
    totalEquity: 14271600000,
    debtCurrent: 5117100000,
    debtNoncurrent: 28527100000,
    reportedDebt: 33644200000,
    goodwill: 5770300000,
    intangibles: 6166300000,
    commitments: null,
    inventory: 7589200000,
    receivables: 11005700000,
    ppe: 17102400000,
    spotShares: 897903000,
    issuedShares: 947903000,
    trustShares: 50000000,
    grossProfit: 36625000000,
    freeCashFlow: 3760000000,
    debt: 33644200000,
    balanceOutsideEquity: 0,
    grossMargin: 81.31119152809538,
    operatingMargin: 28.637080123437602,
    netMargin: 23.51086739337966,
    fcfMargin: 8.347578980085697,
    roe: 74.6189781639081,
  },
  {
    accessionNumber: "0000059478-26-000013",
    form: "10-K",
    filed: "2026-02-12",
    end: "2025-12-31",
    source:
      "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
    year: 2025,
    quarter: null,
    period: "FY2025",
    status: "Filed annual GAAP",
    provenance: {
      revenue: {
        tag: "Revenues",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      costOfSales: {
        tag: "CostOfGoodsAndServicesSold",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingIncome: {
        method:
          "Revenue less cost of sales, internal R&D, marketing/administration, acquired IPR&D and special operating charges; excludes Other-net",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
        end: "2025-12-31",
        filed: "2026-02-12",
      },
      netIncome: {
        tag: "NetIncomeLoss",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedEps: {
        tag: "EarningsPerShareDiluted",
        unit: "USD/shares",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dilutedShares: {
        tag: "WeightedAverageNumberOfDilutedSharesOutstanding",
        unit: "shares",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      operatingCashFlow: {
        tag: "NetCashProvidedByUsedInOperatingActivities",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      capex: {
        tag: "PaymentsToAcquireOtherPropertyPlantAndEquipment",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      depreciation: {
        tag: "DepreciationDepletionAndAmortization",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      otherDa: {
        tag: "Depreciation",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquiredAmortization: {
        tag: "AmortizationOfIntangibleAssets",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      research: {
        tag: "ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      marketing: {
        tag: "SellingGeneralAndAdministrativeExpense",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprd: {
        tag: "ResearchAndDevelopmentAssetAcquiredOtherThanThroughBusinessCombinationWrittenOff",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      specialCharges: {
        tag: "RestructuringSettlementAndImpairmentProvisions",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      iprdCash: {
        tag: "PaymentsToAcquireInProcessResearchAndDevelopment",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      acquisitionCash: {
        tag: "OtherPaymentsToAcquireBusinesses",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      dividends: {
        tag: "PaymentsOfDividends",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      buybacks: {
        tag: "PaymentsForRepurchaseOfCommonStock",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      stockComp: {
        tag: "ShareBasedCompensation",
        unit: "USD",
        start: "2025-01-01",
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      cash: {
        tag: "CashAndCashEquivalentsAtCarryingValue",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      securities: null,
      assets: {
        tag: "Assets",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      liabilities: {
        method: "Original-context assets minus total equity",
        unit: "USD",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
        end: "2025-12-31",
        filed: "2026-02-12",
      },
      equity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      totalEquity: {
        tag: "StockholdersEquity",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      debtCurrent: {
        tag: "DebtCurrent",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      debtNoncurrent: {
        tag: "LongTermDebtNoncurrent",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      reportedDebt: {
        tag: "DebtLongtermAndShorttermCombinedAmount",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      goodwill: {
        tag: "Goodwill",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      intangibles: {
        tag: "IntangibleAssetsNetExcludingGoodwill",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      commitments: null,
      inventory: {
        tag: "InventoryNet",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      receivables: {
        tag: "AccountsReceivableNetCurrent",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      ppe: {
        tag: "PropertyPlantAndEquipmentNet",
        unit: "USD",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      spotShares: {
        method:
          "Issued shares less nonparticipating employee-benefit-trust shares",
        unit: "shares",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
        end: "2025-12-31",
        filed: "2026-02-12",
      },
      issuedShares: {
        tag: "CommonStockSharesIssued",
        unit: "shares",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
      trustShares: {
        tag: "CommonStockSharesHeldInEmployeeTrustShares",
        unit: "shares",
        start: null,
        end: "2025-12-31",
        filed: "2026-02-12",
        source:
          "https://www.sec.gov/Archives/edgar/data/59478/000005947826000013/lly-20251231.htm",
      },
    },
    revenue: 65179000000,
    costOfSales: 11052000000,
    operatingIncome: 26302000000,
    netIncome: 20640000000,
    dilutedEps: 22.95,
    dilutedShares: 899300000,
    operatingCashFlow: 16813000000,
    capex: 7841000000,
    depreciation: 1997000000,
    otherDa: 1314000000,
    acquiredAmortization: 488000000,
    research: 13337000000,
    marketing: 11094000000,
    iprd: 2910000000,
    specialCharges: 484000000,
    iprdCash: 3008000000,
    acquisitionCash: 661000000,
    dividends: 5384000000,
    buybacks: 4108000000,
    stockComp: 626000000,
    cash: 7268000000,
    securities: null,
    assets: 112476000000,
    liabilities: 85941000000,
    equity: 26535000000,
    totalEquity: 26535000000,
    debtCurrent: 1635000000,
    debtNoncurrent: 40868000000,
    reportedDebt: 42503000000,
    goodwill: 5898000000,
    intangibles: 6521000000,
    commitments: null,
    inventory: 13744000000,
    receivables: 17760000000,
    ppe: 24675000000,
    spotShares: 894800000,
    issuedShares: 944800000,
    trustShares: 50000000,
    grossProfit: 54127000000,
    freeCashFlow: 8972000000,
    debt: 42503000000,
    balanceOutsideEquity: 0,
    grossMargin: 83.04361834333143,
    operatingMargin: 40.35348808665368,
    netMargin: 31.666641096058544,
    fcfMargin: 13.76516976326731,
    roe: 77.78405879027699,
  },
];
