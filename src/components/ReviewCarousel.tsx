import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield, Bed, Eye, Utensils, Map, Ship, TreePine } from 'lucide-react';

interface ReviewCarouselProps {
  reviews: any[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, [reviews]);

  const highlights = [
    { id: 1, title: 'Boutique Accommodation', desc: 'Individually designed rooms inspired by Nubian architecture.', icon: <Bed className="w-5 h-5 text-[#C28C7E]" /> },
    { id: 2, title: 'Panoramic Nile Views', desc: 'Panoramic river views from rooms, terraces, and shared spaces.', icon: <Eye className="w-5 h-5 text-[#C28C7E]" /> },
    { id: 3, title: 'Signature Riverside Dining', desc: 'Fresh seasonal cuisine served indoors and overlooking the Nile.', icon: <Utensils className="w-5 h-5 text-[#C28C7E]" /> },
    { id: 4, title: 'Private Island Setting', desc: 'A peaceful location surrounded by nature and Nubian heritage.', icon: <Map className="w-5 h-5 text-[#C28C7E]" /> },
    { id: 5, title: 'Boat Transfers', desc: 'Convenient boat transfers to and from Haissa Island.', icon: <Ship className="w-5 h-5 text-[#C28C7E]" /> },
    { id: 6, title: 'Gardens & Outdoor Spaces', desc: 'Quiet courtyards, shaded gardens, and riverside seating areas.', icon: <TreePine className="w-5 h-5 text-[#C28C7E]" /> },
  ];

  if (!reviews || reviews.length === 0) return null;

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const currentReview = reviews[activeIndex];

  return (
    // تم تقليل הـ padding هنا من py-20 إلى py-12 لتقليل المسافة السفلية بينه وبين قسم الجاليري
    <section className="py-12 px-6 max-w-[80rem] mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <div className="lg:col-span-5 flex flex-col justify-center lg:pr-4">
          <h3 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-10 text-center lg:text-left">
            Experience Highlights
          </h3>
          <div className="flex flex-col gap-6">
            {highlights.map((item) => (
              <div key={item.id} className="flex items-start gap-5 border-b border-[#E5E0D8]/60 pb-6 last:border-0 last:pb-0">
                <div className="w-12 h-12 shrink-0 bg-[#F9F8F6] rounded-full flex items-center justify-center border border-[#E5E0D8] shadow-sm">
                  {item.icon}
                </div>
                <div className="mt-1">
                  <h4 className="font-serif text-lg text-[#2C2C2C] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#1A2E3B] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          <div className="absolute top-6 left-8 text-white/10 font-serif text-[100px] pointer-events-none select-none leading-none">
            &ldquo;
          </div>

          <div className="relative z-10 flex justify-between items-start w-full">
            <div className="flex items-center gap-1.5 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#C28C7E] fill-current" />
              ))}
            </div>
            <a 
              href="https://www.booking.com/hotel/eg/noprea-boutique-aswan1.html" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-white/90 bg-white/5 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Booking.com Review</span>
            </a>
          </div>

          <div className="relative z-10 my-10 flex-1 flex flex-col justify-center">
            <p key={activeIndex} className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white animate-fadeIn">
              &ldquo;{currentReview.quote || currentReview.text}&rdquo;
            </p>
            <div key={`author-${activeIndex}`} className="mt-8 animate-fadeIn">
              <span className="font-sans text-sm font-bold tracking-[0.15em] text-white block">
                — {currentReview.author || currentReview.name}
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-light ml-2">
                  ({currentReview.country})
                </span>
              </span>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6 flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-[#C28C7E]' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <button onClick={handlePrev} aria-label="Previous review" className="cursor-pointer p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button onClick={handleNext} aria-label="Next review" className="cursor-pointer p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}