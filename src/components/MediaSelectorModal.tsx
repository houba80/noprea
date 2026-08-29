import React, { useState, useEffect } from 'react';
import { fetchMedia, uploadImage, uploadBulkImages, logActivity } from '../api/index';
import { X, UploadCloud, CheckCircle, Image as ImageIcon } from 'lucide-react';

const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.nopreahotel.com';

// 🟢 نفس الدالة للتعرف على مسار الصور الجديد
const getValidImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/uploads') || url.startsWith('/persistent_uploads')) {
    return `${BACKEND_URL}${url}`;
  }
  return url;
};

interface MediaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selection: string | string[]) => void;
  multiSelect?: boolean;
}

export default function MediaSelectorModal({ isOpen, onClose, onSelect, multiSelect = false }: MediaSelectorModalProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [selected, setSelected] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setSelected([]);
      setActiveTab('library');
    }
  }, [isOpen]);

  const loadMedia = async () => {
    try {
      const { data } = await fetchMedia();
      setMedia(data);
    } catch (err) {
      console.error('Failed to load media');
    }
  };

  const toggleSelection = (url: string) => {
    if (!multiSelect) {
      setSelected([url]);
    } else {
      setSelected(prev => prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      if (multiSelect) {
        const fd = new FormData();
        Array.from(files).forEach(f => fd.append('images', f));
        const res = await uploadBulkImages(fd);
        const newUrls = res.data.imageUrls;
        setSelected(prev => [...prev, ...newUrls]);
        
        await logActivity(`Uploaded ${files.length} new images to the server`).catch(() => {});
      } else {
        const fd = new FormData();
        fd.append('image', files[0]);
        const res = await uploadImage(fd);
        setSelected([res.data.imageUrl]);
        
        await logActivity(`Uploaded new image: ${files[0].name}`).catch(() => {});
      }
      await loadMedia(); 
      setActiveTab('library'); 
    } catch (err) {
      alert('❌ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    onSelect(multiSelect ? selected : selected[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-charcoal" />
            Media Library
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex px-6 border-b border-gray-200">
          <button onClick={() => setActiveTab('library')} className={`py-4 px-6 font-bold text-sm cursor-pointer ${activeTab === 'library' ? 'border-b-2 border-charcoal text-charcoal' : 'text-gray-500 hover:text-black'}`}>
            Media Library
          </button>
          <button onClick={() => setActiveTab('upload')} className={`py-4 px-6 font-bold text-sm cursor-pointer ${activeTab === 'upload' ? 'border-b-2 border-charcoal text-charcoal' : 'text-gray-500 hover:text-black'}`}>
            Upload Files
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'upload' ? (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
              <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-4">Drag & drop images here, or click to browse</p>
              <input type="file" multiple={multiSelect} onChange={handleUpload} className="hidden" id="media-upload" />
              <label htmlFor="media-upload" className="bg-charcoal text-white px-6 py-3 rounded font-bold cursor-pointer hover:bg-black">
                {uploading ? 'Uploading...' : 'Select Files'}
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {media.map((file, idx) => {
                const isSelected = selected.includes(file.url);
                return (
                  <div key={idx} onClick={() => toggleSelection(file.url)} className={`relative h-32 rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${isSelected ? 'border-blue-600 shadow-md transform scale-105' : 'border-transparent hover:border-gray-300'}`}>
                    <img src={getValidImageUrl(file.url)} className="w-full h-full object-cover" alt="media" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
              {media.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">No media found. Upload some!</div>
              )}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 bg-white flex justify-between items-center">
          <span className="text-sm font-bold text-gray-500">{selected.length} items selected</span>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-2 rounded text-gray-600 font-bold hover:bg-gray-100 border border-gray-200 cursor-pointer">Cancel</button>
            <button onClick={handleConfirm} disabled={selected.length === 0} className="px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
              Select Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}