import { findProjectByPath } from './projects'

export const digitalMarketingPage = {
  path: '/case-studies/digital-marketing',
  title: 'Digital Marketing & SEO Case Studies | Osman Osmani',
  description: 'Digital marketing and SEO case studies by web developer Osman Osmani: Kosovo Police institutional website growth, Berisha Group multi-channel marketing and Chillouthouse SEO campaigns.',
}

// Each study renders only the sections that have content:
// - `results`: supplied historical metrics with their exact period and source.
// - `evidence`: public source references. Leave null until approved.
// Preserve supplied approximations; never invent figures or publish private reports.
export const digitalMarketingCaseStudies = [
  {
    id: 'kosovo-police',
    navLabel: 'Kosovo Police',
    title: 'Kosovo Police — Institutional Digital Communications',
    context: 'Public sector · Institutional communications',
    period: '2012–2020',
    role: 'Web Developer / Webmaster',
    project: findProjectByPath('/projects/kosovo-police-official-site'),
    imageAlt: 'Screenshot of the official Kosovo Police website',
    imageCaption: 'Official website, shown for context.',
    background: 'The official website is a primary channel for public information, news and institutional communication. It needed to stay reliable, secure and current while serving a growing public audience.',
    responsibilities: [
      'Developed and maintained the official website and internal web platforms.',
      'Managed day-to-day publishing of news and institutional content as webmaster.',
      'Supported public-facing services with a focus on stability and security.',
      'Worked within the institutional team on official digital communication.',
    ],
    tools: ['WordPress', 'PHP', 'JavaScript', 'HTML & CSS'],
    results: {
      period: '2017 → 2018',
      metrics: [
        { value: '+164.94%', label: 'Website visits growth', highlight: true },
        { value: '+238.76%', label: 'Pageviews growth', highlight: true },
        { value: '355,703', label: 'Website visits in 2018' },
        { value: '134,260', label: 'Website visits in 2017' },
      ],
      source: 'Source: Kosovo Police, Protector Magazine No. 9 (2019), pp. 20–21. Figures represent institutional website performance.',
    },
    evidence: {
      type: 'Official publication',
      publication: 'Kosovo Police — Protector Magazine, Issue No. 9 (2019)',
      article: 'The Official Website of Kosovo Police',
      pages: 'Pages 20–21',
      url: 'https://www.kosovopolice.com/wp-content/uploads/2019/10/MBROJTESI_Nr._9_-_ANGLISHT_PER_SHTYP.pdf#page=20',
      linkLabel: 'View Official Publication — Page 20',
      note: 'The article spans pages 20–21. Some PDF viewers ignore the page link and open at page 1.',
    },
  },
  {
    id: 'berisha-group',
    navLabel: 'Berisha Group',
    title: 'Berisha Group — Multi-Channel Digital Marketing',
    context: 'Corporate · Multi-channel marketing',
    period: '2010–2019',
    role: 'Full Stack Developer / Digital Specialist',
    project: findProjectByPath('/projects/berisha-group-web-presence'),
    imageAlt: 'Screenshot of the Berisha Group corporate website',
    imageCaption: 'Corporate website, shown for context.',
    background: 'A growing company needed one consistent online presence across its website and social channels to present its projects and reach clients.',
    responsibilities: [
      'Built and maintained the corporate website and its database-backed content.',
      'Managed Facebook and Instagram channels and ongoing digital communication.',
      'Coordinated paid social campaigns for company projects.',
      'Produced photography, visual content and video for web and social media.',
      'Presented company projects online with SEO and technical optimisation.',
    ],
    tools: ['PHP & databases', 'Facebook', 'Instagram', 'Paid social', 'Photo & video'],
    supportingDocument: {
      title: 'Digital Marketing & Online Presence',
      description: 'Historical Digital Marketing Case Study, 2018–2019',
      format: 'PDF',
      pages: 6,
      path: '/reports/berisha-group-digital-marketing.pdf',
      // Reviewed PDF supplied by the user; enabled for local integration only.
      available: true,
      approvedForLocalIntegration: true,
      approvedForPublication: false,
      highlightLabels: ['Facebook follower growth', 'Paid promotional campaigns', 'YouTube videos'],
      attribution: 'Historical figures from Osman Osmani’s 2018–2019 work report; activity metrics, not sales or sole individual attribution.',
    },
    results: {
      period: 'Approximately 2018–2019',
      metrics: [
        { value: '≈ +174%', label: 'Facebook follower growth', highlight: true },
        { value: '1,986 → 5,441', label: 'Facebook followers', highlight: true },
        { value: '≈ 28', label: 'Paid promotional campaigns' },
        { value: '745', label: 'Instagram followers' },
        { value: '152', label: 'Published Instagram posts' },
        { value: '21', label: 'YouTube videos' },
        { value: '≈ 1,789', label: 'Project photographs documented & organised' },
      ],
      note: 'Corporate website development and redesign included a new Bootstrap-based website in May 2019.',
      source: 'Source: historical Berisha Group work report, prepared by Osman Osmani, containing selected platform screenshots. Figures supplied by the report author.',
      attribution: 'Follower growth and campaign activity do not establish sales. Company outcomes are not attributed solely to one person.',
    },
    evidence: null,
  },
  {
    id: 'chillouthouse',
    navLabel: 'Chillouthouse',
    title: 'Chillouthouse — SEO & Digital Campaigns',
    context: 'Freelance client · SEO & campaigns',
    period: '2020–Present',
    role: 'Freelance Web Specialist',
    project: findProjectByPath('/projects/chillout-house-project'),
    imageAlt: 'Screenshot of the Chillouthouse website',
    imageCaption: 'Client website, shown for context.',
    background: 'A business that depends on being found online needed a well-performing website, local search visibility and active social channels, with reporting to show what works.',
    responsibilities: [
      'Developed the website and handle its ongoing management.',
      'Technical and on-page SEO: structure, metadata and performance.',
      'Set up and maintain the Google Business Profile for local search.',
      'Manage social media channels and Meta advertising campaigns.',
      'Prepare performance reports to guide campaign decisions.',
    ],
    tools: ['Technical SEO', 'Google Business Profile', 'Meta Ads', 'Analytics'],
    results: {
      period: 'October 2025 · Meta campaign example',
      metrics: [
        { value: '7,092', label: 'Ad views', highlight: true },
        { value: '5,410', label: 'People reached' },
        { value: '143', label: 'Link clicks', highlight: true },
        { value: '112', label: 'Landing-page views' },
        { value: 'SEK 208.13', label: 'Campaign spending' },
      ],
      source: 'Source: historical campaign screenshots and reporting, as supplied by Osman Osmani.',
      attribution: 'Campaign interaction metrics only; no verified bookings, customer acquisition or revenue outcomes are claimed.',
    },
    additionalResults: [{
      period: 'February 16–March 17, 2026 · Additional reporting period',
      metrics: [
        { value: '≈ 25,200', label: 'Meta views', highlight: true },
        { value: '738', label: 'Facebook link clicks', highlight: true },
      ],
      source: 'Source: historical campaign screenshots and reporting, as supplied by Osman Osmani. Separate reporting period from the October 2025 campaign.',
    }],
    evidence: null,
  },
]

export const supportingMarketingReferences = [
  {
    id: 'lannerbygg',
    title: 'Lannerbygg',
    focus: 'Website Management & Technical SEO',
    summary: 'WordPress management, technical SEO, website maintenance, updates and optimisation.',
    tags: ['WordPress', 'Technical SEO', 'Website maintenance'],
    results: {
      period: 'Historical 28-day snapshot · Dates not supplied',
      metrics: [
        { value: '32', label: 'Organic search clicks' },
        { value: '741', label: 'Impressions' },
        { value: '4.3%', label: 'Average CTR' },
      ],
      source: 'Source: historical Google Search Console reporting, as supplied by Osman Osmani.',
      attribution: 'A snapshot of search visibility, not evidence of growth or causal improvement without a comparison period.',
    },
  },
  {
    id: '2bico-saljpitch',
    title: '2bico / Säljpitch',
    focus: 'Technical SEO & Digital Optimisation',
    summary: 'Documented technical SEO, website analysis and optimisation responsibilities. No numerical performance claims are presented.',
    tags: ['Technical SEO', 'Performance'],
  },
]
