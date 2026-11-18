export const managers = [
  ["berkshire", "Berkshire Hathaway", 1067983],
  ["pershing", "Pershing Square (Pershing Square Inc.)", 2026053],
  ["bridgewater", "Bridgewater Associates", 1350694],
  ["renaissance", "Renaissance Technologies", 1037389],
  ["citadel", "Citadel Advisors", 1423053],
  ["millennium", "Millennium Management", 1273087],
  ["deshaw", "D. E. Shaw", 1009207],
  ["twosigma", "Two Sigma Investments", 1179392],
  ["point72", "Point72 Asset Management", 1603466],
  ["tiger", "Tiger Global Management", 1167483],
  ["coatue", "Coatue Management", 1135730],
  ["viking", "Viking Global Investors", 1103804],
  ["lonepine", "Lone Pine Capital", 1061165],
  ["thirdpoint", "Third Point", 1040273],
  ["soros", "Soros Fund Management", 1029160],
  ["duquesne", "Duquesne Family Office", 1536411],
  ["appaloosa", "Appaloosa LP", 1656456],
  ["baupost", "Baupost Group", 1061768],
  ["greenlight", "Greenlight (DME Capital Management)", 1489933],
  ["tci", "TCI Fund Management", 1647251],
].map(([id, name, cik]) => ({ id, name, cik }));

