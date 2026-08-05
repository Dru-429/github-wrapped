'use client'

import { X } from 'lucide-react'

type TagPillProps = {
  label: string
  onRemove: () => void
}

export default function TagPill ({ label, onRemove }: TagPillProps) {
  return (
    <span className='inline-flex items-center gap-1 border-2 border-ink bg-lime px-2 py-0.5 text-sm font-medium text-ink'>
      {label}
      <button
        onClick={onRemove}
        className='grid h-4 w-4 place-items-center hover:bg-ink hover:text-cream'
        aria-label={`Remove ${label}`}
      >
        <X size={10} strokeWidth={3} />
      </button>
    </span>
  )
}
