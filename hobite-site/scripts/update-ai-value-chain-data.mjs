import { writeFile } from "node:fs/promises";

const cutoff = "2026-10-04";
const issuers = { MSFT: "789019", GOOGL: "1652044", AMZN: "1018724", META: "1326801", NVDA: "1045810", AVGO: "1730168", TSM: "1046179", ASML: "937966", ANET: "1596532", ETN: "1551182", VRT: "1674101", MU: "723125", AMD: "2488", CEG: "1868275", VST: "1692819" };
const fields = {
  revenue: ["RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet", "Revenue"],
  operatingIncome: ["OperatingIncomeLoss", "ProfitLossFromOperatingActivities"],
  netIncome: ["NetIncomeLoss", "ProfitLoss", "ProfitLossAttributableToOwnersOfParent"],
  cfo: ["NetCashProvidedByUsedInOperatingActivities", "CashFlowsFromUsedInOperatingActivities"],
  capex: ["PaymentsToAcquireProductiveAssets", "PaymentsToAcquirePropertyPlantAndEquipment", "PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities", "PurchaseOfPropertyPlantAndEquipment"],
  sbc: ["ShareBasedCompensation"],
  depreciation: ["DepreciationDepletionAndAmortization", "DepreciationDepletionAndAmortizationPropertyPlantAndEquipment", "DepreciationAndAmortization"],
  eps: ["EarningsPerShareDiluted", "DilutedEarningsLossPerShare"],
  dilutedShares: ["WeightedAverageNumberOfDilutedSharesOutstanding", "AdjustedWeightedAverageShares"],
};
const instantFields = { cash: ["CashAndCashEquivalentsAtCarryingValue", "CashAndCashEquivalents"], assets: ["Assets"], equity: ["StockholdersEquity", "Equity"], shares: ["CommonStockSharesOutstanding", "EntityCommonStockSharesOutstanding"] };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function get(url) {
  for (let i = 0; i < 4; i++) {
    const response = await fetch(url, { headers: { "User-Agent": "HobiteResearch/1.0 (https://hobite.vercel.app)", Accept: "application/json" } });
    if (response.ok) return response.json();
    if (i === 3) throw new Error(`${url}: HTTP ${response.status}`);
    await wait(1000 * (i + 1));
  }
}
const duration = (row) => row.start ? (Date.parse(row.end) - Date.parse(row.start)) / 86400000 : 0;
function candidates(facts, tags) {
  const rows = [];
  for (const [namespace, group] of Object.entries(facts)) for (const [priority, tag] of tags.entries()) {
    for (const [currency, values] of Object.entries(group[tag]?.units ?? {})) for (const row of values) {
      if (row.filed > cutoff || row.end > cutoff || !["10-K", "10-Q", "20-F", "6-K", "10-K/A", "10-Q/A"].includes(row.form)) continue;
      rows.push({ ...row, currency, tag: `${namespace}:${tag}`, priority });
    }
  }
  return rows;
}
const fact = (row, cik) => row ? { value: row.val, currency: row.currency, start: row.start ?? null, end: row.end, filed: row.filed, tag: row.tag, source: `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${row.accn.replaceAll("-", "")}/` } : null;
function select(facts, tags, cik, end, min, max) {
  const rows = candidates(facts, tags).filter((row) => row.end === end && duration(row) >= min && duration(row) <= max);
  rows.sort((a, b) => b.filed.localeCompare(a.filed) || a.priority - b.priority || duration(a) - duration(b));
  return fact(rows[0], cik);
}
const output = [];
for (const [ticker, cik] of Object.entries(issuers)) {
  const padded = cik.padStart(10, "0");
  const submissions = await get(`https://data.sec.gov/submissions/CIK${padded}.json`);
  await wait(250);
  const { facts } = await get(`https://data.sec.gov/api/xbrl/companyfacts/CIK${padded}.json`);
  const revenue = candidates(facts, fields.revenue);
  const annualEnds = [...new Set(revenue.filter((row) => duration(row) >= 300 && duration(row) <= 400).map((row) => row.end))].sort().slice(-4);
  const quarterEnd = revenue.filter((row) => duration(row) >= 60 && duration(row) <= 110).map((row) => row.end).sort().at(-1);
  const flow = (end, min, max) => Object.fromEntries(Object.entries(fields).map(([key, tags]) => [key, select(facts, tags, cik, end, min, max)]));
  const balance = (end) => Object.fromEntries(Object.entries(instantFields).map(([key, tags]) => [key, select(facts, tags, cik, end, 0, 0)]));
  const recent = submissions.filings.recent;
  const filings = recent.form.flatMap((form, i) => ["10-K", "10-Q", "20-F", "6-K"].includes(form) && recent.filingDate[i] <= cutoff ? [{ form, date: recent.filingDate[i], reportDate: recent.reportDate[i], url: `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${recent.accessionNumber[i].replaceAll("-", "")}/${recent.primaryDocument[i]}` }] : []).slice(0, 6);
  output.push({ ticker, cik, name: submissions.name, annual: annualEnds.map((end) => ({ end, ...flow(end, 300, 400) })), latestQuarter: quarterEnd ? { end: quarterEnd, ...flow(quarterEnd, 60, 110), ytd: flow(quarterEnd, 110, 300), balance: balance(quarterEnd) } : null, filings });
  console.log(`${ticker}: ${annualEnds.length} annuals, quarter ${quarterEnd ?? "not in companyfacts"}, ${filings.length} filings`);
  await wait(250);
}
await writeFile(new URL("../app/research/ai-value-chain-investment-outlook/financialHistory.ts", import.meta.url), `// SEC companyfacts snapshot; per-field dates, currencies and tags are retained.\nexport const FINANCIAL_HISTORY = ${JSON.stringify(output, null, 2)};\n`);
