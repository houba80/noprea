import React, { useState, useEffect } from 'react';
import { Star, Bed, Eye, Utensils, Map, Ship, Trees, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TheNopreaExperience() {
  const highlights = [
    { icon: <Bed className="w-5 h-5" />, title: 'Boutique Accommodation', desc: 'Individually designed rooms inspired by Nubian architecture.' },
    { icon: <Eye className="w-5 h-5" />, title: 'Panoramic Nile Views', desc: 'Panoramic river views from rooms, terraces, and shared spaces.' },
    { icon: <Utensils className="w-5 h-5" />, title: 'Restaurant & Riverside Dining', desc: 'Fresh seasonal cuisine served indoors and overlooking the Nile.' },
    { icon: <Map className="w-5 h-5" />, title: 'Private Island Setting', desc: 'A peaceful location surrounded by nature and Nubian heritage.' },
    { icon: <Ship className="w-5 h-5" />, title: 'Boat Transfers', desc: 'Convenient transfers to and from Haissa Island.' },
    { icon: <Trees className="w-5 h-5" />, title: 'Gardens & Outdoor Spaces', desc: 'Quiet courtyards, shaded gardens, and riverside seating areas.' },
    { icon: <Heart className="w-5 h-5" />, title: 'Personalized Hospitality', desc: 'A dedicated team providing warm, attentive service throughout your stay.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Seasonal Experiences', desc: 'A year-round calendar of curated experiences, including our Seasonal Retreats.' },
  ];

  const reviews = [
    { text: "The incredible views from our balcony, the wonderful service, and the outstanding food made us feel less like tourists and more like friends staying with family. We plan to be back again and again.", author: "Erin", country: "United Kingdom" },
    { text: "The highlight, without a doubt, was the breathtaking view of the Nile. The staff made us feel at home from the moment we arrived.", author: "Patrycia", country: "United States" },
    { text: "A beautiful escape from the hustle and bustle of city life. If you're looking for silence, fresh air, and genuine hospitality, this is the place.", author: "Hesari", country: "Egypt" },
    { text: "Very peaceful location, spacious rooms, and an amazing team who looked after every detail throughout our stay.", author: "Sami", country: "United Kingdom" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-10 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">The NOPREA Experience</h2>
          <div className="w-16 h-[1px] bg-[#C28C7E] mx-auto mb-6" />
          <p className="text-gray-600 font-light leading-relaxed">See Why Guests Return</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl text-[#2C2C2C] mb-6">Experience Highlights</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-sm">
                  <div className="p-2.5 bg-[#F9F8F6] rounded-lg text-[#C28C7E] flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl text-[#2C2C2C] mb-6">What Our Guests Say</h3>
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-md border border-[#E5E0D8] flex flex-col justify-between min-h-[380px] relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[#C28C7E]/10 font-serif text-[120px] pointer-events-none select-none leading-none">
                &ldquo;
              </div>

              <div className="relative z-10 flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-[#C28C7E] text-[#C28C7E]" />)}
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-center min-h-[140px]">
                <p key={activeIndex} className="text-lg md:text-xl text-gray-700 font-light italic leading-relaxed animate-fadeIn">
                  "{reviews[activeIndex].text}"
                </p>
                <div key={`author-${activeIndex}`} className="mt-8 animate-fadeIn">
                  <p className="text-base font-bold text-[#2C2C2C]">{reviews[activeIndex].author}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{reviews[activeIndex].country}</p>
                </div>
              </div>

              <div className="relative z-10 border-t border-[#E5E0D8] pt-6 mt-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {reviews.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-[#C28C7E]' : 'w-2 bg-gray-200'}`} />
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={handlePrev} className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-[#F9F8F6] hover:text-[#C28C7E] transition-all cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={handleNext} className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-[#F9F8F6] hover:text-[#C28C7E] transition-all cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="https://www.booking.com/hotel/eg/noprea-boutique-aswan1.html" target="_blank" rel="noreferrer" className="inline-block px-8 py-3.5 rounded-full bg-[#2C2C2C] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#C28C7E] transition-colors shadow-md cursor-pointer">
                Read More Guest Reviews
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}