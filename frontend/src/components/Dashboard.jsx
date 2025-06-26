import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    fetchDevices();
    fetchEarnings();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get('https://smartsync-backend.vercel.app/devices');
      setDevices(res.data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  const fetchEarnings = async () => {
    try {
      const res = await axios.get('https://smartsync-backend.vercel.app/earnings');
      setEarnings(res.data.total);
    } catch (err) {
      console.error('Error fetching earnings:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">SmartSync Dashboard</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <p className="text-lg">Total Earnings: <span className="text-green-400 font-bold">${earnings.toFixed(2)}</span></p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Connected Devices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-2">{device.name}</h3>
            <p>Status: <span className={device.online ? 'text-green-400' : 'text-red-400'}>{device.online ? 'Online' : 'Offline'}</span></p>
            <p>Earnings: ${device.earnings.toFixed(2)}</p>
            <p>Last Sync: {new Date(device.last_sync).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
