export type SectionKey = 'language' | 'about' | 'contact' | 'tools' | 'os' | 'uptime'

export type LanguageState = {
  frontend: string[]
  backend: string[]
}

export type ContactLink = {
  id: string
  name: string
  url: string
}

export type UptimeState = {
  years: string
  months: string
  days: string
}

export type ReadmeTemplate = {
  language?: LanguageState
  about?: string
  contact?: ContactLink[]
  tools?: string[]
  os?: string[]
  uptime?: UptimeState
}

export const SECTION_LIST: { key: SectionKey; label: string }[] = [
  { key: 'language', label: 'Language' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' },
  { key: 'tools', label: 'Tools' },
  { key: 'os', label: 'OS' },
  { key: 'uptime', label: 'Uptime / Age' }
]

export const FRONTEND_SUGGESTIONS = [
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

export const BACKEND_SUGGESTIONS = [
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

export const OS_OPTIONS = [
  'macOS',
  'Windows',
  'Linux (Ubuntu)',
  'Linux (Arch)',
  'Fedora',
  'NixOS'
]

export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export function uid () {
  return Math.random().toString(36).slice(2, 9)
}
