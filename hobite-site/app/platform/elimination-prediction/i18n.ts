import type { LanguageCode } from "./types";

export type PredictionCopy = {
  title: string;
  subtitle: string;
  language: string;
  english: string;
  chinese: string;
  eventTitle: string;
  finalDate: string;
  finalTime: string;
  stadium: string;
  champion: string;
  championTbd: string;
  dateTbd: string;
  timeTbd: string;
  stadiumTbd: string;
  format: string;
  square: string;
  story: string;
  landscape: string;
  generate: string;
  download: string;
  nativeShare: string;
  copy: string;
  shareX: string;
  shareFacebook: string;
  reset: string;
  copied: string;
  imageReady: string;
  selectWinner: string;
  unavailable: string;
  posterFooter: string;
};

export const COPY: Record<LanguageCode, PredictionCopy> = {
  en: {
    title: "FIFA World Cup 2026 Knockout Prediction",
    subtitle: "Pick every winner, generate a poster, then download or share it.",
    language: "Language",
    english: "English",
    chinese: "中文",
    eventTitle: "Event title",
    finalDate: "Final date",
    finalTime: "Final time",
    stadium: "Stadium",
    champion: "Champion",
    championTbd: "Champion TBD",
    dateTbd: "Date TBD",
    timeTbd: "Time TBD",
    stadiumTbd: "Stadium TBD",
    format: "Poster format",
    square: "Square",
    story: "Story",
    landscape: "Landscape",
    generate: "Generate image",
    download: "Download PNG",
    nativeShare: "Share",
    copy: "Copy link",
    shareX: "X.com",
    shareFacebook: "Facebook",
    reset: "Reset",
    copied: "Copied",
    imageReady: "Poster image is ready.",
    selectWinner: "Select winner",
    unavailable: "Generate an image first.",
    posterFooter: "hobite.capital",
  },
  zh: {
    title: "FIFA 世界杯 2026 淘汰赛预测",
    subtitle: "选择每轮胜者，生成海报，然后下载或分享。",
    language: "语言",
    english: "English",
    chinese: "中文",
    eventTitle: "赛事标题",
    finalDate: "决赛日期",
    finalTime: "决赛时间",
    stadium: "球场",
    champion: "冠军",
    championTbd: "冠军待定",
    dateTbd: "日期待定",
    timeTbd: "时间待定",
    stadiumTbd: "球场待定",
    format: "海报尺寸",
    square: "方图",
    story: "竖版",
    landscape: "横版",
    generate: "生成图片",
    download: "下载 PNG",
    nativeShare: "分享",
    copy: "复制链接",
    shareX: "X.com",
    shareFacebook: "Facebook",
    reset: "重置",
    copied: "已复制",
    imageReady: "海报图片已生成。",
    selectWinner: "选择胜者",
    unavailable: "请先生成图片。",
    posterFooter: "hobite.capital",
  },
};

