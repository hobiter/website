import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const asOf = "2026-10-04";
const output = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../app/research/amazon-complete-fundamental-analysis",
);
const headers = { "User-Agent": "Hobite Research contact@hobite.vercel.app" };
async function response(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r;
}
const json = async (url) => (await response(url)).json();
const array = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const submissionRows = (t) =>
  t.accessionNumber.map((accessionNumber, i) => ({
    accessionNumber,
    form: t.form[i],
    filed: t.filingDate[i],
    end: t.reportDate[i],
    url: `https://www.sec.gov/Archives/edgar/data/1018724/${accessionNumber.replaceAll("-", "")}/${t.primaryDocument[i]}`,
  }));
const tags = {
  revenue: [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "SalesRevenueNet",
    "Revenues",
  ],
  costOfSales: ["CostOfGoodsAndServicesSold", "CostOfRevenue"],
  operatingIncome: ["OperatingIncomeLoss"],
  netIncome: ["NetIncomeLoss"],
  dilutedEps: ["EarningsPerShareDiluted"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding"],
  operatingCashFlow: ["NetCashProvidedByUsedInOperatingActivities"],
  capex: [
    "PaymentsToAcquireProductiveAssets",
    "PaymentsToAcquirePropertyPlantAndEquipment",
  ],
  stockComp: ["ShareBasedCompensation"],
  depreciation: ["DepreciationDepletionAndAmortization"],
  financePrincipal: [
    "FinanceLeasePrincipalPayments",
    "CapitalLeaseObligationsPayments",
  ],
  cash: ["CashAndCashEquivalentsAtCarryingValue"],
  securities: ["MarketableSecuritiesCurrent", "ShortTermInvestments"],
  assets: ["Assets"],
  liabilities: ["Liabilities"],
  equity: ["StockholdersEquity"],
  debtCurrent: ["LongTermDebtCurrent"],
  debtNoncurrent: ["LongTermDebtNoncurrent"],
  shortDebt: ["ShortTermBorrowings"],
  financeLeases: ["FinanceLeaseLiability"],
  operatingLeases: ["OperatingLeaseLiability"],
  inventory: ["InventoryNet"],
  spotShares: ["CommonStockSharesOutstanding"],
};
const days = (r) =>
  r.start ? (Date.parse(r.end) - Date.parse(r.start)) / 86400000 : 0;
function fact(company, key, end, min = 0, max = 0, accn) {
  for (const tag of tags[key]) {
    const unit =
      key === "dilutedEps"
        ? "USD/shares"
        : ["dilutedShares", "spotShares"].includes(key)
          ? "shares"
          : "USD";
    const rows = (company.facts["us-gaap"][tag]?.units[unit] ?? []).filter(
      (r) =>
        r.filed <= asOf &&
        ["10-K", "10-Q"].includes(r.form) &&
        r.end === end &&
        (!accn || r.accn === accn) &&
        (min ? days(r) >= min && days(r) <= max : !r.start),
    );
    rows.sort((a, b) => b.filed.localeCompare(a.filed));
    if (rows.length) return rows[0].val;
  }
  return null;
}
const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  processEntities: false,
  removeNSPrefix: true,
});
async function instance(filing) {
  const directory = filing.url.slice(0, filing.url.lastIndexOf("/") + 1);
  const listing = await json(`${directory}index.json`);
  const file =
    listing.directory.item.find((x) => x.name.endsWith("_htm.xml")) ??
    listing.directory.item.find(
      (x) =>
        x.name.endsWith(".xml") &&
        !/_(cal|def|lab|pre)\.xml$/.test(x.name) &&
        !x.name.includes("FilingSummary"),
    );
  if (!file) throw new Error(`No instance XML: ${filing.url}`);
  const xmlUrl = directory + file.name;
  const doc = parser.parse(await (await response(xmlUrl)).text()).xbrl;
  const contexts = new Map(array(doc.context).map((c) => [c["@_id"], c]));
  function get(tag, end, min = 0, max = 0, member) {
    const rows = array(doc[tag.split(":").at(-1)]).filter((row) => {
      const c = contexts.get(row["@_contextRef"]);
      if (!c) return false;
      const members = array(c.entity.segment?.explicitMember);
      if (
        member
          ? members.length !== 1 || members[0]["#text"] !== member
          : members.length !== 0
      )
        return false;
      const p = c.period;
      return min
        ? p.endDate === end &&
            days({ start: p.startDate, end: p.endDate }) >= min &&
            days({ start: p.startDate, end: p.endDate }) <= max
        : p.instant === end;
    });
    const raw = rows[0]?.["#text"];
    return raw == null ? null : Number(raw);
  }
  const getAny = (tags, end, min, max) => {
    for (const tag of tags) {
      const value = get(tag, end, min, max);
      if (value != null) return value;
    }
    return null;
  };
  return { get, getAny, xmlUrl };
}
const capexTags = [
  "us-gaap:PaymentsForProceedsFromProductiveAssets",
  "us-gaap:PaymentsToAcquireProductiveAssets",
];
const proceedsTags = [
  "amzn:ProceedsFromPropertyPlantAndEquipmentSalesAndIncentives",
  "us-gaap:ProceedsFromRebatesOnPurchasesOfProductiveAssets",
];
const financingTags = [
  "amzn:RepaymentsOfLongTermFinancingObligations",
  "us-gaap:RepaymentsOfLongTermFinanceLeaseObligations",
  "amzn:RepaymentsOfLongTermfFinancingLeaseObligations",
];
const leasePrincipalTags = [
  "us-gaap:FinanceLeasePrincipalPayments",
  "us-gaap:RepaymentsOfLongTermCapitalLeaseObligations",
];
const pct = (a, b) => (a != null && b ? (a / b) * 100 : null);
function derived(r) {
  r.grossProfit =
    r.revenue != null && r.costOfSales != null
      ? r.revenue - r.costOfSales
      : null;
  r.netCapex =
    r.reportedNetCapex ??
    (r.capex != null && r.capexProceeds != null
      ? r.capex - r.capexProceeds
      : null);
  r.freeCashFlow =
    r.operatingCashFlow != null && r.netCapex != null
      ? r.operatingCashFlow - r.netCapex
      : null;
  r.fcfGrossCapex =
    r.operatingCashFlow != null && r.capex != null
      ? r.operatingCashFlow - r.capex
      : null;
  r.cashAfterFinancingPrincipal =
    r.freeCashFlow != null &&
    r.financePrincipal != null &&
    r.financingPrincipal != null
      ? r.freeCashFlow - r.financePrincipal - r.financingPrincipal
      : null;
  r.grossMargin = pct(r.grossProfit, r.revenue);
  r.operatingMargin = pct(r.operatingIncome, r.revenue);
  r.netMargin = pct(r.netIncome, r.revenue);
  r.fcfMargin = pct(r.freeCashFlow, r.revenue);
  r.roe = pct(r.netIncome, r.equity);
  return r;
}
async function main() {
  const sub = await json("https://data.sec.gov/submissions/CIK0001018724.json");
  const all = submissionRows(sub.filings.recent);
  for (const shard of sub.filings.files ?? [])
    all.push(
      ...submissionRows(
        await json(`https://data.sec.gov/submissions/${shard.name}`),
      ),
    );
  const filings = all
    .filter(
      (r) =>
        r.filed <= asOf &&
        ["10-K", "10-K/A", "10-Q", "10-Q/A", "S-1", "S-1/A"].includes(r.form),
    )
    .sort((a, b) => a.filed.localeCompare(b.filed));
  const company = await json(
    "https://data.sec.gov/api/xbrl/companyfacts/CIK0001018724.json",
  );
  const annual = [],
    quarterly = [],
    segments = [],
    channels = [];
  const flow = [
    "revenue",
    "costOfSales",
    "operatingIncome",
    "netIncome",
    "dilutedEps",
    "dilutedShares",
    "operatingCashFlow",
    "capex",
    "stockComp",
    "depreciation",
    "financePrincipal",
  ];
  const instant = [
    "cash",
    "securities",
    "assets",
    "liabilities",
    "equity",
    "debtCurrent",
    "debtNoncurrent",
    "shortDebt",
    "financeLeases",
    "operatingLeases",
    "inventory",
    "spotShares",
  ];
  const annualFilings = filings.filter(
    (r) => r.form === "10-K" && r.end >= "2011-12-31",
  );
  const quarterlyFilings = filings.filter(
    (r) => r.form === "10-Q" && r.end >= "2011-03-31",
  );
  const xmlCache = new Map();
  for (const filing of [...annualFilings, ...quarterlyFilings]) {
    const xml = await instance(filing);
    xmlCache.set(filing.accessionNumber, xml);
    const year = Number(filing.end.slice(0, 4)),
      quarter = Number(filing.end.slice(5, 7)) / 3;
    const isAnnual = filing.form === "10-K",
      min = isAnnual ? 350 : quarter * 80,
      max = isAnnual ? 380 : quarter * 100;
    const row = {
      year,
      ...(!isAnnual ? { quarter, period: `${year} Q${quarter}` } : {}),
      ...filing,
      xmlUrl: xml.xmlUrl,
    };
    for (const key of flow)
      row[key] = fact(
        company,
        key,
        filing.end,
        min,
        max,
        filing.accessionNumber,
      );
    // Annual original filings before the split use the old share/EPS basis.
    if (filing.filed < "2022-06-06") {
      if (row.dilutedEps != null) row.dilutedEps /= 20;
      if (row.dilutedShares != null) row.dilutedShares *= 20;
    }
    row.capex = xml.getAny(capexTags, filing.end, min, max) ?? row.capex;
    row.capexProceeds = xml.getAny(proceedsTags, filing.end, min, max);
    row.financingPrincipal = xml.getAny(financingTags, filing.end, min, max);
    row.financePrincipal =
      xml.getAny(leasePrincipalTags, filing.end, min, max) ??
      row.financePrincipal;
    if (row.financingPrincipal == null && year < 2019)
      row.financingPrincipal = xml.get(
        "amzn:PrincipalRepaymentsOfFinancingObligations",
        filing.end,
        min,
        max,
      );
    if (isAnnual) {
      for (const key of instant)
        row[key] = fact(company, key, filing.end, 0, 0, filing.accessionNumber);
      if (row.spotShares != null && filing.filed < "2022-06-06")
        row.spotShares *= 20;
      row.debt =
        row.debtCurrent != null && row.debtNoncurrent != null
          ? row.debtCurrent + row.debtNoncurrent
          : null;
      if (row.liabilities == null && row.assets != null && row.equity != null)
        row.liabilities = row.assets - row.equity;
      // Older cash-flow lines were filed net; do not label them as gross cash purchases.
      if (year < 2017) {
        row.reportedNetCapex = row.capex;
        row.capex = null;
      }
      annual.push(derived(row));
    } else {
      for (const key of flow.filter(
        (k) => k !== "dilutedEps" && k !== "dilutedShares",
      )) {
        const direct =
          key === "capex"
            ? xml.getAny(capexTags, filing.end, 75, 105)
            : key === "financePrincipal"
              ? xml.getAny(leasePrincipalTags, filing.end, 75, 105)
              : fact(company, key, filing.end, 75, 105, filing.accessionNumber);
        const prior = quarterly.filter((r) => r.year === year);
        const priorValues = prior.map((r) =>
          key === "capex" ? (r.reportedNetCapex ?? r.capex) : r[key],
        );
        row[key] =
          direct ??
          (row[key] != null &&
          prior.length === quarter - 1 &&
          priorValues.every((value) => value != null)
            ? row[key] - priorValues.reduce((sum, value) => sum + value, 0)
            : null);
      }
      row.dilutedEps = fact(
        company,
        "dilutedEps",
        filing.end,
        75,
        105,
        filing.accessionNumber,
      );
      row.dilutedShares = fact(
        company,
        "dilutedShares",
        filing.end,
        75,
        105,
        filing.accessionNumber,
      );
      if (filing.filed < "2022-06-06") {
        if (row.dilutedEps != null) row.dilutedEps /= 20;
        if (row.dilutedShares != null) row.dilutedShares *= 20;
      }
      for (const [key, tags] of [
        ["capexProceeds", proceedsTags],
        ["financingPrincipal", financingTags],
      ]) {
        const ytd = xml.getAny(tags, filing.end, min, max);
        const prior = quarterly.filter((r) => r.year === year);
        row[key] =
          xml.getAny(tags, filing.end, 75, 105) ??
          (ytd != null &&
          prior.length === quarter - 1 &&
          prior.every((r) => r[key] != null)
            ? ytd - prior.reduce((s, r) => s + r[key], 0)
            : null);
      }
      if (year < 2017) {
        row.reportedNetCapex = row.capex;
        row.capex = null;
      }
      quarterly.push(derived(row));
    }
    if (year >= 2018) {
      const period = isAnnual ? `FY${year}` : `${year} Q${quarter}`;
      const lo = isAnnual ? 350 : 75,
        hi = isAnnual ? 380 : 105;
      for (const [name, member] of [
        ["North America", "amzn:NorthAmericaSegmentMember"],
        ["International", "amzn:InternationalSegmentMember"],
        ["AWS", "amzn:AmazonWebServicesSegmentMember"],
      ]) {
        const revenue = xml.get(
          "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax",
          filing.end,
          lo,
          hi,
          member,
        );
        const operatingIncome = xml.get(
          "us-gaap:OperatingIncomeLoss",
          filing.end,
          lo,
          hi,
          member,
        );
        if (revenue != null)
          segments.push({
            period,
            year,
            name,
            revenue,
            operatingIncome,
            operatingMargin: pct(operatingIncome, revenue),
            url: filing.url,
          });
      }
    }
  }
  for (const a of annual) {
    const prior = quarterly.filter((r) => r.year === a.year);
    if (prior.length !== 3) continue;
    const q4 = {
      year: a.year,
      quarter: 4,
      period: `${a.year} Q4`,
      accessionNumber: a.accessionNumber,
      form: a.form,
      filed: a.filed,
      end: a.end,
      url: a.url,
      xmlUrl: a.xmlUrl,
      dilutedEps: null,
      dilutedShares: null,
    };
    for (const key of [
      ...flow.filter((k) => !["dilutedEps", "dilutedShares"].includes(k)),
      "reportedNetCapex",
      "capexProceeds",
      "financingPrincipal",
    ])
      q4[key] =
        a[key] != null && prior.every((r) => r[key] != null)
          ? a[key] - prior.reduce((s, r) => s + r[key], 0)
          : null;
    quarterly.push(derived(q4));
  }
  quarterly.sort((a, b) => a.end.localeCompare(b.end));
  const latest = quarterly.at(-1),
    xml = xmlCache.get(latest.accessionNumber);
  const dimension = array(
    parser.parse(await (await response(xml.xmlUrl)).text()).xbrl.context,
  ).flatMap((c) =>
    array(c.entity.segment?.explicitMember).map((m) => m["#text"]),
  );
  const channelMembers = [...new Set(dimension)].filter((m) =>
    /OnlineStores|PhysicalStores|ThirdPartySeller|Advertising|Subscription|AmazonWebServicesMember|OtherServices/.test(
      m,
    ),
  );
  for (const member of channelMembers) {
    const revenue = xml.get(
      "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax",
      latest.end,
      75,
      105,
      member,
    );
    if (revenue != null) channels.push({ member, revenue, url: latest.url });
  }
  const priceUrl = `https://query1.finance.yahoo.com/v8/finance/chart/AMZN?period1=1293840000&period2=${Date.parse(asOf) / 1000}&interval=1d&events=splits`;
  const market = (await json(priceUrl)).chart.result[0];
  const splitEvents = Object.values(market.events?.splits ?? {});
  if (splitEvents.some((s) => s.numerator !== 20 || s.denominator !== 1))
    throw new Error("Unexpected split: review share normalization");
  const prices = market.timestamp
    .map((t, i) => ({
      date: new Date(t * 1000).toISOString().slice(0, 10),
      close: market.indicators.quote[0].close[i],
    }))
    .filter((r) => r.close != null);
  const history = annual.map((r) => {
    const p = prices.filter((p) => p.date.slice(0, 4) === `${r.year}`).at(-1);
    const marketCap = p && r.dilutedShares ? p.close * r.dilutedShares : null;
    return {
      year: r.year,
      date: p?.date ?? null,
      close: p?.close ?? null,
      marketCap,
      priceToSales: marketCap && r.revenue ? marketCap / r.revenue : null,
      priceToEarnings:
        marketCap && r.netIncome > 0 ? marketCap / r.netIncome : null,
      fcfYield:
        marketCap && r.freeCashFlow != null
          ? (r.freeCashFlow / marketCap) * 100
          : null,
    };
  });
  await mkdir(output, { recursive: true });
  const type =
    "export type FinancialRow = {year:number;period?:string;quarter?:number;accessionNumber:string;form:string;filed:string;end:string;url:string;xmlUrl:string;revenue:number|null;costOfSales:number|null;grossProfit:number|null;operatingIncome:number|null;netIncome:number|null;dilutedEps:number|null;dilutedShares:number|null;operatingCashFlow:number|null;capex:number|null;capexProceeds:number|null;netCapex:number|null;freeCashFlow:number|null;fcfGrossCapex:number|null;stockComp:number|null;depreciation:number|null;financePrincipal:number|null;financingPrincipal:number|null;cashAfterFinancingPrincipal:number|null;grossMargin:number|null;operatingMargin:number|null;netMargin:number|null;fcfMargin:number|null;roe:number|null;cash?:number|null;securities?:number|null;assets?:number|null;liabilities?:number|null;equity?:number|null;debt?:number|null;spotShares?:number|null;financeLeases?:number|null;operatingLeases?:number|null;inventory?:number|null;};\n";
  await writeFile(
    path.join(output, "annualFinancials.ts"),
    type
      .replace(
        "capexProceeds:number|null;",
        "capexProceeds:number|null;reportedNetCapex?:number|null;",
      )
      .replace(
        "debt?:number|null;",
        "debt?:number|null;debtCurrent?:number|null;debtNoncurrent?:number|null;shortDebt?:number|null;",
      ) +
      `export const AMZN_ANNUAL:FinancialRow[] = ${JSON.stringify(annual, null, 2)};\n`,
  );
  await writeFile(
    path.join(output, "quarterlyFinancials.ts"),
    `import type { FinancialRow } from "./annualFinancials";\nexport const AMZN_QUARTERLY:FinancialRow[] = ${JSON.stringify(quarterly, null, 2)};\n`,
  );
  await writeFile(
    path.join(output, "filings.ts"),
    `export const AMZN_FILINGS = ${JSON.stringify(filings, null, 2)};\n`,
  );
  await writeFile(
    path.join(output, "segmentEconomics.ts"),
    `export const AMZN_SEGMENTS = ${JSON.stringify(segments, null, 2)};\nexport const AMZN_CHANNELS = ${JSON.stringify(channels, null, 2)};\n`,
  );
  await writeFile(
    path.join(output, "valuationHistory.ts"),
    `export const AMZN_PRICE_SOURCE = ${JSON.stringify(priceUrl)};\nexport const AMZN_LATEST_PRICE = ${JSON.stringify(prices.at(-1))};\nexport const AMZN_VALUATION_HISTORY = ${JSON.stringify(history, null, 2)};\nexport const AMZN_SPLIT_EVENTS = ${JSON.stringify(splitEvents)};\n`,
  );
  console.log(
    `Amazon: ${annual.length} annual, ${quarterly.length} quarterly, ${segments.length} segment, ${channels.length} channel and ${filings.length} filing rows. Latest close ${JSON.stringify(prices.at(-1))}`,
  );
  console.log("Latest quarter", latest);
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
