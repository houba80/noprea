import React, { useEffect } from 'react';
import About from '../components/About';

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | NOPREA Boutique Hotel Aswan";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover the story, philosophy, and Nubian heritage behind NOPREA Boutique Hotel on Haissa Island.");
    }
  }, []);

  return (
    <main className="bg-warm-white min-h-screen pt-24">
      <About />
    </main>
  );
}