import { useState } from 'react'

const contactItems = [
  {
    label: 'Phone',
    value: '+46 70 794 9608',
    href: 'tel:+46707949608',
    icon: 'bi bi-telephone',
  },
  {
    label: 'Email',
    value: 'osmanosmani@gmail.com',
    href: 'mailto:osmanosmani@gmail.com',
    icon: 'bi bi-envelope',
  },
  {
    label: 'Website',
    value: 'www.osmanosmani.se',
    href: 'https://www.osmanosmani.se',
    icon: 'bi bi-globe',
  },
]

const getContactApiUrl = () => {
  if (typeof window === 'undefined') {
    return '/api/contact.php'
  }

  if (window.location.port === '5173') {
    return 'http://localhost/profilo/osman-portfolio-react/api/contact.php'
  }

  const segments = window.location.pathname.split('/').filter(Boolean)
  const cleanedSegments =
    segments.length > 0 && segments[segments.length - 1].includes('.')
      ? segments.slice(0, -1)
      : segments
  const basePath = cleanedSegments.length > 0 ? `/${cleanedSegments.join('/')}` : ''

  return `${window.location.origin}${basePath}/api/contact.php`
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { name, email, subject, message } = formData

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields before sending your message.',
      })
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch(getContactApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong while sending the message.')
      }

      setFormStatus({
        type: 'success',
        message: 'Your message has been sent successfully.',
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Message could not be sent.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Contact</span>
          <h2>Get in touch for collaboration, new roles, or technical projects.</h2>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="content-card contact-intro-card reveal-on-scroll">
              <h3>Let&apos;s Connect</h3>
              <p>
                Available for freelance work, consulting, and software
                development opportunities.
              </p>

              <div className="contact-list">
                {contactItems.map((item) => (
                  <div className="contact-item" key={item.label}>
                    <div className="contact-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <span className="contact-label">{item.label}</span>
                      <a href={item.href} target={item.label === 'Website' ? '_blank' : undefined} rel={item.label === 'Website' ? 'noreferrer' : undefined}>
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="content-card contact-form-card reveal-on-scroll">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="6"
                      placeholder="Write your message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {formStatus.message ? (
                    <div className="col-12">
                      <div className={`form-status ${formStatus.type}`}>{formStatus.message}</div>
                    </div>
                  ) : null}
                  <div className="col-12">
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
