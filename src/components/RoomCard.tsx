import React, { useState } from 'react';
import { Maximize2, X, Users, Maximize, BedDouble, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoomCard({ room }: { room: any }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // 🟢 استدعاء الصورة
  const coverImage = room.coverImage || room.image || '/placeholder-room.jpg';

  // 🟢 تجهيز الداتا الافتراضية من ملف الـ Overview لو مش موجودة في الداتابيز
  const size = room.size || '32 sqm';
  const occupancy = room.occupancy || 'Up to 2 Guests';
  const bed = room.bedConfiguration || '1 Queen & 1 Twin';
  const view = room.view || (room.title?.toLowerCase().includes('nile') ? 'Nile View' : 'Garden Courtyard');
  
  const defaultAmenities = ['Air Conditioning', 'Bathtub', 'Complimentary WiFi', 'Daily Housekeeping', 'Private Terrace'];
  const amenities = room.amenities && room.amenities.length > 0 ? room.amenities : defaultAmenities;
  
  const description = room.description || "Combining authentic Nubian architecture with modern comfort, offering a perfect setting for a relaxing stay.";
  
  // السعر الافتراضي بدل "Price on request" المستفزة
  const price = room.price || 120; 

  return (
    <>
      <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-clay/10 h-full">
        
        {/* مساحة الصورة والـ Lightbox */}
        <div 
          className="relative h-64 md:h-[320px] w-full overflow-hidden cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img 
            src={coverImage} 
            alt={room.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg border border-white/30">
              <Maximize2 className="w-6 h-6" />
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal shadow-sm">
            ROOM • {view.toUpperCase()}
          </div>
        </div>

        {/* محتوى الكارت */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3 leading-tight">{room.title}</h3>
          <p className="text-sm text-charcoal/70 font-light mb-6 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* 🟢 تفاصيل الغرفة الأساسية (بناءً على ملف الـ Overview) بأيقونات شيك */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-charcoal/80">
              <Maximize className="w-4 h-4 text-clay" />
              <span className="text-xs font-medium">{size}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal/80">
              <Users className="w-4 h-4 text-clay" />
              <span className="text-xs font-medium">{occupancy}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal/80">
              <BedDouble className="w-4 h-4 text-clay" />
              <span className="text-xs font-medium truncate" title={bed}>{bed}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal/80">
              <Eye className="w-4 h-4 text-clay" />
              <span className="text-xs font-medium truncate">{view}</span>
            </div>
          </div>

          {/* 🟢 المميزات (Amenities) زي الصورة اللي بعتها */}
          <div className="flex flex-wrap gap-2 mb-8">
            {amenities.slice(0, 6).map((am: string, index: number) => (
              <span 
                key={index} 
                className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/70 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100"
              >
                {am}
              </span>
            ))}
          </div>

          {/* الفوتر: السعر وزرار الحجز */}
          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xl font-serif text-charcoal">
              From ${price} <span className="text-xs font-sans text-gray-400 uppercase tracking-widest">/night</span>
            </div>
            <Link 
              to="/book" 
              className="w-full sm:w-auto text-center bg-charcoal text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
            >
              Discover
            </Link>
          </div>
        </div>
      </div>

      {/* الـ Lightbox السينمائي لصورة الغرفة */}
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
            alt={room.title} 
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}