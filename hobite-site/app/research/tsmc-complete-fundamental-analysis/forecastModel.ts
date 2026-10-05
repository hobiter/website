import { TSM_OPERATING as latest } from "./operatingMetrics";
import { TSM_LATEST_PRICE } from "./valuationHistory";
export type Scenario = "bear" | "base" | "bull";
export const TSM_ASSUMPTIONS = {
  bear: {
    revenue2026: 5.25e12,
    growthStart: 0.14,
    growthEnd: 0.05,
    marginStart: 0.55,
    marginEnd: 0.39,
    capex2026: 2.112e12,
    capexEnd: 0.24,
    da2026: 0.82e12,
    daEnd: 0.17,
    tax: 0.22,
    workingCapital: 0.04,
    leasePrincipalRatio: 0.001,
    leaseInterestRatio: 0.00015,
    discount: 11.5,
    terminal: 2,
  },
  base: {
    revenue2026: 5.5e12,
    growthStart: 0.22,
    growthEnd: 0.08,
    marginStart: 0.57,
    marginEnd: 0.46,
    capex2026: 1.984e12,
    capexEnd: 0.23,
    da2026: 0.84e12,
    daEnd: 0.16,
    tax: 0.2,
    workingCapital: 0.03,
    leasePrincipalRatio: 0.001,
    leaseInterestRatio: 0.00015,
    discount: 10,
    terminal: 3,
  },
  bull: {
    revenue2026: 5.7e12,
    growthStart: 0.27,
    growthEnd: 0.1,
    marginStart: 0.59,
    marginEnd: 0.51,
    capex2026: 1.92e12,
    capexEnd: 0.22,
    da2026: 0.86e12,
    daEnd: 0.15,
    tax: 0.18,
    workingCapital: 0.02,
    leasePrincipalRatio: 0.001,
    leaseInterestRatio: 0.00015,
    discount: 9,
    terminal: 3.5,
  },
};
export const TSM_MODEL_INPUTS = {
  asOf: "2026-10-04",
  balanceDate: "2026-06-30",
  ordinaryShares: latest.ordinaryDilutedShares,
  adsRatio: 5,
  fx: 32,
  cash: latest.cash,
  debt: latest.debtCurrent + latest.bondsNoncurrent + latest.bankNoncurrent,
  noncontrolling: latest.noncontrolling,
  // Current marketable instruments mix is not valued as unrestricted cash without a security-level haircut.
  excludedMarketableInstruments: latest.currentMarketableInstruments,
};
const blend = (a: number, b: number, t: number) => a + (b - a) * t;
export const TSM_FORECASTS = Object.fromEntries(
  (["bear", "base", "bull"] as Scenario[]).map((s) => {
    const a = TSM_ASSUMPTIONS[s];
    let revenue = a.revenue2026,
      previous = 3.8090543e12;
    const rows = Array.from({ length: 10 }, (_, i) => {
      const t = i / 9;
      if (i > 0) revenue *= 1 + blend(a.growthStart, a.growthEnd, (i - 1) / 8);
      const operatingIncome = revenue * blend(a.marginStart, a.marginEnd, t);
      const leaseInterest = revenue * a.leaseInterestRatio,
        leasePrincipal = revenue * a.leasePrincipalRatio;
      const nopat = (operatingIncome - leaseInterest) * (1 - a.tax);
      const depreciation =
        revenue * blend(a.da2026 / a.revenue2026, a.daEnd, t);
      const capex = revenue * blend(a.capex2026 / a.revenue2026, a.capexEnd, t);
      const workingCapital = (revenue - previous) * a.workingCapital;
      const freeCashFlow =
        nopat + depreciation - capex - workingCapital - leasePrincipal;
      previous = revenue;
      return {
        year: 2026 + i,
        revenue,
        operatingIncome,
        leaseInterest,
        leasePrincipal,
        nopat,
        depreciation,
        capex,
        workingCapital,
        freeCashFlow,
        fcfMargin: (freeCashFlow / revenue) * 100,
      };
    });
    return [s, rows];
  }),
) as Record<
  Scenario,
  {
    year: number;
    revenue: number;
    operatingIncome: number;
    leaseInterest: number;
    leasePrincipal: number;
    nopat: number;
    depreciation: number;
    capex: number;
    workingCapital: number;
    freeCashFlow: number;
    fcfMargin: number;
  }[]
