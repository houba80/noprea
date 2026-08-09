import React, { useState, useEffect } from 'react';
import { fetchGallery, createGalleryItem, deleteGalleryItem, updateGalleryItem, logActivity } from '../api/index';
import { X, ChevronLeft, ChevronRight, Star, ImagePlus } from 'lucide-react';
import MediaSelectorModal from './MediaSelectorModal';

export default function GalleryManager() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', coverImage: '', images: [] as any[] });
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'inner'>('cover');

  const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://api.nopreahotel.com';

  const loadGallery = async () => {
    const { data } = await fetchGallery();
    setAlbums(data);
  };

  useEffect(() => { loadGallery(); }, []);

  const handleEditAlbumClick = (album: any) => {
    setEditingAlbumId(album._id);
    setNewAlbum({ 
      title: album.title, 
      description: album.description || '',
      coverImage: album.coverImage,
      images: album.images || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveInnerImage = (indexToRemove: number) => {
    setNewAlbum(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    setNewAlbum(prev => {
      const newImages = [...prev.images];
      if (direction === 'left' && index > 0) {
        [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
      } else if (direction === 'right' && index < newImages.length - 1) {
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      }
      return { ...prev, images: newImages };
    });
  };

  const handleSetAsCover = (imgSrc: string, index: number) => {
    setNewAlbum(prev => {
      const oldCover = prev.coverImage; 
      let updatedImages = [...prev.images];
      
      if (oldCover) {
        updatedImages[index] = { ...updatedImages[index], src: oldCover, title: 'Previous Cover' };
      } else {
        updatedImages = updatedImages.filter((_, i) => i !== index);
      }
      
      return { ...prev, coverImage: imgSrc, images: updatedImages };
    });
  };

  const handleMediaSelected = (selection: string | string[]) => {
    if (mediaTarget === 'cover' && typeof selection === 'string') {
      setNewAlbum(prev => ({ ...prev, coverImage: selection }));
    } else if (mediaTarget === 'inner' && Array.isArray(selection)) {
      const newImgs = selection.map(url => ({ src: url, title: newAlbum.title || 'Gallery Image' }));
      setNewAlbum(prev => ({ ...prev, images: [...prev.images, ...newImgs] }));
    }
  };

  const handleSubmitAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbum.coverImage) return alert('⚠️ Please select a cover image from the Media Library!');
    
    setLoading(true);
    try {
      const cleanedImages = newAlbum.images.map(img => ({
        src: img.src,
        title: img.title
      }));
      
      const payload = { ...newAlbum, images: cleanedImages };

      if (editingAlbumId) {
        await updateGalleryItem(editingAlbumId, payload);
        alert('✅ Category updated!');
        logActivity(`Edited Gallery Album: ${newAlbum.title}`).catch(err => console.log('Log Error:', err));
      } else {
        await createGalleryItem(payload);
        alert('✅ Category created!');
        logActivity(`Created new Gallery Album: ${newAlbum.title}`).catch(err => console.log('Log Error:', err));
      }
      
      setNewAlbum({ title: '', description: '', coverImage: '', images: [] });
      setEditingAlbumId(null);
      loadGallery();
    } catch (error: any) {
      console.error("Save Error:", error.response || error);
      alert('❌ Error: ' + (error.response?.data?.message || error.message || 'Failed to process category'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async (album: any) => {
    if (!window.confirm('Delete entire category with all its photos?')) return;
    await deleteGalleryItem(album._id);
    await logActivity(`Deleted Gallery Album: ${album.title}`);
    loadGallery();
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('/uploads') ? `${BACKEND_URL}${url}` : url;
  };

  return (
    <div className="space-y-8">
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">📁 {editingAlbumId ? 'Edit Category' : 'Create New Category'}</h3>
          {editingAlbumId && (
            <button onClick={() => { setEditingAlbumId(null); setNewAlbum({ title: '', description: '', coverImage: '', images: [] }); }} className="text-sm bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded hover:bg-gray-200 cursor-pointer">
              Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmitAlbum} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Category Title</label>
               <input type="text" placeholder="e.g. Riverside Dining" required value={newAlbum.title} onChange={e => setNewAlbum({...newAlbum, title: e.target.value})} className="w-full p-3 border rounded focus:outline-none focus:border-charcoal" />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
               <input type="text" placeholder="Short description..." required value={newAlbum.description} onChange={e => setNewAlbum({...newAlbum, description: e.target.value})} className="w-full p-3 border rounded focus:outline-none focus:border-charcoal" />
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <label className="block text-sm font-bold text-gray-700 mb-3">Cover Image</label>
              {newAlbum.coverImage ? (
                <div className="relative h-40 rounded-lg overflow-hidden border-4 border-clay mb-3">
                  <img src={getImageUrl(newAlbum.coverImage)} className="w-full h-full object-cover" alt="cover" />
                  <button type="button" onClick={() => { setMediaTarget('cover'); setIsMediaModalOpen(true); }} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-bold opacity-0 hover:opacity-100 transition-opacity">
                    Change Cover
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => { setMediaTarget('cover'); setIsMediaModalOpen(true); }} className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-charcoal hover:border-charcoal transition-colors bg-white cursor-pointer">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <span className="font-bold">Choose from Media Library</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <label className="block text-sm font-bold text-blue-900">Album Photos ({newAlbum.images.length})</label>
               <button type="button" onClick={() => { setMediaTarget('inner'); setIsMediaModalOpen(true); }} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-blue-700 flex items-center gap-1 cursor-pointer">
                 <ImagePlus className="w-4 h-4" /> Add Photos
               </button>
            </div>
            
            <div className="flex-1 bg-white border border-gray-200 rounded p-3 overflow-y-auto max-h-[300px]">
              {newAlbum.images.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">No photos added yet.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {newAlbum.images.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 h-24 group shadow-sm bg-gray-50">
                      <img src={getImageUrl(img.src)} className="w-full h-full object-cover" alt={`inner-${idx}`} />
                      
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                        <button type="button" onClick={() => handleSetAsCover(img.src, idx)} title="Set as Cover" className="bg-amber-500 text-white p-1 rounded hover:bg-amber-600 transform hover:scale-110 cursor-pointer">
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => handleMoveImage(idx, 'left')} disabled={idx === 0} className="text-white p-1 hover:bg-white/30 rounded disabled:opacity-30 cursor-pointer">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => handleRemoveInnerImage(idx)} title="Delete Photo" className="text-red-400 p-1 hover:bg-red-500 hover:text-white rounded cursor-pointer">
                            <X className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => handleMoveImage(idx, 'right')} disabled={idx === newAlbum.images.length - 1} className="text-white p-1 hover:bg-white/30 rounded disabled:opacity-30 cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="md:col-span-2 bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black uppercase tracking-widest cursor-pointer mt-2 shadow-md text-lg">
            {loading ? 'Processing...' : (editingAlbumId ? 'Save Changes' : 'Publish Category')}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {albums.map(album => (
          <div key={album._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-5 border-b pb-4">
              <div>
                <h4 className="font-bold text-xl text-gray-800">{album.title} <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">({album.images?.length || 0} photos)</span></h4>
                <p className="text-sm text-gray-500 mt-2">{album.description}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEditAlbumClick(album)} className="text-blue-600 font-bold hover:underline cursor-pointer text-sm bg-blue-50 px-4 py-2 rounded">Edit Album</button>
                <button onClick={() => handleDeleteAlbum(album)} className="text-red-600 font-bold hover:underline cursor-pointer text-sm bg-red-50 px-4 py-2 rounded">Delete Album</button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              <div className="relative border-4 border-clay rounded-lg overflow-hidden h-28 shadow-sm">
                <span className="absolute top-0 left-0 bg-clay text-white text-[10px] px-2 py-0.5 z-10 font-bold tracking-wider">COVER</span>
                <img src={getImageUrl(album.coverImage)} className="w-full h-full object-cover" alt="cover" />
              </div>
              {album.images?.map((img: any, idx: number) => (
                <div key={idx} className="relative rounded-lg overflow-hidden shadow-sm h-28 border border-gray-100">
                  <img src={getImageUrl(img.src)} alt={img.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MediaSelectorModal 
        isOpen={isMediaModalOpen} 
        onClose={() => setIsMediaModalOpen(false)}
        multiSelect={mediaTarget === 'inner'}
        onSelect={handleMediaSelected}
      />
    </div>
  );
}