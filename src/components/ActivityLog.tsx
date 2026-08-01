import React, { useState, useEffect } from 'react';
import { fetchActivityLogs } from '../api/index';

export default function ActivityLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const { data } = await fetchActivityLogs();
        setLogs(data);
      } catch (error) {
        console.error('Failed to load logs');
      } finally {
        setLoading(false);
      }
    };
    getLogs();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading activity...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <h3 className="text-xl font-bold mb-4">📊 System Activity Log</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-3 font-bold text-gray-600">Date & Time</th>
              <th className="p-3 font-bold text-gray-600">User</th>
              <th className="p-3 font-bold text-gray-600">Action performed</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500">No activity recorded yet.</td></tr>
            ) : (
              logs.map(log => (
                <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-500">{new Date(log.date).toLocaleString()}</td>
                  <td className="p-3 font-bold text-blue-600">{log.username}</td>
                  <td className="p-3 text-gray-800 font-medium">{log.action}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}