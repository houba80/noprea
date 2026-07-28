/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { FileText, Shield, CreditCard, CalendarX, Clock, Users, Scale, AlertCircle, HelpCircle } from 'lucide-react';

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | NOPREA Boutique Hotel";
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "reservations",
      title: "1. Reservations",
      icon: <FileText className="w-5 h-5 text-clay" />,
      content: [
        "Bookings may be made through our website, by direct contact with the Hotel, or through third-party booking platforms and travel agents.",
        "A reservation is confirmed once you receive a confirmation email or booking reference from us or from the platform through which you booked.",
        "You must provide accurate and complete information when booking, including full name, contact details, and, where requested, payment details.",
        "The main guest on a reservation must be at least 18 years old."
      ]
    },
    {
      id: "payment",
      title: "2. Payment",
      icon: <CreditCard className="w-5 h-5 text-clay" />,
      content: [
        "Payment can be made online through our website via our secure payment gateway, through the OTA or travel agent used to make the booking, or in person at the Hotel.",
        "Rates are quoted in the currency shown at the time of booking and may include or exclude taxes and service charges, as indicated at checkout.",
        "Some rates may require full or partial pre-payment at the time of booking; this will be clearly stated before you confirm your reservation.",
        "Any balance due, including for extras or services used during your stay, is payable at check-out unless otherwise agreed."
      ]
    },
    {
      id: "cancellation",
      title: "3. Cancellation & Refund Policy",
      icon: <CalendarX className="w-5 h-5 text-terracotta" />,
      content: [
        "Guests may cancel free of charge up to 7 days before the scheduled check-in date/time.",
        "Cancellations made less than 7 days before check-in, or failure to arrive (\"no-show\"), may be charged the full amount of the first night, or as otherwise specified in your rate's terms at the time of booking.",
        "Bookings made through an OTA or travel agent are also subject to that platform's own cancellation policy, which will be shown at the time of booking.",
        "Refunds, where applicable, are processed to the original method of payment within a reasonable time after cancellation with maximum lead time 60 days.",
        "Non-refundable rates, where offered and clearly identified at booking, are not eligible for cancellation or refund with some promotional rates based on seasonality."
      ]
    },
    {
      id: "checkin-checkout",
      title: "4. Check-In & Check-Out",
      icon: <Clock className="w-5 h-5 text-clay" />,
      content: [
        "Standard check-in time is from 14:00 and standard check-out time is by 12:00 PM (noon), local Aswan time, unless otherwise agreed with the Hotel.",
        "Early check-in or late check-out is subject to availability and may incur an additional charge.",
        "All guests must present a valid passport or government-issued photo ID at check-in, in accordance with Egyptian hotel registration requirements."
      ]
    },
    {
      id: "guest-conduct",
      title: "5. Guest Conduct",
      icon: <Shield className="w-5 h-5 text-clay" />,
      content: [
        "Guests are expected to behave respectfully towards Hotel staff, other guests, and property at all times.",
        "The Hotel reserves the right to refuse accommodation, or to remove a guest from the property without refund, in cases of disruptive, abusive, illegal, or unsafe conduct in property and the island.",
        "Guests are responsible for any damage caused to Hotel property during their stay and may be charged the cost of repair or replacement.",
        "Smoking is only permitted in designated areas. Egyptian law and Hotel policy must be observed at all times, including with regard to alcohol consumption where applicable."
      ]
    },
    {
      id: "occupancy",
      title: "6. Room Occupancy & Additional Guests",
      icon: <Users className="w-5 h-5 text-clay" />,
      content: [
        "Each room has a maximum occupancy, which will be stated at the time of booking. Additional, unregistered guests are not permitted to stay overnight without prior arrangement with the Hotel.",
        "Children may stay subject to the Hotel's policy on age limits and any applicable extra charges, communicated at the time of booking."
      ]
    },
    {
      id: "rights",
      title: "7. Hotel's Rights",
      icon: <Scale className="w-5 h-5 text-clay" />,
      content: [
        "The Hotel reserves the right to modify room assignments, provided that the room category and standard booked are honoured, or an equivalent or superior alternative is offered.",
        "The Hotel reserves the right to amend published rates and offers at any time; changes will not affect bookings already confirmed.",
        "In the rare event of overbooking beyond our control, we will make reasonable efforts to offer comparable alternative accommodation."
      ]
    },
    {
      id: "liability",
      title: "8. Liability",
      icon: <AlertCircle className="w-5 h-5 text-clay" />,
      content: [
        "The Hotel will take reasonable care to ensure a safe and pleasant stay but does not accept liability for loss, theft, or damage to personal belongings, except where caused by our proven negligence.",
        "Guests are advised to use Hotel safety deposit facilities, where available, for valuables.",
        "The Hotel is not liable for delays, cancellations, or losses arising from events beyond its reasonable control (see Section 9, Force Majeure).",
        "Nothing in these Terms limits any liability that cannot be excluded or limited under Egyptian law."
      ]
    },
    {
      id: "boilerplate",
      title: "Legal Clauses & Operations (9—15)",
      icon: <Scale className="w-5 h-5 text-nile-blue" />,
      subsections: [
        { label: "9. Force Majeure", text: "The Hotel shall not be liable for any failure or delay in performing its obligations where such failure or delay results from circumstances beyond its reasonable control, including but not limited to natural disasters, extreme weather, government action, epidemic or pandemic, strikes, or civil unrest. In such cases, we will work with affected guests in good faith to reschedule or, where appropriate, refund the stay." },
        { label: "10. Facilities & Services", text: "Descriptions of rooms, facilities, and services on our website and marketing materials are provided in good faith and are as accurate as possible at the time of publication. Occasionally, facilities (such as the pool, spa, or restaurant) may be temporarily unavailable for maintenance or reasons beyond our control; we will inform guests where practical and are not obliged to offer compensation for such temporary unavailability, except where required by law." },
        { label: "11. Third-Party Bookings", text: "Where a reservation is made through an OTA, travel agent, or tour operator, that third party's own terms and conditions will also apply to the booking process and any payment made to them. These Hotel Terms apply to your stay and conduct on the property regardless of how the booking was made." },
        { label: "12. Website Use", text: "By using our website, you agree to use it only for lawful purposes and not to attempt to interfere with its proper operation, security, or the experience of other users. All content on our website, including text, images, and logos, is the property of the Hotel or its licensors and may not be reproduced without permission." },
        { label: "13. Privacy", text: "Our collection and use of your personal data is described in our separate Privacy Policy, which forms part of these Terms." },
        { label: "14. Governing Law & Jurisdiction", text: "These Terms are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any dispute arising out of or in connection with a booking or stay at Noprea Boutique Hotel Aswan shall be subject to the exclusive jurisdiction of the competent courts of Aswan, Egypt, without prejudice to any mandatory consumer protection rights you may have under the law of your country of residence." },
        { label: "15. Changes to These Terms", text: "We may update these Terms from time to time to reflect changes in our services or legal requirements. The version in force at the time you make your booking will apply to that booking. The latest version is always available on our website." }
      ]
    }
  ];

  return (
    // 🌟 تم زيادة الـ Padding هنا إلى pt-52 لضمان نزول الكلام تحت الهيدر الطويل الجديد بالمللي
    <main className="min-h-screen bg-warm-white text-charcoal pt-52 pb-24 relative selection:bg-clay/20">
      <div className="absolute inset-0 bg-[radial-gradient(#C28C7E_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Editorial Page Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-clay font-bold block">
            LEGAL ARCHITECTURE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-wide text-nile-blue">
            Terms &amp; Conditions
          </h1>
          <div className="flex items-center justify-center gap-3 text-xs text-charcoal/60 font-light pt-2">
            <span>Noprea Boutique Hotel Aswan Policy</span>
            <span className="w-1 h-1 bg-clay rounded-full" />
            <span className="font-medium text-terracotta">Last updated: 19 July 2026</span>
          </div>
          <div className="w-20 h-[1px] bg-clay/30 mx-auto pt-4" />
        </div>

        {/* Content Cards Loop */}
        <div className="space-y-12">
          {sections.map((sec, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 sm:p-10 rounded-3xl border border-clay/10 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3.5 border-b border-clay/10 pb-4 mb-6">
                <div className="p-2 bg-limestone rounded-xl text-clay">
                  {sec.icon}
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-medium text-nile-blue">
                  {sec.title}
                </h2>
              </div>

              {/* Check if standard bullet lists or sub-blocks */}
              {sec.content ? (
                <ul className="space-y-4">
                  {sec.content.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 items-start text-xs sm:text-sm text-charcoal/85 font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay/60 flex-shrink-0 mt-2" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-6">
                  {sec.subsections?.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-clay">
                        {sub.label}
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal/85 font-light leading-relaxed">
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Section 16: Contact Us Block */}
          <div className="bg-nile-blue text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-repeat opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0L30 15L15 30L0 15L15 0zm0 5L5 15L15 25L25 15L15 5z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-warm-sand">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-warm-sand">
                  16. Contact Us
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm text-limestone/90 font-light leading-relaxed">
                For any questions about these Terms &amp; Conditions, please contact our administrative support desk directly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-sans tracking-wide">
                <div className="space-y-1">
                  <span className="text-[10px] text-warm-sand uppercase tracking-widest block opacity-75">Boutique Location</span>
                  <span className="font-light">Noprea Boutique Hotel Aswan, Aswan, Egypt</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-warm-sand uppercase tracking-widest block opacity-75">Direct Concierge Channels</span>
                  <a href="mailto:support@nopreahotel.com" className="block font-medium text-white hover:text-warm-sand transition-colors">
                    support@nopreahotel.com
                  </a>
                  <a href="tel:+201228778788" className="block font-medium text-white hover:text-warm-sand transition-colors">
                    +20 122 877 8788
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}