import { useEffect, useState } from 'react';
import { Search, Phone, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { adminApi } from '@/services/api';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
  no_show: 'bg-gray-100 text-gray-600',
  rescheduled: 'bg-purple-100 text-purple-700',
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    adminApi.getAppointments({ status: statusFilter, limit: 50 }).then(r => setAppointments(r.data.data || [])).catch(() => {
      setAppointments([
        { id: 1, booking_id: 'IVF123456', patient_name: 'Anjali Mehta', patient_phone: '9876543210', appointment_date: '2024-03-15', appointment_time: '10:00', status: 'confirmed', doctor: { name: 'Dr. Priya Sharma' } },
        { id: 2, booking_id: 'IVF789012', patient_name: 'Rajesh Kumar', patient_phone: '9876543211', appointment_date: '2024-03-16', appointment_time: '11:30', status: 'pending', doctor: null },
      ]);
    }).finally(() => setLoading(false));
  }, [statusFilter]);

  const updateStatus = async (id: number, status: string) => {
    await adminApi.updateAppointment(id, { status });
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const filtered = appointments.filter(a => !search || a.patient_name.toLowerCase().includes(search.toLowerCase()) || a.patient_phone.includes(search) || a.booking_id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Appointments</h1>
          <p className="text-gray-500 text-sm">{appointments.length} total appointments</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="Search patient, phone, booking ID..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          {['pending', 'confirmed', 'cancelled', 'completed', 'no_show'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Booking ID</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Patient</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Doctor</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Date & Time</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Status</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">No appointments found</td></tr>
              ) : filtered.map(appt => (
                <tr key={appt.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{appt.booking_id}</td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-800">{appt.patient_name}</div>
                    <div className="text-gray-400 text-xs">{appt.patient_phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">{appt.doctor?.name || '—'}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-gray-700 text-xs flex items-center gap-1"><Calendar size={11} /> {appt.appointment_date}</div>
                    <div className="text-gray-400 text-xs flex items-center gap-1"><Clock size={11} /> {appt.appointment_time}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <select value={appt.status} onChange={e => updateStatus(appt.id, e.target.value)}
                      className={`${STATUS_COLORS[appt.status]} text-xs font-medium rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer capitalize`}>
                      {['pending', 'confirmed', 'cancelled', 'completed', 'no_show', 'rescheduled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <a href={`tel:${appt.patient_phone}`} className="inline-flex items-center gap-1 text-xs bg-teal-50 text-[#C9A227] px-2.5 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                      <Phone size={11} /> Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
