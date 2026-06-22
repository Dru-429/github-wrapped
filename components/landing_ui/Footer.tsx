/* Footer                                                             */
'use client'
import {
  Github,
  Linkedin,
  Twitter,
  Heart
} from 'lucide-react'


export default function Footer() {
  return (
    <footer
      id="footer"
      className='boxy mt-20 p-4 md:p-5 relative overflow-hidden'
    >
      <div
        className='relative z-10 flex flex-col gap-12 p-8 '
        style={{
          backgroundImage: `url('/assets/dino_bg_dark.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top Section */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-14'>
          <div className='flex flex-col gap-6'>
            <span className='boxy-sm px-5 py-2 bg-zinc-100 font-display text-2xl md:text-5xl font-black italic text-[var(--nuit)] flex items-center gap-3'>
              <span className='text-xl md:text-3xl px-2 place-items-center border-2 border-ink bg-[var(--lime)] font-display font-black'>
                G
              </span>
              Github Wrapped
            </span>
            <p className='max-w-md text-zinc-100 font-bold text-lg leading-relaxed'>
              Open source. Built for developers to flex.
            </p>
          </div>

          <div className='flex flex-wrap gap-4'>
            {[
              {
                label: 'GitHub',
                href: 'https://github.com/Dru-429/github-wrapped',
                color: 'bg-zinc-900',
                icon: <Github className='h-4 w-4' />
              },
              {
                label: 'Twitter',
                href: 'https://x.com/10xdhruv',
                color: 'bg-blue-800',
                icon: <Twitter className='h-4 w-4' />
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/dhruvsahoo',
                color: 'bg-blue-500',
                icon: <Linkedin className='h-4 w-4' />
              }
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex gap-2 boxy-sm ${link.color} text-white px-6 py-3 font-black text-sm uppercase tracking-wider hover:-translate-y-1 transition-transform border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]`}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className='h-[5px] w-full bg-none' />
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-black uppercase tracking-widest text-zinc-700 w-full pt-5 border-t-2 border-black/10'>
        <p>© 2026 Github Wrapped. No rights reserved. (it's open source, bruhh)</p>
        <div className='flex items-center gap-3'>
          <span>Built with</span>
          <div className='boxy-sm bg-[var(--deep-green)] p-2 rotate-6 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]'>
            <Heart className='w-5 h-5 text-white fill-current' />
          </div>
        </div>
      </div>

    </footer>
  )
}
