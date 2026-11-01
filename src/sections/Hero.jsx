import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import heroImg from '../assets/images/hero.webp'
import { hero, personal } from '../data/personal'
import { ease, fadeUp, letterFlip, springTilt, stagger } from '../animations/config'
import useFinePointer from '../hooks/useFinePointer'
import useReducedMotionPref from '../hooks/useReducedMotionPref'
import { scrollToSection } from '../utils/scroll'
import Counter from '../components/Counter'
import Magnetic from '../components/Magnetic'
import ResumeButton from '../components/ResumeButton'
import SocialLinks from '../components/SocialLinks'
import TiltCard from '../components/TiltCard'

const LETTERS = personal.firstName.toUpperCase().split('')

export default function Hero({ ready }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotionPref()
  const [roleIndex, setRoleIndex] = useState(0)

  // Scroll parallax: wordmark drifts down while the photo drifts up → depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // Pointer parallax: photo rotates in 3D, chips slide at different depths.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), springTilt)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), springTilt)
  const nearX = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), springTilt)
  const nearY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), springTilt)
  const farX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), springTilt)
  const farY = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), springTilt)

  const onMove = (e) => {
    if (!fine) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  useEffect(() => {
    if (reduce) return undefined
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % hero.rotatingRoles.length), 2600)
    return () => clearInterval(t)
  }, [reduce])

  const state = ready ? 'show' : 'hidden'

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--a" />
        <span className="hero__blob hero__blob--b" />
        <span className="hero__lines" />
      </div>

      <motion.div className="hero__word-wrap" style={{ y: wordY }}>
        <motion.h1
          id="hero-title"
          className="hero__word wordmark"
          variants={stagger(0.08, 0.15)}
          initial="hidden"
          animate={state}
          aria-label={personal.name}
        >
          {LETTERS.map((ch, i) => (
            <motion.span key={i} className="hero__letter" variants={letterFlip} aria-hidden="true">
              {ch}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      <motion.div className="hero__stage" style={{ y: photoY }}>
        <span className="hero__aura" aria-hidden="true" />
        <motion.div
          className="hero__photo"
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
          initial={{ opacity: 0, y: 70, scale: 0.94 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.55 }}
        >
          <img src={heroImg} alt={`Portrait of ${personal.name}`} width="760" height="1013" fetchpriority="high" decoding="async" />
          <span className="hero__sheen" aria-hidden="true" />
        </motion.div>

        <motion.div className="hero__chip hero__chip--status" style={{ x: nearX, y: nearY }} initial={{ opacity: 0, scale: 0.8 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.3, duration: 0.7, ease }}>
          <motion.span className="chip" animate={{ y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <i className="chip__pulse" aria-hidden="true" />
            {hero.status}
          </motion.span>
        </motion.div>

        <motion.div className="hero__chip hero__chip--edu" style={{ x: farX, y: farY }} initial={{ opacity: 0, scale: 0.8 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.5, duration: 0.7, ease }}>
          <motion.span className="chip chip--dark" animate={{ y: [0, 9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            B.Tech CSE · 2027
          </motion.span>
        </motion.div>

        <motion.div className="hero__chip hero__chip--stack" style={{ x: nearX, y: farY }} initial={{ opacity: 0, scale: 0.8 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.7, duration: 0.7, ease }}>
          <motion.span className="chip chip--lime" animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            Java · React · Spring Boot
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div className="hero__grid container" variants={stagger(0.12, 0.9)} initial="hidden" animate={state}>
        <motion.div className="hero__intro" variants={fadeUp}>
          <p className="hero__hi">{hero.intro}</p>
          <p className="hero__role" aria-live="off">
            <AnimatePresence mode="wait">
              <motion.span
                key={hero.rotatingRoles[roleIndex]}
                className="hero__role-text"
                initial={{ y: '90%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-90%', opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                {hero.rotatingRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
          <p className="hero__hi hero__hi--sub">&amp; {hero.subtitle}</p>
          <ul className="hero__list">
            {hero.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </motion.div>

        <motion.ul className="hero__stats" variants={fadeUp}>
          {hero.stats.map((s) => (
            <TiltCard as="li" key={s.label} className={`stat ${s.dark ? 'stat--card' : 'stat--plain'}`} strength={s.dark ? 10 : 5} glare={Boolean(s.dark)}>
              <div className="stat__num">
                <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
              </div>
              <p className="stat__lbl">{s.label}</p>
            </TiltCard>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div className="hero__tagline" variants={stagger(0.1, 1.15)} initial="hidden" animate={state}>
        <motion.p variants={fadeUp}>{hero.tagline}</motion.p>
        <motion.div className="hero__cta" variants={fadeUp}>
          <Magnetic>
            <a
              href="#projects"
              className="btn"
              data-hover
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
            >
              Explore Projects
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <ResumeButton variant="outline" />
          </Magnetic>
        </motion.div>
        <motion.div variants={fadeUp}>
          <SocialLinks variant="round" only={['github', 'linkedin', 'gmail']} className="hero__social" />
        </motion.div>
      </motion.div>
    </section>
  )
}
