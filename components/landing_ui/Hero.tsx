'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Users,
} from 'lucide-react'


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

export default function Hero() {
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
