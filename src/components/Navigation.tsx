import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
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
            href="#"
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
              href="#contacto"
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
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-6 pb-6 space-y-4 border-t border-white/20 pt-6 backdrop-blur-lg rounded-lg -mx-6 px-6"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors font-medium hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              style={{
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 24px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              Trabajemos
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
