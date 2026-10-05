import type { Metadata } from "next";
import TsmcResearchView from "./TsmcResearchView";
export const metadata: Metadata = {
  title: "TSMC (TSM) Complete Fundamental Analysis",
  description:
    "TSMC IFRS financial history, foundry economics, advanced nodes, cash investment, customer concentration and currency-aware ten-year ADS valuation.",
};
export default function Page() {
  return <TsmcResearchView />;
}
