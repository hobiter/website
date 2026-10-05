import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";

export const sourceRoot = new URL("../app/research/ai-value-chain-investment-outlook/", import.meta.url);
export const mirrorRoot = new URL("../../../svim-labs/project-albatross/src/content/hobiteResearch/research/ai-value-chain-investment-outlook/", import.meta.url);
export function adapt(source) {
  let result = source.replace(/^import type \{ Metadata \} from ["']next["'];?\r?\n/m, "").replace(/export const metadata: Metadata = \{[\s\S]*?\r?\n\};?\r?\n/, "");
  for (const [from, to] of [
    ["/research/ai-value-chain-investment-outlook/zh", "/research/zh-ai-value-chain-investment-outlook"],
    ["/research/ai-value-chain-investment-outlook", "/research/ai-value-chain-investment-outlook"],
    ["/research", "/blog"],
  ]) result = result.replaceAll(`href="${from}"`, `href="${to}"`);
  return result;
}
export async function files(root, prefix = "") {
  const result = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isDirectory()) result.push(...await files(new URL(`${entry.name}/`, root), `${prefix}${entry.name}/`));
    else result.push(`${prefix}${entry.name}`);
  }
  return result;
}
if (process.argv[1]?.endsWith("mirror-ai-value-chain-research.mjs")) {
  for (const file of await files(sourceRoot)) {
    const target = new URL(file, mirrorRoot);
    await mkdir(new URL(".", target), { recursive: true });
    await writeFile(target, adapt(await readFile(new URL(file, sourceRoot), "utf8")));
  }
  console.log("AI value-chain research mirrored to SVIM in both languages.");
}
