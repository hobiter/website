import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Research library for Hobite Capital reports.",
};

const REPORTS = [
  {
    title: "Meta Platforms（META）完整基本面研究中心",
    description: "中文研究页：SEC 财务、广告运营指标、AI 基础设施资本强度、资本配置、估值历史及十年 DCF。",
    href: "/research/meta-complete-fundamental-analysis/zh",
  },
  {
    title: "Meta Platforms (META) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, advertising drivers, AI infrastructure economics, capital allocation, valuation history and ten-year DCF scenarios.",
    href: "/research/meta-complete-fundamental-analysis",
  },
  {
    title: "英伟达（NVDA）完整基本面研究中心",
    description: "中文研究页：SEC 财务、AI 平台经济、供应承诺、资本配置、估值历史及十年 DCF。",
    href: "/research/nvidia-complete-fundamental-analysis/zh",
  },
  {
    title: "NVIDIA (NVDA) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, AI platform and supply economics, capital allocation, valuation history and ten-year DCF scenarios.",
    href: "/research/nvidia-complete-fundamental-analysis",
  },
  {
    title: "特斯拉（TSLA）完整基本面研究中心",
    description: "中文研究页：SEC 财务、汽车与储能经济性、FSD 与实体 AI 情景、资本配置、估值历史及十年 DCF。",
    href: "/research/tesla-complete-fundamental-analysis/zh",
  },
  {
    title: "Tesla (TSLA) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, vehicle, FSD and energy operating metrics, capital intensity, valuation history and ten-year DCF scenarios.",
    href: "/research/tesla-complete-fundamental-analysis",
  },
  {
    title: "博通（AVGO）完整基本面研究中心",
    description: "中文研究页：SEC 财务、AI 半导体与 VMware 经济性、资本配置、估值历史、十年预测、DCF、来源审计与 QA。",
    href: "/research/broadcom-complete-fundamental-analysis/zh",
  },
  {
    title: "Broadcom (AVGO) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, AI semiconductor and VMware economics, capital allocation, valuation history and ten-year DCF scenarios.",
    href: "/research/broadcom-complete-fundamental-analysis",
  },
  {
    title: "Berkshire Hathaway (BRK.B) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, operating earnings, insurance float, capital allocation, valuation history and ten-year scenarios.",
    href: "/research/berkshire-hathaway-complete-fundamental-analysis",
  },
  {
    title: "AI 基础设施融资：隐性债务与真实风险",
    description: "中文研究页：大型云厂商租赁承诺、项目融资、期限错配、压力传导，以及 META、MSFT、AMZN、GOOG 与 ORCL 的风险调整后排名。",
    href: "/research/ai-infrastructure-financing-risk/zh",
  },
  {
    title: "AI Infrastructure Financing: Hidden Debt, Real Risk",
    description: "Hyperscaler lease commitments, project finance, duration mismatch, stress transmission, and a risk-adjusted ranking of META, MSFT, AMZN, GOOG, and ORCL.",
    href: "/research/ai-infrastructure-financing-risk",
  },
  {
    title: "阿里巴巴（BABA）完整基本面研究中心",
    description: "中文研究页：20-F 财务、6-K 更新、分部经济、ADS 估值、预测、DCF、来源审计与 QA。",
    href: "/research/alibaba-complete-fundamental-analysis/zh",
  },
  {
    title: "Alibaba (BABA) Complete Fundamental Research Hub",
    description: "SEC-backed Form 20-F financial history, segment economics, ADS valuation, forecast, DCF, source audit, and QA.",
    href: "/research/alibaba-complete-fundamental-analysis",
  },
  {
    title: "Netflix（NFLX）完整基本面研究中心",
    description: "中文研究页：SEC 财务、订阅用户、内容经济、估值历史、预测、DCF、来源审计与 QA。",
    href: "/research/netflix-complete-fundamental-analysis/zh",
  },
  {
    title: "Netflix (NFLX) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, subscriber analysis, content economics, valuation, forecast, and DCF project hub.",
    href: "/research/netflix-complete-fundamental-analysis",
  },
  {
    title: "AI Era Long-Term Investing Framework",
    description: "Workflow, data, infrastructure, and AI platform investing framework.",
    href: "/research/ai-era-investing-framework",
  },
  {
    title: "AI时代长期投资框架",
    description: "AI时代 workflow、数据、基础设施与长期资产配置框架。",
    href: "/zh/research/ai-era-investing-framework",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    description: "Agentforce AI thesis, Data Cloud, and margin expansion analysis.",
    href: "/research/crm-15-year-fundamental-analysis",
  },
  {
    title: "Oracle (ORCL) 15-Year Fundamental Analysis",
    description: "OCI growth, AI infrastructure thesis, balance sheet analysis, and 10-year outlook.",
    href: "/research/oracle-15-year-fundamental-analysis",
  },
  {
    title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
    description: "AI workflow operating system thesis, EBITDA expansion, and enterprise moat analysis.",
    href: "/research/now-15-year-fundamental-analysis",
  },
  {
    title: "Pinterest (PINS) 7-Year Fundamental Analysis",
    description: "Quarterly revenue, adjusted EBITDA, margin charts, AI thesis, and 5-year outlook.",
    href: "/research/pins-7-year-fundamental-analysis",
  },
  {
    title: "Google 5-Year 10-K Detailed Analysis",
    description: "Detailed 10-K based analysis for FY2021-FY2025.",
    href: "/research/google-5-year-10k-analysis",
  },
  {
    title: "Reddit（RDDT）深度基本面分析",
    description: "AI搜索、社区经济学、Revenue增长与未来十年展望。",
    href: "/zh/research/rddt-deep-fundamental-analysis",
  },
  {
    title: "AI Era Long-Term Investing Framework",
    description: "Workflow, data, infrastructure, and AI platform investing framework.",
    href: "/research/ai-era-investing-framework",
  },
  {
    title: "AI时代长期投资框架",
    description: "AI时代 workflow、数据、基础设施与长期资产配置框架。",
    href: "/zh/research/ai-era-investing-framework",
  },
  {
    title: "Salesforce (CRM) 15-Year Fundamental Analysis",
    description: "Agentforce AI thesis, Data Cloud, and margin expansion analysis.",
    href: "/research/crm-15-year-fundamental-analysis",
  },
  {
    title: "Oracle (ORCL) 15-Year Fundamental Analysis",
    description: "OCI growth, AI infrastructure thesis, balance sheet analysis, and 10-year outlook.",
    href: "/research/oracle-15-year-fundamental-analysis",
  },
  {
    title: "ServiceNow (NOW) 15-Year Fundamental Analysis",
    description: "AI workflow operating system thesis, EBITDA expansion, and enterprise moat analysis.",
    href: "/research/now-15-year-fundamental-analysis",
  },
  {
    title: "Pinterest (PINS) 7-Year Fundamental Analysis",
    description: "Quarterly revenue, adjusted EBITDA, margin charts, AI thesis, and 5-year outlook.",
    href: "/research/pins-7-year-fundamental-analysis",
  },
  {
    title: "Google (Alphabet) 10-Year Annual Report Study",
    description: "Long-form review of Google annual financial reports over FY2016-FY2025.",
    href: "/research/google-10-year-report",
  },
  {
    title: "MSFT 10-Year Review",
    description: "Revenue, EBITA, and operating cash flow growth visualization.",
    href: "/research/msft-10-year-review",
  },
];

export default function ResearchIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-semibold">Research Library</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Long-form institutional-style research covering AI infrastructure, software, internet platforms, cloud, and long-duration compounders.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {REPORTS.map((report) => (
            <article key={report.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-2xl font-medium">{report.title}</h2>
              <p className="mt-3 text-zinc-600">{report.description}</p>
              <a href={report.href} className="mt-5 inline-block text-sm font-medium text-zinc-700 underline">
                Open report
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
