import type { Metadata } from "next";
import CoreweaveResearchView from "./CoreweaveResearchView";
export const metadata: Metadata = {
  title: "CoreWeave (CRWV) Complete Fundamental Analysis",
  description:
    "SEC financial history, AI infrastructure, GPU reinvestment, customer concentration, financing and enterprise-to-equity valuation scenarios.",
};
export default function Page() {
  return <CoreweaveResearchView lang="en" />;
}
