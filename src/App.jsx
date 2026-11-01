import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Cursor from './components/Cursor'
import FloatingDock from './components/FloatingDock'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import About from './sections/About'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

const SEEN_KEY = 'tuhin-preloader-seen'

function alreadySeen() {
  try {
    return typeof window !== 'undefined' && sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [loading, setLoading] = useState(() => !alreadySeen())
  const ready = !loading

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable — fine */
    }
    setLoading(false)
  }, [])

  // Freeze scrolling while the preloader is on screen.
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = loading ? 'hidden' : ''
    return () => {
      root.style.overflow = ''
    }
  }, [loading])

  // Honour a deep link (#projects) once the page is revealed.
  useEffect(() => {
    if (!ready || !window.location.hash) return
    const el = document.getElementById(window.location.hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView(), 50)
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finish} />}</AnimatePresence>

      <ScrollProgress />
      <Cursor />
      <Navbar ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <FloatingDock ready={ready} />
    </MotionConfig>
  )
}
