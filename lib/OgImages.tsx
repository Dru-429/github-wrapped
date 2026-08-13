/**
 * Open Graph image layouts for Github Wrapped.
 *
 * Each export is a plain JSX tree using ONLY inline styles + flex, so it can be
 * dropped straight into a Next.js / Satori `ImageResponse`:
 *
 *   import { ImageResponse } from "next/og";
 *   import { OgLanding } from "@/components/og/OgImages";
 *
 *   export const size = { width: 1200, height: 630 };
 *   export const contentType = "image/png";
 *
 *   export default async function Image() {
 *     return new ImageResponse(<OgLanding />, size);
 *   }
 *
 * Routes:
 *   /                  -> <OgLanding />
 *   /wrap              -> <OgWrapHome />
 *   /wrap/[username]   -> <OgWrapUser username={...} stats={...} />
 *   /readme            -> <OgReadmeHome />
 *   /readme/[username] -> <OgReadmeUser username={...} />
 */

export const OG_SIZE = { width: 1200, height: 630 };

/* ---------------------------------- theme --------------------------------- */

const CREAM = "#f6f7ed";
const INK = "#001f3f";
const LIME = "#dbe64c";
const NUIT = "#1e488f";
const MANTIS = "#74c365";

const DISPLAY = "Fraunces, Georgia, serif";
const SANS = "Inter, system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/** cream page + ink grid lines, same as the site's .bg-grid */
const shell: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 56,
  backgroundColor: CREAM,
  color: INK,
  fontFamily: SANS,
  backgroundImage:
    "linear-gradient(to right, rgba(0,31,63,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,31,63,0.08) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

/** boxy frame with hard offset shadow */
const boxy = (bg = CREAM): React.CSSProperties => ({
  display: "flex",
  border: `4px solid ${INK}`,
  boxShadow: `12px 12px 0 0 ${INK}`,
  backgroundColor: bg,
});

const chip = (bg: string, fg: string): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  border: `3px solid ${INK}`,
  boxShadow: `5px 5px 0 0 ${INK}`,
  backgroundColor: bg,
  color: fg,
  padding: "8px 16px",
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: 2,
  textTransform: "uppercase",
  fontFamily: MONO,
});

function Brand({ tag, tagBg = LIME }: { tag: string; tagBg?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            ...boxy(INK),
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `6px 6px 0 0 ${NUIT}`,
            color: LIME,
            fontFamily: DISPLAY,
            fontSize: 34,
            fontWeight: 900,
          }}
        >
          G
        </div>
        <div style={{ display: "flex", fontFamily: DISPLAY, fontSize: 34, fontWeight: 900 }}>
          Github Wrapped
        </div>
      </div>
      <div style={chip(tagBg, INK)}>{tag}</div>
    </div>
  );
}

