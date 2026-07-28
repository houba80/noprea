/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Layers } from 'lucide-react';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: { src: string; title: string }[];
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // 🌟 نظام الألبومات الأربعة بناءً على طلبك
  const albums: Album[] = [
    {
      id: 'rooms',
      title: 'Boutique Accommodation',
      description: 'Explore our individually designed rooms and suites overlooking the Nile.',
      coverImage: '/Guest-Spaces/noprea-room-window-nile-view.avif',
      images: [
        { src: '/Hotel-Interiors/noprea-hotel-lounge-nile-view.jpg', title: 'Lounge Nile View' },
        { src: '/Hotel-Interiors/noprea-hotel-exterior-nubian-architecture.jpg', title: 'Exterior Nubian Architecture' },
        { src: '/Hotel-Interiors/noprea-hotel-courtyard-entrance.jpg', title: 'Courtyard Entrance' },
        { src: '/Guest-Spaces/noprea-one-bed-room-courtyard-view.jpg', title: 'Courtyard Suite' },
        { src: '/Guest-Spaces/noprea-room-bed-close-up.avif', title: 'Room Details' },
        { src: '/Guest-Spaces/noprea-room-window-nile-view.avif', title: 'Panoramic Window' },
        { src: '/Guest-Spaces/noprea-two-bed-room-courtyard-view-angle-1.avif', title: 'Twin Room' },
        { src: '/Guest-Spaces/noprea-room-window-nile-view-day.jpg', title: 'Daylight View' },
        { src: '/Guest-Spaces/noprea-room-window-nile-view-sunset.avif', title: 'Sunset from Room' },
        { src: '/Guest-Spaces/noprea-two-bed-room.avif', title: 'Comfort Twin Room' },
        { src: '/Guest-Spaces/noprea-room-doorway-nile-view.avif', title: 'Nile View Doorway' },
        { src: '/Guest-Spaces/noprea-room-terrace-nile-view.avif', title: 'Private Terrace' },
      ]
    },
    {
      id: 'dining',
      title: 'Riverside Dining',
      description: 'Experience farm-to-table cuisine and authentic Nubian flavours.',
      coverImage: '/Dining/noprea-boutique-hotel-restaurant-aswan.jpg',
      images: [
        { src: '/Dining/noprea-nile-view-dining-room-aswan.jpg', title: 'Indoor Dining Room' },
        { src: '/Dining/noprea-open-air-restaurant-nile-view-aswan.jpg', title: 'Open Air Restaurant' },
        { src: '/Dining/noprea-boutique-hotel-restaurant-aswan.jpg', title: 'Restaurant Setup' },
        { src: '/Farm-to-Table Experiences/organic-local-breakfast-aswan-nile-view.avif', title: 'Organic Breakfast' },
        { src: '/Farm-to-Table Experiences/noprea-oriental-breakfast-aswan.avif', title: 'Oriental Breakfast' },
      ]
    },
    {
      id: 'heritage',
      title: 'Heritage & Nature',
      description: 'Discover Haissa Island\'s culture, architecture, and breathtaking Nile sunsets.',
      coverImage: '/Nubian-Architecture /nubian-village-entrance-aswan.avif',
      images: [
        { src: '/Nile-Views/nile-sunset-boat-aswan.avif', title: 'Nile Sunset Boat' },
        { src: '/Sunrise-and-Sunset/golden-hour-nile-reflection-aswan.avif', title: 'Golden Hour Reflection' },
        { src: '/Sunrise-and-Sunset/sunrise-through-nubian-arch-aswan.avif', title: 'Sunrise through Arch' },
        { src: '/Nubian-Architecture /colorful-nubian-wall-art-aswan.avif', title: 'Colorful Wall Art' },
        { src: '/Nubian-Architecture /white-nubian-house-details-aswan.avif', title: 'Nubian Architecture' },
        { src: '/Nubian-Architecture /traditional-nubian-rugs-aswan-2.avif', title: 'Traditional Rugs' },
        { src: '/Nubian-Architecture /nubian-local-by-the-nile-aswan.avif', title: 'Local Life by the Nile' },
        { src: '/Nubian-Architecture /nubian-village-entrance-aswan.avif', title: 'Village Entrance' },
        { src: '/Haissa-Island/haissa-island-feluccas-nile.avif.avif', title: 'Feluccas on the Nile' },
        { src: '/Nile-Views/walking-by-the-nile-river-view-aswan.avif', title: 'Walking by the River' },
      ]
    },
    {
      id: 'retreats',
      title: 'Seasonal Retreats',
      description: 'Find balance and restoration through our curated well-being programs and yoga sessions.',
      coverImage: '/Nature/noprea-yoga-by-the-nile-relax.avif',
      images: [
        { src: '/Nature/noprea-yoga-by-the-nile-relax.avif', title: 'Yoga by the Nile' },
        { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-1.avif', title: 'Morning Stretch' },
        { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-2.avif', title: 'Mindfulness Practice' },
        { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-3.avif', title: 'Sunset Yoga' },
        { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-4.avif', title: 'Restoration' },
      ]
    }
  ];

  const currentAlbumData = albums.find(a => a.id === activeAlbum);

  const openLightbox = (albumId: string) => {
    setActiveAlbum(albumId);
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setActiveAlbum(null);
  };

  const handlePrev = () => {
    if (!currentAlbumData) return;
    setLightboxIndex((prev) => (prev === 0 ? currentAlbumData.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!currentAlbumData) return;
    setLightboxIndex((prev) => (prev === currentAlbumData.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-warm-white relative overflow-hidden">
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

        {/* 🌟 Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => openLightbox(album.id)}
              className="group relative h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer bg-charcoal border border-clay/10 transition-all duration-500 hover:-translate-y-1.5"
            >
              <img
                src={album.coverImage}
                alt={album.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
                <Layers className="w-4 h-4" />
                <span>{album.images.length} Photos</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-2xl font-medium leading-tight mb-2">
                  {album.title}
                </h3>
                <p className="text-sm text-white/80 font-light line-clamp-2">
                  {album.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Lightbox Viewer (يفتح الصور الخاصة بالألبوم المختار فقط) */}
      {activeAlbum && currentAlbumData && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between items-center py-6 px-4 animate-fade-in">
          <div className="w-full max-w-7xl flex justify-between items-center text-white z-10">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase text-warm-sand font-bold mb-1">
                {currentAlbumData.title} Collection
              </span>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                <ImageIcon className="w-4 h-4" />
                <span>{lightboxIndex + 1} / {currentAlbumData.images.length}</span>
              </div>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:-left-16 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={currentAlbumData.images[lightboxIndex].src}
                alt={currentAlbumData.images[lightboxIndex].title}
                className="max-h-[70vh] max-w-full object-contain mx-auto transition-opacity duration-300"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 md:-right-16 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full text-center text-white z-10 max-w-xl">
            <p className="font-serif text-xl font-medium tracking-wide">
              {currentAlbumData.images[lightboxIndex].title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}