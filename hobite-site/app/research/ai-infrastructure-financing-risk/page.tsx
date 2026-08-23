import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Infrastructure Financing: Hidden Debt, Real Risk",
  description:
    "A research note on hyperscaler lease commitments, project finance, AI infrastructure leverage, and the risk-adjusted outlook for META, MSFT, AMZN, GOOG, and ORCL.",
};

const SOURCE_URL =
  "https://chatgpt.com/s/t_6a8b56b60c008191a8379fa33dd1fbcf";

const FINANCING_STRUCTURES = [
  {
    structure: "Uncommenced leases",
    reality: "Future rent is committed, but the liability is not recognized until the lease begins.",
    examples: "MSFT, AMZN, ORCL, META, GOOG",
  },
  {
    structure: "Purchase and take-or-pay commitments",
    reality: "The company commits to GPUs, servers, power, or capacity before demand is fully proven.",
    examples: "All major hyperscalers",
  },
  {
    structure: "SPV and joint-venture financing",
    reality: "An outside vehicle borrows while the hyperscaler becomes the anchor tenant or guarantor.",
    examples: "META, especially Hyperion",
  },
  {
    structure: "Guarantees and backstops",
    reality: "The company guarantees payment obligations tied to third-party data-center projects.",
    examples: "GOOG",
  },
  {
    structure: "Direct corporate bonds",
    reality: "Conventional debt is increasingly used to fund the AI capital cycle.",
    examples: "GOOG, AMZN, META, ORCL",
  },
];

const COMPANY_VIEWS = [
  {
    rank: "1",
    ticker: "META",
    risk: "Low to moderate",
    view: "Most attractive",
    tone: "bg-emerald-50 text-emerald-800",
    thesis:
      "The advertising engine still produces exceptional cash flow, while the market has already discounted a meaningful portion of the AI spending risk. Project finance adds complexity, but the valuation offers the best risk-adjusted setup in the group.",
  },
  {
    rank: "2",
    ticker: "MSFT",
    risk: "Low",
    view: "Quality at a reasonable price",
    tone: "bg-blue-50 text-blue-800",
    thesis:
      "The lease pipeline is enormous, but Microsoft's credit quality, cloud backlog, and enterprise software ecosystem provide unusually strong visibility. Economic leverage is higher than headline debt suggests, yet solvency risk remains remote.",
  },
  {
    rank: "3",
    ticker: "AMZN",
    risk: "Moderate",
    view: "Buy on meaningful pullbacks",
    tone: "bg-amber-50 text-amber-800",
    thesis:
      "AWS momentum supports the monetization case, but the stock is not pricing a disaster and free cash flow is obscured by a very heavy investment cycle. Operating quality is strong; valuation support is less obvious than at Meta.",
  },
  {
    rank: "4",
    ticker: "GOOG",
    risk: "Moderate",
    view: "Attractive, monitor commitments",
    tone: "bg-violet-50 text-violet-800",
    thesis:
      "Alphabet combines direct debt with guarantees, credit-derivative treatment, and infrastructure backstops. The business remains attractive, but returns on the expanding AI capital base matter more than a superficially reasonable P/E.",
  },
  {
    rank: "5",
    ticker: "ORCL",
    risk: "High",
    view: "High-beta special situation",
    tone: "bg-red-50 text-red-800",
    thesis:
      "Oracle has the most difficult mix of debt, negative levered free cash flow, long lease commitments, and execution concentration. A large drawdown creates rebound potential, but this is not the same quality of opportunity as the other four.",
  },
];

const STRESS_CHAIN = [
  {
    title: "Private credit and infrastructure funds",
    body: "Long-duration claims increasingly sit with private lenders, insurers, pension funds, and infrastructure vehicles. Refinancing losses and lower collateral values would appear here first.",
  },
  {
    title: "Data-center developers",
    body: "Operators without hyperscaler balance sheets are highly exposed to construction delays, lower lease pricing, and utilization shortfalls.",
  },
  {
    title: "GPU-backed lenders and neoclouds",
    body: "This is the most subprime-like part of the chain: aggressive borrowing against fast-depreciating hardware and short-duration demand.",
  },
  {
    title: "Utilities and power developers",
    body: "Gigawatts of generation and transmission are being built against long-duration demand assumptions that may not all be realized.",
  },
  {
    title: "The corporate bond market",
    body: "Heavy hyperscaler issuance competes for capital and can lift financing costs for other investment-grade borrowers.",
  },
];

