import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { personal } from '../data/personal'
import { fadeUp, viewportOnce } from '../animations/config'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects__head">
          <SectionHeading id="projects-title" eyebrow="Featured Projects" title="Selected Work" />
          <Reveal className="projects__side">
            <p>Full-stack builds from database schema to the pixels you interact with — every card links to its code.</p>
            <a href={personal.github} className="projects__all" target="_blank" rel="noopener noreferrer" data-hover>
              All repositories on GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="projects__grid">
          <motion.div className="projects__featured" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <ProjectCard project={featured} featured />
          </motion.div>
          {rest.map((project) => (
            <motion.div key={project.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
