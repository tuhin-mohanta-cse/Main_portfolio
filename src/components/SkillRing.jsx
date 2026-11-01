import { ringWords } from '../data/skills'

/**
 * A rotating 3D "carousel" of core technologies, built with CSS 3D transforms only
 * (no WebGL / extra dependency). Pauses on hover; static when reduced motion is requested.
 */
export default function SkillRing() {
  const step = 360 / ringWords.length
  return (
    <div className="ring" aria-hidden="true">
      <div className="ring__inner">
        {ringWords.map((word, i) => (
          <span key={word} className="ring__face" style={{ '--a': `${i * step}deg` }}>
            {word}
          </span>
        ))}
      </div>
      <span className="ring__floor" />
    </div>
  )
}
