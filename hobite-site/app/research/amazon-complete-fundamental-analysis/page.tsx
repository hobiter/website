import type { Metadata } from "next";
import AmazonResearchView from "./AmazonResearchView";

export const metadata: Metadata = {
  title: "Amazon (AMZN) Complete Fundamental Analysis",
  description:
    "Amazon SEC financial history, AWS and retail economics, AI investment, capital allocation and ten-year enterprise DCF scenarios.",
};

export default function Page() {
  return <AmazonResearchView />;
}
