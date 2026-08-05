import type { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Terminal, FileJson, FileCode2, Braces } from "lucide-react";
import { cx } from "../editor-state";

/**
 * Metadata for each template – id matches the `templateNo` numbers used
 * throughout the app (1 = System, 2 = Bash, 3 = YAML, 4 = package.json).
 */
const TEMPLATES = [
  {
    id: 1,
    label: "System",
    sub: "neofetch-style system info layout",
    icon: Terminal,
    accent: "#e39257",
    preview: [
      "OS .............. macOS",
      "Host ............ GitHub",
      "Uptime .......... 2 yrs",
      "Languages ....... TS, Go",
      "Shell ........... zsh",
    ],
  },
  {
    id: 2,
    label: "Bash",
    sub: "terminal script with shell variables",
    icon: FileCode2,
    accent: "#27c93f",
    preview: [
      "#!/usr/bin/env bash",
      'NAME="developer"',
      'ROLE="engineer"',
      "LANGS=(ts go rust)",
      "echo $NAME",
    ],
  },
  {
    id: 3,
    label: "YAML",
    sub: "config-file style key:value pairs",
    icon: FileJson,
    accent: "#e0904a",
    preview: [
      "name: developer",
      "role: engineer",
      "skills:",
      "  - typescript",
      "  - go",
    ],
  },
  {
    id: 4,
    label: "package.json",
    sub: "npm package manifest format",
    icon: Braces,
    accent: "#FF7B68",
    preview: [
      '{',
      '  "name": "dev",',
      '  "title": "eng",',
      '  "skills": [...]',
      '}',
    ],
  },
] as const;

type SelectedProps = {
  templateNo: number;
  setTemplateNo: Dispatch<SetStateAction<number>>;
};

export default function Selected({ templateNo, setTemplateNo }: SelectedProps) {
  return (
    <div className="w-full bg-cream boxy p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* ── Header bar ── */}
        <div className="boxy mb-6 flex items-center justify-between bg-cream px-4 py-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl font-bold text-ink">
              select template
            </span>
            <span className="text-xs text-muted-foreground">
              pick a style · your data carries over
            </span>
          </div>
        </div>

        {/* ── Template grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((tpl) => {
            const active = templateNo === tpl.id;
            const Icon = tpl.icon;

            return (
              <motion.button
                key={tpl.id}
                type="button"
                onClick={() => setTemplateNo(tpl.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={cx(
                  "group relative flex flex-col overflow-hidden border-2 text-left transition-shadow",
                  active
                    ? "border-ink bg-lime shadow-[4px_4px_0_var(--ink)]"
                    : "border-ink bg-cream hover:shadow-[3px_3px_0_var(--ink)]"
                )}
              >
                {/* ── Mini terminal preview ── */}
                <div className="relative w-full bg-[#151B23] px-3 pb-3 pt-2">
                  {/* Dot chrome */}
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                  </div>

                  <pre
                    className="whitespace-pre font-mono text-[9px] leading-[14px] tracking-tight"
                    style={{
                      color: tpl.accent,
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                    }}
                  >
                    {tpl.preview.join("\n")}
                  </pre>

                  {/* Active indicator glow */}
                  {active && (
                    <motion.div
                      layoutId="selected-glow"
                      className="pointer-events-none absolute inset-0 rounded-[1px] ring-2 ring-lime/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>

                {/* ── Label area ── */}
                <div className="flex flex-1 flex-col gap-1 px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cx(
                        "grid h-6 w-6 place-items-center border-2 border-ink",
                        active ? "bg-ink text-lime" : "bg-cream text-ink"
                      )}
                    >
                      <Icon size={13} strokeWidth={2.5} />
                    </span>
                    <span className="font-display text-sm font-bold text-ink lowercase">
                      {tpl.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-snug text-muted-foreground">
                    {tpl.sub}
                  </p>
                </div>

                {/* ── Active badge ── */}
                {active && (
                  <div className="absolute right-2 top-2 border-2 border-ink bg-ink px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-lime">
                    active
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
