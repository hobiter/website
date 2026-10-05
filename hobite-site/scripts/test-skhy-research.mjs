import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { sourceRoot, mirrorRoot } from "./mirror-skhy-research.mjs";

const modules = new Map();
async function load(name) {
  if (modules.has(name)) return modules.get(name);
  let code = ts.transpileModule(await readFile(new URL(`${name}.ts`, sourceRoot), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  for (const match of [...code.matchAll(/from "\.\/([^"\n]+)"/g)]) code = code.replace(match[0], `from "${await load(match[1])}"`);
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  modules.set(name, url);
  return url;
}
const get = async (name) => import(await load(name));
const { SKHY_ANNUAL, SKHY_QUARTERLY } = await get("financialHistory");
const { SKHY_CAPITAL, SKHY_BALANCE } = await get("companyData");
const { SKHY_DCF_CASES, SKHY_MODEL_INPUTS, skhyDcf } = await get("forecastModel");
const { SKHY_REPORT } = await get("reportContent");
const { SKHY_FILINGS } = await get("filings");

assert.equal(SKHY_ANNUAL.length, 16);
assert.deepEqual(SKHY_ANNUAL.map((row) => row.year), Array.from({ length: 16 }, (_, i) => 2010 + i));
assert.equal(SKHY_QUARTERLY.length, 62);
assert.equal(new Set(SKHY_QUARTERLY.map((row) => `${row.year}Q${row.quarter}`)).size, 62);
assert.equal(SKHY_QUARTERLY.at(-1)?.year, 2026);
assert.equal(SKHY_QUARTERLY.at(-1)?.quarter, 2);
assert.equal(SKHY_QUARTERLY.at(-1)?.revenue, 79_318.7);
assert.equal(SKHY_QUARTERLY.at(-1)?.operatingProfit, 60_542.6);
assert.equal(SKHY_QUARTERLY.at(-1)?.netIncome, 93_922.6);
assert.equal(SKHY_ANNUAL.at(-1)?.revenue, 97_146.7);
assert.equal(SKHY_ANNUAL.at(-1)?.operatingProfit, 47_206.3);
assert.equal(SKHY_ANNUAL.at(-1)?.netIncome, 42_947.9);
assert.equal(SKHY_QUARTERLY.find((row) => row.year === 2022 && row.quarter === 4)?.revenue, 7_699);
assert.equal(SKHY_QUARTERLY.find((row) => row.year === 2022 && row.quarter === 3)?.kind, "derived");

for (const annual of SKHY_ANNUAL.filter((row) => row.year >= 2011)) {
  const quarters = SKHY_QUARTERLY.filter((row) => row.year === annual.year);
  assert.equal(quarters.length, 4, `Expected four quarters in ${annual.year}`);
  for (const metric of ["revenue", "operatingProfit", "netIncome"]) {
    const total = quarters.reduce((sum, row) => sum + row[metric], 0);
    assert.ok(Math.abs(total - annual[metric]) < 1, `${annual.year} ${metric} does not reconcile`);
  }
}

assert.equal(SKHY_CAPITAL.adsRatio, 0.1);
assert.equal(SKHY_CAPITAL.postOfferingCommonShares, 728_865_500);
assert.equal(SKHY_CAPITAL.commonSharesBeforeOffering + SKHY_CAPITAL.newCommonShares, SKHY_CAPITAL.postOfferingCommonShares);
assert.equal(SKHY_CAPITAL.issuedCommonSharesBeforeOffering - SKHY_CAPITAL.treasurySharesBeforeOffering, SKHY_CAPITAL.commonSharesBeforeOffering);
assert.ok(Math.abs(SKHY_BALANCE.cashKrwTrillion + SKHY_BALANCE.shortTermFinancialInstrumentsKrwTrillion - 49.233545) < 1e-6);
assert.ok(Math.abs(SKHY_MODEL_INPUTS.ipoNetProceedsKrwTrillion - 35.177168) < 1e-6);
assert.ok(Math.abs(SKHY_MODEL_INPUTS.currentImpliedEquityValueUsdTrillion - 1.422) < 0.01);

for (const scenario of ["bear", "base", "bull"]) {
  const result = SKHY_DCF_CASES[scenario];
  assert.equal(result.forecast.length, 10);
  assert.ok(result.enterpriseValue > 0 && result.netCash > 0);
  assert.ok(result.forecast.every((year) => Number.isFinite(year.fcff)));
}
assert.ok(skhyDcf("base", 0.12, 0.02).priceUsdPerAds < skhyDcf("base", 0.09, 0.02).priceUsdPerAds);
assert.equal(SKHY_REPORT.length, 12);
assert.ok(SKHyFilingsCheck(SKHY_FILINGS));

const sourceFiles = (await recursiveFiles(sourceRoot)).sort();
const mirroredFiles = (await recursiveFiles(mirrorRoot)).sort();
assert.deepEqual(mirroredFiles, sourceFiles);
for (const name of sourceFiles) {
  const source = await readFile(new URL(name, sourceRoot), "utf8");
  const mirror = await readFile(new URL(name, mirrorRoot), "utf8");
  if (name === "page.tsx" || name === "zh/page.tsx") {
    assert.ok(!mirror.includes("Metadata"));
  } else if (name === "SkhynixResearchView.tsx") {
    assert.ok(mirror.includes("/blog/sk-hynix-complete-fundamental-analysis"));
    assert.ok(mirror.includes("/blog/zh-sk-hynix-complete-fundamental-analysis"));
  } else assert.equal(mirror, source, `${name} differs from Hobite`);
}
console.log("SKHY source, accounting, quarterly bridges, ADS/IPO, DCF and mirror checks passed.");

function SKHyFilingsCheck(rows) { return rows.length > 0 && rows.some((row) => row.form === "6-K") && rows.some((row) => row.form === "424B4"); }
async function recursiveFiles(root, prefix = "") {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => entry.isDirectory()
    ? recursiveFiles(new URL(`${entry.name}/`, root), `${prefix}${entry.name}/`)
    : [`${prefix}${entry.name}`]))).flat();
}
