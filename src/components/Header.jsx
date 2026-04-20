import { useEffect, useState } from 'react'
import profileSidebar from '../assets/profile-sidebar.webp'

const navItems = [
  { href: '#hero', label: 'Home', icon: 'bi bi-house' },
  { href: '#about', label: 'About', icon: 'bi bi-person' },
  { href: '#skills', label: 'Skills', icon: 'bi bi-lightning-charge' },
  { href: '#resume', label: 'Experience', icon: 'bi bi-file-earmark-text' },
  { href: '#portfolio', label: 'Portfolio', icon: 'bi bi-images' },
  { href: '#contact', label: 'Contact', icon: 'bi bi-envelope' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const [pendingSection, setPendingSection] = useState('')

  const scrollToSection = (href) => {
    const target = document.querySelector(href)

    if (!target) {
      return
    }

    const headerOffset = window.innerWidth < 1200 ? 24 : 0
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })

    window.history.replaceState(null, '', href)
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.replace('#', '')))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (current?.target?.id) {
          setActiveSection(`#${current.target.id}`)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -45% 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)

    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  useEffect(() => {
    if (!pendingSection || isMenuOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      scrollToSection(pendingSection)
      setPendingSection('')
    }, 60)

    return () => window.clearTimeout(timeoutId)
  }, [isMenuOpen, pendingSection])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (event, href) => {
    event.preventDefault()
    setActiveSection(href)
    setPendingSection(href)

    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      scrollToSection(href)
      setPendingSection('')
    }
  }

  return (
    <>
      <button
        type="button"
        className={`mobile-nav-toggle ${isMenuOpen ? 'active' : ''}`}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      <button
        type="button"
        className={`mobile-nav-backdrop ${isMenuOpen ? 'active' : ''}`}
        aria-label="Close navigation"
        onClick={() => setIsMenuOpen(false)}
      ></button>

      <header
        id="header"
        className={`header dark-background d-flex flex-column justify-content-between ${isMenuOpen ? 'menu-open' : ''}`}
      >
        <div className="header-top">
          <div className="profile-img">
            <img
              src={profileSidebar}
              alt="Osman Osmani"
              className="img-fluid"
            />
          </div>

          <a
            href="#hero"
            className="logo d-flex align-items-center justify-content-center"
            onClick={(event) => handleNavClick(event, '#hero')}
          >
            <h1 className="sitename">Osman Osmani</h1>
          </a>
        </div>

        <nav id="navmenu" className="navmenu">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href ? 'active' : ''}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  <i className={`${item.icon} navicon`}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="social-links text-center">
          <a href="https://www.linkedin.com" className="linkedin" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://github.com/osmanosmani" className="github" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://www.facebook.com/osman.osmani" className="facebook" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="mailto:osmanosmani@gmail.com" className="envelope">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </header>
    </>
  )
}

export default Header
