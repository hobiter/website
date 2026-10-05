import { mkdir, writeFile } from "node:fs/promises";

const api = "https://news.skhynix.com/wp-json/wp/v2/posts";
const headers = { "User-Agent": "Hobite Capital research contact research@hobite.capital" };
const archive = [];
for (let page = 1; page <= 2; page += 1) {
  const response = await fetch(`${api}?search=financial%20results&per_page=100&page=${page}&_fields=id,date,link,title`, { headers });
  if (!response.ok) throw new Error(`Issuer archive returned ${response.status}`);
  archive.push(...await response.json());
}
const candidates = archive.filter((post) => /financial results|financial performance/i.test(post.title.rendered));
const legacyIds = [2190,2360,2564,2734,2859,3186,3306,3427,3537,3695,3898,4092,4276,4468,4650,4761,4919,4983,4996,5007,5021,5025,5029,5036,5039,5043,5046,5055,5062,5069,5075,5081,5082,5083,5085,5088,5090,5094,5098,5103,5113,5114,5118,5119,5120,5127,5140,5145,5146,5147,5149,5154,5155,5163,5164];
const candidateIds = new Set(candidates.map((post) => post.id));
for (const id of legacyIds) if (!candidateIds.has(id)) candidates.push({ id });
const posts = [];
for (const post of candidates) {
  const response = await fetch(`${api}/${post.id}?_fields=id,date,link,title,content`, { headers });
  if (!response.ok) continue;
  const detail = await response.json();
  if (detail.content?.rendered) posts.push(detail);
}

