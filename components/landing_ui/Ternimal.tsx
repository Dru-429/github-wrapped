import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const terminals = [
  { name: "System.tsx", img: "/banners/covers/SystemInfo.png", blurb: "neofetch-style profile card." },
  { name: "Bash.tsx", img: "/banners/covers/Bash.png", blurb: "classic prompt, clean columns." },
  { name: "YAML.tsx", img: "/banners/covers/YAML.png", blurb: "config-file vibes.", isNew: true },
  { name: "packageJSON.tsx", img: "/banners/covers/JSON.png", blurb: "your profile as deps.", isNew: true },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function TerminalReadme() {
  const router = useRouter();
  
  return (
    <section id="terminal-readme" className="boxy relative mt-10 px-6 py-16 md:px-12 md:py-24">
      <div className="mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-wrap items-end justify-center gap-3"
        >
          <span className="boxy-sm bg-ink px-5 py-2 font-display text-4xl font-black italic text-cream md:text-6xl">
            Terminal Readme
          </span>
          <span className="absolute -top-2 -right-6 boxy-sm bg-lime px-4 py-1 font-mono text-[15px] font-black uppercase tracking-widest text-ink">
            New
          </span>
        </motion.div>
        <p className="mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
          Four terminal-flavoured profile READMEs. Fetch your data, tweak it, copy it.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {terminals.map((t) => (
          <motion.div key={t.name} variants={item}>
            <button
              onClick={() => {
                router.push("/readme")
              }} 
              className="boxy group block bg-cream p-2 transition-all hover:-translate-y-1.5 hover:shadow-[10px_10px_0_0_var(--ink)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink bg-ink">
                <Image
                  src={t.img}
                  alt={`${t.name} readme preview`}
                  height={300}
                  width={300}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
                {t.isNew && (
                  <span className="boxy-sm absolute right-2 top-2 bg-lime px-2 py-0.5 font-mono text-[14px] font-black uppercase tracking-widest text-ink">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-3">
                <div className="min-w-0">
                  <h3 className="truncate font-mono text-sm font-bold text-ink">{t.name}</h3>
                  <p className="truncate text-xs text-ink/60">{t.blurb}</p>
                </div>
                <span className="shrink-0 font-mono text-xs font-bold text-ink transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/readme"
          className="boxy group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-mono text-sm font-black uppercase tracking-widest text-ink transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--ink)]"
        >
          Try it now
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
