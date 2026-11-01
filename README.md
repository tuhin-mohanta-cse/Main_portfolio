# Tuhin Mohanta — Portfolio (React + Vite)

Merged and rebuilt from **Tuhin Portfolio** (primary: palette, typography, content, photos, music) and
**tuhin-mohanta-portfolio** (React/Vite setup, marquee, floating chips, glass UI, featured-project idea),
then updated from the resume.

## Run locally

Requires **Node.js 18+** (20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Project structure

```
public/
  Tuhin_Mohanta_Resume.pdf      ← the file the resume buttons download
  audio/music.mp3               ← background music (from the original portfolio)
  favicon.svg, og-image.jpg, robots.txt, sitemap.xml
src/
  main.jsx · App.jsx            ← entry + page assembly (section order lives here)
  data/                         ← ALL content. Edit text/links here, not in components
    personal.js                   name, contact, social URLs, hero text, about text
    projects.js                   project cards (GitHub / live links)
    skills.js · education.js · certifications.js · navigation.js · social.js
  sections/                     ← Hero, About, Skills, Education, Projects, Certifications, Contact
  components/                   ← Navbar, Footer, FloatingDock, Preloader, Cursor, TiltCard,
                                  Magnetic, ProjectCard, ProjectArt, SkillRing, SocialLinks, ResumeButton…
  animations/config.js          ← shared easing, springs and motion variants
  hooks/ · utils/               ← scroll-spy, pointer detection, scroll helpers
  styles/                       ← theme.css (colour tokens) + one CSS file per area
  assets/images/                ← optimised hero / about / resume-preview images (WebP)
```

## Common edits

| I want to… | Edit |
|---|---|
| Change a project, add a new one, fix a GitHub link | `src/data/projects.js` |
| Add achievements / awards | `src/data/certifications.js` → `achievements` array (block appears automatically) |
| Update skills | `src/data/skills.js` |
| Replace the resume | overwrite `public/Tuhin_Mohanta_Resume.pdf` (keep the name), then re-export `src/assets/images/resume-preview.webp` if you want the preview card to match |
| Change colours | `src/styles/theme.css` |
| Swap hero / about photo | replace `src/assets/images/hero.webp` / `about.webp` |
| Reorder sections | `src/App.jsx` (and `src/data/navigation.js` for the navbar) |

## Notes

- Content follows your latest CV. It has no experience section, so the experience card is hidden; add an item to `experience` in `src/data/education.js` and it reappears.
- Repository links: SkyHigh, Weather Intelligence and GEN-AI Library point to your GitHub profile because
  their exact repo URLs were not in the files provided. Dragon Typing Battle and Developer Portfolio use the repo URLs from your
  second project. Replace any of them in `src/data/projects.js` once you confirm the repo names.
- Deployment (Vercel/Netlify): build command `npm run build`, output directory `dist`.
- Accessibility: skip link, semantic landmarks, keyboard-focus styles, `prefers-reduced-motion` support.
