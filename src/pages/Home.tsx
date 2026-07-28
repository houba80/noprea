import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import DiscoverNoprea from '../components/DiscoverNoprea';
import ReviewCarousel from '../components/ReviewCarousel';
import Gallery from '../components/Gallery';
import PlanYourStay from '../components/PlanYourStay';
import { Review } from '../types';

const REVIEWS_DATA: Review[] = [
  { id: '1', rating: 5, quote: 'The incredible views from our balcony...', name: 'Erin', country: 'United Kingdom' },
  { id: '2', rating: 5, quote: 'The highlight, without a doubt, was the breathtaking view...', name: 'Patrycia', country: 'United States' },
  { id: '3', rating: 5, quote: "A beautiful escape from the hustle and bustle...", name: 'Hesari', country: 'Egypt' },
  { id: '4', rating: 5, quote: 'Very peaceful location, spacious rooms...', name: 'Sami', country: 'United Kingdom' }
];

export default function Home() {
  // تطبيق الـ SEO
  useEffect(() => {
    document.title = "NOPREA Boutique Hotel | Haissa Island, Aswan";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "A boutique hotel on Haissa Island, Aswan, where authentic Nubian hospitality meets the timeless beauty of the Nile.");
    }
  }, []);

  return (
    <main>
      <Hero onBookClick={() => {}} onRetreatsClick={() => {}} />
      <Welcome />
      <DiscoverNoprea onCardClick={() => {}} />
      <ReviewCarousel reviews={REVIEWS_DATA} />
      <Gallery />
      <PlanYourStay />
    </main>
  );
}