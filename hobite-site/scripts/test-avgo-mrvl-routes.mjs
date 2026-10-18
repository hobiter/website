import assert from "node:assert/strict";

const slug = "broadcom-marvell-ai-semiconductor-moat";
const hobite = process.env.HOBITE_URL ?? "http://localhost:3000";
const svim = process.env.SVIM_URL ?? "http://localhost:4173";
for (const suffix of ["", "/zh"]) {
  const url = `${hobite}/research/${slug}${suffix}`;
  const r = await fetch(url);
  const html = await r.text();
  assert.equal(r.status, 200, url);
  for (const id of ["google", "scenario", "monitor", "sources"]) assert.ok(html.includes(`id="${id}"`));
  console.log(`200 + prerendered article: ${url}`);
}
const library = await (await fetch(`${hobite}/research`)).text();
for (const suffix of ["", "/zh"]) assert.ok(library.includes(`href="/research/${slug}${suffix}"`));
for (const route of [slug, `zh-${slug}`]) {
  const url = `${svim}/research/${route}`;
  const r = await fetch(url);
  const html = await r.text();
  assert.equal(r.status, 200, url);
  assert.ok(html.includes('id="root"'));
  console.log(`200 + SPA delivery; rendered content checked separately in browser: ${url}`);
}
