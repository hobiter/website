import type { Metadata } from "next";
import { ResearchUpdate } from "../_chip-refresh/ResearchUpdate";
import { NvidiaResearchView } from "./NvidiaResearchView";

export const metadata: Metadata = {
  title: "NVIDIA (NVDA) Complete Fundamental Analysis",
  description: "SEC-backed NVIDIA financial history, AI platform economics, supply commitments, valuation history and ten-year DCF scenarios.",
};

export default function NvidiaResearchPage() {
  return <ResearchUpdate ticker="NVDA"><NvidiaResearchView language="en" /></ResearchUpdate>;
}
