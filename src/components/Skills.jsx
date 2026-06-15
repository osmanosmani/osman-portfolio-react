const skillGroups = [
  {
    title: 'Frontend Development',
    icon: 'bi bi-window',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: 'Backend & Data',
    icon: 'bi bi-hdd-stack',
    items: ['C#', '.NET', 'Entity Framework', 'LINQ', 'PHP', 'SQL Server', 'MySQL', 'REST APIs'],
  },
  {
    title: 'CMS / SEO / Digital Marketing',
    icon: 'bi bi-graph-up-arrow',
    items: ['WordPress', 'CMS Delivery', 'Technical SEO', 'Google Analytics', 'Content Management', 'Performance Optimisation'],
  },
  {
    title: 'Tools, Cloud & AI',
    icon: 'bi bi-cpu',
    items: ['Git', 'Azure DevOps', 'Azure AI Services', 'Chatbots', 'Agile / Scrum', 'Testing Methodology', 'Technical Documentation', 'Hosting & Deployment'],
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
            Frontend development is the main focus, supported by backend and
            database knowledge, CMS and SEO experience, and practical tooling
            used in real web delivery.
          </p>
        </div>

        <div className="row g-4">
          {skillGroups.map((group) => (
            <div className="col-lg-6" key={group.title}>
              <div className="content-card skill-card reveal-on-scroll">
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    <i className={group.icon}></i>
                  </div>
                  <h3>{group.title}</h3>
                </div>

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
