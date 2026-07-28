import React, { useState } from 'react';
import { Compass, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlanYourStay() {
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    
    // TODO: Connect this to backend API to send enquiry to support@nopreahotel.com
    console.log(`Sending enquiry to support@nopreahotel.com from ${fullName} (${email})`);

    setEnquirySuccess(true);
    setFullName(''); setEmail(''); setMessage('');
    setTimeout(() => setEnquirySuccess(false), 5000);
  };

  return (
    // تم تقليل ال padding الرأسي هنا من py-24 إلى py-12 أو py-16
    <section id="plan-stay" className="py-16 bg-limestone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-clay block mb-3">
            RESERVATIONS & CONTACT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal mb-4">
            Plan Your Stay
          </h2>
          <div className="w-12 h-[2px] bg-clay mx-auto mb-6" />
        </div>

        {/* Info Grid */}
        {/* تمت إزالة lg:col-span-12 وتركيب القسمين الباقيين ليتوسطا الشاشة بشكل أفضل */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16 max-w-5xl mx-auto">
          
          <div className="space-y-8 flex flex-col">
            <div className="p-6 sm:p-8 rounded-3xl bg-warm-white border border-clay/15 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-terracotta to-clay" />
              <span className="text-[10px] tracking-widest uppercase text-terracotta font-bold block mb-2">
                RESERVATION NOTE: HIGH SEASON
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-nile-blue mb-2">
                1 September – 1 May
              </h3>
              <p className="text-xs text-charcoal/80 leading-relaxed font-light mb-4">
                Advance reservations are strongly recommended during our peak booking season. Special offers and transfers can be fully arranged upon availability.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-clay/10 flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-nile-blue/10 text-nile-blue rounded-full flex items-center justify-center mb-6">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">
                Ready to Book Your Stay?
              </h3>
              <p className="text-sm text-charcoal/70 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                Check live availability, compare our seasonal rates, and secure your sanctuary directly through our encrypted booking engine.
              </p>
              <Link
                to="/book"
                className="cursor-pointer w-full max-w-xs text-center py-4 rounded-xl bg-terracotta text-white font-semibold text-xs uppercase tracking-widest hover:bg-clay hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Check Live Availability</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-clay/10 flex-1 flex flex-col justify-center">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-6 text-center">Quick Enquiry</h3>
              {enquirySuccess ? (
                <div className="p-6 rounded-2xl bg-palm-green/10 text-palm-green text-center">
                  <Check className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-xs font-light">Enquiry sent to support team.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <input type="text" placeholder="Your Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-clay/15 text-xs focus:ring-1 focus:ring-clay outline-none" required />
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-clay/15 text-xs focus:ring-1 focus:ring-clay outline-none" required />
                  <textarea placeholder="Tell us about your trip..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-clay/15 text-xs h-32 focus:ring-1 focus:ring-clay outline-none resize-none" />
                  <button type="submit" className="w-full py-4 rounded-xl bg-nile-blue text-white text-xs uppercase tracking-widest hover:bg-terracotta transition-all cursor-pointer mt-2">
                    Send Message
                  </button>
                </form>
              )}
            </div>
            {/* تمت إزالة Guest Relations من هنا */}
          </div>
        </div>

        {/* Embedded Google Map Layer */}
        <div className="h-[400px] rounded-3xl overflow-hidden relative shadow-md border border-clay/10 bg-limestone/50">
          <iframe
            title="NOPREA Location"
            src="https://maps.google.com/maps?q=Heissa%20Island,%20Aswan,%20Egypt&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 grayscale opacity-85 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            allowFullScreen={false} loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}