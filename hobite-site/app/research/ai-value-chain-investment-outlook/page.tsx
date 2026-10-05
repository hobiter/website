import type { Metadata } from "next";
import ResearchView from "./ResearchView";

export const metadata: Metadata = {
  title: "The AI Value Chain: 10- and 20-Year Investment Outlook",
  description: "Full AI value-chain research, sector economics, ten-stock ranking, reported financials and explicit long-term valuation scenarios.",
};

export default function Page() {
  return <ResearchView lang="en" />;
}
