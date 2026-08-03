import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Instagram, Facebook, Phone, Heart, Send, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const partners = [
    { name: 'Booking.com', src: '/Partners/Booking.com - Logo.png' },
    { name: 'TripAdvisor', src: '/Partners/Trip Advisor - Logo.png' },
    { name: 'Expedia', src: '/Partners/Expedia - Logo.png' },
    { name: 'Google', src: '/Partners/Google - Logo.png' },
    { name: 'Airbnb', src: '/Partners/Airbnb - Logo.png' },
    { name: 'Agoda', src: '/Partners/Agoda-Logo-Cropped.png' },
    { name: 'Little Hotelier', src: '/Partners/little-hotelier-logo.png' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 5000);
  };

  const footerLinks = [
    { name: 'Stay & Accommodation', path: '/stay' },
    { name: 'Riverside Dining', path: '/dining' },
    { name: 'Island Experiences', path: '/experiences' },
    { name: 'Seasonal Retreats', path: '/retreats' },
    { name: 'Visual Gallery', path: '/gallery' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#333333] text-white pb-10 border-t border-white/5 relative overflow-hidden w-full">
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="bg-[#E5E0D8] py-8 overflow-hidden relative border-b border-black/10 w-full mb-16">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#2C2C2C]/60 font-bold">
            Available On
          </span>
        </div>
        
        <div className="relative w-full max-w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#E5E0D8] to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden group">
            <div className="animate-infinite-scroll">
              <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8 shrink-0">
                {[...partners, ...partners].map((partner, idx) => (
                  <div key={`block1-${idx}`} className="shrink-0 flex items-center">
                    <img src={partner.src} alt={partner.name} width="120" height="40" className="h-7 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-sm" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-12 md:gap-16 px-6 md:px-8 shrink-0">
                {[...partners, ...partners].map((partner, idx) => (
                  <div key={`block2-${idx}`} className="shrink-0 flex items-center">
                    <img src={partner.src} alt={partner.name} width="120" height="40" className="h-7 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#E5E0D8] to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" onClick={scrollToTop} aria-label="Go to homepage" className="inline-block cursor-pointer mb-2">
              {!logoError ? (
                <img 
                  src="logo/logo.png" 
                  alt="NOPREA Boutique Hotel" 
                  width="180"
                  height="128"
                  className="h-24 md:h-28 lg:h-32 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex flex-col">
                  <span className="font-serif text-3xl tracking-[0.25em] font-medium text-white">NOPREA</span>
                  <span className="text-[10px] tracking-[0.4em] uppercase font-light text-[#B78C74] mt-1">Boutique Hotel</span>
                </div>
              )}
            </Link>
            
            <p className="text-xs text-white/70 leading-relaxed font-light max-w-sm">
              Celebrating genuine hospitality, Nubian craftsmanship, and comfortable island living along the quiet shores of the timeless Nile River in Aswan, Egypt.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://www.instagram.com/nopreaboutiquehotel" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/85 hover:text-[#E5D3B3] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/share/1E5okPWEAn/?mibextid=wwXIfr" aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/85 hover:text-[#E5D3B3] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/nopreaboutiquehotel/" aria-label="Follow us on LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/85 hover:text-[#E5D3B3] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:visitaswan@nopreahotel.com" aria-label="Send us an email" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/85 hover:text-[#E5D3B3] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#E5D3B3]">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} onClick={scrollToTop} className="text-xs text-white/70 hover:text-[#E5D3B3] font-light flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[#B78C74]" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#E5D3B3]">Guest Relations</h4>
            <div className="space-y-5 text-sm text-white/80 font-light flex flex-col">
              <a href="https://maps.app.goo.gl/ZVKyN9LhsXSQ3dgz6" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5D3B3] flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#B78C74] shrink-0" />
                <span>Haissa Island, Aswan</span>
              </a>
              <a href="tel:+201228778788" className="hover:text-[#E5D3B3] flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B78C74] shrink-0" /> 
                <span>+20 122 877 8788</span>
              </a>
              <a href="mailto:visitaswan@nopreahotel.com" className="hover:text-[#E5D3B3] flex items-center gap-3 break-all">
                <Mail className="w-5 h-5 text-[#B78C74] shrink-0" /> 
                <span>visitaswan@nopreahotel.com</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#E5D3B3]">Bespoke Dispatch</h4>
            <p className="text-xs text-white/70 font-light">Subscribe to receive private updates and seasonal retreat stories.</p>
            {success ? (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#E5D3B3]">Subscribed successfully!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  aria-label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs flex-1 text-white placeholder-white/30 focus:outline-none"
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter" className="cursor-pointer shrink-0 p-3 bg-[#C28C7E] hover:bg-[#B78C74] text-white rounded-xl transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/55 space-y-4 md:space-y-0">
          <div>&copy; {new Date().getFullYear()} NOPREA Boutique Hotel. All Rights Reserved.</div>
          <div className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#C28C7E] fill-current" /> Celebrating Nubian Heritage</div>
          {/* 🟢 تم تغيير الاسم هنا لـ NOPREA's Overview */}
          <div className="flex space-x-6">
            <Link to="/terms-conditions" className="hover:text-white text-[#E5D3B3]">Terms &amp; Conditions</Link>
            <Link to="/overview" onClick={scrollToTop} className="hover:text-white text-[#E5D3B3]">NOPREA's Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}