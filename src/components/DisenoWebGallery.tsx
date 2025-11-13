import { useState, useRef, useEffect } from 'react';

interface Design {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

const designs: Design[] = [
  {
    id: 1,
    title: 'Wireframes y Prototipos',
    subtitle: 'Planificación de la experiencia de usuario',
    description: 'Desarrollo inicial de wireframes de baja y alta fidelidad para definir la estructura y flujo de navegación de la aplicación. Se crearon prototipos interactivos en Figma para validar la experiencia de usuario antes del diseño visual final. Este proceso incluyó research de usuarios, arquitectura de información y flujos de usuario optimizados.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    category: 'UX Research & Wireframing',
  },
  {
    id: 2,
    title: 'Sistema de Diseño',
    subtitle: 'Componentes y estilos reutilizables',
    description: 'Creación de un sistema de diseño completo con paleta de colores, tipografía, espaciado y componentes UI reutilizables. Se definieron tokens de diseño, guías de estilo y biblioteca de componentes para mantener consistencia visual en toda la aplicación. Incluye botones, formularios, cards, modales y elementos de navegación.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80',
    category: 'Design System',
  },
  {
    id: 3,
    title: 'Interfaz de Dashboard',
    subtitle: 'Panel administrativo y visualización de datos',
    description: 'Diseño de dashboard administrativo con enfoque en la visualización efectiva de datos y métricas clave. Se implementaron gráficas, tablas interactivas y widgets informativos siguiendo principios de diseño de información. La interfaz prioriza la legibilidad y acceso rápido a funciones críticas con jerarquía visual clara.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    category: 'Dashboard UI',
  },
  {
    id: 4,
    title: 'Diseño Responsive',
    subtitle: 'Adaptación móvil y tablet',
    description: 'Adaptación completa de la interfaz para dispositivos móviles y tablets, siguiendo el enfoque mobile-first. Se diseñaron breakpoints estratégicos y componentes flexibles que mantienen la funcionalidad en diferentes tamaños de pantalla. Incluye navegación móvil optimizada, gestos táctiles y layouts adaptativos.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    category: 'Responsive Design',
  },
  {
    id: 5,
    title: 'Flujos de Usuario',
    subtitle: 'User flows y experiencia optimizada',
    description: 'Mapeo completo de flujos de usuario para las principales tareas y procesos de la aplicación. Se identificaron puntos de fricción y se optimizaron los caminos críticos. Los flujos incluyen onboarding, registro, navegación principal y procesos de conversión, todos diseñados para minimizar pasos y maximizar la claridad.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
    category: 'User Experience',
  },
  {
    id: 6,
    title: 'Prototipo Final',
    subtitle: 'Mockups de alta fidelidad',
    description: 'Diseño final de alta fidelidad con todos los elementos visuales, interacciones y microanimaciones definidas. El prototipo incluye estados hover, loading, error y éxito para todos los componentes interactivos. Se utilizó Photoshop para composiciones complejas e Illustrator para iconografía y elementos vectoriales, asegurando que el diseño esté listo para desarrollo.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    category: 'High-Fidelity Design',
  },
];

export default function DisenoWebGallery() {
  const [selectedDesign, setSelectedDesign] = useState<Design>(designs[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleDesignClick = (design: Design) => {
    setIsUpdating(true);
    setSelectedDesign(design);
    
    setTimeout(() => {
      if (descriptionRef.current) {
        const offset = 80;
        const elementPosition = descriptionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  return (
    <>
      {/* Project Description with Dynamic Content */}
      <section ref={descriptionRef} className="py-16 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-500 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {selectedDesign.title}
              </h2>
              <p className="text-xl text-purple-400 mb-6 font-semibold">
                {selectedDesign.subtitle}
              </p>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{selectedDesign.description}</p>
              </div>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  {selectedDesign.category}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`aspect-video rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10 transition-all duration-500 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-linear-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Proceso de Diseño
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Haz clic en cada etapa para ver más detalles
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <button
                key={design.id}
                onClick={() => handleDesignClick(design)}
                className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 ${
                  selectedDesign.id === design.id
                    ? 'ring-4 ring-blue-500 scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent transition-opacity duration-300 flex items-end p-6 ${
                    selectedDesign.id === design.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div>
                    <h3 className="text-white font-bold text-lg">{design.title}</h3>
                    <p className="text-gray-300 text-sm">{design.category}</p>
                  </div>
                </div>

                {/* Selected indicator */}
                {selectedDesign.id === design.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
