import type { Metadata } from "next";

const SUMMARY_POINTS = [
  "Microsoft has transformed from a Windows-and-Office company into a cloud-and-AI platform leader.",
  "Over the last decade, revenue, earnings power, and free cash flow all expanded materially.",
  "Azure, Microsoft 365, and enterprise platform integration are now the core of the company’s strategic moat.",
  "The next leg of the story depends on AI monetization, infrastructure efficiency, and continued enterprise adoption.",
];

const DECADE_TIMELINE = [
  {
    period: "2016–2018",
    title: "The platform reset",
    description:
      "Microsoft accelerated its shift away from a legacy license-first identity and leaned into recurring software, cloud infrastructure, developer tools, and enterprise workflows. This period established the foundation for a very different company.",
  },
  {
    period: "2019–2021",
    title: "Cloud scale becomes visible",
    description:
      "Azure became a central growth engine, Office evolved more fully into Microsoft 365, and the company proved it could compound growth at scale while broadening operating leverage.",
  },
  {
    period: "2022–2023",
    title: "Durable enterprise franchise",
    description:
      "Even through a more difficult macro environment, Microsoft continued to benefit from deep enterprise relationships, strong renewal economics, and a diversified software and infrastructure stack.",
  },
  {
    period: "2024–2025",
    title: "AI platform shift",
    description:
      "The investment case increasingly centered on AI infrastructure, Copilot adoption, higher datacenter intensity, and the question of whether Microsoft could convert early product leadership into a long-duration monetization engine.",
  },
];

const FINANCIAL_ARC = [
  {
    label: "Revenue trajectory",
    detail:
      "The business moved from a large, high-quality software franchise into a much broader cloud and services platform with meaningfully higher absolute revenue and a richer mix of recurring consumption-based revenue.",
  },
  {
    label: "Margin quality",
    detail:
      "Operating income expanded alongside revenue, reflecting software economics, cloud scale, and disciplined capital allocation, even as infrastructure investment increased.",
  },
  {
    label: "Cash generation",
    detail:
      "Microsoft’s free cash flow profile remained one of the strongest in large-cap technology, supporting buybacks, dividends, and continued strategic investment.",
  },
  {
    label: "Balance sheet strength",
    detail:
      "The company preserved substantial flexibility, allowing it to fund AI infrastructure, invest through cycles, and maintain optionality for platform expansion.",
  },
];

const SEGMENTS = [
  {
    title: "Productivity and Business Processes",
    thesis:
      "This segment anchors Microsoft’s recurring enterprise relationship. Microsoft 365, Dynamics, and LinkedIn create a durable workflow layer that is difficult for customers to replace once embedded in daily operations.",
  },
  {
    title: "Intelligent Cloud",
    thesis:
      "This is the core strategic engine of the modern Microsoft story. Azure gives Microsoft exposure to enterprise infrastructure modernization, data workloads, AI compute demand, and long-term platform standardization.",
  },
  {
    title: "More Personal Computing",
    thesis:
      "This segment is more mature and more cyclical, but it still matters. Windows, devices, gaming, and search help preserve Microsoft’s distribution, ecosystem reach, and consumer relevance.",
  },
];

const MOATS = [
  {
    title: "Enterprise distribution",
    body:
      "Few companies have Microsoft’s installed base across identity, productivity, infrastructure, developer tools, and security. This distribution lowers customer acquisition friction and strengthens cross-sell economics.",
  },
  {
    title: "Integrated stack",
    body:
      "Microsoft can sell infrastructure, data services, productivity software, collaboration products, security tooling, and AI features as one connected ecosystem rather than as isolated products.",
  },
  {
    title: "Switching costs",
    body:
      "The more deeply a customer standardizes on Azure, Microsoft 365, Teams, Entra, GitHub, and the broader Microsoft stack, the harder it becomes to unwind that relationship without operational pain.",
  },
  {
    title: "Capital and execution",
    body:
      "At hyperscale, execution matters as much as innovation. Microsoft has the balance sheet, channel reach, and operating discipline to invest through technology transitions that many competitors cannot fund at the same pace.",
  },
];

const RISKS = [
  "AI infrastructure spending could pressure margins if monetization lags the pace of capital deployment.",
  "Azure growth remains exposed to hyperscaler competition, enterprise optimization cycles, and pricing pressure.",
  "Regulatory scrutiny around cloud, productivity bundling, AI, and platform power could increase over time.",
  "A weaker PC, gaming, or enterprise spending cycle could weigh on near-term sentiment even if the long-term thesis remains intact.",
];

const INVESTOR_FRAMEWORK = [
  {
    title: "Why bulls stay constructive",
    points: [
      "Best-in-class enterprise distribution",
      "Strong cloud position with AI upside",
      "High-quality recurring revenue base",
      "Exceptional capital returns and cash generation",
    ],
  },
  {
    title: "What skeptics focus on",
    points: [
      "Large-cap size makes future outperformance harder",
      "AI enthusiasm may already be reflected in valuation",
      "Capex intensity could remain elevated for longer",
      "Execution risk rises when infrastructure demand surges",
    ],
  },
];

