'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Minus } from 'lucide-react'

type SectionCardProps = {
  title: string
  onRemove: () => void
  children: ReactNode
}

export default function SectionCard ({ title, onRemove, children }: SectionCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='boxy-xs rounded-sm bg-cream'
    >
      <div className='flex items-center justify-between border-b-1 border-ink px-3 py-2'>
        <h4 className='font-display text-lg font-bold text-ink lowercase'>
          {title}
        </h4>
        <button
          onClick={onRemove}
          className='grid h-6 w-6 place-items-center border-2 border-ink bg-cream text-ink hover:bg-lime'
          aria-label={`Remove ${title}`}
        >
          <Minus size={14} strokeWidth={3} />
        </button>
      </div>
      <div className='p-3'>{children}</div>
    </motion.div>
  )
}
