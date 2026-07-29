export type SectionKey = 'language' | 'about' | 'bio' | 'contact' | 'tools' | 'os' | 'uptime' | 'quote'

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
  image?: string
  language?: LanguageState
  about?: string
  bio?: string
  contact?: ContactLink[]
  tools?: string[]
  os?: string[]
  uptime?: UptimeState
  quote?: string
}

export const SECTION_LIST: { key: SectionKey; label: string }[] = [
  { key: 'language', label: 'Language' },
  { key: 'about', label: 'About' },
  { key: 'bio', label: 'Bio' },
  { key: 'contact', label: 'Contact' },
  { key: 'tools', label: 'Tools' },
  { key: 'os', label: 'OS' },
  { key: 'uptime', label: 'Uptime / Age' },
  { key: 'quote', label: 'Quote' }
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

export const QUOTE_SUGGESTIONS = [
  'Talk is cheap. Show me the code. - Linus Torvalds',
  'Programs must be written for people to read, and only incidentally for machines to execute. - Abelson & Sussman',
  'First, do it. Then, do it right. Then, do it better. - Addy Osmani',
  'Simplicity is the soul of efficiency. - Austin Freeman',
  'Make it work, make it right, make it fast. - Kent Beck',
  "It's not a bug – it's an undocumented feature. - Anonymous",
  'Before software can be reusable it first has to be usable. - Ralph Johnson',
  'Deleted code is debugged code. - Jeff Sickel',
  'There are two ways to write error-free programs; only the third one works. - Alan J. Perlis',
  'Fix the cause, not the symptom. - Steve Maguire'
]

export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export function uid () {
  return Math.random().toString(36).slice(2, 9)
}
