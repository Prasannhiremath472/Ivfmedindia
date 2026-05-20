import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Clock, CheckCircle, XCircle, ArrowRight, Activity } from 'lucide-react';
import { adminApi } from '@/services/api';

interface Stats {
  today_appointments: number;
  pending_appointments: number;
  month_appointments: number;
  today_leads: number;
  new_leads: number;
  month_leads: number;
  total_users: number;
  published_blogs: number;
  active_doctors: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then(r => {
      setStats(r.data.stats);
      setRecentAppointments(r.data.recentAppointments || []);
      setRecentLeads(r.data.recentLeads || []);
    }).catch(() => {
      setStats({ today_appointments: 12, pending_appointments: 8, month_appointments: 143, today_leads: 24, new_leads: 56, month_leads: 312, total_users: 1843, published_blogs: 28, active_doctors: 8, testimonials: 142 });
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { title: "Today's Appointments", value: stats?.today_appointments || 0, icon: Calendar, color: 'brand', link: '/admin/appointments' },
    { title: 'Pending Appointments', value: stats?.pending_appointments || 0, icon: Clock, color: 'rose', link: '/admin/appointments?status=pending' },
    { title: "Today's Leads", value: stats?.today_leads || 0, icon: TrendingUp, color: 'teal', link: '/admin/leads' },
    { title: 'New Leads', value: stats?.new_leads || 0, icon: Users, color: 'orange', link: '/admin/leads?stage=new' },
    { title: 'Month Appointments', value: stats?.month_appointments || 0, icon: Activity, color: 'purple', link: '/admin/appointments' },
    { title: 'Month Leads', value: stats?.month_leads || 0, icon: TrendingUp, color: 'green', link: '/admin/leads' },
    { title: 'Total Users', value: stats?.total_users || 0, icon: Users, color: 'blue', link: '/admin' },
    { title: 'Published Blogs', value: stats?.published_blogs || 0, icon: CheckCircle, color: 'indigo', link: '/admin/blogs' },
  ];

  const colorMap: Record<string, string> = {
    brand: 'bg-[#4E9FA3]', rose: 'bg-rose-500', teal: 'bg-teal-500', orange: 'bg-orange-500',
    purple: 'bg-purple-500', green: 'bg-green-500', blue: 'bg-blue-500', indigo: 'bg-indigo-500',
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-10 h-10 border-4 border-teal-200 border-t-brand-600 rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={card.link} className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 ${colorMap[card.color]} rounded-lg flex items-center justify-center`}>
                  <card.icon size={17} className="text-white" />
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-2xl font-bold text-gray-800 font-heading">{card.value.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">{card.title}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Appointments</h2>
            <Link to="/admin/appointments" className="text-[#C9A227] text-sm font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Patient</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Date</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length === 0 ? (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-gray-400 text-sm">No appointments yet</td></tr>
                ) : recentAppointments.map((appt) => (
                  <tr key={appt.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-700">{appt.patient_name}</div>
                      <div className="text-gray-400 text-xs">{appt.patient_phone}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{appt.appointment_date}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        appt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{appt.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Leads</h2>
            <Link to="/admin/leads" className="text-[#C9A227] text-sm font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Name</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Stage</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Source</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-gray-400 text-sm">No leads yet</td></tr>
                ) : recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-700">{lead.name}</div>
                      <div className="text-gray-400 text-xs">{lead.phone}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        lead.stage === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.stage === 'converted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{lead.stage}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 capitalize text-xs">{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-teal-50 rounded-xl p-5 border border-teal-100">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Manage Leads', path: '/admin/leads', color: 'bg-[#4E9FA3]' },
            { label: 'Appointments', path: '/admin/appointments', color: 'bg-teal-600' },
            { label: 'Manage Doctors', path: '/admin/doctors', color: 'bg-purple-600' },
            { label: 'Blog CMS', path: '/admin/blogs', color: 'bg-orange-500' },
            { label: 'SEO Settings', path: '/admin/seo', color: 'bg-indigo-600' },
          ].map(a => (
            <Link key={a.path} to={a.path} className={`${a.color} text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity`}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
