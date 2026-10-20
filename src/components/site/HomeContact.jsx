import useContactForm from '../../hooks/useContactForm'
import { professionalProfile } from '../../data/profile'
import ExternalLink from './ExternalLink'

export default function HomeContact({ text }) {
  const { formData, status, isSubmitting, handleChange, handleSubmit } = useContactForm()
  return (
    <section id="contact" className="dc-contact" aria-labelledby="contact-heading">
      <div className="dc-wrap">
        <div className="dc-contact-grid">
          <div>
            <h2 id="contact-heading" tabIndex={-1}>{text.nav.contact}</h2>
            <p className="dc-muted dc-contact-intro">{text.contactIntro}</p>
            <ul className="dc-contact-details" role="list">
              <li><span>{text.email}</span><a href="mailto:osmanosmani@gmail.com">osmanosmani@gmail.com</a></li>
              <li><span>LinkedIn</span><ExternalLink href={professionalProfile.linkedin} newTabText={text.newTab}>linkedin.com/in/osman-osmani</ExternalLink></li>
              <li><span>GitHub</span><ExternalLink href="https://github.com/osmanosmani" newTabText={text.newTab}>github.com/osmanosmani</ExternalLink></li>
            </ul>
          </div>
          <form className="dc-contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
            {['name', 'email', 'subject', 'message'].map((name) => (
              <div key={name} className={`dc-field ${['subject', 'message'].includes(name) ? 'dc-field-wide' : ''}`}>
                <label htmlFor={`contact-${name}`}>{text[name]} <span>({text.required})</span></label>
                {name === 'message' ? (
                  <textarea id={`contact-${name}`} name={name} rows={5} required maxLength={10000} value={formData[name]} onChange={handleChange} disabled={isSubmitting} />
                ) : (
                  <input id={`contact-${name}`} type={name === 'email' ? 'email' : 'text'} name={name} required
                    maxLength={name === 'email' ? 254 : 150} autoComplete={name === 'subject' ? 'off' : name}
                    value={formData[name]} onChange={handleChange} disabled={isSubmitting} />
                )}
              </div>
            ))}
            {status && <p className={`dc-form-status dc-field-wide ${status === 'success' ? 'is-success' : 'is-error'}`} role={status === 'success' ? 'status' : 'alert'}>{text[status]}</p>}
            <div className="dc-field-wide tw:flex tw:flex-wrap tw:items-center tw:gap-x-5 tw:gap-y-3">
              <button type="submit" className="dc-button dc-button-primary" disabled={isSubmitting}>{isSubmitting ? text.sending : text.send}</button>
              <p className="dc-form-note">{text.formNote}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