export const array = x => x == null ? [] : Array.isArray(x) ? x : [x];
export const corporateActions = [
  { from: "30231G102", to: "30233Q108", factor: 1, issuer: "ExxonMobil Holdings", note: "July 1 one-for-one holding-company reorganization; matched rather than new/exit", url: "https://www.sec.gov/Archives/edgar/data/2115436/000211543626000020/xom-20260930.htm" },
  { from: "881624209", to: "M8769Q102", factor: 1, issuer: "Teva", note: "September 14 one-for-one ADS-to-ordinary conversion; matched rather than new/exit", url: "https://www.sec.gov/Archives/edgar/data/818686/000119312526390562/d503082d8k.htm" },
  { from: "285512109", to: null, issuer: "Electronic Arts", note: "Q3 acquisition completion; disappearance excluded from trade-like rankings", url: "https://www.ea.com/ea-studios/ea-sports/news/ea-announces-completion-of-acquisition" },
  { from: "16115Q308", to: null, issuer: "Chart Industries", note: "July 16 acquisition completion; disappearance excluded from trade-like rankings", url: "https://investors.bakerhughes.com/news/press-releases/news-details/2026/Baker-Hughes-Completes-Acquisition-of-Chart-Industries/default.aspx" },
  { from: "947890109", to: null, issuer: "Webster Financial", note: "August 20 acquisition completion; disappearance excluded from trade-like rankings", url: "https://www.websterbank.com/santander-bank/" },
];
export const tickerLabels = { "78392B206": "SKHY", "45866F104": "ICE", "79466L302": "CRM", "57636Q104": "MA", "023135106": "AMZN", "30303M102": "META", "82509L107": "SHOP", "235851102": "DHR", "43849R105": "HONA", "H01301128": "ALC", "594918104": "MSFT", "458140100": "INTC", "595112103": "MU", "874039100": "TSM", "88160R101": "TSLA", "67066G104": "NVDA", "149123101": "CAT", "02079K305": "GOOGL", "02079K107": "GOOG", "007903107": "AMD", "84615Q103": "SPCX", "037833100": "AAPL", "G7997R103": "STX", "437076102": "HD", "808513105": "SCHW", "G54950103": "LIN", "907818108": "UNP", "219350105": "GLW", "617446448": "MS", "526057104": "LEN", "00287Y109": "ABBV", "166764100": "CVX", "093712107": "BE", "084670702": "BRK.B", "060505104": "BAC", "025816109": "AXP", "191216100": "KO", "615369105": "MCO", "92826C839": "V", "30233Q108": "XOM", "M8769Q102": "TEVA" };
export function findNode(tree, key) {
  if (!tree || typeof tree !== "object") return undefined;
  if (Object.hasOwn(tree, key)) return tree[key];
  for (const value of Object.values(tree)) {
    if (typeof value === "object") { const result = findNode(value, key); if (result !== undefined) return result; }
  }
}
export const asText = x => String(x?.["#text"] ?? x ?? "").trim();
export function reconcileReports(reports) {
  let rows = [];
  for (const report of reports) {
    if (report.form === "13F-HR" || /RESTATEMENT/i.test(report.amendmentType)) rows = report.rows;
    else if (/NEW HOLDINGS/i.test(report.amendmentType)) rows = [...rows, ...report.rows];
    else throw Error(`Unknown amendment semantics: ${report.amendmentType}`);
  }
  return rows;
}
export function instrument(row) {
  if (row.option) return "option";
  if (row.shareType !== "SH") return "principal";
  if (/WARRANT|\bWTS?\b|\bRIGHTS?\b|PFD|PREF|DEBENT|\bNOTE\b|\bBOND\b/i.test(row.title)) return "other";
  if (/ISHARES|SPDR|VANGUARD|PROSHARES|DIREXION|INVESCO.*(ETF|TR)|ETF|EXCHANGE TRADED|SELECT SECTOR|SCHWAB.*(TR|FUND)|FIDELITY.*(TR|ETF)|INDEX (FD|FUND)|ARK ETF/i.test(row.issuer + " " + row.title)) return "fund";
  return "equity";
}
export function normalizeRows(tree) {
  return array(findNode(tree, "infoTable")).map(r => {
    const row = {
      issuer: asText(r.nameOfIssuer), title: asText(r.titleOfClass), cusip: asText(r.cusip).padStart(9, "0"),
      value: Number(asText(r.value)), shares: Number(asText(r.shrsOrPrnAmt?.sshPrnamt)),
      shareType: asText(r.shrsOrPrnAmt?.sshPrnamtType).toUpperCase(), option: asText(r.putCall).toUpperCase(),
    };
    if (!Number.isFinite(row.value) || !Number.isFinite(row.shares) || row.value < 0 || row.shares < 0 || row.cusip.length !== 9) throw Error("Invalid information-table row");
    return { ...row, instrument: instrument(row) };
  });
}
export function combine(rows) {
  const map = new Map();
  for (const row of rows) {
    if (row.option || row.shareType !== "SH") continue;
    const key = row.cusip;
    if (map.has(key)) { const old = map.get(key); old.value += row.value; old.shares += row.shares; }
    else map.set(key, { ...row });
  }
  return map;
}
export function compare(q2, q3) {
  const output = [];
  for (const cusip of new Set([...q2.keys(), ...q3.keys()])) {
    const old = q2.get(cusip), current = q3.get(cusip), security = current ?? old;
    const q2Shares = old?.shares ?? 0, q3Shares = current?.shares ?? 0;
    const q2Value = old?.value ?? 0, q3Value = current?.value ?? 0;
    const deltaShares = q3Shares - q2Shares;
    const price = q3Shares > 0 ? q3Value / q3Shares : q2Shares > 0 ? q2Value / q2Shares : 0;
    const priceRatio = old?.shares && current?.shares && current.value ? (old.value / old.shares) / (current.value / current.shares) : null;
    const shareRatio = q2Shares ? q3Shares / q2Shares : null;
    const possibleAction = priceRatio != null && shareRatio != null && [2, 3, 4, 5, 10, 20, .5, .333333, .25, .2, .1, .05].some(f => Math.abs(priceRatio / f - 1) < .12 && Math.abs(shareRatio / f - 1) < .02);
    output.push({ cusip, ticker: tickerLabels[cusip] ?? null, issuer: security.issuer, title: security.title, instrument: security.instrument,
      q2Shares, q3Shares, deltaShares, pct: q2Shares ? deltaShares / q2Shares * 100 : null,
      q2Value, q3Value, valueDelta: q3Value - q2Value, changeProxy: deltaShares * price,
      action: !old ? "new" : !current ? "exit" : deltaShares > 0 ? "increase" : deltaShares < 0 ? "reduce" : "unchanged",
      possibleAction, structuralEvent: corporateActions.some(a => a.from === cusip && a.to == null),
    });
  }
  return output;
}
export function top(rows, category, limit = 10) {
  const eligible = rows.filter(r => r.instrument === "equity" && !r.possibleAction && !r.structuralEvent);
  const selected = category === "holdings" ? eligible.filter(r => r.q3Value > 0) : eligible.filter(r => r.action === category);
  const metric = category === "holdings" ? r => r.q3Value : r => Math.abs(r.changeProxy);
  return selected.sort((a, b) => metric(b) - metric(a) || a.cusip.localeCompare(b.cusip)).slice(0, limit);
}
