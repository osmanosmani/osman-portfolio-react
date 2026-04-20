const skillGroups = [
  {
    title: 'Frontend Development',
    icon: 'bi bi-window',
    items: ['JavaScript', 'React', 'Vue', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    title: 'Backend & Data',
    icon: 'bi bi-hdd-stack',
    items: ['C#/.NET', 'PHP', 'MySQL', 'SQL Server', 'ADO.NET', 'Transact-SQL', 'REST APIs'],
  },
  {
    title: 'Digital Delivery',
    icon: 'bi bi-rocket-takeoff',
    items: ['SEO', 'Performance Optimisation', 'Hosting', 'Website Maintenance', 'Analytics', 'Content Management'],
  },
  {
    title: 'Operations & Support',
    icon: 'bi bi-shield-check',
    items: ['System Security', 'Technical Support', 'Testing', 'Training', 'Network Administration', 'IT Support'],
  },
]

function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Skills</span>
          <h2>Practical tools and technologies used to build stable digital solutions.</h2>
          <p>
            A practical mix of web development, databases, SEO, and digital delivery
            built through more than ten years of hands-on experience.
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
