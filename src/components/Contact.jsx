import { useState } from 'react'
import { submitContactMessage } from '../utils/submitContactMessage'

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
    setFormStatus({ type: '', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const { name, email, subject, message } = formData

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all fields before sending your message.',
      })
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email.trim())) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      await submitContactMessage(formData)

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
    } catch {
      setFormStatus({
        type: 'error',
        message: 'We could not confirm your message was sent. Please email me directly using the link below. Your draft has been kept.',
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
                Available for freelance work, consulting, and technical
                collaboration.
              </p>
              <p className="contact-opportunity-line">
                Open to Web Developer, Frontend Developer, Full-Stack Developer
                and Web Application Developer opportunities. My professional
                web background is complemented by growing modern-stack project
                experience and current Qualipro APL.
              </p>

              <div className="contact-list">
                {contactItems.map((item) => (
                  <div className="contact-item" key={item.label}>
                    <div className="contact-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <span className="contact-label">{item.label}</span>
                      <a
                        href={item.href}
                        target={item.label === 'Website' ? '_blank' : undefined}
                        rel={item.label === 'Website' ? 'noopener noreferrer' : undefined}
                        aria-label={item.label === 'Website' ? 'Visit osmanosmani.se' : undefined}
                      >
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
              <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
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
                      autoComplete="name"
                      maxLength={150}
                      disabled={isSubmitting}
                      required
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
                      autoComplete="email"
                      maxLength={254}
                      disabled={isSubmitting}
                      required
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
                      maxLength={150}
                      disabled={isSubmitting}
                      required
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
                      maxLength={10000}
                      disabled={isSubmitting}
                      required
                    ></textarea>
                  </div>
                  {formStatus.message ? (
                    <div className="col-12">
                      <div
                        className={`form-status ${formStatus.type}`}
                        role={formStatus.type === 'error' ? 'alert' : 'status'}
                        aria-live="polite"
                      >
                        {formStatus.message}
                        {formStatus.type === 'error' && (
                          <> <a href="mailto:osmanosmani@gmail.com">Email osmanosmani@gmail.com</a></>
                        )}
                      </div>
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
