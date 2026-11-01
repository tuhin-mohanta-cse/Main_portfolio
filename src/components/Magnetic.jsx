import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useFinePointer from '../hooks/useFinePointer'

/** Wrap a button/link so it gently follows the cursor when nearby. */
export default function Magnetic({ strength = 0.3, className = '', children }) {
  const fine = useFinePointer()
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  if (!fine) return <span className={`magnetic ${className}`}>{children}</span>

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}
