import type { Metadata } from "next";
import RocketLabResearchView from "./RocketLabResearchView";
export const metadata: Metadata = {
  title: "Rocket Lab (RKLB) Complete Fundamental Analysis",
  description:
    "SEC financial history, Electron and HASTE economics, space systems, latest Neutron timing, Iridium financing and standalone valuation scenarios.",
};
export default function Page() {
  return <RocketLabResearchView lang="en" />;
}
