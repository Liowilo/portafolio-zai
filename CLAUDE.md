# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D graphic design portfolio website built with Astro 5, React 19, and Tailwind CSS 4. The site showcases creative 3D work with smooth animations powered by GSAP and is designed with a modern, dark aesthetic featuring purple and blue gradient accents.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro ...
```

## Architecture

### Tech Stack Integration

- **Astro 5**: Static site generator with partial hydration
- **React 19**: Used for interactive components via Astro's React integration
- **Tailwind CSS 4.1**: Styling via Vite plugin (`@tailwindcss/vite`)
- **GSAP**: Animation library for scroll-triggered and timeline-based animations
- **React Three Fiber / Drei**: 3D rendering capabilities (dependencies included but not yet implemented)

### File Structure

```
src/
├── pages/
│   └── index.astro          # Main page, imports all components
├── components/              # React components (.tsx)
│   ├── Navigation.tsx       # Sticky nav with scroll detection
│   ├── Hero.tsx            # Hero section with GSAP animations
│   ├── ProjectsGrid.tsx    # Project showcase with hover effects
│   ├── About.tsx           # About section with skills bars
│   └── Contact.tsx         # Contact form and info
└── styles/
    └── global.css          # Global styles, custom animations, Tailwind imports
```

### Component Hydration Strategy

All React components use `client:load` directive in [index.astro](src/pages/index.astro) for immediate hydration. Components include:
- Navigation (scroll-based state)
- Hero (GSAP timeline animations)
- ProjectsGrid (intersection observer animations)
- About (skill bars with progress animations)
- Contact (form and contact info)

### Animation Patterns

All components use a consistent GSAP animation pattern:

1. **IntersectionObserver** for viewport-triggered animations (except Navigation and Hero which animate on mount)
2. **GSAP Context API** (`gsap.context()`) for automatic cleanup
3. **Refs** for targeting elements (avoid string selectors)
4. **Timeline delays** for staggered entrance effects

Example pattern:
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ctx = gsap.context(() => {
            // GSAP animations here
          }, sectionRef);

          observer.disconnect();
          return () => ctx.revert();
        }
      });
    },
    { threshold: 0.1 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);
```

### Styling System

- **Tailwind CSS 4** (new CSS-first configuration)
- **Global styles** in [src/styles/global.css](src/styles/global.css):
  - Inter font from Google Fonts
  - Custom scrollbar (purple/blue gradient)
  - Custom text selection (purple tint)
  - Float animation keyframe
- **Color scheme**: Black background with purple-to-blue gradients
- **Typography**: Inter font family, various weights
- **Grid backgrounds**: Custom CSS patterns using linear gradients

## TypeScript Configuration

- Extends `astro/tsconfigs/strict`
- JSX configured for React (`jsx: "react-jsx"`, `jsxImportSource: "react"`)
- Includes all files except `dist/`

## Current Limitations & Future Work

1. **Three.js integration**: Dependencies installed (`@react-three/fiber`, `@react-three/drei`, `three`) but not yet implemented
2. **Contact form**: Form is UI-only, no backend/submission handling
3. **Projects data**: Hardcoded array using Unsplash placeholder images
4. **Content**: Spanish language, placeholder text and images

## Important Notes

- All content is in Spanish
- The site uses anchor links (`#proyectos`, `#contacto`) for navigation
- Smooth scroll behavior enabled globally in CSS
- Development server runs on port 4321 (Astro default)
