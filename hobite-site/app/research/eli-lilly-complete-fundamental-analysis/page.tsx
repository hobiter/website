import type { Metadata } from "next";
import LillyResearchView from "./LillyResearchView";
export const metadata: Metadata = {
  title: "Eli Lilly (LLY) Complete Fundamental Analysis",
  description:
    "SEC financial history, pharmaceutical economics, product concentration, research investment and ten-year valuation scenarios.",
};
export default function Page() {
  return <LillyResearchView lang="en" />;
}
