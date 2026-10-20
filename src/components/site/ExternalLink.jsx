export default function ExternalLink({ href, children, label, className = 'dc-text-link', newTabText = 'opens in a new tab' }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children} <span aria-hidden="true">&#8599;</span>
      <span className="dc-sr"> ({newTabText})</span>
    </a>
  )
}
