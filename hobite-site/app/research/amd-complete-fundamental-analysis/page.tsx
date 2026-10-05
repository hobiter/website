import type { Metadata } from "next";
import AmdResearchView from "./AmdResearchView";
export const metadata: Metadata = {
  title: "AMD Complete Fundamental Analysis",
  description:
    "AMD fiscal financials, segment economics, customer warrants, supply commitments and ten-year FCFF valuation scenarios.",
};
export default function Page() {
  return <AmdResearchView lang="en" />;
}
