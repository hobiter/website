import type { Metadata } from "next";
import VistraResearchView from "./VistraResearchView";

export const metadata: Metadata = {
  title: "Vistra (VST) Complete Fundamental Analysis",
  description: "Vistra financial history, generation and retail economics, nuclear contracts, capital allocation and ten-year common-equity DCF scenarios.",
};

export default function Page() {
  return <VistraResearchView />;
}
