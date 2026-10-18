import type { ReactNode } from "react";
import { capability, chapters, competition, description, metrics, pick, researchDate, sources, stack, threats, title, type Lang, type SourceKey } from "./data";

type Cell = string | number;
function Table({ caption, headers, rows }: { caption: string; headers: string[]; rows: Cell[][] }) {
  return <div className="moat-table" role="region" aria-label={caption} tabIndex={0}>
    <table><caption>{caption}</caption><thead><tr>{headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function MoatView({ lang }: { lang: Lang }) {
  const t = (en: string, zh: string) => pick([en, zh], lang);
  const sourceLink = (key: SourceKey) => <a key={key} href={sources[key].url} target="_blank" rel="noopener noreferrer">{sources[key].label}</a>;
  const extras: Partial<Record<string, ReactNode>> = {
    stack: <Table caption={t("Analytical product stack, not reporting segments", "分析性产品栈，并非披露分部")} headers={[t("Layer", "层次"), t("Examples", "示例"), t("Economic role", "经济角色")]} rows={stack.map(s => [pick(s.layer, lang), s.products, pick(s.role, lang)])} />,
    comparison: <>
      <Table caption={t("Source opinions / 10, not measured benchmarks", "原文主观分数／10，并非实测基准")} headers={[t("Capability", "能力"), "AVGO", "MRVL", t("Interpretation", "解读")]} rows={capability.map(s => [pick(s.area, lang), s.avgo.toFixed(1), s.mrvl.toFixed(1), pick(s.note, lang)])} />
      <Table caption={t("Source competitive-risk scenarios", "原文竞争风险情景")} headers={[t("Area", "领域"), t("Assessed threat", "判断的威胁"), t("Possible horizon", "可能时段")]} rows={threats.map(s => [pick(s.area, lang), pick(s.level, lang), s.horizon === "Current" ? t("Current", "当前") : s.horizon])} />
    </>,
    scenario: <>
      <figure className="moat-chart">
        <figcaption>{t("Broadcom AI revenue scenarios | USD billions", "博通 AI 收入情景｜十亿美元")}</figcaption>
        <p className="moat-legend"><span><i className="moat-original" />{t("Source original", "原文基准")}</span><span><i className="moat-adjusted" />{t("Competition-adjusted", "竞争调整")}</span></p>
        {competition.map(r => <div className="moat-chart-row" key={r.fy}><strong>FY{r.fy}</strong><div aria-hidden="true"><div className="moat-track"><div className="moat-original" style={{ width: `${r.original / 350 * 100}%` }} /></div><div className="moat-track"><div className="moat-adjusted" style={{ width: `${r.adjusted / 350 * 100}%` }} /></div></div><span>{r.original} / {r.adjusted}</span></div>)}
        <small>{t("Zero-to-$350B scale; illustrative source assumptions, not guidance. Full data follow.", "零至 3,500 亿美元刻度；原文假设，并非指引。完整数据见下表。")}</small>
      </figure>
      <Table caption={t("Source assumptions: AI revenue only, USD billions", "原文假设：仅 AI 收入，十亿美元")} headers={[t("Fiscal year", "财年"), t("Original", "原文基准"), t("Adjusted", "竞争调整"), t("Reduction", "减少"), t("Reduction %", "减少比例")]} rows={competition.map(r => [`FY${r.fy}`, r.original, r.adjusted, r.original - r.adjusted, `${((r.original - r.adjusted) / r.original * 100).toFixed(1)}%`])} />
    </>,
    monitor: <Table caption={t("Evidence-based monitoring checklist", "以证据为基础的观察清单")} headers={[t("Indicator", "指标"), t("What to verify", "应核验什么")]} rows={metrics.map(m => [pick(m.metric, lang), pick(m.evidence, lang)])} />,
  };
  return <article className="avgo-moat" lang={lang === "zh" ? "zh-CN" : "en"}>
    <style>{`
      .avgo-moat{max-width:1120px;min-width:0;margin:0 auto;padding:36px 24px 72px;color:inherit;font-size:16px;line-height:1.85;overflow-wrap:anywhere;letter-spacing:0}
      .avgo-moat *{box-sizing:border-box;min-width:0}.avgo-moat a{color:inherit;text-decoration:underline;text-decoration-color:#13838a;text-underline-offset:4px}
      .avgo-moat header{padding-bottom:24px;border-bottom:2px solid #13838a}.avgo-moat h1{font-size:36px;line-height:1.25;margin:22px 0;letter-spacing:0}
      .avgo-moat h2{font-size:24px;line-height:1.4;margin:0 0 16px;letter-spacing:0}.avgo-moat p{margin:12px 0}.avgo-moat nav{display:flex;gap:12px 22px;flex-wrap:wrap;margin:18px 0;font-size:14px}
      .avgo-moat section{padding:30px 0;border-bottom:1px solid #7b879540;scroll-margin-top:100px}.avgo-moat .moat-meta{font-size:14px;opacity:.8}
      .avgo-moat .moat-note{border-left:4px solid #b98925;padding:8px 18px;margin:24px 0}.avgo-moat .moat-refs{display:flex;gap:12px 20px;flex-wrap:wrap;font-size:13px}
      .avgo-moat .moat-table{max-width:100%;overflow-x:auto;margin:22px 0;border:1px solid #7b879540;border-radius:4px}
      .avgo-moat table{width:100%;border-collapse:collapse;text-align:left;font-size:14px}.avgo-moat caption{padding:12px;text-align:left;font-weight:650}
      .avgo-moat th,.avgo-moat td{padding:11px 12px;min-width:80px;vertical-align:top;border-bottom:1px solid #7b879530}.avgo-moat thead{background:#13838a12}
      .avgo-moat .moat-chart{margin:24px 0;padding:20px 0;border-top:1px solid #7b879540;border-bottom:1px solid #7b879540}.avgo-moat figcaption{font-weight:650}
      .avgo-moat .moat-legend{display:flex;gap:20px;flex-wrap:wrap;font-size:14px}.avgo-moat .moat-legend span{display:flex;align-items:center;gap:8px}.avgo-moat .moat-legend i{display:inline-block;width:16px;height:12px}
      .avgo-moat .moat-chart-row{display:grid;grid-template-columns:66px minmax(0,1fr) 85px;gap:12px;align-items:center;margin:16px 0;font-size:14px}.avgo-moat .moat-track{height:12px;background:#7b879515;margin:3px 0}
      .avgo-moat .moat-track div{height:100%}.avgo-moat .moat-original{background:#13838a}.avgo-moat .moat-adjusted{background:#b98925}
      .avgo-moat small{font-size:13px}.avgo-moat footer{font-size:14px;padding-top:24px}
      @media(max-width:640px){.avgo-moat{padding:24px 16px 48px}.avgo-moat h1{font-size:28px}.avgo-moat h2{font-size:21px}.avgo-moat th,.avgo-moat td{padding:9px}.avgo-moat .moat-chart-row{grid-template-columns:58px minmax(0,1fr) 72px;gap:8px}}
    `}</style>
    <header>
      <nav aria-label={t("Article navigation", "文章导航")}><a href="/research">{t("Research library", "研究目录")}</a><a href="/research/broadcom-marvell-ai-semiconductor-moat" hrefLang="en">English</a><a href="/research/broadcom-marvell-ai-semiconductor-moat/zh" hrefLang="zh-CN">中文</a></nav>
      <p className="moat-meta">AVGO / MRVL · {researchDate} · {t("Competitive strategy research", "竞争战略研究")}</p>
      <h1>{pick(title, lang)}</h1><p>{pick(description, lang)}</p>
    </header>
    <aside className="moat-note" aria-label={t("Scope and limitations", "范围与限制")}>
      <strong>{t("A durable moat is not an exclusive contract or a cheap stock", "持久护城河不等于独家合同，也不等于股票便宜")}</strong>
      <p>{t("Adapted only from the final AVGO-versus-MRVL answer in the supplied conversation. Major announcements were checked against linked primary sources. Original capability scores, competitive timing and long-term revenue paths remain subjective analysis, not company guidance. Some transcript figures remain explicitly unverified. No current price target, personalized allocation or automated monitoring is offered.", "仅整理所提供对话最后一篇 AVGO 对 MRVL 的分析。主要公告已与链接的一手来源核对；原文能力评分、竞争时间与长期收入路径仍是主观分析，不是公司指引。部分对话数字明确保留为未核验。本页不提供当前目标价、个人配置或自动监控。")}</p>
    </aside>
    <nav aria-label={t("Contents", "目录")}>{chapters.map(ch => <a key={ch.id} href={`#${ch.id}`}>{pick(ch.heading, lang)}</a>)}<a href="#sources">{t("Sources and corrections", "来源与修订")}</a></nav>
    {chapters.map(ch => <section key={ch.id} id={ch.id}>
      <h2>{pick(ch.heading, lang)}</h2>
      {ch.paragraphs.map((p, i) => <p key={i}>{pick(p, lang)}</p>)}
      {extras[ch.id]}
      {ch.refs ? <div className="moat-refs" aria-label={t("Section sources", "本节来源")}>{ch.refs.map(sourceLink)}</div> : null}
    </section>)}
    <section id="sources"><h2>{t("15. Sources, corrections and open checks", "十五、来源、修订与待核查项")}</h2>
      <p>{t("The source's economic thesis is retained while shortening conversational repetition. The Google warrant chronology, discretionary-purchase interpretation and distinction between exit run rates and full-year revenue are clarified. Capability scores and threat horizons have no external benchmark validation. The FY2027/28 anchors, source product mix, capacity assurances and Investor Day aspirations require further primary-document reconciliation before valuation use.", "保留原文经济逻辑，压缩对话重复；澄清 Google 权证时间线、自主采购含义与期末年化／全年收入区别。能力分数与威胁时间未获外部基准验证；FY2027／28 收入锚、原文产品结构、产能保障及投资者日愿景，在用于估值前仍需进一步与一手文件调节。")}</p>
      <Table caption={t("Primary-source register", "一手来源登记")} headers={[t("Source", "来源"), t("Evidence boundary", "证据边界")]} rows={Object.values(sources).map(s => [s.label, pick(s.status, lang)])} />
      <ul>{(Object.keys(sources) as SourceKey[]).map(key => <li key={key}>{sourceLink(key)}</li>)}</ul>
      <p><a href="/research/broadcom-complete-fundamental-analysis">{t("Broadcom full fundamental research", "博通完整基本面研究（英文）")}</a>{" · "}<a href="/research/broadcom-complete-fundamental-analysis/zh">{t("Chinese Broadcom research", "博通完整中文研究")}</a></p>
    </section>
    <footer>{t("Research and educational discussion only. Forecasts may fail. Product specifications and partnership announcements do not guarantee market share, profit or investment returns.", "仅供研究与教育讨论。预测可能失效。产品规格与合作公告不保证市场份额、利润或投资回报。")}</footer>
  </article>;
}
