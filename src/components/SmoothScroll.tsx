import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Inicializar Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Función RAF para animar Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Función para manejar los clicks en los links de navegación
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');

        if (href && href !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(href);

          if (targetElement && targetElement instanceof HTMLElement) {
            lenis.scrollTo(targetElement, {
              duration: 1.5,
              offset: -80, // Offset para el navbar
            });
          }
        } else if (href === '#') {
          e.preventDefault();
          lenis.scrollTo(0, {
            duration: 1.5,
          });
        }
      }
    };

    // Agregar el event listener
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null; // Este componente no renderiza nada
}
