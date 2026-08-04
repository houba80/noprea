import React, { useEffect } from 'react';
import { ShieldCheck, HelpCircle, Phone } from 'lucide-react';
// 🟢 استدعاء useLocation لقراءة مسار الصفحة
import { useLocation } from 'react-router-dom';

export default function BookingPage() {
  const location = useLocation(); // 🟢 هيجيب الـ query من مسار الموقع زي ?items[0][rateId]=123456

  useEffect(() => {
    document.title = "Secure Reservation | NOPREA Boutique Hotel";
  }, []);

  return (
    <main className="min-h-screen bg-warm-white pt-[160px] md:pt-[192px] pb-16 text-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-clay block">
            SECURE ENGINE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-nile-blue">
            Finalize Your Stay
          </h1>
          <p className="text-xs text-charcoal/70 font-light">
            Please complete your dates and details below via our encrypted reservation network.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-clay/10 p-2 md:p-4 relative min-h-[850px] w-full flex flex-col">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-clay opacity-50">
             <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin mb-4" />
             <p className="text-xs uppercase tracking-widest font-medium">Connecting Secure Engine...</p>
          </div>

          {/* 🟢 تم دمج مسار محرك الحجز مع الـ search parameters اللي جاية من اللينك */}
          <iframe 
            src={`https://direct-book.com/properties/nopreaboutiquehotelaswan${location.search}`}
            className="w-full flex-1 rounded-2xl z-10 bg-white"
            style={{ minHeight: '800px', border: 'none' }}
            title="NOPREA Secure Booking Engine"
            allow="payment"
          />

        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center border-t border-clay/15 pt-8">
          <div className="flex flex-col items-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-palm-green" />
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">SSL Encrypted Connection</span>
            <span className="text-[11px] text-charcoal/60 font-light">Your personal & payment data is strictly protected.</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Phone className="w-5 h-5 text-clay" />
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">Need Assistance?</span>
            <span className="text-[11px] text-charcoal/60 font-light">Call our desk anytime at +20 122 877 8788.</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-5 h-5 text-clay" />
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">Direct Booking Perks</span>
            <span className="text-[11px] text-charcoal/60 font-light">Complimentary boat arrival & departure transfers.</span>
          </div>
        </div>

      </div>
    </main>
  );
}