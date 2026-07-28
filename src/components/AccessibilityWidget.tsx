import React, { useState } from 'react';
import { Accessibility } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  const changeFontSize = (scale: number) => {
    document.documentElement.style.fontSize = `${scale}%`;
  };

  return (
    <div className="fixed top-1/3 left-0 z-50 flex flex-col items-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#5B7C8C] text-white p-3 rounded-r-xl shadow-lg hover:bg-[#C28C7E] transition-colors cursor-pointer"
        aria-label="Accessibility Options"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="bg-white p-4 ml-2 mt-2 rounded-xl shadow-2xl border border-gray-100 flex flex-col gap-2 animate-fadeIn">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Text Size</span>
          <button onClick={() => changeFontSize(100)} className="text-xs bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer">Default</button>
          <button onClick={() => changeFontSize(110)} className="text-xs bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer">Large (110%)</button>
          <button onClick={() => changeFontSize(120)} className="text-xs bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer">X-Large (120%)</button>
        </div>
      )}
    </div>
  );
}