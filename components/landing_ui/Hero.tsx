'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, FileCode2, Star } from 'lucide-react'
import DevCounts, { bumpCount } from '@/components/ui/DevCounts'

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

/* LoadingUnderscores is now handled inside DevCounts */

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

export default function Hero() {
  const [handle, setHandle] = useState('')
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

  const handelReadme = async() => {
    const username = parseUsername(handle);
    if (!username) return;

    const target = `/readme/${encodeURIComponent(username)}`;
    router.push(target)
    const res =  bumpCount();
    console.log(res);
  };
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

        <DevCounts text="devs flexed" />
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
          className='mt-12 flex flex-col w-full max-w-2xl  items-stretch gap-3'
        >
          <input
            type='text'
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder='Dru-429 or https://github.com/Dru-429'
            className='boxy-sm flex-1 bg-[var(--cream)] px-5 py-4 text-base font-medium text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0'
          />
          <div className='flex flex-col md:flex-row gap-3 w-full'>
            <button
              type='submit'
              disabled={isLoading || !handle.trim()}
              onClick={bumpCount}
              className='boxy-sm sm:w-1/2 group inline-flex items-center justify-center gap-2 bg-[var(--nuit)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0'
            >
              {isLoading ? 'Loading...' : 'Get my wrapped'}
              {!isLoading && (
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              )}
            </button>
            <button
              type='button'
              onClick={handelReadme}
              disabled={!parseUsername(handle)}
              className='boxy-sm sm:w-1/2 group inline-flex items-center justify-center gap-2 bg-[var(--lime)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0'
            >
              <FileCode2 className='h-4 w-4' />
              Generate Readme
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  )
}
