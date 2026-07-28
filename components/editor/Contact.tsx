'use client'

import { Plus, X } from 'lucide-react'
import type { ContactLink } from './editor-state'

type ContactProps = {
  values: ContactLink[]
  onChange: (next: ContactLink[]) => void
}

export default function Contact ({ values, onChange }: ContactProps) {
  return (
    <div className='space-y-2'>
      {values.map((c, i) => (
        <div key={c.id} className='flex flex-wrap items-center gap-2'>
          <input
            value={c.name}
            onChange={e => {
              const copy = [...values]
              copy[i] = { ...c, name: e.target.value }
              onChange(copy)
            }}
            placeholder='Name'
            className='w-24 boxy-xs border-ink bg-cream px-2 py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
          />
          <input
            value={c.url}
            onChange={e => {
              const copy = [...values]
              copy[i] = { ...c, url: e.target.value }
              onChange(copy)
            }}
            placeholder='https://x.com/10xdhruv'
            className='min-w-0 flex-1 boxy-xs bg-cream px-2 py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
          />
          <button
            onClick={() => onChange(values.filter(x => x.id !== c.id))}
            className='grid h-8 w-8 place-items-center boxy-xs bg-cream text-ink hover:bg-lime'
            aria-label='Remove contact'
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...values, { id: Math.random().toString(36).slice(2, 9), name: '', url: '' }])}
        className='inline-flex items-center gap-1 border-2 border-ink bg-lime px-3 py-1.5 text-sm font-bold text-ink hover:bg-mantis'
      >
        <Plus size={14} strokeWidth={3} /> add social
      </button>
    </div>
  )
}
