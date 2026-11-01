import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/** Counts up to `value` the first time it scrolls into view. */
export default function Counter({ value, decimals = 0, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
