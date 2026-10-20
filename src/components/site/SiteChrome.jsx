import { useEffect, useRef, useState } from 'react'
import { professionalProfile } from '../../data/profile'
import { changeLanguage, focusSection, localizedPath } from '../../utils/navigation'
import ExternalLink from './ExternalLink'

function LanguageSwitch({ language, text }) {
  return (
    <div className="dc-language tw:flex tw:items-center" role="group" aria-label={text.language}>
      {['en', 'sv'].map((code) => (
        <button type="button" key={code} lang={code} aria-pressed={language === code}
          onClick={() => { if (code !== language) changeLanguage(code) }}>
          <span className="dc-language-full">{code === 'en' ? 'English' : 'Svenska'}</span>
          <span className="dc-language-short" aria-hidden="true">{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}

export function SiteHeader({ language, text, path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const menu = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    menu.current?.querySelector('a')?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const media = window.matchMedia('(min-width: 861px)')
    const closeOnDesktop = () => { if (media.matches) setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    media.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      media.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  function handleContact(event) {
    if (path !== '/') return
    event.preventDefault()
    setMenuOpen(false)
    window.history.replaceState(null, '', `${window.location.pathname}#contact`)
    requestAnimationFrame(() => focusSection('contact'))
  }

  const links = ['projects', 'experience', 'credentials', 'contact'].map((key) => (
    <a key={key} href={key === 'contact' ? `${localizedPath('/', language)}#contact` : localizedPath(`/${key}`, language)}
      aria-current={path === `/${key}` || path.startsWith(`/${key}/`) ? 'page' : undefined}
      onClick={key === 'contact' ? handleContact : undefined}>
      {text.nav[key]}
    </a>
  ))

  return (
    <>
      <a className="dc-skip" href="#main-content">{text.skip}</a>
      <header className="dc-header">
        <div className="dc-wrap tw:flex tw:items-center">
          <a className="dc-brand" href={localizedPath('/', language)}>Osman Osmani</a>
          <nav className="dc-desktop-nav tw:ml-auto" aria-label={text.navigation}>{links}</nav>
          <LanguageSwitch language={language} text={text} />
          <button type="button" ref={menuButton} className="dc-menu-button" aria-expanded={menuOpen}
            aria-controls="site-mobile-menu" onClick={() => setMenuOpen((current) => !current)}>
            {menuOpen ? text.close : text.menu}
          </button>
        </div>
        <nav ref={menu} id="site-mobile-menu" className="dc-mobile-nav" hidden={!menuOpen} aria-label={text.navigation}>{links}</nav>
      </header>
    </>
  )
}

export function SiteFooter({ language, text, projectCount }) {
  return (
    <footer className="dc-footer">
      <div className="dc-wrap tw:flex tw:flex-wrap tw:items-center tw:gap-x-7 tw:gap-y-2">
        <p><strong>Osman Osmani</strong> · {text.footer}</p>
        <nav className="tw:flex tw:flex-wrap tw:gap-x-5" aria-label={text.footerNav}>
          <a href={localizedPath('/projects', language)}>{text.allProjects} ({projectCount})</a>
          <ExternalLink href={professionalProfile.linkedin} newTabText={text.newTab}>LinkedIn</ExternalLink>
          <ExternalLink href="https://github.com/osmanosmani" newTabText={text.newTab}>GitHub</ExternalLink>
        </nav>
        <LanguageSwitch language={language} text={text} />
      </div>
    </footer>
  )
}
