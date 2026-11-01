import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { stagger, wordMask, fadeUp, viewportOnce } from '../animations/config'

/** Eyebrow + headline where each word slides up from behind a mask. */
export default function SectionHeading({ id, eyebrow, title, align = 'left', as: Heading = 'h2', className = '' }) {
  const words = title.split(' ')
  return (
    <div className={`section-heading section-heading--${align} ${className}`}>
      {eyebrow && (
        <motion.p
          className="eyebrow-row"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <span className="eyebrow-row__dot" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.p>
      )}
      <motion.div variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <Heading id={id} className="section-heading__title" aria-label={title}>
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className="mask" aria-hidden="true">
                <motion.span variants={wordMask} className="mask__inner">
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </Heading>
      </motion.div>
    </div>
  )
}
