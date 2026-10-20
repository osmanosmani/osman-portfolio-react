import { useState } from 'react'
import { submitContactMessage } from '../utils/submitContactMessage'

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus('emailError')
      return
    }
    setIsSubmitting(true)
    setStatus('')
    try {
      await submitContactMessage(formData)
      setStatus('success')
      setFormData(emptyForm)
    } catch {
      // Keep the draft and avoid exposing raw provider or network errors.
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { formData, status, isSubmitting, handleChange, handleSubmit }
}
