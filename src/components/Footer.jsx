import { professionalProfile } from '../data/profile'

const footerLinks = [
  {
    label: 'LinkedIn',
    href: professionalProfile.linkedin,
    icon: 'bi bi-linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/osmanosmani',
    icon: 'bi bi-github',
  },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner reveal-on-scroll">
          <div>
            <h3>Osman Osmani</h3>
            <p>
              Experienced Web Developer expanding into modern frontend and
              full-stack development, with practical React, TypeScript and
              C#/.NET projects and foundational Azure certification.
            </p>
            <a href="/case-studies/digital-marketing" className="footer-case-link">
              Digital Marketing &amp; SEO Case Studies
            </a>
          </div>

          <div className="footer-links">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
