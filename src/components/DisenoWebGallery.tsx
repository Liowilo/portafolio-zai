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
    title: 'Diseño de App para Cafetería',
    subtitle: 'Aplicación móvil con sistema de pedidos',
    description: 'Diseño completo de aplicación móvil para cafetería, incluyendo sistema de pedidos, menú interactivo y proceso de pago. Se desarrolló la identidad visual, paleta de colores cálidos acordes a la marca, y componentes UI optimizados para experiencia táctil. El diseño prioriza la navegación intuitiva y el proceso de compra rápido, con categorías claras de productos y sistema de personalización de bebidas. Incluye pantallas de inicio, menú, carrito, checkout y perfil de usuario.',
    image: '/images/web design/diseño-app-cafeteria.png',
    category: 'Mobile App Design',
  },
  {
    id: 2,
    title: 'Página Web de Viajes en Figma',
    subtitle: 'Landing page y sistema de reservas',
    description: 'Diseño de sitio web para agencia de viajes desarrollado completamente en Figma. El proyecto incluye landing page atractiva con hero section impactante, secciones de destinos destacados, sistema de búsqueda y filtros avanzados, y flujo de reserva optimizado. Se implementó un diseño responsive que funciona perfectamente en desktop, tablet y móvil. La paleta de colores transmite aventura y confianza, mientras que la tipografía y espaciado crean una experiencia de navegación limpia y profesional. Incluye componentes reutilizables, sistema de grillas y guías de estilo completas.',
    image: '/images/web design/pagina-viajes-figma.png',
    category: 'Web Design & UI/UX',
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
