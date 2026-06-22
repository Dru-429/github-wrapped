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



/* Hero                                                               */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const LoadingUnderscores = () => {
  return (
    <span className="inline-flex gap-1 items-center" style={{ height: '14px', lineHeight: '10px' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            y: [2, -4, 2],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="inline-block font-black text-sm"
        >
          _
        </motion.span>
      ))}
    </span>
  );
};

function Hero() {
  const [handle, setHandle] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [totalWrapped, setTotalWrapped] = useState<number | null>(null);

  // Function to load the initial stats metric
  const fetchCurrentCount = async () => {
    try {
      const response = await fetch('/api/count');
      const data = await response.json();
      setTotalWrapped(data.count);
    } catch (err) {
      console.error("Error reading data metric tracker:", err);
    }
  };

  const handleWrappedGenerated = async () => {
    try {
      const response = await fetch('/api/count', { method: 'POST' });
      const data = await response.json();
      if (data.count) {
        setTotalWrapped(data.count);
      }
    } catch (err) {
      console.error("Failed to bump analytics tracker:", err);
    }
  };

  useEffect(() => {
    fetchCurrentCount();
  }, []);

  const handleWrap = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle.trim()) return

    let cleanUsername = handle.trim()
    if (cleanUsername.includes('github.com/')) {
      cleanUsername = cleanUsername.split('github.com/')[1].split('/')[0]
    }

    setIsLoading(true)
    router.push(`/wrap/${cleanUsername}`)
  }

  return (
    <section className='boxy mt-6 md:mt-14 overflow-hidden'>
      {/* Top bar: badge left, count right */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-6 py-4 md:px-10'>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest'
        >
          <Star className='h-3.5 w-3.5 fill-current' />
          <span>2025 Spotify edition · live</span>
        </motion.div>

        <motion.div
          key={totalWrapped}
          initial={{ scale: 0.92, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          className='relative boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--cream)]'
        >
          <div className='shadow-xl/30 shadow-blue-600  w-full h-full absolute rounded-xl -left-1'></div>
          <Users className='h-3.5 w-3.5' />
          <span>
            <span className='font-display text-sm inline-flex items-center justify-center min-w-[28px]'>
              {totalWrapped !== null ? totalWrapped.toLocaleString() : <LoadingUnderscores />}
            </span>{' '}
            devs flexed
          </span>
        </motion.div>
      </div>

      {/* Center content */}
      <motion.div
        variants={heroContainer}
        initial='hidden'
        animate='show'
        className='flex flex-col items-center px-6 py-20 text-center md:px-12 md:py-28'
      >
        <motion.h1
          variants={heroItem}
          className='font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl lg:text-[8.5rem]'
        >
          Github{' '}
          <span className='relative inline-block'>
            <span className='relative z-10 px-3 italic text-[var(--cream)]'>
              Wrapped
            </span>
            <span className='absolute inset-0 -rotate-1 bg-[var(--ink)]' />
          </span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className='mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-2xl'
        >
          Ur year in code{' '}
          <span className='font-display italic text-[var(--ink)]'>Wrapped</span>{' '}
          in{' '}
          <span className='relative inline-block'>
            <span className='relative z-10 px-2 font-display italic'>
              Spotify Style.
            </span>
            <span className='absolute inset-0 rotate-1 border-2 border-ink bg-[var(--lime)]' />
          </span>
        </motion.p>

        {/* Input + button */}
        <motion.form
          variants={heroItem}
          onSubmit={handleWrap}
          className='mt-12 flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row'
        >
          <input
            type='text'
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder='Dru-429 or https://github.com/Dru-429'
            className='boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0'
          />
          <button
            type='submit'
            disabled={isLoading || !handle.trim()}
            onClick={handleWrappedGenerated}
            className='boxy-sm group inline-flex items-center justify-center gap-2 bg-[var(--nuit)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0'
          >
            {isLoading ? 'Loading...' : 'Get my wrapped'}
            {!isLoading && (
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            )}
          </button>
        </motion.form>
      </motion.div>
    </section>
  )
}

/* Features                                                           */
const featureItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
  }
}

function Features() {
  return (
    <section id='features' className='boxy mt-10 px-6 py-16 md:px-12 md:py-24'>
      <div className='mb-14 flex flex-col items-center text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className='flex flex-wrap items-end justify-center gap-3'
        >
          <span className='boxy-sm bg-[var(--nuit)] px-5 py-2 font-display text-4xl font-black italic text-[var(--cream)] md:text-6xl'>
            Features
          </span>

        </motion.div>
      </div>
      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.1 }}
        className='mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
      >
        {features.map(f => (
          <motion.div
            key={f.title}
            variants={featureItem}
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            style={{ rotate: `${f.rotate}deg`, background: f.color }}
            className='boxy flex aspect-[3/4] flex-col p-3 transition-shadow hover:shadow-[10px_10px_0_0_var(--ink)]'
          >
            <div className='relative h-[70%] w-full overflow-hidden border-2 border-ink bg-[var(--ink)]'>
              <Image
                src={f.img}
                alt={f.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className='h-full w-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='flex flex-1 flex-col justify-center px-2 pt-3'>
              <h3 className='font-display text-xl font-black leading-tight text-ink md:text-2xl'>
                {f.title}
              </h3>
              <p className='mt-1 text-xs font-medium text-ink/70 md:text-sm'>
                {f.note}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className=''>
        <Gallery />
      </div>

      <div className='mt-20'>
        <Faq />
      </div>
    </section>
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
