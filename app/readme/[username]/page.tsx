"use client";

/**
 * Next.js App Router page — /readme/[username]
 *
 * Shows the username picked on "/" and lets the user choose one of the
 * available terminal README templates. Each card renders a real (scaled-down)
 * preview of the actual template component. Selecting one routes to
 * /readme/[username]/[template_no].
 *
 * Template numbers map to the template files:
 *   1 → System.tsx      2 → Bash.tsx
 *   3 → YAML.tsx        4 → packageJSON.tsx
 */

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

/* ─────────────────────────── real previews ─────────────────────────── */

const ASCII = `   ,g@%@Nw,
 ,M*'~|*%gNM%
 p!\` '! |'\`^%w
,@|   ,,   '|%M
]|\` ,wp@pw,  |%
{||@@@@@@@pp.||
]%%@@@@%%%k%h |
 j%M\`  ||jkk\`
 ] jrr\`\`   , L`;

/** System.tsx — neofetch layout: ASCII art + dotted-leader rows */
function SystemPreview() {
  const Row = ({ k, v }: { k: string; v: string }) => (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[#7fb4ff]">{k}:</span>
      <span className="relative -top-[3px] flex-1 border-b border-dotted border-cream/25" />
      <span className="text-cream">{v}</span>
    </div>
  );
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 bg-[#11161d] p-3 font-mono text-[7px] leading-[1.5]">
      <pre className="whitespace-pre text-[5.5px] leading-[1.3] text-cream/75">
        {ASCII}
      </pre>
      <div className="min-w-0">
        <div className="mb-1 flex items-baseline gap-1.5">
          <span className="text-[#7fb4ff]">{"{user}@github"}</span>
          <span className="relative -top-[3px] flex-1 border-b border-cream/25" />
        </div>
        <Row k="OS" v="macOS" />
        <Row k="Uptime" v="22y 5m 3d" />
        <Row k="Kernel" v="darwin" />
        <div className="mt-1.5">
          <Row k="Languages.Frontend" v="React, TS" />
          <Row k="Tools" v="Figma, Git" />
        </div>
        <div className="mt-1.5 text-cream/50">- GitHub Stats</div>
        <Row k="Commits" v="2,116" />
        <Row k="Stars" v="342" />
      </div>
    </div>
  );
}

/** Bash.tsx — prompt-driven walkthrough */
function BashPreview() {
  const P = () => <span className="text-mantis">$</span>;
  const A = () => <span className="text-lime">&gt;</span>;
  return (
    <pre className="whitespace-pre bg-ink p-3 font-mono text-[7px] leading-[1.65] text-cream">
      <P /> About Me{"\n"}
      <A /> dhruv sahoo{"\n"}
      <A /> Design Engineer{"\n\n"}
      <P /> ls /tech-stack{"\n"}
      <A /> frontend/{"\n"}
      {"  React   Next   TS\n\n"}
      <A /> backend/{"\n"}
      {"  Node    Bun    Go\n\n"}
      <P /> ls /socials{"\n"}
      <A /> X{"\n"}
      <span className="text-lime underline">[x.com/10xdhruv]</span>{" "}
      <span className="text-cream/40"># social</span>
    </pre>
  );
}

/** YAML.tsx — cat profile.yaml */
function YamlPreview() {
  const K = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#e0904a]">{children}</span>
  );
  return (
    <div className="bg-[#141414] p-3 font-mono text-[7px] leading-[1.65] text-cream">
      <div className="mb-1">
        <span className="text-mantis">druv@devbox</span>
        <span className="text-cream/60">:~$</span> cat profile.yaml
      </div>
      <div>
        <K>name</K>: Dhruv Sahoo
      </div>
      <div>
        <K>role</K>: Design Engineer
      </div>
      <div className="mt-1">
        <K>techstack</K>:
      </div>
      <div className="grid grid-cols-3 gap-x-3 pl-2">
        <div>
          <K>frontend</K>:
          <div className="text-mantis">- React</div>
          <div className="text-mantis">- Next</div>
        </div>
        <div>
          <K>backend</K>:
          <div className="text-mantis">- Node</div>
          <div className="text-mantis">- Go</div>
        </div>
        <div>
          <K>design</K>:
          <div className="text-mantis">- Figma</div>
        </div>
      </div>
      <div className="mt-1">
        <K>stats</K>: repos 95 <K>&amp;</K> stars 342
      </div>
    </div>
  );
}

