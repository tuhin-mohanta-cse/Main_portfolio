import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { fadeUp, stagger, viewportOnce } from '../animations/config'
import SectionHeading from '../components/SectionHeading'
import SkillRing from '../components/SkillRing'
import TiltCard from '../components/TiltCard'

export default function Skills() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [60, -140])

  return (
    <section id="skills" className="skills sheet section" data-tone="dark" ref={ref} aria-labelledby="skills-title">
      <motion.div className="skills__watermark wordmark" style={{ x }} aria-hidden="true">
        TUHIN MOHANTA
      </motion.div>

      <div className="container skills__inner">
        <SectionHeading id="skills-title" eyebrow="Technical Skills" title="Core Expertise" align="center" />
        <SkillRing />

        <motion.ul className="skills__grid" variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          {skillGroups.map((group, i) => (
            <motion.li key={group.id} variants={fadeUp}>
              <TiltCard className="skill" strength={5}>
                <div className="skill__text">
                  <span className="skill__idx">{String(i + 1).padStart(2, '0')} →</span>
                  <h3 className="skill__title">{group.title}</h3>
                  <ul className="skill__tags">
                    {group.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <span className={`orb orb--${group.orb}`} aria-hidden="true" />
              </TiltCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
