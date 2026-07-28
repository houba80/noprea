import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 
import WhatsAppButton from './components/WhatsAppButton';
import ScrollTopUI from './components/ScrollTopUI'; 

import Home from './pages/Home'; 
import Stay from './pages/Stay'; 
import Dining from './pages/Dining'; 
import Experiences from './pages/Experiences'; 
import Retreats from './pages/Retreats'; 
import Gallery from './pages/GalleryPage'; 
import TermsConditions from './pages/TermsConditions';
import BookingPage from './pages/BookingPage';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen font-sans antialiased selection:bg-clay/20 flex flex-col justify-between">
        <Navbar onNavClick={() => setActiveSection('')} activeSection={activeSection} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/retreats" element={<Retreats />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <ScrollTopUI />
        
        <WhatsAppButton />
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}