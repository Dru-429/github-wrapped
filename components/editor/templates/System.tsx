import { useRef,useState } from "react";
import { Copy } from "lucide-react";
import type { ReadmeTemplate as BaseTemplate } from "../editor-state";
import { toBlob } from "html-to-image";

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

/** A single dotted-leader row matching Screenshot 2: `. Label: ...................... Value` */
function InfoRow({
  label,
  value,
  labelColor = "text-[#e39257]",
  valueColor = "text-[#79c0ff]",
}: {
  label: string;
  value: string;
  labelColor?: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-baseline font-mono text-[13px] leading-auto tracking-wide">
      <span className="mr-1 select-none text-[#e39257]">.</span>
      <span className={`${labelColor} shrink-0 font-semibold`}>{label}:</span>
      <span className="mx-1.5 flex-1 overflow-hidden whitespace-nowrap select-none text-zinc-500">
        ....................................................................................................
      </span>
      <span className={`${valueColor} shrink-0 text-right font-medium tracking-normal`}>{value}</span>
    </div>
  );
}

/** Section header divider matching Screenshot 2: `- Section ------------------------------------` */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-3 flex items-center font-mono text-[13px]">
      <span className="mr-1.5 select-none font-semibold text-zinc-200">- {title}</span>
      <span className="flex-1 overflow-hidden whitespace-nowrap select-none text-zinc-200">
        ----------------------------------------------------------------------------------------------------
      </span>
    </div>
  );
}

