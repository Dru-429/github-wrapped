export type SectionKey = 'banner' | 'language' | 'about' | 'bio' | 'contact' | 'tools' | 'os' | 'uptime' | 'quote' | 'stats'

export type BannerPosition = 'up' | 'down'

export type BannerState = {
  url: string
  position: BannerPosition
}

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

export type GitHubStatsState = {
  repos?: number | string
  contributed?: number | string
  stars?: number | string
  commits?: number | string
  followers?: number | string
  linesOfCode?: number | string
  additions?: number | string
  deletions?: number | string
}

export type ReadmeTemplate = {
  banner?: BannerState
  image?: string
  language?: LanguageState
  about?: string
  bio?: string
  contact?: ContactLink[]
  tools?: string[]
  os?: string[]
  uptime?: UptimeState
  quote?: string
  stats?: GitHubStatsState
}

export const SECTION_LIST: { key: SectionKey; label: string }[] = [
  { key: 'banner', label: 'Banner' },
  { key: 'language', label: 'Language' },
  { key: 'about', label: 'About' },
  { key: 'bio', label: 'Bio' },
  { key: 'contact', label: 'Contact' },
  { key: 'tools', label: 'Tools' },
  { key: 'os', label: 'OS' },
  { key: 'uptime', label: 'Uptime / Age' },
  { key: 'quote', label: 'Quote' },
  { key: 'stats', label: 'GitHub Stats' }
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
  'TypeScript',
  "javascript",
  "typescript",
  "html",
  "css",
  "vue",
  "react",
  "svelte",
  "angular",
  "tailwind",
  "scss",
  "astro",
]

export const BANNER_URL = [
  "https://i.pinimg.com/1200x/ab/7f/0c/ab7f0caa29a41fd2273de73aa3a39d27.jpg", 
  "https://i.pinimg.com/1200x/77/d7/57/77d757a71e22afd0d245a892ec9fcffd.jpg",
  "https://i.pinimg.com/1200x/57/6f/bf/576fbf7018a589fc27b3c9924a8751ac.jpg",
  "https://i.pinimg.com/1200x/86/f5/52/86f5528f2dca3e16c699267f81424e05.jpg", 
  "https://i.pinimg.com/1200x/1c/b9/fc/1cb9fc8e96f4e608125724ff91a99195.jpg", 
  "https://i.pinimg.com/1200x/74/c7/29/74c72923fc30f7af4239ba514d46a571.jpg",
  "https://i.pinimg.com/1200x/c2/ac/a2/c2aca2856a9d35d6010976f8b33393c0.jpg",
  "https://i.pinimg.com/1200x/a0/2f/0f/a02f0fc3e627efb364b2272a8dc94405.jpg",
  "https://i.pinimg.com/1200x/ee/b2/62/eeb262f87537f090a7c62d1d31261eb6.jpg",
  "https://i.pinimg.com/1200x/a1/25/b9/a125b94f551269f6b8b002ca9e1e065a.jpg",
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
  'PostgreSQL',
  "python",
  "go",
  "rust",
  "java",
  "c++",
  "c#",
  "ruby",
  "php",
  "node.js",
  "express",
  "django",
  "postgresql",
  "shell",
  "docker",

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

export function uid() {
  return Math.random().toString(36).slice(2, 9)
}
