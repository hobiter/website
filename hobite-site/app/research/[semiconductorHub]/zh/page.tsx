import { Hub, hubMetadata, staticParams, type Route } from "../../_semiconductor-fundamentals/Hub";

export const generateStaticParams = staticParams;
export const dynamicParams = false;
export const generateMetadata = (route: Route) => hubMetadata(route, "zh");
export default function Page(route: Route) {
  return <Hub route={route} lang="zh" />;
}
