import type { EventDetails, Participant } from "./types";

const flagPath = (id: string) => `/elimination-prediction/flags/${id}.svg`;

export const DEFAULT_EVENT_DETAILS: EventDetails = {
  title: "FIFA World Cup 2026 Knockout Prediction",
  finalDate: "July 20, 2026",
  finalTime: "03:00",
  stadium: "MetLife Stadium",
};

export const FIFA_TEAMS: Participant[] = [
  { id: "ger", name: "Germany", nameZh: "德国", seed: 1, flagSrc: flagPath("ger"), flagColors: ["#111827", "#ef4444", "#facc15"] },
  { id: "par", name: "Paraguay", nameZh: "巴拉圭", seed: 2, flagSrc: flagPath("par"), flagColors: ["#dc2626", "#ffffff", "#2563eb"] },
  { id: "fra", name: "France", nameZh: "法国", seed: 3, flagSrc: flagPath("fra"), flagColors: ["#1d4ed8", "#ffffff", "#ef4444"] },
  { id: "swe", name: "Sweden", nameZh: "瑞典", seed: 4, flagSrc: flagPath("swe"), flagColors: ["#2563eb", "#facc15", "#2563eb"] },
  { id: "rsa", name: "South Africa", nameZh: "南非", seed: 5, flagSrc: flagPath("rsa"), flagColors: ["#16a34a", "#facc15", "#111827", "#ef4444", "#2563eb"] },
  { id: "can", name: "Canada", nameZh: "加拿大", seed: 6, flagSrc: flagPath("can"), flagColors: ["#dc2626", "#ffffff", "#dc2626"] },
  { id: "ned", name: "Netherlands", nameZh: "荷兰", seed: 7, flagSrc: flagPath("ned"), flagColors: ["#dc2626", "#ffffff", "#2563eb"] },
  { id: "mar", name: "Morocco", nameZh: "摩洛哥", seed: 8, flagSrc: flagPath("mar"), flagColors: ["#e11d48", "#e11d48", "#16a34a"] },
  { id: "por", name: "Portugal", nameZh: "葡萄牙", seed: 9, flagSrc: flagPath("por"), flagColors: ["#16a34a", "#dc2626", "#dc2626"] },
  { id: "cro", name: "Croatia", nameZh: "克罗地亚", seed: 10, flagSrc: flagPath("cro"), flagColors: ["#dc2626", "#ffffff", "#2563eb"] },
  { id: "esp", name: "Spain", nameZh: "西班牙", seed: 11, flagSrc: flagPath("esp"), flagColors: ["#dc2626", "#facc15", "#dc2626"] },
  { id: "aut", name: "Austria", nameZh: "奥地利", seed: 12, flagSrc: flagPath("aut"), flagColors: ["#dc2626", "#ffffff", "#dc2626"] },
  { id: "usa", name: "United States", nameZh: "美国", seed: 13, flagSrc: flagPath("usa"), flagColors: ["#2563eb", "#ffffff", "#dc2626"] },
  { id: "bih", name: "Bosnia", nameZh: "波斯尼亚", seed: 14, flagSrc: flagPath("bih"), flagColors: ["#2563eb", "#facc15", "#ffffff"] },
  { id: "bel", name: "Belgium", nameZh: "比利时", seed: 15, flagSrc: flagPath("bel"), flagColors: ["#111827", "#facc15", "#ef4444"] },
  { id: "sen", name: "Senegal", nameZh: "塞内加尔", seed: 16, flagSrc: flagPath("sen"), flagColors: ["#16a34a", "#facc15", "#ef4444"] },
  { id: "bra", name: "Brazil", nameZh: "巴西", seed: 17, flagSrc: flagPath("bra"), flagColors: ["#16a34a", "#facc15", "#2563eb"] },
  { id: "jpn", name: "Japan", nameZh: "日本", seed: 18, flagSrc: flagPath("jpn"), flagColors: ["#ffffff", "#dc2626", "#ffffff"] },
  { id: "civ", name: "Ivory Coast", nameZh: "科特迪瓦", seed: 19, flagSrc: flagPath("civ"), flagColors: ["#f97316", "#ffffff", "#16a34a"] },
  { id: "nor", name: "Norway", nameZh: "挪威", seed: 20, flagSrc: flagPath("nor"), flagColors: ["#dc2626", "#ffffff", "#1d4ed8"] },
  { id: "mex", name: "Mexico", nameZh: "墨西哥", seed: 21, flagSrc: flagPath("mex"), flagColors: ["#16a34a", "#ffffff", "#dc2626"] },
  { id: "ecu", name: "Ecuador", nameZh: "厄瓜多尔", seed: 22, flagSrc: flagPath("ecu"), flagColors: ["#facc15", "#2563eb", "#dc2626"] },
  { id: "eng", name: "England", nameZh: "英格兰", seed: 23, flagSrc: flagPath("eng"), flagColors: ["#ffffff", "#dc2626", "#ffffff"] },
  { id: "cod", name: "DR Congo", nameZh: "刚果民主共和国", seed: 24, flagSrc: flagPath("cod"), flagColors: ["#38bdf8", "#facc15", "#dc2626"] },
  { id: "arg", name: "Argentina", nameZh: "阿根廷", seed: 25, flagSrc: flagPath("arg"), flagColors: ["#60a5fa", "#ffffff", "#60a5fa"] },
  { id: "cpv", name: "Cape Verde", nameZh: "佛得角", seed: 26, flagSrc: flagPath("cpv"), flagColors: ["#2563eb", "#ffffff", "#dc2626"] },
  { id: "aus", name: "Australia", nameZh: "澳洲", seed: 27, flagSrc: flagPath("aus"), flagColors: ["#1e40af", "#ffffff", "#dc2626"] },
  { id: "egy", name: "Egypt", nameZh: "埃及", seed: 28, flagSrc: flagPath("egy"), flagColors: ["#dc2626", "#ffffff", "#111827"] },
  { id: "sui", name: "Switzerland", nameZh: "瑞士", seed: 29, flagSrc: flagPath("sui"), flagColors: ["#dc2626", "#ffffff", "#dc2626"] },
  { id: "alg", name: "Algeria", nameZh: "阿尔及利亚", seed: 30, flagSrc: flagPath("alg"), flagColors: ["#16a34a", "#ffffff", "#dc2626"] },
  { id: "col", name: "Colombia", nameZh: "哥伦比亚", seed: 31, flagSrc: flagPath("col"), flagColors: ["#facc15", "#2563eb", "#dc2626"] },
  { id: "gha", name: "Ghana", nameZh: "加纳", seed: 32, flagSrc: flagPath("gha"), flagColors: ["#dc2626", "#facc15", "#16a34a"] },
];

