import type { Metadata } from "next";
import MicronResearchView from "./MicronResearchView";
export const metadata: Metadata = {
  title: "Micron (MU) Complete Fundamental Analysis",
  description:
    "Micron fiscal financial history, memory economics, HBM, customer funding, cash investment and ten-year cycle-aware DCF scenarios.",
};
export default function Page() {
  return <MicronResearchView />;
}
