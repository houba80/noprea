import React, { useState } from 'react';
import { updateProfile } from '../api/index';

export default function MyProfile() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const currentUsername = localStorage.getItem('username') || 'Admin';
  const currentRole = localStorage.getItem('role') || 'editor';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return alert('Enter a new password');
    setLoading(true);
    try {
      await updateProfile({ password });
      alert('✅ Password changed successfully!');
      setPassword('');
    } catch (error) {
      alert('❌ Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-charcoal text-warm-sand rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-4">
          {currentUsername.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Hello, {currentUsername}!</h2>
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest font-bold mt-2 inline-block">
          {currentRole}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-lg font-bold mb-4">🔐 Change Your Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              placeholder="Enter new strong password..." 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-3 border rounded focus:outline-none focus:border-charcoal" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-charcoal text-white py-3 rounded font-bold hover:bg-black transition-colors uppercase tracking-widest cursor-pointer"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}