const skillGroups = [
  {
    title: 'Frontend Development',
    icon: 'bi bi-window',
    context: 'Professional web fundamentals, with React and TypeScript developed through client, training and practical projects.',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    title: 'Backend & Data',
    icon: 'bi bi-hdd-stack',
    context: 'Professional PHP and database background. C#, ASP.NET Core, Entity Framework and LINQ are being developed through Lexicon and portfolio projects.',
    items: ['PHP', 'C#', 'ASP.NET Core', 'REST APIs', 'Entity Framework', 'LINQ', 'SQL Server', 'MySQL'],
  },
  {
    title: 'Web & Digital',
    icon: 'bi bi-graph-up-arrow',
    context: 'Long-term professional and freelance website delivery, ongoing support and business visibility.',
    items: ['WordPress', 'Web Management', 'Hosting', 'Deployment', 'SEO', 'Google Analytics', 'Search Console', 'Performance Optimisation'],
  },
  {
    title: 'Cloud & Workflow',
    icon: 'bi bi-cpu',
    context: 'AZ-900 certifies foundational Azure knowledge. Team workflows are practised through Qualipro APL and projects; CI/CD fundamentals through training.',
    items: ['Microsoft Azure Fundamentals', 'Git', 'GitHub', 'Agile / Scrum', 'CI/CD Fundamentals', 'Testing', 'Technical Documentation'],
  },
  {
    title: 'AI-assisted Development',
    icon: 'bi bi-cpu',
    context: 'LLM tools support analysis, debugging, documentation and coding workflows. Practical AI integration is an area of continued development.',
    items: ['AI-assisted Coding', 'Development Workflows', 'Analysis & Debugging', 'Documentation Support'],
  },
]

function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Skills</span>
          <h2>Practical tools and technologies used to build responsive, reliable digital solutions.</h2>
          <p>
            Established professional web experience, practical modern-stack projects
            and skills I am actively developing are distinguished below.
          </p>
        </div>

        <div className="row g-4">
          {skillGroups.map((group) => (
            <div className="col-lg-6" key={group.title}>
              <div className="content-card skill-card h-100 reveal-on-scroll">
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    <i className={group.icon}></i>
                  </div>
                  <h3>{group.title}</h3>
                </div>
                <p className="skill-context">{group.context}</p>

                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
