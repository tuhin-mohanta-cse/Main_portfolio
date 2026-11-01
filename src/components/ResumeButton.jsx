import { personal } from '../data/personal'
import { ResumeIcon } from './Icons'

/**
 * One component, every resume entry point. Always a real <a download> to the PDF in /public,
 * so it works without JavaScript and saves as "Tuhin_Mohanta_Resume.pdf".
 *  variant: 'pill' (text button) | 'outline' | 'icon' (round icon only)
 */
export default function ResumeButton({ variant = 'pill', label = 'Download Resume', className = '', size = 18 }) {
  const common = {
    href: personal.resumeUrl,
    download: personal.resumeFile,
    'data-hover': true,
  }

  if (variant === 'icon') {
    return (
      <a {...common} className={`resume-icon ${className}`} aria-label="Download resume (PDF)" title="Download resume (PDF)">
        <ResumeIcon size={size} />
      </a>
    )
  }

  return (
    <a {...common} className={`btn ${variant === 'outline' ? 'btn--outline' : ''} ${className}`}>
      <ResumeIcon size={size} />
      <span>{label}</span>
    </a>
  )
}