export default function SystemInfo({
  templateObject,
  handle = "andrew@grant",
  repoName = "README.md",
  stats,
}: {
  templateObject: ReadmeTemplate;
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
  const t = (templateObject ?? {}) as ReadmeTemplate;
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const uptimeStr =
    t.uptime && (t.uptime.years || t.uptime.months || t.uptime.days)
      ? `${t.uptime.years || 0} years, ${t.uptime.months || 0} months, ${t.uptime.days || 0
      } days`
      : null;

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
      console.log(err)
    }
  };


  const defaultAscii = `                                             
            %%%%%        %%%%%               
           %%%%%%%%    %%%%%%%%%             
           %%%%%%%%%%%%%%%%%%%%%             
          %%%%%%%%%%%%%%%%%%%%%%%%           
          %%%++++++++++++#%%%%%%%%           
        %%%+:.           .::=#%%%%           
        %%%=.**.      .=*-  -#%%%%%%         
        %%:..##.       =%-  ..#%%%%%         
    %%%%%#. ... :####=....    #%%%%%%%       
    *%%#%#.     ..-%%+.       #%%%%%%#       
      %%%#.                   #%%%%%         
    %%%   %%#.    .........*%%%%#  %%%       
                %%%%%%%%%%%%%%               
                %%%%%%%%%%%%%%%@             
              %%%%%%%%%%%%%%%%%%%            
            %%%%%%%%%%%%%%%%%%%%%%%%%          
            %%%%%%%%%%%%%%%%%%%%%%%%%          
            %%%%% %%%%%%%%%%%%%%% %%%           
                  %%%%%%%%%%%%%%             
                   %%%%   %%%%#             
                                             
                                             `;

  const hasSysInfo =
    !!t.os?.length ||
    !!uptimeStr ||
    !!stats?.host ||
    !!stats?.kernel ||
    !!stats?.ide;

  const hasLangs =
    !!t.language?.frontend?.length || !!t.language?.backend?.length;

  return (
    <div
      ref={cardRef}
      className="w-full overflow-hidden rounded-xl border border-[#30363d] bg-[#151B23] font-mono text-[#c9d1d9]"
    >

      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-2.5 text-[13px]">
        <span className="text-[#8b949e]">
          <span className="font-bold text-[#58a6ff]">{handle.split("@")[0]}</span> /{" "}
          {repoName}
        </span>
        <button
          onClick={copy}
          className="grid h-7 w-7 place-items-center rounded text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#58a6ff]"
          aria-label="Copy code"
          title="Copy"
        >
          <Copy size={14} />
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex flex-col gap-6 p-5 text-[13px] leading-[1.55] md:grid-cols-[auto_1fr]">
        {/* Top Banner (Position UP) */}
        {t.banner?.url && t.banner.position === "up" && (
          <div className="w-full overflow-hidden border-b border-[#30363d]">
            <img
              src={t.banner.url}
              alt="Header Banner"
              className="h-36 w-full object-cover md:h-48"
            />
          </div>
        )}

        <div className="w-full grid gap-6 md:grid-cols-[auto_1fr]">
          {/* Left Side: ASCII Art */}
          <pre className="whitespace-pre text-[10.5px] leading-[1.35] text-[#58a6ff]">
            {t.image?.trim() ? t.image : defaultAscii}
          </pre>

          {/* Right Side: Dotted Info Rows */}
          <div className="min-w-0">
            <div className="mb-2 flex items-center text-[13px]">
              <span className="mr-2 font-bold text-[#58a6ff]">{handle}</span>
              <span className="flex-1 overflow-hidden whitespace-nowrap select-none text-zinc-300">
                ----------------------------------------------------------------------------------------------------
              </span>
            </div>

            {/* System Rows */}
            {hasSysInfo && (
              <div className="mb-3">
                {t.os?.length ? (
                  <InfoRow label="OS" value={t.os.join(", ")} />
                ) : (
                  <InfoRow label="OS" value="Windows 10, Android 14, Linux" />
                )}

                {uptimeStr ? (
                  <InfoRow label="Uptime" value={uptimeStr} />
                ) : (
                  <InfoRow label="Uptime" value="22 years, 5 months, 29 days" />
                )}

                <InfoRow
                  label="Host"
                  value={stats?.host ?? "PLANET EARTH, P2360"}
                />
                <InfoRow
                  label="Kernel"
                  value={stats?.kernel ?? "CAM (Computer Aided Manufacturing) Operator"}
                />
                <InfoRow
                  label="IDE"
                  value={stats?.ide ?? "IDEA 2023.3.2, VSCode 1.96.0"}
                />
              </div>
            )}

            {/* Languages Section */}
            {hasLangs && (
              <div className="mb-3">
                {!!t.language?.frontend?.length && (
                  <InfoRow
                    label="Languages.Programming"
                    value={t.language.frontend.join(", ")}
                  />
                )}
                {!!t.language?.backend?.length && (
                  <InfoRow
                    label="Languages.Computer"
                    value={t.language.backend.join(", ")}
                  />
                )}
              </div>
            )}

            {/* Tools / Hobbies Section */}
            {!!t.tools?.length && (
              <div className="mb-3">
                <InfoRow label="Tools" value={t.tools.join(", ")} />
              </div>
            )}

            {/* About Section */}
            {!!t.about?.trim() && (
              <div>
                <SectionHeader title="About" />
                <InfoRow label="About" value={t.about} />
              </div>
            )}

            {/* Bio Section */}
            {!!t.bio?.trim() && (
              <div>
                <SectionHeader title="Bio" />
                {t.bio.split("\n").map((line, idx) => (
                  <InfoRow key={idx} label={`Bio.${idx + 1}`} value={line} />
                ))}
              </div>
            )}

            {/* Contact Section */}
            {!!t.contact?.length && (
              <div>
                <SectionHeader title="Contact" />
                {t.contact.map((c) => (
                  <InfoRow
                    key={c.id || c.name}
                    label={c.name || "Link"}
                    value={c.url}
                  />
                ))}
              </div>
            )}

            {/* GitHub Stats Section */}
            {t.stats && (
              <div>
                <SectionHeader title="GitHub Stats" />
                <div className="flex flex-col gap-1 text-[13px] leading-6">
                  <div className="flex items-baseline justify-between flex-wrap">
                    <div>
                      <span className="mr-1 select-none text-[#e39257]">.</span>
                      <span className="font-semibold text-[#e39257]">Repos: </span>
                      <span className="select-none text-[#334155]">.... </span>
                      <span className="font-bold text-[#79c0ff]">
                        {t.stats.repos ?? 95}
                      </span>{" "}
                      <span className="text-[#e39257]">
                        &#123;Contributed: {t.stats.contributed ?? 133}&#125;
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="select-none text-[#334155]">| </span>
                      <span className="font-semibold text-[#e39257]">Stars: </span>
                      <span className="select-none text-[#334155]">.......... </span>
                      <span className="font-bold text-[#79c0ff]">
                        {t.stats.stars ?? 342}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between flex-wrap">
                    <div>
                      <span className="mr-1 select-none text-[#e39257]">.</span>
                      <span className="font-semibold text-[#e39257]">Commits: </span>
                      <span className="select-none text-[#334155]">
                        ..................{" "}
                      </span>
                      <span className="font-bold text-[#79c0ff]">
                        {t.stats.commits ?? "2,116"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="select-none text-[#334155]">| </span>
                      <span className="font-semibold text-[#e39257]">Followers: </span>
                      <span className="select-none text-[#334155]">....... </span>
                      <span className="font-bold text-[#79c0ff]">
                        {t.stats.followers ?? 196}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="mr-1 select-none text-[#e39257]">.</span>
                    <span className="font-semibold text-[#e39257]">
                      Lines of Code on GitHub:.{" "}
                    </span>
                    <span className="font-bold text-[#79c0ff]">
                      {t.stats.linesOfCode ?? "446,276"}
                    </span>
                    <span className="text-[#c9d1d9]"> ( </span>
                    <span className="font-semibold text-[#3fb950]">
                      {t.stats.additions ?? "523,178"}++
                    </span>
                    <span className="text-[#c9d1d9]">, </span>
                    <span className="font-semibold text-[#f85149]">
                      {t.stats.deletions ?? "76,902"}--
                    </span>
                    <span className="text-[#c9d1d9]"> )</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quote Section */}
            {!!t.quote?.trim() && (
              <div>
                <SectionHeader title="Quote" />
                <div className="my-1.5 italic text-[#8b949e]">
                  &ldquo;{t.quote}&rdquo;
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Banner (Position DOWN) */}
        {t.banner?.url && t.banner.position === "down" && (
          <div className="w-full overflow-hidden border-t border-[#30363d]">
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

