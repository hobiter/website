const hobite = process.env.HOBITE_URL ?? "http://localhost:3000";
const svim = process.env.SVIM_URL ?? "http://localhost:4173";
for (const suffix of ["", "/zh"]) {
  const url = `${hobite}/research/rocket-lab-complete-fundamental-analysis${suffix}`;
  const r = await fetch(url);
  const html = await r.text();
  if (
    !r.ok ||
    !html.includes('id="valuation"') ||
    !html.includes('data-company="rklb"') ||
    !html.includes("55.25")
  )
    throw Error(`Hobite route failed ${url}`);
  console.log(`200 + SSR content: ${url}`);
}
const library = await (await fetch(`${hobite}/research`)).text();
for (const href of [
  "/research/rocket-lab-complete-fundamental-analysis",
  "/research/rocket-lab-complete-fundamental-analysis/zh",
])
  if (!library.includes(`href="${href}"`)) throw Error("Missing library link");
for (const slug of [
  "rocket-lab-complete-fundamental-analysis",
  "zh-rocket-lab-complete-fundamental-analysis",
]) {
  const url = `${svim}/research/${slug}`;
  const r = await fetch(url);
  const html = await r.text();
  if (!r.ok || !html.includes('id="root"'))
    throw Error(`SVIM SPA delivery failed ${url}`);
  console.log(
    `200 + SPA delivery (browser rendering checked separately): ${url}`,
  );
}
