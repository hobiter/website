import type { Metadata } from "next";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Hobite Operation Log",
  description: "Full archived operation records transferred from 操作记录 TXT files.",
};

const RECORD_FILE_KEYWORD = "我的操作记录";

async function getOperationLogText() {
  const repoRoot = path.join(process.cwd(), "..");
  const entries = await readdir(repoRoot, { withFileTypes: true });

  const recordFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".txt") &&
        entry.name.includes(RECORD_FILE_KEYWORD),
    )
    .map((entry) => path.join(repoRoot, entry.name))
    .sort((a, b) => a.localeCompare(b, "zh-Hans"));

  if (recordFiles.length === 0) {
    return "No 操作记录 TXT file was found in the repository root.";
  }

  const contents = await Promise.all(recordFiles.map((filePath) => readFile(filePath, "utf8")));

  return contents.join("\n\n\n==============================\n\n\n");
}

export default async function OperationLogPage() {
  const content = await getOperationLogText();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold">我的操作记录（完整转移）</h1>
        <p className="mt-3 text-zinc-600">
          This page renders all matching <code>我的操作记录*.txt</code> files from the repository root.
        </p>

        <pre className="mt-8 whitespace-pre-wrap break-words rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-7 overflow-x-auto">
          {content}
        </pre>
      </div>
    </main>
  );
}
