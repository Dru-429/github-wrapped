"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

/**
 * /readme/[username]
 *
 * Next.js App Router page. Shows the username picked on "/" and lets the user
 * choose one of the available terminal README templates. Selecting a template
 * routes to /readme/[username]/[template_no].
 *
 * Follows the "Github Wrapped" theme (cream / ink / lime / nuit) and the
 * boxy, offset-shadow aesthetic used across the site.
 */

type Template = {
  no: number;
  name: string;
  tag: string;
  desc: string;
  bg: string; // tailwind bg-[var(--token)]
  fg: string; // tailwind text color
  preview: string; // small ascii preview
};

const templates: Template[] = [
  {
    no: 1,
    name: "System Info",
    tag: "neofetch",
    desc: "ASCII portrait on the left, key-value system rows on the right.",
    bg: "bg-[var(--nuit)]",
    fg: "text-[var(--cream)]",
    preview: "user@github\n─────────────\nOS      : macOS\nUptime  : 22y 5m",
  },
  {
    no: 2,
    name: "Dev Terminal",
    tag: "bash",
    desc: "Prompt-style commands walk through bio, stack, and socials.",
    bg: "bg-[var(--ink)]",
    fg: "text-[var(--lime)]",
    preview: "$ cat /bio.txt\n> hello world\n$ ls /tech-stack\n> react  ts",
  },
  {
    no: 3,
    name: "Minimal Card",
    tag: "coming soon",
    desc: "Compact single-card layout with stats and top languages.",
    bg: "bg-[var(--lime)]",
    fg: "text-[var(--ink)]",
    preview: "▓▓▓ minimal ▓▓▓\ncommits  1.2k\nstars     84",
  },
  {
    no: 4,
    name: "Retro Boot",
    tag: "coming soon",
    desc: "BIOS-style boot log with your GitHub milestones.",
    bg: "bg-[var(--mantis)]",
    fg: "text-[var(--ink)]",
    preview: "[ ok ] mount /profile\n[ ok ] load languages\n[ ok ] ready.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ReadmeUsernamePage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params?.username ?? "");

  return (
    <main className="bg-grid min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        {/* Top row: back + username chip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="boxy-sm inline-flex items-center gap-2 bg-[var(--cream)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-ink"
          >
            ← back
          </Link>

          <div className="boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--cream)]">
            <Terminal className="h-3.5 w-3.5" />
            <span>
              username:{" "}
              <span className="font-display text-sm normal-case italic">
                {username || "anonymous"}
              </span>
            </span>
          </div>
        </div>

        {/* Boxy container */}
        <section className="boxy overflow-hidden">
          <div className="border-b-2 border-ink px-6 py-8 text-center md:px-10 md:py-12">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl font-black tracking-tight md:text-6xl"
            >
              Select a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-2 italic text-[var(--cream)]">
                  terminal
                </span>
                <span className="absolute inset-0 -rotate-1 bg-[var(--ink)]" />
              </span>{" "}
              readme template
            </motion.h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70 md:text-base">
              Pick a style. We'll wrap{" "}
              <span className="font-display italic">
                @{username || "your handle"}
              </span>
              's year in code with it.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:p-10"
          >
            {templates.map((t) => (
              <motion.div key={t.no} variants={item}>
                <Link
                  href={`/readme/${encodeURIComponent(username)}/${t.no}`}
                  className="boxy group block bg-[var(--cream)] transition-transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  {/* Preview window */}
                  <div className={`${t.bg} ${t.fg} border-b-2 border-ink`}>
                    <div className="flex items-center gap-2 border-b-2 border-ink/40 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest opacity-70">
                        temp {t.no} · {t.tag}
                      </span>
                    </div>
                    <pre className="whitespace-pre px-4 py-5 font-mono text-[11px] leading-5 md:text-xs">
                      {t.preview}
                    </pre>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between gap-3 px-4 py-4">
                    <div>
                      <div className="font-display text-xl font-black leading-tight">
                        {t.name}
                      </div>
                      <p className="mt-1 text-xs text-ink/70">{t.desc}</p>
                    </div>
                    <span className="boxy-sm inline-flex items-center gap-1 bg-[var(--lime)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                      use
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
