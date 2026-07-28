import React, { useEffect } from 'react';
import { Leaf, Sun, Wind, CheckCircle, ArrowRight } from 'lucide-react';

export default function Retreats() {
  useEffect(() => {
    document.title = "Seasonal Well-Being Retreats | NOPREA Boutique Hotel";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Join our Seasonal Well-Being Retreats on Haissa Island. Science-backed programs for personal renewal and balance, complementing your boutique hotel stay.");
    }
  }, []);

  const retreatDates = [
    { name: 'Autumn Equinox 2026', date: '18 – 25 September', icon: '🍂' },
    { name: 'Winter Solstice 2026', date: '18 – 25 December', icon: '❄️' },
    { name: 'Spring Equinox 2027', date: '18 – 25 March', icon: '🌱' },
    { name: 'Summer Solstice 2027', date: '18 – 25 June', icon: '☀️' },
    { name: 'Autumn Equinox 2027', date: '18 – 25 September', icon: '🍂' },
  ];

  return (
    <main className="bg-[#F9F8F6]">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Sunrise-and-Sunset/golden-hour-nile-reflection-aswan.avif" 
            alt="Golden sunrise over the Nile at Haissa Island" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
            Seasonal Well-Being Retreats
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light tracking-wide max-w-2xl mx-auto">
            A peaceful setting for personal renewal, combining authentic Nubian hospitality with science-backed well-being experiences.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#F9F8F6]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-6">Restoration by the Nile</h2>
          <div className="w-16 h-[1px] bg-[#C28C7E] mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#E5E0D8] text-center">
          <h3 className="text-3xl font-serif text-[#2C2C2C] mb-4">Retreat Calendar Confirmation</h3>
          
          <p className="text-gray-600 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
            The following dates serve as the annual anchor retreats for the <span className="font-medium text-[#2C2C2C]">Noprea x ALSHEMRAN Luxury Well-Being Retreat Model™️</span>, aligned with the Equinoxes and Solstices. Space is intentionally limited to ensure a highly personalized and attentive stay.
          </p>

          <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-10 text-left">
            {retreatDates.map((retreat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] hover:border-[#C28C7E] transition-colors">
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="text-2xl">{retreat.icon}</span>
                  <span className="font-serif text-[#2C2C2C] text-xl">{retreat.name}</span>
                </div>
                <span className="text-[#C28C7E] font-medium tracking-widest uppercase text-sm">{retreat.date}</span>
              </div>
            ))}
          </div>

          <a 
            href="https://forms.gle/uz8UgxxHufaok1QEA"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center justify-center gap-3 bg-[#C28C7E] text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#A8796B] transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            <span>Guest Information & Registration Form</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-xs text-gray-400 font-light">
            <span className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#C28C7E]" /> Certified practitioners</span>
            <span className="hidden md:block text-gray-300">•</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#C28C7E]" /> 40+ years combined experience</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6">
                <Sun className="w-8 h-8 text-[#C28C7E]" />
              </div>
              <h3 className="text-xl font-serif text-[#2C2C2C]">Natural Balance</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Reconnect with nature through guided outdoor activities, embracing the warm sunlight and fresh river breeze.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-[#C28C7E]" />
              </div>
              <h3 className="text-xl font-serif text-[#2C2C2C]">Personal Renewal</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Carefully structured programs designed to help you reset and find clarity in a comfortable, pressure-free setting.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-[#C28C7E]" />
              </div>
              <h3 className="text-xl font-serif text-[#2C2C2C]">Authentic Culture</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Immerse yourself in the genuine hospitality and rich traditions of Nubia, creating memories that last long after your stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 تم ضبط أحجام الشعارين ليكون الارتفاع متوازناً وبصرياً متساوياً */}
      <section className="py-16 bg-white border-t border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-12">In Collaboration With</p>
          <div className="flex justify-center items-center gap-10 sm:gap-20 opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src="/Partners/ALShemran-Logo.png" 
              alt="ALSHEMRAN Well-Being Caravan" 
              width="160"
              height="112"
              className="h-20 sm:h-28 w-auto object-contain" 
            />
            <img 
              src="/Partners/Jamilina-Logo.png" 
              alt="JAMILINA Wellness" 
              width="160"
              height="112"
              className="h-20 sm:h-28 w-auto object-contain" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}