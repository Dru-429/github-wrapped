'use client'

import { tweets } from "./data";
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tweet = {
  id: number;
  link: string;
  name: string;
  handle: string;
  avatarSrc: string;
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.1, delay: i * 0.03 }}
      whileHover={{ y: -4, rotate: 0.5 }}
      className={`boxy group flex flex-col justify-between p-5 bg-zinc-100 transition-transform h-full`}
    >
      <div>
        <header className="flex items-start gap-3">
          <div
            className="rounded-full h-11 w-11 shrink-0 border-2 border-[color:var(--ink)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden"
          >
            <img 
              src={t.avatarSrc}
              alt={`${t.name}'s avatar`}
              className="h-full w-full object-cover rounded-full"
              width={44}
              height={44}
            />
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
          
          <Link 
            className="h-5 w-5 shrink-0 relative overflow-hidden cursor-pointer"
            href={t.link}
            target="_blank"
          >
            {/* X Logo */}
            <svg 
              viewBox="0 0 24 24" 
              className="h-5 w-5 absolute inset-0 transition-all duration-200 transform scale-100 opacity-100 group-hover:scale-0 group-hover:opacity-0" 
              aria-label="X"
            >
              <path
                fill="var(--ink)"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>

            <svg 
              viewBox="0 0 24 24" 
              className="h-5 w-5 absolute inset-0 transition-all duration-200 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100" 
              aria-label="Arrow"
            >
              <path
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>
        </header>
        <p className="mt-3 font-display text-[17px] leading-snug text-[color:var(--ink)]">
          {t.text}
        </p>
      </div>
    </motion.article>
  );
}

export default function Reviews() {
  return (
    <section className="mt-26 md:mt-40 py-14">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="boxy-sm bg-[color:var(--lime)] px-3 py-1 text-sm uppercase tracking-widest font-bold">
          Reviews
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black mt-4 text-[color:var(--ink)]">
          Straight from the 
          <span className="italic bg-[color:var(--nuit)] text-cream px-2 mx-2">timeline</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {tweets.map((t, i) => (
          <TweetCard key={t.id} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}