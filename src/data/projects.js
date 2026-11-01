// Project showcase data — wording follows the latest CV.
// `github`  → repository (or profile) link. Edit the URLs below if a repo name differs.
// `live`    → optional live demo link; leave it out and the button is hidden.
// `art`     → which illustrated thumbnail to show (see components/ProjectArt.jsx).
const PROFILE = 'https://github.com/tuhin-mohanta-cse'

export const projects = [
  {
    id: '01',
    art: 'flight',
    featured: true,
    category: 'Full-Stack · Booking Platform',
    title: 'SkyHigh Flight Booking and E-Commerce System',
    description:
      'A full-stack flight booking platform on a React.js frontend, Spring Boot REST backend and MySQL database, covering the complete journey from airport-to-airport search to ticket issue.',
    highlights: [
      'Seat selection, passenger details, booking and payment workflows',
      'Automatic PNR / e-ticket generation',
      'Live flight tracking and an admin management module',
      'Searchable airport, country and state data',
      'Delivered in a responsive UI',
    ],
    tech: ['React.js', 'Spring Boot', 'REST APIs', 'MySQL'],
    github: PROFILE,
  },
  {
    id: '02',
    art: 'library',
    category: 'Full-Stack · AI / RAG',
    title: 'GEN-AI Library Management System',
    description:
      'A multi-service library platform with authentication, dashboards, book management, issue/return and approval workflows, history, search, categories and e-books, using PHP, MySQL and FastAPI services.',
    highlights: [
      'AI Retrieval-Augmented Generation (RAG) pipeline',
      'Vector embeddings, FAISS Top-K similarity search and semantic plus keyword scoring',
      'Answers generated locally by Ollama (Llama 3.2)',
    ],
    tech: ['React/Vite', 'Tailwind CSS', 'PHP', 'MySQL', 'FastAPI', 'FAISS', 'Ollama'],
    github: PROFILE,
  },
  {
    id: '03',
    art: 'weather',
    category: 'Full-Stack · API Integration',
    title: 'Weather Intelligence',
    description:
      'A responsive weather application with a Spring Boot REST backend that serves location-based and coordinate-based weather data.',
    highlights: [
      'Location-based and coordinate-based weather data',
      'Integrated external weather APIs',
      'Structured results with reliable frontend–backend communication',
    ],
    tech: ['Spring Boot', 'REST APIs', 'JavaScript', 'HTML', 'CSS'],
    github: PROFILE,
  },
  {
    id: '04',
    art: 'typing',
    category: 'Frontend · Interactive Game',
    title: 'Dragon Typing Battle (Typing Test Game)',
    description:
      'An interactive React.js typing game with 100 levels, timer-driven gameplay and difficulty progression.',
    highlights: [
      'Real-time speed (WPM) and accuracy feedback',
      'Performance tracking',
      'Responsive UI',
    ],
    tech: ['React.js', 'JavaScript'],
    github: 'https://github.com/tuhin-mohanta-cse/typing-test',
    live: 'https://typingtestcom.vercel.app/',
  },
  {
    id: '05',
    art: 'portfolio',
    category: 'Frontend · Personal Brand',
    title: 'Developer Portfolio Website',
    description:
      'A responsive portfolio presenting education, technical skills, projects and professional profile.',
    highlights: ['Responsive design'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/tuhin-mohanta-cse/portfolio',
    live: 'https://tuhinmohantacse.vercel.app/',
  },
]
