"use client"

import { BANNER_URL, cx, type BannerState } from "../editor-state"

type BannerInputProps = {
  value?: BannerState
  onChange: (next: BannerState) => void
}

export default function BannerInput({ value, onChange }: BannerInputProps) {
  const currentBanner = value ?? { url: BANNER_URL[0], position: 'up' }

  return (
    <div className='flex flex-col gap-5'>
      {/* Select position (up or down) */}
      <div>
        <label className='font-display mb-2 block text-xs font-bold uppercase tracking-wider text-ink'>
          Position (Select Up or Down)
        </label>
        <div className='grid grid-cols-2 gap-3'>
          {(['up', 'down'] as const).map(pos => {
            const selected = currentBanner.position === pos
            return (
              <button
                key={pos}
                type='button'
                onClick={() =>
                  onChange({
                    ...currentBanner,
                    position: pos
                  })
                }
                className={cx(
                  'flex items-center justify-center gap-2 border-2 border-ink px-4 py-2.5 font-display text-sm font-bold uppercase transition-all',
                  selected
                    ? 'bg-lime text-ink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-cream text-muted-foreground hover:bg-cream/70'
                )}
              >
                <span>{pos === 'up' ? '▲ Up (Top)' : '▼ Down (Bottom)'}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Preview Section */}
      <div>
        <label className='font-display mb-2 block text-xs font-bold uppercase tracking-wider text-ink'>
          Banner Preview ({currentBanner.position === 'up' ? 'Top' : 'Bottom'})
        </label>
        <div className='relative w-full overflow-hidden border-2 border-ink bg-ink p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'>
          <img
            src={currentBanner.url}
            alt='Selected Banner Preview'
            className='h-36 md:h-40 w-full object-cover border border-ink'
          />
        </div>
      </div>

      {/* Select Banner Image */}
      <div>
        <label className='font-display mb-2 block text-xs font-bold uppercase tracking-wider text-ink'>
          Select Banner Image
        </label>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[320px] overflow-y-auto p-2 border-2 border-ink bg-cream'>
          {BANNER_URL.map((url, i) => {
            const selected = currentBanner.url === url
            return (
              <button
                key={i}
                type='button'
                onClick={() =>
                  onChange({
                    ...currentBanner,
                    url
                  })
                }
                className={cx(
                  'group relative aspect-video w-full overflow-hidden border-2 border-ink transition-transform hover:scale-[1.03]',
                  selected
                    ? 'ring-4 ring-lime ring-offset-1 border-lime bg-lime'
                    : 'opacity-80 hover:opacity-100'
                )}
              >
                <img
                  src={url}
                  alt={`Banner ${i + 1}`}
                  className='h-full w-full object-fill'
                />
                {selected && (
                  <span className='absolute top-1 right-1 border border-ink bg-lime px-1.5 py-0.5 text-[10px] font-bold text-ink shadow-sm'>
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}