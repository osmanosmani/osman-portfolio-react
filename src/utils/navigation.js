export function resolveLocation(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const language = /^\/sv(?:\/|$)/.test(normalized) ? 'sv' : 'en'
  const path = language === 'sv' ? normalized.slice(3) || '/' : normalized
  return { path, language }
}

export function localizedPath(path, language) {
  return language === 'sv' ? `/sv${path === '/' ? '/' : path}` : path
}

export function legacyHashDestination(pathname, hash) {
  const { path, language } = resolveLocation(pathname)
  if (path !== '/') return null
  const destinations = {
    '#portfolio': '/projects',
    '#about': '/experience#about',
    '#skills': '/experience#skills',
    '#resume': '/experience#resume',
    '#azure-certification': '/credentials#azure-certification',
  }
  return destinations[hash] ? localizedPath(destinations[hash], language) : null
}

export function changeLanguage(language) {
  const { path } = resolveLocation(window.location.pathname)
  const url = `${localizedPath(path, language)}${window.location.search}${window.location.hash}`
  window.history.pushState(null, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function focusSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  const heading = target.querySelector('h1, h2') || target
  heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
}
