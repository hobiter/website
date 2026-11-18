import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { XMLParser } from "fast-xml-parser";
import { managers, corporateActions, tickerLabels, findNode, asText, normalizeRows, combine, compare, top, reconcileReports } from "./lib/manager-13f.mjs";

const cutoff = "2026-11-17";
const cache = new URL("../.cache/q3-2026-13f/", import.meta.url);
const out = new URL("../app/research/q3-2026-13f-investment-managers/", import.meta.url);
const downloads = new URL("../public/research/q3-2026-13f/", import.meta.url);
const parser = new XMLParser({ removeNSPrefix: true, parseTagValue: false, ignoreAttributes: false });
await mkdir(cache, { recursive: true });
await mkdir(out, { recursive: true });
await mkdir(downloads, { recursive: true });
let lastRequest = 0;
async function get(url, json = false) {
  const path = new URL(createHash("sha256").update(url).digest("hex") + ".txt", cache);
  let text;
  try { text = await readFile(path, "utf8"); }
  catch {
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 260 - (Date.now() - lastRequest))));
    lastRequest = Date.now();
    const r = await fetch(url, { headers: { "User-Agent": "Hobite Research contact@hobite.vercel.app", Accept: "application/json,application/xml,text/xml,*/*" } });
    if (!r.ok) throw Error(`${r.status}: ${url}`);
    text = await r.text();
    await writeFile(path, text);
  }
  return json ? JSON.parse(text) : text;
}
function records(r) {
  return r.accessionNumber.map((accession, i) => ({ accession, form: r.form[i], filed: r.filingDate[i], period: r.reportDate[i], primary: r.primaryDocument[i] }));
}
async function filing(manager, record) {
  const base = `https://www.sec.gov/Archives/edgar/data/${manager.cik}/${record.accession.replaceAll("-", "")}/`;
  const listing = await get(base + "index.json", true);
  const primary = record.primary.split("/").at(-1);
  const primaryText = await get(base + primary);
  const doc = parser.parse(primaryText);
  const coverPeriod = asText(findNode(doc, "reportCalendarOrQuarter"));
  const normalizedPeriod = /^\d{2}-\d{2}-\d{4}$/.test(coverPeriod) ? `${coverPeriod.slice(6)}-${coverPeriod.slice(0, 2)}-${coverPeriod.slice(3, 5)}` : coverPeriod;
  if (normalizedPeriod !== record.period) throw Error(`${manager.name}: unexpected cover period ${coverPeriod}`);
  const entries = listing.directory.item.filter(f => /\.xml$/i.test(f.name) && f.name !== primary);
  const rows = [], tables = [];
  for (const entry of entries) {
    const text = await get(base + entry.name);
    const tree = parser.parse(text);
    if (findNode(tree, "infoTable")) {
      rows.push(...normalizeRows(tree));
      tables.push({ url: base + entry.name, sha256: createHash("sha256").update(text).digest("hex") });
    }
  }
  const expectedCount = Number(asText(findNode(doc, "tableEntryTotal")));
  const expectedValue = Number(asText(findNode(doc, "tableValueTotal")));
  if (rows.length !== expectedCount) throw Error(`${manager.name}: row mismatch ${rows.length}/${expectedCount}`);
  const sum = rows.reduce((s, r) => s + r.value, 0);
  if (Math.abs(sum - expectedValue) > Math.max(1, expectedCount)) throw Error(`${manager.name}: value mismatch ${sum}/${expectedValue}`);
  const valueMultiplier = ["duquesne", "baupost"].includes(manager.id) ? 1000 : 1;
  const normalizedRows = rows.map(r => ({ ...r, value: r.value * valueMultiplier }));
  return {
    ...record, source: base + (listing.directory.item.find(f => f.name === `${record.accession}-index.html`)?.name ?? `${record.accession}-index.htm`), primaryUrl: base + primary,
    primarySha256: createHash("sha256").update(primaryText).digest("hex"), tables,
    entryCount: rows.length, rawReportedValue: expectedValue, rawSumValue: sum,
    valueMultiplier, reportedValue: expectedValue * valueMultiplier, sumValue: sum * valueMultiplier,
    unitNote: valueMultiplier === 1000 ? "XML values appear in legacy thousands despite current schema. Explicit 1000x analytical normalization; raw totals preserved. Cross-filer same-CUSIP implied prices used for validation." : "USD as filed",
    amendmentType: asText(findNode(doc, "amendmentType")),
    confidential: asText(findNode(doc, "isConfidentialOmitted")).toLowerCase() === "true",
    includedManagers: Number(asText(findNode(doc, "otherIncludedManagersCount"))) || 0,
    rows: normalizedRows,
  };
}
async function quarter(manager, all, period) {
  const selected = all.filter(r => r.period === period && /^13F-HR(\/A)?$/.test(r.form) && r.filed <= cutoff)
    .sort((a, b) => a.filed.localeCompare(b.filed) || a.accession.localeCompare(b.accession));
  if (!selected.length) throw Error(`${manager.name}: no holdings report for ${period}`);
  const reports = [];
  for (const rec of selected) {
    const report = await filing(manager, rec);
    reports.push(report);
  }
  const rows = reconcileReports(reports);
  return { period, reports: reports.map(report => { const metadata = { ...report }; delete metadata.rows; return metadata; }), rows, reportedValue: rows.reduce((s, r) => s + r.value, 0) };
}
const results = [], allComparisons = [], failures = [];
for (const manager of managers) {
  try {
    const sub = await get(`https://data.sec.gov/submissions/CIK${String(manager.cik).padStart(10, "0")}.json`, true);
    const all = records(sub.filings.recent);
    for (const file of sub.filings.files ?? []) {
      if (file.filingTo >= "2026-06-30") all.push(...records(await get(`https://data.sec.gov/submissions/${file.name}`, true)));
    }
    const q2 = await quarter(manager, all, "2026-06-30");
    const q3 = await quarter(manager, all, "2026-09-30");
    const q2Comparable = q2.rows.map(row => {
      const change = corporateActions.find(a => a.from === row.cusip && a.to);
      return change ? { ...row, cusip: change.to, shares: row.shares * change.factor } : row;
    });
    const compared = compare(combine(q2Comparable), combine(q3.rows));
    const q3ShareValue = [...combine(q3.rows).values()].reduce((s, r) => s + r.value, 0);
    const q2ShareValue = [...combine(q2.rows).values()].reduce((s, r) => s + r.value, 0);
    const rows = compared.map(r => ({ ...r, manager: manager.id, q3Weight: q3ShareValue ? r.q3Value / q3ShareValue * 100 : 0, q2Weight: q2ShareValue ? r.q2Value / q2ShareValue * 100 : 0 }));
    allComparisons.push(...rows);
    results.push({ ...manager, filingName: sub.name, coverage: "complete", q2: { ...q2, rows: undefined }, q3: { ...q3, rows: undefined }, q2ShareValue, q3ShareValue,
      sharePositions: rows.filter(r => r.q3Shares > 0).length,
      counts: Object.fromEntries(["new", "increase", "reduce", "exit", "unchanged"].map(a => [a, rows.filter(r => r.action === a && r.instrument === "equity").length])),
      top: Object.fromEntries(["new", "increase", "reduce", "exit", "holdings"].map(a => [a, top(rows, a)])),
      flags: rows.filter(r => r.possibleAction).map(r => ({ cusip: r.cusip, issuer: r.issuer, q2Shares: r.q2Shares, q3Shares: r.q3Shares })),
    });
    console.log(`${manager.id}: ${sub.name}; Q2 ${q2.rows.length} Q3 ${q3.rows.length}; $${(q3.reportedValue / 1e9).toFixed(2)}B; flags ${rows.filter(r => r.possibleAction).length}`);
  } catch (error) {
    failures.push({ ...manager, error: error.message });
    console.error(error.message);
  }
}
if (failures.length) throw Error(`Refusing to replace the published snapshot: ${failures.length} manager(s) failed reconciliation.`);
const globalMap = new Map();
for (const r of allComparisons) {
  if (r.instrument !== "equity") continue;
  if (!globalMap.has(r.cusip)) globalMap.set(r.cusip, { cusip: r.cusip, ticker: tickerLabels[r.cusip] ?? null, issuer: r.issuer, title: r.title, instrument: r.instrument, q2Shares: 0, q3Shares: 0, q2Value: 0, q3Value: 0, changeProxy: 0, buyers: 0, sellers: 0, holders: 0, newManagers: 0, exitManagers: 0, possibleAction: false, structuralEvent: r.structuralEvent });
  const a = globalMap.get(r.cusip);
  for (const field of ["q2Shares", "q3Shares", "q2Value", "q3Value", "changeProxy"]) a[field] += r[field];
  a.buyers += r.deltaShares > 0 ? 1 : 0;
  a.sellers += r.deltaShares < 0 ? 1 : 0;
  a.holders += r.q3Shares > 0 ? 1 : 0;
  a.newManagers += r.action === "new" ? 1 : 0;
  a.exitManagers += r.action === "exit" ? 1 : 0;
  a.possibleAction ||= r.possibleAction;
}
const aggregate = [...globalMap.values()].map(r => ({ ...r, deltaShares: r.q3Shares - r.q2Shares, pct: r.q2Shares ? (r.q3Shares / r.q2Shares - 1) * 100 : null, valueDelta: r.q3Value - r.q2Value,
  changeProxy: (r.q3Shares - r.q2Shares) * (r.q3Shares ? r.q3Value / r.q3Shares : r.q2Shares ? r.q2Value / r.q2Shares : 0),
  action: !r.q2Shares ? "new" : !r.q3Shares ? "exit" : r.q3Shares > r.q2Shares ? "increase" : r.q3Shares < r.q2Shares ? "reduce" : "unchanged" }));
