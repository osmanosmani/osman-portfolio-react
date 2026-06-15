import { useEffect } from 'react'

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) {
    return null
  }

  const hasLinks = project.githubUrl || (project.liveUrl && project.isLive)
  const liveMessage = !project.isLive && project.liveLabel ? project.liveLabel : null
  const statusClass =
    project.status === 'Completed'
      ? 'completed'
      : project.status === 'Professional Work'
        ? 'professional'
        : 'in-progress'

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
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="portfolio-image-wrap project-modal-image-wrap">
          <img src={project.image} alt={project.title} className="portfolio-image" />
        </div>

        <div className="portfolio-meta">
          <span className="portfolio-category">{project.category}</span>
          <span className="portfolio-year">{project.year}</span>
        </div>

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
              {project.githubUrl ? (
                <a href={project.githubUrl} className="project-link" target="_blank" rel="noreferrer">
                  <i className="bi bi-github"></i>
                  GitHub
                </a>
              ) : null}

              {project.liveUrl && project.isLive ? (
                <a href={project.liveUrl} className="project-link" target="_blank" rel="noreferrer">
                  <i className="bi bi-box-arrow-up-right"></i>
                  Visit Project
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
