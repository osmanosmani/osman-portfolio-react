// Resolve from the deployment base, never from /sv or a case-study pathname.
export function contactApiUrl({ origin, hostname, port }, base = '/', override = '') {
  if (override) return new URL(override, origin).href
  if (['localhost', '127.0.0.1'].includes(hostname) && port && !['80', '443'].includes(port)) {
    return 'http://localhost/profilo/osman-portfolio-react/api/contact.php'
  }
  return new URL(`${base.replace(/\/?$/, '/')}api/contact.php`, origin).href
}
