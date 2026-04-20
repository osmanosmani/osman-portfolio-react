const experienceItems = [
  {
    year: '2020 - Present',
    title: 'Freelance Web Specialist',
    location: 'Helsingborg, Sweden',
    description:
      'Developed and maintained websites for Swedish and international clients. Implemented SEO strategies, managed hosting and performance optimisation, and delivered end-to-end web solutions focusing on quality and performance.',
    tags: ['SEO & Visibility', 'Performance', 'C#/.NET Training'],
  },
  {
    year: '2012 - 2020',
    title: 'Web Developer / Webmaster',
    location: 'Kosovo Police, Pristina',
    description:
      'Developed and managed the official Kosovo Police website and internal digital platforms. Built web applications using JavaScript, HTML, and CSS, ensured high security and system stability, and supported digital presence through social media channels.',
    tags: [
      'Website Development & Management',
      'Security & Stability',
      'Social Media Management',
      'PHP JavaScript/HTML/CSS',
    ],
  },
  {
    year: '2015 - 2020',
    title: 'Web Developer / Webmaster & Communications Lead',
    location: 'Kosovo Police Union, Pristina',
    description:
      'Led website development, implementation, maintenance, and technical testing while supporting communication strategy and public relations activities. Contributed to communication strategy development within the project "Raising awareness and capacity building for Police workers," supported by the Olof Palme International Center and the Swedish Government, while also conducting staff training and strengthening the organization\'s digital presence.',
    tags: [
      'Website Development & Maintenance',
      'Technical Testing & Support',
      'Staff Training',
      'Communications Strategy',
    ],
  },
  {
    year: '2010 - 2019',
    title: 'Full Stack Developer / Digital Specialist',
    location: 'Berisha Group, Pristina',
    description:
      'Built and maintained the company website and digital presence. Managed backend systems, databases, SEO and digital marketing, social media channels, and IT support for internal operations.',
    tags: [
      'Full Stack Development',
      'Database Management',
      'SEO & Digital Marketing',
      'IT Support',
    ],
  },
  {
    year: '2005 - 2010',
    title: 'Data Analyst / Database Administrator',
    location: 'Kosovo Police (KPIS), Pristina',
    description:
      'Administered central databases, executed advanced SQL analysis and reporting, extracted large datasets for decision-making, and supported internal departments with data access and system reporting.',
    tags: ['Database Administration', 'SQL Analysis & Reporting', 'Query Optimisation', 'System Support'],
  },
]

const educationItems = [
  {
    year: '2019',
    title: 'MSc in Computer Science and Engineering',
    institution: 'University for Business and Technology (UBT), Pristina',
    details: 'Thesis: Security in Web Applications.',
  },
  {
    year: '2013',
    title: 'Bachelor\'s degree in Computer Science',
    institution: 'University of Pristina',
    details: 'Thesis: Web Services.',
  },
]

const certifications = [
  'Foundational C# with Microsoft - freeCodeCamp & Microsoft',
  'Fundamentals of Web Programming',
  'Learning React.js - LinkedIn (Oct 2020)',
  'React.js Essential Training - LinkedIn (Oct 2020)',
  'React.js: Building an Interface - LinkedIn (Nov 2020)',
  'React: Ecosystems - LinkedIn (Nov 2020)',
  'React: Creating and Hosting a Full-Stack Site - LinkedIn (Nov 2020)',
  'Become a React Developer - LinkedIn (Nov 2020)',
  'Microsoft Certified Database Administrator (SQL Server)',
  'Microsoft SQL Server & .NET Development (ADO.NET, Transact-SQL)',
  'Cisco Networking Academy Program',
  'Network Administration Training',
  'SEO Strategy: Link Building - LinkedIn (Feb 2023)',
  'First Line Management',
  'Social Media, Information & Public Communication Training',
  'Mobile Journalism & Social Media Management',
  'Microsoft Windows 2000 Network and Operating System Essentials',
  'Implementing Microsoft Windows 2000 Professional and Server',
  'Querying Microsoft SQL Server 2000 with Transact-SQL',
  'Administering a Microsoft SQL Server 2000 Database',
  'Programming a Microsoft SQL Server 2000 Database',
  'Programming with Microsoft ADO.NET',
  'Developing Microsoft .NET Application for Windows (Visual Basic .NET)',
]

function Resume() {
  return (
    <section id="resume" className="resume section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Experience</span>
          <h2>Work history, education, and certifications from my professional background.</h2>
        </div>

        <div className="row g-5">
          <div className="col-lg-7">
            <div className="resume-column">
              <div className="resume-column-header">
                <h3>Work Experience</h3>
                <p>
                  Web development roles, digital operations, communication, and
                  technical leadership.
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
            </div>
          </div>

          <div className="col-lg-5">
            <div className="resume-column">
              <div className="resume-column-header">
                <h3>Education & Certifications</h3>
                <p>
                  Academic background, technical training, and professional
                  certifications.
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
                <h4>Certifications & Training</h4>
                <ul className="certification-list">
                  {certifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
