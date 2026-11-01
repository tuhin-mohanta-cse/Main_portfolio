import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Home, User, Code2, GraduationCap, FolderGit2, Award, Mail, ArrowUpRight } from 'lucide-react'
import { navItems } from '../data/navigation'
import { personal } from '../data/personal'
import useScrollSpy from '../hooks/useScrollSpy'
import useScrollLock from '../hooks/useScrollLock'
import { scrollToSection } from '../utils/scroll'
import { ease } from '../animations/config'
import ResumeButton from './ResumeButton'
import SocialLinks from './SocialLinks'

const icons = { Home, User, Code2, GraduationCap, FolderGit2, Award, Mail }
const ids = navItems.map((n) => n.id)

/**
 * iOS-style glass navigation:
 *  - floating translucent pill with backdrop blur, hairline border and layered shadows
 *  - a sliding "active" capsule + a hover capsule (shared layout animation)
 *  - flips to a dark glass tone while it floats over dark sections
 *  - mobile: compact pill + glass sheet menu
 */
export default function Navbar({ ready }) {
  const active = useScrollSpy(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [tone, setTone] = useState('light')

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById(active)
    setTone(el?.dataset.tone === 'dark' ? 'dark' : 'light')
  }, [active])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 1080 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    if (open) {
      setOpen(false)
      setTimeout(() => scrollToSection(id), 90) // let the scroll-lock release first
    } else {
      scrollToSection(id)
    }
  }

  return (
    <>
      <motion.header
        className="nav"
        data-scrolled={scrolled}
        data-tone={tone}
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      >
        <div className="nav__pill">
          <a href="#home" className="nav__logo" onClick={go('home')} aria-label={`${personal.name} — home`} data-hover>
            <span>TUHIN</span>
            <i className="nav__logo-dot" aria-hidden="true" />
          </a>

          <nav className="nav__links" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
            <ul>
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="nav__link"
                      data-active={isActive}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={go(item.id)}
                      onPointerEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                      data-hover
                    >
                      {hovered === item.id && !isActive && (
                        <motion.span layoutId="nav-hover" className="nav__hover" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                      )}
                      {isActive && (
                        <motion.span layoutId="nav-active" className="nav__active" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="nav__label">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <ResumeButton variant="icon" className="nav__resume" size={18} />
            <a href="#contact" className="nav__cta" onClick={go('contact')} data-hover>
              Let’s talk
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              className="nav-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0, y: -18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.4, ease }}
            >
              <ul className="nav-sheet__list">
                {navItems.map((item, i) => {
                  const Icon = icons[item.icon] || Home
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="nav-sheet__item"
                        data-active={active === item.id}
                        aria-current={active === item.id ? 'location' : undefined}
                        onClick={go(item.id)}
                      >
                        <span className="nav-sheet__icon">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        {item.label}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
              <div className="nav-sheet__foot">
                <SocialLinks variant="round" only={['github', 'linkedin', 'gmail']} iconSize={19} />
                <ResumeButton label="Resume" className="btn--sm" size={16} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
