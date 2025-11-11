import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeBackground from './ThreeBackground';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          scrollIndicatorRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-950 via-gray-900 to-black"
    >
      {/* Three.js particle background */}
      <ThreeBackground />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
        >
          Diseño <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">3D</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light"
        >
          Creando experiencias visuales únicas que transforman ideas en arte digital tridimensional
        </p>

        <div ref={ctaRef} className="flex gap-6 justify-center flex-wrap">
          <a
            href="#proyectos"
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">Ver Proyectos</span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#contacto"
            className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
          >
            Contactar
          </a>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="mt-16 flex justify-center">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
