import React from 'react';
import Gallery from '../components/Gallery';

export default function GalleryPage() {
  return (
    // 🟢 التعديل هنا: ضفنا pt-[112px] md:pt-[128px] (128 + 64 = 192px)
    <main className="bg-warm-white min-h-screen pt-[112px] md:pt-[128px]">
      <Gallery />
    </main>
  );
}