function Foot({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {items.map((i) => (
        <div key={i} style={chip(CREAM, INK)}>
          {i}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- 1. "/" -------------------------------- */

export function OgLanding() {
  return (
    <div style={shell}>
      <Brand tag="2025 edition · live" />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            fontFamily: DISPLAY,
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          Your year in code,
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: INK,
              color: CREAM,
              padding: "6px 22px",
              fontFamily: DISPLAY,
              fontSize: 108,
              fontWeight: 900,
              fontStyle: "italic",
              lineHeight: 1.05,
              transform: "rotate(-1deg)",
            }}
          >
            wrapped
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#4a5a6b", maxWidth: 900 }}>
          Fetch your GitHub stats once — get Spotify-style Wrapped cards and a
          terminal-style README you can copy and paste.
        </div>
      </div>

      <Foot items={["wrapped cards", "terminal readme", "one handle"]} />
    </div>
  );
}

/* ------------------------------- 2. "/wrap" ------------------------------- */

export function OgWrapHome() {
  return (
    <div style={shell}>
      <Brand tag="spotify edition · live" />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            fontFamily: DISPLAY,
            fontSize: 100,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          Get your wrapped cards
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#4a5a6b", maxWidth: 880 }}>
          Ur year in code, wrapped in Spotify style — one handle, a full set of
          shareable stat cards.
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          {[
            ["01", "loc & commits"],
            ["02", "top language"],
            ["03", "overview"],
            ["04", "timeline"],
          ].map(([k, t]) => (
            <div
              key={k}
              style={{
                ...boxy(CREAM),
                flexDirection: "column",
                width: 244,
                padding: "18px 20px",
                boxShadow: `8px 8px 0 0 ${INK}`,
              }}
            >
              <div style={{ display: "flex", backgroundColor: LIME, padding: "2px 8px", fontFamily: MONO, fontSize: 18, fontWeight: 700 }}>
                {k}
              </div>
              <div style={{ display: "flex", marginTop: 12, fontFamily: MONO, fontSize: 22, fontWeight: 700 }}>
                {t}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Foot items={["stat cards", "drag & arrange", "share anywhere"]} />
    </div>
  );
}

/* -------------------------- 3. "/wrap/[username]" ------------------------- */

export function OgWrapUser({
  username = "octocat",
  commits = "2,481",
  loc = "184k",
  language = "TypeScript",
  streak = "37 days",
}: {
  username?: string;
  commits?: string;
  loc?: string;
  language?: string;
  streak?: string;
}) {
  const stats: [string, string][] = [
    ["commits", commits],
    ["lines of code", loc],
    ["top language", language],
    ["longest streak", streak],
  ];

  return (
    <div style={shell}>
      <Brand tag="2025 wrapped" />

      <div style={{ display: "flex", flex: 1, gap: 28, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: NUIT }}>
            @{username}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontFamily: DISPLAY,
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            2025 in code
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              alignSelf: "flex-start",
              backgroundColor: INK,
              color: LIME,
              padding: "8px 18px",
              fontFamily: MONO,
              fontSize: 24,
              fontWeight: 700,
              transform: "rotate(-1deg)",
            }}
          >
            wrapped · spotify style
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 520 }}>
          {stats.map(([label, value], i) => (
            <div
              key={label}
              style={{
                ...boxy(i % 2 === 0 ? CREAM : LIME),
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 22px",
                boxShadow: `8px 8px 0 0 ${INK}`,
              }}
            >
              <div style={{ display: "flex", fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: "#4a5a6b" }}>
                {label}
              </div>
              <div style={{ display: "flex", fontFamily: DISPLAY, fontSize: 40, fontWeight: 900 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Foot items={["github wrapped", "githubwrapped.app/wrap/" + username]} />
    </div>
  );
}

/* ------------------------------ 4. "/readme" ------------------------------ */

export function OgReadmeHome() {
  return (
    <div style={shell}>
      <Brand tag="terminal edition · new" tagBg={MANTIS} />

      <div style={{ display: "flex", flex: 1, gap: 32, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: DISPLAY,
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Terminal README generator
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 28, color: "#4a5a6b", maxWidth: 620 }}>
            Fetch your profile, pick a style, edit everything, copy + paste.
          </div>
        </div>

        <div style={{ ...boxy(INK), flexDirection: "column", width: 500, padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: `3px solid ${CREAM}`,
              padding: "10px 16px",
            }}
          >
            {[LIME, MANTIS, NUIT].map((c) => (
              <div key={c} style={{ display: "flex", width: 14, height: 14, backgroundColor: c }} />
            ))}
            <div style={{ display: "flex", marginLeft: 8, color: CREAM, fontFamily: MONO, fontSize: 18 }}>
              readme.md
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: 20, fontFamily: MONO, fontSize: 22 }}>
            <div style={{ display: "flex", color: LIME }}>$ gh fetch --user you</div>
            <div style={{ display: "flex", color: CREAM, marginTop: 8 }}>&gt; bio, langs, tools ✓</div>
            <div style={{ display: "flex", color: LIME, marginTop: 8 }}>$ gw build --style bash</div>
            <div style={{ display: "flex", color: CREAM, marginTop: 8 }}>&gt; copied to clipboard ✓</div>
          </div>
        </div>
      </div>

      <Foot items={["System.tsx", "Bash.tsx", "YAML.tsx", "packageJSON.tsx"]} />
    </div>
  );
}

/* ------------------------- 5. "/readme/[username]" ------------------------ */

export function OgReadmeUser({
  username = "octocat",
  template = "Bash.tsx",
}: {
  username?: string;
  template?: string;
}) {
  return (
    <div style={shell}>
      <Brand tag="terminal readme" tagBg={MANTIS} />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div style={{ display: "flex", fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: NUIT }}>
          @{username} · {template}
        </div>

        <div style={{ ...boxy(INK), flexDirection: "column", marginTop: 20, padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: `3px solid ${CREAM}`,
              padding: "12px 18px",
            }}
          >
            {[LIME, MANTIS, NUIT].map((c) => (
              <div key={c} style={{ display: "flex", width: 14, height: 14, backgroundColor: c }} />
            ))}
            <div style={{ display: "flex", marginLeft: 8, color: CREAM, fontFamily: MONO, fontSize: 18 }}>
              {username}/README.md
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", padding: 26, fontFamily: MONO, fontSize: 26 }}>
            <div style={{ display: "flex", color: LIME }}>$ whoami</div>
            <div style={{ display: "flex", color: CREAM, marginTop: 10 }}>{username}</div>
            <div style={{ display: "flex", color: LIME, marginTop: 16 }}>$ cat stack.txt</div>
            <div style={{ display: "flex", color: CREAM, marginTop: 10, gap: 22 }}>
              <div style={{ display: "flex" }}>typescript</div>
              <div style={{ display: "flex" }}>react</div>
              <div style={{ display: "flex" }}>node</div>
              <div style={{ display: "flex" }}>postgres</div>
            </div>
            <div style={{ display: "flex", color: LIME, marginTop: 16 }}>$ gw copy</div>
            <div style={{ display: "flex", color: MANTIS, marginTop: 10 }}>&gt; readme copied ✓</div>
          </div>
        </div>
      </div>

      <Foot items={["fetch", "edit", "copy + paste"]} />
    </div>
  );
}

/* ------------------------------- all-in-one ------------------------------- */

/** Preview helper: renders all five OG layouts stacked at 1200x630 each. */
export default function OgImages() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 32, backgroundColor: "#dfe1d4" }}>
      {[
        ["/", <OgLanding key="a" />],
        ["/wrap", <OgWrapHome key="b" />],
        ["/wrap/[username]", <OgWrapUser key="c" />],
        ["/readme", <OgReadmeHome key="d" />],
        ["/readme/[username]", <OgReadmeUser key="e" />],
      ].map(([label, node]) => (
        <div key={label as string} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            {label as string}
          </div>
          <div style={{ width: 1200, height: 630, display: "flex", border: `2px solid ${INK}` }}>
            {node as React.ReactNode}
          </div>
        </div>
      ))}
    </div>
  );
}
