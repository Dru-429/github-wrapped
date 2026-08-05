'use client'

import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import TagPill from '../ui/TagPill'

type TlanguageGroupProps = {
  title: string
  suggestions: string[]
  values: string[]
  onChange: (next: string[]) => void
}

export default function TlanguageGroup ({ title, suggestions, values, onChange }: TlanguageGroupProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return suggestions.filter(
      s => s.toLowerCase().includes(q) && !values.includes(s)
    )
  }, [query, suggestions, values])

  const add = (v: string) => {
    const t = v.trim()
    if (!t || values.includes(t)) return
    onChange([...values, t])
    setQuery('')
  }

  return (
    <div className='boxy-xs rounded-sm bg-cream'>
      <div className='flex items-center justify-between border-b-1 border-ink px-3 py-2'>
        <h5 className='font-display text-base font-bold text-ink lowercase'>
          {title}
        </h5>
      </div>
      <div className='space-y-2 p-3'>
        <div className='flex items-center gap-2 border-1 border-ink bg-cream px-2'>
          <Search size={14} className='text-ink' />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                add(query)
              }
            }}
            placeholder='search'
            className='w-full bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
          />
          {query && (
            <button
              onClick={() => add(query)}
              className='grid h-6 w-6 place-items-center border border-ink hover:bg-lime'
              aria-label='Add'
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          )}
        </div>

        {filtered.length > 0 && (
          <div className='flex flex-wrap gap-1.5 border-2 border-dashed border-ink/40 p-2'>
            {filtered.map(s => (
              <button
                key={s}
                onClick={() => add(s)}
                className='inline-flex items-center gap-1 border-2 border-ink bg-cream px-2 py-0.5 text-xs font-medium text-ink hover:bg-lime'
              >
                {s} <Plus size={10} strokeWidth={3} />
              </button>
            ))}
          </div>
        )}

        <div className='flex flex-wrap gap-1.5'>
          {values.length === 0 ? (
            <span className='text-xs text-muted-foreground'>nothing added yet</span>
          ) : (
            values.map(v => (
              <TagPill
                key={v}
                label={v}
                onRemove={() => onChange(values.filter(x => x !== v))}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
