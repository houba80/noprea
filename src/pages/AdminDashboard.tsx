import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomsManager from '../components/RoomsManager'; 
import GalleryManager from '../components/GalleryManager';
import ReviewsManager from '../components/ReviewsManager';
import RetreatsManager from '../components/RetreatsManager'; 
import UsersManager from '../components/UsersManager';
import MyProfile from '../components/MyProfile'; 
import MediaLibrary from '../components/MediaLibrary'; 
import ActivityLog from '../components/ActivityLog';   
import { 
  createRoom, createReview, createGalleryItem, createRetreat, // 👈 ضفنا createRetreat
  fetchRooms, fetchGallery, fetchReviews, fetchRetreats,      // 👈 ضفنا fetchRetreats
  deleteRoom, deleteGalleryItem, deleteReview, deleteRetreat, // 👈 ضفنا deleteRetreat
  logActivity 
} from '../api/index';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [role, setRole] = useState('superadmin');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/admin-login'); return; }
    
    const savedRole = localStorage.getItem('role') || 'superadmin';
    const savedPerms = JSON.parse(localStorage.getItem('permissions') || '[]');
    const savedTab = localStorage.getItem('adminActiveTab');
    
    setRole(savedRole);
    setPermissions(savedPerms);

    let initialTab = 'profile'; 
    if (savedTab && (savedRole === 'superadmin' || savedPerms.includes(savedTab) || ['profile', 'users', 'media', 'activity', 'retreats'].includes(savedTab))) {
      initialTab = savedTab;
    } else if (savedRole === 'superadmin') {
      initialTab = 'rooms';
    } else if (savedPerms.length > 0) {
      initialTab = savedPerms[0];
    }
    
    setActiveTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('adminActiveTab', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await logActivity('Logged out of the system');
    } catch (err) {
      console.log('Logout Log Error:', err);
    } finally {
      localStorage.clear();
      navigate('/admin-login');
    }
  };

  // 🔴 الحذف الذكي (بيمسح القسم اللي إنت واقف عليه بس)
  const handleWipeSectionData = async () => {
    if (role !== 'superadmin') return;
    if (!window.confirm(`🚨 DANGER: This will delete ALL items in the [${activeTab.toUpperCase()}] section. Are you sure?`)) return;
    
    setIsProcessing(true);
    try {
      if (activeTab === 'rooms') {
        const { data } = await fetchRooms();
        for (const item of data) await deleteRoom(item._id);
      } else if (activeTab === 'gallery') {
        const { data } = await fetchGallery();
        for (const item of data) await deleteGalleryItem(item._id);
      } else if (activeTab === 'reviews') {
        const { data } = await fetchReviews();
        for (const item of data) await deleteReview(item._id);
      } else if (activeTab === 'retreats') {
        // 🟢 تم إضافة مسح الـ Retreats
        const { data } = await fetchRetreats();
        for (const item of data) await deleteRetreat(item._id);
      }
      
      alert(`🗑️ [${activeTab.toUpperCase()}] section wiped clean!`);
      window.location.reload();
    } catch (error) {
      alert('Error wiping section data.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 🟢 استرجاع الداتا (Sync) لكل قسم لوحده
  const handleSyncData = async () => {
    if (!window.confirm(`This will sync original data for [${activeTab.toUpperCase()}] ONLY. Proceed?`)) return;
    setIsProcessing(true);
    try {
      
      if (activeTab === 'rooms') {
        const { data: existingRooms } = await fetchRooms();
        if (existingRooms.length > 0) {
          alert('⚠️ Rooms data already exists! Please "Wipe Data" first.');
          setIsProcessing(false);
          return;
        }
        await createRoom({ name: 'Panoramic Nile View Rooms', type: 'room', view: 'Nile River', description: 'Our entry category and a favorite among returning guests...', features: ['King or Twin Bed Options', 'En-suite Bathroom', 'Nile View', 'Complimentary Wi-Fi', 'Daily Housekeeping', 'Welcome Refreshments'], image: '/Guest-Spaces/noprea-room-window-nile-view.avif', priceInfo: 'From $120/night', embedLink: '' });
        await createRoom({ name: 'Garden Courtyard Suite', type: 'suite', view: 'Private Garden', description: 'A larger suite overlooking our peaceful gardens, offering additional living space...', features: ['Separate Sitting Area', 'Garden Access', 'Private Outdoor Seating', 'En-suite Bathroom', 'Complimentary Wi-Fi', 'Daily Housekeeping'], image: '/Guest-Spaces/noprea-one-bed-room-courtyard-view.jpg', priceInfo: 'From $180/night', embedLink: '' });
        alert('✅ Rooms synced successfully!');
      
      } else if (activeTab === 'reviews') {
        const { data: existingReviews } = await fetchReviews();
        if (existingReviews.length > 0) {
          alert('⚠️ Reviews data already exists! Please "Wipe Data" first.');
          setIsProcessing(false);
          return;
        }
        await createReview({ rating: 5, quote: 'The incredible views from our balcony...', name: 'Erin', country: 'United Kingdom' });
        await createReview({ rating: 5, quote: 'The highlight, without a doubt, was the breathtaking view...', name: 'Patrycia', country: 'United States' });
        await createReview({ rating: 5, quote: 'A beautiful escape from the hustle and bustle...', name: 'Hesari', country: 'Egypt' });
        alert('✅ Reviews synced successfully!');
      
      } else if (activeTab === 'retreats') {
        // 🟢 تم إضافة استرجاع الـ Retreats
        const { data: existingRetreats } = await fetchRetreats();
        if (existingRetreats.length > 0) {
          alert('⚠️ Retreats data already exists! Please "Wipe Data" first.');
          setIsProcessing(false);
          return;
        }
        await createRetreat({ name: 'Autumn Equinox 2026', date: '18 – 25 September', icon: '🍂' });
        await createRetreat({ name: 'Winter Solstice 2026', date: '18 – 25 December', icon: '❄️' });
        await createRetreat({ name: 'Spring Equinox 2027', date: '18 – 25 March', icon: '🌱' });
        await createRetreat({ name: 'Summer Solstice 2027', date: '18 – 25 June', icon: '☀️' });
        await createRetreat({ name: 'Autumn Equinox 2027', date: '18 – 25 September', icon: '🍂' });
        alert('✅ Retreats synced successfully!');

      } else if (activeTab === 'gallery') {
        const { data: existingGallery } = await fetchGallery();
        if (existingGallery.length > 0) {
          alert('⚠️ Gallery data already exists! Please "Wipe Data" first.');
          setIsProcessing(false);
          return;
        }
        // 1. Boutique Accommodation
        await createGalleryItem({
          title: 'Boutique Accommodation',
          description: 'Explore our individually designed rooms and suites overlooking the Nile.',
          coverImage: '/Guest-Spaces/noprea-room-window-nile-view.avif',
          images: [
            { src: '/Guest-Spaces/noprea-one-bed-room-courtyard-view.jpg', title: 'Courtyard View' },
            { src: '/Guest-Spaces/noprea-one-bed-room-courtyard-view-angle-2.avif', title: 'Courtyard Details' },
            { src: '/Guest-Spaces/noprea-room-bed-close-up.avif', title: 'Bed Details' },
            { src: '/Guest-Spaces/noprea-room-doorway-nile-view.avif', title: 'Nile View Doorway' },
            { src: '/Guest-Spaces/noprea-room-terrace-nile-view.avif', title: 'Terrace View' },
            { src: '/Guest-Spaces/noprea-room-window-nile-view-day.jpg', title: 'Window View Day' },
            { src: '/Guest-Spaces/noprea-room-window-nile-view-sunset.avif', title: 'Window View Sunset' },
            { src: '/Guest-Spaces/noprea-two-bed-room-courtyard-view-angle-1.avif', title: 'Two Bed Courtyard' },
            { src: '/Guest-Spaces/noprea-two-bed-room-courtyard-view-angle-2.avif', title: 'Two Bed Details' },
            { src: '/Guest-Spaces/noprea-two-bed-room.avif', title: 'Two Bed Room' },
            { src: '/Guest-Spaces/noprea-two-bed-room(1).avif', title: 'Two Bed Room Alternate' }
          ]
        });

        // 2. Riverside Dining
        await createGalleryItem({
          title: 'Riverside Dining',
          description: 'Experience farm-to-table cuisine and authentic Nubian flavours.',
          coverImage: '/Dining/noprea-open-air-restaurant-nile-view-aswan.jpg',
          images: [
            { src: '/Dining/noprea-boutique-hotel-restaurant-aswan.jpg', title: 'Boutique Restaurant' },
            { src: '/Dining/noprea-nile-view-dining-room-aswan.jpg', title: 'Dining Room' },
            { src: '/Farm-to-Table Experiences/noprea-oriental-breakfast-aswan.avif', title: 'Oriental Breakfast' },
            { src: '/Farm-to-Table Experiences/organic-local-breakfast-aswan-nile-view.avif', title: 'Organic Local Breakfast' }
          ]
        });

        // 3. Heritage & Nature
        await createGalleryItem({
          title: 'Heritage & Nature',
          description: 'Discover Haissa Island\'s culture, architecture, and breathtaking Nile sunsets.',
          coverImage: '/Nubian-Architecture /traditional-nubian-house-entrance-aswan-4.avif',
          images: [
            { src: '/Nubian-Architecture /colorful-nubian-wall-art-aswan.avif', title: 'Colorful Wall Art' },
            { src: '/Nubian-Architecture /nubian-village-aswan.avif', title: 'Nubian Village' },
            { src: '/Haissa-Island/haissa-island-feluccas-nile.avif.avif', title: 'Feluccas on the Nile' },
            { src: '/Haissa-Island/haissa-island-nubian-architecture.avif.avif', title: 'Island Architecture' },
            { src: '/Nile-Views/nile-sunset-boat-aswan.avif', title: 'Sunset Boat' },
            { src: '/Nile-Views/village-island-nile-view.avif', title: 'Island View' },
            { src: '/Sunrise-and-Sunset/golden-hour-nile-reflection-aswan.avif', title: 'Golden Hour' },
            { src: '/Sunrise-and-Sunset/sunset-over-the-nile-boats-aswan.avif', title: 'Sunset over Boats' },
            { src: '/aswan/ASWAN.AVIF', title: 'Aswan Overview' }
          ]
        });

        // 4. Seasonal Retreats
        await createGalleryItem({
          title: 'Seasonal Retreats',
          description: 'Find balance and restoration through our curated well-being programs and yoga sessions.',
          coverImage: '/Nature/noprea-yoga-by-the-nile-relax.avif',
          images: [
            { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-1.avif', title: 'Morning Yoga' },
            { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-2.avif', title: 'Meditation' },
            { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-3.avif', title: 'Well-being Session' },
            { src: '/Nature/noprea-yoga-by-the-nile-relax-angle-4.avif', title: 'Relaxation' }
          ]
        });
        alert('✅ Gallery synced successfully with 32 images!');
      } else {
        alert('Sync is not available for this section.');
      }

      window.location.reload();
    } catch (error) {
      alert('Sync failed. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const hasAccess = (tab: string) => role === 'superadmin' || permissions.includes(tab);

  if (!activeTab) return null; 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">NOPREA Control Panel</h1>
          <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider ${role === 'superadmin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {role}
          </span>
        </div>
        <div className="flex gap-4">
          {/* 🟢 تم إضافة retreats لمصفوفة الأزرار عشان يظهروا */}
          {role === 'superadmin' && ['rooms', 'gallery', 'reviews', 'retreats'].includes(activeTab) && (
            <button onClick={handleWipeSectionData} disabled={isProcessing} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50">
              {isProcessing ? 'Processing...' : `🚨 Wipe ${activeTab.toUpperCase()} Data`}
            </button>
          )}
          {role === 'superadmin' && ['rooms', 'gallery', 'reviews', 'retreats'].includes(activeTab) && (
             <button onClick={handleSyncData} disabled={isProcessing} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
               {isProcessing ? 'Processing...' : `Sync ${activeTab.toUpperCase()} Data`}
             </button>
          )}
          <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-bold hover:bg-black transition-colors cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-lg shadow-sm w-fit border overflow-x-auto">
          <button onClick={() => handleTabChange('profile')} className={`cursor-pointer px-6 py-2 rounded capitalize font-bold transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-charcoal text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}>
            My Profile
          </button>
          
          {['rooms', 'gallery', 'reviews', 'retreats'].map(tab => hasAccess(tab) && (
            <button key={tab} onClick={() => handleTabChange(tab)} className={`cursor-pointer px-6 py-2 rounded capitalize font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-charcoal text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}>
              {tab}
            </button>
          ))}

          {role === 'superadmin' && (
            <>
              <button onClick={() => handleTabChange('media')} className={`cursor-pointer px-6 py-2 rounded capitalize font-bold transition-all whitespace-nowrap ${activeTab === 'media' ? 'bg-charcoal text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}>
                Media Library
              </button>
              <button onClick={() => handleTabChange('users')} className={`cursor-pointer px-6 py-2 rounded capitalize font-bold transition-all whitespace-nowrap ${activeTab === 'users' ? 'bg-charcoal text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}>
                Users
              </button>
              <button onClick={() => handleTabChange('activity')} className={`cursor-pointer px-6 py-2 rounded capitalize font-bold transition-all whitespace-nowrap ${activeTab === 'activity' ? 'bg-charcoal text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}>
                Activity Log
              </button>
            </>
          )}
        </div>

        <div>
          {activeTab === 'profile' && <MyProfile />}
          {activeTab === 'rooms' && hasAccess('rooms') && <RoomsManager />}
          {activeTab === 'gallery' && hasAccess('gallery') && <GalleryManager />}
          {activeTab === 'reviews' && hasAccess('reviews') && <ReviewsManager />}
          {activeTab === 'retreats' && hasAccess('retreats') && <RetreatsManager />}
          {activeTab === 'media' && role === 'superadmin' && <MediaLibrary />}
          {activeTab === 'users' && role === 'superadmin' && <UsersManager />}
          {activeTab === 'activity' && role === 'superadmin' && <ActivityLog />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;