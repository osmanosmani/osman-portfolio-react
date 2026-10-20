import test from 'node:test'
import assert from 'node:assert/strict'
import { localizedPath, resolveLocation, legacyHashDestination } from '../src/utils/navigation.js'
import { contactApiUrl } from '../src/utils/contactApi.js'

test('English and Swedish paths retain case-study slugs', () => {
  assert.deepEqual(resolveLocation('/sv/projects/cinescope/'), { path: '/projects/cinescope', language: 'sv' })
  assert.deepEqual(resolveLocation('/sv/'), { path: '/', language: 'sv' })
  assert.deepEqual(resolveLocation('/projects/cinescope'), { path: '/projects/cinescope', language: 'en' })
  assert.equal(localizedPath('/projects/nordicwebhub', 'sv'), '/sv/projects/nordicwebhub')
  assert.equal(localizedPath('/', 'sv'), '/sv/')
})

test('old sidebar URLs continue to reach their content', () => {
  assert.equal(legacyHashDestination('/', '#portfolio'), '/projects')
  assert.equal(legacyHashDestination('/sv/', '#skills'), '/sv/experience#skills')
  assert.equal(legacyHashDestination('/', '#azure-certification'), '/credentials#azure-certification')
  assert.equal(legacyHashDestination('/', '#contact'), null)
  assert.equal(legacyHashDestination('/projects/cinescope', '#about'), null)
})

test('contact endpoint is independent of locale and project route', () => {
  const location = { origin: 'https://osmanosmani.se', hostname: 'osmanosmani.se', port: '', pathname: '/sv/projects/cinescope' }
  assert.equal(contactApiUrl(location), 'https://osmanosmani.se/api/contact.php')
  assert.equal(contactApiUrl(location, '/portfolio/'), 'https://osmanosmani.se/portfolio/api/contact.php')
  assert.equal(contactApiUrl(location, '/', 'https://example.test/contact'), 'https://example.test/contact')
  assert.equal(contactApiUrl({ origin: 'http://127.0.0.1:5173', hostname: '127.0.0.1', port: '5173' }), 'http://localhost/profilo/osman-portfolio-react/api/contact.php')
})
