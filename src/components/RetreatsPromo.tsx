/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Check, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RetreatsPromo() {
  const pillars = [
    { title: 'Nourishment', desc: 'Savour fresh, local farm-to-table cuisine crafted in Nubian tradition.' },
    { title: 'Movement', desc: 'Realign with slow island flows, riverside walks, and yoga at sunrise.' },
    { title: 'Mindset', desc: 'Cultivate deep quiet, mindfulness, and the peaceful flow of the river.' },
    { title: 'Connection', desc: 'Build meaningful bonds with the Nubian culture, land, and host partners.' },
    { title: 'Restoration', desc: 'Unpack fatigue through silence and personalized comfortable spaces.' },
    { title: 'Discovery', desc: 'Embrace life along the Nile, temple visits, and curated local encounters.' },
  ];

  return (
    <section id="retreats" className="py-24 bg-palm-green text-white relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-clay/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-clay via-warm-sand to-clay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] tracking-[0.4em] uppercase text-warm-sand font-bold">
                SEASONAL WELL-BEING RETREAT SERIES
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-clay" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              Autumn Equinox Retreat
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-warm-sand">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-clay" />
                <span>18–25 September 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-terracotta text-white px-4 py-2 rounded-full animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Early Bird Bookings Available Until 31 July</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-limestone/85 leading-relaxed font-light">
              Throughout the year, NOPREA hosts a series of seasonal retreats in collaboration with <span className="font-bold text-warm-sand">ALSHEMRAN Well-Being Caravan™</span> and <span className="font-bold text-warm-sand">JAMILINA Wellness™</span>, combining boutique hospitality with practical, science-based well-being experiences.
            </p>

            <div className="pt-6 border-t border-white/10">
              <span className="text-[10px] tracking-widest uppercase text-warm-sand font-bold block mb-4">
                THE SIX PILLARS OF OUR EXPERIENCE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((p, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <div className="flex-shrink-0 mt-0.5 p-1 bg-clay/20 rounded text-warm-sand">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-white tracking-wide">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-white/70 font-light leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-warm-white text-charcoal p-8 sm:p-10 rounded-3xl border border-clay/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-clay/5 rounded-bl-full pointer-events-none" />
            
            <h3 className="font-serif text-3xl font-bold text-nile-blue mb-4">
              Reserve Your Place
            </h3>
            
            <p className="text-sm text-charcoal/80 font-light leading-relaxed mb-8">
              We invite you to join our upcoming seasonal experience. Space is intentionally limited to ensure a highly personalized and attentive stay for every guest.
            </p>

            <Link
              to="/retreat-application"
              className="cursor-pointer w-full text-center py-4 rounded-xl bg-terracotta hover:bg-nile-blue text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mb-8"
            >
              <span>Guest Information & Registration Form</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="space-y-3 pt-6 border-t border-clay/15">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-palm-green" />
                <p className="text-xs text-charcoal/70 font-medium">Certified practitioners</p>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-palm-green" />
                <p className="text-xs text-charcoal/70 font-medium">40+ years combined experience</p>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-palm-green" />
                <p className="text-xs text-charcoal/70 font-medium">No medical claims</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}