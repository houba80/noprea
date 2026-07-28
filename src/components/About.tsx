/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart, Trees, Compass } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Authentic Nubian Heritage',
      description: 'Celebrating the architecture, craftsmanship, cuisine, and traditions of Haissa Island.',
      icon: <Compass className="w-5 h-5 text-terracotta" />,
    },
    {
      title: 'Personalized Hospitality',
      description: 'Every guest is welcomed with warmth, care, and genuine attention to detail.',
      icon: <Heart className="w-5 h-5 text-terracotta" />,
    },
    {
      title: 'Meaningful Experiences',
      description: 'Creating memorable moments through thoughtful service, local culture, and the natural beauty of Aswan.',
      icon: <Sparkles className="w-5 h-5 text-terracotta" />,
    },
    {
      title: 'Respect for Nature',
      description: 'Honouring the island, its community, and the timeless rhythm of life along the Nile.',
      icon: <Trees className="w-5 h-5 text-terracotta" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-limestone relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-clay/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
                OUR HERITAGE & VISION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal tracking-tight leading-tight">
                Our Story
              </h2>
              <div className="w-16 h-[2px] bg-clay mt-4" />
            </div>

            <div className="font-serif text-lg sm:text-xl font-light text-terracotta italic leading-relaxed">
              &ldquo;Built on the peaceful shores of Haissa Island, NOPREA Boutique Hotel was founded on a simple belief: that genuine hospitality begins with people, place, and meaningful human connection. Rooted in Nubian heritage, the hotel celebrates the traditions, craftsmanship, architecture, and warm welcome that have defined this region for generations.&rdquo;
            </div>

            <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-light">
              We are intentionally boutique in scale, allowing every room to be individually considered and every guest to be personally welcomed. Whether visiting for a quiet escape, a cultural journey, or simply to experience the beauty of the Nile, our aim is to create a stay that feels authentic, comfortable, and memorable.
            </p>

            {/* Inset Quote or Highlights Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-warm-white border border-clay/15 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-clay/5 rounded-bl-full pointer-events-none" />
              <h4 className="font-serif text-lg font-bold text-nile-blue mb-2">
                What Makes NOPREA Special?
              </h4>
              <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                It is the whisper of the breeze in the palms, the golden sun setting over ancient ruins, the warm smile of a staff member serving home-cooked Tagines, and the gentle lapping of the Nile currents outside your balcony.
              </p>
            </div>
          </div>

          {/* Values Column */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
                GUIDING PRINCIPLES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal tracking-tight leading-tight">
                Our Values
              </h2>
              <div className="w-16 h-[2px] bg-clay mt-4" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-clay/10 shadow-sm hover:shadow-md hover:border-clay/20 transition-all duration-300 flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 p-3 bg-limestone rounded-xl border border-clay/25">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
