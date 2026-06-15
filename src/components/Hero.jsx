import profileHero from '../assets/profile-hero.webp'

function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="hero-content reveal-on-scroll">
              <h1>Osman Osmani</h1>

              <p className="hero-description">
                Frontend Developer / Web Developer with 10+ years of experience
                building responsive web applications, digital platforms, and
                business-focused solutions. My work combines modern frontend
                development with full-stack understanding, database experience,
                and long-term web delivery focused on usability, performance,
                and business value.
              </p>

              <div className="hero-actions">
                <a href="#resume" className="btn-primary">
                  View Experience
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Me
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Experience</span>
                </div>

                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Key Roles</span>
                </div>

                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Web Solutions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-1 order-lg-2">
            <div className="hero-image reveal-on-scroll">
              <div className="image-wrapper">
                <img
                  src={profileHero}
                  alt="Osman Osmani"
                  className="img-fluid main-image"
                />

                <div className="floating-card card-1">
                  <i className="bi bi-code-slash"></i>
                  <span>Frontend Development</span>
                </div>

                <div className="floating-card card-2">
                  <i className="bi bi-hdd-stack"></i>
                  <span>Full-Stack & Databases</span>
                </div>

                <div className="floating-card card-3">
                  <i className="bi bi-graph-up-arrow"></i>
                  <span>SEO & Digital Platforms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
