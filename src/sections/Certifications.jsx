import { motion } from 'framer-motion'
import { Award, Code2, ShieldCheck, Terminal, Trophy } from 'lucide-react'
import { certifications, achievements } from '../data/certifications'
import { personal } from '../data/personal'
import { fadeUp, stagger, viewportOnce } from '../animations/config'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

const icons = { ShieldCheck, Code2, Terminal, Award }

export default function Certifications() {
  return (
    <section id="certifications" className="certs section" aria-labelledby="certs-title">
      <div className="container">
        <SectionHeading
          id="certs-title"
          eyebrow="Certifications & Training"
          title={achievements.length ? 'Certifications & Achievements' : 'Certifications & Training'}
        />

        <motion.ul className="certs__grid" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          {certifications.map((c) => {
            const Icon = icons[c.icon] || Award
            return (
              <motion.li key={c.id} variants={fadeUp}>
                <TiltCard className={`cert ${c.foil ? 'cert--foil' : ''}`} strength={7}>
                  <span className="cert__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="cert__kind">{c.kind}</span>
                  <h3 className="cert__title">{c.title}</h3>
                  <p className="cert__issuer">
                    {c.issuer} <span>· {c.meta}</span>
                  </p>
                </TiltCard>
              </motion.li>
            )
          })}
        </motion.ul>

        {achievements.length > 0 && (
          <Reveal className="achievements">
            <h3 className="achievements__title">
              <Trophy size={18} aria-hidden="true" /> Achievements
            </h3>
            <ul>
              {achievements.map((a) => (
                <li key={a.id}>
                  <strong>{a.title}</strong>
                  {a.detail && <span> — {a.detail}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="langs">
          <h3 className="langs__title">Languages</h3>
          <ul className="langs__list">
            {personal.languages.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>
                <span>{l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
