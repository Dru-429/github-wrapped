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
  "/banners/spidy.jpg",
  "/banners/itachi.jpg",
  "/banners/solar.jpg",
  "/banners/lunar.jpg",
  "/banners/marrrk.png",
  "/banners/elon.png",
  "/banners/mark.png",
  "/banners/tempImpala.jpg",
  "/banners/dino.jpg",
  "/banners/cat.jpg",
  "/banners/gt3_rs.png",
  "/banners/ford_gt40.png",
  "/banners/gojo.jpg",
  "/banners/zoro.jpg",
  "/banners/wave.jpg",
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
