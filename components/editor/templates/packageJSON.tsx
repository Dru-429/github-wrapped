"use client";

import { Copy } from "lucide-react";
import { useRef, useState, } from "react";
import { toBlob } from "html-to-image";
import type { ReadmeTemplate as BaseTemplate } from "../editor-state";

type ReadmeTemplate = BaseTemplate & {
  image?: string;
  banner?: { url?: string; position?: "up" | "down" };
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

/* ── JSON Syntax highlighting components matching Bash.tsx theme ── */
const Key = ({ name }: { name: string }) => (
  <span className="text-[#FF7B68]">&quot;{name}&quot;</span>
);

const Str = ({ value, comma = true }: { value: string; comma?: boolean }) => (
  <span>
    <span className="text-[#9ecbff]">&quot;{value}&quot;</span>
    {comma && <span className="text-[#c9d1d9]">,</span>}
  </span>
);


const Num = ({ value, comma = true }: { value: number | string; comma?: boolean }) => (
  <span>
    <span className="text-[#b392f0]">{value}</span>
    {comma && <span className="text-[#c9d1d9]">,</span>}
  </span>
);

const Arr = ({ items, comma = true }: { items: string[]; comma?: boolean }) => (
  <span>
    <span className="text-[#c9d1d9]">[</span>
    {items.map((it, idx) => (
      <span key={idx}>
        <span className="text-[#9ecbff]">&quot;{it}&quot;</span>
        {idx < items.length - 1 && <span className="text-[#c9d1d9]">, </span>}
      </span>
    ))}
    <span className="text-[#c9d1d9]">]</span>
    {comma && <span className="text-[#c9d1d9]">,</span>}
  </span>
);

export default function PackageJSON({
  templateObject,
  name = "dhruv-sahoo",
  role = "Design Engineer",
  handle = "druv@devbox",
}: {
  templateObject: ReadmeTemplate;
  name?: string;
  role?: string;
  handle?: string;
}) {
  const t = (templateObject ?? {}) as ReadmeTemplate;
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const fe = t.language?.frontend ?? [];
  const be = t.language?.backend ?? [];
  const tools = t.tools ?? [];
  const os = t.os ?? [];
  const hasSkills = fe.length > 0 || be.length > 0 || tools.length > 0 || os.length > 0;

  const contacts = t.contact ?? [];
  const hasSocials = contacts.length > 0;

  const uptimeStr =
    t.uptime && (t.uptime.years || t.uptime.months || t.uptime.days)
      ? `${t.uptime.years || 0} years, ${t.uptime.months || 0} months, ${t.uptime.days || 0
      } days`
      : null;

  /** Copies the rendered terminal to the clipboard as a PNG image matching Bash.tsx */
  const copy = async () => {
    const node = cardRef.current;
    if (!node) return;
    try {
      const blob = await toBlob(node, { pixelRatio: 2, cacheBust: true });
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error(err);
    }
  };

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
        className="overflow-hidden rounded-sm bg-[#151B23] text-white"
      >

        {/* Terminal Window Header */}
        <div className="flex items-center gap-2 border-b border-cream/15 bg-black/20 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-cream/50">package.json</span>
        </div>

        <div className="p-6 font-mono font-medium text-[13.5px] tracking-wide leading-8">
          {/* Top Header Banner */}

          {t.banner?.url && t.banner.position === "up" && (
            <>
              <div className="">
                <span className="text-mantis">{handle}:~$</span>{" "}
                <span className="text-white font-bold">cat Banner.json</span>
              </div>

              <div className="w-full overflow-hidden border-b-2 border-cream/20 mb-4">
                <img
                  src={t.banner.url}
                  alt="Header Banner"
                  className="h-36 w-full object-cover md:h-48"
                />
              </div>
            </>
          )}


          {/* Terminal Command Line */}
          <div className="mb-4">
            <span className="text-mantis">{handle}:~$</span>{" "}
            <span className="text-white font-bold">cat package.json</span>
          </div>

          {/* JSON Output */}
          <pre className="overflow-x-auto whitespace-pre font-mono leading-6 text-[#c9d1d9]">
            <span className="text-[#c9d1d9]">&#123;</span>{"\n"}
            {"  "}<Key name="name" />: <Str value={name} />,{"\n"}
            {"  "}<Key name="title" />: <Str value={role} />,{"\n"}
            {"  "}<Key name="tagline" />: <Str value={t.about?.trim() || "Building soothing designs, i.e., clean, fun & functional."} />,{"\n"}
            {!!t.bio?.trim() && (
              <>
                {"  "}<Key name="bio" />: <Str value={t.bio.replace(/\n/g, "\n           ")} />{"\n"}
              </>
            )}
            {os.length > 0 && (
              <>
                {"  "}<Key name="location" />: <Str value={os.join(", ")} />,{"\n"}
              </>
            )}
            {uptimeStr && (
              <>
                {"  "}<Key name="uptime" />: <Str value={uptimeStr} />,{"\n"}
              </>
            )}
            {hasSkills && (
              <>
                {"  "}<Key name="skills" />: <span className="text-[#c9d1d9]">&#123;</span>{"\n"}
                {fe.length > 0 && (
                  <>
                    {"    "}<Key name="frontend" />: <Arr items={fe} comma={be.length > 0 || tools.length > 0 || os.length > 0} />{"\n"}
                  </>
                )}
                {be.length > 0 && (
                  <>
                    {"    "}<Key name="backend" />: <Arr items={be} comma={tools.length > 0 || os.length > 0} />{"\n"}
                  </>
                )}
                {tools.length > 0 && (
                  <>
                    {"    "}<Key name="tools" />: <Arr items={tools} comma={os.length > 0} />{"\n"}
                  </>
                )}
                {os.length > 0 && (
                  <>
                    {"    "}<Key name="os" />: <Arr items={os} comma={false} />{"\n"}
                  </>
                )}
                {"  "}<span className="text-[#c9d1d9]">&#125;</span>{hasSocials || t.stats ? "," : ""}{"\n"}
              </>
            )}
            {hasSocials && (
              <>
                {"  "}<Key name="socials" />: <span className="text-[#c9d1d9]">&#123;</span>{"\n"}
                {contacts.map((c, i) => (
                  <span key={c.id || i}>
                    {"    "}<Key name={c.name.toLowerCase() || "link"} />: <Str value={c.url} comma={i < contacts.length - 1} />{"\n"}
                  </span>
                ))}
                {"  "}<span className="text-[#c9d1d9]">&#125;</span>{t.stats ? "," : ""}{"\n"}
              </>
            )}
            {t.stats ? (
              <>
                {"  "}<Key name="stats" />: <span className="text-[#c9d1d9]">&#123;</span>{"\n"}
                {"    "}<Key name="repos" />: <Num value={t.stats.repos ?? 95} />,{"\n"}
                {"    "}<Key name="contributed" />: <Num value={t.stats.contributed ?? 133} />,{"\n"}
                {"    "}<Key name="stars" />: <Num value={t.stats.stars ?? 342} />,{"\n"}
                {"    "}<Key name="commits" />: <Str value={String(t.stats.commits ?? "2,116")} />,{"\n"}
                {"    "}<Key name="followers" />: <Str value={String(t.stats.followers ?? "196")} />,{"\n"}
                {"    "}<Key name="linesOfCode" />: <Str value={String(t.stats.linesOfCode ?? "446,276")} comma={false} />{"\n"}
                {"  "}<span className="text-[#c9d1d9]">&#125;</span>{"\n"}
              </>
            ) : (
              <>
                {"  "}<Key name="stats" />: <Str value="Fetching data..." comma={false} />{"\n"}
              </>
            )}
            <span className="text-[#c9d1d9]">&#125;</span>
          </pre>

          {/* Bottom Prompt Line with Cursor */}
          <div className="mt-4 flex items-start flex-col gap-1.5">
            <div className="flex gap-1.5 w-full overflow-y-auto items-start relative" >
              <span className="text-mantis text-nowrap">{handle}:~$</span>
              <span className=" relative top-2 inline-block h-4 w-2.5 bg-mantis animate-pulse" />
              {!!t.quote?.trim() && (
                <>
                  <Str value={t.quote} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Footer Banner */}
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
