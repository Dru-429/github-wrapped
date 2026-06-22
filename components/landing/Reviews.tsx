'use client'

import { tweets } from "./data";
import { motion } from 'framer-motion'
import Image from 'next/image'


type Tweet = {
  id: number;
  name: string;
  handle: string;
  avatarColor: string;
  text: string;
  date: string;
  verified?: boolean;
};

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Verified">
      <path
        fill="var(--nuit)"
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
      />
    </svg>
  );
}

function TweetCard({ t, i }: { t: Tweet; i: number }) {
  const rotations = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]"];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      whileHover={{ y: -4, rotate: 0 }}
      className={`boxy break-inside-avoid mb-5 p-5 bg-cream ${rotations[i % rotations.length]} transition-transform`}
    >
      <header className="flex items-start gap-3">
        <div
          className="h-11 w-11 shrink-0 border-2 border-[color:var(--ink)] flex items-center justify-center font-display font-bold text-[color:var(--ink)]"
          style={{ background: t.avatarColor }}
        >
          {t.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-display font-bold text-[color:var(--ink)] leading-tight">
              {t.name}
            </span>
            {t.verified && <VerifiedBadge />}
          </div>
          <div className="text-sm text-[color:var(--muted-foreground)] leading-tight">
            @{t.handle} · {t.date}
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-label="X">
          <path
            fill="var(--ink)"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </header>
      <p className="mt-3 font-display text-[17px] leading-snug text-[color:var(--ink)]">
        {t.text}
      </p>
    </motion.article>
  );
}

export default function Reviews() {
  return (
    <section className="mt-26 md:mt-40 py-14">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="boxy-sm bg-[color:var(--lime)] px-3 py-1 text-xs uppercase tracking-widest font-bold">
          What devs are saying
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black mt-4 text-[color:var(--ink)]">
          Straight from the <span className="italic text-[color:var(--nuit)]">timeline</span>
        </h2>
        <p className="mt-3 max-w-xl text-[color:var(--muted-foreground)]">
          Real tweets. Real flexes. Real existential crises about lines of code.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
        {tweets.map((t, i) => (
          <TweetCard key={t.id} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
