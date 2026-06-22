'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { photos } from '@/components/landing_ui/data'

/* Gallery                                         */
export default function Gallery() {
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
