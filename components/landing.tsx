'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Github,
  Star,
  Users,
  Linkedin,
  Twitter,
  Heart
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Image from 'next/image'
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';


export default function LandingPage() {
  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <Features />
        <Reviews />
        <Footer /> 
      </div>
    </main>
  )
}



/* Gallery                                         */
function Gallery() {
  const boardRef = useRef<HTMLDivElement>(null)

  return (
    <section className='mt-40'>
      <div
        ref={boardRef}
        className='boxy relative h-[500px] w-full overflow-hidden md:h-[640px]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--ink) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--ink) 10%, transparent) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        <h2 className='font-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-5xl font-black tracking-tight text-foreground/70 md:text-7xl'>
          GALLERY
        </h2>

        {photos.map((p, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={boardRef}
            dragMomentum={false}
            dragElastic={0}
            whileDrag={{ scale: 1.04, rotate: 0, zIndex: 50 }}
            whileHover={{ scale: 1.02 }}
            initial={{ rotate: p.rotate }}
            className='boxy absolute cursor-grab touch-none bg-foreground/30 p-2 active:cursor-grabbing'
            style={{ top: p.top, left: p.left, width: 200 }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              draggable={false}
              loading='lazy'
              width={512}
              height={512}
              className='pointer-events-none block h-44 w-full object-cover'
            />
            <div className='font-display pt-2 text-center text-sm text-zinc-950 font-bold'>
              {p.alt}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* FAQ                                                                */
function Faq() {
  return (
    <section id='faq' className='mb-10 mt-8 p-6 md:p-12'>
      <div className='mx-auto max-w-3xl '>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className='font-display text-center text-5xl font-black tracking-tight text-ink md:text-6xl'
        >
          Faq's
        </motion.h2>
        <p className='mt-3 text-center text-sm text-muted-foreground md:text-base'>
          The stuff everyone asks before clicking the button.
        </p>

        <Accordion type='single' collapsible className='mt-8 w-full'>
          {faqData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`item-${item.id}`}
                className='relative boxy-sm mt-3 rounded-sm border-2 border-ink bg-cream px-4'
              >
                <AccordionTrigger className='font-display text-left text-lg font-bold text-ink hover:no-underline md:text-xl'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-base leading-relaxed text-ink/80'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* Footer                                                             */
function Footer() {
  return (
    <footer
      id="footer"
      className='boxy mt-20 p-4 md:p-5 relative overflow-hidden'
    >
      <div
        className='relative z-10 flex flex-col gap-12 p-8 '
        style={{
          backgroundImage: `url('/assets/dino_bg_dark.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-14'>
          <div className='flex flex-col gap-6'>
            <span className='boxy-sm px-5 py-2 bg-zinc-100 font-display text-2xl md:text-5xl font-black italic text-[var(--nuit)] flex items-center gap-3'>
              <span className='text-xl md:text-3xl px-2 place-items-center border-2 border-ink bg-[var(--lime)] font-display font-black'>
                G
              </span>
              Github Wrapped
            </span>
            <p className='max-w-md text-zinc-100 font-bold text-lg leading-relaxed'>
              Open source. Built for developers to flex.
            </p>
          </div>

          <div className='flex flex-wrap gap-4'>
            {[
              {
                label: 'GitHub',
                href: 'https://github.com/Dru-429/github-wrapped',
                color: 'bg-zinc-900',
                icon: <Github className='h-4 w-4' />
              },
              {
                label: 'Twitter',
                href: 'https://x.com/10xdhruv',
                color: 'bg-blue-800',
                icon: <Twitter className='h-4 w-4' />
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/dhruvsahoo',
                color: 'bg-blue-500',
                icon: <Linkedin className='h-4 w-4' />
              }
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex gap-2 boxy-sm ${link.color} text-white px-6 py-3 font-black text-sm uppercase tracking-wider hover:-translate-y-1 transition-transform border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]`}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className='h-[5px] w-full bg-none' />
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-black uppercase tracking-widest text-zinc-700 w-full pt-5 border-t-2 border-black/10'>
        <p>© 2026 Github Wrapped. No rights reserved. (it's open source, bruhh)</p>
        <div className='flex items-center gap-3'>
          <span>Built with</span>
          <div className='boxy-sm bg-[var(--deep-green)] p-2 rotate-6 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]'>
            <Heart className='w-5 h-5 text-white fill-current' />
          </div>
        </div>
      </div>

    </footer>
  )
}

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

function Reviews() {
  return (
    <section className="mt-16 md:mt-24">
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
