import React, { useState } from 'react';
import { Maximize2, X, Wifi, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.nopreahotel.com';

export default function RoomCard({ room }: { room: any }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const rawImage = room.coverImage || room.image || '/placeholder-room.jpg';
  const coverImage = rawImage.startsWith('/uploads') ? `${BACKEND_URL}${rawImage}` : rawImage;

  const view = room.view || (room.title?.toLowerCase().includes('nile') ? 'Nile View' : 'Garden Courtyard');
  const type = room.type || 'Room';
  
  const defaultAmenities = ['Air Conditioning', 'Bathtub', 'Complimentary WiFi', 'Daily Housekeeping', 'Private Terrace'];
  const amenities = room.features || room.amenities || defaultAmenities;
  
  const description = room.description || "Combining authentic Nubian architecture with modern comfort, offering a perfect setting for a relaxing stay.";
  const priceInfo = room.priceInfo || (room.price ? `From $${room.price}/night` : 'Price on request'); 

  // 🟢 اللوجيك الذكي لمعالجة لينك الحجز اللي العميل بيدخله
  let bookingLink = "/book";
  if (room.embedLink) {
    try {
      // لو العميل نسخ اللينك كامل من الموقع
      const parsedUrl = new URL(room.embedLink);
      if (parsedUrl.search) {
        bookingLink = `/book${parsedUrl.search}`; // هياخد الجزء بتاع rateId بس
      }
    } catch (error) {
      // احتياطي: لو العميل حط الجزء الأخير بس
      if (room.embedLink.includes('?')) {
        bookingLink = `/book${room.embedLink.substring(room.embedLink.indexOf('?'))}`;
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer h-full">
        
        <div 
          className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img 
            src={coverImage} 
            alt={room.title || room.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg border border-white/30">
              <Maximize2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-clay block mb-1">{type} • {view}</span>
              <h3 className="font-serif text-2xl text-charcoal">{room.title || room.name}</h3>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {amenities.map((feature: string, idx: number) => (
              <span key={idx} className="text-[11px] font-semibold bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                {feature.toLowerCase().includes('wifi') && <Wifi className="w-3 h-3" />}
                {feature.toLowerCase().includes('view') && <Maximize className="w-3 h-3" />}
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-lg font-serif text-charcoal">{priceInfo}</span>
            {/* 🟢 استخدام اللينك الديناميكي اللي جهزناه فوق */}
            <Link to={bookingLink} className="bg-charcoal text-white text-sm font-bold px-6 py-2 rounded hover:bg-black transition-colors">
              Discover
            </Link>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4 md:p-12"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            onClick={() => setIsLightboxOpen(false)} 
            className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-md z-50"
          >
            <X className="w-5 h-5" />
          </button>
          
          <img 
            src={coverImage} 
            alt={room.title || room.name} 
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}