const WARNING_SIGNALS = [
  "Cloud growth slows while capital spending continues to grow above 30%.",
  "AI infrastructure utilization falls and empty GPU hours begin to resemble vacant real estate.",
  "GPU rental prices collapse faster than performance per dollar improves.",
  "Hyperscaler credit spreads widen even as reported earnings remain strong.",
  "SPV and project bonds become difficult to issue, forcing more financing onto corporate balance sheets.",
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-zinc-300 py-10 md:py-14">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-950">{title}</h2>
        </div>
        <div className="min-w-0 space-y-5 text-[15px] leading-7 text-zinc-700">
          {children}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="border-l-2 border-zinc-950 pl-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{note}</p>
    </div>
  );
}

export default function AiInfrastructureFinancingRiskPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-10 text-zinc-950 md:px-8 md:py-14">
      <article className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b-2 border-zinc-950 pb-10 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Hobite Capital Research Note
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              AI Infrastructure Financing
            </h1>
            <p className="mt-3 text-2xl text-zinc-500 md:text-3xl">
              Hidden debt, real commitments, and who carries the risk
            </p>
          </div>
          <div className="border-l border-zinc-300 pl-5 text-sm leading-6 text-zinc-600">
            <p className="font-semibold text-zinc-900">Research snapshot</p>
            <p>Published August 2026</p>
            <p>Companies: META, MSFT, AMZN, GOOG, ORCL</p>
            <p className="mt-3">For research and education only. Not investment advice.</p>
            <div className="mt-4 flex gap-2">
              <a className="bg-zinc-950 px-3 py-1.5 font-semibold text-white" href="/research/ai-infrastructure-financing-risk" aria-current="page">
                English
              </a>
              <a className="border border-zinc-300 bg-white px-3 py-1.5 font-semibold text-zinc-900" href="/research/ai-infrastructure-financing-risk/zh">
                中文
              </a>
            </div>
          </div>
        </header>

        <div className="grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
          <div>
            <p className="max-w-4xl text-xl leading-9 text-zinc-800">
              The hidden-debt story is real, but most of the exposure is not literally
              undisclosed debt. It is a mixture of future leases, purchase commitments,
              guarantees, project debt, and long-dated infrastructure contracts that are
              disclosed in footnotes but are not yet recognized as conventional balance-sheet debt.
            </p>
            <p className="mt-5 max-w-4xl leading-8 text-zinc-600">
              The bearish claim that Big Tech secretly owes trillions is too aggressive. The
              opposite claim that these are harmless footnotes is also wrong. A large share of
              the obligations behaves economically like debt because future cash flows are
              committed years, and sometimes decades, in advance.
            </p>
          </div>
          <nav aria-label="Report sections" className="border-l border-zinc-300 pl-5 text-sm">
            <p className="font-semibold text-zinc-950">In this report</p>
            <div className="mt-3 space-y-2 text-zinc-600">
              <a className="block hover:text-zinc-950" href="#scale">Scale of the shift</a>
              <a className="block hover:text-zinc-950" href="#structures">Financing structures</a>
              <a className="block hover:text-zinc-950" href="#companies">Company cases</a>
              <a className="block hover:text-zinc-950" href="#duration">Duration mismatch</a>
              <a className="block hover:text-zinc-950" href="#stress">Where stress appears</a>
              <a className="block hover:text-zinc-950" href="#ranking">Investment ranking</a>
              <a className="block hover:text-zinc-950" href="#signals">Warning signals</a>
            </div>
          </nav>
        </div>

        <Section id="scale" eyebrow="01 / The shift" title="From software economics to infrastructure economics">
          <p>
            The hyperscaler model is moving from software, advertising, cloud, and abundant
            free cash flow toward a hybrid that also resembles telecom, utilities, real estate,
            and infrastructure finance. These remain excellent businesses, but the economics
            are becoming more capital intensive.
          </p>
          <div className="grid gap-7 py-3 sm:grid-cols-3">
            <Stat label="Future leases" value="$1.09T" note="Estimated for five major hyperscalers in the source analysis." />
            <Stat label="Recognized leases" value="$285B" note="Currently recognized lease liabilities in the comparison." />
            <Stat label="2026 capex" value="$750B" note="Estimated spending, equal to roughly 38% of combined revenue." />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-zinc-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Old model</p>
              <p className="mt-3 text-lg font-semibold text-zinc-950">Software + advertising + cloud</p>
              <p className="mt-2 text-sm text-zinc-600">High incremental margins and large free-cash-flow conversion.</p>
            </div>
            <div className="border border-zinc-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Emerging model</p>
              <p className="mt-3 text-lg font-semibold text-zinc-950">Compute + power + real estate + finance</p>
              <p className="mt-2 text-sm text-zinc-600">Higher fixed costs, longer commitments, and greater sensitivity to utilization.</p>
            </div>
          </div>
        </Section>

        <Section id="structures" eyebrow="02 / Capital structure" title="Five ways the obligations are created">
          <div className="overflow-x-auto border border-zinc-200 bg-white">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-950 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Structure</th>
                  <th className="px-4 py-3 font-semibold">Economic reality</th>
                  <th className="px-4 py-3 font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody>
                {FINANCING_STRUCTURES.map((row) => (
                  <tr key={row.structure} className="border-t border-zinc-200 align-top">
                    <td className="px-4 py-4 font-semibold text-zinc-950">{row.structure}</td>
                    <td className="px-4 py-4 text-zinc-650">{row.reality}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The key analytical adjustment is to look beyond GAAP debt and estimate total
            committed capital usage. The disclosures generally exist, but the headline debt
            figure alone does not capture the full economic burden.
          </p>
        </Section>

        <Section id="companies" eyebrow="03 / Case studies" title="How the structures differ by company">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-700">MSFT</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-950">The lease pipeline is the main issue</h3>
              <p className="mt-3">
                Microsoft disclosed roughly $196.6B of additional leases, primarily for data
                centers, that had not yet commenced as of March 31. The terms can extend as long
                as 21 years. This is enormous beside roughly $40B of conventional debt, although
                Microsoft's AAA-quality balance sheet makes it a capital-return issue rather than
                a near-term solvency concern.
              </p>
            </article>

            <article className="border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-violet-700">GOOG</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-950">Guarantees create contingent leverage</h3>
              <p className="mt-3">
                Alphabet backstops some third-party data-center payment obligations and accounts
                for those guarantees as credit derivatives. The source answer cites about $43.8B
                of potential credit-derivative exposure, $7.6B of financial guarantees, and
                $24.1B of potential future infrastructure backstops as of June 30, 2026.
              </p>
            </article>

            <article className="border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-amber-700">AMZN + ORCL</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-950">Pending leases reveal different risk levels</h3>
              <p className="mt-3">
                Amazon's future lease pipeline is meaningful but supported by a diversified cash
                engine. Oracle's commitments are more concerning because they sit beside roughly
                $130B of debt, negative levered free cash flow, lower credit quality, and leases
                that can run for 15 to 19 years.
              </p>
            </article>

            <article className="border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-emerald-700">META</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-950">Hyperion is project finance, not disappearing debt</h3>
              <p className="mt-3">
                Meta and Blue Owl formed a joint venture for the Hyperion campus in Louisiana.
                The project vehicle raised about $27.3B of senior secured debt maturing in 2049.
                It is not Meta corporate debt, but Meta is the anchor tenant whose lease payments
                support the project economics.
              </p>
            </article>
          </div>
          <div className="border-l-4 border-zinc-950 bg-zinc-100 px-5 py-4">
            <p className="font-semibold text-zinc-950">Why finance indirectly?</p>
            <p className="mt-2">
              Project structures preserve corporate borrowing capacity, match debt with assets,
              share construction and residual-value risk, and protect credit ratings. They also
              allow investors to own AI infrastructure risk separately from hyperscaler equity risk.
            </p>
          </div>
        </Section>

        <Section id="duration" eyebrow="04 / Core risk" title="Long debt, short technology life">
          <p>
            The strongest part of the AI-subprime argument is duration mismatch. A data-center
            building or grid connection may remain useful for decades, while the GPUs inside can
            become commercially obsolete in five to seven years. Twenty-year financing can
            therefore outlive the most valuable collateral by a wide margin.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border-t-4 border-zinc-950 bg-white p-5">
              <p className="text-3xl font-semibold">20-25 years</p>
              <p className="mt-2 text-sm text-zinc-600">Possible project-financing duration</p>
            </div>
            <div className="border-t-4 border-red-600 bg-white p-5">
              <p className="text-3xl font-semibold">5-7 years</p>
              <p className="mt-2 text-sm text-zinc-600">Potential commercial life of a GPU generation</p>
            </div>
            <div className="border-t-4 border-amber-500 bg-white p-5">
              <p className="text-3xl font-semibold">90%</p>
              <p className="mt-2 text-sm text-zinc-600">Illustrative utilization assumption that may prove fragile</p>
            </div>
          </div>
          <p>
            If compute efficiency improves rapidly, inference pricing collapses, utilization falls,
            or newer accelerators consume much less power, project cash flows can deteriorate while
            the debt remains fixed. The collateral loses value faster than the financing amortizes.
          </p>
          <p>
            That still does not make the system equivalent to 2006 subprime housing. The anchor
            customers are among the world's strongest cash generators. The closer analogy is the
            1998-2001 telecom and fiber buildout: the technology was real, demand eventually became
            enormous, and too much capital was still deployed too early.
          </p>
        </Section>

        <Section id="stress" eyebrow="05 / Transmission" title="Where financial stress is likely to appear first">
          <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {STRESS_CHAIN.map((item, index) => (
              <article key={item.title} className="bg-white p-5">
                <p className="text-xs font-semibold text-zinc-400">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>
              </article>
            ))}
          </div>
          <p>
            The realistic bearish case is not that Microsoft or Alphabet suddenly fails. It is
            that returns on incremental capital disappoint, free cash flow remains depressed, and
            equity valuation multiples compress even while AI adoption and reported earnings grow.
          </p>
        </Section>

        <Section id="ranking" eyebrow="06 / Portfolio view" title="Risk-adjusted investment ranking">
          <div className="space-y-3">
            {COMPANY_VIEWS.map((company) => (
              <article key={company.ticker} className="grid gap-4 border border-zinc-200 bg-white p-5 md:grid-cols-[54px_120px_150px_1fr] md:items-start">
                <span className="text-3xl font-semibold text-zinc-300">{company.rank}</span>
                <div>
                  <p className="text-2xl font-semibold text-zinc-950">{company.ticker}</p>
                  <span className={`mt-2 inline-flex px-2 py-1 text-xs font-semibold ${company.tone}`}>
                    {company.risk}
                  </span>
                </div>
                <p className="font-semibold text-zinc-950">{company.view}</p>
                <p className="text-sm leading-6 text-zinc-600">{company.thesis}</p>
              </article>
            ))}
          </div>
          <p>
            This ranking is based on risk-adjusted prospective return, not maximum upside. Oracle
            could rebound more sharply than Microsoft, but it does not represent the same quality
            of opportunity. Position sizing and portfolio concentration remain more important than
            small estimates of near-term undervaluation.
          </p>
        </Section>

        <Section id="signals" eyebrow="07 / Monitoring" title="Five signals that would weaken the AI capital cycle">
          <ol className="divide-y divide-zinc-200 border-y border-zinc-200">
            {WARNING_SIGNALS.map((signal, index) => (
              <li key={signal} className="grid gap-3 py-4 sm:grid-cols-[44px_1fr]">
                <span className="font-mono text-sm font-semibold text-red-600">0{index + 1}</span>
                <p className="font-medium text-zinc-900">{signal}</p>
              </li>
            ))}
          </ol>
        </Section>

        <section className="border-y-2 border-zinc-950 bg-zinc-950 px-6 py-9 text-white md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Central conclusion</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
            This is not yet an AI subprime crisis. It is the financialization of AI infrastructure.
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-zinc-300">
            The decisive question is no longer who has the best model or the most GPUs. It is who
            can earn a return on trillions of dollars of capital above the cost of financing it.
            AI can succeed technologically while shareholders still receive disappointing returns
            if capital intensity stays high and incremental returns fall.
          </p>
        </section>

        <footer className="flex flex-col gap-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Adapted into a research page from the user-provided ChatGPT analysis.</p>
          <a className="font-semibold text-zinc-900 underline underline-offset-4" href={SOURCE_URL} rel="noreferrer" target="_blank">
            Read the original shared answer
          </a>
        </footer>
      </article>
    </main>
  );
}
