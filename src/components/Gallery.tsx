import React, { useState, useEffect } from 'react';
import { Layers, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { fetchGallery } from '../api/index';

const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.nopreahotel.com'; 

// 🟢 دالة ذكية لمعالجة وتصليح مسارات الصور في الجاليري
const getValidImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('localhost:5000')) return url.replace('http://localhost:5000', BACKEND_URL);
  if (url.startsWith('/uploads')) return `${BACKEND_URL}${url}`;
  return url;
};

export default function Gallery() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data } = await fetchGallery();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  const openLightbox = (album: any) => {
    if (album.images && album.images.length > 0) {
      setSelectedAlbum(album);
      setLightboxIndex(0);
    }
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    setLightboxIndex(0);
  };

  const handlePrev = () => {
    if (!selectedAlbum) return;
    const total = selectedAlbum.images.length;
    setLightboxIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!selectedAlbum) return;
    const total = selectedAlbum.images.length;
    setLightboxIndex((prev) => (prev + 1) % total);
  };

  return (
    <section id="gallery" className="pt-12 md:pt-16 pb-24 bg-warm-white relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-clay/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
            A GLIMPSE OF NOPREA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal mb-4">
            Visual Gallery
          </h2>
          <div className="w-12 h-[2px] bg-clay mx-auto mb-6" />
          <p className="text-sm text-charcoal/80 font-light leading-relaxed">
            Select a collection below to explore the unique atmosphere, architecture, and character of our boutique hotel.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
             <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin" />
          </div>
        ) : albums.length === 0 ? (
          <p className="text-center text-gray-500">No collections available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {albums.map((album) => {
              const cover = getValidImageUrl(album.coverImage);
              const photoCount = album.images?.length || 0;

              return (
                <div
                  key={album._id}
                  onClick={() => openLightbox(album)}
                  className="group relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-charcoal transition-all duration-500 hover:-translate-y-1 border border-clay/10"
                >
                  <img 
                    src={cover} 
                    alt={album.title} 
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 text-xs font-medium">
                    <Layers className="w-4 h-4" />
                    <span>{photoCount} Photos</span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2">
                      {album.title}
                    </h3>
                    <p className="text-sm text-white/80 font-light line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedAlbum && selectedAlbum.images && selectedAlbum.images.length > 0 && (
        <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col justify-between items-center animate-fade-in select-none">
          
          <div className="absolute top-0 inset-x-0 w-full p-6 flex justify-between items-center text-white z-50 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-sand font-semibold">
              <ImageIcon className="w-4 h-4" />
              <span>{lightboxIndex + 1} / {selectedAlbum.images.length}</span>
            </div>
            <button 
              onClick={closeLightbox} 
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <img 
              src={getValidImageUrl(selectedAlbum.images[lightboxIndex].src)} 
              alt={selectedAlbum.images[lightboxIndex].title} 
              referrerPolicy="no-referrer" 
              className="max-h-screen max-w-full object-contain mx-auto w-full h-full p-0 md:p-12 transition-transform duration-300" 
            />

            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }} 
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="absolute bottom-0 inset-x-0 w-full p-8 text-center text-white z-50 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <span className="text-[10px] tracking-[0.3em] uppercase text-warm-sand font-bold block mb-2">
              {selectedAlbum.title}
            </span>
            <p className="font-serif text-xl md:text-2xl font-light tracking-wide text-white/90">
              {selectedAlbum.images[lightboxIndex].title || selectedAlbum.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}