import { motion } from 'framer-motion'
import { socialLinks } from '../data/social'
import { SocialIcon } from './Icons'

/**
 * Renders every social / contact link with a visible, labelled icon.
 *  variant: 'round' → big round icon buttons (footer, hero)   |   'chips' → icon + text pills (contact)
 *  only / omit: filter by link id
 */
export default function SocialLinks({ variant = 'round', only, omit = [], className = '', iconSize = 20 }) {
  const items = socialLinks.filter((l) => (only ? only.includes(l.id) : true) && !omit.includes(l.id))

  return (
    <ul className={`social social--${variant} ${className}`} aria-label="Social and contact links">
      {items.map((link) => (
        <li key={link.id}>
          <motion.a
            href={link.href}
            className="social__link"
            data-hover
            aria-label={link.id === 'resume' ? 'Download resume (PDF)' : `${link.label} — ${link.handle}`}
            title={link.label}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(link.download ? { download: link.download } : {})}
            whileTap={{ scale: 0.94 }}
          >
            <SocialIcon id={link.id} size={iconSize} />
            {variant === 'chips' && <span className="social__label">{link.label}</span>}
            {variant === 'round' && <span className="social__tip">{link.label}</span>}
          </motion.a>
        </li>
      ))}
    </ul>
  )
}
