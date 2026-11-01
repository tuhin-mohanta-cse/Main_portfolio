import { personal } from './personal'

// Every social / contact link used in the navbar, hero, contact and footer.
export const socialLinks = [
  { id: 'github', label: 'GitHub', handle: personal.githubHandle, href: personal.github, external: true },
  { id: 'linkedin', label: 'LinkedIn', handle: personal.linkedinHandle, href: personal.linkedin, external: true },
  { id: 'gmail', label: 'Gmail', handle: personal.email, href: `mailto:${personal.email}` },
  { id: 'website', label: 'Portfolio', handle: personal.websiteHandle, href: personal.website, external: true },
  { id: 'resume', label: 'Resume', handle: 'Download PDF', href: personal.resumeUrl, download: personal.resumeFile },
]
