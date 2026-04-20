const footerLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: 'bi bi-linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/osmanosmani',
    icon: 'bi bi-github',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/osman.osmani',
    icon: 'bi bi-facebook',
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
              Full Stack Developer and Software Engineer focused on secure and
              performant web systems.
            </p>
          </div>

          <div className="footer-links">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
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
