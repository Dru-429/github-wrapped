"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardPaste,
  Download,
  Github,
  LayoutTemplate,
  PencilLine,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import Navbar from "@/components/landing_ui/Navbar";
import { useRouter } from "next/navigation";
import DevCounts, { bumpCount } from "@/components/ui/DevCounts";

const LoadingUnderscores = () => {
  return (
    <span
      className="inline-flex items-center gap-1"
      style={{ height: "14px", lineHeight: "10px" }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [2, -4, 2] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="inline-block text-sm font-black"
        >
          _
        </motion.span>
      ))}
    </span>
  );
};

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

const features = [
  {
    k: "01",
    t: "Pick your style",
    d: "Choose a visual direction that feels like your profile, from clean system rows to bold config layouts.",
    icon: LayoutTemplate,
    color: "bg-[var(--lime)]",
  },
  {
    k: "02",
    t: "Fetch in one click",
    d: "Drop a handle or GitHub URL and pull your profile details into the builder instantly.",
    icon: Github,
    color: "bg-[var(--mantis)]",
  },
  {
    k: "03",
    t: "Completely editable",
    d: "Tune every section, link, stat, and skill before you publish. Nothing is locked in.",
    icon: PencilLine,
    color: "bg-[var(--cream)]",
  },
  {
    k: "04",
    t: "Copy + paste ready",
    d: "Copy your finished README in a clean format and paste it straight into your repository.",
    icon: ClipboardPaste,
    color: "bg-[var(--lime)]",
  },
  {
    k: "05",
    t: "Unique banners",
    d: "Give your profile a memorable first impression with a banner that is unmistakably yours.",
    icon: Sparkles,
    color: "bg-[var(--mantis)]",
  },
  {
    k: "06",
    t: "Live preview",
    d: "See every change as you make it, so your final README looks right before you share it.",
    icon: Download,
    color: "bg-[var(--cream)]",
  },
];

export default function ReadmePage() {
  const [handle, setHandle] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setCount(631), 900);
    return () => clearTimeout(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = parseUsername(handle);
    if (!username) return;
    setCount((c) => (c === null ? c : c + 1));
    const target = `/readme/${encodeURIComponent(username)}`;
    try {
      router.push(target)
    } catch {
      if (typeof window !== "undefined") window.location.assign(target);
    }
  };

  return (
    <main className="bg-grid h-screen w-screen overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-4 md:px-8 md:py-6">
        <Navbar />

        <section className="boxy mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-5 py-3 md:px-8">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Terminal edition · live</span>
            </motion.div>

            <DevCounts text="devs build" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center md:px-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl  font-black leading-[0.9] tracking-tight md:text-7xl"
            >
              Terminal {" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-3 italic text-[var(--cream)]">
                  README
                </span>
                <span className="absolute inset-0 -rotate-1 bg-[var(--nuit)]" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-2xl text-base text-foreground/75 md:text-lg"
            >
              Generate Terminal readme in secs...
              
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
                aria-label="GitHub username or profile URL"
                className="boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!parseUsername(handle)}
                onClick={bumpCount}
                className="boxy-sm group inline-flex items-center justify-center gap-2 bg-[var(--nuit)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 cursor-pointer"
              >
                Fetch profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.form>

            <p className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50">
              <Sparkles className="h-3.5 w-3.5" />
              fetch profile · edit everything · copy n paste anywhere
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-3"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.k}
                    className="boxy-sm bg-[var(--cream)] p-3 text-left transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-1.5 font-mono text-[10px] font-bold ${feature.color}`}>
                        {feature.k}
                      </span>
                      <Icon className="h-4 w-4 text-ink/70" />
                    </div>
                    <h2 className="mt-3 font-mono text-xs font-bold uppercase tracking-wide text-ink">
                      {feature.t}
                    </h2>
                    <p className="mt-2 text-xs leading-snug text-ink/60">{feature.d}</p>
                  </div>
                );
              })}
            </motion.div>


          </div>
        </section>
      </div>
    </main>
  );
}
