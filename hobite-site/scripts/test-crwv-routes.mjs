import assert from "node:assert/strict";
for (const [path, title] of [
  [
    "/research/coreweave-complete-fundamental-analysis",
    "CoreWeave (CRWV) Complete Fundamental Analysis",
  ],
  [
    "/research/coreweave-complete-fundamental-analysis/zh",
    "CoreWeave（CRWV）完整基本面研究",
  ],
]) {
  const r = await fetch("http://localhost:3000" + path);
  assert.equal(r.status, 200, path);
  const html = await r.text();
  assert.ok(html.includes(title), path);
  for (const id of [
    "report",
    "charts",
    "model",
    "operations",
    "financials",
    "market",
    "filings",
    "audit",
  ])
    assert.ok(html.includes(`id="${id}"`), `${path} ${id}`);
  console.log("PASS HTTP/SSR", path);
}
const library = await (await fetch("http://localhost:3000/research")).text();
assert.ok(
  library.includes("/research/coreweave-complete-fundamental-analysis/zh"),
);
console.log("PASS Hobite library links");
for (const path of [
  "/research/coreweave-complete-fundamental-analysis",
  "/research/zh-coreweave-complete-fundamental-analysis",
]) {
  const r = await fetch("http://127.0.0.1:4173" + path);
  assert.equal(r.status, 200);
  assert.ok((await r.text()).includes('id="root"'));
  console.log("PASS SVIM SPA route delivery", path);
}
