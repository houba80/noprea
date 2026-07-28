/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import DiscoverNoprea from '../../components/DiscoverNoprea';
import Welcome from '../../components/Welcome';
import RoomCard from '../../components/RoomCard';
import ReviewCarousel from '../../components/ReviewCarousel';
import RetreatsPromo from '../../components/RetreatsPromo';
import About from '../../components/About';
import Gallery from '../../components/Gallery';
import PlanYourStay from '../../components/PlanYourStay';
import Footer from '../../components/Footer';

// Mock Data representing premium sanctuaries
const ROOMS_DATA = [
  {
    id: 'nile-view-rooms',
    name: 'Panoramic Nile View Rooms',
    description: 'Our entry category and a favorite among returning guests. Individually designed in the Nubian tradition, each room offers comfortable accommodation, handcrafted details, and beautiful views overlooking the Nile.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    features: [
      'King or Twin Bed Options',
      'En-suite Bathroom',
      'Nile View',
      'Complimentary Wi-Fi',
      'Daily Housekeeping',
      'Welcome Refreshments'
    ],
    type: 'room',
    view: 'Nile River',
    priceInfo: 'From $120 / night'
  },
  {
    id: 'garden-courtyard-suite',
    name: 'Garden Courtyard Suite',
    description: 'A larger suite overlooking our peaceful gardens, offering additional living space and a tranquil setting for guests seeking a longer or more relaxed stay.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Separate Sitting Area',
      'Garden Access',
      'Private Outdoor Seating',
      'En-suite Bathroom',
      'Complimentary Wi-Fi',
      'Daily Housekeeping'
    ],
    type: 'suite',
    view: 'Private Garden',
    priceInfo: 'From $160 / night'
  }
];

// Mock verified testimonials
const REVIEWS_DATA = [
  {
    id: '1',
    rating: 5,
    quote: 'The incredible views from our balcony, the wonderful service, and the outstanding food made us feel less like tourists and more like friends staying with family. We plan to be back again and again.',
    name: 'Erin',
    country: 'United Kingdom'
  },
  {
    id: '2',
    rating: 5,
    quote: 'The highlight, without a doubt, was the breathtaking view of the Nile. The staff made us feel at home from the moment we arrived.',
    name: 'Patrycia',
    country: 'United States'
  },
  {
    id: '3',
    rating: 5,
    quote: "A beautiful escape from the hustle and bustle of city life. If you're looking for silence, fresh air, and genuine hospitality, this is the place.",
    name: 'Hesari',
    country: 'Egypt'
  },
  {
    id: '4',
    rating: 5,
    quote: 'Very peaceful location, spacious rooms, and an amazing team who looked after every detail throughout our stay.',
    name: 'Sami',
    country: 'United Kingdom'
  }
];

export default function PreviewPage() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = () => {
    scrollToSection('plan-stay');
  };

  const handleRetreatsClick = () => {
    scrollToSection('retreats');
  };

  return (
    <div className="relative min-h-screen bg-warm-white selection:bg-clay selection:text-white">
      {/* Floating Header Navbar */}
      <Navbar onNavClick={scrollToSection} activeSection={activeSection} />

      {/* Hero Video & Slide Carousel */}
      <Hero onBookClick={handleBookClick} onRetreatsClick={handleRetreatsClick} />

      {/* Welcome & Introduction Panel */}
      <Welcome />

      {/* Discover NOPREA 4-Category Cards */}
      <DiscoverNoprea onCardClick={scrollToSection} />

      {/* Featured Accommodation Rooms Section */}
      <section id="rooms" className="py-24 bg-warm-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
              SANCTUARIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal mb-4">
              Choose the Space That Suits Your Stay
            </h2>
            <div className="w-12 h-[2px] bg-clay mx-auto mb-6" />
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              Every room at NOPREA Boutique Hotel is inspired by traditional Nubian architecture, combining handcrafted design, modern comfort, and beautiful surroundings to create a peaceful and memorable stay.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {ROOMS_DATA.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onBookClick={handleBookClick} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Well-Being Retreats detailed Section */}
      <RetreatsPromo />

      {/* The NOPREA Experience / Rotating Carousel Reviews Section */}
      <ReviewCarousel reviews={REVIEWS_DATA} />

      {/* Dynamic Filterable Media Gallery */}
      <Gallery />

      {/* About & Values Grid */}
      <About />

      {/* Plan Your Stay / Interactive Booking & Maps section */}
      <PlanYourStay />

      {/* Footer Navigation, Newsletter, and Details */}
      <Footer onNavClick={scrollToSection} />
    </div>
  );
}
