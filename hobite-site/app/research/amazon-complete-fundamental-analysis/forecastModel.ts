import { AMZN_OPERATING as latest } from "./operatingMetrics";
import { AMZN_LATEST_PRICE } from "./valuationHistory";

export type Scenario = "bear" | "base" | "bull";
export type ForecastRow = {
  year: number;
  northAmerica: number;
  international: number;
  aws: number;
  revenue: number;
  operatingIncome: number;
  tax: number;
  nopat: number;
  depreciation: number;
  investment: number;
  workingCapital: number;
  freeCashFlow: number;
  fcfMargin: number;
};
export const AMZN_ASSUMPTIONS = {
  bear: {
    initial: [450e9, 165e9, 170e9],
    growthStart: [0.06, 0.07, 0.18],
    growthEnd: [0.04, 0.04, 0.08],
    marginStart: [0.07, 0.03, 0.34],
    marginEnd: [0.08, 0.04, 0.26],
    investment2026: 235e9,
    investmentRatioStart: 0.27,
    investmentRatioEnd: 0.16,
    depreciation2026: 52e9,
    depreciationRatioEnd: 0.105,
    tax: 0.23,
    workingCapital: 0.01,
    discount: 10.5,
    terminal: 2,
    investmentRecovery: 0.25,
  },
  base: {
    initial: [460e9, 170e9, 178e9],
    growthStart: [0.08, 0.1, 0.25],
    growthEnd: [0.05, 0.06, 0.12],
    marginStart: [0.08, 0.04, 0.36],
    marginEnd: [0.1, 0.06, 0.32],
    investment2026: 230e9,
    investmentRatioStart: 0.24,
    investmentRatioEnd: 0.14,
    depreciation2026: 55e9,
    depreciationRatioEnd: 0.105,
    tax: 0.21,
    workingCapital: 0.005,
    discount: 9,
    terminal: 3,
    investmentRecovery: 0.5,
  },
  bull: {
    initial: [470e9, 175e9, 185e9],
    growthStart: [0.1, 0.12, 0.3],
    growthEnd: [0.06, 0.07, 0.15],
    marginStart: [0.085, 0.045, 0.38],
    marginEnd: [0.12, 0.08, 0.36],
    investment2026: 225e9,
    investmentRatioStart: 0.23,
    investmentRatioEnd: 0.13,
    depreciation2026: 57e9,
    depreciationRatioEnd: 0.1,
    tax: 0.2,
    workingCapital: 0.003,
    discount: 8,
    terminal: 3.5,
    investmentRecovery: 0.75,
  },
};
export const AMZN_MODEL_INPUTS = {
  asOf: "2026-10-04",
  shares: latest.dilutedSharesQ2,
  liquidAssetsJune: latest.cash + latest.securities,
  liquidAssetsProForma:
    latest.cash + latest.securities - latest.openAiSubsequentFunding,
  debtClaims:
    latest.debt +
    latest.shortDebt +
    latest.financeLeases +
    latest.financingObligationsApprox,
  investmentReference:
    latest.anthropicPreferred +
    latest.anthropicNotes +
    latest.openAiJuneInvestment +
    latest.openAiSubsequentFunding,
  remainingInvestmentFunding: latest.anthropicUnfundedFacility,
  realizationReserve: 0.2,
};
const blend = (start: number, end: number, t: number) =>
  start + (end - start) * t;
export const AMZN_FORECASTS = Object.fromEntries(
  (Object.keys(AMZN_ASSUMPTIONS) as Scenario[]).map((scenario) => {
    const a = AMZN_ASSUMPTIONS[scenario];
    let sales = [...a.initial];
    let previousRevenue = 716.924e9;
    const rows = Array.from({ length: 10 }, (_, i): ForecastRow => {
      const t = i / 9;
      if (i > 0)
        sales = sales.map(
          (value, j) =>
            value * (1 + blend(a.growthStart[j], a.growthEnd[j], t)),
        );
      const revenue = sales.reduce((s, v) => s + v, 0);
      const operatingIncome = sales.reduce(
        (s, v, j) => s + v * blend(a.marginStart[j], a.marginEnd[j], t),
        0,
      );
      const tax = operatingIncome * a.tax,
        nopat = operatingIncome - tax;
      const depreciation =
        i === 0
          ? a.depreciation2026
          : revenue *
            blend(
              a.depreciation2026 / a.initial.reduce((s, v) => s + v, 0),
              a.depreciationRatioEnd,
              t,
            );
      const investment =
        i === 0
          ? a.investment2026
          : revenue * blend(a.investmentRatioStart, a.investmentRatioEnd, t);
      const workingCapital =
        Math.max(0, revenue - previousRevenue) * a.workingCapital;
      const freeCashFlow = nopat + depreciation - investment - workingCapital;
      previousRevenue = revenue;
      return {
        year: 2026 + i,
        northAmerica: sales[0],
        international: sales[1],
        aws: sales[2],
        revenue,
        operatingIncome,
        tax,
        nopat,
        depreciation,
        investment,
        workingCapital,
        freeCashFlow,
        fcfMargin: (freeCashFlow / revenue) * 100,
      };
    });
    return [scenario, rows];
  }),
) as Record<Scenario, ForecastRow[]>;

