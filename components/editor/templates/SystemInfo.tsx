import { useRef } from "react";
import { Copy } from "lucide-react";
import type { ReadmeTemplate } from "./templateEditor";

/**
 * SystemInfo — neofetch-style README with ASCII art on the left
 * and a key/value info block on the right. Skips missing fields.
 */
export default function SystemInfo({
  templateObject,
  handle = "andrew@grant",
  repoName = "README.md",
  stats,
}: {
  templateObject: ReadmeTemplate & { image?: string };
  handle?: string;
  repoName?: string;
  stats?: {
    host?: string;
    kernel?: string;
    ide?: string;
    repos?: number | string;
    commits?: number | string;
    stars?: number | string;
    followers?: number | string;
    loc?: number | string;
  };
}) {
  const t = templateObject ?? {};
  const wrapRef = useRef<HTMLDivElement>(null);

  const uptimeStr =
    t.uptime && (t.uptime.years || t.uptime.months || t.uptime.days)
      ? `${t.uptime.years || 0} years, ${t.uptime.months || 0} months, ${
          t.uptime.days || 0
        } days`
      : null;

  const rows: { label: string; value: string }[] = [];

  if (t.os?.length) rows.push({ label: "OS", value: t.os.join(", ") });
  if (uptimeStr) rows.push({ label: "Uptime", value: uptimeStr });
  if (stats?.host) rows.push({ label: "Host", value: String(stats.host) });
  if (stats?.kernel) rows.push({ label: "Kernel", value: String(stats.kernel) });
  if (stats?.ide) rows.push({ label: "IDE", value: String(stats.ide) });

  // spacer
  const langRows: { label: string; value: string }[] = [];
  if (t.language?.frontend?.length)
    langRows.push({
      label: "Languages.Frontend",
      value: t.language.frontend.join(", "),
    });
  if (t.language?.backend?.length)
    langRows.push({
      label: "Languages.Backend",
      value: t.language.backend.join(", "),
    });

  const toolRow = t.tools?.length
    ? [{ label: "Tools", value: t.tools.join(", ") }]
    : [];

  const contactRows =
    t.contact?.map((c) => ({
      label: c.name || "Link",
      value: c.url,
    })) ?? [];

  const statRows: { label: string; value: string }[] = [];
  if (stats?.repos !== undefined)
    statRows.push({ label: "Repos", value: String(stats.repos) });
  if (stats?.commits !== undefined)
    statRows.push({ label: "Commits", value: String(stats.commits) });
  if (stats?.stars !== undefined)
    statRows.push({ label: "Stars", value: String(stats.stars) });
  if (stats?.followers !== undefined)
    statRows.push({ label: "Followers", value: String(stats.followers) });
  if (stats?.loc !== undefined)
    statRows.push({ label: "Lines of Code", value: String(stats.loc) });

  const copy = () => {
    const txt = wrapRef.current?.innerText ?? "";
    navigator.clipboard?.writeText(txt);
  };

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: { label: string; value: string }[];
  }) => {
    if (!items.length) return null;
    return (
      <div className="mb-3">
        <div className="mb-1 flex items-center gap-2 text-cream/60">
          <span>-</span>
          <span className="uppercase tracking-wide">{title}</span>
          <span className="flex-1 border-t border-dashed border-cream/20" />
        </div>
        {items.map((r) => (
          <div key={r.label} className="grid grid-cols-[180px_1fr] gap-3">
            <span className="text-mantis">{r.label}:</span>
            <span className="text-right text-cream">{r.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const defaultAscii = `        g@M%@%%@N%Nw,,
      ,M*'~||*%gNM=]mM%g||%N,
      p!\`~ '! |'\`^' '||jhlj%w
      ,@|      \`  ,,    '\`|%M]%M
      ]|\`\`  ,,wp@pw,   \`.  ''''|%wg
    /{|||@@@@@@@pp.           ||||
    .]@@@@@@@@@@@@p
   .]%%@@@@%%%%k%h  '*||mkr    *
    j%M\`     ||jkk\`  ~nrn=|i   ;'
    ] jrr'\`\`\`\`     ,     L''.:|
    j  lp;,.   ,/ @@ ,;\\nmy '' ,~
   i r @@@mmHM @@@ \`^****M*,p ,`;

  return (
    <div className="boxy rounded-sm bg-ink text-cream" ref={wrapRef}>
      <div className="flex items-center justify-between border-b-2 border-cream/20 px-3 py-2 font-mono text-xs">
        <span className="text-cream/70">
          <span className="text-lime">{handle.split("@")[0]}</span>/
          {repoName}
        </span>
        <button
          onClick={copy}
          className="grid h-7 w-7 place-items-center border-2 border-cream/30 text-cream/70 hover:bg-cream/10"
          aria-label="Copy"
        >
          <Copy size={14} />
        </button>
      </div>

      <div className="grid gap-4 p-4 font-mono text-[12.5px] leading-6 md:grid-cols-[auto_1fr]">
        <pre className="whitespace-pre text-cream/80">
          {t.image?.trim() ? t.image : defaultAscii}
        </pre>

        <div>
          <div className="mb-2 text-lime">{handle}</div>

          <Section title="System" items={rows} />
          <Section title="Languages" items={langRows} />
          <Section title="Toolkit" items={toolRow} />
          {t.about?.trim() && (
            <div className="mb-3">
              <div className="mb-1 flex items-center gap-2 text-cream/60">
                <span>-</span>
                <span className="uppercase tracking-wide">About</span>
                <span className="flex-1 border-t border-dashed border-cream/20" />
              </div>
              <p className="text-cream">{t.about}</p>
            </div>
          )}
          <Section title="Contact" items={contactRows} />
          <Section title="GitHub Stats" items={statRows} />
        </div>
      </div>
    </div>
  );
}
