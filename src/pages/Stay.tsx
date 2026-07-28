import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import PlanYourStay from '../components/PlanYourStay';
import { Room } from '../types';

const ROOMS_DATA: Room[] = [
  {
    id: 'nile-view-rooms',
    name: 'Panoramic Nile View Rooms',
    description: 'Our entry category and a favorite among returning guests. Individually designed in the Nubian tradition, each room offers comfortable accommodation, handcrafted details, and beautiful views overlooking the Nile.',
    image: '/Guest-Spaces/noprea-room-window-nile-view.avif',
    features: ['King or Twin Bed Options', 'En-suite Bathroom', 'Nile View', 'Complimentary Wi-Fi', 'Daily Housekeeping', 'Welcome Refreshments'],
    type: 'room',
    view: 'Nile River'
  },
  {
    id: 'garden-courtyard-suite',
    name: 'Garden Courtyard Suite',
    description: 'A larger suite overlooking our peaceful gardens, offering additional living space and a tranquil setting for guests seeking a longer or more relaxed stay.',
    image: '/Guest-Spaces/noprea-one-bed-room-courtyard-view.jpg',
    features: ['Separate Sitting Area', 'Garden Access', 'Private Outdoor Seating', 'En-suite Bathroom', 'Complimentary Wi-Fi', 'Daily Housekeeping'],
    type: 'suite',
    view: 'Private Garden'
  }
];

export default function Stay() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Accommodation | NOPREA Boutique Hotel Aswan";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover our boutique rooms and suites inspired by traditional Nubian architecture, featuring panoramic Nile views and peaceful garden courtyards.");
    }
  }, []);

  return (
    <main className="pt-24 bg-warm-white">
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
              ACCOMMODATION
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-charcoal mb-4">
              Choose the Space That Suits Your Stay
            </h1>
            <div className="w-12 h-[2px] bg-clay mx-auto mb-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {ROOMS_DATA.map((room) => (
              <RoomCard key={room.id} room={room} onBookClick={() => navigate('/book')} />
            ))}
          </div>
        </div>
      </section>
      
      {/* PlanYourStay component already has Guest Relations removed */}
      <PlanYourStay />
    </main>
  );
}