import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileCode2, FileTerminal } from "lucide-react";
import { useRouter } from "next/navigation";
import DevCounts, { bumpCount } from "../ui/DevCounts";

/* Hero */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function parseUsername(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const u = new URL(trimmed);
      const seg = u.pathname.split("/").filter(Boolean)[0];
      return seg ?? "";
    }
  } catch {
    // fall through
  }
  return trimmed.replace(/^@/, "").split("/")[0];
}

/** Speech bubble that pops above a button on hover/focus. */
function Bubble({ show, text }: { show: boolean; text: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="pointer-events-none absolute bottom-[calc(100%+14px)] -left-24 z-20 w-[min(20rem,80vw)] "
        >
          <span className="boxy-sm block rounded-[2rem] bg-[var(--cream)] px-5 py-3 text-center font-mono text-[11px] font-bold normal-case leading-relaxed tracking-normal text-ink">
            {text}
          </span>
          {/* tail */}
          <span className="absolute -bottom-[11px] right-10 h-5 w-4  rotate-235 border-t-5 border-l-5 border-ink  bg-[var(--cream)]" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const [handle, setHandle] = useState("");
  const [hovered, setHovered] = useState<"wrap" | "readme" | null>(null);
  const router = useRouter()

  const go = (base: "wrap" | "readme") => {
    const username = parseUsername(handle);
    const target = username
      ? `/${base}/${encodeURIComponent(username)}`
      : `/${base}`;
    try {
      router.push(target)
    } catch {
      if (typeof window !== "undefined") window.location.assign(target);
    }
    bumpCount();
  };

  const handleWrap = (e: React.FormEvent) => {
    e.preventDefault();
    go("wrap");
  };

  return (
    <section className="boxy mt-6 overflow-visible md:mt-14">
      {/* Top bar: badge left, count right */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-6 py-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
        >
          <FileTerminal className="h-4 w-4 " />
          <span>Terminal Edition Readme · live</span>
        </motion.div>

        <DevCounts text="Devs Flexed"/>
      </div>

      {/* Center content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center px-6 py-20 text-center md:px-12 md:py-28"
      >
        <motion.h1
          variants={heroItem}
          className="font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl lg:text-[8.5rem]"
        >
          Github{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-3 italic text-[var(--cream)]">
              Wrapped
            </span>
            <span className="absolute inset-0 -rotate-1 bg-[var(--ink)]" />
          </span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-2xl"
        >
          <span className="font-display italic text-[var(--ink)]">
            Turn your GitHub into something
          </span>{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2 font-display italic">
              Worth Showing off
            </span>
            <span className="absolute inset-0 rotate-1 border-2 border-ink bg-[var(--lime)]" />
          </span>
        </motion.p>

        {/* Input + buttons */}
        <motion.form
          variants={heroItem}
          onSubmit={handleWrap}
          className="mt-12 flex w-full max-w-2xl flex-col items-stretch gap-3"
        >
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Dru-429 or https://github.com/Dru-429"
            aria-label="GitHub username"
            className="boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
          />
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <div
              className="relative md:w-1/2"
              onMouseEnter={() => setHovered("wrap")}
              onMouseLeave={() => setHovered(null)}
            >
              <Bubble
                show={hovered === "wrap"}
                text="Your year in code, in Spotify style cards lines of code, commits, top languages, etc & shareable img."
              />
              <button
                type="submit"
                onFocus={() => setHovered("wrap")}
                onBlur={() => setHovered(null)}
                className="boxy-sm group inline-flex w-full items-center justify-center gap-2 bg-[var(--nuit)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Get my wrapped
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div
              className="relative md:w-1/2"
              onMouseEnter={() => setHovered("readme")}
              onMouseLeave={() => setHovered(null)}
            >
              <Bubble
                show={hovered === "readme"}
                text="Terminal Styles Readme — select style, fetch data, edit everything, then copy + paste anywhere."
              />
              <button
                type="button"
                onClick={() => go("readme")}
                onFocus={() => setHovered("readme")}
                onBlur={() => setHovered(null)}
                className="boxy-sm group inline-flex w-full items-center justify-center gap-2 bg-[var(--lime)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <FileCode2 className="h-4 w-4" />
                Generate Readme
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.form>

        <motion.p
          variants={heroItem}
          className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/50"
        >
          <FileCode2 className="h-3.5 w-3.5" />
          one click fetch · nothing stored · free forever
        </motion.p>
      </motion.div>
    </section>
  );
}
