'use client'

import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionCard from './ui/SectionCard'
import TlanguageGroup from './sections/languageGroup'
import ToolsInput from './sections/ToolsInput'
import Contact from './sections/Contact'
import TagPill from './ui/TagPill'
import Preview from './preview'
import Quotes from './sections/Quotes'
import BioInput from './sections/BioInput'
import GithubStatsInput from './sections/GithubStatsInput'
import {
  BACKEND_SUGGESTIONS,
  BANNER_URL,
  FRONTEND_SUGGESTIONS,
  OS_OPTIONS,
  cx,
  SECTION_LIST,
  type ContactLink,
  type LanguageState,
  type ReadmeTemplate,
  type SectionKey,
  type UptimeState
} from './editor-state'
import BannerInput from './sections/Banner'

// Default fallback parameters if props are omitted
const HARDCODED_USERNAME = 'dru-429'
const HARDCODED_TEMPLATE_NO = 2

type Tab = 'edit' | 'preview'

type TemplateEditorProps = {
  template: ReadmeTemplate
  setTemplateAction: Dispatch<SetStateAction<ReadmeTemplate>>
  username?: string
  templateNo?: number
}

export default function TemplateEditor({
  template,
  setTemplateAction,
  username = HARDCODED_USERNAME,
  templateNo = HARDCODED_TEMPLATE_NO
}: TemplateEditorProps) {
  const [tab, setTab] = useState<Tab>('edit')
  const [active, setActive] = useState<SectionKey[]>([])

  // Automatically activate section cards when template object receives data (e.g. via fetch)
  useEffect(() => {
    if (!template) return
    const keysToActivate: SectionKey[] = []

    if (template.banner && template.banner.url) {
      keysToActivate.push('banner')
    }
    if (template.language && (template.language.frontend?.length || template.language.backend?.length)) {
      keysToActivate.push('language')
    }
    if (template.about !== undefined && template.about.trim() !== '') {
      keysToActivate.push('about')
    }
    if (template.bio !== undefined && template.bio.trim() !== '') {
      keysToActivate.push('bio')
    }
    if (template.contact && template.contact.length > 0) {
      keysToActivate.push('contact')
    }
    if (template.tools && template.tools.length > 0) {
      keysToActivate.push('tools')
    }
    if (template.os && template.os.length > 0) {
      keysToActivate.push('os')
    }
    if (template.uptime && (template.uptime.years || template.uptime.months || template.uptime.days)) {
      keysToActivate.push('uptime')
    }
    if (template.quote !== undefined && template.quote.trim() !== '') {
      keysToActivate.push('quote')
    }
    if (template.stats && Object.keys(template.stats).length > 0) {
      keysToActivate.push('stats')
    }

    if (keysToActivate.length > 0) {
      setActive(prev => Array.from(new Set([...prev, ...keysToActivate])))
    }
  }, [template])

  const isActive = (k: SectionKey) => active.includes(k)

  const addSection = (k: SectionKey) => {
    if (isActive(k)) return
    setActive(a => [...a, k])
    setTemplateAction(t => {
      const next = { ...t }
      if (k === 'banner' && !next.banner)
        next.banner = { url: BANNER_URL[0], position: 'up' }
      if (k === 'language' && !next.language)
        next.language = { frontend: [], backend: [] }
      if (k === 'about' && next.about === undefined) next.about = ''
      if (k === 'bio' && next.bio === undefined) next.bio = ''
      if (k === 'contact' && !next.contact) next.contact = []
      if (k === 'tools' && !next.tools) next.tools = []
      if (k === 'os' && !next.os) next.os = []
      if (k === 'uptime' && !next.uptime)
        next.uptime = { years: '', months: '', days: '' }
      if (k === 'quote' && next.quote === undefined) next.quote = ''
      if (k === 'stats' && !next.stats)
        next.stats = {
          repos: 95,
          contributed: 133,
          stars: 342,
          commits: '2,116',
          followers: '196',
          linesOfCode: '446,276',
          additions: '523,178',
          deletions: '76,902'
        }
      return next
    })
  }

  const removeSection = (k: SectionKey) => {
    setActive(a => a.filter(x => x !== k))
    setTemplateAction(t => {
      const next = { ...t }
      delete next[k as keyof typeof next]
      return next
    })
  }

  const toggle = (k: SectionKey) =>
    isActive(k) ? removeSection(k) : addSection(k)

  const updateLanguage = (patch: Partial<LanguageState>) =>
    setTemplateAction(t => ({
      ...t,
      language: { ...(t.language ?? { frontend: [], backend: [] }), ...patch }
    }))

  return (
    <div className='w-full boxy bg-cream p-4 md:p-6'>
      <div className='mx-auto max-w-6xl'>
        <div className='boxy mb-6 flex items-center justify-between bg-cream px-4 py-3'>
          <div className='flex items-center gap-3 text-ink'>
            <button
              type='button'
              onClick={() => setTab('edit')}
              className={cx(
                'font-display text-xl font-bold transition-opacity',
                tab === 'edit' ? 'text-ink' : 'text-muted-foreground opacity-50 hover:opacity-80'
              )}
            >
              Edit
            </button>
            <span className='opacity-40'>|</span>
            <button
              type='button'
              onClick={() => setTab('preview')}
              className={cx(
                'font-display text-xl font-bold transition-opacity',
                tab === 'preview' ? 'text-ink' : 'text-muted-foreground opacity-50 hover:opacity-80'
              )}
            >
              Preview
            </button>
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

        {tab === 'preview' ? (
          <div className='boxy min-h-[520px] bg-cream p-4'>
            <Preview
              templateObject={template}
              templateNo={templateNo}
              handle={username}
              name={username}
              repoName='README.md'
            />
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-[280px_1fr]'>
            <aside className='boxy h-fit md:min-h-[520px] bg-cream p-4'>
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

            <section className='boxy min-h-[520px] bg-cream p-4'>
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
                      if (k === 'banner') {
                        return (
                          <SectionCard
                            key={k}
                            title='banner'
                            onRemove={() => removeSection(k)}
                          >
                            <BannerInput
                              value={template.banner}
                              onChange={next =>
                                setTemplateAction(t => ({
                                  ...t,
                                  banner: next
                                }))
                              }
                            />
                          </SectionCard>
                        )
                      } 

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
                              <TlanguageGroup
                                title='frontend'
                                suggestions={FRONTEND_SUGGESTIONS}
                                values={lang.frontend}
                                onChange={v => updateLanguage({ frontend: v })}
                              />
                              <TlanguageGroup
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
                                setTemplateAction(t => ({
                                  ...t,
                                  about: e.target.value
                                }))
                              }
                              placeholder='type here…'
                              rows={5}
                              className='w-full resize-y boxy-xs border-ink bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground'
                            />
                          </SectionCard>
                        )
                      }

                      if (k === 'bio') {
                        return (
                          <SectionCard
                            key={k}
                            title='bio'
                            onRemove={() => removeSection(k)}
                          >
                            <BioInput
                              value={template.bio ?? ''}
                              onChange={v =>
                                setTemplateAction(t => ({
                                  ...t,
                                  bio: v
                                }))
                              }
                            />
                          </SectionCard>
                        )
                      }

                      if (k === 'contact') {
                        const list = template.contact ?? []
                        const update = (next: ContactLink[]) =>
                          setTemplateAction(t => ({ ...t, contact: next }))
                        return (
                          <SectionCard
                            key={k}
                            title='contact'
                            onRemove={() => removeSection(k)}
                          >
                            <Contact values={list} onChange={update} />
                          </SectionCard>
                        )
                      }

                      if (k === 'tools') {
                        const list = template.tools ?? []
                        const update = (next: string[]) =>
                          setTemplateAction(t => ({ ...t, tools: next }))
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
                        const list = template.os ?? []
                        const toggle = (o: string) =>
                          setTemplateAction(t => {
                            const current = t.os ?? []
                            return {
                              ...t,
                              os: current.includes(o)
                                ? current.filter(x => x !== o)
                                : [...current, o]
                            }
                          })
                        const addCustom = (v: string) => {
                          const value = v.trim()
                          if (!value) return
                          setTemplateAction(s => {
                            const current = s.os ?? []
                            if (current.includes(value)) return s
                            return { ...s, os: [...current, value] }
                          })
                        }
                        return (
                          <SectionCard
                            key={k}
                            title='os'
                            onRemove={() => removeSection(k)}
                          >
                            <div className='my-3 flex items-center gap-2 border-2 border-ink bg-cream px-2'>
                              <input
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                    addCustom((e.target as HTMLInputElement).value)
                                      ; (e.target as HTMLInputElement).value = ''
                                  }
                                }}
                                placeholder='type your own'
                                className='w-full bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted-foreground'
                              />
                              <button
                                onClick={e => {
                                  const input =
                                    e.currentTarget.parentElement?.querySelector(
                                      'input'
                                    ) as HTMLInputElement
                                  addCustom(input.value)
                                  input.value = ''
                                }}
                                className='grid h-7 w-7 place-items-center border-l-2 border-ink hover:bg-lime'
                                aria-label='Add custom OS'
                              >
                                <Plus size={14} strokeWidth={3} />
                              </button>
                            </div>

                            <div className='flex flex-wrap gap-2'>
                              {OS_OPTIONS.map(o => {
                                const on = list.includes(o)
                                return (
                                  <button
                                    key={o}
                                    onClick={() => toggle(o)}
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

                            <div className='mt-2 flex flex-wrap gap-1.5'>
                              {list.length === 0 ? (
                                <span className='text-xs text-muted-foreground'>
                                  no OS selected yet
                                </span>
                              ) : (
                                list.map(o => (
                                  <TagPill
                                    key={o}
                                    label={o}
                                    onRemove={() => toggle(o)}
                                  />
                                ))
                              )}
                            </div>
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
                          setTemplateAction(t => ({ ...t, uptime: { ...u, ...patch } }))
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
                                    value={(u as Record<string, string>)[f.key]}
                                    onChange={e =>
                                      upd({
                                        [f.key]: e.target.value.replace(/\D/g, '')
                                      } as Partial<UptimeState>)
                                    }
                                    placeholder='0'
                                    className='border border-ink bg-cream px-3 py-2 text-center text-lg font-bold text-ink outline-none'
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

                      if (k === 'quote') {
                        return (
                          <SectionCard
                            key={k}
                            title='quote'
                            onRemove={() => removeSection(k)}
                          >
                            <Quotes
                              value={template.quote ?? ''}
                              onChange={next =>
                                setTemplateAction(t => ({ ...t, quote: next }))
                              }
                            />
                          </SectionCard>
                        )
                      }

                      if (k === 'stats') {
                        return (
                          <SectionCard
                            key={k}
                            title='github stats'
                            onRemove={() => removeSection(k)}
                          >
                            <GithubStatsInput
                              value={template.stats ?? {}}
                              onChange={next =>
                                setTemplateAction(t => ({ ...t, stats: next }))
                              }
                              username={username}
                            />
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
        )}

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
