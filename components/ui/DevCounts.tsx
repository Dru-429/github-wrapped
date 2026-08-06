"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

/**
 * Standalone helper function to increment the count in the database
 * and broadcast an event so all <DevCounts /> components on the page update.
 */
export async function bumpCount() {
  try {
    const res = await fetch('/api/count', { method: 'POST' })
    const data = await res.json()
    if (typeof window !== 'undefined' && data.count != null) {
      window.dispatchEvent(new CustomEvent('devcounts-updated', { detail: data.count }))
    }
    return data.count
  } catch (err) {
    console.error('Failed to bump analytics tracker:', err)
    return null
  }
}

type DevCountsProps = {
  /** Label shown after the number, e.g. "devs flexed" */
  text: string
  /** Optional custom onClick handler */
  onClick?: () => void
}

export default function DevCounts({ text, onClick }: DevCountsProps) {
  const [totalWrapped, setTotalWrapped] = useState<number | null>(null)

  /** Read the current count from the DB */
  const fetchCurrentCount = useCallback(async () => {
    try {
      const res = await fetch('/api/count')
      const data = await res.json()
      setTotalWrapped(data.count ?? 0)
    } catch (err) {
      console.error('Error reading data metric tracker:', err)
    }
  }, [])

  /** Handle click on the badge */
  const handleBadgeClick = useCallback(async () => {
    if (onClick) {
      onClick()
    } else {
      await bumpCount()
    }
  }, [onClick])

  useEffect(() => {
    fetchCurrentCount()

    const handleCustomUpdate = (e: Event) => {
      const customEv = e as CustomEvent
      if (customEv.detail != null) {
        setTotalWrapped(customEv.detail)
      } else {
        fetchCurrentCount()
      }
    }

    window.addEventListener('devcounts-updated', handleCustomUpdate)
    return () => {
      window.removeEventListener('devcounts-updated', handleCustomUpdate)
    }
  }, [fetchCurrentCount])

  return (
    <motion.div
      key={totalWrapped}
      initial={{ scale: 0.92, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className='relative boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--cream)] cursor-pointer select-none'
      onClick={handleBadgeClick}
      title="Click to bump the counter!"
    >
      <div className='shadow-xl/30 shadow-blue-600 w-full h-full absolute rounded-xl -left-1' />
      <Users className='h-3.5 w-3.5' />
      <span>
        <span className='font-display text-sm inline-flex items-center justify-center min-w-[28px]'>
          {totalWrapped !== null ? (
            totalWrapped.toLocaleString()
          ) : (
            <span
              className="inline-flex items-center gap-1"
              style={{ height: "14px", lineHeight: "10px" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [2, -4, 2] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="inline-block text-sm font-black"
                >
                  _
                </motion.span>
              ))}
            </span>
          )}
        </span>{' '}
        {text}
      </span>
    </motion.div>
  )
}