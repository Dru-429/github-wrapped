import { motion } from 'framer-motion'
import {
  Github,
} from 'lucide-react'

/* Navbar                                                             */
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#footer' },
  { label: 'FAQ', href: '#faq' }
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='boxy flex items-center justify-between px-4 py-3 md:px-6 md:py-4'
    >
      <a href='#' className='flex items-center gap-2'>
        <span className='grid h-8 w-8 place-items-center border-2 border-ink bg-[var(--lime)] font-display text-lg font-black'>
          G
        </span>
        <span className='font-display text-xl font-bold tracking-tight'>
          Github Wrapped
        </span>
      </a>

      <div className='hidden items-center gap-8 md:flex'>
        {navLinks.map(l => (
          <a
            key={l.label}
            href={l.href}
            className='relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-foreground after:transition-all hover:after:w-full'
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href='https://github.com/Dru-429/github-wrapped'
        className='boxy-sm group inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--cream)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 md:px-4 md:text-sm'
      >
        <Github className='h-4 w-4' />
        <span>Github</span>
      </a>
    </motion.nav>
  )
}
