import React from 'react';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#2C2C2C] overflow-hidden selection:bg-[#C28C7E] selection:text-white">
      <img
        src="/IMG_7143.AVIF"
        alt="NOPREA Boutique Hotel Aswan on the Nile"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        style={{ animation: 'pulse 15s ease-in-out infinite alternate' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 px-6 flex flex-col items-center text-center max-w-4xl mx-auto h-full justify-center">
        
        {/* Logo Section */}
        <div className="mb-2 md:mb-4 flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="NOPREA Boutique Hotel" 
            className="w-56 md:w-72 lg:w-80 h-auto drop-shadow-lg object-contain -mb-6 md:-mb-8"
          />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 drop-shadow-xl font-normal">
          “Experience the Luxury Soul of Aswan.”
        </h2>

        <p className="text-sm md:text-lg text-white/90 font-light max-w-2xl leading-relaxed mb-16 tracking-wide">
          A boutique retreat inspired by Nubian heritage, breathtaking Nile views, and personalized hospitality.
        </p>

        <div className="mt-8 pt-8 border-t border-white/20 w-full max-w-md">
          <p className="text-[11px] md:text-xs text-white/80 uppercase tracking-[0.2em] mb-3">
            Our full website launches soon.
          </p>
          <p className="text-[11px] md:text-xs text-white/80 uppercase tracking-[0.2em] flex flex-col sm:flex-row items-center justify-center gap-1">
            <span>for more info</span>
            <a 
              href="mailto:visitaswan@nopreahotel.com" 
              className="text-[#D9CBA0] hover:text-white transition-colors border-b border-[#D9CBA0]/50 hover:border-white pb-0.5 font-medium"
            >
              visitaswan@nopreahotel.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}