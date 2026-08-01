import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import DiscoverNoprea from '../components/DiscoverNoprea';
import ReviewCarousel from '../components/ReviewCarousel';
import Gallery from '../components/Gallery';
import PlanYourStay from '../components/PlanYourStay';
import { fetchReviews } from '../api/index';

export default function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    document.title = "NOPREA Boutique Hotel | Haissa Island, Aswan";
    
    const getReviews = async () => {
      try {
        const { data } = await fetchReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews");
      }
    };
    getReviews();
  }, []);

  return (
    <main>
      <Hero onBookClick={() => {}} onRetreatsClick={() => {}} />
      <Welcome />
      <DiscoverNoprea onCardClick={() => {}} />
      
      {reviews.length > 0 && <ReviewCarousel reviews={reviews} />}
      
      <Gallery />
      <PlanYourStay />
    </main>
  );
}