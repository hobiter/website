export const QA = [
  {
    en: "Primary source endpoints",
    zh: "主要来源端点",
    status: "warning",
    enNote:
      "Representative annual, quarterly, October 8-K, financing, S-4 and vote SEC documents return HTTP 200. Direct automated access to the issuer Neutron release returns 403; the release is available through web retrieval and its SEC 8-K counterpart.",
    zhNote:
      "代表年报、季报、10 月临时报告、融资、S-4 及表决 SEC 文件返回 HTTP 200。自动直连公司 Neutron 公告返回 403，但网页检索及对应 SEC 临时报告可访问。",
  },
  {
    en: "Data lineage and model identities",
    zh: "数据来源与模型恒等式",
    status: "pass",
    enNote:
      "Dedicated data/model tests and reconciliation checks accompany this article; consult delivery record for execution results.",
    zhNote: "附专用数据、模型及调节测试，执行结果见交付记录。",
  },
  {
    en: "Routes, rendering and mirror",
    zh: "路由、渲染与镜像",
    status: "pass",
    enNote:
      "EN/ZH registration, server rendering and exact adapted mirror are covered by the dedicated tests.",
    zhNote: "专用测试覆盖中英文注册、服务端渲染及适配镜像一致性。",
  },
  {
    en: "Market data",
    zh: "市场数据",
    status: "dated",
    enNote:
      "October 15 regular-session closing observation, not a live quote. Historical ratios use period-end shares and later-published accounts; they are not point-in-time investment screens.",
    zhNote:
      "10 月 15 日常规时段收盘观测，非实时；历史比率采用期末股份和之后公布报表，不是当时可交易筛选。",
  },
  {
    en: "Current valuation certification",
    zh: "当前估值核验",
    status: "warning",
    enNote:
      "Not certified: standalone June bridge excludes post-June ATM and pending Iridium. No personalized advice or guaranteed return.",
    zhNote:
      "未核验：6 月独立桥接排除后续 ATM 和待交割 Iridium；非个性建议或保证回报。",
  },
] as const;
