"use client"

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Users, Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { useRouter } from "next/navigation";
import DevCounts, { bumpCount } from "@/components/ui/DevCounts";


/** Extract a bare username from a raw input or a github URL. */
function parseUsername(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const u = new URL(trimmed);
      return u.pathname.split("/").filter(Boolean)[0] ?? "";
    }
  } catch {
    // fall through
  }
  return trimmed.replace(/^@/, "").split("/")[0];
}

const highlights = [
  { k: "01", t: "loc & commits", d: "Every line you shipped, counted" },
  { k: "02", t: "top language", d: "The syntax you couldn't quit" },
  { k: "03", t: "overview", d: "Stars, PRs, streaks — one card" },
  { k: "04", t: "timeline", d: "Your whole year, month by month" },
];

export default function WrapperPage() {
  const [handle, setHandle] = useState("");
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = parseUsername(handle);
    if (!username) return;
    const target = `/wrapper/${encodeURIComponent(username)}`;
    try {
      router.push(target);
    } catch {
      if (typeof window !== "undefined") window.location.assign(target);
    }
  };

  return (
    <main className="bg-grid h-screen w-screen overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-4 md:px-8 md:py-6">
        <Navbar />

        <section className="boxy mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* top strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-5 py-3 md:px-8">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            >
              <Gift className="h-3.5 w-3.5" />
              <span>2025 spotify edition &gt; live</span>
            </motion.div>

            <DevCounts text="devs flexed" /> 

          </div>

          {/* body */}
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center md:px-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-black leading-[0.9] tracking-tight md:text-7xl"
            >
              Get your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-3 italic text-[var(--cream)]">
                  wrapped
                </span>
                <span className="absolute inset-0 -rotate-1 bg-[var(--ink)]" />
              </span>{" "}
              cards
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base text-foreground/75 md:text-lg"
            >
              Ur year in code, wrapped in{" "}
              <span className="font-display italic">Spotify style</span> — one
              handle, a full set of shareable stat cards.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              onSubmit={submit}
              className="mt-8 flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="dru249 or https://github.com/Dru-429"
                className="boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!parseUsername(handle)}
                onClick={bumpCount}
                className="boxy-sm group inline-flex items-center justify-center gap-2 bg-[var(--nuit)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Get my wrapped
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
            >
              {highlights.map((h) => (
                <div
                  key={h.k}
                  className="boxy-sm bg-[var(--cream)] p-3 text-left transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-[var(--lime)] px-1.5 font-mono text-[10px] font-bold">
                      {h.k}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink">
                      {h.t}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-ink/60">{h.d}</p>
                </div>
              ))}
            </motion.div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50">
              <Sparkles className="h-3.5 w-3.5" />
              stat cards · drag &amp; arrange · share anywhere
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
