import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { ease } from '../animations/config'
import { publicUrl } from '../utils/paths'
import ResumeButton from './ResumeButton'
import { scrollToSection } from '../utils/scroll'

const MUSIC_KEY = 'tuhin-music-playing'

/**
 * Bottom-right glass dock:  [ resume download ]  [ music toggle ]  [ back to top ]
 * The resume icon is always visible so recruiters can grab the PDF from anywhere on the page.
 */
export default function FloatingDock({ ready }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [note, setNote] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Resume playback on the next interaction if the visitor left music on last time.
  useEffect(() => {
    let wanted = false
    try {
      wanted = localStorage.getItem(MUSIC_KEY) === '1'
    } catch {
      /* storage blocked — ignore */
    }
    if (!wanted) return undefined
    const resume = () => {
      const a = audioRef.current
      if (!a) return
      a.volume = 0.35
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
    window.addEventListener('pointerdown', resume, { once: true })
    window.addEventListener('keydown', resume, { once: true })
    return () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      if (a.paused) {
        a.volume = 0.35
        await a.play()
        setPlaying(true)
        localStorage.setItem(MUSIC_KEY, '1')
      } else {
        a.pause()
        setPlaying(false)
        localStorage.setItem(MUSIC_KEY, '0')
      }
    } catch {
      setNote('Audio unavailable')
      setTimeout(() => setNote(''), 2200)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" src={publicUrl('audio/music.mp3')} />
      <motion.aside
        className="dock"
        aria-label="Quick actions"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
      >
        <AnimatePresence>
          {showTop && (
            <motion.button
              key="top"
              type="button"
              className="dock__btn"
              data-hover
              aria-label="Back to top"
              title="Back to top"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 46 }}
              exit={{ opacity: 0, height: 0 }}
              onClick={() => scrollToSection('home')}
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          className={`dock__btn dock__music ${playing ? 'is-playing' : ''}`}
          data-hover
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          title={playing ? 'Pause music' : 'Play music'}
        >
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>

        <ResumeButton variant="icon" className="dock__btn dock__resume" size={19} />
        <span className={`dock__note ${note ? 'is-visible' : ''}`} role="status">
          {note}
        </span>
      </motion.aside>
    </>
  )
}
