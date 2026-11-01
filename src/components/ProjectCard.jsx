import { ArrowUpRight } from 'lucide-react'
import { GitHubIcon } from './Icons'
import ProjectArt from './ProjectArt'
import TiltCard from './TiltCard'

/** One project: illustrated thumbnail, copy, highlights, stack and real links. */
export default function ProjectCard({ project, featured = false }) {
  const { id, art, category, title, description, highlights, tech, github, live } = project
  const shown = featured ? highlights : highlights.slice(0, 3)

  return (
    <TiltCard as="article" className={`pcard ${featured ? 'pcard--featured' : ''}`} strength={featured ? 3 : 5} aria-labelledby={`project-${id}`}>
      <div className="pcard__art">
        <ProjectArt type={art} />
        <span className="pcard__num wordmark" aria-hidden="true">
          {id}
        </span>
        {featured && <span className="pcard__badge">Featured</span>}
      </div>

      <div className="pcard__body">
        <p className="pcard__cat">{category}</p>
        <h3 className="pcard__title" id={`project-${id}`}>
          {title}
        </h3>
        <p className="pcard__desc">{description}</p>

        <ul className="pcard__list">
          {shown.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <ul className="pcard__tags" aria-label="Technologies used">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="pcard__actions">
          <a href={github} className="btn btn--sm" target="_blank" rel="noopener noreferrer" data-hover aria-label={`${title} — source code on GitHub`}>
            <GitHubIcon size={16} />
            GitHub
          </a>
          {live && (
            <a href={live} className="btn btn--sm btn--outline" target="_blank" rel="noopener noreferrer" data-hover aria-label={`${title} — live demo`}>
              Live demo
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  )
}
