import React from 'react';
import { Utensils, Leaf, Wine, ArrowRight } from 'lucide-react';

export default function Dining() {
  return (
    <main className="bg-warm-white min-h-screen">
      {/* 🟢 لغينا التوسيط وحطينا justify-start والبادنج الموحد */}
      <section className="relative h-[70vh] flex flex-col items-center justify-start overflow-hidden pt-[160px] md:pt-[192px]">
        <img 
          src="/Dining/noprea-boutique-hotel-restaurant-aswan.jpg" 
          alt="Riverside Dining at NOPREA" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* 🟢 شيلنا الـ mt من هنا */}
        <div className="relative z-10 text-center px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-warm-sand block mb-3">
            CULINARY JOURNEY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4 drop-shadow-md">
            Riverside Dining
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Fresh seasonal cuisine served indoors and overlooking the Nile, inspired by traditional Nubian flavours and the rhythm of the island.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-clay font-bold block mb-2">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
                Farm-to-Table Cuisine & <br /> Nubian Flavours
              </h2>
              <div className="w-12 h-[2px] bg-clay mt-6" />
            </div>
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              We believe that the best meals are crafted from the freshest ingredients. Our kitchen partners with local farmers on Haissa Island to bring seasonal, organic produce directly to your table. Every dish is a celebration of authentic Nubian recipes passed down through generations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <Leaf className="w-5 h-5 text-terracotta flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">Seasonal Menus</h4>
                  <p className="text-[11px] text-charcoal/70 font-light leading-relaxed">Ingredients harvested at their peak for maximum flavour.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Utensils className="w-5 h-5 text-terracotta flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">Traditional Tagines</h4>
                  <p className="text-[11px] text-charcoal/70 font-light leading-relaxed">Slow-cooked meals using ancient local clay techniques.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Wine className="w-5 h-5 text-terracotta flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">Private Dining</h4>
                  <p className="text-[11px] text-charcoal/70 font-light leading-relaxed">Exclusive setups by the Nile or in your courtyard.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="rounded-3xl overflow-hidden shadow-md mt-8">
              <img 
                src="/Dining/noprea-open-air-restaurant-nile-view-aswan.jpg" 
                alt="Private Dining setup" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md mb-8">
              <img 
                src="/Farm-to-Table Experiences/noprea-oriental-breakfast-aswan.avif" 
                alt="Fresh Local Ingredients" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}