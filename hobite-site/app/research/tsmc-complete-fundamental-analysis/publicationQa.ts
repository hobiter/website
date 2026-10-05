export const TSM_QA = [
  {
    en: "Financial and model invariants",
    zh: "财务及模型恒等式",
    status: "pass",
    enNote:
      "Automated financial arithmetic, revenue anchors, unit selection, ADS/FX conversion, quarterly rounding, reinvestment and sensitivity checks passed on October 4, 2026.",
    zhNote:
      "2026 年 10 月 4 日自动验证通过：财务算术、收入锚点、单位筛选、ADS 汇率换算、季度舍入、再投资及敏感性。",
  },
  {
    en: "Production builds and mirror parity",
    zh: "生产构建与镜像一致性",
    status: "pass",
    enNote:
      "Hobite Next.js production build and SVIM TypeScript/Vite production build passed. All adapted EN/ZH report modules matched. SVIM retains its pre-existing main-bundle size warning.",
    zhNote:
      "Hobite Next.js 及 SVIM TypeScript/Vite 生产构建通过，中英文适配模块一致。SVIM 保留原有主包体积提示。",
  },
  {
    en: "Desktop and mobile views",
    zh: "桌面及移动视图",
    status: "pass",
    enNote:
      "Both sites rendered English and Chinese reports at desktop and 390-pixel mobile widths, with twelve charts, translation navigation and internally scrolling wide tables. No page-wide overflow.",
    zhNote:
      "两个站点中英文报告在桌面及 390 像素移动宽度正常呈现，包含十二张图表、语言导航及表内横向滚动，无整页横向溢出。",
  },
  {
    en: "Source availability",
    zh: "来源可访问性",
    status: "warning",
    enNote:
      "SEC data and filing endpoints fetched successfully. Some issuer PDFs reject automated direct fetches; archived search views and SEC exhibits support verification. No unverified transcript-derived capital-budget claim is published.",
    zhNote:
      "成功访问 SEC 数据及申报端点。部分发行人 PDF 拒绝自动下载，使用存档搜索视图及 SEC 附件核验。未发布未经核验的电话会资本预算论断。",
  },
  {
    en: "Coverage and timing",
    zh: "覆盖范围及时点",
    status: "warning",
    enNote:
      "October 4, 2026 cutoff; October 2 ADS close. Annual IFRS 2015–2025 and local TIFRS 2024 Q1–2026 Q2. FX and forecast are assumptions, not current quotes or results.",
    zhNote:
      "截止 2026 年 10 月 4 日，ADS 收盘价日期为 10 月 2 日。年度 IFRS 2015—2025，季度 TIFRS 2024 年第一季度至 2026 年第二季度。汇率与预测为假设，不是实时报价或实际结果。",
  },
];