const flaggedCusips = new Set(aggregate.filter(r => r.possibleAction).map(r => r.cusip));
for (const manager of results) {
  const eligible = allComparisons.filter(r => r.manager === manager.id && !flaggedCusips.has(r.cusip));
  manager.top = Object.fromEntries(["new", "increase", "reduce", "exit", "holdings"].map(a => [a, top(eligible, a)]));
}
function grossCategory(category) {
  const groups = new Map();
  for (const r of allComparisons.filter(r => r.action === category && r.instrument === "equity" && !flaggedCusips.has(r.cusip) && !r.structuralEvent)) {
    if (!groups.has(r.cusip)) groups.set(r.cusip, { ...r, q2Shares: 0, q3Shares: 0, q2Value: 0, q3Value: 0, changeProxy: 0, participants: 0 });
    const a = groups.get(r.cusip);
    for (const k of ["q2Shares", "q3Shares", "q2Value", "q3Value", "changeProxy"]) a[k] += r[k];
    a.participants++;
  }
  return [...groups.values()].map(r => ({ ...r, manager: undefined, q2Weight: undefined, q3Weight: undefined, deltaShares: r.q3Shares - r.q2Shares, pct: r.q2Shares ? (r.q3Shares / r.q2Shares - 1) * 100 : null })).sort((a, b) => Math.abs(b.changeProxy) - Math.abs(a.changeProxy)).slice(0, 10);
}
const snapshot = {
  cutoff, q2: "2026-06-30", q3: "2026-09-30", expectedManagers: managers.length, completeManagers: results.length, corporateActions,
  managers: results, failures, totals: {
    q2Reported: results.reduce((s, r) => s + r.q2.reportedValue, 0), q3Reported: results.reduce((s, r) => s + r.q3.reportedValue, 0),
    q2ShareValue: results.reduce((s, r) => s + r.q2ShareValue, 0), q3ShareValue: results.reduce((s, r) => s + r.q3ShareValue, 0),
  },
  aggregate: Object.fromEntries(["new", "increase", "reduce", "exit", "holdings"].map(a => [a, top(aggregate, a)])),
  gross: Object.fromEntries(["new", "increase", "reduce", "exit"].map(a => [a, grossCategory(a)])),
  consensusAdds: aggregate.filter(r => !r.possibleAction && r.buyers > r.sellers).sort((a, b) => b.buyers - a.buyers || b.changeProxy - a.changeProxy).slice(0, 10),
  flagged: aggregate.filter(r => r.possibleAction).map(r => ({ cusip: r.cusip, issuer: r.issuer, q2Shares: r.q2Shares, q3Shares: r.q3Shares })),
  unitChecks: ["duquesne", "baupost"].flatMap(id => ["q2", "q3"].map(period => {
    const shares = `${period}Shares`, value = `${period}Value`;
    const checks = allComparisons.filter(r => r.manager === id && r[shares] > 0 && r[value] > 0).map(r => {
      const other = allComparisons.find(x => x.cusip === r.cusip && !["duquesne", "baupost"].includes(x.manager) && x[shares] > 0 && x[value] > 0);
      return other ? { cusip: r.cusip, issuer: r.issuer, normalizedPrice: r[value] / r[shares], referencePrice: other[value] / other[shares], referenceManager: other.manager } : null;
    }).filter(Boolean);
    const ratios = checks.map(c => c.normalizedPrice / c.referencePrice).sort((a, b) => a - b);
    const medianRatio = ratios[Math.floor(ratios.length / 2)];
    if (!(checks.length > 10 && medianRatio > .99 && medianRatio < 1.01)) throw Error(`Unvalidated legacy unit override: ${id} ${period}`);
    return { manager: id, period, commonSecurities: checks.length, medianRatio, examples: checks.slice(0, 3) };
  })),
};
await writeFile(new URL("snapshot.json", out), JSON.stringify(snapshot, null, 2) + "\n");
const fields = ["manager", "cusip", "ticker", "issuer", "title", "instrument", "action", "q2Shares", "q3Shares", "deltaShares", "pct", "q2Value", "q3Value", "valueDelta", "changeProxy", "q2Weight", "q3Weight", "possibleAction", "structuralEvent"];
const cell = x => '"' + String(typeof x === "string" && /^[=+@-]/.test(x) ? "'" + x : x ?? "").replaceAll('"', '""') + '"';
await writeFile(new URL("comparisons.csv", downloads), [fields.join(","), ...allComparisons.map(r => fields.map(k => cell(r[k])).join(","))].join("\n") + "\n");
await writeFile(new URL("source-manifest.json", downloads), JSON.stringify({ cutoff, managers: results.map(m => ({ id: m.id, name: m.name, cik: m.cik, q2: m.q2, q3: m.q3 })), failures }, null, 2) + "\n");
console.log(`Completed ${results.length}/${managers.length}; ${allComparisons.length} comparisons; ${snapshot.flagged.length} corporate-action candidates`);
if (failures.length) process.exitCode = 1;
