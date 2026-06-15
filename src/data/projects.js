import berishaGroupImage from '../assets/BerishaGroup.jpg'
import chilloutHouseImage from '../assets/Chillouthouse.jpg'
import kosovoPoliceImage from '../assets/KosovoPolice.jpg'
import cinescopeHomepageImage from '../assets/projects/cinescope-homepage.png'
import lexicampBookingImage from '../assets/projects/lexicamp-booking.png'
import nackaByggpartnerImage from '../assets/projects/nacka-byggpartner.png'
import nordicWebHubPlaceholderImage from '../assets/projects/nordicwebhub-placeholder.svg'

export const defaultProjectImage = nordicWebHubPlaceholderImage
export const defaultProjectImageAlt = 'Project preview placeholder'

export const projects = [
  {
    id: 1,
    slug: 'nordicwebhub',
    type: 'featured',
    priority: 1,
    isFeatured: true,
    category: 'Full-Stack SaaS / Client Portal',
    year: '2025-Present',
    title: 'NordicWebHub',
    status: 'In progress',
    highlightLabel: 'Main Project',
    shortDescription:
      'Flagship full-stack web services management platform built as a client portal for small and medium-sized businesses, combining customer operations, support workflows, service management, and dashboard-driven business logic.',
    detail:
      'NordicWebHub is the main full-stack project in the portfolio and is designed as a structured client portal for digital service delivery. It combines secure authentication, role-based access, company-level data isolation, service packages, project requests, support tickets, maintenance logs, SEO reporting, service orders, payment status demo flows, and an AI Service Assistant. The project highlights practical backend architecture, API design, database structure, responsive frontend work, and real-world SaaS thinking.',
    image: defaultProjectImage,
    imageAlt: 'NordicWebHub platform preview placeholder',
    imagePosition: 'center center',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'ASP.NET Core Web API',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'ASP.NET Identity',
      'Cookie Authentication',
      'Role-based Authorization',
    ],
    keyFeatures: [
      'Authentication with Admin and Customer roles',
      'Protected routes and role-based authorization',
      'Admin and customer dashboards',
      'Service packages, project requests, and project tracking',
      'Support tickets, maintenance logs, and SEO reports',
      'Service orders and payment status demo',
      'AI Service Assistant and customer data isolation',
    ],
    githubUrl: '',
    liveUrl: '/projects/nordicwebhub',
    isLive: false,
    liveLabel: 'Demo soon',
  },
  {
    id: 2,
    slug: 'nacka-byggpartner',
    type: 'featured',
    priority: 2,
    isFeatured: true,
    category: 'Modern Business Website',
    year: '2026',
    title: 'Nacka Byggpartner',
    status: 'Completed',
    shortDescription:
      'Modern React-based business website for a construction company, focused on responsive design, clear service presentation, clean component structure, and production-ready frontend delivery.',
    detail:
      'Nacka Byggpartner is a modern business website created for a construction company with emphasis on professional presentation, responsive design, and structured frontend implementation. The project demonstrates practical work with React, Tailwind CSS, service-focused content layout, reusable sections, and deployment-oriented preparation for real-world business use.',
    image: nackaByggpartnerImage,
    imageAlt: 'Nacka Byggpartner website homepage screenshot',
    imagePosition: 'center top',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design', 'GitHub', 'Deployment'],
    keyFeatures: [
      'Modern landing page for a construction business',
      'Service-focused content structure and business presentation',
      'Responsive design for desktop and mobile',
      'Clean component-based frontend implementation',
    ],
    githubUrl: 'https://github.com/osmanosmani/Nacka-Byggpartner',
    liveUrl: '/projects/nacka-byggpartner',
    isLive: false,
    liveLabel: 'Live soon',
  },
  {
    id: 3,
    slug: 'cinescope',
    type: 'featured',
    priority: 3,
    isFeatured: true,
    category: 'Movie Web Application',
    year: '2026',
    title: 'CineScope',
    status: 'In progress',
    shortDescription:
      'Movie and cinema discovery web application focused on responsive browsing, film detail presentation, and a structured user experience for exploring movie content.',
    detail:
      'CineScope is a movie-focused web application built to present films in a clear, modern, and user-friendly way. The project is positioned around browsing movie content, viewing film details, and supporting a polished frontend experience suitable for entertainment-focused interfaces. It is a strong portfolio addition because it shows practical UI structure, content presentation, and application-style frontend thinking.',
    image: cinescopeHomepageImage,
    imageAlt: 'CineScope homepage screenshot showing the movie discovery interface',
    imagePosition: 'center top',
    techStack: ['React', 'Vite', 'JavaScript', 'Responsive UI', 'API-driven Content'],
    keyFeatures: [
      'Movie browsing and structured content presentation',
      'Dedicated film detail views and user-friendly navigation',
      'Responsive interface for desktop and mobile',
      'Component-based frontend organisation',
    ],
    githubUrl: 'https://github.com/osmanosmani/CineScope',
    liveUrl: '/projects/cinescope',
    isLive: false,
    liveLabel: 'Demo soon',
  },
  {
    id: 4,
    slug: 'lexicamp-booking',
    type: 'featured',
    priority: 4,
    isFeatured: true,
    category: 'Booking / Reservation Web Application',
    year: '2026',
    title: 'LexiCamp Booking',
    status: 'In progress',
    shortDescription:
      'Booking and reservation web application developed as a group project, with focus on booking flow, UI structure, data handling, and a user-friendly experience for accommodation scenarios.',
    detail:
      'LexiCamp Booking is a group-developed booking application built around camp and accommodation reservation flows. The project highlights practical work with booking-oriented UI, structured data handling, clear user journeys, and collaborative implementation. It broadens the portfolio by showing experience with product-style interfaces and reservation logic beyond standard business websites.',
    image: lexicampBookingImage,
    imageAlt: 'LexiCamp Booking homepage screenshot showing the camp reservation experience',
    imagePosition: 'center top',
    techStack: ['React', 'Vite', 'JavaScript', 'Responsive Design', 'Collaborative Development'],
    keyFeatures: [
      'Booking-oriented user flow and reservation structure',
      'User-friendly interface for accommodation scenarios',
      'Frontend data handling and reusable UI sections',
      'Group project collaboration and practical implementation',
    ],
    githubUrl: 'https://github.com/aLexicon99/LexiCamp-Booking',
    liveUrl: '/projects/lexicamp-booking',
    isLive: false,
    liveLabel: 'Live soon',
  },
  {
    id: 5,
    slug: 'kosovo-police-official-site',
    type: 'professional',
    priority: 1,
    isFeatured: false,
    category: 'Government Website',
    year: '2012-2020',
    title: 'Kosovo Police Official Site',
    status: 'Professional Work',
    shortDescription:
      'Official public-sector website and internal platform work delivered within a professional role, with focus on stability, accessibility, and long-term operational reliability.',
    detail:
      'This work was delivered as part of a professional role and reflects responsibility for public-facing web presence and internal digital platforms. The contribution focused on website management, platform stability, accessibility, and practical support for secure and reliable digital communication.',
    image: kosovoPoliceImage,
    imageAlt: 'Kosovo Police project preview image',
    imagePosition: 'center center',
    techStack: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: '',
    isLive: false,
    liveLabel: '',
  },
  {
    id: 6,
    slug: 'berisha-group-web-presence',
    type: 'professional',
    priority: 2,
    isFeatured: false,
    category: 'Corporate Website',
    year: '2010-2019',
    title: 'Berisha Group Web Presence',
    status: 'Professional Work',
    shortDescription:
      'Corporate web presence and digital support work delivered in a professional business environment, including website maintenance, backend support, and online visibility activities.',
    detail:
      'This project reflects earlier professional work in a corporate setting, including website delivery, backend and database-related support, and digital presence maintenance. It is presented as selected professional work rather than as an independent personal project.',
    image: berishaGroupImage,
    imageAlt: 'Berisha Group website project preview image',
    imagePosition: 'center center',
    techStack: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: '',
    isLive: false,
    liveLabel: '',
  },
  {
    id: 7,
    slug: 'chillout-house-project',
    type: 'professional',
    priority: 3,
    isFeatured: false,
    category: 'Freelance Website Delivery',
    year: '2020-Present',
    title: 'Chillout House Project',
    status: 'Professional Work',
    shortDescription:
      'Client-focused website work delivered in a professional freelance context, including presentation, maintenance, and practical support for ongoing digital presence.',
    detail:
      'This project represents professional client delivery work and is included as part of selected real-world website experience. The focus was on practical implementation, stable presentation, and continued support rather than open-source product development.',
    image: chilloutHouseImage,
    imageAlt: 'Chillout House website project preview image',
    imagePosition: 'center center',
    techStack: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: '',
    isLive: false,
    liveLabel: '',
  },
]

export const featuredProjects = projects
  .filter((project) => project.type === 'featured')
  .sort((a, b) => a.priority - b.priority)

export const professionalProjects = projects
  .filter((project) => project.type === 'professional')
  .sort((a, b) => a.priority - b.priority)

export const primaryFeaturedProject = featuredProjects[0]
