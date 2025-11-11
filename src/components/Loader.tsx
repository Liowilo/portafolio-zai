import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let progress = 0;
    let targetProgress = 0;
    const minLoadTime = 1000; // Tiempo mínimo de carga para UX (1 segundo)
    const startTime = Date.now();
    let animationFrame: number;
    let hasFinishedLoading = false;

    // Función para actualizar el progreso visual suavemente
    const updateProgress = () => {
      // Interpolar suavemente hacia el objetivo
      progress += (targetProgress - progress) * 0.1;

      if (progressRef.current && percentageRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progress / 100,
          duration: 0.2,
          ease: 'power2.out'
        });
        percentageRef.current.textContent = Math.floor(progress).toString();
      }

      // Si ya terminó de cargar y el progreso llegó a ~100
      if (hasFinishedLoading && progress > 99.5) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);

        // Esperar el tiempo mínimo si es necesario
        setTimeout(() => {
          exitLoader();
        }, remainingTime);
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    // Función para salir del loader
    const exitLoader = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
          }
        });

        tl.to(percentageRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to(progressRef.current, {
          scaleX: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, '-=0.1')
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        }, '-=0.2');
      }, loaderRef);

      return () => ctx.revert();
    };

    // Rastrear el progreso de carga de recursos
    const updateLoadProgress = () => {
      // Obtener todos los recursos que necesitan cargarse
      const images = Array.from(document.images);
      const scripts = Array.from(document.scripts);
      const stylesheets = Array.from(document.styleSheets);

      let totalResources = images.length + scripts.length + stylesheets.length;
      let loadedResources = 0;

      // Si no hay recursos, marcar como completo
      if (totalResources === 0) {
        targetProgress = 100;
        hasFinishedLoading = true;
        return;
      }

      // Contar imágenes cargadas
      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          loadedResources++;
        }
      });

      // Scripts y stylesheets se consideran cargados si están en el DOM
      loadedResources += scripts.length;
      loadedResources += stylesheets.length;

      // Calcular porcentaje (mínimo 30% para feedback visual inicial)
      targetProgress = Math.max(30, (loadedResources / totalResources) * 100);
    };

    // Listener para cuando el DOM está listo
    const handleDOMContentLoaded = () => {
      targetProgress = 60; // DOM cargado = 60%
      updateLoadProgress();
    };

    // Listener para cuando todo está completamente cargado
    const handleLoad = () => {
      targetProgress = 100;
      hasFinishedLoading = true;
      updateLoadProgress();
    };

    // Actualización periódica del progreso mientras se carga
    const progressInterval = setInterval(() => {
      if (!hasFinishedLoading) {
        updateLoadProgress();
      }
    }, 100);

    // Registrar eventos
    if (document.readyState === 'complete') {
      // Ya está cargado
      handleLoad();
    } else if (document.readyState === 'interactive') {
      // DOM listo pero recursos aún cargando
      handleDOMContentLoaded();
      window.addEventListener('load', handleLoad);
    } else {
      // Aún cargando
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.addEventListener('load', handleLoad);
    }

    // Iniciar animación de progreso
    animationFrame = requestAnimationFrame(updateProgress);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Logo o texto */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 via-purple-600 to-blue-500 bg-clip-text text-transparent">
          Portafolio
        </h1>
      </div>

      {/* Barra de progreso */}
      <div className="w-64 md:w-80 relative">
        {/* Contenedor de la barra */}
        <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full bg-linear-to-r from-purple-500 to-blue-500 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Porcentaje */}
        <div className="mt-6 text-center">
          <span
            ref={percentageRef}
            className="text-2xl font-light text-gray-400 tabular-nums"
          >
            0
          </span>
          <span className="text-2xl font-light text-gray-600 ml-1">%</span>
        </div>
      </div>

      {/* Puntos animados (opcional) */}
      <div className="absolute bottom-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-blue-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
