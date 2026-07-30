import { Copy } from "lucide-react";
import { useRef } from "react";
import type { ReadmeTemplate } from "../editor-state";

/**
 * DevTerminal — bash-style README preview.
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
  const t = templateObject ?? {};
  const preRef = useRef<HTMLPreElement>(null);

  const hasLang =
    !!t.language && ((t.language.frontend?.length ?? 0) + (t.language.backend?.length ?? 0) > 0);
  const hasTools = !!t.tools?.length;
  const hasContact = !!t.contact?.length;
  const hasAbout = !!t.about?.trim();
  const hasOs = !!t.os?.length;
  const hasUptime =
    !!t.uptime && (t.uptime.years || t.uptime.months || t.uptime.days);

  const copy = () => {
    const txt = preRef.current?.innerText ?? "";
    navigator.clipboard?.writeText(txt);
  };

  const Prompt = ({ children }: { children: React.ReactNode }) => (
    <span className="text-mantis">{children}</span>
  );
  const Arrow = () => <span className="text-lime">{">"}</span>;
  const Comment = ({ children }: { children: React.ReactNode }) => (
    <span className="text-cream/40"># {children}</span>
  );

  return (
    <div className="boxy rounded-sm bg-ink text-cream">
      <div className="flex items-center justify-between border-b-2 border-cream/20 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-cream/60">~/readme.sh</span>
        </div>
        <button
          onClick={copy}
          className="grid h-7 w-7 place-items-center border-2 border-cream/30 text-cream/70 hover:bg-cream/10"
          aria-label="Copy"
          title="Copy"
        >
          <Copy size={14} />
        </button>
      </div>

      <pre
        ref={preRef}
        className="whitespace-pre-wrap p-4 font-mono text-[13px] leading-6"
      >
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

        {hasLang && (
          <>
            <Prompt>$</Prompt> ls /tech-stack{"\n\n"}
            {!!t.language?.frontend?.length && (
              <>
                <Arrow /> frontend/{"\n"}
                {"  "}
                {t.language.frontend.join("  ")}
                {"\n\n"}
              </>
            )}
            {!!t.language?.backend?.length && (
              <>
                <Arrow /> backend/{"\n"}
                {"  "}
                {t.language.backend.join("  ")}
                {"\n\n"}
              </>
            )}
          </>
        )}

        {hasTools && (
          <>
            <Arrow /> tools/{"\n"}
            {"  "}
            {t.tools!.join("  ")}
            {"\n\n"}
          </>
        )}

        {hasOs && (
          <>
            <Arrow /> os/{"\n"}
            {"  "}
            {t.os!.join("  ")}
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
                {"\n  "}
                <span className="text-lime underline">{c.url}</span>{" "}
                <Comment>social</Comment>
                {"\n"}
              </span>
            ))}
            {"\n"}
          </>
        )}

        {!!t.bio?.trim() && (
          <>
            <Prompt>$</Prompt> cat /bio.md{"\n"}
            {t.bio!.split("\n").map((line, idx) => (
              <span key={idx}>
                <Arrow /> {line}
                {"\n"}
              </span>
            ))}
            {"\n"}
          </>
        )}

        <Prompt>$</Prompt> ./show-stats.sh{"\n"}
        {t.stats ? (
          <>
            <Arrow /> Repos: {t.stats.repos ?? 95} (Contributed: {t.stats.contributed ?? 133}) | Stars: {t.stats.stars ?? 342}{"\n"}
            <Arrow /> Commits: {t.stats.commits ?? "2,116"} | Followers: {t.stats.followers ?? 196}{"\n"}
            <Arrow /> Lines of Code: {t.stats.linesOfCode ?? "446,276"} ({t.stats.additions ?? "523,178"}++, {t.stats.deletions ?? "76,902"}--)
          </>
        ) : (
          <Arrow /> 
        )}

        {!!t.quote?.trim() && (
          <>
            {"\n\n"}
            <Comment>&ldquo;{t.quote}&rdquo;</Comment>
          </>
        )}
      </pre>
    </div>
  );
}
