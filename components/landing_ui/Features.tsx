'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { features } from '@/components/landing_ui/data' 
import Gallery from './Gallery';
import Faq from './Faq';
import Reviews from './Reviews';

/* Features                                                           */
const featureItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
  }
}

export default function Features() {
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

      <div className=''>
        <Reviews />
      </div>
      <div className='mt-20'>
        <Faq />
      </div>
    </section>
  )
}
