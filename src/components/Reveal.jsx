import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../animations/config'

/** Scroll-triggered reveal wrapper. `as` picks the HTML tag, `variants` swaps the animation. */
export default function Reveal({ as = 'div', variants = fadeUp, delay = 0, className, children, ...rest }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
