import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

// 🟢 خلينا الـ props اختيارية بعلامة ؟ عشان الكود يبقى Bulletproof
interface NavbarProps {
  onNavClick?: () => void;
  activeSection?: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // 🟢 ضفنا About هنا عشان تظهر في المينيو للناس
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stay', path: '/stay' },
    { name: 'Dining', path: '/dining' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Retreats', path: '/retreats' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' }, 
  ];

  const handleNavClick = () => {
    if (onNavClick) onNavClick();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-white/5 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-28 md:h-32 flex items-center justify-between">
        
        <Link to="/" aria-label="Go to homepage" className="flex items-center cursor-pointer group py-2 h-full">
          {!logoError ? (
            <img 
              src="/logo/logo.png" 
              alt="NOPREA Boutique Hotel" 
              width="180"
              height="112"
              className="h-24 md:h-28 w-auto max-h-full object-contain transition-all duration-300 group-hover:opacity-90"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif text-3xl tracking-[0.25em] font-medium text-white">NOPREA</span>
              <span className="text-[10px] tracking-[0.35em] uppercase font-light text-clay mt-0.5">Boutique Hotel</span>
            </div>
          )}
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={idx}
                to={link.path}
                onClick={handleNavClick}
                className={`cursor-pointer text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-warm-sand relative py-2 ${
                  isActive ? 'text-warm-sand' : 'text-white/80'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-warm-sand animate-fadeIn" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/book"
            className="cursor-pointer group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 font-medium text-[11px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-warm-sand group-hover:text-charcoal transition-colors" />
            <span>Book Stay</span>
          </Link>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-28 md:top-32 left-0 right-0 bg-charcoal border-b border-white/10 px-6 py-8 flex flex-col space-y-5 shadow-2xl">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={handleNavClick}
              className="text-sm uppercase tracking-widest text-white/90 hover:text-warm-sand transition-colors block py-1"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/5">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block py-3.5 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-widest"
            >
              Book Stay
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}