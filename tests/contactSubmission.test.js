import test from 'node:test'
import assert from 'node:assert/strict'
import { submitContactMessage } from '../src/utils/submitContactMessage.js'

const accessKey = 'test-public-form-key'
const draft = {
  name: 'Åsa Öberg',
  email: 'test@example.test',
  subject: 'Förfrågan',
  message: 'Hej Osman!\nEn andra rad.',
}

function mockFetch({ status = 200, body = { success: true } } = {}) {
  const calls = []
  const fetchImpl = async (...args) => {
    calls.push(args)
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  }
  return { calls, fetchImpl }
}

test('contact sends one normalized Web3Forms request without changing the draft', async () => {
  const { calls, fetchImpl } = mockFetch()
  const paddedDraft = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, ` ${value} `]))
  const original = { ...paddedDraft }

  await submitContactMessage(paddedDraft, { accessKey: ` ${accessKey} `, fetchImpl })

  assert.equal(calls.length, 1)
  const [url, options] = calls[0]
  assert.equal(url, 'https://api.web3forms.com/submit')
  assert.equal(options.method, 'POST')
  assert.equal(new Headers(options.headers).get('content-type'), null)
  assert.ok(options.body instanceof FormData)
  assert.deepEqual(Object.fromEntries(options.body), {
    access_key: accessKey,
    from_name: 'Osman Osmani Portfolio',
    ...draft,
    subject: `Portfolio Contact: ${draft.subject}`,
  })
  assert.ok(options.signal instanceof AbortSignal)
  assert.equal(options.signal.aborted, false)
  assert.deepEqual(paddedDraft, original)
})

test('a missing or blank public key prevents any service request', async () => {
  for (const key of ['', '   ', null, 12]) {
    const { calls, fetchImpl } = mockFetch()
    await assert.rejects(() => submitContactMessage(draft, { accessKey: key, fetchImpl }))
    assert.equal(calls.length, 0)
  }
})

test('invalid or missing visitor details prevent any service request', async () => {
  const invalidDrafts = [
    null,
    {},
    ...Object.keys(draft).flatMap((field) => [
      { ...draft, [field]: '' },
      { ...draft, [field]: ' \n ' },
      { ...draft, [field]: undefined },
      { ...draft, [field]: 12 },
    ]),
    { ...draft, email: 'not-an-email' },
    { ...draft, email: 'visitor @example.test' },
  ]
  for (const invalidDraft of invalidDrafts) {
    const { calls, fetchImpl } = mockFetch()
    await assert.rejects(() => submitContactMessage(invalidDraft, { accessKey, fetchImpl }))
    assert.equal(calls.length, 0)
  }
})

test('HTTP and service rejections are failures and are never retried', async () => {
  for (const response of [
    { status: 500, body: { success: true } },
    { status: 429, body: { success: false, message: 'Too many requests' } },
    { status: 200, body: { success: false } },
    { status: 200, body: { success: 'true' } },
    { status: 200, body: {} },
    { status: 200, body: null },
  ]) {
    const { calls, fetchImpl } = mockFetch(response)
    await assert.rejects(() => submitContactMessage(draft, { accessKey, fetchImpl }))
    assert.equal(calls.length, 1)
  }
})

test('non-JSON service responses fail without retrying', async () => {
  let requests = 0
  await assert.rejects(() => submitContactMessage(draft, {
    accessKey,
    fetchImpl: async () => {
      requests += 1
      return new Response('<html>Service unavailable</html>', { status: 200, headers: { 'Content-Type': 'text/html' } })
    },
  }))
  assert.equal(requests, 1)
})

test('network errors fail without retrying', async () => {
  let requests = 0
  await assert.rejects(() => submitContactMessage(draft, {
    accessKey,
    fetchImpl: async () => {
      requests += 1
      throw new TypeError('Failed to fetch')
    },
  }))
  assert.equal(requests, 1)
})

test('the 20-second timeout fails without retrying', async (t) => {
  const controller = new AbortController()
  let timeoutMs
  let requests = 0
  t.mock.method(AbortSignal, 'timeout', (duration) => {
    timeoutMs = duration
    return controller.signal
  })

  await assert.rejects(() => submitContactMessage(draft, {
    accessKey,
    fetchImpl: async (_url, { signal }) => {
      requests += 1
      assert.equal(signal, controller.signal)
      const error = new DOMException('The operation timed out', 'TimeoutError')
      controller.abort(error)
      throw error
    },
  }))
  assert.equal(timeoutMs, 20000)
  assert.equal(requests, 1)
})
