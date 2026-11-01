// Single source of truth for identity + contact details (from resume).
import { publicUrl } from '../utils/paths'

export const personal = {
  name: 'Tuhin Mohanta',
  firstName: 'Tuhin',
  headline: 'Full-Stack & Java Developer',
  degree: 'B.Tech, Computer Science & Engineering',
  location: 'Bankura, West Bengal, India',
  email: 'tuhinmohanta508@gmail.com',
 
  github: 'https://github.com/tuhin-mohanta-cse',
  githubHandle: 'github.com/tuhin-mohanta-cse',
  linkedin: 'https://www.linkedin.com/in/tuhin-mohanta-964027363',
  linkedinHandle: 'linkedin.com/in/tuhin-mohanta-964027363',
  website: 'https://tuhincse.vercel.app/',
  websiteHandle: 'tuhincse.vercel.app',
  resumeFile: 'Tuhin_Mohanta_Resume.pdf',
  resumeUrl: publicUrl('Tuhin_Mohanta_Resume.pdf'),
  languages: [
    { name: 'Bengali', level: 'Advanced' },
    { name: 'English', level: 'Advanced' },
    { name: 'Hindi', level: 'Advanced' },
  ],
}

export const hero = {
  rotatingRoles: ['Full-Stack Developer', 'Java Developer', 'Problem Solver', 'React Engineer'],
  intro: 'Hi, I’m Tuhin',
  subtitle: 'CSE Undergraduate',
  bullets: [
    'Java, python, C++, Spring Boot & REST API development',
    'React.js (Vite) & Tailwind CSS interfaces',
    'PHP, FastAPI, MySQL & relational database design',
    'Generative AI: RAG with FAISS, embeddings & Ollama',
    'Full-stack apps: authentication, bookings, dashboards',
  ],
  tagline:
    'Designing and developing modern web applications, dashboards & full-stack platforms.',
  status: 'Open to internships & entry-level roles',
  stats: [
    { value: 5, suffix: '', label: 'Full-Stack & Web Projects Built' },
    { value: 7.5, decimals: 1, suffix: '', label: 'CGPA — B.Tech, Computer Science & Engineering', dark: true },
    { value: 4, suffix: '', label: 'Certifications & Training — TCS iON, NASSCOM, IIT Dhanbad' },
  ],
  marquee: [
    'Creative Developer',
    'Problem Solver',
    'Software Engineer',
    'Full-Stack Developer',
    'Java Developer',
  ],
}

export const about = {
  heading: 'A CSE undergraduate who builds full-stack products end to end.',
  paragraphs: [
    'I’m a Computer Science & Engineering student at Ramkrishna Mahato Government Engineering College, based in Bankura, West Bengal. I’ve built and integrated complete web applications across React.js, Spring Boot, REST APIs, MySQL, PHP and FastAPI.',
    'My work includes SkyHigh, a flight booking platform with end-to-end booking and payment workflows, and a Generative AI library system that uses RAG with FAISS vector search and a locally hosted Llama 3.2 model. I’m strong in frontend–backend integration, relational database design, authentication and responsive UI.',
    'Before B.Tech I completed a Diploma in Civil Engineering — an engineering mindset I bring to debugging and problem solving. I’m currently seeking Software Developer, Java Developer or Full Stack Developer internship and entry-level roles.',
  ],
  facts: [
    { k: 'Location', v: 'Bankura, West Bengal, India' },
    { k: 'Education', v: 'B.Tech, Computer Science & Engineering' },
    { k: 'Languages', v: 'Bengali, English, Hindi' },
    { k: 'Focus', v: 'Java & Full-Stack Development' },
  ],
  tag: { value: '2027', label: ['Expected', 'Graduation'] },
}
