import React, { useEffect } from 'react';
// 🟢 التعديل هنا: استدعينا Navbar بدل Header بناءً على ملفاتك
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Info, MapPin, Plane, Coffee } from 'lucide-react';

export default function Overview() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans">
      {/* 🟢 التعديل هنا: استخدام Navbar */}
      <Navbar />
      
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Hotel Overview</h1>
          <div className="w-16 h-0.5 bg-clay mx-auto"></div>
        </div>

        {/* Guest Rooms Section */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-2xl text-charcoal border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-clay" />
            Guest Rooms
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            NOPREA Boutique Hotel offers 20 beautifully designed guest rooms that combine authentic Nubian architecture with modern comfort and warm hospitality.
          </p>

          <div className="space-y-10">
            {/* Panoramic Nile View Room */}
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Panoramic Nile View Room (8 Rooms)</h3>
              <p className="text-sm text-gray-600 mb-4">Located on the ground floor, these 32 sqm Double Rooms offer breathtaking views of the Nile from a private balcony. Featuring traditional Nubian domed brick ceilings, handcrafted details, and warm interiors, they provide the perfect setting for a relaxing stay.</p>
              <div className="bg-[#FAF9F6] p-4 rounded-xl text-sm text-gray-700 grid md:grid-cols-2 gap-2">
                <p><strong>Room Size:</strong> 32 sqm</p>
                <p><strong>Standard Occupancy:</strong> Up to 2 Guests</p>
                <p><strong>Maximum Occupancy:</strong> 3 Guests</p>
                <p><strong>Bed Configuration:</strong> 1 Queen Bed & 1 Twin Bed</p>
                <p><strong>View:</strong> Panoramic Nile View</p>
                <p><strong>Outdoor Space:</strong> Private Balcony</p>
              </div>
            </div>

            {/* Garden Courtyard Room */}
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Garden Courtyard Room (8 Rooms)</h3>
              <p className="text-sm text-gray-600 mb-4">These 32 sqm Double Rooms overlook the hotel's peaceful courtyard and feature a private terrace, creating a quiet and relaxing retreat after a day of exploring Aswan.</p>
              <div className="bg-[#FAF9F6] p-4 rounded-xl text-sm text-gray-700 grid md:grid-cols-2 gap-2">
                <p><strong>Room Size:</strong> 32 sqm</p>
                <p><strong>Standard Occupancy:</strong> Up to 2 Guests</p>
                <p><strong>Maximum Occupancy:</strong> 3 Guests</p>
                <p><strong>Bed Configuration:</strong> 1 Queen Bed & 1 Twin Bed</p>
                <p><strong>View:</strong> Garden Courtyard</p>
                <p><strong>Outdoor Space:</strong> Private Terrace</p>
              </div>
            </div>

            {/* Signature Rooms */}
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Signature Rooms (4 Rooms)</h3>
              <p className="text-sm text-gray-600 mb-4">Our four Signature Rooms offer the same spacious 32 sqm layout, authentic Nubian design, and premium amenities, each with its own unique charm and character. It includes a private terrace with Nile View.</p>
              <div className="bg-[#FAF9F6] p-4 rounded-xl text-sm text-gray-700 grid md:grid-cols-2 gap-2">
                <p><strong>Room Size:</strong> 32 sqm</p>
                <p><strong>Standard Occupancy:</strong> Up to 2 Guests</p>
                <p><strong>Maximum Occupancy:</strong> 3 Guests</p>
                <p><strong>Bed Configuration:</strong> 1 Queen Bed & 1 Twin Bed</p>
                <p><strong>View:</strong> Nile View</p>
                <p><strong>Outdoor Space:</strong> Private Terrace</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Guest Policy */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-2xl text-charcoal border-b border-gray-100 pb-4 mb-4">Additional Guest Policy</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            A third guest may be accommodated for an additional USD 50 per stay, which includes an extra bed and breakfast. This fee is payable upon arrival. All rooms include daily housekeeping, welcome refreshments on arrival, complimentary WiFi, and access to Noprea's gardens, library, and riverside terraces.
          </p>
        </section>

        {/* Location & Attractions */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-serif text-xl text-charcoal mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-clay" /> Nearby Landmarks
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex justify-between"><span>Temple of Philae</span> <span>9 km</span></li>
              <li className="flex justify-between"><span>Aswan High Dam</span> <span>12 km</span></li>
              <li className="flex justify-between"><span>Unfinished Obelisk</span> <span>12 km</span></li>
              <li className="flex justify-between"><span>Nubian Museum</span> <span>12 km</span></li>
              <li className="flex justify-between"><span>Aga Khan Mausoleum</span> <span>18 km</span></li>
              <li className="flex justify-between mt-4 font-semibold"><span>Shallal (Public Transport)</span> <span>11 km</span></li>
              <li className="flex justify-between font-semibold"><span>Al-Sadd Al-Aaly Railway Station</span> <span>15 km</span></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex-1">
              <h2 className="font-serif text-xl text-charcoal mb-6 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-clay" /> Restaurants & Cafes
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between"><span>Pool Bar</span> <span>12 km</span></li>
                <li className="flex justify-between"><span>Vienna Cafe</span> <span>12 km</span></li>
                <li className="flex justify-between"><span>The Terrace</span> <span>13 km</span></li>
                <li className="flex justify-between"><span>Dahab Cafe</span> <span>14 km</span></li>
                <li className="flex justify-between"><span>Al Masry</span> <span>14 km</span></li>
                <li className="flex justify-between"><span>Makani Restaurant and Cafe</span> <span>15 km</span></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-clay" /> Closest Airports
              </h2>
              <ul className="text-sm text-gray-600">
                <li className="flex justify-between"><span>Aswan International Airport</span> <span>11 km</span></li>
              </ul>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}