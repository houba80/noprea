import React, { useState, useEffect } from 'react';
import { fetchRetreats, createRetreat, updateRetreat, deleteRetreat, logActivity } from '../api/index';
import { AlertCircle, Trash2, Edit2, Calendar } from 'lucide-react';

export default function RetreatsManager() {
  const [retreats, setRetreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = { name: '', date: '', startDate: '', endDate: '', icon: '🍃' };
  const [formData, setFormData] = useState(initialForm);

  const loadRetreats = async () => {
    setFetching(true);
    try {
      const { data } = await fetchRetreats();
      setRetreats(data);
    } catch (error) {
      console.error('Failed to fetch retreats');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { loadRetreats(); }, []);

  const generateDateRangeString = (start: string, end: string) => {
    if (!start || !end) return '';
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return '';

    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const m1 = months[d1.getMonth()];
    const m2 = months[d2.getMonth()];

    if (m1 === m2) {
      return `${d1.getDate()} - ${d2.getDate()} ${m1}`;
    } else {
      return `${d1.getDate()} ${m1} - ${d2.getDate()} ${m2}`;
    }
  };

  const handleDateChange = (type: 'start' | 'end', val: string) => {
    const newForm = { ...formData, [type === 'start' ? 'startDate' : 'endDate']: val };
    const generatedRange = generateDateRangeString(newForm.startDate, newForm.endDate);
    setFormData({ ...newForm, date: generatedRange });
  };

  const handleEditClick = (retreat: any) => {
    setEditingId(retreat._id);
    setFormData({
      name: retreat.name || '',
      date: retreat.date || '',
      startDate: retreat.startDate || '',
      endDate: retreat.endDate || '',
      icon: retreat.icon || '🍃'
    });
    setWarning(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) {
      return setWarning('⚠️ Retreat Name and Date are mandatory!');
    }
    
    setWarning(null);
    setLoading(true);

    try {
      if (editingId) {
        await updateRetreat(editingId, formData);
        await logActivity(`Updated Retreat: ${formData.name}`).catch(() => {});
        alert('✅ Retreat updated successfully!');
      } else {
        await createRetreat(formData);
        await logActivity(`Added new Retreat: ${formData.name}`).catch(() => {});
        alert('✅ Retreat added successfully!');
      }
      setFormData(initialForm);
      setEditingId(null);
      loadRetreats();
    } catch (error: any) {
      console.error("Error submitting retreat:", error);
      // 🟢 التعديل هنا: هيظهرلك الخطأ بالتفصيل بدل رسالة عامة
      alert('❌ Error: ' + (error.response?.data?.message || error.message || 'Error processing request.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm('Are you sure you want to delete this retreat?')) return;
    try {
      await deleteRetreat(id);
      await logActivity(`Deleted Retreat: ${name}`).catch(() => {});
      loadRetreats();
    } catch (error) {
      alert('Failed to delete retreat');
    }
  };

  const commonIcons = ['🍃', '🍂', '❄️', '🌱', '☀️', '🧘‍♀️', '🌅'];

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {editingId ? '✏️ Edit Retreat Season' : '➕ Add New Retreat Season'}
          </h3>
          {editingId && (
            <button 
              onClick={() => { setEditingId(null); setFormData(initialForm); setWarning(null); }} 
              className="text-sm text-red-500 font-bold hover:underline cursor-pointer"
            >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Season Name</label>
              <input 
                type="text" 
                placeholder="e.g. Autumn Equinox 2026" 
                required 
                className="p-3 border rounded focus:outline-none focus:border-charcoal w-full" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="flex gap-2 w-full">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Start Date
                </label>
                <input 
                  type="date" 
                  required={!formData.date}
                  value={formData.startDate} 
                  onChange={e => handleDateChange('start', e.target.value)} 
                  className="p-3 border rounded focus:outline-none focus:border-charcoal w-full text-sm" 
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> End Date
                </label>
                <input 
                  type="date" 
                  required={!formData.date}
                  value={formData.endDate} 
                  onChange={e => handleDateChange('end', e.target.value)} 
                  className="p-3 border rounded focus:outline-none focus:border-charcoal w-full text-sm" 
                />
              </div>
            </div>
          </div>

          {formData.date && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-md text-sm text-blue-800 font-medium flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-widest text-blue-500">Formatted Output:</span> 
              {formData.date}
            </div>
          )}

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Icon</label>
            <div className="flex flex-wrap gap-3">
              {commonIcons.map(icon => (
                <button 
                  key={icon} 
                  type="button" 
                  onClick={() => setFormData({...formData, icon})}
                  className={`text-2xl p-3 rounded-lg border transition-all cursor-pointer ${formData.icon === icon ? 'bg-white border-charcoal shadow-md scale-110' : 'border-transparent hover:bg-gray-200 opacity-70 hover:opacity-100'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black uppercase tracking-widest cursor-pointer shadow-md text-lg transition-colors">
            {loading ? 'Processing...' : (editingId ? 'Save Changes' : 'Publish Retreat')}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-6 text-gray-800">📅 Upcoming Retreats</h3>
        {fetching ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div></div>
        ) : retreats.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No retreats scheduled yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {retreats.map((retreat) => (
              <div key={retreat._id} className="border border-gray-200 rounded-xl p-5 flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-lg shadow-sm">{retreat.icon}</span>
                  <div>
                    <h4 className="font-bold text-lg text-charcoal">{retreat.name}</h4>
                    <p className="text-sm text-clay font-medium uppercase tracking-widest mt-1">{retreat.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEditClick(retreat)} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer shadow-sm"
                    title="Edit Retreat"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(retreat._id, retreat.name)} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
                    title="Delete Retreat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}