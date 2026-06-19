import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Hobite Operation Log",
  description: "Full archived operation records transferred from 操作记录 TXT files.",
};

const OPERATION_LOG_PATH = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "content",
  "operation-log.txt",
);

async function getOperationLogText() {
  try {
    return await readFile(OPERATION_LOG_PATH, "utf8");
  } catch {
    return "operation-log.txt not found under /content.";
  }
}

export default async function OperationLogPage() {
  const content = await getOperationLogText();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">我的操作记录（完整转移）</h1>
        <p className="mt-3 text-zinc-600">
          This page renders the archived operation log from <code>/content/operation-log.txt</code>.
        </p>

        <pre className="mt-8 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-7">
          {content}
        </pre>
      </div>
    </main>
  );
}
