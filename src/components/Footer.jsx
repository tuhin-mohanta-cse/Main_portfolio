import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { navItems } from '../data/navigation'
import { personal } from '../data/personal'
import { scrollToSection } from '../utils/scroll'
import SocialLinks from './SocialLinks'
import Reveal from './Reveal'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.04])
  const year = new Date().getFullYear()

  return (
    <footer className="footer" data-tone="dark" ref={ref}>
      <div className="footer__bar container">
        <Reveal className="footer__col">
          <h2 className="footer__k">Quick links</h2>
          <ul className="footer__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="footer__col footer__col--social" delay={0.08}>
          <h2 className="footer__k">Find me online</h2>
          <SocialLinks variant="round" iconSize={22} className="footer__social" />
        </Reveal>

        <Reveal className="footer__col footer__col--meta" delay={0.16}>
          <p className="footer__brand">{personal.name.toUpperCase()} — PORTFOLIO</p>
          <p className="footer__copy">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="footer__copy">Thnak you &amp; visit again.</p>
        </Reveal>
      </div>

      <div className="footer__wordwrap" aria-hidden="true">
        <a
          href="#home"
          className="footer__top"
          data-hover
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
        >
          <ArrowUp size={20} />
        </a>
        <motion.div className="footer__word wordmark" style={{ scale }}>
          TUHIN MOHANTA
        </motion.div>
      </div>
    </footer>
  )
}
