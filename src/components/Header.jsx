import { useCallback, useEffect, useState } from 'react'
import profileSidebar from '../assets/profile-sidebar.webp'
import { professionalProfile } from '../data/profile'

const navItems = [
  { href: '#hero', label: 'Home', icon: 'bi bi-house' },
  { href: '#about', label: 'About', icon: 'bi bi-person' },
  { href: '#skills', label: 'Skills', icon: 'bi bi-lightning-charge' },
  { href: '#resume', label: 'Experience', icon: 'bi bi-file-earmark-text' },
  { href: '#portfolio', label: 'Portfolio', icon: 'bi bi-images' },
  { href: '#contact', label: 'Contact', icon: 'bi bi-envelope' },
]

function Header({ isProjectPage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(isProjectPage ? '#portfolio' : '#hero')
  const [pendingSection, setPendingSection] = useState('')

  const scrollToSection = useCallback((href) => {
    if (isProjectPage) {
      window.location.assign(`/${href}`)
      return
    }

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
  }, [isProjectPage])

  useEffect(() => {
    if (isProjectPage) {
      return undefined
    }

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
  }, [isProjectPage])

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
  }, [isMenuOpen, pendingSection, scrollToSection])

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

    if (isProjectPage) {
      window.location.assign(`/${href}`)
      return
    }

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
        aria-controls="header"
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
              alt="Portrait of Osman Osmani"
              className="img-fluid"
            />
          </div>

          <a
            href={isProjectPage ? '/#hero' : '#hero'}
            className="logo d-flex align-items-center justify-content-center"
            onClick={(event) => handleNavClick(event, '#hero')}
            aria-label="Go to Home section"
          >
            <span className="sitename">Osman Osmani</span>
          </a>
        </div>

        <nav id="navmenu" className="navmenu">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={isProjectPage ? `/${item.href}` : item.href}
                  className={(isProjectPage ? '#portfolio' : activeSection) === item.href ? 'active' : ''}
                  aria-current={(isProjectPage ? '#portfolio' : activeSection) === item.href ? 'page' : undefined}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  <i className={`${item.icon} navicon`}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="social-links text-center">
          <a
            href={professionalProfile.linkedin}
            className="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com/osmanosmani"
            className="github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a href="mailto:osmanosmani@gmail.com" className="envelope" aria-label="Send email">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </header>
    </>
  )
}

export default Header
