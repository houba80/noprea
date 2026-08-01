import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Wifi, Maximize } from 'lucide-react';

export default function RoomCard({ room }: { room: any }) {
  const allImages = [room.image, ...(room.extraImages || [])].filter(Boolean);
  const [currentIdx, setCurrentIdx] = useState(0);

  const getImageUrl = (url: string) => url?.startsWith('/uploads') ? `http://localhost:5000${url}` : url;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer h-full">
      
      {/* السلايدر */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={getImageUrl(allImages[currentIdx])} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {allImages.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-charcoal p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-charcoal p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {allImages.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white scale-125' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-clay block mb-1">{room.type} • {room.view}</span>
            <h3 className="font-serif text-2xl text-charcoal">{room.name}</h3>
          </div>
        </div>
        
        {/* 🟢 الوصف كامل بدون قص */}
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          {room.description}
        </p>

        {/* 🟢 جميع المميزات تظهر بدون +3 more */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.features?.map((feature: string, idx: number) => (
            <span key={idx} className="text-[11px] font-semibold bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
              {feature.includes('Wi-Fi') && <Wifi className="w-3 h-3" />}
              {feature.includes('View') && <Maximize className="w-3 h-3" />}
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-lg font-serif text-charcoal">{room.priceInfo}</span>
          <button className="bg-charcoal text-white text-sm font-bold px-6 py-2 rounded hover:bg-black transition-colors">
            Discover
          </button>
        </div>
      </div>
    </div>
  );
}