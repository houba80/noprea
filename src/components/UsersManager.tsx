import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/index';
import { Copy, CheckCircle, X, Circle } from 'lucide-react'; 

const AVAILABLE_PERMS = ['rooms', 'gallery', 'reviews'];

export default function UsersManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [generatedCreds, setGeneratedCreds] = useState<{username: string, password: string} | null>(null);
  const [copied, setCopied] = useState(false);

  const initialForm = { username: '', password: '', role: 'editor', permissions: [] as string[] };
  const [formData, setFormData] = useState(initialForm);

  const passwordCriteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&#]/.test(formData.password),
  };
  
  const isPasswordValid = !formData.password || Object.values(passwordCriteria).every(Boolean);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users");
    }
  };
  
  useEffect(() => { loadUsers(); }, []);

  const handleCheckbox = (perm: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm) ? prev.permissions.filter(p => p !== perm) : [...prev.permissions, perm]
    }));
  };

  const handleEditClick = (user: any) => {
    setEditingId(user._id);
    setFormData({ username: user.username, password: '', role: user.role, permissions: user.permissions || [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return; 
    
    setLoading(true);
    try {
      if (editingId) {
        const { password, ...rest } = formData;
        const payload = password ? { password, ...rest } : rest;
        await updateUser(editingId, payload);
        alert('User updated successfully!');
      } else {
        const res = await createUser(formData);
        const responseData = res.data || res;
        
        if (responseData.generatedPassword && responseData.generatedPassword !== 'User provided password') {
          setGeneratedCreds({ username: responseData.username, password: responseData.generatedPassword });
        } else {
          alert('User created successfully!');
        }
      }
      
      setFormData(initialForm);
      setEditingId(null);
      loadUsers();
    } catch (error: any) { 
      alert(error.response?.data?.message || 'Failed to save user'); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleCopy = () => {
    if (generatedCreds) {
      navigator.clipboard.writeText(`Username: ${generatedCreds.username}\nPassword: ${generatedCreds.password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{editingId ? '✏️ Edit User' : '➕ Add New User'}</h3>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(initialForm); }} className="text-sm text-red-500 font-bold hover:underline cursor-pointer">
              Cancel Edit
            </button>
          )}
        </div>
        
        {/* 🟢 التعديل هنا: غيرنا الـ Form عشان تبقى متقسمة لعمودين منطقيين بدل جريد عشوائي */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* 🟢 العمود الشمال: Username و Role (هيفضلوا ماسكين في بعض دايماً) */}
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={formData.username} 
                onChange={e => setFormData({...formData, username: e.target.value})} 
                className="p-3 border rounded focus:outline-none focus:border-charcoal w-full" 
              />
              <select 
                className="p-3 border rounded focus:outline-none focus:border-charcoal w-full" 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="editor">Editor (Limited)</option>
                <option value="superadmin">Super Admin (Full Access)</option>
              </select>
            </div>
            
            {/* 🟢 العمود اليمين: Password والشروط بتاعته */}
            <div className="flex flex-col w-full">
              <input 
                type="password" 
                placeholder={editingId ? "New Password (leave blank to keep current)" : "Password (leave blank to auto-generate)"} 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                className={`p-3 border rounded focus:outline-none focus:border-charcoal w-full ${!isPasswordValid && formData.password ? 'border-red-300 bg-red-50' : ''}`} 
              />
              
              {formData.password && (
                <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3 text-[11px] font-medium tracking-wide">
                  <p className="text-gray-500 uppercase tracking-widest font-bold mb-2 text-[10px]">Password Requirements:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <span className={`flex items-center gap-1.5 ${passwordCriteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordCriteria.length ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />} 8+ Characters
                    </span>
                    <span className={`flex items-center gap-1.5 ${passwordCriteria.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordCriteria.uppercase ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />} Uppercase
                    </span>
                    <span className={`flex items-center gap-1.5 ${passwordCriteria.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordCriteria.lowercase ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />} Lowercase
                    </span>
                    <span className={`flex items-center gap-1.5 ${passwordCriteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordCriteria.number ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />} Number
                    </span>
                    <span className={`flex items-center gap-1.5 col-span-2 ${passwordCriteria.special ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordCriteria.special ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />} Special Character (@$!%*?&#)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 🟢 الصلاحيات والزرار بره العمودين عشان ياخدوا العرض كامل براحتهم */}
          {formData.role === 'editor' && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2">
              <label className="block mb-3 text-sm font-bold uppercase tracking-widest text-gray-500">Permissions (What can they manage?)</label>
              <div className="flex flex-wrap gap-6">
                {AVAILABLE_PERMS.map(perm => (
                  <label key={perm} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={formData.permissions.includes(perm)} onChange={() => handleCheckbox(perm)} className="w-4 h-4 cursor-pointer text-charcoal focus:ring-charcoal" />
                    <span className="capitalize font-medium text-gray-700 group-hover:text-black">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading || !isPasswordValid} 
            className={`w-full py-3 rounded font-bold uppercase tracking-widest cursor-pointer mt-2 transition-all duration-300 ${
              loading || !isPasswordValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-charcoal text-white hover:bg-black'
            }`}
          >
            {loading ? 'Processing...' : (editingId ? 'Update User' : 'Create User')}
          </button>
        </form>
      </div>

      {/* باقي الكود بتاع عرض المستخدمين والنافذة المنبثقة زي ما هو */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-lg mb-2">{user.username}</h4>
              <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${user.role === 'superadmin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {user.role}
              </span>
              {user.role === 'editor' && (
                <p className="text-xs text-gray-500 mt-3 bg-gray-50 p-2 rounded">
                  <span className="font-bold block mb-1">Access:</span> 
                  {user.permissions.length > 0 ? user.permissions.join(', ') : 'None'}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-3 pt-4 border-t border-gray-100">
              <button onClick={() => handleEditClick(user)} className="flex-1 text-blue-600 text-sm font-bold bg-blue-50 py-2 rounded hover:bg-blue-100 transition-colors cursor-pointer">Edit</button>
              {user.username !== 'admin' && (
                <button onClick={() => handleDelete(user._id)} className="flex-1 text-red-600 text-sm font-bold bg-red-50 py-2 rounded hover:bg-red-100 transition-colors cursor-pointer">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {generatedCreds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in text-center">
            <button 
              onClick={() => setGeneratedCreds(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-charcoal mb-2">User Created!</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              We generated a highly secure password for this user. <br />
              <strong className="text-red-500">Please copy and save it now. It will not be shown again.</strong>
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left space-y-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Username</span>
                <span className="font-mono text-charcoal font-medium">{generatedCreds.username}</span>
              </div>
              <div className="w-full h-px bg-gray-200" />
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">Password</span>
                <span className="font-mono text-charcoal font-medium break-all">{generatedCreds.password}</span>
              </div>
            </div>

            <button 
              onClick={handleCopy}
              className={`w-full py-3 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copied ? 'bg-green-500 text-white' : 'bg-charcoal text-white hover:bg-black'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Copy Credentials
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}