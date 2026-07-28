import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201228778788"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-12 right-4 md:bottom-6 md:right-6 z-[99999] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      <span className="hidden md:block absolute right-16 bg-white text-[#2C2C2C] text-xs px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none whitespace-nowrap font-medium border border-gray-100">
        How can we help you?
      </span>
    </a>
  );
}