import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
export const root = new URL(
  "../app/research/lululemon-complete-fundamental-analysis/",
  import.meta.url,
);
export const mirror = new URL(
  "../../../svim-labs/project-albatross/src/content/hobiteResearch/research/lululemon-complete-fundamental-analysis/",
  import.meta.url,
);
export function adapt(s) {
  return s
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "")
    .replaceAll(
      'href="/research/lululemon-complete-fundamental-analysis/zh"',
      'href="/research/zh-lululemon-complete-fundamental-analysis"',
    )
    .replaceAll('href="/research"', 'href="/blog"');
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
if (process.argv[1]?.endsWith("mirror-lulu-research.mjs")) {
  for (const f of await files(root)) {
    const target = new URL(f, mirror);
    await mkdir(new URL(".", target), { recursive: true });
    await writeFile(target, adapt(await readFile(new URL(f, root), "utf8")));
  }
  console.log("LULU EN/ZH mirrored into SVIM");
}
