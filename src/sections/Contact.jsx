import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react'
import resumePreview from '../assets/images/resume-preview.webp'
import { personal } from '../data/personal'
import { fadeUp, scaleIn, slideLeft, stagger, viewportOnce } from '../animations/config'
import Magnetic from '../components/Magnetic'
import Reveal from '../components/Reveal'
import ResumeButton from '../components/ResumeButton'
import SectionHeading from '../components/SectionHeading'
import SocialLinks from '../components/SocialLinks'
import TiltCard from '../components/TiltCard'
import { PhoneIcon } from '../components/Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <section id="contact" className="contact sheet section" data-tone="dark" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__main">
          <SectionHeading id="contact-title" eyebrow="Connect, Collaborate & Explore" title="Let’s build something great together" />

          <Reveal as="p" className="contact__lead">
            I’m seeking Software Developer, Java Developer and Full Stack Developer internship and entry-level roles. Explore my work, browse the code, or reach out directly — I reply to every message.
          </Reveal>

          <motion.div className="contact__email-row" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Magnetic strength={0.15}>
              <a href={`mailto:${personal.email}`} className="contact__email" data-hover>
                {personal.email}
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </Magnetic>
            <button type="button" className="copy" onClick={copyEmail} data-hover aria-label="Copy email address">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" className="copy__in" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Check size={15} aria-hidden="true" /> Copied
                  </motion.span>
                ) : (
                  <motion.span key="copy" className="copy__in" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Copy size={15} aria-hidden="true" /> Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          <Reveal>
            <SocialLinks variant="chips" iconSize={18} className="contact__social" />
          </Reveal>

          <motion.ul className="contact__details" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.li variants={slideLeft}>
              <PhoneIcon size={17} />
              <a href={personal.phoneHref} data-hover>
                {personal.phone}
              </a>
            </motion.li>
            <motion.li variants={slideLeft}>
              <MapPin size={17} aria-hidden="true" />
              <span>{personal.location}</span>
            </motion.li>
          </motion.ul>
        </div>

        <Reveal variants={scaleIn} className="contact__resume">
          <TiltCard className="rcard" strength={10}>
            <a href={personal.resumeUrl} download={personal.resumeFile} className="rcard__preview" data-hover aria-label="Download resume (PDF)">
              <img src={resumePreview} alt="Preview of Tuhin Mohanta’s resume" width="910" height="1287" loading="lazy" decoding="async" />
              <span className="rcard__badge">PDF · A4</span>
            </a>
            <div className="rcard__foot">
              <div>
                <p className="rcard__title">My Resume</p>
                <p className="rcard__sub">{personal.resumeFile}</p>
              </div>
              <ResumeButton label="Download" className="btn--sm btn--lime" size={16} />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
