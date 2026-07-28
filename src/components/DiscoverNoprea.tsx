import { Link } from 'react-router-dom';
import { Bed, Utensils, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface DiscoverNopreaProps {
  onCardClick: (sectionId: string) => void;
}

export default function DiscoverNoprea({ onCardClick }: DiscoverNopreaProps) {
  const cards = [
    {
      id: '1',
      title: 'Boutique Accommodation',
      description: 'Individually designed rooms inspired by Nubian architecture, offering comfort and beautiful views.',
      image: '/Guest-Spaces/noprea-room-bed-close-up.avif',
      icon: <Bed className="w-5 h-5 text-[#C28C7E]" />,
      ctaText: 'Explore Rooms',
      path: '/stay',
    },
    {
      id: '2',
      title: 'Riverside Dining',
      description: 'Enjoy seasonal menus, fresh local ingredients, and traditional Nubian flavours served by the river.',
      image: '/Farm-to-Table Experiences/organic-local-breakfast-aswan-nile-view.avif',
      icon: <Utensils className="w-5 h-5 text-[#C28C7E]" />,
      ctaText: 'View Menus',
      path: '/dining',
    },
    {
      id: '3',
      title: 'Signature Experiences',
      description: 'Discover Haissa Island through riverside walks, boat excursions, and curated local encounters.',
      image: '/Haissa-Island/haissa-island-feluccas-nile.avif.avif',
      icon: <Compass className="w-5 h-5 text-[#C28C7E]" />,
      ctaText: 'Discover More',
      path: '/experiences',
    },
    {
      id: '4',
      title: 'Seasonal Retreats',
      description: 'Year-round Seasonal Renewal Retreats by ALSHEMRAN Well-Being Caravan™ and JAMILINA Wellness™, featuring science-backed programs.',
      image: '/Nature/noprea-yoga-by-the-nile-relax-angle-1.avif',
      icon: <Sparkles className="w-5 h-5 text-[#C28C7E]" />,
      ctaText: 'Learn More',
      path: '/retreats',
    },
  ];

  return (
    <section className="py-10 bg-[#F9F8F6] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">Experience Haissa Island</h2>
          <div className="w-16 h-[1px] bg-[#C28C7E] mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              to={card.path}
              key={card.id}
              className="group flex flex-col h-full bg-white border border-[#E5E0D8] shadow-md hover:shadow-2xl hover:border-[#C28C7E] transition-all duration-700 ease-in-out overflow-hidden cursor-pointer"
            >
              <div className="relative h-60 w-full overflow-hidden shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="flex-1 p-8 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-serif text-2xl text-[#2C2C2C] mb-3 group-hover:text-[#C28C7E] transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-[#C28C7E] mt-6">
                  {card.ctaText}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}