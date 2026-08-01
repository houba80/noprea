import React, { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import PlanYourStay from '../components/PlanYourStay';
import { fetchRooms } from '../api/index';

export default function Stay() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Accommodation | NOPREA Boutique Hotel Aswan";
    
    const loadRooms = async () => {
      try {
        const { data } = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };
    
    loadRooms();
  }, []);

  return (
    // 🟢 توحيد البادنج
    <main className="pt-[160px] md:pt-[192px] bg-warm-white min-h-screen">
      <section className="pb-16 relative overflow-hidden">
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
          
          {loading ? (
            <p className="text-center text-gray-500">Loading rooms...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {rooms.map((room: any) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <PlanYourStay />
    </main>
  );
}