/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export default function Experiences() {
  useEffect(() => {
    document.title = "Experiences | NOPREA Boutique Hotel";
    window.scrollTo(0, 0);
  }, []);

  const experiencesList = [
    {
      title: "Nature & The Nile",
      desc: "Immerse yourself in the timeless flow of the world's longest river. From silent sunrise meditations on our private terraces to bird watching among the reeds, nature is the ultimate luxury at NOPREA.",
      img: "/Nature/noprea-yoga-by-the-nile-relax-angle-4.avif"
    },
    {
      title: "Nubian Heritage",
      desc: "Haissa Island is a living celebration of Nubian craftsmanship. Wander through colourful village paths, learn about traditional architecture, and experience a culture that has preserved its warmth for centuries.",
      img: "/Nubian-Architecture /nubian-village-entrance-aswan.avif"
    },
    {
      title: "Signature Experiences",
      desc: "Discover the hidden gems of Aswan. We curate personalized felucca sailing trips, botanical garden tours, and private visits to the Temple of Philae, ensuring a culturally rich and seamless journey.",
      img: "/Haissa-Island/haissa-island-feluccas-nile.avif.avif"
    },
    {
      title: "Tailor Your Stay",
      desc: "Every guest journey is unique. Our dedicated concierge team will craft an itinerary that perfectly balances relaxation, cultural immersion, and wellness retreats to suit your pace.",
      img: "/Nile-Views/walking-by-the-nile-river-view-aswan.avif"
    }
  ];

  return (
    <main className="min-h-screen bg-warm-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-clay block mb-4">
          NOPREA Island Experience
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal mb-6">
          Beyond Accommodation
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
          Your stay at NOPREA is an invitation to slow down and connect. Whether you are exploring ancient temples or enjoying the gentle breeze on a private felucca, every moment is thoughtfully curated to reflect the spirit of Haissa Island.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
          {experiencesList.map((exp, idx) => (
            <div key={idx} className="group flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-limestone/30">
                <img 
                  src={exp.img} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-charcoal mb-3">{exp.title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}