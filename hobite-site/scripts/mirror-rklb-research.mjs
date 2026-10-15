import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
export const root = new URL(
  "../app/research/rocket-lab-complete-fundamental-analysis/",
  import.meta.url,
);
export const mirror = new URL(
  "../../../svim-labs/project-albatross/src/content/hobiteResearch/research/rocket-lab-complete-fundamental-analysis/",
  import.meta.url,
);
export function adapt(s) {
  return s
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "")
    .replaceAll(
      'href="/research/rocket-lab-complete-fundamental-analysis/zh"',
      'href="/research/zh-rocket-lab-complete-fundamental-analysis"',
    )
    .replaceAll('href="/research"', 'href="/blog"')
    .replaceAll("Hobite assumptions", "analyst assumptions")
    .replaceAll("Hobite 假设", "分析师假设");
}
export async function files(dir, prefix = "") {
  const out = [];
  for (const f of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + f.name;
    if (f.isDirectory())
      out.push(...(await files(new URL(f.name + "/", dir), name + "/")));
    else out.push(name);
  }
  return out;
}
if (process.argv[1]?.endsWith("mirror-rklb-research.mjs")) {
  for (const f of await files(root)) {
    const to = new URL(f, mirror);
    await mkdir(new URL(".", to), { recursive: true });
    await writeFile(to, adapt(await readFile(new URL(f, root), "utf8")));
  }
  console.log("RKLB EN/ZH mirrored into SVIM");
}
