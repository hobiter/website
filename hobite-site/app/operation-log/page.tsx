import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Hobite Operation Log",
  description: "Full archived operation records transferred from 操作记录 TXT files.",
};

const OPERATION_LOG_FILE = path.join(process.cwd(), "content", "operation-log.txt");

async function getOperationLogText() {
  try {
    return await readFile(OPERATION_LOG_FILE, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") {
      throw error;
    }
  }

  return "operation-log.txt was not found in /content.";
}

export default async function OperationLogPage() {
  const content = await getOperationLogText();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">我的操作记录（完整转移）</h1>
        <p className="mt-3 text-zinc-600">
          This page renders the archived operation log from <code>content/operation-log.txt</code>.
        </p>

        <pre className="mt-8 overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-7">
          {content}
        </pre>
      </div>
    </main>
  );
}
