import { HomeResearchDesk } from "./home-research-desk";
import { featuredResearch, moreResearch } from "./research/catalog";

export default function Home() {
  return <HomeResearchDesk featured={featuredResearch} more={moreResearch} />;
}
