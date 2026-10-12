import { professionalProfile } from '../data/profile'

const quickInfo = [
  { label: 'Experience', value: '10+ years' },
  { label: 'Focus', value: 'Frontend + Full-Stack Delivery' },
  { label: 'Professional strengths', value: 'Web delivery, PHP, WordPress, SEO' },
  { label: 'Languages', value: 'Albanian: Native / bilingual. English & Swedish: Professional working proficiency.' },
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
      'Professional PHP and database experience, complemented by practical C#, ASP.NET Core, Entity Framework and SQL projects through Lexicon and portfolio development.',
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
          <h2>Experienced in web delivery. Expanding into modern full-stack development.</h2>
          <p>
            I bring more than 10 years of experience in web development, IT and
            digital solutions, backed by an MSc in Computer Science and Engineering
            and a BSc in Computer Science. My strength is understanding the complete
            web solution from both the technical and business side.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="content-card about-story reveal-on-scroll">
              <p>
                I have worked with real clients and institutional teams across
                requirements, planning, development, deployment, hosting and
                maintenance. Performance, security, SEO, analytics and clear
                stakeholder communication are part of that work.
              </p>
              <p>
                I am modernising my stack with React, TypeScript, C#/.NET,
                ASP.NET Core, SQL and Azure. My modern .NET experience comes
                from education and practical portfolio projects, while my
                long-term professional background is in web and digital delivery.
              </p>
              <p className="mb-0">
                Through Lexicon and my current APL at Qualipro in Malmö, I am
                gaining further team experience in Sweden: frontend development,
                Git/GitHub collaboration, QA, documentation and stakeholder feedback.
                AI-assisted development supports my analysis and delivery workflow.
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="content-card about-details-card reveal-on-scroll">
              <div className="detail-row">
                <span className="detail-label">Location</span>
                <span className="detail-value">{professionalProfile.location}</span>
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
                <span className="detail-value">Programmer / Developer with AI, Lexicon · 2026, including APL through December</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current APL</span>
                <span className="detail-value">Qualipro, Malmö · Ends 3 December 2026</span>
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
