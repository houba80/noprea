import React, { useState, useEffect } from 'react';
import { fetchRooms, createRoom, updateRoom, deleteRoom, logActivity } from '../api/index';
import { AlertCircle, X, ImagePlus, Plus } from 'lucide-react';
import MediaSelectorModal from './MediaSelectorModal'; 

const DEFAULT_AMENITIES = [
  "Air Conditioning", "Bathtub", "Complimentary Wi-Fi", 
  "Daily Housekeeping", "Welcome Refreshments", "Private Terrace",
  "Separate Sitting Area", "Garden Access", "Private Outdoor Seating"
];

const PREDEFINED_OPTIONS = {
  view: ['River Nile View', 'Garden Courtyard', 'Panoramic River Nile'],
  size: ['32 sqm', '45 sqm', '50 sqm'],
  occupancy: ['Up to 2 Guests', 'Up to 3 Guests', 'Up to 4 Guests'],
  bedConfiguration: ['1 Queen & 1 Twin', '1 King Bed', '2 Twin Beds', '1 King Bed & 1 Sofa Bed']
};

export default function RoomsManager() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'main' | 'extra'>('main');

  const initialForm = { 
    name: '', description: '', type: 'room', view: '', 
    size: '32 sqm', occupancy: 'Up to 2 Guests', bedConfiguration: '1 Queen & 1 Twin',
    price: '', priceInfo: '', embedLink: '', features: [] as string[], 
    image: '', extraImages: [] as string[] 
  };
  
  const [formData, setFormData] = useState<any>(initialForm);
  const [newAmenity, setNewAmenity] = useState(''); 

  const loadRooms = async () => {
    setFetching(true);
    try {
      const { data } = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { loadRooms(); }, []);

  const handleCheckbox = (amenity: string) => {
    setFormData((prev: any) => ({
      ...prev,
      features: prev.features.includes(amenity)
        ? prev.features.filter((f: string) => f !== amenity)
        : [...prev.features, amenity]
    }));
  };

  const handleAddCustomAmenity = () => {
    if (newAmenity.trim() && !formData.features.includes(newAmenity.trim())) {
      setFormData((prev: any) => ({ ...prev, features: [...prev.features, newAmenity.trim()] }));
      setNewAmenity('');
    }
  };

  const handleEditClick = (room: any) => {
    setEditingId(room._id);
    setFormData({
      name: room.name, description: room.description, type: room.type, 
      view: room.view, size: room.size || '32 sqm', occupancy: room.occupancy || 'Up to 2 Guests',
      bedConfiguration: room.bedConfiguration || '1 Queen & 1 Twin', 
      price: room.price !== undefined && room.price !== null ? room.price : 120, 
      priceInfo: room.priceInfo || '', embedLink: room.embedLink || '', 
      features: room.features || [], image: room.image || '', extraImages: room.extraImages || []
    });
    setWarning(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveExtraImage = (indexToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      extraImages: prev.extraImages.filter((_: any, idx: number) => idx !== indexToRemove)
    }));
  };

  const handleMediaSelected = (selection: string | string[]) => {
    if (mediaTarget === 'main' && typeof selection === 'string') {
      setFormData((prev: any) => ({ ...prev, image: selection }));
    } else if (mediaTarget === 'extra' && Array.isArray(selection)) {
      setFormData((prev: any) => ({ ...prev, extraImages: [...prev.extraImages, ...selection] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.type || !formData.view || formData.price === '') {
      return setWarning('⚠️ All basic details (including Price) are mandatory!');
    }
    if (!formData.image) {
      return setWarning('⚠️ Please select a main room image from the Media Library!');
    }
    
    setWarning(null);
    setLoading(true);

    try {
      if (editingId) {
        await updateRoom(editingId, formData);
        await logActivity(`Updated Room: ${formData.name}`).catch(() => {});
        alert('✅ Room updated successfully!');
      } else {
        await createRoom(formData);
        await logActivity(`Created new Room: ${formData.name}`).catch(() => {});
        alert('✅ Room added successfully!');
      }
      setFormData(initialForm);
      setEditingId(null);
      loadRooms();
    } catch (error: any) {
      alert('❌ Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm('Are you sure you want to delete this room completely?')) return;
    try {
      await deleteRoom(id);
      await logActivity(`Deleted Room: ${name}`).catch(() => {});
      loadRooms();
    } catch (error) {
      alert('Failed to delete room');
    }
  };

  // 🟢 السطر السحري لمسار الصور الديناميكي
  const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://api.nopreahotel.com';
  const getImageUrl = (url: string) => url?.startsWith('/uploads') ? `${BACKEND_URL}${url}` : url;
  
  const displayAmenities = Array.from(new Set([...DEFAULT_AMENITIES, ...formData.features]));

  const renderDropdownWithCustom = (fieldKey: string, placeholder: string, optionsList: string[]) => {
    const currentValue = formData[fieldKey];
    const isCustom = currentValue !== '' && !optionsList.includes(currentValue);
    const selectValue = isCustom ? 'other' : currentValue;

    return (
      <div className="flex flex-col gap-2 w-full">
        <select
          className="p-3 border rounded focus:outline-none focus:border-charcoal bg-white w-full"
          value={selectValue}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, [fieldKey]: val === 'other' ? '' : val });
          }}
        >
          <option value="" disabled>Select {placeholder}</option>
          {optionsList.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          <option value="other">Other (Type custom {placeholder.toLowerCase()})</option>
        </select>
        
        {(selectValue === 'other' || isCustom) && (
          <input
            type="text"
            placeholder={`Enter custom ${placeholder.toLowerCase()}`}
            className="p-3 border-2 border-dashed border-gray-300 rounded focus:outline-none focus:border-charcoal bg-gray-50 animate-fade-in w-full"
            value={formData[fieldKey]}
            onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
            autoFocus
          />
        )}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{editingId ? '✏️ Edit Room' : '➕ Add New Room'}</h3>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(initialForm); setWarning(null); }} className="text-sm text-red-500 hover:underline cursor-pointer font-bold">
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {warning && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{warning}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Room Name" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <select className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="room">Room</option>
              <option value="suite">Suite</option>
            </select>
            <textarea placeholder="Room Description..." rows={3} className="p-3 border rounded md:col-span-2 focus:outline-none focus:border-charcoal" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
             <label className="block mb-4 text-xs text-gray-500 font-bold uppercase tracking-widest">Room Specifications & Pricing</label>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderDropdownWithCustom('view', 'View', PREDEFINED_OPTIONS.view)}
                {renderDropdownWithCustom('size', 'Size', PREDEFINED_OPTIONS.size)}
                {renderDropdownWithCustom('occupancy', 'Occupancy', PREDEFINED_OPTIONS.occupancy)}
                {renderDropdownWithCustom('bedConfiguration', 'Bed Configuration', PREDEFINED_OPTIONS.bedConfiguration)}

                <div className="md:col-span-2 lg:col-span-4 mt-2">
                  <input type="number" placeholder="Base Price ($) - e.g. 120" className="p-3 border rounded focus:outline-none focus:border-charcoal bg-white font-bold text-charcoal w-full md:w-1/3" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input type="text" placeholder="Price Info Text (Optional: e.g. From $120/night)" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.priceInfo} onChange={e => setFormData({...formData, priceInfo: e.target.value})} />
             <input type="text" placeholder="Booking Embed Link (Little Hotelier)" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.embedLink} onChange={e => setFormData({...formData, embedLink: e.target.value})} />
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
            <label className="block mb-4 text-xs text-gray-500 font-bold uppercase tracking-widest">In-Room Amenities</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {displayAmenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-3 text-sm cursor-pointer group">
                  <input type="checkbox" checked={formData.features.includes(amenity)} onChange={() => handleCheckbox(amenity)} className="w-4 h-4 rounded text-charcoal cursor-pointer" />
                  <span className="text-gray-700 font-medium group-hover:text-black">{amenity}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <input type="text" placeholder="Add custom amenity..." value={newAmenity} onChange={e => setNewAmenity(e.target.value)} className="flex-1 p-2 border rounded text-sm focus:outline-none focus:border-charcoal bg-white" />
              <button type="button" onClick={handleAddCustomAmenity} className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-1 hover:bg-black cursor-pointer">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <label className="block text-sm font-bold text-gray-700 mb-3">Main Room Image</label>
              {formData.image ? (
                <div className="relative h-40 rounded-lg overflow-hidden border-2 border-gray-300">
                  <img src={getImageUrl(formData.image)} className="w-full h-full object-cover" alt="main" />
                  <button type="button" onClick={() => { setMediaTarget('main'); setIsMediaModalOpen(true); }} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-bold opacity-0 hover:opacity-100 transition-opacity">
                    Change Image
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => { setMediaTarget('main'); setIsMediaModalOpen(true); }} className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-charcoal hover:border-charcoal bg-white cursor-pointer">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <span className="font-bold">Choose from Media Library</span>
                </button>
              )}
            </div>

            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <label className="block text-sm font-bold text-blue-900">Additional Photos ({formData.extraImages.length})</label>
                 <button type="button" onClick={() => { setMediaTarget('extra'); setIsMediaModalOpen(true); }} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-blue-700 flex items-center gap-1 cursor-pointer">
                   <ImagePlus className="w-4 h-4" /> Add Photos
                 </button>
              </div>
              
              <div className="flex-1 bg-white border border-gray-200 rounded p-3 overflow-y-auto max-h-[160px]">
                {formData.extraImages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">No extra photos added.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {formData.extraImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 h-20 group shadow-sm bg-gray-50">
                        <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={`extra-${idx}`} />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => handleRemoveExtraImage(idx)} className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 cursor-pointer shadow-lg transform hover:scale-110">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black uppercase tracking-widest cursor-pointer mt-2 shadow-md text-lg transition-colors">
            {loading ? 'Processing...' : (editingId ? 'Save Changes' : 'Publish Room')}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-6 text-gray-800">🏨 Existing Rooms</h3>
        {fetching ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div></div>
        ) : rooms.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No rooms added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col bg-gray-50">
                <div className="relative h-56">
                  <img src={getImageUrl(room.image)} alt={room.name} className="w-full h-full object-cover" />
                  {room.extraImages && room.extraImages.length > 0 && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-bold">
                      +{room.extraImages.length} Photos
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-charcoal mb-1">{room.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{room.type} • {room.view}</p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => handleEditClick(room)} className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg font-semibold cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(room._id, room.name)} className="flex-1 bg-red-50 border border-red-100 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-lg font-semibold cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MediaSelectorModal 
        isOpen={isMediaModalOpen} 
        onClose={() => setIsMediaModalOpen(false)}
        multiSelect={mediaTarget === 'extra'}
        onSelect={handleMediaSelected}
      />
    </div>
  );
}