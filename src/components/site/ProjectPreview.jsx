import { useEffect, useRef, useState } from 'react'
import { localizedPath } from '../../utils/navigation'
import ExternalLink from './ExternalLink'

function ScreenshotDialog({ project, language, text, onDismiss, returnFocusRef }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const [actualSize, setActualSize] = useState(false)
  const preview = project.homePreview

  useEffect(() => {
    const element = dialog.current
    const opener = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [returnFocusRef])

  return (
    <dialog ref={dialog} className={`dc-dialog ${actualSize ? 'dc-actual-size' : ''}`} aria-labelledby="screenshot-title"
      onCancel={(event) => { event.preventDefault(); onDismiss() }}
      onClick={(event) => { if (event.target === event.currentTarget) onDismiss() }}>
      <div className="dc-dialog-bar tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <h2 id="screenshot-title">{text.screenshot}: {project.shortTitle}{preview.demo ? ` · ${text.demoData}` : ''}</h2>
        <button type="button" className="dc-small-button" aria-pressed={actualSize} onClick={() => setActualSize(!actualSize)}>
          {actualSize ? text.fitWidth : text.actualSize}
        </button>
        <ExternalLink href={preview.fullSrc} className="dc-small-button" newTabText={text.newTab}>{text.original}</ExternalLink>
        <button ref={closeButton} type="button" className="dc-small-button dc-dialog-close" onClick={onDismiss}>{text.close}</button>
      </div>
      <div className="dc-dialog-body" tabIndex={0} role="region" aria-label={text.screenshot}>
        <img src={preview.fullSrc} alt={preview.alt[language]} />
      </div>
    </dialog>
  )
}

export default function ProjectPreview({ projects, language, text, projectCount }) {
  const [windowOrder, setWindowOrder] = useState(() => [...projects.map((_, index) => index).slice(1), 0])
  const selectedIndex = windowOrder[windowOrder.length - 1]
  const [viewerOpen, setViewerOpen] = useState(false)
  const tabRefs = useRef([])
  const viewerButton = useRef(null)
  const project = projects[selectedIndex]
  const preview = project.homePreview

  function selectProject(index) {
    setWindowOrder((current) => current[current.length - 1] === index ? current : [...current.filter((item) => item !== index), index])
  }

  function handleTabKey(event, index) {
    let next
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % projects.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = projects.length - 1
    if (next === undefined) return
    event.preventDefault()
    selectProject(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="dc-project-preview dc-enter">
      <p className="dc-window-hint">{text.windowHint}</p>
      <div className="dc-window-stack" style={{ '--window-count': projects.length }}>
        <div className="dc-window-tabs" role="tablist" aria-label={text.previews} aria-orientation="vertical">
          {projects.map((item, index) => (
            <button type="button" role="tab" key={item.slug} ref={(element) => { tabRefs.current[index] = element }}
              id={`preview-tab-${item.slug}`} aria-label={item.shortTitle} aria-selected={index === selectedIndex} aria-controls="project-preview-panel"
              style={{ '--window-position': windowOrder.indexOf(index) }}
              tabIndex={index === selectedIndex ? 0 : -1} onClick={() => selectProject(index)} onKeyDown={(event) => handleTabKey(event, index)}>
              <span className="dc-window-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="dc-window-title">{item.shortTitle}</span>
              <span className="dc-window-context" aria-hidden="true">{item.homePreview.caption[language]}</span>
              {index === selectedIndex && <span className="dc-window-current" aria-hidden="true">{text.currentPreview}</span>}
            </button>
          ))}
        </div>
        <figure className="dc-frame dc-window-panel" id="project-preview-panel" role="tabpanel" aria-labelledby={`preview-tab-${project.slug}`}>
          <div key={project.slug} className="dc-screenshot-window">
            {preview.demo && <span className="dc-demo-badge">{text.demoData}</span>}
            <img src={preview.src} width={preview.width} height={preview.height} alt={preview.alt[language]}
              fetchPriority={selectedIndex === 0 ? 'high' : 'auto'} decoding="async"
              style={{ '--preview-width': `${preview.mobileWidth}px`, '--preview-x': `${preview.mobileX}px`, '--preview-y': `${preview.mobileY}px` }} />
          </div>
        </figure>
      </div>
      <div className="dc-preview-caption tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2">
        <span>{preview.caption[language]}{preview.demo && <> · <strong>{text.demoData}</strong></>}</span>
        <button ref={viewerButton} type="button" className="dc-small-button" onClick={() => setViewerOpen(true)}>
          {text.fullScreenshot}<span className="dc-sr">: {project.shortTitle}</span>
        </button>
      </div>
      <div className="dc-preview-links tw:flex tw:flex-wrap tw:justify-between tw:gap-x-4">
        <a className="dc-text-link" href={localizedPath(project.caseStudyUrl, language)}>{text.caseStudy}: {project.shortTitle} <span aria-hidden="true">&rarr;</span></a>
        <a className="dc-text-link dc-accent-link" href={localizedPath('/projects', language)}>{text.allProjects} ({projectCount}) <span aria-hidden="true">&rarr;</span></a>
      </div>
      {viewerOpen && <ScreenshotDialog project={project} language={language} text={text} onDismiss={() => setViewerOpen(false)} returnFocusRef={viewerButton} />}
    </div>
  )
}
