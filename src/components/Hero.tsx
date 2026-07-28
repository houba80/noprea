import React from 'react';
import { Compass, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onBookClick: () => void;
  onRetreatsClick: () => void;
}

export default function Hero({ onBookClick, onRetreatsClick }: HeroProps) {
  return (
    // التعديل هنا: نقلنا المسافة لتكون padding للـ section نفسه (pt-32 pb-16) عشان ندي مساحة للنافبار فوق ومساحة للزراير تحت
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal text-white pt-32 pb-16">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/Sunrise-and-Sunset/golden-hour-nile-reflection-aswan.avif"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 select-none pointer-events-none"
      >
        <source 
          src="/Video/Noprea-Boutique-Hotel-Video.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-black/50 pointer-events-none" />

      {/* شيلنا ה- mt-32 من هنا عشان المحتوى يتسنتر براحته بدون ما يتزق لتحت */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full animate-fadeIn">
          <Compass className="w-4 h-4 text-warm-sand animate-spin-slow" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-warm-sand">
            Haissa Island • Aswan
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide leading-tight text-white">
            <span className="block">The View.</span>
            <span className="block">The Silence.</span>
            <span className="block">The Comfort.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-limestone/90 font-light leading-relaxed tracking-wide italic">
            "Where the golden sands of Aswan slide silently into the crystal blue currents of the ancient Nile."
          </p>
        </div>

        <div className="w-12 h-[1px] bg-warm-sand/50 mx-auto pt-2" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/book"
            className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-clay hover:shadow-xl transition-all duration-300 group flex items-center justify-center gap-2"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/retreats"
            className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Wellness Retreats</span>
          </Link>
        </div>
      </div>
    </section>
  );
}