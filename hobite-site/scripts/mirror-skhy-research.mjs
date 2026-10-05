import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";

export const sourceRoot = new URL("../app/research/sk-hynix-complete-fundamental-analysis/", import.meta.url);
export const mirrorRoot = new URL("../../../svim-labs/project-albatross/src/content/hobiteResearch/research/sk-hynix-complete-fundamental-analysis/", import.meta.url);

export function adapt(source) {
  let result = source
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "");
  for (const [from, to] of [
    ["/research/sk-hynix-complete-fundamental-analysis/zh", "/blog/zh-sk-hynix-complete-fundamental-analysis"],
    ["/research/sk-hynix-complete-fundamental-analysis", "/blog/sk-hynix-complete-fundamental-analysis"],
    ["/research", "/blog"],
  ]) result = result.replaceAll(`href="${from}"`, `href="${to}"`);
  return result;
}

async function copy(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.isDirectory()) await copy(new URL(`${entry.name}/`, from), new URL(`${entry.name}/`, to));
    else await writeFile(new URL(entry.name, to), adapt(await readFile(new URL(entry.name, from), "utf8")));
  }
}

if (process.argv[1]?.endsWith("mirror-skhy-research.mjs")) {
  await copy(sourceRoot, mirrorRoot);
  console.log("SKHY English and Chinese research pages mirrored to SVIM.");
}
