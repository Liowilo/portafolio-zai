import { useState, useRef, useEffect } from 'react';

interface Photo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Camarón Asado',
    subtitle: 'Fotografía gastronómica con iluminación cálida',
    description: 'Captura profesional de camarón asado resaltando texturas crujientes y colores dorados. Se utilizó iluminación lateral para crear sombras dramáticas y destacar la superficie cocida del marisco. La postproducción enfatiza los tonos cálidos y el contraste para transmitir frescura y apetitosidad del platillo.',
    image: '/images/photos/camaron-asado.png',
    category: 'Fotografía gastronómica',
  },
  {
    id: 2,
    title: 'Cereal con Frutas',
    subtitle: 'Composición de producto alimenticio con luz natural',
    description: 'Fotografía publicitaria de cereal con elementos frescos y vibrantes. La iluminación natural realza los colores de las frutas y la textura crujiente del cereal. Composición balanceada con enfoque en la frescura matutina, ideal para campañas de desayuno saludable. Edición con saturación selectiva para resaltar tonalidades naturales.',
    image: '/images/photos/cereal.png',
    category: 'Fotografía de producto',
  },
  {
    id: 3,
    title: 'Coctel de Camarón - Ingredientes',
    subtitle: 'Flat lay de ingredientes frescos para coctel',
    description: 'Composición desde arriba mostrando los ingredientes clave para preparar coctel de camarón. La distribución visual organizada resalta cada elemento: camarones frescos, limones, salsas y vegetales. Fotografía estilo flat lay con luz difusa para evitar sombras duras, perfecta para recetas y contenido gastronómico educativo.',
    image: '/images/photos/coctel-camaron-ingredientes.png',
    category: 'Fotografía culinaria',
  },
  {
    id: 4,
    title: 'Coctel de Camarón con vista al mar',
    subtitle: 'Presentación elegante con ambiente costero',
    description: 'Captura artística de coctel de camarón en ambiente marino. La composición integra elementos naturales del mar para crear una narrativa visual de frescura costera. Iluminación suave que simula luz natural de playa, con tonos azules y verdes para evocar el océano. Ideal para menús de restaurantes especializados en mariscos.',
    image: '/images/photos/coctel-camaron-mar.png',
    category: 'Fotografía editorial gastronómica',
  },
  {
    id: 5,
    title: 'Coctel de Camarón',
    subtitle: 'Close-up de presentación comercial',
    description: 'Fotografía de producto enfocada en la presentación del coctel en cristalería elegante. El encuadre cercano resalta los colores vibrantes del coctel, la frescura de los camarones y los detalles de la salsa. Iluminación de estudio con reflectores para crear brillos en el vidrio. Postproducción con ajuste de color para resaltar rojos y naranjas apetitosos.',
    image: '/images/photos/coctel-camaron-vaso.png',
    category: 'Fotografía publicitaria',
  },
  {
    id: 6,
    title: 'Platillo de Negocio con Fondo',
    subtitle: 'Fotografía comercial con contexto empresarial',
    description: 'Imagen lifestyle que combina gastronomía con ambiente profesional. El coctel se presenta en un contexto de negocio, sugiriendo reuniones ejecutivas o eventos corporativos. Fondo desenfocado (bokeh) para aislar el producto principal mientras mantiene contexto visual. Iluminación balanceada entre ambiente y producto.',
    image: '/images/photos/coctel-negocio-fondo.png',
    category: 'Fotografía lifestyle',
  },
  {
    id: 7,
    title: 'Ensalada de Camarón',
    subtitle: 'Fotografía fresca y saludable de plato principal',
    description: 'Captura de ensalada de camarón con énfasis en ingredientes frescos y presentación saludable. La composición resalta los colores naturales de vegetales y mariscos. Iluminación cenital con difusor para evitar reflejos duros en elementos húmedos. Edición que mantiene tonos naturales para transmitir frescura y alimentación balanceada.',
    image: '/images/photos/ensalada-camaron.png',
    category: 'Fotografía gastronómica saludable',
  },
  {
    id: 8,
    title: 'Helado Artesanal',
    subtitle: 'Fotografía de postres con texturas cremosas',
    description: 'Imagen apetitosa de helado artesanal capturando la textura cremosa y los detalles del producto. La velocidad de disparo fue crucial para capturar el helado antes de que se derrita. Iluminación lateral suave para resaltar volumen y cremosidad. Color grading que enfatiza tonalidades frías y dulces, ideal para cartas de postres.',
    image: '/images/photos/helado.png',
    category: 'Fotografía de postres',
  },
  {
    id: 9,
    title: 'Huevos al Estilo',
    subtitle: 'Fotografía de desayuno con iluminación natural',
    description: 'Captura de huevos preparados con técnica y presentación cuidadosa. La iluminación natural de ventana lateral crea sombras suaves que añaden profundidad al plato. Composición simple pero efectiva que destaca la textura de la yema y clara. Postproducción sutil que mantiene colores naturales y apetitosos.',
    image: '/images/photos/huevos.png',
    category: 'Fotografía de desayuno',
  },
  {
    id: 10,
    title: 'Proceso de Mezcla',
    subtitle: 'Fotografía de proceso culinario en acción',
    description: 'Imagen dinámica capturando el momento de mezcla de ingredientes. La fotografía de acción requirió velocidad de obturación rápida para congelar el movimiento. Iluminación continua para mantener consistencia durante la acción. Esta serie muestra el proceso detrás del plato final, ideal para contenido educativo de cocina.',
    image: '/images/photos/mezcla.png',
    category: 'Fotografía de proceso',
  },
  {
    id: 11,
    title: 'Oreos y Leche',
    subtitle: 'Fotografía de producto icónico con estilismo simple',
    description: 'Composición clásica de galletas Oreo con elementos complementarios. El contraste entre el negro de las galletas y el blanco de la leche crea impacto visual inmediato. Iluminación de estudio con softbox para mantener detalles en sombras profundas. Fotografía de producto que balancea simplicidad con profesionalismo comercial.',
    image: '/images/photos/oreos.png',
    category: 'Fotografía de producto comercial',
  },
  {
    id: 12,
    title: 'Pan Artesanal',
    subtitle: 'Fotografía que resalta texturas y calidez',
    description: 'Captura de pan artesanal destacando la corteza crujiente y miga esponjosa. Iluminación cálida que enfatiza los tonos dorados de la corteza. El enfoque selectivo resalta la textura mientras crea profundidad de campo. Postproducción con tonos cálidos que evocan frescura recién horneada, perfecta para panaderías artesanales.',
    image: '/images/photos/pan.png',
    category: 'Fotografía artesanal',
  },
  {
    id: 13,
    title: 'Pescado Asado',
    subtitle: 'Fotografía gastronómica con presentación elegante',
    description: 'Imagen profesional de pescado asado con presentación de restaurante. La iluminación lateral resalta las marcas de la parrilla y la jugosidad del pescado. Composición que incluye elementos complementarios para crear una escena completa. Color grading que realza tonos dorados y marrones del asado sin perder detalles en sombras.',
    image: '/images/photos/pescado-asado.png',
    category: 'Fotografía gastronómica premium',
  },
  {
    id: 14,
    title: 'Pescado Frito',
    subtitle: 'Captura de textura crujiente y dorada',
    description: 'Fotografía que captura la textura crujiente y color dorado del pescado frito perfectamente. La iluminación de tres puntos crea brillos en la superficie crispy y define el volumen del plato. Composición que transmite frescura y calidad del producto. Edición que mantiene los dorados intensos característicos de fritura bien ejecutada.',
    image: '/images/photos/pescado-frito.png',
    category: 'Fotografía culinaria',
  },
  {
    id: 15,
    title: 'Plato de Camarón Frito',
    subtitle: 'Presentación completa de platillo principal',
    description: 'Fotografía de plato completo con camarones fritos y guarniciones. La composición balanceada muestra todos los elementos del platillo de manera apetitosa. Iluminación que resalta tanto los camarones como los acompañamientos. Ángulo de 45 grados para mostrar profundidad y volumen del plato, técnica ideal para menús de restaurante.',
    image: '/images/photos/plato-camaron-frito.png',
    category: 'Fotografía para menú',
  },
  {
    id: 16,
    title: 'Tamizando Harina',
    subtitle: 'Fotografía de proceso con movimiento capturado',
    description: 'Imagen dinámica capturando el proceso de tamizado de harina en plena acción. La fotografía congela el movimiento del polvo en el aire, creando una atmósfera etérea. Iluminación trasera (backlight) para hacer visible las partículas suspendidas. Esta técnica muestra el proceso artesanal de la repostería, ideal para contenido educativo y storytelling culinario.',
    image: '/images/photos/tamizando.png',
    category: 'Fotografía de proceso artesanal',
  },
];

export default function FotografiaGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>(photos[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handlePhotoClick = (photo: Photo) => {
    // Activar animación de actualización
    setIsUpdating(true);
    
    // Actualizar la foto seleccionada
    setSelectedPhoto(photo);
    
    // Scroll suave hacia la sección de descripción
    setTimeout(() => {
      if (descriptionRef.current) {
        const offset = 80; // Offset para el navbar
        const elementPosition = descriptionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Desactivar animación después de que termine
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
                {selectedPhoto.title}
              </h2>
              <p className="text-xl text-purple-400 mb-6 font-semibold">
                {selectedPhoto.subtitle}
              </p>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{selectedPhoto.description}</p>
              </div>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                  {selectedPhoto.category}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10 transition-all duration-500 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-linear-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Galería de Trabajos
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Haz clic en cada imagen para ver más detalles
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 ${
                  selectedPhoto.id === photo.id
                    ? 'ring-4 ring-purple-500 scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent transition-opacity duration-300 flex items-end p-6 ${
                    selectedPhoto.id === photo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div>
                    <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                    <p className="text-gray-300 text-sm">{photo.category}</p>
                  </div>
                </div>

                {/* Selected indicator */}
                {selectedPhoto.id === photo.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
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
