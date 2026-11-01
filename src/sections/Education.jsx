import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { education, experience } from '../data/education'
import { slideLeft, slideRight, viewportOnce } from '../animations/config'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

export default function Education() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 65%'] })
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 24 })

  return (
    <section id="education" className="education sheet section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" eyebrow="Journey" title={experience.length ? 'Education & Experience' : 'Education'} />

        <div className={`education__grid ${experience.length ? '' : 'education__grid--solo'}`}>
          <div className="timeline" ref={listRef}>
            <div className="timeline__rail" aria-hidden="true">
              <motion.span className="timeline__fill" style={{ scaleY }} />
            </div>
            <ol className="timeline__list">
              {education.map((item) => (
                <motion.li key={item.id} className="timeline__item" variants={slideLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
                  <span className={`timeline__dot ${item.current ? 'is-current' : ''}`} aria-hidden="true" />
                  <TiltCard className="edu" strength={4}>
                    <div className="edu__meta">
                      <span className="edu__period">{item.period}</span>
                      <span className={`edu__status ${item.current ? 'is-current' : ''}`}>{item.status}</span>
                    </div>
                    <h3 className="edu__degree">
                      <GraduationCap size={18} aria-hidden="true" />
                      {item.degree}
                    </h3>
                    <p className="edu__school">{item.institution}</p>
                    <p className="edu__score">
                      <span>{item.scoreLabel}</span>
                      <strong>{item.score}</strong>
                    </p>
                  </TiltCard>
                </motion.li>
              ))}
            </ol>
          </div>

          {experience.length > 0 && (
          <motion.aside className="experience" variants={slideRight} initial="hidden" whileInView="show" viewport={viewportOnce} aria-label="Work experience">
            <TiltCard className="exp" strength={6}>
              <p className="exp__eyebrow">
                <Briefcase size={15} aria-hidden="true" />
                Experience
              </p>
              {experience.map((job) => (
                <div key={job.id}>
                  <h3 className="exp__role">{job.role}</h3>
                  <p className="exp__company">
                    {job.company} <span>· {job.period}</span>
                  </p>
                  <ul className="exp__points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </TiltCard>
          </motion.aside>
          )}
        </div>
      </div>
    </section>
  )
}
