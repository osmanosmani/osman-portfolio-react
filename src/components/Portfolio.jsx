import berishaGroupImage from '../assets/BerishaGroup.jpg'
import chilloutHouseImage from '../assets/Chillouthouse.jpg'
import kosovoPoliceImage from '../assets/KosovoPolice.jpg'

const portfolioItems = [
  {
    category: 'Government Website',
    year: '2012-2020',
    title: 'Kosovo Police Official Site',
    description:
      'Managed the official Kosovo Police website and internal platforms, focusing on security, stability, and accessibility.',
    image: kosovoPoliceImage,
  },
  {
    category: 'Corporate Website',
    year: '2010-2019',
    title: 'Berisha Group Web Presence',
    description:
      'Built and maintained the corporate website and digital ecosystem while managing backend systems and online marketing activities.',
    image: berishaGroupImage,
  },
  {
    category: 'Freelance Web',
    year: '2020-Present',
    title: 'Chillout House Project',
    description:
      'Delivered customer-focused websites with SEO, performance optimisation, and ongoing maintenance.',
    image: chilloutHouseImage,
  },
]

function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-heading reveal-on-scroll">
          <span className="section-kicker">Portfolio</span>
          <h2>Selected web projects and digital solutions from my work history.</h2>
        </div>

        <div className="row g-4">
          {portfolioItems.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.title}>
              <article className="content-card portfolio-card reveal-on-scroll">
                <div className="portfolio-image-wrap">
                  <img src={item.image} alt={item.title} className="portfolio-image" />
                </div>
                <div className="portfolio-meta">
                  <span className="portfolio-category">{item.category}</span>
                  <span className="portfolio-year">{item.year}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
