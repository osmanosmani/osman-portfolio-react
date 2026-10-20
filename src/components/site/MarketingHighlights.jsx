import { digitalMarketingCaseStudies, digitalMarketingPage } from '../../data/caseStudies'
import { localizedPath } from '../../utils/navigation'

export default function MarketingHighlights({ language, text }) {
  const caseStudiesPath = localizedPath(digitalMarketingPage.path, language)

  return (
    <section id="marketing" className="dc-marketing" aria-labelledby="marketing-heading">
      <div className="dc-wrap">
        <div className="dc-marketing-heading">
          <div>
            <p className="dc-eyebrow">{text.marketingKicker}</p>
            <h2 id="marketing-heading">{text.marketingTitle}</h2>
            <p className="dc-muted">{text.marketingIntro}</p>
          </div>
          <a className="dc-text-link dc-accent-link" href={caseStudiesPath}>{text.exploreMarketing} <span aria-hidden="true">&rarr;</span></a>
        </div>
        <ul className="dc-marketing-grid" role="list">
          {digitalMarketingCaseStudies.map((study) => (
            <li key={study.id}>
              <a className="dc-marketing-card" href={`${caseStudiesPath}#${study.id}`}>
                <img src={study.project.image} alt="" width="640" height="360" loading="lazy" decoding="async" />
                <div className="dc-marketing-card-body">
                  <span className="dc-marketing-period">{study.period}</span>
                  <h3>{study.navLabel}<span aria-hidden="true">&rarr;</span></h3>
                  <p>{text.marketingContexts[study.id]}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
