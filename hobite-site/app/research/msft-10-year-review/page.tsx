import type { Metadata } from "next";
import { ChartGrid } from "./charts";

export const metadata: Metadata = {
  title: "Microsoft (MSFT): 10 Years of Reinvention",
};

export default function Page(){
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold">Microsoft (MSFT): 10 Years</h1>
        <p className="mt-4 text-zinc-600">Cloud → AI transformation.</p>

        <a href="/research/msft-10-year-review-zh" className="text-sm mt-2 inline-block underline">
          中文版本
        </a>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">10-Year Financial Growth</h2>
          <ChartGrid />
        </div>

        <div className="mt-10 space-y-6 text-zinc-700">
          <p>Revenue grew ~3x, operating income ~5x, and cash flow expanded significantly over the last decade.</p>
          <p>This reflects strong operating leverage and cloud economics.</p>
        </div>
      </div>
    </main>
  );
}