function clean(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&#8217;|&rsquo;/g, "'").replace(/&amp;/g, "&").replace(/&minus;/g, "-").replace(/\s+/g, " ").trim();
}
function rowsOf(html) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
    [...row[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) => clean(cell[1])).filter(Boolean),
  ).filter((row) => row.length > 1);
}
function valuesFrom(html, period) {
  const tables = [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((table) => ({ html: table[1], rows: rowsOf(table[1]) }));
  const qLabel = `${period.quarter}Q${String(period.year).slice(-2)}`;
  const annualLabel = `FY${String(period.year).slice(-2)}`;
  const chosen = tables.find(({ rows }) => rows.some((row) => row.some((cell) => cell.replace(/[’']/g, "").replace(/\s/g, "").toUpperCase() === (period.kind === "annual" ? annualLabel : qLabel))))
    ?? tables.find(({ rows }) => rows.some((row) => row.some((cell) => cell.replace(/[’']/g, "").replace(/\s/g, "").toUpperCase() === (period.kind === "annual" ? String(period.year) : qLabel))));
  if (chosen) {
    const result = {};
    for (const row of chosen.rows) {
      const label = row[0].toLowerCase();
      const key = /^(revenues?|sales)$/.test(label) ? "revenue" : /operating profit/.test(label) ? "operatingProfit" : /net income|net loss|profit for the period/.test(label) ? "netIncome" : null;
      if (!key) continue;
      const raw = row.slice(1).find((cell) => /^\(?-?[\d,]+(?:\.\d+)?\)?$/.test(cell.replace(/\s/g, "")));
      if (raw) result[key] = Number(raw.replace(/[(),]/g, (match) => match === "(" ? "-" : ""));
    }
    if (Object.keys(result).length >= 2) return result;
  }
  const text = clean(html);
  const number = "(-?\\d[\\d,]*(?:\\.\\d+)?)";
  const patterns = [
    ["revenue", new RegExp(`(?:consolidated )?(?:revenue|sales)[\\s\\S]{0,90}?${number}\\s*(trillion|billion)\\s*won`, "i")],
    ["operatingProfit", new RegExp(`operating (profit|loss)(?: for the (?:year|quarter))?\\s*(?:(?:amounted to|totaled|was|were|of|at)\\s*)${number}\\s*(trillion|billion)\\s*won`, "i")],
    ["netIncome", new RegExp(`net (income|profit|loss)(?: for the (?:year|quarter))?\\s*(?:(?:amounted to|totaled|was|were|of|at)\\s*)?${number}\\s*(trillion|billion)\\s*won`, "i")],
  ];
  const result = {};
  for (const [key, pattern] of patterns) {
    const found = text.match(pattern);
    if (found) {
      const fieldIndex = key === "revenue" ? 1 : 2;
      const unitIndex = key === "revenue" ? 2 : 3;
      const multiplier = found[unitIndex].toLowerCase() === "trillion" ? 1000 : 1;
      const loss = key !== "revenue" && found[1].toLowerCase() === "loss";
      result[key] = (loss ? -1 : 1) * Number(found[fieldIndex].replaceAll(",", "")) * multiplier;
    }
  }
  return result;
}
function periodOf(title) {
  const normalized = title.replace(/[’']/g, "");
  const long = normalized.match(/\b(first|second|third|fourth) quarter\s+(20\d{2})\b/i);
  const reverseLong = normalized.match(/\b(20\d{2})\D{0,20}\b(first|second|third|fourth) quarter\b/i);
  const short = normalized.match(/\b([1-4])Q\s?[' ]?(20\d{2}|\d{2})\b/i);
  const fy = normalized.match(/\bFY\s?[' ]?(20\d{2}|\d{2})\b/i);
  const firstFyQuarter = normalized.match(/\bfirst quarter of FY\s?(20\d{2}|\d{2})\b/i);
  if (firstFyQuarter) {
    const fyYear = Number(firstFyQuarter[1]);
    return { year: fyYear < 100 ? 2000 + fyYear : fyYear, quarter: 1, kind: "quarter" };
  }
  const year = Number((long?.[2] ?? reverseLong?.[1] ?? short?.[2] ?? fy?.[1] ?? normalized.match(/\b20\d{2}\b/)?.[0]) ?? "0");
  if (!year) return null;
  const actualYear = year < 100 ? 2000 + year : year;
  let quarter = Number(short?.[1] ?? 0);
  if (long) quarter = ({ first: 1, second: 2, third: 3, fourth: 4 })[long[1].toLowerCase()];
  if (reverseLong) quarter = ({ first: 1, second: 2, third: 3, fourth: 4 })[reverseLong[2].toLowerCase()];
  if (!quarter && /fourth quarter|4Q|FY\d/i.test(normalized)) quarter = 4;
  if (fy) return { year: actualYear, kind: "annual" };
  return quarter ? { year: actualYear, quarter, kind: "quarter" } : (/fiscal year|FY\d/i.test(normalized) ? { year: actualYear, kind: "annual" } : null);
}
const annual = new Map();
const quarterly = new Map();
for (const post of posts) {
  const period = periodOf(post.title.rendered);
  if (!period) continue;
  const data = valuesFrom(post.content.rendered, period);
  if (!data.revenue || data.operatingProfit == null || data.netIncome == null) continue;
  const row = { ...period, ...data, date: post.date.slice(0, 10), source: post.link };
  const map = period.kind === "annual" ? annual : quarterly;
  const key = period.kind === "annual" ? String(period.year) : `${period.year}-Q${period.quarter}`;
  const prior = map.get(key);
  if (!prior || Object.keys(row).length > Object.keys(prior).length || row.date > prior.date) map.set(key, row);
  if (period.kind === "quarter" && period.quarter === 4) {
    const annualData = valuesFrom(post.content.rendered, { year: period.year, kind: "annual" });
    if (annualData.revenue && annualData.operatingProfit != null && annualData.netIncome != null) annual.set(String(period.year), { year: period.year, kind: "annual", ...annualData, date: post.date.slice(0, 10), source: post.link });
  }
  if (period.kind === "annual") {
    const q4 = valuesFrom(post.content.rendered, { year: period.year, quarter: 4, kind: "quarter" });
    if (q4.revenue && q4.operatingProfit != null && q4.netIncome != null) quarterly.set(`${period.year}-Q4`, { year: period.year, quarter: 4, kind: "quarter", ...q4, date: post.date.slice(0, 10), source: post.link });
  }
}
const sourceById = (id) => posts.find((post) => post.id === id)?.link;
const q2_2022 = quarterly.get("2022-Q2");
if (q2_2022) q2_2022.netIncome = 2880;
quarterly.set("2022-Q4", {
  year: 2022, quarter: 4, kind: "quarter", revenue: 7699,
  operatingProfit: -1701, netIncome: -3524,
  date: "2023-02-01", source: sourceById(2859),
});
const getQuarter = (year, quarter) => quarterly.get(`${year}-Q${quarter}`);
const deriveQuarter = (year, quarter, annualRow, knownRows) => {
  const fields = ["revenue", "operatingProfit", "netIncome"];
  const derived = Object.fromEntries(fields.map((field) => [
    field,
    annualRow[field] - knownRows.reduce((sum, row) => sum + row[field], 0),
  ]));
  quarterly.set(`${year}-Q${quarter}`, {
    year, quarter, kind: "derived", ...derived,
    date: annualRow.date,
    source: annualRow.source,
    supportingSources: knownRows.map((row) => row.source),
  });
};
for (const annualRow of annual.values()) {
  const { year } = annualRow;
  if (year < 2011) continue;
  const q1 = getQuarter(year, 1), q2 = getQuarter(year, 2), q3 = getQuarter(year, 3), q4 = getQuarter(year, 4);
  if (q1 && q2 && q3 && q4) {
    const close = ["revenue", "operatingProfit", "netIncome"].filter((field) => Math.abs(q4[field] - annualRow[field]) <= Math.max(1, Math.abs(annualRow[field]) * 0.015)).length;
    if (close >= 2 && year !== 2022) deriveQuarter(year, 4, annualRow, [q1, q2, q3]);
  }
  if (q1 && q2 && q4 && !q3) deriveQuarter(year, 3, annualRow, [q1, q2, q4]);
}
const annualRows = [...annual.values()].sort((a, b) => a.year - b.year);
const quarterlyRows = [...quarterly.values()].filter((row) => row.year >= 2011).sort((a, b) => a.year - b.year || a.quarter - b.quarter);
if (annualRows.length < 12 || quarterlyRows.length < 40) throw new Error(`Issuer archive parser coverage too low: ${annualRows.length} annuals and ${quarterlyRows.length} quarters`);
const content = `/* Generated from SK hynix Newsroom's official earnings archive. Amounts are KRW billions; sources and release dates are retained per row. */\nexport type SKHYFinancialRow = { year: number; revenue: number; operatingProfit: number; netIncome: number; date: string; source: string; kind?: string; quarter?: number; supportingSources?: string[] };\nexport const SKHY_ANNUAL: SKHYFinancialRow[] = ${JSON.stringify(annualRows, null, 2)};\nexport const SKHY_QUARTERLY: SKHYFinancialRow[] = ${JSON.stringify(quarterlyRows, null, 2)};\n`;
const output = new URL("../app/research/sk-hynix-complete-fundamental-analysis/financialHistory.ts", import.meta.url);
await mkdir(new URL("../app/research/sk-hynix-complete-fundamental-analysis/", import.meta.url), { recursive: true });
await writeFile(output, content);
const secResponse = await fetch("https://data.sec.gov/submissions/CIK0002120882.json", { headers });
if (!secResponse.ok) throw new Error(`SEC submissions returned ${secResponse.status}`);
const sec = await secResponse.json();
const recent = sec.filings.recent;
const filings = recent.form.flatMap((form, i) => {
  if (!/^(?:20-F|6-K|F-1|F-6|424B[1-5]|S-8)$/i.test(form)) return [];
  const accession = recent.accessionNumber[i];
  return [{
    form, date: recent.filingDate[i], reportDate: recent.reportDate[i],
    accession, document: recent.primaryDocument[i],
    title: recent.primaryDocDescription[i] || form,
    url: `https://www.sec.gov/Archives/edgar/data/2120882/${accession.replaceAll("-", "")}/${recent.primaryDocument[i]}`,
  }];
});
const filingOutput = new URL("../app/research/sk-hynix-complete-fundamental-analysis/filings.ts", import.meta.url);
await writeFile(filingOutput, `/* SEC EDGAR submissions for SK hynix Inc. CIK 0002120882. */\nexport const SKHY_FILINGS = ${JSON.stringify(filings, null, 2)} as const;\n`);
console.log(`Wrote ${annualRows.length} annuals, ${quarterlyRows.length} quarters and ${filings.length} SEC filings.`);
