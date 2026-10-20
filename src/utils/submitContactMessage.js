import { web3FormsAccessKey } from '../data/contactConfig.js'

const endpoint = 'https://api.web3forms.com/submit'

export async function submitContactMessage(formData, {
  accessKey = web3FormsAccessKey,
  fetchImpl = globalThis.fetch,
} = {}) {
  if (!accessKey.trim()) throw new Error('Contact form is not configured.')

  const fields = ['name', 'email', 'subject', 'message']
  if (fields.some((field) => typeof formData[field] !== 'string' || !formData[field].trim())) {
    throw new Error('All fields are required.')
  }

  const { name, email, subject, message } = Object.fromEntries(
    fields.map((field) => [field, formData[field].trim()]),
  )
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email address.')

  const body = new FormData()
  Object.entries({
    access_key: accessKey.trim(),
    from_name: 'Osman Osmani Portfolio',
    name,
    email,
    subject: `Portfolio Contact: ${subject}`,
    message,
  }).forEach(([field, value]) => body.append(field, value))

  const response = await fetchImpl(endpoint, {
    method: 'POST',
    // Let the browser set the multipart boundary, as in Web3Forms' React example.
    body,
    signal: AbortSignal.timeout(20000),
  })

  // Do not retry automatically: a timed-out request may already have been accepted.
  const data = await response.json()
  if (!response.ok || data?.success !== true) throw new Error('Contact submission failed.')
}
