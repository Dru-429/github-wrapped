"use  client"

import { motion } from "framer-motion";
import { WalletCards, ChartNoAxesCombined, Smartphone, SquareTerminal, Sparkles } from "lucide-react";

const features = [
  {
    icon: WalletCards,
    title: "Github API",
    note: "Single click data fetch. Nothing stored, ever.",
    color: "var(--lime)",
    rotate: -2.5,
  },
  {
    icon: ChartNoAxesCombined,
    title: "Stats & Cards",
    note: "Lines of code, fav day to code, timeline & more.",
    color: "var(--mantis)",
    rotate: 1.8,
  },
  {
    icon: Smartphone,
    title: "Spotify Wrapped",
    note: "Wrap your year in code and share it to the world.",
    color: "var(--bluenuit)",
    rotate: -1.2,
    stars: true,
  },
  {
    icon: SquareTerminal,
    title: "Terminal Readme",
    note: "Fetch data, edit, copy and use :)",
    color: "var(--lime)",
    rotate: 2.2,
    isNew: true,
  },
];

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="boxy mt-10 px-6 py-16 md:px-12 md:py-24">
      {/* Heading */}
      <div className="mb-14 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-center gap-3"
        >
          <span className="boxy-sm bg-[var(--nuit)] px-5 py-2 font-display text-4xl font-black italic text-[var(--cream)] md:text-6xl">
            Features
          </span>
          <span className="font-display text-2xl italic text-foreground/60 md:text-3xl">
            … of course …
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 max-w-xl text-base text-foreground/70 md:text-lg"
        >
          Everything you need to flex on Twitter, LinkedIn.
          <br />
        </motion.p>
      </div>

      {/* Sticky note grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              style={{ rotate: `${f.rotate}deg`, background: f.color }}
              className="boxy flex aspect-[3/4] flex-col p-3 transition-shadow hover:shadow-[10px_10px_0_0_var(--ink)]"
            >
              <div
                className="relative grid h-[60%] w-full place-items-center overflow-hidden border-2 border-ink bg-cream"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, color-mix(in srgb, var(--ink) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--ink) 12%, transparent) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                {f.isNew && (
                  <span className="boxy-sm absolute right-2 top-2 bg-lime px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-ink">
                    New
                  </span>
                )}
                <div className="relative">
                  {f.stars && (
                    <>
                      <Sparkles
                        size={20}
                        className="absolute -left-6 -top-4 text-ink/70"
                        strokeWidth={2.5}
                      />
                      <Sparkles
                        size={30}
                        className="absolute -left-8 -top-3 text-ink/50"
                        strokeWidth={2.5}
                      />
                      <Sparkles
                        size={20}
                        className="absolute -right-3  text-ink/70"
                        strokeWidth={2.5}
                      />
                      <Sparkles
                        size={16}
                        className="absolute -right-5 -top-6 text-ink/50"
                        strokeWidth={2.5}
                      />
                    </>
                  )}
                  <Icon size={86} strokeWidth={1.75} className="text-ink" />
                </div>
              </div>
              {/* 30% tag */}
              <div className="flex flex-1 flex-col justify-center px-2 pt-3">
                  <h3 className="font-display text-xl font-black leading-tight text-ink md:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-ink/70 md:text-sm">{f.note}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
