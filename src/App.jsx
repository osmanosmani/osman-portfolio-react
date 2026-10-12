import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import DigitalMarketingCaseStudies from './components/DigitalMarketingCaseStudies'
import { digitalMarketingPage } from './data/caseStudies'
import { findProjectByPath } from './data/projects'
import { professionalProfile } from './data/profile'

function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const currentProject = findProjectByPath(pathname)
  const isProjectPage = pathname.startsWith('/projects/')
  const isMarketingPage = pathname.replace(/\/+$/, '') === digitalMarketingPage.path

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const title = isMarketingPage ? digitalMarketingPage.title : currentProject
      ? `${currentProject.title} | Osman Osmani`
      : professionalProfile.title
    const description = isMarketingPage ? digitalMarketingPage.description : currentProject
      ? `${currentProject.title} case study in the portfolio of Osman Osmani, covering project scope, screenshots, technology choices, and delivery context.`
      : professionalProfile.description

    document.title = title

    const descriptionMeta = document.querySelector('meta[name="description"]')
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]')
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]')
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]')
    const canonicalLink = document.querySelector('link[rel="canonical"]')

    descriptionMeta?.setAttribute('content', description)
    ogTitleMeta?.setAttribute('content', title)
    ogDescriptionMeta?.setAttribute('content', description)
    twitterTitleMeta?.setAttribute('content', title)
    twitterDescriptionMeta?.setAttribute('content', description)

    if (canonicalLink) {
      const canonicalPath = isMarketingPage ? digitalMarketingPage.path : currentProject?.caseStudyUrl ?? '/'
      canonicalLink.setAttribute('href', `https://osmanosmani.se${canonicalPath}`)
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://osmanosmani.se${canonicalPath}`)
    }
  }, [currentProject, isMarketingPage])

  return (
    <>
      <Header isProjectPage={isProjectPage || isMarketingPage} />

      <main className="main">
        {isMarketingPage ? (
          <DigitalMarketingCaseStudies />
        ) : isProjectPage ? (
          <ProjectCaseStudy project={currentProject} />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Resume />
            <Portfolio />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
