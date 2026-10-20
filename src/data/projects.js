import berishaGroupImage from '../assets/projects/BerishaGroup.jpg'
import chilloutHouseImage from '../assets/projects/Chillouthouse.jpg'
import cinescopeDashboardImage from '../assets/projects/cinescope-dashboard-optimized.jpg'
import cinescopeHomepageImage from '../assets/projects/cinescope-homepage-optimized.jpg'
import kosovoPoliceImage from '../assets/projects/KosovoPolice.jpg'
import lexicampBookingImage from '../assets/projects/lexicamp-booking-optimized.jpg'
import munamiiCakeryImage from '../assets/projects/munamii-cakery-optimized.jpg'
import nackaByggpartnerImage from '../assets/projects/nacka-byggpartner-optimized.jpg'
import nordicWebHubHomeImage from '../assets/projects/nordicwebhub-home-optimized.jpg'
import nordicWebHubPlaceholderImage from '../assets/projects/nordicwebhub-placeholder.svg'
import nordicDashboardPreview from '../assets/projects/nordicwebhub-customer-dashboard.webp'
import nordicLandingPreview from '../assets/projects/nordicwebhub-home.webp'
import cineScopePreview from '../assets/projects/cinescope-homepage.webp'
import nackaPreview from '../assets/projects/nacka-byggpartner-homepage-top.webp'
import nackaFullScreenshot from '../assets/projects/nacka-byggpartner-homepage-full.webp'

export const defaultProjectImage = nordicWebHubPlaceholderImage
export const defaultProjectImageAlt = 'Project preview placeholder'

