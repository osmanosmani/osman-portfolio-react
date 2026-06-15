const experienceItems = [
  {
    year: '2020 - Present',
    title: 'Freelance Web Specialist',
    location: 'Helsingborg, Sweden',
    description:
      'Developed responsive websites for Swedish and international clients using React, TypeScript, PHP, and WordPress. Built business-focused web solutions with reusable components, clean structure, technical SEO, analytics integration, hosting setup, deployment, and ongoing maintenance.',
    tags: ['React & TypeScript', 'WordPress / CMS', 'Technical SEO', 'Hosting & Deployment'],
  },
  {
    year: '2012 - 2020',
    title: 'Web Developer / Webmaster',
    location: 'Kosovo Police, Pristina',
    description:
      'Developed and managed the official Kosovo Police website and internal digital platforms using PHP, WordPress, JavaScript, HTML, and CSS. Built and maintained web applications and user interfaces that supported internal operations, public-facing services, security, stability, and official digital communication.',
    tags: ['PHP & WordPress', 'JavaScript / HTML / CSS', 'Internal Web Applications', 'Security & Stability'],
  },
  {
    year: '2010 - 2019',
    title: 'Full Stack Developer / Digital Specialist',
    location: 'Berisha Group, Pristina',
    description:
      'Developed and maintained company websites and digital platforms using HTML, CSS, JavaScript, PHP, and database-backed solutions. Managed backend systems, SEO, technical optimisation, and practical support for ongoing web delivery and business visibility.',
    tags: ['Full-Stack Delivery', 'Backend & Databases', 'SEO & Digital Visibility', 'Business Websites'],
  },
]

const additionalBackground = [
  {
    year: '2015 - 2020',
    title: 'Web Developer / Webmaster & Communications Lead',
    location: 'Kosovo Police Union, Pristina',
    description:
      'Supported website delivery, technical testing, staff training, and communication strategy work, including project support connected to the Olof Palme International Center and the Swedish Government.',
  },
  {
    year: '2005 - 2010',
    title: 'Data Analyst / Database Administrator',
    location: 'Kosovo Police (KPIS), Pristina',
    description:
      'Worked with central databases, SQL analysis, reporting, and data support for operational decision-making and internal system needs.',
  },
]

const educationItems = [
  {
    year: '2026',
    title: 'Lexicon Programmer, Developer with AI',
    institution: 'Lexicon, Malmo',
    details: 'Expected Graduation: September 2026.',
  },
  {
    year: '2019',
    title: 'MSc in Computer Science and Engineering',
    institution: 'University for Business and Technology (UBT), Pristina',
    details: 'Thesis: Security in Web Applications.',
  },
  {
    year: '2013',
    title: "Bachelor's degree in Computer Science",
    institution: 'University of Pristina',
    details: 'Thesis: Web Services.',
  },
]

const selectedTraining = [
  'Become a React Developer - LinkedIn Learning',
  'React: Creating and Hosting a Full-Stack Site - LinkedIn Learning',
  'React: Ecosystems - LinkedIn Learning',
  'SEO Strategy: Link Building - LinkedIn Learning',
  'Foundational C# - freeCodeCamp & Microsoft',
  'Microsoft Certified Database Administrator (SQL Server)',
  'Microsoft SQL Server & .NET Development (ADO.NET, Transact-SQL)',
]

const additionalDevelopment = [
  'React learning track: Learning React.js, Essential Training, and Building an Interface',
  'Fundamentals of Web Programming',
  'Programming with Microsoft ADO.NET',
  'Cisco Networking Academy Program and Network Administration Training',
  'Social Media & Public Communication Training',
  'First Line Management',
]

function Resume() {
  return (
    <section id="resume" className="resume section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Experience</span>
          <h2>Work history, education, training, and selected professional background.</h2>
        </div>

        <div className="row g-5">
          <div className="col-lg-7">
            <div className="resume-column">
              <div className="resume-column-header">
                <h3>Work Experience</h3>
                <p>
                  Main professional roles aligned with current positioning in
                  frontend, web development, and digital platform delivery.
                </p>
              </div>

              <div className="timeline">
                {experienceItems.map((item) => (
                  <article className="timeline-item reveal-on-scroll" key={`${item.year}-${item.title}`}>
                    <span className="timeline-year">{item.year}</span>
                    <h4>{item.title}</h4>
                    <span className="timeline-location">{item.location}</span>
                    <p>{item.description}</p>
                    <div className="tag-list">
                      {item.tags.map((tag) => (
                        <span className="tag-pill" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="content-card certifications-card resume-background-card reveal-on-scroll">
                <h4>Additional Professional Background</h4>
                <ul className="certification-list compact">
                  {additionalBackground.map((item) => (
                    <li key={`${item.year}-${item.title}`}>
                      <strong>{item.year}:</strong> {item.title}, {item.location}. {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="resume-column">
              <div className="resume-column-header">
                <h3>Education & Professional Development</h3>
                <p>
                  Current studies, academic background, selected training, and
                  ongoing professional development relevant to the portfolio.
                </p>
              </div>

              <div className="timeline timeline-compact">
                {educationItems.map((item) => (
                  <article className="timeline-item reveal-on-scroll" key={`${item.year}-${item.title}`}>
                    <span className="timeline-year">{item.year}</span>
                    <h4>{item.title}</h4>
                    <span className="timeline-location">{item.institution}</span>
                    <p>{item.details}</p>
                  </article>
                ))}
              </div>

              <div className="content-card certifications-card reveal-on-scroll">
                <h4>Selected Training & Certifications</h4>
                <ul className="certification-list">
                  {selectedTraining.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="training-group">
                  <h5>Additional Professional Development</h5>
                  <ul className="certification-list compact">
                    {additionalDevelopment.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
