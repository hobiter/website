export type ArchiveEntry = {
  id: string;
  author: string;
  kind: "entry" | "reply";
  heading?: string;
  floor?: number;
  date?: string;
  archivedTime?: string;
  page?: number;
  lines: string[];
};

export const archiveUrl = "https://kantie.org/topics/mitbbs/37286123";
const printHeader = /^\d{1,2}\/\d{1,2}\/\d{2,4},\s+\d{1,2}:\d{2}\s*[AP]M\s+\[hobite\]我的操作记录\s*-\s*[^\n]*?看帖神器\s*/i;
const printFooter = /https:\/\/kantie\.org\/topics\/mitbbs\/37286123\s+(\d+)\/\d+\s*$/i;
const authorHeader = /^(\S+)\s+((?:(?:接近|大约|超过)\s+)?\d+\s*年)\s*(\d+)\s*楼(?:\s+|$)/u;
const joinedReply = /\s+(hobite)\s+((?:接近|大约|超过)\s+\d+\s*年)\s*(\d+)\s*楼$/u;
const headingDate = /^(?:(\d{4})[-/])?((?:0?[1-9]|1[0-2])[-/](?:0?[1-9]|[12]\d|3[01]))(?:\s*[-–—~至]+\s*(?:\d{4}[-/])?\d{1,2}[-/]\d{1,2})?(?:\s*更新)?$/u;

export function parseArchive(raw: string): ArchiveEntry[] {
  const entries: ArchiveEntry[] = [];
  let current: ArchiveEntry | undefined;
  let page = 1;
  let year: string | undefined;
  let inReplies = false;
  const ids = new Set<string>();

  function start(line: number, props: Omit<ArchiveEntry, "id" | "lines" | "page">) {
    const base = props.floor === undefined ? `entry-${line}` : `reply-${props.floor}`;
    const id = ids.has(base) ? `${base}-${line}` : base;
    ids.add(id);
    current = { ...props, id, page, lines: [] };
    entries.push(current);
  }

  raw.split(/\r?\n/).forEach((value, index) => {
    let text = value.trim().replace(printHeader, "");
    const footer = text.match(printFooter);
    if (footer) text = text.slice(0, footer.index).trim();

    const inline = inReplies && isQuoted(text) ? text.match(joinedReply) : null;
    const reply = text.match(authorHeader)
      ?? (inline && Number(inline[3]) === (current?.floor ?? 0) + 1 ? inline : null);
    if (reply) {
      if (reply.index) current?.lines.push(text.slice(0, reply.index).trim());
      inReplies = true;
      start(index + 1, { author: reply[1], kind: "reply", archivedTime: reply[2], floor: Number(reply[3]) });
      text = text.slice((reply.index ?? 0) + reply[0].length).trim();
    }

    if (!inReplies && /^(?:\[hobite\]我的操作记录|←\s*下载 iOS App|.*订阅追帖.*只看未读.*|未名空间\s.*登录)$/.test(text)) return;
    if (!inReplies && /^20\d{2}$/.test(text)) {
      year = text;
      current = undefined;
      return;
    }

    const date = !inReplies ? text.match(headingDate) : null;
    if (date) {
      if (date[1]) year = date[1];
      start(index + 1, { author: "hobite", kind: "entry", heading: text, date: date[1] || !year ? text : `${year} · ${text}` });
    } else if (text) {
      if (!current) start(index + 1, { author: "hobite", kind: "entry" });
      current?.lines.push(text);
    } else if (!footer && !reply && !value.trim() && current?.lines.length && current.lines.at(-1) !== "") {
      current.lines.push("");
    }

    if (footer) page = Number(footer[1]) + 1;
  });

  for (const entry of entries) {
    if (entry.lines.at(-1) === "") entry.lines.pop();
  }
  return entries;
}

export function isQuoted(line: string) {
  return /^(?:[：:]\s*|【\s*在.*(?:提到|说道)[：:]?\s*】)/u.test(line);
}