/** packageJSON.tsx — profile as a package manifest */
function PackageJsonPreview() {
  const K = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#7fb4ff]">&quot;{children}&quot;</span>
  );
  const S = ({ children }: { children: React.ReactNode }) => (
    <span className="text-mantis">&quot;{children}&quot;</span>
  );
  return (
    <pre className="whitespace-pre bg-[#0d1117] p-3 font-mono text-[7px] leading-[1.65] text-cream/80">
      {"{\n"}
      {"  "}
      <K>name</K>: <S>dhruv-sahoo</S>,{"\n"}
      {"  "}
      <K>role</K>: <S>design-engineer</S>,{"\n"}
      {"  "}
      <K>dependencies</K>: {"{\n"}
      {"    "}
      <K>react</K>: <S>^19.0.0</S>,{"\n"}
      {"    "}
      <K>typescript</K>: <S>^5.6.0</S>{"\n"}
      {"  },\n"}
      {"  "}
      <K>scripts</K>: {"{\n"}
      {"    "}
      <K>ship</K>: <S>git push origin main</S>{"\n"}
      {"  },\n"}
      {"  "}
      <K>stars</K>: <span className="text-[#e0904a]">342</span>
      {"\n}"}
    </pre>
  );
}

type Template = {
  no: number;
  file: string;
  label: string;
  blurb: string;
  Preview: () => React.ReactElement;
};

const TEMPLATES: Template[] = [
  {
    no: 1,
    file: "System.tsx",
    label: "neofetch",
    blurb: "ASCII portrait beside dotted-leader system rows.",
    Preview: SystemPreview,
  },
  {
    no: 2,
    file: "Bash.tsx",
    label: "prompt log",
    blurb: "Shell commands walk through bio, stack and socials.",
    Preview: BashPreview,
  },
  {
    no: 3,
    file: "YAML.tsx",
    label: "profile.yaml",
    blurb: "Keys and columns — a tidy, config-file portrait.",
    Preview: YamlPreview,
  },
  {
    no: 4,
    file: "packageJSON.tsx",
    label: "manifest",
    blurb: "Your year in code, shipped as a package manifest.",
    Preview: PackageJsonPreview,
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function SelectTemplatePage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params?.username ?? "");

  const pick = (no: number) =>
    router.push(`/readme/${encodeURIComponent(username)}/${no}`);

  return (
    <main className="min-h-screen bg-cream bg-grid px-4 py-8 text-ink md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="boxy rounded-sm bg-cream px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5"
          >
            ← Back
          </Link>
          <div className="boxy rounded-sm bg-nuit px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cream">
            <span className="text-lime">&gt;_</span>{" "}
            <span className="font-serif text-sm italic">
              {username || "—"}
            </span>
          </div>
        </div>

        {/* heading */}
        <header className="my-8 md:my-14 w-full text-center">
          <h1 className="font-serif text-4xl font-bold leading-[1.05] md:text-6xl">
            Pick a{" "}
            <span className="bg-nuit px-3 italic text-cream">terminal</span>{" "}
            readme
          </h1>
          <p className="mt-3 text-nuit">
            Add n remove any component. Choose one the best u feel and we&apos;ll wrap{" "}
            <span className="font-serif italic">@{username || "you"}</span>
            &apos;s year in code with it : )
          </p>
        </header>

        {/* template grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {TEMPLATES.map(({ no, file, label, blurb, Preview }) => (
            <button
              key={no}
              type="button"
              onClick={() => pick(no)}
              className="boxy group flex flex-col overflow-hidden rounded-sm bg-cream text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:-translate-y-1"
            >
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-lime" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-mantis" />
                <span className="ml-1 font-mono text-[10px] font-bold tracking-widest">
                  {file}
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink/40">
                  {label}
                </span>
              </div>

              {/* real preview */}
              <div className="relative h-[168px] overflow-hidden border-b-2 border-ink">
                <Preview />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>

              {/* meta */}
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <p className="text-xs text-ink/60">{blurb}</p>
                <span className="boxy shrink-0 rounded-sm bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                  Use →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
