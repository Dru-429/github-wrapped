'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import TagPill from './TagPill'

type ToolsInputProps = {
  values: string[]
  onChange: (next: string[]) => void
}

export default function ToolsInput ({ values, onChange }: ToolsInputProps) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const t = draft.trim()
    if (!t || values.includes(t)) return
    onChange([...values, t])
    setDraft('')
  }

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2 boxy-xs border-ink bg-cream px-2'>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder='figma, vscode, docker…'
          className='w-full bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
        />
        <button
          onClick={add}
          className='grid h-7 w-7 place-items-center border border-ink hover:bg-lime'
          aria-label='Add tool'
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
      <div className='flex flex-wrap gap-1.5'>
        {values.length === 0 ? (
          <span className='text-xs text-muted-foreground'>no tools yet</span>
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
  )
}
