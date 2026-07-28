/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  key?: string;
  room: Room;
  onBookClick: (roomName?: string) => void;
}

export default function RoomCard({ room, onBookClick }: RoomCardProps) {
  return (
    <div
      id={`room-${room.id}`}
      className="group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-500 overflow-hidden border border-clay/10 h-full max-w-lg mx-auto"
    >
      <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-charcoal">
        <img
          src={room.image}
          alt={room.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md text-warm-sand text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border border-clay/30 font-semibold font-sans">
          Advance Booking
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-4 left-6 text-white">
          <span className="text-[10px] tracking-[0.3em] uppercase text-warm-sand block mb-1">
            {room.type === 'suite' ? 'Premium Suite' : 'Comfort Room'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
            {room.name}
          </h3>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-warm-white/10 group-hover:bg-warm-white transition-colors duration-500">
        <div>
          <p className="text-sm text-charcoal/85 font-light leading-relaxed mb-6 line-clamp-3">
            {room.description}
          </p>

          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-widest font-bold text-clay/80 block mb-4">
              In-Room Amenities
            </span>
            <div className="grid grid-cols-2 gap-3.5">
              {room.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2.5">
                  <div className="flex-shrink-0 p-1 rounded bg-limestone border border-clay/15">
                    <Check className="w-3.5 h-3.5 text-terracotta" />
                  </div>
                  <span className="text-xs text-charcoal/85 tracking-wide font-light line-clamp-1">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🌟 تم تفعيل الأزرار لتقوم بفتح صفحة Little Hotelier */}
        <div className="pt-6 border-t border-clay/10 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => onBookClick(room.name)}
            className="cursor-pointer w-full text-center px-6 py-3 rounded-full bg-nile-blue text-warm-white text-xs font-semibold uppercase tracking-widest hover:bg-terracotta hover:shadow-lg hover:shadow-terracotta/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Saty
          </button>
          <button
            onClick={() => onBookClick(room.name)}
            className="cursor-pointer w-full text-center px-6 py-3 rounded-full border border-clay/40 text-clay text-xs font-semibold uppercase tracking-widest hover:bg-clay hover:text-white hover:-translate-y-0.5 transition-all duration-300"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}