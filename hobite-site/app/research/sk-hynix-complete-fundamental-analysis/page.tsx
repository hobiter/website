import type { Metadata } from "next";
import SkhynixResearchView from "./SkhynixResearchView";

export const metadata: Metadata = {
  title: "SK hynix (SKHY) Complete Fundamental Analysis",
  description: "K-IFRS financial history, HBM and memory-cycle economics, Nasdaq ADS mechanics, sources and ten-year valuation scenarios.",
};

export default function Page() {
  return <SkhynixResearchView lang="en" />;
}
