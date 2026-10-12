import profileHero from '../assets/profile-hero.webp'
import { professionalProfile } from '../data/profile'

function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-1">
            <div className="hero-content reveal-on-scroll">
              <h1>Osman Osmani</h1>
              <p className="hero-role">{professionalProfile.positioning}</p>
              <p className="hero-stack">{professionalProfile.technologies}</p>

              <p className="hero-description">
                More than 10 years of professional experience in web development,
                IT, web management and digital solutions. I combine that background
                with modern frontend and full-stack project development, focused
                on reliable interfaces and real business requirements.
              </p>
              <ul className="hero-current" aria-label="Current experience and certification">
                <li><a href="#resume">{professionalProfile.currentExperience}</a></li>
                <li><a href="#azure-certification">{professionalProfile.certification}</a></li>
              </ul>

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
                  <span className="stat-number">MSc</span>
                  <span className="stat-label">Computer Science & Engineering</span>
                </div>

                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Web Solutions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-2">
            <div className="hero-image reveal-on-scroll">
              <div className="image-wrapper">
                <img
                  src={profileHero}
                  alt="Portrait of Osman Osmani"
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
