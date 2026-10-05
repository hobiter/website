import type { Metadata } from "next";
import ResearchView from "../../_ai-size-research/ResearchView";

export const metadata: Metadata = {
  title: "AI 小盘股：十大研究候选",
  description: "Ranked AI investment shortlist, sourced financial evidence and five- and ten-year return scenarios.",
};

export default function Page() {
  return <ResearchView size="small" lang="zh" />;
}
