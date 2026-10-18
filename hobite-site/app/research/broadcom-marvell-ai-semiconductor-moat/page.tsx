import type { Metadata } from "next";
import MoatView from "./MoatView";
import { title, description } from "./data";

export const metadata: Metadata = { title: title[0], description: description[0] };

export default function Page() {
  return <MoatView lang="en" />;
}
