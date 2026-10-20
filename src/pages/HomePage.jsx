import portrait from '../assets/profile-hero.webp'
import { projects, primaryFeaturedProject } from '../data/projects'
import { localizedPath, focusSection } from '../utils/navigation'
import ProjectPreview from '../components/site/ProjectPreview'
import ExternalLink from '../components/site/ExternalLink'
import HomeContact from '../components/site/HomeContact'
import MarketingHighlights from '../components/site/MarketingHighlights'

const previewProjects = projects.filter((project) => project.homePreview).sort((a, b) => a.homePreview.order - b.homePreview.order)

export default function HomePage({ language, text }) {
  const flagship = primaryFeaturedProject
  const landing = flagship.homePreview.secondary
  const roleMeta = [
    ['2026', 'Qualipro'], [`2020 – ${text.present}`, text.selfEmployed],
    ['2012 – 2020', 'Kosovo Police'], ['2010 – 2019', 'Berisha Group'],
  ]
  return (
    <>
      <section id="hero" className="dc-hero" aria-labelledby="home-title">
        <div className="dc-wrap dc-hero-grid">
          <div className="dc-enter">
            <p className="dc-eyebrow">{text.kicker}</p>
            <h1 id="home-title" className="dc-display-name">Osman Osmani</h1>
            <p className="dc-lead">{text.intro}</p>
            <div className="dc-hero-actions tw:flex tw:flex-wrap tw:gap-3">
              <a className="dc-button dc-button-primary" href={localizedPath('/projects', language)}>{text.viewProjects} <span aria-hidden="true">&rarr;</span></a>
              <a className="dc-button dc-button-secondary" href="#contact" onClick={(event) => { event.preventDefault(); focusSection('contact'); window.history.replaceState(null, '', `${window.location.pathname}#contact`) }}>{text.contactMe}</a>
            </div>
            <div className="dc-byline tw:flex tw:items-center tw:gap-4">
              <img src={portrait} alt="Osman Osmani" width="64" height="80" decoding="async" />
              <p><strong>{text.location}</strong>{text.availability}<br />{text.apl}<br /><a className="dc-credential-link" href={`${localizedPath('/credentials', language)}#azure-certification`}>{text.azureCredential}</a></p>
            </div>
          </div>
          <ProjectPreview projects={previewProjects} projectCount={projects.length} language={language} text={text} />
        </div>
      </section>
      <section className="dc-flagship" aria-labelledby="flagship-title">
        <div className="dc-wrap dc-flagship-grid">
          <figure className="dc-frame dc-flagship-image">
            <div className="dc-browser-bar" aria-hidden="true"><i /><i /><i /><span>NordicWebHub · {text.publicLanding}</span></div>
            <div className="dc-screenshot-window">
              <img src={landing.src} width={landing.width} height={landing.height} loading="lazy" decoding="async" alt={`NordicWebHub · ${text.publicLanding}`}
                style={{ '--preview-width': '952px', '--preview-x': '-170px', '--preview-y': '-40px' }} />
            </div>
          </figure>
          <div>
            <p className="dc-eyebrow">{text.flagship} · {text.ongoing} · {flagship.year}</p>
            <h2 id="flagship-title" className="dc-display-project">{flagship.shortTitle}</h2>
            <p className="dc-project-summary">{text.summary}</p>
            <ol className="dc-highlights" role="list">{text.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ol>
            <p className="dc-stack"><strong>{text.stack}</strong> React · TypeScript · ASP.NET Core · EF Core · SQL Server</p>
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-6 tw:gap-y-2">
              <a className="dc-button dc-button-primary" href={localizedPath(flagship.caseStudyUrl, language)}>{text.readCase} <span aria-hidden="true">&rarr;</span></a>
              {flagship.isLive && flagship.liveUrl ? <ExternalLink href={flagship.liveUrl} newTabText={text.newTab}>{text.liveDemo}</ExternalLink> : <span>{text.demoSoon}</span>}
              {flagship.githubUrl && <ExternalLink href={flagship.githubUrl} newTabText={text.newTab}>GitHub</ExternalLink>}
            </div>
          </div>
        </div>
      </section>
      <MarketingHighlights language={language} text={text} />
      <section className="dc-background" aria-labelledby="background-heading">
        <div className="dc-wrap dc-background-grid">
          <div><h2 id="background-heading">{text.background}</h2><p className="dc-muted dc-background-intro">{text.backgroundIntro}</p>
            <a className="dc-text-link" href={localizedPath('/experience', language)}>{text.fullExperience} <span aria-hidden="true">&rarr;</span></a>
          </div>
          <ol className="dc-role-list" role="list">{text.roles.map((role, index) => (
            <li key={index}><span className="dc-role-year">{roleMeta[index][0]}</span><strong>{role}</strong><span className="dc-role-company">{roleMeta[index][1]}</span></li>
          ))}</ol>
        </div>
      </section>
      <HomeContact text={text} />
    </>
  )
}
