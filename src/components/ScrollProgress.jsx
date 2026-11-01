import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin orange read-progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
