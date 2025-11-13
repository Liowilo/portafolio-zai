import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, useGLTF, Html, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3D {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: string;
  modelUrl: string;
  cameraPosition: [number, number, number];
  scale: number;
}

// Modelos 3D locales (archivos GLB en /public/models/)
const scenes: Scene3D[] = [
  {
    id: 1,
    title: 'Cafetería Moderna',
    subtitle: 'Espacio comercial con ambiente acogedor',
    description: 'Escenario 3D de una cafetería moderna con barra de servicio, área de mesas y zona de espera. Modelado completo en Blender con texturas PBR, incluye mobiliario, máquinas de café, decoración y sistema de iluminación ambiental. El proyecto demuestra técnicas de modelado arquitectónico comercial, iluminación cálida y renderizado en tiempo real.',
    thumbnail: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80',
    category: 'Commercial Space',
    modelUrl: '/models/cafeteria.glb',
    cameraPosition: [3, 2, 3],
    scale: 0.5,
  },
];

// Componente para cargar el modelo 3D
function Model({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url);
  
  // Centrar el modelo automáticamente
  useEffect(() => {
    if (scene) {
      // Calcular el centro del modelo
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      // Mover el modelo para que su centro esté en el origen
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
    }
  }, [scene]);
  
  return <primitive object={scene} scale={scale} />;
}

// Componente de cámara FPS con controles WASD para desktop
function FPSCamera({ initialPosition }: { initialPosition: [number, number, number] }) {
  const { camera, gl } = useThree();
  const moveSpeed = 0.1;
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
  });

  useEffect(() => {
    // Ajustar altura de la cámara para que esté a nivel de persona (más alta)
    const adjustedPosition: [number, number, number] = [
      initialPosition[0],
      initialPosition[1] + 3, // Aumentar a 3 unidades de altura
      initialPosition[2]
    ];
    camera.position.set(...adjustedPosition);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Prevenir scroll de página con espacio
      if (key === ' ') {
        e.preventDefault();
      }
      
      if (key === 'w') keys.current.w = true;
      if (key === 'a') keys.current.a = true;
      if (key === 's') keys.current.s = true;
      if (key === 'd') keys.current.d = true;
      if (key === 'shift') keys.current.shift = true;
      if (key === ' ') keys.current.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Prevenir scroll de página con espacio
      if (key === ' ') {
        e.preventDefault();
      }
      
      if (key === 'w') keys.current.w = false;
      if (key === 'a') keys.current.a = false;
      if (key === 's') keys.current.s = false;
      if (key === 'd') keys.current.d = false;
      if (key === 'shift') keys.current.shift = false;
      if (key === ' ') keys.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera, initialPosition]);

  useFrame(() => {
    const speed = keys.current.shift ? moveSpeed * 2 : moveSpeed;
    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(direction);
    // Solo usar componentes X y Z para movimiento horizontal
    direction.y = 0;
    direction.normalize();
    right.crossVectors(camera.up, direction).normalize();

    // Movimiento correcto: W adelante, S atrás, A izquierda, D derecha
    if (keys.current.w) camera.position.addScaledVector(direction, speed);
    if (keys.current.s) camera.position.addScaledVector(direction, -speed);
    if (keys.current.a) camera.position.addScaledVector(right, speed);
    if (keys.current.d) camera.position.addScaledVector(right, -speed);
    if (keys.current.space) camera.position.y += speed;
    if (keys.current.shift && !keys.current.w && !keys.current.s && !keys.current.a && !keys.current.d) {
      camera.position.y -= speed;
    }
  });

  return <PointerLockControls />;
}

// Loading component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-semibold">Cargando modelo 3D...</p>
      </div>
    </Html>
  );
}

