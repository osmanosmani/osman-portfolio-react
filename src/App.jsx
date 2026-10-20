import { useEffect, useSyncExternalStore } from 'react'
import HomePage from './pages/HomePage'
import { SiteHeader, SiteFooter } from './components/site/SiteChrome'
import About from './components/About'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import DigitalMarketingCaseStudies from './components/DigitalMarketingCaseStudies'
import { digitalMarketingPage } from './data/caseStudies'
import { projects, findProjectByPath } from './data/projects'
import { professionalProfile } from './data/profile'
import { homeContent } from './data/homeContent'
import { focusSection, localizedPath, resolveLocation } from './utils/navigation'

function subscribe(listener) {
  window.addEventListener('popstate', listener)
  return () => window.removeEventListener('popstate', listener)
}
const getPathname = () => window.location.pathname

function App() {
  const pathname = useSyncExternalStore(subscribe, getPathname, () => '/')
  const { path, language } = resolveLocation(pathname)
  const text = homeContent[language]
  const project = findProjectByPath(path)
  const isMarketingPage = path === digitalMarketingPage.path
  const section = { '/projects': 'projects', '/experience': 'experience', '/credentials': 'credentials' }[path]
  const isHome = path === '/'
  const notFound = !isHome && !section && !project && !isMarketingPage

  useEffect(() => {
    document.documentElement.lang = language
    const label = project?.title || (isMarketingPage ? digitalMarketingPage.title : section ? text.nav[section] : notFound ? text.notFound : '')
    const title = isMarketingPage ? digitalMarketingPage.title : label ? `${label} | Osman Osmani` : professionalProfile.title
    const description = project?.shortDescription || (isMarketingPage ? digitalMarketingPage.description : isHome ? text.intro : section ? text[`${section}Intro`] : text.notFoundText)
    document.title = title
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', title)
    }
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', description)
    }
    const canonical = `https://osmanosmani.se${localizedPath(path, language)}`
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
  }, [path, language, text, project, section, isHome, isMarketingPage, notFound])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) requestAnimationFrame(() => focusSection(id))
  }, [path])

  return (
    <div className="dc-root">
      <SiteHeader language={language} text={text} path={path} />
      <main id="main-content" tabIndex={-1}>
        {isHome ? <HomePage language={language} text={text} /> : (
          <>
            {section && <div className="dc-page-heading dc-wrap"><h1>{text.nav[section]}</h1><p>{text[`${section}Intro`]}</p></div>}
            {!notFound && language === 'sv' && <p className="dc-wrap dc-language-note">{text.englishContent}</p>}
            <div className="dc-legacy" lang="en">
              {section === 'projects' && <Portfolio language={language} />}
              {section === 'experience' && <><About /><Skills /><Resume /></>}
              {section === 'credentials' && <>
                <div className="dc-wrap"><p className="dc-credentials-note">Selected qualifications and training are listed below. Document copies are not published here; please <a className="dc-text-link" href={`${localizedPath('/', language)}#contact`}>get in touch</a> to discuss relevant credentials.</p></div>
                <Resume educationOnly />
              </>}
              {project && <ProjectCaseStudy project={project} language={language} />}
              {isMarketingPage && <DigitalMarketingCaseStudies language={language} />}
            </div>
            {notFound && <section className="dc-not-found dc-wrap"><h1>{text.notFound}</h1><p>{text.notFoundText}</p><a className="dc-button dc-button-primary" href={localizedPath('/', language)}>{text.backHome}</a></section>}
          </>
        )}
      </main>
      <SiteFooter language={language} text={text} projectCount={projects.length} />
    </div>
  )
}

export default App
