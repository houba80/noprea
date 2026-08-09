import React, { useState, useEffect } from 'react';
import { fetchMedia, deleteMedia, logActivity } from '../api/index';
import { Trash2, AlertCircle } from 'lucide-react';

const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.nopreahotel.com';

export default function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMedia = async () => {
    try {
      const { data } = await fetchMedia();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMedia(); }, []);

  const handleDelete = async (filename: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this image from the server?')) return;
    
    setError(null);
    try {
      await deleteMedia(filename);
      await logActivity(`Deleted media file: ${filename}`).catch(() => {}); 
      
      alert('✅ Image deleted successfully');
      loadMedia();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete image');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Media Library...</div>;

  return (
    <div className="space-y-6 mt-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <span className="font-bold">{error}</span>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-2">🖼️ Smart Media Library</h3>
        <p className="text-sm text-gray-500 mb-6">Manage all uploaded files. The system prevents deleting images currently used in rooms or galleries.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((file, idx) => (
            <div key={idx} className="relative group border border-gray-200 rounded-lg overflow-hidden h-32 bg-gray-50 shadow-sm">
              <img src={file.url.startsWith('/uploads') ? `${BACKEND_URL}${file.url}` : file.url} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(file.name)} 
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg transform hover:scale-110 cursor-pointer"
                  title="Delete Permanently"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {media.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">No media found in uploads folder.</div>
          )}
        </div>
      </div>
    </div>
  );
}