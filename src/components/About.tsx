import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skills = [
  { name: 'Photoshop', level: 95 },
  { name: 'Illustrator', level: 90 },
  { name: 'Maya', level: 85 },
  { name: 'Blender', level: 90 },
  { name: 'After Effects', level: 85 },
  { name: 'Premiere', level: 80 },
  { name: 'InDesign', level: 85 },
  { name: 'Lightroom', level: 75 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ctx = gsap.context(() => {
              // Animación del título
              gsap.from(titleRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
              });

              // Animación del contenido
              gsap.from(contentRef.current, {
                x: 100,
                opacity: 0,
                duration: 1,
              });

              // Animación de las habilidades
              skillsRef.current.forEach((skill, index) => {
                if (skill) {
                  gsap.from(skill, {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                  });
                }
              });

              // Animación de las barras de progreso
              barRefs.current.forEach((bar, index) => {
                if (bar) {
                  gsap.from(bar, {
                    width: 0,
                    duration: 1.5,
                    delay: index * 0.1,
                    ease: 'power2.out',
                  });
                }
              });
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-linear-to-b from-black to-gray-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <h2
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              Sobre Mí
            </h2>

            <div ref={contentRef} className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Diseñador gráfico y animador digital con experiencia en la creación de piezas visuales
                para medios digitales e impresos. Especializado en branding, comunicación visual y
                motion graphics, desarrollo propuestas creativas con personalidad.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Manejo intermedio-avanzado de herramientas como Adobe Photoshop, Illustrator y After Effects,
                aplicadas en proyectos de diseño publicitario, identidad visual y animación 2D-3D. Además,
                cuento con experiencia en modelado y renderizado 3D, aplicando técnicas que combinan arte y
                tecnología para enriquecer la experiencia del usuario.
              </p>

              <div className="space-y-4 pt-6 border-t border-gray-800">
                <h4 className="text-xl font-bold text-white">Educación</h4>
                <div>
                  <div className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                    Universidad Tecmilenio
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    Licenciado en Diseño Gráfico y Animación Digital
                  </div>
                  <div className="text-gray-500 text-sm">
                    Enero 2022 - Enero 2027
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">
              Habilidades
            </h3>

            {skills.map((skill, index) => (
              <div
                key={skill.name}
                ref={(el) => {
                  skillsRef.current[index] = el;
                }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>

                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    ref={(el) => {
                      barRefs.current[index] = el;
                    }}
                    className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
