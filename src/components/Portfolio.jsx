import { useState } from 'react'
import ProjectModal from './ProjectModal'
import ProjectImage from './ProjectImage'
import {
  featuredProjects,
  primaryFeaturedProject,
  professionalProjects,
} from '../data/projects'

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)
  const secondaryFeaturedProjects = featuredProjects.filter(
    (project) => project.id !== primaryFeaturedProject.id,
  )
  const handleProjectKeyDown = (event, project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedProject(project)
    }
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Portfolio</span>
          <h2>Projects that reflect current technical direction and real-world professional delivery.</h2>
          <p>
            Featured projects highlight current development work and portfolio growth. Selected
            professional work shows earlier website delivery completed within real roles and client
            contexts.
          </p>
        </div>

        <article className="content-card portfolio-card featured-project reveal-on-scroll">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="portfolio-image-wrap featured-project-image">
                <ProjectImage
                  src={primaryFeaturedProject.image}
                  alt={primaryFeaturedProject.imageAlt}
                  className="portfolio-image"
                  position={primaryFeaturedProject.imagePosition}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="portfolio-meta featured-meta">
                <span className="portfolio-category">{primaryFeaturedProject.category}</span>
                <span className="portfolio-year">{primaryFeaturedProject.year}</span>
              </div>

              {primaryFeaturedProject.highlightLabel ? (
                <div className="project-highlight-row">
                  <span className="project-highlight-badge">
                    {primaryFeaturedProject.highlightLabel}
                  </span>
                </div>
              ) : null}

              <div className="project-heading-row">
                <h3>{primaryFeaturedProject.title}</h3>
                <span className="status-badge in-progress">{primaryFeaturedProject.status}</span>
              </div>

              <p className="portfolio-summary">{primaryFeaturedProject.shortDescription}</p>
              <p>{primaryFeaturedProject.detail}</p>

              <div className="tech-badges">
                {primaryFeaturedProject.techStack.map((tech) => (
                  <span className="tech-badge" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="feature-list">
                {primaryFeaturedProject.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="project-actions">
                <button
                  type="button"
                  className="project-open-btn"
                  onClick={() => setSelectedProject(primaryFeaturedProject)}
                  aria-label={`View details for ${primaryFeaturedProject.title}`}
                >
                  View Project Details
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="portfolio-secondary-heading reveal-on-scroll">
          <h3>Featured Projects</h3>
          <p>Modern portfolio projects that show current frontend and full-stack capabilities.</p>
        </div>

        <div className="row g-4">
          {secondaryFeaturedProjects.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.slug}>
              <article
                className="content-card portfolio-card portfolio-grid-card portfolio-clickable reveal-on-scroll"
                onClick={() => setSelectedProject(item)}
                onKeyDown={(event) => handleProjectKeyDown(event, item)}
                tabIndex="0"
                role="button"
                aria-label={`Open project details for ${item.title}`}
              >
                <div className="portfolio-image-wrap">
                  <ProjectImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="portfolio-image"
                    position={item.imagePosition}
                    loading="lazy"
                  />
                </div>

                <div className="portfolio-meta">
                  <span className="portfolio-category">{item.category}</span>
                  <span className="portfolio-year">{item.year}</span>
                </div>

                <div className="project-heading-row">
                  <h3>{item.title}</h3>
                  <span
                    className={`status-badge ${
                      item.status === 'Completed' ? 'completed' : 'in-progress'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="portfolio-summary">{item.shortDescription}</p>

                {item.techStack?.length ? (
                  <div className="tech-badges compact">
                    {item.techStack.slice(0, 4).map((tech) => (
                      <span className="tech-badge" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="project-card-footer">
                  <button
                    type="button"
                    className="project-inline-link"
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedProject(item)
                    }}
                    aria-label={`View details for ${item.title}`}
                  >
                    View project
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="portfolio-secondary-heading portfolio-professional-heading reveal-on-scroll">
          <h3>Selected Professional Work</h3>
          <p>
            Selected website and digital platform work delivered through previous professional roles,
            including public sector, corporate, and freelance environments.
          </p>
        </div>

        <div className="row g-4">
          {professionalProjects.map((item) => (
            <div className="col-xl-4 col-md-6" key={item.slug}>
              <article
                className="content-card portfolio-card portfolio-grid-card portfolio-clickable reveal-on-scroll"
                onClick={() => setSelectedProject(item)}
                onKeyDown={(event) => handleProjectKeyDown(event, item)}
                tabIndex="0"
                role="button"
                aria-label={`Open project context for ${item.title}`}
              >
                <div className="portfolio-image-wrap">
                  <ProjectImage
                    src={item.image}
                    alt={item.imageAlt}
                    className="portfolio-image"
                    position={item.imagePosition}
                    loading="lazy"
                  />
                </div>

                <div className="portfolio-meta">
                  <span className="portfolio-category">{item.category}</span>
                  <span className="portfolio-year">{item.year}</span>
                </div>

                <div className="project-heading-row">
                  <h3>{item.title}</h3>
                  <span className="status-badge professional">{item.status}</span>
                </div>

                <p className="portfolio-summary">{item.shortDescription}</p>

                <div className="project-card-footer">
                  <button
                    type="button"
                    className="project-inline-link"
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedProject(item)
                    }}
                    aria-label={`View context for ${item.title}`}
                  >
                    View context
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default Portfolio