export default function Escenario3DGallery() {
  const [selectedScene, setSelectedScene] = useState<Scene3D>(scenes[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showControls, setShowControls] = useState(true); // Abierto por defecto
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSceneClick = (scene: Scene3D) => {
    setIsUpdating(true);
    setSelectedScene(scene);
    
    setTimeout(() => {
      if (canvasRef.current) {
        const offset = 100; // Espacio desde el top
        const elementPosition = canvasRef.current.getBoundingClientRect().top;
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
      {/* 3D Viewer Section */}
      <section className="py-16 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Scene Info */}
          <div className={`mb-8 transition-all duration-500 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {selectedScene.title}
            </h2>
            <p className="text-xl text-purple-400 mb-4 font-semibold">
              {selectedScene.subtitle}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              {selectedScene.description}
            </p>
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              {selectedScene.category}
            </span>
          </div>

          {/* 3D Canvas Viewer */}
          <div 
            ref={canvasRef}
            id="canvas-container"
            className={`relative w-full h-[600px] rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10 bg-gray-950 transition-all duration-500 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
          >
            <Canvas shadows>
              {/* Cámara FPS con controles WASD para desktop */}
              <FPSCamera initialPosition={selectedScene.cameraPosition} />
              
              {/* Luces */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              {/* Environment para reflejos */}
              <Environment preset="city" />
              
              {/* Modelo 3D */}
              <Suspense fallback={<Loader />}>
                <Model url={selectedScene.modelUrl} scale={selectedScene.scale} />
              </Suspense>
            </Canvas>

            {/* Controls Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white text-sm max-w-xs">
              <button
                onClick={() => setShowControls(!showControls)}
                className="flex items-center gap-2 font-semibold mb-2 hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Controles
              </button>
              {showControls && (
                <>
                  {/* Controles Desktop */}
                  <div className="space-y-2 text-xs text-gray-300 hidden md:block">
                    <p className="text-purple-400 font-semibold mb-2">🖥️ Desktop</p>
                    <p className="text-yellow-400 mb-2">👆 Click en el visor para activar</p>
                    <p>⌨️ <span className="font-bold text-white">W A S D</span>: Mover cámara</p>
                    <p>🖱️ <span className="font-bold text-white">Mouse</span>: Mirar alrededor</p>
                    <p>⬆️ <span className="font-bold text-white">ESPACIO</span>: Subir</p>
                    <p>⬇️ <span className="font-bold text-white">SHIFT</span>: Bajar / Correr</p>
                    <p className="text-red-400 mt-2">⚠️ <span className="font-bold text-white">ESC</span>: Salir del modo cámara</p>
                  </div>
                  
                  {/* Controles Móvil */}
                  <div className="space-y-2 text-xs text-gray-300 md:hidden">
                    <p className="text-purple-400 font-semibold mb-2">📱 Móvil</p>
                    <p>👆 <span className="font-bold text-white">1 dedo</span>: Rotar vista</p>
                    <p>🤏 <span className="font-bold text-white">Pellizcar</span>: Zoom</p>
                    <p>✌️ <span className="font-bold text-white">2 dedos</span>: Mover cámara</p>
                  </div>
                </>
              )}
            </div>

            {/* Loading indicator */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Modelo 3D Interactivo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-linear-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Galería de Escenarios 3D
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Haz clic en cada escenario para explorarlo en 3D
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => handleSceneClick(scene)}
                className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 ${
                  selectedScene.id === scene.id
                    ? 'ring-4 ring-purple-500 scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={scene.thumbnail}
                    alt={scene.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent transition-opacity duration-300 flex items-end p-6 ${
                    selectedScene.id === scene.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div>
                    <h3 className="text-white font-bold text-lg">{scene.title}</h3>
                    <p className="text-gray-300 text-sm">{scene.category}</p>
                  </div>
                </div>

                {/* 3D indicator icon */}
                <div className="absolute top-4 left-4 bg-purple-500/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  <span className="text-white text-xs font-bold">3D</span>
                </div>

                {/* Selected indicator */}
                {selectedScene.id === scene.id && (
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
