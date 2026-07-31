import { Copy } from "lucide-react";
import { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import type { ReadmeTemplate as BaseTemplate } from "../editor-state";

type ReadmeTemplate = BaseTemplate & {
  image?: string;
  bio?: string;
  quote?: string;
  banner?: { url?: string; position?: "up" | "down" };
  design?: string[];
  stats?: {
    repos?: number | string;
    contributed?: number | string;
    stars?: number | string;
    commits?: number | string;
    followers?: number | string;
    linesOfCode?: number | string;
    additions?: number | string;
    deletions?: number | string;
  };
};

/** Lay items out in fixed-width columns, like the terminal screenshot. */
const COLS = 5;
function columns(items: string[]) {
  const width = Math.max(...items.map((i) => i.length)) + 3;
  const rows: string[] = [];
  for (let i = 0; i < items.length; i += COLS) {
    rows.push(
      "  " +
        items
          .slice(i, i + COLS)
          .map((it, idx, arr) => (idx === arr.length - 1 ? it : it.padEnd(width)))
          .join("")
    );
  }
  return rows.join("\n");
}

/**
 * DevTerminal — bash-style README preview.
 * Renders whatever exists on `templateObject`; missing keys are skipped.
 */
export default function DevTerminal({
  templateObject,
  name = "dhruv sahoo",
  role = "Design Engineer",
}: {
  templateObject: ReadmeTemplate;
  name?: string;
  role?: string;
}) {
  const t = (templateObject ?? {}) as ReadmeTemplate;
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const hasLang =
    !!t.language && ((t.language.frontend?.length ?? 0) + (t.language.backend?.length ?? 0) > 0);
  const hasTools = !!t.tools?.length;
  const hasDesign = !!t.design?.length;
  const hasContact = !!t.contact?.length;
  const hasAbout = !!t.about?.trim();
  const hasOs = !!t.os?.length;
  const hasUptime = !!t.uptime && (t.uptime.years || t.uptime.months || t.uptime.days);

  /** Copies the rendered terminal to the clipboard as a PNG image. */
  const copy = async () => {
    const node = cardRef.current;
    if (!node) return;
    try {
      const blob = await toBlob(node, { pixelRatio: 2, cacheBust: true });
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard image unsupported */
    }
  };

  const Prompt = ({ children }: { children: React.ReactNode }) => (
    <span className="text-mantis">{children}</span>
  );
  const Arrow = () => <span className="text-lime">{">"}</span>;
  const Comment = ({ children }: { children: React.ReactNode }) => (
    <span className="text-cream/40"># {children}</span>
  );

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-sm border-2 border-cream/25 bg-ink/80 text-cream/70 hover:bg-cream/10"
        aria-label="Copy as image"
        title={copied ? "Copied as image!" : "Copy as image"}
      >
        <Copy size={14} />
      </button>

      <div
        ref={cardRef}
        className="boxy overflow-hidden rounded-sm bg-ink text-cream"
      >
        {t.banner?.url && t.banner.position === "up" && (
          <div className="w-full overflow-hidden border-b-2 border-cream/20">
            <img
              src={t.banner.url}
              alt="Header Banner"
              className="h-36 w-full object-cover md:h-48"
            />
          </div>
        )}

        <pre className="overflow-x-auto whitespace-pre p-6 font-mono text-[13px] leading-6">
          {hasAbout && (
            <>
              <Prompt>$</Prompt> About Me{"\n"}
              <Arrow /> {name}
              {"\n"}
              <Arrow /> {role}
              {"\n"}
              <Arrow /> {t.about}
              {"\n\n"}
            </>
          )}

          {!!t.bio?.trim() && (
            <>
              <Prompt>$</Prompt> cat /bio.txt{"\n"}
              {t.bio.split("\n").map((line, idx) => (
                <span key={idx}>
                  <Arrow /> {line}
                  {"\n"}
                </span>
              ))}
              {"\n"}
            </>
          )}

          {(hasLang || hasTools || hasDesign) && (
            <>
              <Prompt>$</Prompt> ls /tech-stack{"\n\n"}
              {!!t.language?.frontend?.length && (
                <>
                  <Arrow /> frontend/{"\n"}
                  {columns(t.language.frontend)}
                  {"\n\n"}
                </>
              )}
              {!!t.language?.backend?.length && (
                <>
                  <Arrow /> backend/{"\n"}
                  {columns(t.language.backend)}
                  {"\n\n"}
                </>
              )}
              {hasDesign && (
                <>
                  <Arrow /> design/{"\n"}
                  {columns(t.design!)}
                  {"\n\n"}
                </>
              )}
              {hasTools && (
                <>
                  <Arrow /> tools/{"\n"}
                  {columns(t.tools!)}
                  {"\n\n"}
                </>
              )}
            </>
          )}

          {hasOs && (
            <>
              <Arrow /> os/{"\n"}
              {columns(t.os!)}
              {"\n\n"}
            </>
          )}

          {hasUptime && (
            <>
              <Prompt>$</Prompt> uptime{"\n"}
              <Arrow /> {t.uptime!.years || 0} yr, {t.uptime!.months || 0} mons,{" "}
              {t.uptime!.days || 0} days{"\n\n"}
            </>
          )}

          {hasContact && (
            <>
              <Prompt>$</Prompt> ls /socials{"\n"}
              {t.contact!.map((c) => (
                <span key={c.id}>
                  <Arrow /> {c.name || "link"}
                  {"\n"}
                  <span className="text-lime underline">
                    [{c.url}]({c.url})
                  </span>
                  {"    "}
                  <Comment>social</Comment>
                  {"\n\n"}
                </span>
              ))}
            </>
          )}

          <Prompt>$</Prompt> ./show-stats.sh{"\n"}
          {t.stats ? (
            <>
              <Arrow /> Repos: {t.stats.repos ?? 95} (Contributed:{" "}
              {t.stats.contributed ?? 133}) | Stars: {t.stats.stars ?? 342}
              {"\n"}
              <Arrow /> Commits: {t.stats.commits ?? "2,116"} | Followers:{" "}
              {t.stats.followers ?? 196}
              {"\n"}
              <Arrow /> Lines of Code: {t.stats.linesOfCode ?? "446,276"} (
              {t.stats.additions ?? "523,178"}++, {t.stats.deletions ?? "76,902"}--)
            </>
          ) : (
            <>
              <Arrow /> Fetching data...
            </>
          )}

          {!!t.quote?.trim() && (
            <>
              {"\n\n"}
              <Comment>&ldquo;{t.quote}&rdquo;</Comment>
            </>
          )}
        </pre>

        {t.banner?.url && t.banner.position === "down" && (
          <div className="w-full overflow-hidden border-t-2 border-cream/20">
            <img
              src={t.banner.url}
              alt="Footer Banner"
              className="h-36 w-full object-cover md:h-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}