export function amazonDcf(
  scenario: Scenario,
  discount = AMZN_ASSUMPTIONS[scenario].discount,
  growth = AMZN_ASSUMPTIONS[scenario].terminal,
) {
  if (discount <= growth)
    throw new Error("Discount rate must exceed terminal growth");
  const rows = AMZN_FORECASTS[scenario],
    r = discount / 100,
    g = growth / 100;
  const fraction =
    (Date.UTC(2026, 11, 31) - Date.UTC(2026, 9, 4)) / (365.25 * 86400000);
  // Q4 allocation is a timing approximation, not a forecast of unreported Q3 results.
  const pvFcf = rows.reduce(
    (sum, row, i) =>
      sum +
      (i === 0 ? row.freeCashFlow / 4 : row.freeCashFlow) /
        (1 + r) ** (fraction + i),
    0,
  );
  const last = rows[9];
  // Terminal cash retains capital intensity and recomputes working capital at g.
  const terminalCash =
    (last.nopat + last.depreciation - last.investment) * (1 + g) -
    last.revenue * g * AMZN_ASSUMPTIONS[scenario].workingCapital;
  const pvTerminal = terminalCash / (r - g) / (1 + r) ** (fraction + 9);
  const enterpriseValue = pvFcf + pvTerminal;
  const investmentValue =
    AMZN_MODEL_INPUTS.investmentReference *
      AMZN_ASSUMPTIONS[scenario].investmentRecovery *
      (1 - AMZN_MODEL_INPUTS.realizationReserve) -
    AMZN_MODEL_INPUTS.remainingInvestmentFunding;
  const coreEquity =
    enterpriseValue +
    AMZN_MODEL_INPUTS.liquidAssetsProForma -
    AMZN_MODEL_INPUTS.debtClaims;
  const equityValue = coreEquity + investmentValue,
    valuePerShare = equityValue / AMZN_MODEL_INPUTS.shares;
  return {
    discountRate: discount,
    terminalGrowth: growth,
    pvFcf,
    pvTerminal,
    terminalCash,
    enterpriseValue,
    coreEquity,
    investmentValue,
    equityValue,
    valuePerShare,
    upsidePercent: (valuePerShare / AMZN_LATEST_PRICE.close - 1) * 100,
    terminalWeight: (pvTerminal / enterpriseValue) * 100,
  };
}
export const AMZN_DCF_CASES = {
  bear: amazonDcf("bear"),
  base: amazonDcf("base"),
  bull: amazonDcf("bull"),
};
export const AMZN_DCF_SENSITIVITY = [8, 9, 10].map((discount) => ({
  discount,
  values: [2, 3, 4].map(
    (growth) => amazonDcf("base", discount, growth).valuePerShare,
  ),
}));
export const AMZN_MODEL_NOTE = {
  en: "Analyst assumptions, not company guidance. Enterprise DCF uses segment operating profit after SBC, a normalized operating tax rate, non-operating-lease depreciation, full capital investment (cash plus assumed lease/unpaid-equipment additions) and incremental working capital. It does not add SBC back. Q4 2026 equals one quarter of annual estimated cash; 2027-2035 use full years. June balances are adjusted only for the disclosed subsequent OpenAI funding, not represented as October balances. Finance leases and financing obligations are debt claims; operating lease rent stays in operating profit, so operating lease liabilities are not deducted again. Investment recovery applies 25/50/75% to June Anthropic marks plus OpenAI funded cost, with a conservative 20% reserve on recovered proceeds (not a calculated tax bill) and the full $15B potential Anthropic funding deducted now. No value for other private investments or warrants is added. No future buybacks, interest income, investment gains or debt issuance are operating cash. Terminal growth continues reinvestment; high terminal weight means the result depends strongly on distant margins and asset productivity.",
  zh: "全部为分析师假设，不是公司指引。企业 DCF 使用已扣除股权薪酬的分部营业利润、正常化经营税率、不含经营租赁摊销的折旧、完整资本投入（现金及假设的融资租赁与未付款设备增加）及增量营运资本，不加回股权薪酬。2026 年仅折现全年估计现金流的四分之一作为第四季度近似值，2027—2035 年为全年。六月资产负债表仅调整已披露的期后 OpenAI 出资，不等同于十月实际余额。融资租赁与融资义务纳入债权；营业利润保留经营租赁租金，因此不再扣除其租赁负债。投资回收率为 25/50/75%，基于六月 Anthropic 账面估值及 OpenAI 已出资成本，回收额另计 20% 保守准备（并非实际税额），潜在 Anthropic 后续出资 150 亿美元立即全额扣除。其他私募投资与认股权证不另加价值，不将未来回购、利息收入、投资收益或发债作为经营现金流。永续期继续再投资；终值权重高意味着结果高度依赖远期利润率与资产效率。",
};
