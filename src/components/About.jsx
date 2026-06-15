const quickInfo = [
  { label: 'Experience', value: '10+ years' },
  { label: 'Focus', value: 'Frontend + Full-Stack Delivery' },
  { label: 'Specialties', value: 'React, .NET, SEO, SQL' },
  { label: 'Languages', value: 'English C1, Swedish B2, Albanian Native' },
]

const expertiseItems = [
  {
    title: 'Frontend & Web Apps',
    description:
      'React, TypeScript, JavaScript, HTML, CSS, Tailwind, Bootstrap, and user-focused interface development.',
    icon: 'bi bi-code-slash',
  },
  {
    title: 'Full-Stack & Data',
    description:
      'C#, .NET, Entity Framework, PHP, SQL Server, MySQL, backend integration, and practical system development.',
    icon: 'bi bi-database',
  },
  {
    title: 'CMS, SEO & Platforms',
    description:
      'WordPress, technical SEO, Google Analytics, hosting, deployment, and ongoing optimisation of business websites.',
    icon: 'bi bi-graph-up-arrow',
  },
]

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">About Me</span>
          <h2>Frontend Developer / Web Developer</h2>
          <p>
            Frontend Developer / Web Developer with full-stack and digital
            platform experience. I work with React, TypeScript, JavaScript,
            C#, .NET, PHP, and SQL to build responsive web applications,
            secure business platforms, and maintainable digital solutions.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="content-card about-story reveal-on-scroll">
              <p>
                My current focus is on React, TypeScript, .NET, and modern web
                applications where clean frontend structure, maintainability,
                and usability matter. I enjoy translating technical
                requirements into clear, reliable interfaces that support real
                business needs.
              </p>
              <p>
                My broader background includes public sector platforms,
                corporate websites, WordPress-based delivery, technical SEO,
                Google Analytics, hosting, deployment, and long-term website
                maintenance. This gives me a practical view of digital products
                beyond coding alone, from implementation and optimisation to
                support and continuous improvement.
              </p>
              <p className="mb-0">
                Alongside development work, I have continued strengthening my
                profile through structured training in React, C#, SQL, SEO,
                WordPress, cloud-related tooling, and current AI-focused
                studies at Lexicon in Malmo.
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="content-card about-details-card reveal-on-scroll">
              <div className="detail-row">
                <span className="detail-label">Location</span>
                <span className="detail-value">Helsingborg, Sweden</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="detail-value accent-text">Open to new opportunities</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <a href="mailto:osmanosmani@gmail.com" className="detail-value">
                  osmanosmani@gmail.com
                </a>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Studies</span>
                <span className="detail-value">Developer with AI, Lexicon (Sep 2026)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-1">
          {quickInfo.map((item) => (
            <div className="col-sm-6 col-xl-3" key={item.label}>
              <div className="content-card info-card reveal-on-scroll">
                <span className="info-label">{item.label}</span>
                <h3>{item.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-1">
          {expertiseItems.map((item) => (
            <div className="col-lg-4" key={item.title}>
              <div className="content-card expertise-card reveal-on-scroll">
                <div className="expertise-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
