import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../animations/config'

/** Counting preloader (kept from the original portfolio), now with a staggered wordmark. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const total = reduce ? 350 : 1500
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => done.current?.(), 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const letters = 'TUHIN MOHANTA.'.split('')

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.77, 0, 0.18, 1] } }}
    >
      <div className="preloader__word" aria-hidden="true">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="preloader__char"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05 * i, ease }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </div>
      <div className="preloader__bar" aria-hidden="true">
        <span style={{ width: `${count}%` }} />
      </div>
      <div className="preloader__count" aria-hidden="true">
        {count}%
      </div>
    </motion.div>
  )
}
