'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Github,
  Star,
  Users,
  Linkedin,
  Twitter,
  MessageCircle,
  Heart
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Image from 'next/legacy/image'

const locImg = '/assets/loc.png'
const langImg = '/assets/lang.png'
const overviewImg = '/assets/overview.png'
const timelineImg = '/assets/timeline.png'
const theme = '/assets/theme.jpg'
const pic2 = '/assets/dino_bg.png'
const x = '/assets/x.png'
const cards = '/assets/cards.png'

export default function LandingPage () {
  return (
    <main className='bg-grid min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8'>
        <Navbar />
        <Hero />
        <Features />
        <Faq />
        <Footer />
      </div>
    </main>
  )
}

/* Navbar                                                             */
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#footer' },
  { label: 'FAQ', href: '#faq' }
]

function Navbar () {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='boxy flex items-center justify-between px-4 py-3 md:px-6 md:py-4'
    >
      <a href='#' className='flex items-center gap-2'>
        <span className='grid h-8 w-8 place-items-center border-2 border-ink bg-[var(--lime)] font-display text-lg font-black'>
          G
        </span>
        <span className='font-display text-xl font-bold tracking-tight'>
          Github Wrapped
        </span>
      </a>

      <div className='hidden items-center gap-8 md:flex'>
        {navLinks.map(l => (
          <a
            key={l.label}
            href={l.href}
            className='relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-foreground after:transition-all hover:after:w-full'
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href='https://github.com/Dru-429/github-wrapped'
        className='boxy-sm group inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 md:px-4 md:text-sm'
      >
        <Github className='h-4 w-4' />
        <span>Github</span>
      </a>
    </motion.nav>
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

function Hero () {
  const [handle, setHandle] = useState('')
  const [count, setCount] = useState(631)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
          key={count}
          initial={{ scale: 0.92, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          className='boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--cream)]'
        >
          <Users className='h-3.5 w-3.5' />
          <span>
            <span className='font-display text-sm'>
              {count.toLocaleString()}
            </span>{' '}
            devs wrapped
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
            placeholder='dru249 or https://github.com/Dru-429'
            className='boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0'
          />
          <button
            type='submit'
            disabled={isLoading || !handle.trim()}
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
const features = [
  {
    img: locImg,
    title: 'Count LoC & Commits',
    note: 'Every line, every push.',
    color: 'var(--lime)',
    rotate: -2.5
  },
  {
    img: langImg,
    title: 'Find ur Fav Lang',
    note: 'Many more',
    color: 'var(--mantis)',
    rotate: 1.8
  },
  {
    img: overviewImg,
    title: 'Show an Overview',
    note: 'PRs, issues, the lot.',
    color: 'var(--cream)',
    rotate: -1.2
  },
  {
    img: timelineImg,
    title: 'Year Timeline',
    note: 'Q1 to Q4, mapped.',
    color: 'var(--lime)',
    rotate: 2.2
  }
]

const featureItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
  }
}

function Features () {
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
          <span className='font-display text-2xl italic text-foreground/60 md:text-3xl'>
            … of course …
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className='mt-6 max-w-xl text-base text-foreground/70 md:text-lg'
        >
          Everything you need to flex on LinkedIn this December.
          <br />
          <span className='font-display italic'>
            Pinned to the wall, sticky-note style.
          </span>
        </motion.p>
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
              <img
                src={f.img}
                alt={f.title}
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
    </section>
  )
}

/* Gallery                                         */
const photos = [
  { src: theme, alt: 'Theme', top: '12%', left: '10%', rotate: -5 },
  { src: pic2, alt: 'Hot', top: '35%', left: '75%', rotate: 5 },
  { src: x, alt: 'Meet the developer', top: '55%', left: '15%', rotate: 5 },
  { src: cards, alt: 'Cards Collage', top: '10%', left: '45%', rotate: 5 }
]

function Gallery () {
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
const faqData = [
  {
    id: 1,
    question: 'Is my data shared?',
    answer:
      "Totally! JK ! We don't store your data or your code—we just fetch the public stuff from GitHub, make it look pretty, and then we forget we ever met."
  },
  {
    id: 2,
    question: 'What kind of stats am I getting?',
    answer: "Bruhhh... it's fun and jsut a click away, Go check it out!"
  },
  {
    id: 3,
    question: 'Can it see my private repos?',
    answer:
      'Sorry Nahh! We only look at your public activity. We are working on it'
  },
  {
    id: 4,
    question: 'Can we Download it or Share it ?',
    answer:
      "Of course..it generates sleek, story-ready cards. One click and you're ready to flex your wins on X, LinkedIn, or Instagram. 📸"
  },
  {
    id: 5,
    question: 'Wait, I found. a bug!',
    answer:
      "Awesome! (Well, not the bug, but the fact that you found it). This is an open-source project, so head over to the GitHub repo and drop an issue or a PR. Let's build this together!"
  }
]

function Faq () {
  return (
    <section id='faq' className='boxy mt-8 p-6 md:p-12'>
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
function Footer () {
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
