const PLATFORM_ITEMS = [
  {
    title: "FIFA Knockout Prediction",
    description:
      "Build a World Cup bracket, generate a poster, and download or share it.",
    href: "/platform/elimination-prediction",
  },
  {
    title: "Model Portfolio",
    description: "High-conviction positions and allocation logic.",
    href: "#",
  },
  {
    title: "Macro Positioning",
    description: "Where we are in the cycle.",
    href: "#",
  },
  {
    title: "Risk Framework",
    description: "Drawdown and capital protection discipline.",
    href: "#",
  },
];

export default function PlatformPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Investor Platform</h1>
      <p className="mt-4 max-w-2xl text-zinc-600">
        Portfolio strategy, positioning, long-term capital allocation, and
        interactive tools.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {PLATFORM_ITEMS.map((item) => (
          <a
            className="rounded-lg border border-zinc-200 bg-white p-6 transition hover:border-zinc-400"
            href={item.href}
            key={item.title}
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
