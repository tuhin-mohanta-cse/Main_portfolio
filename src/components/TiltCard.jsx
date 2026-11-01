import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { springTilt } from '../animations/config'
import useFinePointer from '../hooks/useFinePointer'

/**
 * 3D tilt card: rotates toward the pointer and paints a soft light "glare".
 * Falls back to a plain div on touch devices; framer-motion disables it for reduced-motion users.
 */
export default function TiltCard({ as = 'div', strength = 8, glare = true, className = '', children, style, ...rest }) {
  const fine = useFinePointer()
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), springTilt)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [strength, -strength]), springTilt)
  const Tag = motion[as] || motion.div

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    px.set(x - 0.5)
    py.set(y - 0.5)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  if (!fine) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={`${className} tilt`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      {glare && <span className="tilt__glare" aria-hidden="true" />}
    </Tag>
  )
}
