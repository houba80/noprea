import React, { useState, useEffect } from 'react';
import { fetchReviews, createReview, updateReview, deleteReview, logActivity } from '../api/index';
import { AlertCircle, Trash2, Edit } from 'lucide-react';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  // 🟢 ضفنا حقل source هنا
  const initialForm = { rating: 5, quote: '', name: '', country: '', source: 'Booking.com' };
  const [formData, setFormData] = useState(initialForm);

  const loadReviews = async () => {
    setFetching(true);
    try {
      const { data } = await fetchReviews();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { loadReviews(); }, []);

  const handleEditClick = (review: any) => {
    setEditingId(review._id);
    setFormData({
      rating: review.rating,
      quote: review.quote,
      name: review.name,
      country: review.country,
      source: review.source || 'Booking.com'
    });
    setWarning(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote || !formData.country || !formData.source) {
      return setWarning('⚠️ All fields are mandatory!');
    }
    
    setWarning(null);
    setLoading(true);

    try {
      if (editingId) {
        await updateReview(editingId, formData);
        await logActivity(`Updated review by ${formData.name}`).catch(() => {});
        alert('✅ Review updated successfully!');
      } else {
        await createReview(formData);
        await logActivity(`Added new review by ${formData.name}`).catch(() => {});
        alert('✅ Review added successfully!');
      }
      setFormData(initialForm);
      setEditingId(null);
      loadReviews();
    } catch (error: any) {
      alert('❌ Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      await logActivity(`Deleted review by ${name}`).catch(() => {});
      loadReviews();
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{editingId ? '✏️ Edit Review' : '➕ Add New Review'}</h3>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(initialForm); setWarning(null); }} className="text-sm text-red-500 hover:underline font-bold cursor-pointer">
              Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {warning && (
            <div className="md:col-span-2 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{warning}</span>
            </div>
          )}

          <input type="text" placeholder="Guest Name" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="text" placeholder="Country" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
          
          {/* 🟢 حقل مصدر التقييم الجديد */}
          <input type="text" placeholder="Review Source (e.g. Booking.com, Google)" className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
          
          <select className="p-3 border rounded focus:outline-none focus:border-charcoal" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})}>
            <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
            <option value={3}>⭐⭐⭐ (3 Stars)</option>
            <option value={2}>⭐⭐ (2 Stars)</option>
            <option value={1}>⭐ (1 Star)</option>
          </select>
          
          <textarea placeholder="Review Quote..." rows={3} className="p-3 border rounded md:col-span-2 focus:outline-none focus:border-charcoal" value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} />

          <button type="submit" disabled={loading} className="md:col-span-2 bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black uppercase tracking-widest cursor-pointer shadow-md text-lg">
            {loading ? 'Processing...' : (editingId ? 'Save Changes' : 'Publish Review')}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-6 text-gray-800">⭐ Existing Reviews</h3>
        {fetching ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div></div>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No reviews added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between bg-gray-50">
                <div>
                  <div className="flex items-center gap-1 mb-3 text-yellow-500">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <p className="text-gray-700 italic mb-4 text-sm">&ldquo;{review.quote}&rdquo;</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-bold text-charcoal">{review.name}</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{review.country}</p>
                    </div>
                    {/* 🟢 إظهار المصدر في الكارت بتاع الآدمن */}
                    <span className="text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-700 font-bold">{review.source || 'Booking.com'}</span>
                  </div>
                </div>
                <div className="mt-5 flex gap-3 border-t border-gray-200 pt-4">
                  <button onClick={() => handleEditClick(review)} className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"><Edit className="w-4 h-4"/> Edit</button>
                  <button onClick={() => handleDelete(review._id, review.name)} className="flex-1 bg-red-50 border border-red-100 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"><Trash2 className="w-4 h-4"/> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}