>;
export function tsmDcf(
  s: Scenario,
  discount = TSM_ASSUMPTIONS[s].discount,
  growth = TSM_ASSUMPTIONS[s].terminal,
  fx = TSM_MODEL_INPUTS.fx,
) {
  if (
    !Number.isFinite(discount) ||
    !Number.isFinite(growth) ||
    discount <= growth ||
    discount <= 0 ||
    growth < 0 ||
    !Number.isFinite(fx) ||
    fx <= 0
  )
    throw new Error("Invalid discount/growth/FX assumptions");
  const rows = TSM_FORECASTS[s],
    a = TSM_ASSUMPTIONS[s],
    r = discount / 100,
    g = growth / 100;
  const firstFraction =
    (Date.UTC(2026, 11, 31) - Date.UTC(2026, 9, 4)) / (365.25 * 86400000);
  const pvCash = rows.reduce(
    (sum, row, i) =>
      sum +
      (i === 0 ? row.freeCashFlow / 4 : row.freeCashFlow) /
        (1 + r) ** (firstFraction + i),
    0,
  );
  const last = rows[9];
  const terminalCash =
    (last.nopat + last.depreciation - last.capex - last.leasePrincipal) *
      (1 + g) -
    last.revenue * g * a.workingCapital;
  const pvTerminal = terminalCash / (r - g) / (1 + r) ** (firstFraction + 9),
    enterpriseValue = pvCash + pvTerminal;
  const equityValue =
    enterpriseValue +
    TSM_MODEL_INPUTS.cash -
    TSM_MODEL_INPUTS.debt -
    TSM_MODEL_INPUTS.noncontrolling;
  const ordinaryValue = equityValue / TSM_MODEL_INPUTS.ordinaryShares,
    adsValue = (ordinaryValue * TSM_MODEL_INPUTS.adsRatio) / fx;
  return {
    discount,
    growth,
    fx,
    pvCash,
    pvTerminal,
    terminalCash,
    enterpriseValue,
    equityValue,
    ordinaryValue,
    adsValue,
    terminalWeight: (pvTerminal / enterpriseValue) * 100,
    upside: (adsValue / TSM_LATEST_PRICE.close - 1) * 100,
  };
}
export const TSM_DCF_CASES = {
  bear: tsmDcf("bear"),
  base: tsmDcf("base"),
  bull: tsmDcf("bull"),
};
export const TSM_SENSITIVITY = [9, 10, 11].map((discount) => ({
  discount,
  values: [2, 3, 4].map((growth) => tsmDcf("base", discount, growth).adsValue),
}));
export const TSM_FX_SENSITIVITY = [30, 32, 34].map((fx) =>
  tsmDcf("base", 10, 3, fx),
);
export const TSM_MODEL_NOTE = {
  en: "Analyst scenarios, not management guidance. TWD enterprise cash = (EBIT − assumed lease interest) × (1 − tax) + total D&A − gross cash PP&E − incremental working capital − lease principal. SBC stays expensed. Future lease cash is included, so lease liabilities are not deducted again. October 4 valuation discounts one quarter of estimated 2026 annual cash as a Q4 timing proxy, then full 2027–2035 years. June cash, current and noncurrent bonds/bank loans, and minority equity are a dated proxy, not October balances. Marketable instruments and long-term investments are excluded from the equity bridge; no dividends are deducted from enterprise cash. Terminal reinvestment remains positive. NTD 32/USD is a fixed analyst translation assumption anchored to Q3 guidance, not observed spot FX; 30/32/34 sensitivity holds the TWD business forecast constant. Currency operating effects and Taiwan disruption need separate downside judgment, not a claim that higher WACC fully covers them.",
  zh: "全部为分析师情景，不是管理层指引。新台币企业现金流＝（营业利润－假设租赁利息）×（1－税率）＋总折旧摊销－现金购建固定资产－增量营运资本－租赁本金。股权薪酬保留为费用。未来租赁现金已扣除，因此不重复扣减租赁负债。10 月 4 日估值仅将 2026 年估计现金流的四分之一作为第四季度时点近似值，之后折现 2027—2035 全年现金流。六月现金、流动及非流动债券与银行贷款、少数股东权益是有日期的估值代理，并非十月实际余额。有价证券和长期投资不加入权益桥；股息不从企业现金流重复扣除。永续期仍需再投资。32 新台币兑 1 美元是假设，参考第三季度指引而非实时汇率；30/32/34 敏感性只改变换算，不改变新台币经营预测。汇率经营影响及台湾生产中断需另行判断，不能认为提高折现率已充分覆盖。",
};
