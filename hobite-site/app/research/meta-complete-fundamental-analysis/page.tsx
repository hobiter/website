import type { Metadata } from "next";
import { MetaResearchView } from "./MetaResearchView";

export const metadata: Metadata = {
  title: "Meta Platforms (META) Complete Fundamental Analysis",
  description: "SEC-backed Meta financial history, advertising drivers, AI infrastructure economics, valuation history and ten-year DCF scenarios.",
};

export default function MetaResearchPage() {
  return <MetaResearchView language="en" />;
}
