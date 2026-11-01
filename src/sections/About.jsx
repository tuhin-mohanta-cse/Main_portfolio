import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'
import aboutImg from '../assets/images/about.webp'
import { about, personal } from '../data/personal'
import { fadeUp, scaleIn, stagger } from '../animations/config'
import { scrollToSection } from '../utils/scroll'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'
import ResumeButton from '../components/ResumeButton'

export default function About() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const tagY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const badgeY = useTransform(scrollYProgress, [0, 1], [-24, 24])

  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal variants={scaleIn} className="about__photo">
          <div ref={photoRef} className="about__photo-inner">
            <TiltCard className="about__frame" strength={9}>
              <img src={aboutImg} alt={`${personal.name} in a navy suit`} width="760" height="1013" loading="lazy" decoding="async" />
            </TiltCard>
            <motion.div className="about__tag" style={{ y: tagY }}>
              <span className="about__tag-num">{about.tag.value}</span>
              <span className="about__tag-lbl">
                {about.tag.label[0]}
                <br />
                {about.tag.label[1]}
              </span>
            </motion.div>
            <motion.div className="about__badge glass" style={{ y: badgeY }}>
              <MapPin size={15} aria-hidden="true" />
              Bankura, WB
            </motion.div>
          </div>
        </Reveal>

        <div className="about__copy">
          <SectionHeading id="about-title" eyebrow="About Me" title={about.heading} className="section-heading--md" />

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {about.paragraphs.map((p) => (
              <motion.p key={p.slice(0, 24)} className="about__p" variants={fadeUp}>
                {p}
              </motion.p>
            ))}
          </motion.div>

          <Reveal as="dl" className="about__facts">
            {about.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </Reveal>

          <Reveal className="about__cta">
            <ResumeButton />
            <a
              href="#contact"
              className="btn btn--outline"
              data-hover
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              Get in touch
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
