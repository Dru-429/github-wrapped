'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { QUOTE_SUGGESTIONS, cx } from './editor-state'

type QuotesProps = {
  value: string
  onChange: (next: string) => void
}

export default function Quotes({ value, onChange }: QuotesProps) {
  const [draft, setDraft] = useState('')

  const addCustom = () => {
    const t = draft.trim()
    if (!t) return
    onChange(t)
    setDraft('')
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-2 boxy-xs border-ink bg-cream px-2'>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addCustom()
            }
          }}
          placeholder='type your own quote…'
          className='w-full bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
        />
        <button
          onClick={addCustom}
          className='grid h-7 w-7 place-items-center border border-ink hover:bg-lime'
          aria-label='Add custom quote'
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>

      <div className='flex flex-col gap-2 max-h-[200px] overflow-y-auto'>
        {QUOTE_SUGGESTIONS.map(q => {
          const on = value === q
          return (
            <button
              key={q}
              type='button'
              onClick={() => onChange(on ? '' : q)}
              className={cx(
                'border-2 border-ink boxy-xs hover:bg-lime hover:text-ink px-3 py-2 text-left text-sm font-medium text-ink transition-all ease-in-out',
                on ? 'bg-lime' : 'bg-cream hover:bg-cream/70'
              )}
            >
              {q}
            </button>
          )
        })}
      </div>

      <p className='border-2 border-ink bg-lime px-3 py-4  text-xs text-ink boxy-xs'>
        selected:{' '}
        <span className='font-semibold text-ink'>{value ? (value): (`no qoute selected yet`)}</span>
      </p>

    </div>
  )
}
