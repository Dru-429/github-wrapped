"use client";

import { motion } from "framer-motion";
import { User, Terminal, Database, Cpu, Sparkles, FileCode2, Smartphone, ArrowRight, ArrowDown } from "lucide-react";

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
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
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

export default function Working() {
  return (
    <section id="how-it-works" className="boxy mt-10 px-4 py-12 md:px-10 md:py-20 bg-cream">
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
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
          Single input, instant pipeline. From your GitHub handle to live stats, custom terminal readmes, and wrapped stories.
        </motion.p>
      </div>

      {/* Workflow Diagram Box */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-6xl rounded-sm border-2 border-ink bg-[#151B23] p-5 md:p-8 text-white shadow-[8px_8px_0_0_var(--ink)]"
      >
        {/* Terminal Header Chrome */}
        <div className="mb-8 flex items-center justify-between border-b-2 border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-xs text-white/50">workflow_architecture.sh</span>
          </div>
          <span className="boxy-sm bg-black/40 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--lime)]">
            LIVE PIPELINE
          </span>
        </div>

        {/* Outer Frame Box (Matching structure screenshot) */}
        <div className="relative rounded-lg border-2 border-dashed border-[#FF7B68]/60 bg-black/30 p-4 md:p-8">
          {/* Header Title inside screenshot frame */}
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#FF7B68]" />
            <h3 className="font-display text-xl font-bold tracking-wide text-cream md:text-2xl">
              Github wrapped
            </h3>
          </div>

          {/* Desktop Flow: Horizontal Layout / Mobile Flow: Stacked Layout */}
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-stretch lg:gap-4">
            
            {/* Step 1: User */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="flex min-w-[110px] flex-col items-center justify-center rounded-lg border-2 border-[#FF7B68] bg-[#151B23] p-4 text-center shadow-[3px_3px_0_0_#FF7B68]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#FF7B68] bg-[#FF7B68]/10 text-[#FF7B68]">
                <User size={20} />
              </div>
              <span className="mt-2 font-display text-base font-bold text-cream">User</span>
            </motion.div>

            {/* Arrow 1 */}
            <div className="flex items-center justify-center text-[#FF7B68]">
              <ArrowRight className="hidden h-6 w-6 lg:block animate-pulse" />
              <ArrowDown className="block h-6 w-6 lg:hidden animate-pulse" />
            </div>

            {/* Step 2: Enter github username */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="flex max-w-[180px] flex-col items-center justify-center rounded-lg border-2 border-[#FF7B68] bg-[#151B23] p-4 text-center shadow-[3px_3px_0_0_#FF7B68]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#FF7B68] bg-[#FF7B68]/10 text-[#FF7B68]">
                <Terminal size={20} />
              </div>
              <span className="mt-2 font-display text-sm font-bold leading-snug text-cream">
                Enter github username
              </span>
            </motion.div>

            {/* Connector 2 with DB count increment tag */}
            <div className="flex flex-col items-center justify-center text-[#FF7B68]">
              <span className="boxy-sm bg-[#FF7B68]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FF7B68] border border-[#FF7B68]/40 mb-1">
                DB count increment
              </span>
              <ArrowRight className="hidden h-6 w-6 lg:block animate-pulse" />
              <ArrowDown className="block h-6 w-6 lg:hidden animate-pulse" />
            </div>

            {/* Step 3: GITHUB API */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="flex min-w-[130px] flex-col items-center justify-center rounded-2xl border-2 border-[#FF7B68] bg-[#151B23] px-5 py-6 text-center shadow-[3px_3px_0_0_#FF7B68]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[#FF7B68] bg-[#FF7B68]/10 text-[#FF7B68]">
                <Cpu size={20} />
              </div>
              <span className="mt-2 font-mono text-xs font-black uppercase tracking-wider text-cream">
                GITHUB API
              </span>
            </motion.div>

            {/* Connector 3 with graphQL tag */}
            <div className="flex flex-col items-center justify-center text-[#FF7B68]">
              <span className="boxy-sm bg-[#FF7B68]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FF7B68] border border-[#FF7B68]/40 mb-1">
                graphQL
              </span>
              <ArrowRight className="hidden h-6 w-6 lg:block animate-pulse" />
              <ArrowDown className="block h-6 w-6 lg:hidden animate-pulse" />
            </div>

            {/* Step 4: Stats Box */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex flex-1 flex-col rounded-xl border-2 border-[#FF7B68] bg-[#151B23] p-5 shadow-[4px_4px_0_0_#FF7B68]"
            >
              <div className="mb-3 border-b border-[#FF7B68]/30 pb-2">
                <span className="font-display text-xl font-black italic text-[#FF7B68]">
                  Stats
                </span>
              </div>
              <ul className="grid gap-1.5 font-mono text-xs text-cream/80">
                {statsItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#FF7B68]">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connector 4 to Forked Outputs */}
            <div className="flex flex-col items-center justify-center text-[#FF7B68]">
              <ArrowRight className="hidden h-6 w-6 lg:block animate-pulse" />
              <ArrowDown className="block h-6 w-6 lg:hidden animate-pulse" />
            </div>

            {/* Step 5: Outputs (Readme & Wrapped) */}
            <div className="flex flex-row gap-4 lg:flex-col lg:justify-center">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg border-2 border-[#FF7B68] bg-[#151B23] px-5 py-3 shadow-[3px_3px_0_0_#FF7B68]"
              >
                <FileCode2 size={16} className="text-[var(--lime)]" />
                <span className="font-display text-base font-bold text-cream">Readme</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg border-2 border-[#FF7B68] bg-[#151B23] px-5 py-3 shadow-[3px_3px_0_0_#FF7B68]"
              >
                <Smartphone size={16} className="text-[#FF7B68]" />
                <span className="font-display text-base font-bold text-cream">Wrapped</span>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
