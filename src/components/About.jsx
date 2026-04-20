const quickInfo = [
  { label: 'Experience', value: '10+ years' },
  { label: 'Focus', value: 'Full Stack Development' },
  { label: 'Specialties', value: 'Web, SEO, SQL' },
  { label: 'Languages', value: 'English, Swedish, Albanian' },
]

const expertiseItems = [
  {
    title: 'Full Stack Development',
    description:
      'Backend and frontend web systems built for reliability, performance, and maintainability.',
    icon: 'bi bi-code-slash',
  },
  {
    title: 'Database & Analytics',
    description:
      'SQL Server, MySQL, advanced querying, and data-driven reporting.',
    icon: 'bi bi-database',
  },
  {
    title: 'Security & Stability',
    description:
      'Secure web applications, stable hosting, technical maintenance, and continuous improvement.',
    icon: 'bi bi-shield-check',
  },
]

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">About Me</span>
          <h2>Full Stack Developer / Software Engineer</h2>
          <p>
            Experienced and committed IT and Web Developer with over ten years of
            experience in system development, web technologies, and database
            management. I deliver end-to-end digital solutions from concept and
            development to deployment and optimisation, with a strong focus on
            quality, usability, and long-term reliability.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="content-card about-story reveal-on-scroll">
              <p>
                My work is centred on security, performance, and user experience.
                I combine backend and frontend knowledge with proactive problem
                solving, strong communication, and continuous learning to support
                business value and stable digital services.
              </p>
              <p className="mb-0">
                I have also contributed to projects that combined web
                development, website maintenance, technical support, and
                communication strategy to strengthen digital presence and public
                engagement, including work carried out for the Kosovo Police
                Union.
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
