"use client"

import { motion } from "framer-motion";
import {
  User,
  Terminal,
  Cpu,
  Sparkles,
  FileCode2,
  Smartphone,
} from "lucide-react";

const statsItems = [
  "About & Bio",
  "Total Commits",
  "Languages code in",
  "Contribution History",
  "Top Repos, Total Stars",
  "Total Issues, PRs, Commits",
  "Monthly distribution",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Arrow that draws itself the first time it scrolls into view. */
function DrawArrow({ delay = 0, label }: { delay?: number; label?: string }) {
  const stroke = "var(--lime)";
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.7, delay, ease: "easeInOut" as const },
        opacity: { duration: 0.1, delay },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {label && (
        <span className="border-2 border-[var(--lime)]/40 bg-[var(--lime)]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--lime)]">
          {label}
        </span>
      )}

      {/* Desktop: horizontal arrow */}
      <motion.svg
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="hidden lg:block"
        width="44"
        height="20"
        viewBox="0 0 44 20"
        fill="none"
      >
        <motion.path
          variants={draw}
          d="M2 10 H38"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <motion.path
          variants={draw}
          d="M30 3 L38 10 L30 17"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </motion.svg>

      {/* Mobile: vertical arrow */}
      <motion.svg
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
        className="block lg:hidden"
        width="20"
        height="44"
        viewBox="0 0 20 44"
        fill="none"
      >
        <motion.path
          variants={draw}
          d="M10 2 V38"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <motion.path
          variants={draw}
          d="M3 30 L10 38 L17 30"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}

const box =
  "flex flex-col items-center justify-center border-2 border-[var(--lime)] bg-[var(--ink)] p-4 text-center shadow-[3px_3px_0_0_var(--lime)]";
const iconBox =
  "grid h-10 w-10 place-items-center border-2 border-[var(--lime)] bg-[var(--lime)]/10 text-[var(--lime)]";

export default function Working() {
  return (
    <section
      id="how"
      className="boxy mt-10 bg-[var(--cream)] px-4 py-12 md:px-10 md:py-20"
    >
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="boxy-sm bg-[var(--lime)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-ink">
            Architecture & Workflow
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-black leading-tight text-ink md:text-6xl"
        >
          How it{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2 italic text-[var(--cream)]">
              works
            </span>
            <span className="absolute inset-0 -rotate-1 bg-[var(--ink)]" />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 max-w-xl text-sm text-foreground/75 md:text-base"
        >
          Single input, instant pipeline. From your GitHub handle to live stats,
          custom terminal readmes, and wrapped stories.
        </motion.p>
      </div>

      {/* Workflow Diagram Box */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-6xl border-2 border-ink bg-[var(--ink)] p-5 text-[var(--cream)] shadow-[8px_8px_0_0_var(--ink)] md:p-8"
      >
        {/* Terminal Header Chrome */}
        <div className="mb-8 flex items-center justify-between border-b-2 border-[var(--cream)]/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-[var(--lime)]" />
            <span className="h-3 w-3 bg-[var(--mantis)]" />
            <span className="h-3 w-3 bg-[var(--cream)]/60" />
            <span className="ml-2 font-mono text-xs text-[var(--cream)]/50">
              workflow_architecture.sh
            </span>
          </div>
          <span className="border-2 border-[var(--lime)]/40 bg-black/30 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--lime)]">
            LIVE PIPELINE
          </span>
        </div>

        {/* Outer Frame */}
        <div className="relative border-2 border-dashed border-[var(--lime)]/50 bg-black/25 p-4 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--lime)]" />
            <h3 className="font-display text-xl font-bold tracking-wide text-[var(--cream)] md:text-2xl">
              Github wrapped
            </h3>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-stretch lg:gap-4">
            {/* Step 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className={`${box} min-w-[110px]`}
            >
              <div className={iconBox}>
                <User size={20} />
              </div>
              <span className="mt-2 font-display text-base font-bold text-[var(--cream)]">
                User
              </span>
            </motion.div>

            <DrawArrow />

            {/* Step 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className={`${box} max-w-[180px]`}
            >
              <div className={iconBox}>
                <Terminal size={20} />
              </div>
              <span className="mt-2 font-display text-sm font-bold leading-snug text-[var(--cream)]">
                Enter github username
              </span>
            </motion.div>

            <DrawArrow delay={0.15} label="DB count increment" />

            {/* Step 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className={`${box} min-w-[130px] px-5 py-6`}
            >
              <div className={iconBox}>
                <Cpu size={20} />
              </div>
              <span className="mt-2 font-mono text-xs font-black uppercase tracking-wider text-[var(--cream)]">
                GITHUB API
              </span>
            </motion.div>

            <DrawArrow delay={0.3} label="graphQL" />

            {/* Step 4: Stats */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex flex-1 flex-col border-2 border-[var(--lime)] bg-[var(--ink)] p-5 shadow-[4px_4px_0_0_var(--lime)]"
            >
              <div className="mb-3 border-b-2 border-[var(--lime)]/30 pb-2">
                <span className="font-display text-xl font-black italic text-[var(--lime)]">
                  Stats
                </span>
              </div>
              <ul className="grid gap-1.5 font-mono text-xs text-[var(--cream)]/80">
                {statsItems.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="text-[var(--lime)]">-</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <DrawArrow delay={0.45} />

            {/* Step 5: Outputs */}
            <div className="flex flex-row gap-4 lg:flex-col lg:justify-center">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border-2 border-[var(--lime)] bg-[var(--ink)] px-5 py-3 shadow-[3px_3px_0_0_var(--lime)]"
              >
                <FileCode2 size={16} className="text-[var(--lime)]" />
                <span className="font-display text-base font-bold text-[var(--cream)]">
                  Readme
                </span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 border-2 border-[var(--mantis)] bg-[var(--ink)] px-5 py-3 shadow-[3px_3px_0_0_var(--mantis)]"
              >
                <Smartphone size={16} className="text-[var(--mantis)]" />
                <span className="font-display text-base font-bold text-[var(--cream)]">
                  Wrapped
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
