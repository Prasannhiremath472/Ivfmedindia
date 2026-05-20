import { useState } from 'react';
import { Save, Bell, Shield, Globe, Mail, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Settings</h1>
          <p className="text-gray-500 text-sm">Manage site settings and configurations</p>
        </div>
        <button onClick={handleSave} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2.5 px-5 flex items-center gap-2">
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Settings</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center"><Globe size={16} className="text-[#C9A227]" /></div>
              <h2 className="font-semibold text-gray-800">General Settings</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Site Name', placeholder: 'IVFMedIndia', type: 'text' },
                { label: 'Tagline', placeholder: 'Your Dream of Parenthood Starts Here', type: 'text' },
                { label: 'Contact Phone', placeholder: '+91 8888 888 888', type: 'tel' },
                { label: 'Contact Email', placeholder: 'info@ivfmedindia.com', type: 'email' },
                { label: 'WhatsApp Number', placeholder: '918888888888', type: 'tel' },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder={placeholder} />
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center"><Mail size={16} className="text-teal-600" /></div>
              <h2 className="font-semibold text-gray-800">Email Settings (SMTP)</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'SMTP Host', placeholder: 'smtp.gmail.com' },
                { label: 'SMTP Port', placeholder: '587' },
                { label: 'SMTP Username', placeholder: 'your-email@gmail.com' },
                { label: 'SMTP Password', placeholder: '••••••••••', type: 'password' },
                { label: 'From Email', placeholder: 'noreply@ivfmedindia.com' },
                { label: 'Admin Notification Email', placeholder: 'admin@ivfmedindia.com' },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type || 'text'} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder={placeholder} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center"><Bell size={14} className="text-orange-600" /></div>
              <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
            </div>
            <div className="space-y-3">
              {['New Lead Alert', 'New Appointment', 'Appointment Confirmed', 'Daily Summary Email', 'Weekly Report'].map(item => (
                <label key={item} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">{item}</span>
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-[#4E9FA3] transition-colors cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-transform peer-checked:after:translate-x-5" />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center"><Shield size={14} className="text-red-600" /></div>
              <h3 className="font-semibold text-gray-800 text-sm">Security</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="Min 8 characters" />
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all text-xs py-2">Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
