import ProjectImage from './ProjectImage'
import { localizedPath } from '../utils/navigation'
import { digitalMarketingCaseStudies, supportingMarketingReferences } from '../data/caseStudies'

const featuredStudy = digitalMarketingCaseStudies.find((study) => study.results)
const featuredMetric = featuredStudy?.results.metrics[0]

function TagList({ items, label }) {
  return (
    <ul className="marketing-tags" aria-label={label}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function ResultsPanel({ studyId, results, compact = false }) {
  return (
    <section className={`marketing-results${compact ? ' marketing-results-compact' : ''}`} aria-labelledby={`${studyId}-results`}>
      <div className="marketing-subheading">
        <h3 id={`${studyId}-results`}>Documented results</h3>
        <span className="marketing-period">{results.period}</span>
      </div>
      <ul className="marketing-kpi-grid">
        {results.metrics.map((metric) => (
          <li key={metric.label} className={`marketing-kpi${metric.highlight ? ' is-highlight' : ''}`}>
            <span className="marketing-kpi-value">{metric.value}</span>
            <span className="marketing-kpi-label">{metric.label}</span>
          </li>
        ))}
      </ul>
      {results.note && <p className="marketing-source-line">{results.note}</p>}
      <p className="marketing-source-line">{results.source}</p>
      {results.attribution && <p className="marketing-source-line">{results.attribution}</p>}
    </section>
  )
}

function EvidenceBlock({ studyId, evidence }) {
  return (
    <section className="marketing-evidence" aria-labelledby={`${studyId}-evidence`}>
      <div className="marketing-evidence-icon" aria-hidden="true"><i className="bi bi-journal-text"></i></div>
      <div className="marketing-evidence-body">
        <span className="section-kicker">{evidence.type}</span>
        <h3 id={`${studyId}-evidence`}>{evidence.publication}</h3>
        <p className="marketing-evidence-article">“{evidence.article}” · {evidence.pages}</p>
        <a href={evidence.url} className="marketing-evidence-link" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
          {evidence.linkLabel}
          <span className="visually-hidden"> (PDF, opens in a new tab)</span>
        </a>
        <p className="marketing-evidence-note">{evidence.note}</p>
      </div>
    </section>
  )
}

function SupportingDocument({ study }) {
  const report = study.supportingDocument
  const canOpen = report.available && (report.approvedForLocalIntegration || report.approvedForPublication)
  const highlights = report.highlightLabels.map((label) => study.results.metrics.find((metric) => metric.label === label)).filter(Boolean)

  return (
    <section className="marketing-documentation" aria-labelledby={`${study.id}-documentation`}>
      <h3 id={`${study.id}-documentation`}>Supporting Documentation</h3>
      <div className="marketing-document-card">
        <div className="marketing-document-icon" aria-hidden="true"><i className="bi bi-file-earmark-pdf"></i></div>
        <div className="marketing-document-body">
          <h4>{report.title}</h4>
          <p className="marketing-document-description">{report.description}</p>
          <ul className="marketing-document-meta" aria-label="Report details">
            <li>{report.format}</li><li>{report.pages} pages</li><li>English</li>
          </ul>
          <ul className="marketing-document-highlights" aria-label="Historical KPI highlights">
            {highlights.map((metric) => <li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}
          </ul>
          <p className="marketing-source-line">{report.attribution}</p>
        </div>
        <div className="marketing-document-action">
          {canOpen ? (
            <a href={report.path} target="_blank" rel="noopener noreferrer" className="marketing-report-button">
              View Full Report (PDF)<i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            <>
              <button type="button" className="marketing-report-button" disabled aria-describedby={`${study.id}-report-status`}>View Full Report (PDF)</button>
              <p id={`${study.id}-report-status`} className="marketing-source-line">Report not yet available.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function CaseStudy({ study, index, language }) {
  const titleId = `${study.id}-title`

  return (
    <article id={study.id} className="content-card marketing-case reveal-on-scroll" aria-labelledby={titleId}>
      <header className="marketing-case-header">
        <span className="marketing-case-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <span className="section-kicker">{study.context}</span>
          <h2 id={titleId}>{study.title}</h2>
          <dl className="marketing-identity">
            <div><dt>Role</dt><dd>{study.role}</dd></div>
            <div><dt>Period</dt><dd>{study.period}</dd></div>
          </dl>
        </div>
      </header>

      <div className="row g-4 align-items-start">
        <div className="col-xl-5">
          <figure className="marketing-figure">
            <div className="portfolio-image-wrap">
              <ProjectImage src={study.project.image} alt={study.imageAlt} />
            </div>
            <figcaption>{study.imageCaption}</figcaption>
          </figure>
          <a href={localizedPath(study.project.caseStudyUrl, language)} className="project-link marketing-project-link">
            <i className="bi bi-code-slash" aria-hidden="true"></i> Website development project
          </a>
        </div>

        <div className="col-xl-7">
          <section className="marketing-block" aria-labelledby={`${study.id}-background`}>
            <h3 id={`${study.id}-background`}>Background</h3>
            <p>{study.background}</p>
          </section>
          <section className="marketing-block" aria-labelledby={`${study.id}-actions`}>
            <h3 id={`${study.id}-actions`}>My responsibilities &amp; actions</h3>
            <ul className="marketing-actions">
              {study.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <TagList items={study.tools} label="Platforms and methods" />
          </section>
        </div>
      </div>

      {study.results && <ResultsPanel studyId={study.id} results={study.results} />}
      {study.additionalResults?.map((results, resultIndex) => (
        <ResultsPanel key={results.period} studyId={`${study.id}-${resultIndex + 1}`} results={results} />
      ))}
      {study.evidence && <EvidenceBlock studyId={study.id} evidence={study.evidence} />}
      {study.supportingDocument && <SupportingDocument study={study} />}
    </article>
  )
}

function DigitalMarketingCaseStudies({ language = 'en' }) {
  return (
    <section className="project-page section marketing-page">
      <div className="container">
        <div className="project-page-header">
          <a href={localizedPath('/projects', language)} className="project-breadcrumb"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Portfolio</a>
        </div>

        <header className="content-card project-page-card marketing-intro reveal-on-scroll">
          <div className="row g-4 align-items-center">
            <div className={featuredMetric ? 'col-xl-8' : 'col-12'}>
              <span className="section-kicker">Complementary experience</span>
              <h1>Digital Marketing &amp; SEO Case Studies</h1>
              <p className="marketing-intro-lead">
                Real projects, documented historical results and professional experience in digital communication, website management and online growth.
              </p>
              <p className="marketing-intro-context">
                <i className="bi bi-code-square" aria-hidden="true"></i>
                Alongside my core work as a frontend and full-stack developer.
              </p>
            </div>
            {featuredMetric && (
              <div className="col-xl-4">
                <a href={`#${featuredStudy.id}`} className="marketing-intro-highlight">
                  <span className="marketing-kpi-value">{featuredMetric.value}</span>
                  <span className="marketing-kpi-label">{featuredMetric.label}, {featuredStudy.navLabel} ({featuredStudy.results.period})</span>
                </a>
              </div>
            )}
          </div>
          <nav className="marketing-case-nav" aria-label="Case studies on this page">
            {digitalMarketingCaseStudies.map((study) => (
              <a key={study.id} href={`#${study.id}`}>{study.navLabel}</a>
            ))}
            <a href="#supporting-work">Supporting Work</a>
          </nav>
        </header>

        {digitalMarketingCaseStudies.map((study, index) => <CaseStudy key={study.id} study={study} index={index} language={language} />)}

        <section id="supporting-work" className="marketing-supporting reveal-on-scroll" aria-labelledby="supporting-work-title">
          <h2 id="supporting-work-title">Supporting Work</h2>
          <div className="row g-3">
            {supportingMarketingReferences.map((reference) => (
              <div key={reference.id} className="col-md-6">
                <article className="marketing-reference" aria-labelledby={`${reference.id}-title`}>
                  <h3 id={`${reference.id}-title`}>{reference.title}</h3>
                  <p className="marketing-reference-focus">{reference.focus}</p>
                  <p>{reference.summary}</p>
                  <TagList items={reference.tags} label="Focus areas" />
                  {reference.results && <ResultsPanel studyId={reference.id} results={reference.results} compact />}
                </article>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default DigitalMarketingCaseStudies
