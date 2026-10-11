import type { Metadata } from "next";
import LuluResearchView from "./LuluResearchView";
export const metadata: Metadata = {
  title: "lululemon (LULU) Complete Fundamental Analysis",
  description:
    "SEC financial history, retail productivity, inventory and lease economics, tariff-refund normalization and owner-cash valuation scenarios.",
};
export default function Page() {
  return <LuluResearchView lang="en" />;
}
