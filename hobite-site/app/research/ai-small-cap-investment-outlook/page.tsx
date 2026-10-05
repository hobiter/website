import type { Metadata } from "next";
import ResearchView from "../_ai-size-research/ResearchView";

export const metadata: Metadata = {
  title: "Top 10 Small-Cap AI Stocks",
  description: "Ranked AI investment shortlist, sourced financial evidence and five- and ten-year return scenarios.",
};

export default function Page() {
  return <ResearchView size="small" lang="en" />;
}
