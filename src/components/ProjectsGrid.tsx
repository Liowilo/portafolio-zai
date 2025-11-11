import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    id: 1,
    title: 'Toma y Edición de Fotografía',
    category: 'Fotografía Publicitaria',
    description: 'Modelado 3D de espacio virtual con Blender, integrando texturas y renders para exposición académica de artes digitales',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    date: 'Ago 2023 - Dic 2023',
  },
  {
    id: 2,
    title: 'Diseño para Aplicación Web',
    category: 'UI/UX Design',
    description: 'Desarrollo de interfaz visual y experiencia de usuario (UI/UX) para aplicación web. Wireframes, prototipos y diseño gráfico en Photoshop e Illustrator',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    date: 'Ene 2024 - Jun 2024',
  },
  {
    id: 3,
    title: 'Escenario 3D',
    category: 'Modelado y Render',
    description: 'Modelado y diseño de escenario tridimensional con mobiliario, iluminación y renderizado. Proyecto realizado en Blender y Maya',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    date: 'Ago 2024 - Dic 2024',
  },
  {
    id: 4,
    title: 'Creative UI Pack',
    category: 'Game Design',
    description: 'Diseño de interfaces gráficas para videojuegos independientes, creando menús interactivos, HUDs y elementos visuales en Krita, Figma y Photoshop',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    date: 'Ago 2024 - Dic 2024',
  },
  {
    id: 5,
    title: 'Cortometraje',
    category: 'Edición de Video',
    description: 'Producción y edición de video tipo corto grabado con cámara. Técnicas de grabación en exteriores/interiores y edición digital cinematográfica',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    date: 'Ene 2025 - Dic 2025',
  },
  {
    id: 6,
    title: 'Rendering 3D',
    category: 'Visualización Arquitectónica',
    description: 'Creación de imágenes fotorrealistas y representaciones visuales de alta calidad para proyectos arquitectónicos, de producto y diseño digital',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    date: 'Ago 2025 - Dic 2025',
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
