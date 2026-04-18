const POSTS = [
  {
    title: "Google 10-Year Annual Report Study",
    href: "/research/google-10-year-report",
    description: "Long-form analysis based on the last 10 years of Google annual financial reporting.",
  },
  {
    title: "MSFT 10-Year Review",
    href: "/research/msft-10-year-review",
    description: "Revenue, EBITA, and operating cash flow growth visualization.",
  },
  {
    title: "MSFT 十年复盘（中文）",
    href: "/zh/research/msft-10-year-review",
    description: "微软十年收入、EBITA、经营现金流图表。",
  },
  {
    title: "AI Capital Rotation: Where Money Flows Next",
    href: "#",
    description: "Concise market intelligence with long-term perspective.",
  },
  {
    title: "Growth vs Value in the New Rate Cycle",
    href: "#",
    description: "Concise market intelligence with long-term perspective.",
  },
];

const SERVICES = [
  "Equity Research",
  "Macro Strategy",
  "Portfolio Design",
  "Private Advisory",
];

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type InfoCardProps = {
  title: string;
  description: string;
  className?: string;
};

function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 ${className}`.trim()}>
      {children}
    </section>
  );
}

function PillButton({
  href,
  children,
  variant = "primary",
}: PillButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white"
      : "border border-zinc-300 text-zinc-900";

  return (
    <a href={href} className={`px-6 py-3 rounded-2xl ${styles}`}>
      {children}
    </a>
  );
}

function InfoCard({ title, description, className = "" }: InfoCardProps) {
  return (
    <div
      className={`p-6 rounded-3xl bg-white border border-zinc-200 ${className}`.trim()}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}

function ResearchCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <article className="p-6 rounded-3xl bg-white border border-zinc-200">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-zinc-600">{description}</p>
      <a href={href} className="mt-4 inline-block text-sm text-zinc-600 underline">
        Open report
      </a>
    </article>
  );
}

function HeroSection() {
  return (
    <Section className="py-24 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Hobite Capital
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold mt-4 leading-tight">
          Investing intelligence for the next decade.
        </h1>
        <p className="mt-6 text-xl text-zinc-600 max-w-xl">
          Research-driven insights on growth equities, macro cycles, portfolio
          construction, and asymmetric opportunities.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <PillButton href="/research">Research</PillButton>
          <PillButton href="#newsletter" variant="secondary">
            Newsletter
          </PillButton>
          <PillButton href="/operation-log" variant="secondary">
            我的操作记录
          </PillButton>
        </div>
      </div>

      <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-zinc-200">
        <p className="text-sm text-zinc-500">Model Portfolio</p>
        <p className="text-5xl font-semibold mt-3">+18.4%</p>
        <p className="mt-2 text-zinc-600">
          Illustrative dashboard placeholder for future live metrics.
        </p>
      </div>
    </Section>
  );
}

function ServicesSection() {
  return (
    <Section className="py-12 grid md:grid-cols-4 gap-5">
      {SERVICES.map((service) => (
        <InfoCard
          key={service}
          title={service}
          description="Premium frameworks and actionable insights."
        />
      ))}
    </Section>
  );
}

function ResearchSection() {
  return (
    <Section id="research" className="py-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold">Latest Research</h2>
        <a href="/research/msft-10-year-review" className="text-sm text-zinc-500 underline">
          View MSFT Review
        </a>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {POSTS.map((post) => (
          <ResearchCard
            key={post.title}
            title={post.title}
            href={post.href}
            description={post.description}
          />
        ))}
      </div>
    </Section>
  );
}

function NewsletterSection() {
  return (
    <Section id="newsletter" className="py-16">
      <div className="rounded-[2rem] bg-zinc-900 text-white p-10">
        <h2 className="text-3xl font-semibold">Weekly Investor Letter</h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          High-signal market commentary, curated opportunities, and portfolio
          thinking.
        </p>
        <div className="mt-6 flex gap-3">
          <input
            placeholder="Enter your email"
            className="px-4 py-3 rounded-2xl text-zinc-900 w-full max-w-md"
          />
          <button className="px-6 py-3 rounded-2xl bg-white text-zinc-900">
            Subscribe
          </button>
        </div>
      </div>
    </Section>
  );
}

function FeaturesSection() {
  return (
    <Section className="py-16 grid md:grid-cols-2 gap-6">
      <InfoCard
        title="Members Area"
        description="Premium research, watchlists, earnings notes, and private dashboards."
        className="p-8"
      />
      <InfoCard
        title="AI Investing Assistant"
        description="Future upgrade: ask questions about markets, valuation, and portfolio ideas."
        className="p-8"
      />
    </Section>
  );
}

function AdvisorySection() {
  return (
    <Section className="py-20">
      <div className="p-8 rounded-[2rem] bg-zinc-100">
        <h2 className="text-3xl font-semibold">Private Advisory</h2>
        <p className="mt-3 text-zinc-600">
          For serious investors seeking strategic guidance.
        </p>
        <p className="mt-6">hello@yourdomain.com</p>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <HeroSection />
      <ServicesSection />
      <ResearchSection />
      <NewsletterSection />
      <FeaturesSection />
      <AdvisorySection />
    </main>
  );
}