export const projects = [
  {
    id: 1,
    slug: 'nordicwebhub',
    shortTitle: 'NordicWebHub',
    homePreview: {
      order: 1, src: nordicDashboardPreview, fullSrc: nordicDashboardPreview,
      width: 1900, height: 910, demo: true,
      mobileWidth: 950, mobileX: -110, mobileY: -110,
      caption: { en: 'Customer dashboard', sv: 'Kundöversikt' },
      alt: { en: 'NordicWebHub customer dashboard with projects, support tickets and requests (demo data).', sv: 'NordicWebHubs kundöversikt med projekt, supportärenden och förfrågningar (demodata).' },
      secondary: { src: nordicLandingPreview, width: 1904, height: 919 },
    },
    title: 'NordicWebHub – Full-Stack Web Services Management Platform',
    type: 'featured',
    category: 'Full-Stack B2B SaaS Client Portal',
    priority: 1,
    isFeatured: true,
    year: '2026',
    status: 'Ongoing project',
    highlightLabel: 'Featured Full-Stack Project',
    caseStudyUrl: '/projects/nordicwebhub',
    shortDescription:
      'An ongoing portfolio application for managing digital services for small and medium-sized businesses, using React, ASP.NET Core Web API, Entity Framework Core and SQL Server.',
    detail:
      'NordicWebHub is an ongoing full-stack portfolio application that helps agencies and digital service teams manage service packages, customer companies, project requests, projects, support tickets, service orders, maintenance logs, SEO reports, hosting status, and AI-assisted service recommendations from one secure portal. The application includes separate Admin and Customer portals, HttpOnly cookie authentication, CSRF protection, role-based authorization, and a one Customer equals one Company data isolation model.',
    description:
      'NordicWebHub is an ongoing full-stack portfolio application that helps agencies and digital service teams manage service packages, customer companies, project requests, projects, support tickets, service orders, maintenance logs, SEO reports, hosting status, and AI-assisted service recommendations from one secure portal. The application includes separate Admin and Customer portals, HttpOnly cookie authentication, CSRF protection, role-based authorization, and a one Customer equals one Company data isolation model.',
    image: nordicWebHubHomeImage,
    imageAlt: 'NordicWebHub public landing page showing the client portal product interface',
    imagePosition: 'center top',
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'ASP.NET Core Web API',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'Azure SQL',
      'ASP.NET Identity',
      'Role-based Authorization',
      'CSRF Protection',
      'Vercel',
      'Azure App Service',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'ASP.NET Core Web API',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'Azure SQL',
      'ASP.NET Identity',
      'Role-based Authorization',
      'CSRF Protection',
      'Vercel',
      'Azure App Service',
    ],
    keyFeatures: [
      'Decoupled React frontend and ASP.NET Core Web API backend',
      'SQL Server database with Entity Framework Core migrations',
      'ASP.NET Identity with Admin and Customer roles',
      'HttpOnly cookie authentication and CSRF protection',
      'Customer data isolation using CompanyId and OwnerId',
      'Admin and Customer dashboards',
      'Service packages, companies, project requests, projects, and support tickets',
      'Service orders, SEO reports, hosting status, website health checks, and maintenance logs',
      'Rule-based AI Service Assistant and bilingual EN/SV public UI foundation',
    ],
    caseStudyOverview: [
      'NordicWebHub is an ongoing portfolio application with a deployed demonstration. It brings service packages, customer companies, project requests, support, maintenance, SEO reporting and operational workflows into one workspace for small and medium-sized businesses.',
      'The project is structured as a decoupled React and ASP.NET Core Web API application with SQL Server, Identity-based authentication, role-based authorization, customer data isolation, and live deployment across Vercel, Azure App Service, and Azure SQL.',
    ],
    caseStudyHighlights: [
      'Separate Admin and Customer portals with protected workflows',
      'Realistic MVP scope for service delivery, support, and operational reporting',
      'Customer isolation model designed around CompanyId and OwnerId ownership rules',
      'Security-focused authentication flow with HttpOnly cookies and CSRF protection',
      'Live full-stack deployment using Vercel, Azure App Service, and Azure SQL',
    ],
    gallery: [
      {
        src: nordicWebHubHomeImage,
        alt: 'NordicWebHub landing page with portal workspace preview and service delivery messaging',
        caption: 'Public landing page introducing the client portal and digital service delivery flow.',
        position: 'center top',
      },
    ],
    hostingNote:
      'The existing project demo uses a split-stack setup: React on Vercel and ASP.NET Core Web API with SQL on Azure. This is ongoing portfolio/project development, not a claim of commercial production delivery or advanced Azure engineering experience.',
    githubUrl: 'https://github.com/osmanosmani/NordicWebHub',
    liveUrl: 'https://nordic-web-hub.vercel.app/',
    isLive: true,
    liveLabel: 'Live Demo',
  },
  {
    id: 2,
    slug: 'cinescope',
    shortTitle: 'CineScope',
    homePreview: {
      order: 2, src: cineScopePreview, fullSrc: cineScopePreview,
      width: 1663, height: 887,
      mobileWidth: 832, mobileX: -120, mobileY: -20,
      caption: { en: 'Movie discovery home page', sv: 'Startsida för filmupptäckt' },
      alt: { en: 'CineScope movie discovery homepage with search and a featured movie.', sv: 'CineScopes startsida med filmsökning och en utvald film.' },
    },
    title: 'CineScope – Modern Movie Discovery Platform',
    type: 'featured',
    category: 'Practical Full-Stack .NET Project',
    priority: 2,
    isFeatured: true,
    year: '2026',
    status: 'Portfolio Ready',
    caseStudyUrl: '/projects/cinescope',
    shortDescription:
      'Practical ASP.NET Core MVC project demonstrating SQL Server, Identity authentication, role-based authorization, reviews, favorites and admin functionality. Presented as project experience.',
    detail:
      'CineScope is a full-stack movie discovery and management platform built with ASP.NET Core MVC. It demonstrates backend development, database design, authentication, MVC architecture, and structured documentation for portfolio and employer review.',
    description:
      'CineScope is a full-stack movie discovery and management platform built with ASP.NET Core MVC. It demonstrates backend development, database design, authentication, MVC architecture, and structured documentation for portfolio and employer review.',
    image: cinescopeHomepageImage,
    imageAlt: 'CineScope homepage showing the movie discovery interface',
    imagePosition: 'center top',
    techStack: [
      'ASP.NET Core MVC',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'ASP.NET Core Identity',
      'Razor Views',
      'Bootstrap 5',
      'TMDB API',
      'SignalR',
    ],
    technologies: [
      'ASP.NET Core MVC',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'ASP.NET Core Identity',
      'Razor Views',
      'Bootstrap 5',
      'TMDB API',
      'SignalR',
    ],
    keyFeatures: [
      'Movie CRUD management',
      'Search by title and filtering by genre or release year',
      'User authentication and role-based permissions',
      'Reviews, ratings, and favorites',
      'TMDB movie search and import',
      'Duplicate import prevention',
      'Admin analytics dashboard',
      'Simple real-time notifications with SignalR',
    ],
    caseStudyOverview: [
      'CineScope is a practical full-stack portfolio project, demonstrating ASP.NET Core MVC, database-driven CRUD, Entity Framework migrations and a clear separation between public browsing, member functionality and admin management. It is project experience, not commercial production experience.',
      'The project combines database-backed movie management, authentication, role-based authorization, and external API integration in a way that is relevant for backend-focused employer review.',
    ],
    caseStudyHighlights: [
      'Database-driven MVC application structure',
      'Role-based access with guest, member, and admin flows',
      'External movie import workflow with TMDB integration',
      'Admin dashboard and analytics-oriented views',
    ],
    gallery: [
      {
        src: cinescopeHomepageImage,
        alt: 'CineScope homepage with search and featured movie discovery layout',
        caption: 'Homepage focused on search, browsing, and movie discovery.',
        position: 'center top',
      },
      {
        src: cinescopeDashboardImage,
        alt: 'CineScope admin dashboard with analytics, review activity, and genre insights',
        caption: 'Admin dashboard for analytics, reviews, and management workflows.',
        position: 'center top',
      },
    ],
    hostingNote:
      'CineScope should be hosted as a separate .NET application on infrastructure that supports ASP.NET Core and SQL Server. The portfolio presents it as a project entry and case study, not as an embedded application.',
    githubUrl: 'https://github.com/osmanosmani/CineScope',
    liveUrl: 'https://app-cinescope-osman-hma2adbye5bjgxcy.swedencentral-01.azurewebsites.net/',
    isLive: true,
    liveLabel: 'Live Demo',
  },
  {
    id: 3,
    slug: 'munamii-cakery',
    title: 'Munamii Cakery – Responsive React Bakery Website',
    type: 'learning',
    category: 'Frontend React Project',
    priority: 3,
    isFeatured: false,
    year: '2026',
    status: 'Completed',
    caseStudyUrl: '/projects/munamii-cakery',
    shortDescription:
      'Responsive React bakery website with routing, reusable components, product filtering, and a clean multi-page frontend structure.',
    detail:
      'Munamii Cakery is a frontend React project built as a responsive bakery website with clear navigation and reusable UI sections. It demonstrates component-based structure, React Router usage, controlled forms, product filtering, and GitHub Pages deployment.',
    description:
      'Munamii Cakery is a frontend React project built as a responsive bakery website with clear navigation and reusable UI sections. It demonstrates component-based structure, React Router usage, controlled forms, product filtering, and GitHub Pages deployment.',
    image: munamiiCakeryImage,
    imageAlt: 'Munamii Cakery homepage screenshot with bakery hero section and product cards',
    imagePosition: 'center top',
    techStack: ['React', 'Vite', 'React Router DOM', 'JavaScript', 'HTML5', 'CSS3', 'GitHub Pages'],
    technologies: [
      'React',
      'Vite',
      'React Router DOM',
      'JavaScript',
      'HTML5',
      'CSS3',
      'GitHub Pages',
    ],
    keyFeatures: [
      'Responsive design for desktop and mobile',
      'Multi-page navigation with React Router',
      'Reusable product card components',
      'Product filtering by category',
      'Controlled contact form',
      'Static deployment with GitHub Pages',
    ],
    githubUrl: 'https://github.com/osmanosmani/cakery-project',
    liveUrl: 'https://osmanosmani.github.io/cakery-project/',
    isLive: true,
    liveLabel: 'Live Demo',
  },
  {
    id: 4,
    slug: 'nacka-byggpartner',
    shortTitle: 'Nacka Byggpartner',
    compactTitle: 'Nacka',
    homePreview: {
      order: 3, src: nackaPreview, fullSrc: nackaFullScreenshot,
      width: 1280, height: 800,
      mobileWidth: 640, mobileX: 0, mobileY: -96,
      caption: { en: 'Home page, top section', sv: 'Startsida, övre delen' },
      alt: { en: 'Nacka Byggpartner construction company homepage.', sv: 'Nacka Byggpartners startsida för byggtjänster.' },
    },
    title: 'Nacka Byggpartner – Modern Construction Company Website',
    type: 'featured',
    category: 'Frontend Business Website',
    priority: 3,
    isFeatured: true,
    year: '2026',
    status: 'Completed',
    caseStudyUrl: '/projects/nacka-byggpartner',
    shortDescription:
      'Client-oriented React website for a Swedish construction company, combining real business requirements, reusable components, responsive design and clear service presentation.',
    detail:
      'Nacka Byggpartner was built to present company services clearly and support a professional digital presence. The project demonstrates React, Vite, Tailwind CSS, responsive layout work, and business-oriented frontend implementation.',
    description:
      'Nacka Byggpartner was built to present company services clearly and support a professional digital presence. The project demonstrates React, Vite, Tailwind CSS, responsive layout work, and business-oriented frontend implementation.',
    image: nackaByggpartnerImage,
    imageAlt: 'Nacka Byggpartner website screenshot',
    imagePosition: 'center top',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    keyFeatures: [
      'Modern business landing page',
      'Service-focused content structure',
      'Responsive layout for desktop and mobile',
      'Clean component-based frontend',
      'Professional presentation for a real business context',
    ],
    githubUrl: 'https://github.com/osmanosmani/Nacka-Byggpartner',
    liveUrl: 'https://dev.nackabyggpartner.se/',
    isLive: true,
    liveLabel: 'Live Demo',
  },
  {
    id: 5,
    slug: 'lexicamp-booking',
    title: 'LexiCamp Booking – Campsite Reservation Platform',
    type: 'learning',
    category: 'Booking Platform Project',
    priority: 5,
    isFeatured: false,
    year: '2026',
    status: 'Portfolio Ready',
    caseStudyUrl: '/projects/lexicamp-booking',
    shortDescription:
      'Responsive booking platform concept for campsites and outdoor stays, focused on reservation flow, structured data presentation, and user-friendly interface design.',
    detail:
      'LexiCamp Booking is a group project developed in a collaborative learning environment. My contribution included development, testing, project collaboration, and support for the overall application structure while working with booking-oriented UI and user flow.',
    description:
      'LexiCamp Booking is a group project developed in a collaborative learning environment. My contribution included development, testing, project collaboration, and support for the overall application structure while working with booking-oriented UI and user flow.',
    image: lexicampBookingImage,
    imageAlt: 'LexiCamp Booking screenshot showing the reservation platform homepage',
    imagePosition: 'center top',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'Collaborative Development'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'Collaborative Development'],
    keyFeatures: [
      'Campsite browsing and reservation flow',
      'Responsive design for desktop and mobile',
      'Card-based layout and structured data presentation',
      'User-friendly booking experience',
      'Group project collaboration and testing',
    ],
    githubUrl: 'https://github.com/osmanosmani/LexiCamp-Booking',
    liveUrl: 'https://lexi-camp-booking.vercel.app/',
    isLive: true,
    liveLabel: 'Live Demo',
  },
  {
    id: 6,
    slug: 'kosovo-police-official-site',
    title: 'Kosovo Police Official Site',
    type: 'professional',
    category: 'Government Website',
    priority: 1,
    isFeatured: false,
    year: '2012-2020',
    status: 'Professional Work',
    caseStudyUrl: '/projects/kosovo-police-official-site',
    shortDescription:
      'Official public-sector website and internal platform work delivered within a professional role, with focus on stability, accessibility, and operational reliability.',
    detail:
      'This project reflects professional public-sector website work and internal digital platform support. It is included as selected professional work rather than as an independent open-source project.',
    description:
      'This project reflects professional public-sector website work and internal digital platform support. It is included as selected professional work rather than as an independent open-source project.',
    image: kosovoPoliceImage,
    imageAlt: 'Kosovo Police project preview image',
    imagePosition: 'center center',
    techStack: [],
    technologies: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: 'https://www.kosovopolice.com',
    isLive: true,
    liveLabel: 'Live Website',
  },
  {
    id: 7,
    slug: 'berisha-group-web-presence',
    title: 'Berisha Group Web Presence',
    type: 'professional',
    category: 'Corporate Website',
    priority: 2,
    isFeatured: false,
    year: '2010-2019',
    status: 'Professional Work',
    caseStudyUrl: '/projects/berisha-group-web-presence',
    shortDescription:
      'Corporate website and digital presence work delivered in a professional business environment, including maintenance, backend support, and online visibility activities.',
    detail:
      'This project represents earlier professional work in a corporate context. It is presented as selected professional work to show practical delivery experience rather than a standalone personal product.',
    description:
      'This project represents earlier professional work in a corporate context. It is presented as selected professional work to show practical delivery experience rather than a standalone personal product.',
    image: berishaGroupImage,
    imageAlt: 'Berisha Group website project preview image',
    imagePosition: 'center center',
    techStack: [],
    technologies: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: 'https://berishagroup.com',
    isLive: true,
    liveLabel: 'Live Website',
  },
  {
    id: 8,
    slug: 'chillout-house-project',
    title: 'Chillout House Project',
    type: 'professional',
    category: 'Freelance Website Delivery',
    priority: 3,
    isFeatured: false,
    year: '2020-Present',
    status: 'Professional Work',
    caseStudyUrl: '/projects/chillout-house-project',
    shortDescription:
      'Client-focused website delivery completed in a freelance context, including presentation, maintenance, and practical support for ongoing digital presence.',
    detail:
      'This entry represents real client work delivered through freelance activity. It is included to show professional website delivery experience beyond personal and school projects.',
    description:
      'This entry represents real client work delivered through freelance activity. It is included to show professional website delivery experience beyond personal and school projects.',
    image: chilloutHouseImage,
    imageAlt: 'Chillout House website project preview image',
    imagePosition: 'center center',
    techStack: [],
    technologies: [],
    keyFeatures: [],
    githubUrl: '',
    liveUrl: 'https://chillouthouse.se',
    isLive: true,
    liveLabel: 'Live Website',
  },
]

export const featuredProjects = projects
  .filter((project) => project.type === 'featured')
  .sort((a, b) => a.priority - b.priority)

export const professionalProjects = projects
  .filter((project) => project.type === 'professional')
  .sort((a, b) => a.priority - b.priority)

export const primaryFeaturedProject = featuredProjects[0]

export const learningProjects = projects
  .filter((project) => project.type === 'learning')
  .sort((a, b) => a.priority - b.priority)

export const findProjectByPath = (pathname) => {
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname

  return projects.find((project) => project.caseStudyUrl === normalizedPath)
}
