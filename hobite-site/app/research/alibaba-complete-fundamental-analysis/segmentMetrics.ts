export type AlibabaSegmentMetric = {
  fiscalYear: number;
  segment: string;
  revenue: number;
  yoyGrowth: number | null;
  note: string;
};

export const ALIBABA_SEGMENT_METRICS_SOURCE_NOTE =
  "Segment revenue rows are extracted from Alibaba's FY2026 Form 20-F operating results table. FY2025 is shown on the same restated basis as FY2026 after Alibaba combined Taobao and Tmall Group, Ele.me, and Fliggy into Alibaba China E-commerce Group and reclassified Cainiao, Amap, Hujing Digital Media and Entertainment Group and other businesses into All others.";

export const ALIBABA_SEGMENT_METRICS: AlibabaSegmentMetric[] = [
  {
    "fiscalYear": 2025,
    "segment": "Alibaba China E-commerce Group",
    "revenue": 508380000000,
    "yoyGrowth": null,
    "note": "Restated under FY2026 segment reporting structure"
  },
  {
    "fiscalYear": 2026,
    "segment": "Alibaba China E-commerce Group",
    "revenue": 554217000000,
    "yoyGrowth": 9,
    "note": "Taobao/Tmall, Ele.me and Fliggy combined into China E-commerce Group"
  },
  {
    "fiscalYear": 2025,
    "segment": "Alibaba International Digital Commerce Group",
    "revenue": 132300000000,
    "yoyGrowth": null,
    "note": "International retail and wholesale commerce"
  },
  {
    "fiscalYear": 2026,
    "segment": "Alibaba International Digital Commerce Group",
    "revenue": 144170000000,
    "yoyGrowth": 9,
    "note": "International retail and wholesale commerce"
  },
  {
    "fiscalYear": 2025,
    "segment": "Cloud Intelligence Group",
    "revenue": 118028000000,
    "yoyGrowth": null,
    "note": "Cloud and AI infrastructure/services"
  },
  {
    "fiscalYear": 2026,
    "segment": "Cloud Intelligence Group",
    "revenue": 158132000000,
    "yoyGrowth": 34,
    "note": "Cloud growth accelerated with AI demand"
  },
  {
    "fiscalYear": 2025,
    "segment": "All others",
    "revenue": 338347000000,
    "yoyGrowth": null,
    "note": "Freshippo, Cainiao, Alibaba Health, Amap, Qwen consumer business, Lingxi Games, DingTalk and other businesses"
  },
  {
    "fiscalYear": 2026,
    "segment": "All others",
    "revenue": 254367000000,
    "yoyGrowth": -25,
    "note": "Restated portfolio segment; decline reflects reclassification and mix changes"
  },
  {
    "fiscalYear": 2025,
    "segment": "Inter-segment elimination",
    "revenue": -102632000000,
    "yoyGrowth": null,
    "note": "Eliminations"
  },
  {
    "fiscalYear": 2026,
    "segment": "Inter-segment elimination",
    "revenue": -89556000000,
    "yoyGrowth": null,
    "note": "Eliminations"
  }
];
