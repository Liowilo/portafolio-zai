import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    id: 1,
    title: 'Visualización Arquitectónica',
    category: '3D Render',
    description: 'Render fotorrealista de espacio arquitectónico moderno',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    id: 2,
    title: 'Diseño de Producto',
    category: 'Product Design',
    description: 'Modelado 3D y visualización de productos',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 3,
    title: 'Animación 3D',
    category: 'Motion Graphics',
    description: 'Animaciones fluidas y dinámicas para marcas',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  },
  {
    id: 4,
    title: 'Branding 3D',
    category: 'Brand Identity',
    description: 'Identidad visual tridimensional para empresas',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
  },
  {
    id: 5,
    title: 'Espacios Interiores',
    category: 'Interior Design',
    description: 'Visualización de diseño de interiores',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80',
  },
  {
    id: 6,
    title: 'Arte Digital',
    category: 'Digital Art',
    description: 'Creaciones artísticas en 3D',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
];

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Observador de intersección para animar cuando la sección sea visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ctx = gsap.context(() => {
              // Animación del título
              gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
              });

              // Animación de los proyectos
              projectRefs.current.forEach((project, index) => {
                if (project) {
                  gsap.from(project, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.1,
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
      id="proyectos"
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-4 text-center"
        >
          Proyectos
        </h2>
        <p className="text-gray-400 text-center mb-16 text-lg">
          Una selección de mis trabajos recientes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-purple-400 text-sm font-semibold mb-2">
                  {project.category}
                </span>
                <h3 className="text-white text-2xl font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
