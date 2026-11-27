import type { Metadata } from "next";
import { ResearchUpdate } from "../_chip-refresh/ResearchUpdate";
import TsmcResearchView from "./TsmcResearchView";
export const metadata: Metadata = {
  title: "TSMC (TSM) Complete Fundamental Analysis",
  description:
    "TSMC IFRS financial history, foundry economics, advanced nodes, cash investment, customer concentration and currency-aware ten-year ADS valuation.",
};
export default function Page() {
  return <ResearchUpdate ticker="TSM"><TsmcResearchView /></ResearchUpdate>;
}
