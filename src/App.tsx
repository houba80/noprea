import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stay from './pages/Stay';
import Dining from './pages/Dining';
import Experiences from './pages/Experiences';
import Retreats from './pages/Retreats';
import GalleryPage from './pages/GalleryPage'; 
import TermsConditions from './pages/TermsConditions';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import Overview from './pages/Overview';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// 🟢 استدعاء الأزرار الطائرة
import WhatsAppButton from './components/WhatsAppButton';
import ScrollTopUI from './components/ScrollTopUI';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* 🟢 يرجعك لأول الصفحة لما تغير اللينك */}
      <ScrollToTop /> 

      {!isAdminRoute && <Navbar onNavClick={() => {}} activeSection="" />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/retreats" element={<Retreats />} />
        <Route path="/gallery" element={<GalleryPage />} /> 
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/overview" element={<Overview />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<Home />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      
      {/* 🟢 إظهار أزرار الواتساب والطلوع لفوق لو مش في لوحة التحكم */}
      {!isAdminRoute && (
        <>
          <WhatsAppButton />
          <ScrollTopUI />
        </>
      )}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}