import { useState } from 'react'
import { contactApiUrl } from '../utils/contactApi'

const emptyForm = { name: '', email: '', subject: '', message: '' }

export default function useContactForm() {
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setStatus('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return
    if (Object.values(formData).some((value) => !value.trim())) {
      setStatus('requiredError')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('emailError')
      return
    }
    setIsSubmitting(true)
    setStatus('')
    try {
      const response = await fetch(contactApiUrl(window.location, import.meta.env.BASE_URL, import.meta.env.VITE_CONTACT_API_URL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(20000),
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error('Contact request failed')
      setStatus('success')
      setFormData(emptyForm)
    } catch {
      // Keep the draft and avoid exposing server configuration or SMTP errors.
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { formData, status, isSubmitting, handleChange, handleSubmit }
}
