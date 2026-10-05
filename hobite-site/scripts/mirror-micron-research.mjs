import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
const root = new URL(
  "../app/research/micron-complete-fundamental-analysis/",
  import.meta.url,
);
export const mirror = new URL(
  "../../../svim-labs/project-albatross/src/content/hobiteResearch/research/micron-complete-fundamental-analysis/",
  import.meta.url,
);
export function adapt(source) {
  let result = source
    .replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "")
    .replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "");
  for (const [a, b] of [
    [
      "/research/micron-complete-fundamental-analysis/zh",
      "/blog/zh-micron-complete-fundamental-analysis",
    ],
    [
      "/research/micron-complete-fundamental-analysis",
      "/blog/micron-complete-fundamental-analysis",
    ],
    ["/research", "/blog"],
  ])
    result = result.replaceAll(`href="${a}"`, `href="${b}"`);
  return result;
}
async function copy(from, to) {
  await mkdir(to, { recursive: true });
  for (const f of await readdir(from, { withFileTypes: true })) {
    if (f.isDirectory())
      await copy(new URL(f.name + "/", from), new URL(f.name + "/", to));
    else
      await writeFile(
        new URL(f.name, to),
        adapt(await readFile(new URL(f.name, from), "utf8")),
      );
  }
}
if (process.argv[1]?.endsWith("mirror-micron-research.mjs")) {
  await copy(root, mirror);
  console.log("Micron EN/ZH research mirrored to SVIM.");
}
