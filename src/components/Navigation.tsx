import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  // Detectar si estamos en la página principal
  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      }
    );
  }, []);

  // Animar menú móvil
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;

    const menuElement = mobileMenuRef.current;
    const linksElement = mobileLinksRef.current;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        // Animar apertura del contenedor
        gsap.fromTo(
          menuElement,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          }
        );

        // Stagger de los elementos del menú al abrir
        gsap.fromTo(
          linksElement.children,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power2.out',
          }
        );
      } else {
        // Animar cierre - primero los elementos, luego el contenedor
        const tl = gsap.timeline();

        // Animar elementos saliendo hacia la derecha con stagger invertido
        tl.to(linksElement.children, {
          opacity: 0,
          x: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in',
        })
        // Luego cerrar el contenedor
        .to(menuElement, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        }, '-=0.1'); // Solapa ligeramente con la animación anterior
      }
    });

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // Ajustar links según la página
  const navLinks = [
    { href: isHomePage ? '#proyectos' : '/#proyectos', label: 'Proyectos' },
    { href: isHomePage ? '#contacto' : '/#contacto', label: 'Contacto' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-purple-500/10'
          : 'bg-white/2 backdrop-blur-sm'
      }`}
      style={{
        background: isScrolled
          ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold text-white hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
          >
            Portafolio<span className="text-purple-400">3D</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            <a
              href={isHomePage ? '#contacto' : '/#contacto'}
              className="relative px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 overflow-hidden"
              style={{
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 24px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              Trabajemos
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 relative">
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden"
          >
            <div
              ref={mobileLinksRef}
              className="mt-6 pb-6 space-y-1 border-t border-white/10 pt-6 backdrop-blur-xl rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.05))',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-gray-200 hover:text-white transition-all font-medium rounded-xl hover:bg-white/10 hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:translate-x-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 px-4">
                <a
                  href="#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3.5 text-white font-semibold rounded-xl text-center transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                >
                  Trabajemos Juntos
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
