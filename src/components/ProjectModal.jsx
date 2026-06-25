import { useEffect, useRef } from 'react'
import ProjectImage from './ProjectImage'
import { getProjectStatusClass } from '../utils/projectStatus'

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!project) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [project, onClose])

  if (!project) {
    return null
  }

  const hasLinks = project.caseStudyUrl || project.githubUrl || (project.liveUrl && project.isLive)
  const liveMessage = !project.isLive && project.liveLabel ? project.liveLabel : null
  const statusClass = getProjectStatusClass(project.status)

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal content-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project details"
          ref={closeButtonRef}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="portfolio-image-wrap project-modal-image-wrap">
          <ProjectImage
            src={project.image}
            alt={project.imageAlt}
            className="portfolio-image"
            position={project.imagePosition}
            loading="eager"
            fetchPriority="high"
            fit="contain"
          />
        </div>

        <div className="portfolio-meta">
          <span className="portfolio-category">{project.category}</span>
          <span className="portfolio-year">{project.year}</span>
        </div>

        {project.highlightLabel ? (
          <div className="project-highlight-row">
            <span className="project-highlight-badge">{project.highlightLabel}</span>
          </div>
        ) : null}

        <div className="project-heading-row">
          <h3 id="project-modal-title">{project.title}</h3>
          <span className={`status-badge ${statusClass}`}>{project.status}</span>
        </div>

        <p className="portfolio-summary">{project.shortDescription}</p>
        {project.detail ? <p>{project.detail}</p> : null}

        {project.techStack?.length ? (
          <div className="tech-badges">
            {project.techStack.map((tech) => (
              <span className="tech-badge" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {project.keyFeatures?.length ? (
          <ul className="feature-list">
            {project.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : null}

        <div className="project-modal-footer">
          {hasLinks ? (
            <div className="project-links">
              {project.caseStudyUrl ? (
                <a
                  href={project.caseStudyUrl}
                  className="project-link"
                  aria-label={`Open case study page for ${project.title}`}
                >
                  <i className="bi bi-layout-text-window-reverse"></i>
                  Case Study
                </a>
              ) : null}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} source code on GitHub`}
                >
                  <i className="bi bi-github"></i>
                  GitHub
                </a>
              ) : null}

              {project.liveUrl && project.isLive ? (
                <a
                  href={project.liveUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit live project for ${project.title}`}
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                  View Live Demo
                </a>
              ) : null}

              {liveMessage ? (
                <span className="project-link disabled status-note">
                  <i className="bi bi-hourglass-split"></i>
                  {liveMessage}
                </span>
              ) : null}
            </div>
          ) : liveMessage ? (
            <div className="project-links">
              {project.caseStudyUrl ? (
                <a
                  href={project.caseStudyUrl}
                  className="project-link"
                  aria-label={`Open case study page for ${project.title}`}
                >
                  <i className="bi bi-layout-text-window-reverse"></i>
                  Case Study
                </a>
              ) : null}

              <span className="project-link disabled status-note">
                <i className="bi bi-hourglass-split"></i>
                {liveMessage}
              </span>
            </div>
          ) : null}

          {!hasLinks && !liveMessage && project.type === 'professional' ? (
            <div className="project-links">
              <span className="project-link disabled status-note">
                <i className="bi bi-briefcase"></i>
                Delivered within a professional role
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
