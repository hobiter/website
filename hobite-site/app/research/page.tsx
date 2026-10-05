import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Research library for Hobite Capital reports.",
};

const REPORTS = [
  { title: "Top 10 Mid-Cap AI Stocks", description: "Commercial evidence, ranked profiles and five-/ten-year scenarios for $2-10B AI candidates.", href: "/research/ai-mid-cap-investment-outlook" },
  { title: "AI 中盘股：十大研究候选", description: "20 亿至不足 100 亿美元 AI 候选的商业证据、排序与五年/十年情景。", href: "/research/ai-mid-cap-investment-outlook/zh" },
  { title: "Top 10 Small-Cap AI Stocks", description: "Financing, dilution, commercial milestones and five-/ten-year scenarios for $300M-2B candidates.", href: "/research/ai-small-cap-investment-outlook" },
  { title: "AI 小盘股：十大研究候选", description: "3 亿至不足 20 亿美元候选的融资、稀释、商业里程碑与五年/十年情景。", href: "/research/ai-small-cap-investment-outlook/zh" },
  {
    title: "The AI Value Chain: 10- and 20-Year Investment Outlook",
    description: "Full-chain economics, ten-stock ranking, 15-company financial appendix and transparent long-term forecasts.",
    href: "/research/ai-value-chain-investment-outlook",
  },
  {
    title: "AI 全产业价值链：十年与二十年投资展望",
    description: "全产业链经济性、十股排序、十五家公司财务与透明长期预测。",
    href: "/research/ai-value-chain-investment-outlook/zh",
  },
  {
    title: "SK 海力士（SKHY）完整基本面研究中心",
    description: "K-IFRS 财务历史、HBM 与存储周期、纳斯达克 ADS 机制、来源核验及十年估值情景。",
    href: "/research/sk-hynix-complete-fundamental-analysis/zh",
  },
  {
    title: "SK hynix (SKHY) Complete Fundamental Research Hub",
    description: "K-IFRS financial history, HBM and memory-cycle economics, Nasdaq ADS mechanics, sources and ten-year valuation scenarios.",
    href: "/research/sk-hynix-complete-fundamental-analysis",
  },
  {
    title: "礼来（LLY）完整基本面研究中心",
    description: "SEC 财务、替尔泊肽集中度、制药经济、研发与产能投入及十年估值。",
    href: "/research/eli-lilly-complete-fundamental-analysis/zh",
  },
  {
    title: "Eli Lilly (LLY) Complete Fundamental Research Hub",
    description: "SEC financial history, tirzepatide concentration, pharmaceutical economics, research investment and ten-year valuation.",
    href: "/research/eli-lilly-complete-fundamental-analysis",
  },
  {
    title: "AMD 完整基本面研究中心",
    description: "SEC 财年财务、EPYC 与 Instinct 经济、供应承诺、客户权证及十年企业估值。",
    href: "/research/amd-complete-fundamental-analysis/zh",
  },
  {
    title: "AMD Complete Fundamental Research Hub",
    description: "Fiscal financial history, EPYC and Instinct economics, supply commitments, customer warrants and ten-year enterprise valuation.",
    href: "/research/amd-complete-fundamental-analysis",
  },
  {
    title: "美光（MU）完整基本面研究中心",
    description: "SEC 财年财务、存储与 HBM 经济、客户资金、资本支出及十年跨周期估值。",
    href: "/research/micron-complete-fundamental-analysis/zh",
  },
  {
    title: "Micron (MU) Complete Fundamental Research Hub",
    description: "Fiscal financial history, memory and HBM economics, customer funding, gross capex and ten-year cycle-aware valuation.",
    href: "/research/micron-complete-fundamental-analysis",
  },
  {
    title: "台积电（TSM）完整基本面研究中心",
    description: "IFRS 财务、先进制程、代工经济、资本投入、客户集中度及十年货币一致的 ADS 估值。",
    href: "/research/tsmc-complete-fundamental-analysis/zh",
  },
  {
    title: "TSMC (TSM) Complete Fundamental Research Hub",
    description: "IFRS financial history, advanced nodes, foundry economics, capital investment, customer concentration and currency-aware ten-year ADS valuation.",
    href: "/research/tsmc-complete-fundamental-analysis",
  },
  {
    title: "亚马逊（AMZN）完整基本面研究中心",
    description: "SEC 财务、AWS 与零售经济、AI 投入、战略投资、资本配置及十年企业 DCF 情景。",
    href: "/research/amazon-complete-fundamental-analysis/zh",
  },
  {
    title: "Amazon (AMZN) Complete Fundamental Research Hub",
    description: "SEC financial history, AWS and retail economics, AI investment, strategic holdings and ten-year enterprise DCF scenarios.",
    href: "/research/amazon-complete-fundamental-analysis",
  },
  {
    title: "Vistra（VST）完整基本面研究中心",
    description: "中文研究页：SEC 财务、发电与零售经济、核电合同、资本配置及十年普通股现金流估值。",
    href: "/research/vistra-complete-fundamental-analysis/zh",
  },
  {
    title: "Vistra (VST) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, power and retail economics, nuclear contracts, capital allocation and ten-year common-equity DCF scenarios.",
    href: "/research/vistra-complete-fundamental-analysis",
  },
  {
    title: "百度（BIDU）完整基本面研究中心",
    description: "中文研究页：SEC 财务、AI 云与搜索经济、自动驾驶可选性、ADS 估值历史及十年 DCF。",
    href: "/research/baidu-complete-fundamental-analysis/zh",
  },
  {
    title: "Baidu (BIDU) Complete Fundamental Research Hub",
    description: "SEC-backed financial history, AI Cloud and search economics, autonomous mobility optionality, ADS valuation and ten-year DCF scenarios.",
    href: "/research/baidu-complete-fundamental-analysis",
  },
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
