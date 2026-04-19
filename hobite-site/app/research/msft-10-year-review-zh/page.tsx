import { ChartGrid } from "../msft-10-year-review/charts";

export default function Page(){
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold">微软（MSFT）：过去10年转型</h1>
        <p className="mt-4 text-zinc-600">从软件公司到云 + AI 平台</p>

        <a href="/research/msft-10-year-review" className="text-sm mt-2 inline-block underline">
          English Version
        </a>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">10年财务增长</h2>
          <ChartGrid />
        </div>

        <div className="mt-10 space-y-6 text-zinc-700">
          <p>过去10年，微软收入增长约3倍，营业利润增长约5倍，现金流持续提升。</p>
          <p>核心驱动力来自 Azure 云计算 + 订阅模式 + AI 平台。</p>

          <p>微软的本质已经从传统软件公司，转变为：</p>
          <ul className="list-disc ml-6">
            <li>云基础设施平台（Azure）</li>
            <li>企业生产力平台（Office 365）</li>
            <li>AI 平台（Copilot + OpenAI）</li>
          </ul>

          <p>投资核心逻辑：</p>
          <ul className="list-disc ml-6">
            <li>高粘性企业客户</li>
            <li>订阅收入稳定</li>
            <li>AI 带来第二增长曲线</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
