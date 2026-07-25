import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Search, Minus } from 'lucide-react'

/* ------------------------------ Types ------------------------------ */

type SectionKey = 'language' | 'about' | 'contact' | 'tools' | 'os' | 'uptime'

type LanguageState = {
  frontend: string[]
  backend: string[]
}

type ContactLink = {
  id: string
  name: string
  url: string
}

type UptimeState = {
  years: string
  months: string
  days: string
}

export type ReadmeTemplate = {
  language?: LanguageState
  about?: string
  contact?: ContactLink[]
  tools?: string[]
  os?: string
  uptime?: UptimeState
}

/* --------------------------- Data / Config -------------------------- */

const SECTION_LIST: { key: SectionKey; label: string }[] = [
  { key: 'language', label: 'Language' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' },
  { key: 'tools', label: 'Tools' },
  { key: 'os', label: 'OS' },
  { key: 'uptime', label: 'Uptime / Age' }
]

const FRONTEND_SUGGESTIONS = [
  'React',
  'Vue',
  'Svelte',
  'Angular',
  'Next.js',
  'Astro',
  'HTML',
  'CSS',
  'Tailwind',
  'TypeScript'
]
const BACKEND_SUGGESTIONS = [
  'Node.js',
  'Express',
  'Django',
  'Flask',
  'Rails',
  'Go',
  'Rust',
  'Java',
  'Spring',
  'PostgreSQL'
]
const OS_OPTIONS = [
  'macOS',
  'Windows',
  'Linux (Ubuntu)',
  'Linux (Arch)',
  'Fedora',
  'NixOS'
]

/* --------------------------- Small helpers -------------------------- */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

function uid () {
  return Math.random().toString(36).slice(2, 9)
}

/* ------------------------- Presentational bits ---------------------- */

function SectionCard ({
  title,
  onRemove,
  children
}: {
  title: string
  onRemove: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className='boxy-sm bg-cream rounded-sm'
    >
      <div className='flex items-center justify-between border-b-2 border-ink px-3 py-2'>
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

function TagPill ({ label, onRemove }: { label: string; onRemove: () => void }) {
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

/* ------------------------- Language sub-block ----------------------- */

function LanguageGroup ({
  title,
  suggestions,
  values,
  onChange
}: {
  title: string
  suggestions: string[]
  values: string[]
  onChange: (next: string[]) => void
}) {
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
    <div className='boxy-sm bg-cream rounded-sm'>
      <div className='flex items-center justify-between border-b-2 border-ink px-3 py-2'>
        <h5 className='font-display text-base font-bold text-ink lowercase'>
          {title}
        </h5>
      </div>
      <div className='space-y-2 p-3'>
        <div className='flex items-center gap-2 border-2 border-ink bg-cream px-2'>
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
              className='grid h-6 w-6 place-items-center border-l-2 border-ink hover:bg-lime'
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
            <span className='text-xs text-muted-foreground'>
              nothing added yet
            </span>
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

/* ------------------------------ Main ------------------------------- */

export default function TemplateEditor () {
  const [active, setActive] = useState<SectionKey[]>([])
  const [template, setTemplate] = useState<ReadmeTemplate>({})

  const isActive = (k: SectionKey) => active.includes(k)

  const addSection = (k: SectionKey) => {
    if (isActive(k)) return
    setActive(a => [...a, k])
    setTemplate(t => {
      const next = { ...t }
      if (k === 'language' && !next.language)
        next.language = { frontend: [], backend: [] }
      if (k === 'about' && next.about === undefined) next.about = ''
      if (k === 'contact' && !next.contact) next.contact = []
      if (k === 'tools' && !next.tools) next.tools = []
      if (k === 'os' && !next.os) next.os = ''
      if (k === 'uptime' && !next.uptime)
        next.uptime = { years: '', months: '', days: '' }
      return next
    })
  }

  const removeSection = (k: SectionKey) => {
    setActive(a => a.filter(x => x !== k))
    setTemplate(t => {
      const next = { ...t }
      delete next[k as keyof ReadmeTemplate]
      return next
    })
  }

  const toggle = (k: SectionKey) =>
    isActive(k) ? removeSection(k) : addSection(k)

  /* --------- update helpers --------- */
  const updateLanguage = (patch: Partial<LanguageState>) =>
    setTemplate(t => ({
      ...t,
      language: { ...(t.language ?? { frontend: [], backend: [] }), ...patch }
    }))

  return (
    <div className='min-h-screen bg-background bg-grid boxy px-4 py-10'>
      <div className='mx-auto max-w-6xl'>
        {/* Top bar */}
        <div className='boxy mb-6 flex items-center justify-between bg-cream px-4 py-3'>
          <div className='flex items-center gap-3 text-ink'>
            <span className='font-display text-xl font-bold'>Edit</span>
            <span className='opacity-40'>|</span>
            <span className='text-sm text-muted-foreground'>Preview</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(JSON.stringify(template, null, 2))
            }}
            className='border-2 border-ink bg-lime px-3 py-1 text-sm font-bold uppercase tracking-wide text-ink hover:bg-mantis'
          >
            Copy
          </button>
        </div>

        <div className='grid gap-6 md:grid-cols-[280px_1fr]'>
          {/* ---------------- LEFT: section picker ---------------- */}
          <aside className='boxy h-fit bg-cream p-4'>
            <h3 className='font-display mb-3 text-xl font-bold text-ink lowercase'>
              sections
            </h3>
            <div className='flex flex-col gap-2'>
              {SECTION_LIST.map(s => {
                const on = isActive(s.key)
                return (
                  <button
                    key={s.key}
                    onClick={() => toggle(s.key)}
                    className={cx(
                      'flex items-center justify-between border-2 border-ink px-3 py-2 text-left text-sm font-semibold text-ink transition-transform hover:-translate-y-[2px]',
                      on ? 'bg-lime' : 'bg-cream hover:bg-cream/70'
                    )}
                  >
                    <span>{s.label}</span>
                    <span className='grid h-5 w-5 place-items-center border-2 border-ink bg-cream'>
                      {on ? (
                        <Minus size={12} strokeWidth={3} />
                      ) : (
                        <Plus size={12} strokeWidth={3} />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ---------------- RIGHT: editor panel ---------------- */}
          <section className='boxy min-h-[420px] bg-cream p-4'>
            {active.length === 0 ? (
              <div className='grid h-full min-h-[380px] place-items-center text-center'>
                <div>
                  <p className='font-display text-2xl font-bold text-ink lowercase'>
                    pick a section on the left
                  </p>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    Everything you add gets saved into the template object.
                  </p>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                <AnimatePresence initial={false}>
                  {active.map(k => {
                    if (k === 'language') {
                      const lang = template.language ?? {
                        frontend: [],
                        backend: []
                      }
                      return (
                        <SectionCard
                          key={k}
                          title='language'
                          onRemove={() => removeSection(k)}
                        >
                          <div className='grid gap-3 md:grid-cols-2'>
                            <LanguageGroup
                              title='frontend'
                              suggestions={FRONTEND_SUGGESTIONS}
                              values={lang.frontend}
                              onChange={v => updateLanguage({ frontend: v })}
                            />
                            <LanguageGroup
                              title='backend'
                              suggestions={BACKEND_SUGGESTIONS}
                              values={lang.backend}
                              onChange={v => updateLanguage({ backend: v })}
                            />
                          </div>
                        </SectionCard>
                      )
                    }

                    if (k === 'about') {
                      return (
                        <SectionCard
                          key={k}
                          title='about'
                          onRemove={() => removeSection(k)}
                        >
                          <textarea
                            value={template.about ?? ''}
                            onChange={e =>
                              setTemplate(t => ({
                                ...t,
                                about: e.target.value
                              }))
                            }
                            placeholder='type here…'
                            rows={5}
                            className='w-full resize-y border-2 border-ink bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground'
                          />
                        </SectionCard>
                      )
                    }

                    if (k === 'contact') {
                      const list = template.contact ?? []
                      const update = (next: ContactLink[]) =>
                        setTemplate(t => ({ ...t, contact: next }))
                      return (
                        <SectionCard
                          key={k}
                          title='contact'
                          onRemove={() => removeSection(k)}
                        >
                          <div className='space-y-2'>
                            {list.map((c, i) => (
                              <div
                                key={c.id}
                                className='flex flex-wrap items-center gap-2'
                              >
                                <input
                                  value={c.name}
                                  onChange={e => {
                                    const copy = [...list]
                                    copy[i] = { ...c, name: e.target.value }
                                    update(copy)
                                  }}
                                  placeholder='X'
                                  className='w-24 border-2 border-ink bg-cream px-2 py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
                                />
                                <input
                                  value={c.url}
                                  onChange={e => {
                                    const copy = [...list]
                                    copy[i] = { ...c, url: e.target.value }
                                    update(copy)
                                  }}
                                  placeholder='https://x.com/10xdhruv'
                                  className='min-w-0 flex-1 border-2 border-ink bg-cream px-2 py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
                                />
                                <button
                                  onClick={() =>
                                    update(list.filter(x => x.id !== c.id))
                                  }
                                  className='grid h-8 w-8 place-items-center border-2 border-ink bg-cream text-ink hover:bg-lime'
                                  aria-label='Remove contact'
                                >
                                  <X size={14} strokeWidth={3} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() =>
                                update([
                                  ...list,
                                  { id: uid(), name: '', url: '' }
                                ])
                              }
                              className='inline-flex items-center gap-1 border-2 border-ink bg-lime px-3 py-1.5 text-sm font-bold text-ink hover:bg-mantis'
                            >
                              <Plus size={14} strokeWidth={3} /> add social
                            </button>
                          </div>
                        </SectionCard>
                      )
                    }

                    if (k === 'tools') {
                      const list = template.tools ?? []
                      const update = (next: string[]) =>
                        setTemplate(t => ({ ...t, tools: next }))
                      return (
                        <SectionCard
                          key={k}
                          title='tools'
                          onRemove={() => removeSection(k)}
                        >
                          <ToolsInput values={list} onChange={update} />
                        </SectionCard>
                      )
                    }

                    if (k === 'os') {
                      return (
                        <SectionCard
                          key={k}
                          title='os'
                          onRemove={() => removeSection(k)}
                        >
                          <div className='flex flex-wrap gap-2'>
                            {OS_OPTIONS.map(o => {
                              const on = template.os === o
                              return (
                                <button
                                  key={o}
                                  onClick={() =>
                                    setTemplate(t => ({
                                      ...t,
                                      os: on ? '' : o
                                    }))
                                  }
                                  className={cx(
                                    'border-2 border-ink px-3 py-1.5 text-sm font-semibold text-ink',
                                    on
                                      ? 'bg-lime'
                                      : 'bg-cream hover:bg-cream/70'
                                  )}
                                >
                                  {o}
                                </button>
                              )
                            })}
                          </div>
                          <input
                            value={template.os ?? ''}
                            onChange={e =>
                              setTemplate(t => ({ ...t, os: e.target.value }))
                            }
                            placeholder='or type your own…'
                            className='mt-3 w-full border-2 border-ink bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground'
                          />
                        </SectionCard>
                      )
                    }

                    if (k === 'uptime') {
                      const u = template.uptime ?? {
                        years: '',
                        months: '',
                        days: ''
                      }
                      const upd = (patch: Partial<UptimeState>) =>
                        setTemplate(t => ({ ...t, uptime: { ...u, ...patch } }))
                      return (
                        <SectionCard
                          key={k}
                          title='uptime / age'
                          onRemove={() => removeSection(k)}
                        >
                          <div className='grid grid-cols-3 gap-2'>
                            {[
                              { key: 'years', label: 'years' },
                              { key: 'months', label: 'months' },
                              { key: 'days', label: 'days' }
                            ].map(f => (
                              <label
                                key={f.key}
                                className='flex flex-col gap-1'
                              >
                                <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                                  {f.label}
                                </span>
                                <input
                                  inputMode='numeric'
                                  value={(u as any)[f.key]}
                                  onChange={e =>
                                    upd({
                                      [f.key]: e.target.value.replace(/\D/g, '')
                                    } as Partial<UptimeState>)
                                  }
                                  placeholder='0'
                                  className='border-2 border-ink bg-cream px-3 py-2 text-center text-lg font-bold text-ink outline-none'
                                />
                              </label>
                            ))}
                          </div>
                          <p className='mt-2 text-xs text-muted-foreground'>
                            saved as: {u.years || 0} yr, {u.months || 0} mons,{' '}
                            {u.days || 0} days
                          </p>
                        </SectionCard>
                      )
                    }

                    return null
                  })}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>

        {/* Debug: current template object */}
        <details className='boxy mt-6 bg-cream p-4'>
          <summary className='cursor-pointer font-display text-lg font-bold text-ink lowercase'>
            template object
          </summary>
          <pre className='mt-3 overflow-auto border-2 border-ink bg-cream p-3 text-xs text-ink'>
            {JSON.stringify(template, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  )
}

/* ------------------------ Tools free-input list ---------------------- */

function ToolsInput ({
  values,
  onChange
}: {
  values: string[]
  onChange: (next: string[]) => void
}) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const t = draft.trim()
    if (!t || values.includes(t)) return
    onChange([...values, t])
    setDraft('')
  }
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2 border-2 border-ink bg-cream px-2'>
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
          className='grid h-7 w-7 place-items-center border-l-2 border-ink hover:bg-lime'
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
