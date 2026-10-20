import ProjectImage from './ProjectImage'
import { getProjectStatusClass } from '../utils/projectStatus'
import { localizedPath } from '../utils/navigation'

function ProjectCaseStudy({ project, language = 'en' }) {
  if (!project) {
    return (
      <section className="project-page section">
        <div className="container">
          <div className="content-card project-page-card reveal-on-scroll">
            <span className="section-kicker">Project</span>
            <h1>Project not found</h1>
            <p>
              The requested project page is not available. Return to the portfolio overview to
              continue browsing selected work and case studies.
            </p>
            <div className="project-page-links">
              <a href={localizedPath('/projects', language)} className="project-link">
                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const liveMessage = !project.isLive && project.liveLabel ? project.liveLabel : null
  const statusClass = getProjectStatusClass(project.status)
  const overviewParagraphs = project.caseStudyOverview ?? [project.detail]
  const galleryItems =
    project.gallery?.length > 0
      ? project.gallery
      : [
          {
            src: project.image,
            alt: project.imageAlt,
            caption: `${project.title} project preview`,
            position: project.imagePosition,
          },
        ]

  return (
    <section className="project-page section">
      <div className="container">
        <div className="project-page-header reveal-on-scroll">
          <a href={localizedPath('/projects', language)} className="project-breadcrumb">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Portfolio
          </a>
        </div>

        <div className="content-card project-page-card reveal-on-scroll">
          <div className="portfolio-meta">
            <span className="portfolio-category">{project.category}</span>
            <span className="portfolio-year">{project.year}</span>
          </div>

          {project.highlightLabel ? (
            <div className="project-highlight-row">
              <span className="project-highlight-badge">{project.highlightLabel}</span>
            </div>
          ) : null}

          <div className="project-heading-row project-page-title-row">
            <div>
              <span className="section-kicker">Case Study</span>
              <h1>{project.title}</h1>
            </div>
            <span className={`status-badge ${statusClass}`}>{project.status}</span>
          </div>

          <p className="portfolio-summary project-page-summary">{project.shortDescription}</p>

          {project.hostingNote ? (
            <div className="project-note-box">
              <h2>Hosting Approach</h2>
              <p>{project.hostingNote}</p>
            </div>
          ) : null}

          <div className="project-gallery-grid">
            {galleryItems.map((item) => (
              <figure className="project-gallery-item" key={`${project.slug}-${item.alt}`}>
                <div className="portfolio-image-wrap project-gallery-image-wrap">
                  <ProjectImage
                    src={item.src}
                    alt={item.alt}
                    className="portfolio-image"
                    position={item.position ?? project.imagePosition}
                    loading="eager"
                    fit="cover"
                  />
                </div>
                {item.caption ? <figcaption>{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>

          <div className="row g-4 project-page-sections">
            <div className="col-lg-7">
              <div className="project-page-block">
                <h2>Project Overview</h2>
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {project.caseStudyHighlights?.length ? (
                <div className="project-page-block">
                  <h2>Key Highlights</h2>
                  <ul className="feature-list">
                    {project.caseStudyHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="col-lg-5">
              {project.techStack?.length ? (
                <div className="project-page-block">
                  <h2>Tech Stack</h2>
                  <div className="tech-badges">
                    {project.techStack.map((tech) => (
                      <span className="tech-badge" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.keyFeatures?.length ? (
                <div className="project-page-block">
                  <h2>Feature Scope</h2>
                  <ul className="feature-list">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="project-page-block">
                <h2>Links</h2>
                <div className="project-page-links">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-github"></i>
                      GitHub Repository
                    </a>
                  ) : null}

                  {project.liveUrl && project.isLive ? (
                    <a
                      href={project.liveUrl}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                      View Live Demo
                    </a>
                  ) : liveMessage ? (
                    <span className="project-link disabled status-note">
                      <i className="bi bi-hourglass-split"></i>
                      {liveMessage}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectCaseStudy
