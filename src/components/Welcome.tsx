/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Welcome() {
  const aswanImage = "/aswan/ASWAN.AVIF";

  return (
    <section className="py-24 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block">
              THE STORY OF NOPREA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal leading-tight">
              An Authentic Nubian Experience
            </h2>
            <div className="w-12 h-[2px] bg-clay" />
            <p className="text-sm text-charcoal/85 font-light leading-relaxed">
              Nestled on the peaceful shores of Haissa Island, NOPREA is more than a boutique hotel—it is a living celebration of Nubian craftsmanship, slow island living, and ancient history.
            </p>
            <p className="text-sm text-charcoal/75 font-light leading-relaxed">
              Every stone, textile, and corner has been thoughtfully curated to harmonize with the timeless flow of the Nile, offering our guests a private, restorative escape from the modern world.
            </p>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-charcoal">
              <img
                src={aswanImage}
                alt="The majestic Nile River in Aswan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative -mt-6 mx-6 sm:mx-12 lg:absolute lg:-bottom-10 lg:mt-0 lg:mx-0 lg:left-12 lg:right-12 z-10 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-clay/10 transform transition-transform hover:-translate-y-1 duration-300">
              <span className="text-[9px] tracking-widest uppercase font-bold text-clay block mb-2">
                LIVING ON THE WATER
              </span>
              <p className="font-serif text-sm sm:text-base italic text-charcoal leading-relaxed">
                &ldquo;Where the golden sands of Aswan slide silently into the crystal blue currents of the ancient Nile.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}