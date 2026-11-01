import { Globe, FileDown, Phone } from 'lucide-react'

const base = { 'aria-hidden': true, focusable: 'false' }

export function GitHubIcon({ size = 20, ...rest }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 20, ...rest }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.24h4.48V23H.24V8.24ZM8.34 8.24h4.3v2.01h.06c.6-1.13 2.07-2.33 4.26-2.33 4.56 0 5.4 3 5.4 6.9V23h-4.48v-6.34c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.44 1.65-2.44 3.35V23H8.34V8.24Z" />
    </svg>
  )
}

export function GmailIcon({ size = 20, ...rest }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )
}

export function ResumeIcon({ size = 20, ...rest }) {
  return <FileDown aria-hidden="true" focusable="false" size={size} strokeWidth={2} {...rest} />
}

export function WebsiteIcon({ size = 20, ...rest }) {
  return <Globe aria-hidden="true" focusable="false" size={size} strokeWidth={2} {...rest} />
}

export function PhoneIcon({ size = 20, ...rest }) {
  return <Phone aria-hidden="true" focusable="false" size={size} strokeWidth={2} {...rest} />
}

const map = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  gmail: GmailIcon,
  resume: ResumeIcon,
  website: WebsiteIcon,
  phone: PhoneIcon,
}

export function SocialIcon({ id, size = 20 }) {
  const Icon = map[id]
  return Icon ? <Icon size={size} /> : null
}
