"use client";

import { useRef } from "react";
import type { ReadmeTemplate as BaseTemplate } from "../editor-state";
import { Copy } from "../ui/Copy";

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

/* ── tiny type helpers ─────────────────────────────────────── */
const Key = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#e0904a]">{children}</span>
);
const Val = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cream">{children}</span>
);
const Dash = () => <span className="text-cream/70">-</span>;
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cream/35"># {children}</span>
);
const Amp = () => <span className="text-[#e0904a]">&amp;</span>;

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-1">
        <Key>{title}</Key>
        <Val>:</Val>
      </div>
      {items.map((it) => (
        <div key={it} className="pl-3">
          <Dash /> <span className="text-mantis">{it}</span>
        </div>
      ))}
    </div>
  );
}

export default function Yaml({
  templateObject,
  name = "Dhruv Sahoo",
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

  const aboutLines = (t.about ?? "").split("\n").filter((l) => l.trim());
  const bioLines = (t.bio ?? "").split("\n").filter((l) => l.trim());
  const lines = [...aboutLines, ...bioLines];

  const fe = t.language?.frontend ?? [];
  const be = t.language?.backend ?? [];
  const de = t.design ?? [];
  const tools = t.tools ?? [];
  const hasStack = fe.length + be.length + de.length > 0;

  return (
    <div className="relative">
      <Copy
        node={cardRef}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-sm border-2 border-cream/25 bg-ink/80 text-cream/70 hover:bg-cream/10"
      />

      <div
        ref={cardRef}
        className="boxy overflow-hidden rounded-sm bg-[#141414] text-cream"
      >

        <div className="overflow-x-auto p-6 font-mono text-[13px] leading-[1.65]">
          {t.banner?.url && t.banner.position === "up" && (
            <div className="w-full mb-5 overflow-hidden border-b-2 border-cream/20">
              <img
                src={t.banner.url}
                alt="Header Banner"
                className="h-auto w-full object-cover "
              />
            </div>
          )}
          {/* prompt */}
          <div className="mb-2">
            <span className="text-mantis">{handle}</span>
            <span className="text-cream/60">:~$</span>{" "}
            <Val>cat profile.yaml</Val>
          </div>

          <div className="mb-4">
            <div>
              <Key>name</Key>
              <Val>: {name}</Val>
            </div>
            <div>
              <Key>role</Key>
              <Val>: {role}</Val>
            </div>
            {!!t.quote?.trim() && (
              <div>
                <Key>tagline</Key>
                <Val>: {t.quote}</Val>
              </div>
            )}
          </div>

          {!!lines.length && (
            <div className="mb-4">
              <div>
                <Key>About</Key>
                <Val>:</Val>
              </div>
              {lines.map((l, i) => (
                <div key={i} className="pl-3">
                  <Dash /> <Val>{l}</Val>
                </div>
              ))}
            </div>
          )}

          {hasStack && (
            <div className="mb-5">
              <div className="mb-1">
                <Key>techstack</Key>
                <Val>:</Val>
              </div>
              <div className="grid grid-cols-1 gap-x-10 gap-y-4 pl-3 sm:grid-cols-2 lg:grid-cols-3">
                {!!fe.length && <Column title="frontend" items={fe} />}
                {!!be.length && <Column title="backend" items={be} />}
                {!!de.length && <Column title="design" items={de} />}
                {!!tools.length && <Column title="tool" items={tools} />}
              </div>
            </div>
          )}

          {!!de.length && (
            <div>
              <Key>design</Key>
              <Val>: [{de.join(", ")}]</Val>
            </div>
          )}

          {!!t.os?.length && (
            <div>
              <Key>os</Key>
              <Val>: [{t.os.join(", ")}]</Val>
            </div>
          )}
          {!!t.uptime &&
            (t.uptime.years || t.uptime.months || t.uptime.days) && (
              <div>
                <Key>uptime</Key>
                <Val>
                  : {t.uptime.years || 0} yr, {t.uptime.months || 0} mons,{" "}
                  {t.uptime.days || 0} days
                </Val>
              </div>
            )}

          {!!t.contact?.length && (
            <div className="mt-4">
              <div>
                <Key>socials</Key>
                <Val>:</Val>
              </div>
              {t.contact.map((c) => (
                <div
                  key={c.id}
                  className="flex items-baseline gap-4 pl-3"
                >
                  <span className="min-w-0">
                    <span className="text-[#e0904a]">{c.name || "link"}</span>
                    <Val>: </Val>
                    <span className="text-mantis">{c.url}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Key>stats</Key>
            {t.stats ? (
              <Val>
                : repos {t.stats.repos ?? 0} <Amp /> commits{" "}
                {t.stats.commits ?? 0} <Amp /> stars {t.stats.stars ?? 0}
              </Val>
            ) : (
              <Val>: Fetching data...</Val>
            )}
          </div>

          <div className="mt-4">
            <span className="text-mantis">{handle}</span>
            <span className="text-cream/60">:~$</span>{" "}
            <span className="text-cream">]</span>
          </div>
        </div>

        {t.banner?.url && t.banner.position === "down" && (
          <div className="w-full overflow-hidden border-t-2 border-cream/20">
            <img
              src={t.banner.url}
              alt="Footer Banner"
              className="h-auto w-full object-cover "
            />
          </div>
        )}
      </div>
    </div>
  );
}
