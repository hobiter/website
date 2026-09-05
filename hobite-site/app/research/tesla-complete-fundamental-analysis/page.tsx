import type { Metadata } from "next";
import { TeslaResearchView } from "./TeslaResearchView";

export const metadata: Metadata = {
  title: "Tesla (TSLA) Complete Fundamental Analysis",
  description: "SEC-backed Tesla financial history, vehicle, FSD and energy operating metrics, valuation history and ten-year DCF scenarios.",
};

export default function TeslaResearchPage() {
  return <TeslaResearchView language="en" />;
}
