import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/index';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin({ username, password });
      
      // حفظ البيانات في المتصفح عشان نستخدمها في الداشبورد والبروفايل
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role || 'editor');
      localStorage.setItem('permissions', JSON.stringify(response.data.permissions || []));
      localStorage.setItem('username', response.data.username || username); 
      
      navigate('/admin-dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">NOPREA</h2>
          <p className="text-gray-500 text-sm mt-1">Admin Portal</p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">{error}</div>}
        
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#2c2c2c] hover:bg-black text-white font-bold py-3 rounded transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;