export const metadata: Metadata = {
  title: "Microsoft (MSFT): 10 Years of Reinvention",
  description:
    "A long-form Hobite Capital review of Microsoft’s last decade, from cloud transition to AI platform leadership.",
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-10 shadow-sm">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-900">{title}</h2>
      <div className="mt-6 text-zinc-700 leading-8">{children}</div>
    </section>
  );
}

export default function MsftTenYearReviewPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-zinc-200 bg-gradient-to-b from-white to-zinc-100 p-8 md:p-12 shadow-sm">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            Hobite Capital · Equity Research
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-semibold leading-tight">
            Microsoft (MSFT): 10 Years of Reinvention
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-zinc-600 leading-8">
            Over the last decade, Microsoft has executed one of the most important large-cap
            transformations in modern technology. What was once still viewed primarily through
            the lens of Windows and Office is now better understood as a cloud, productivity,
            developer, security, and AI platform company.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SUMMARY_POINTS.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-zinc-200 bg-white/80 p-5 text-sm md:text-base text-zinc-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          <Section eyebrow="Executive view" title="Why this decade matters">
            <p>
              Microsoft’s long-term significance is not just that it grew. It is that it changed
              the shape of its growth. The company shifted from a model centered on packaged
              software and legacy computing dominance toward a much broader model built on
              subscription software, cloud infrastructure, developer ecosystems, data platforms,
              security, and AI-enabled workflows.
            </p>
            <p className="mt-4">
              That matters because quality in large technology companies comes not only from size,
              but from the durability of demand, the depth of customer integration, and the
              ability to define the next platform cycle before the current one matures. Microsoft
              has managed to do all three unusually well.
            </p>
          </Section>

          <Section eyebrow="Timeline" title="The four chapters of Microsoft’s transformation">
            <div className="grid gap-5">
              {DECADE_TIMELINE.map((item) => (
                <div
                  key={item.period}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <p className="text-sm font-medium text-zinc-500">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-3 text-zinc-700">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Financial arc" title="What changed in the business model">
            <div className="grid gap-5 md:grid-cols-2">
              {FINANCIAL_ARC.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{item.label}</h3>
                  <p className="mt-3 text-zinc-700">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              The key point for investors is that Microsoft now monetizes more of its customer
              relationship through recurring subscriptions, cloud consumption, and layered platform
              services. That mix is generally more resilient and strategically valuable than a
              model dominated by one-time software licensing.
            </p>
          </Section>

          <Section eyebrow="Segments" title="How the company is built today">
            <div className="grid gap-5 md:grid-cols-3">
              {SEGMENTS.map((segment) => (
                <div
                  key={segment.title}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{segment.title}</h3>
                  <p className="mt-3 text-zinc-700">{segment.thesis}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Competitive advantage" title="Why Microsoft’s moat is so difficult to attack">
            <div className="grid gap-5 md:grid-cols-2">
              {MOATS.map((moat) => (
                <div
                  key={moat.title}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{moat.title}</h3>
                  <p className="mt-3 text-zinc-700">{moat.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="AI era" title="The current debate: platform winner or capital-intensive peak?">
            <p>
              The present Microsoft thesis sits at the intersection of optimism and discipline.
              Optimists see a company that is uniquely positioned to monetize AI across
              infrastructure, productivity, software development, security, and enterprise data
              workflows. Skeptics agree the positioning is strong, but ask whether the earnings
              power from AI will arrive fast enough to justify the scale of infrastructure
              spending now underway.
            </p>
            <p className="mt-4">
              This is the right debate. It is not whether Microsoft is a high-quality business.
              It clearly is. The real question is how much incremental value AI adds beyond what
              was already an exceptional enterprise compounding machine.
            </p>
          </Section>

          <Section eyebrow="Risk map" title="What could go wrong">
            <ul className="space-y-3">
              {RISKS.map((risk) => (
                <li key={risk} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  {risk}
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="Investor lens" title="A practical framework for thinking about the stock">
            <div className="grid gap-5 md:grid-cols-2">
              {INVESTOR_FRAMEWORK.map((column) => (
                <div
                  key={column.title}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-900">{column.title}</h3>
                  <ul className="mt-4 space-y-3 text-zinc-700">
                    {column.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6">
              For long-term investors, Microsoft often works best when viewed less as a short-term
              narrative trade and more as a platform allocator: a business with multiple engines,
              high strategic relevance, and the ability to reinvest at scale without sacrificing
              financial durability.
            </p>
          </Section>

          <Section eyebrow="Bottom line" title="Final view">
            <p>
              Microsoft’s last ten years represent one of the clearest examples of successful
              reinvention at mega-cap scale. The company did not merely defend an incumbent
              franchise. It rebuilt itself around the next generation of enterprise technology and
              now enters the AI cycle from a position of unusual strength.
            </p>
            <p className="mt-4">
              That does not remove valuation risk or execution risk. But it does explain why
              Microsoft continues to command premium attention from long-duration investors. When a
              company owns the workflow layer, the developer layer, the identity layer, and an
              increasingly important share of the infrastructure layer, it tends to stay relevant
              longer than the market first expects.
            </p>
            <p className="mt-4 font-medium text-zinc-900">
              The core conclusion: Microsoft is no longer just a software incumbent. It is one of
              the primary operating systems of modern enterprise technology.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
