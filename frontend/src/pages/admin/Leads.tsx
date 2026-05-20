import { useEffect, useState } from 'react';
import { Search, Filter, Phone, Mail, MapPin, Edit2, ChevronDown } from 'lucide-react';
import { adminApi } from '@/services/api';

const STAGES = ['new', 'contacted', 'qualified', 'appointment_scheduled', 'converted', 'lost'];
const STAGE_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  appointment_scheduled: 'bg-orange-100 text-orange-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [editingLead, setEditingLead] = useState<any>(null);

  const fetchLeads = () => {
    setLoading(true);
    adminApi.getLeads({ search, stage: stageFilter, limit: 50 }).then(r => setLeads(r.data.data || [])).catch(() => {
      setLeads([
        { id: 1, name: 'Anjali Mehta', phone: '9876543210', email: 'anjali@example.com', city: 'Pune', stage: 'new', source: 'website', created_at: new Date().toISOString() },
        { id: 2, name: 'Rajesh Kumar', phone: '9876543211', email: 'rajesh@example.com', city: 'Mumbai', stage: 'contacted', source: 'chatbot', created_at: new Date().toISOString() },
        { id: 3, name: 'Priya Singh', phone: '9876543212', email: 'priya@example.com', city: 'Delhi', stage: 'converted', source: 'google_ads', created_at: new Date().toISOString() },
      ]);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchLeads(); }, [search, stageFilter]);

  const updateStage = async (id: number, stage: string) => {
    await adminApi.updateLead(id, { stage });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Lead Management</h1>
          <p className="text-gray-500 text-sm">{leads.length} total leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="Search name, phone, email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" value={stageFilter} onChange={e => setStageFilter(e.target.value)}>
          <option value="">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>)}
        </select>
      </div>

      {/* Stage kanban summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
        {STAGES.map(stage => {
          const count = leads.filter(l => l.stage === stage).length;
          return (
            <button key={stage} onClick={() => setStageFilter(stageFilter === stage ? '' : stage)}
              className={`rounded-xl p-3 text-center transition-all border ${stageFilter === stage ? 'border-[#C9A227] shadow-md' : 'border-gray-100'} bg-white`}>
              <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mb-1 ${STAGE_COLORS[stage]}`}>{count}</div>
              <div className="text-xs text-gray-600 capitalize">{stage.replace('_', ' ')}</div>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Contact</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Location</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Stage</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Source</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">Loading leads...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">No leads found</td></tr>
              ) : leads.map(lead => (
                <tr key={lead.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-800">{lead.name}</div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                      <Phone size={10} /> {lead.phone}
                    </div>
                    {lead.email && <div className="flex items-center gap-1 text-gray-400 text-xs"><Mail size={10} /> {lead.email}</div>}
                  </td>
                  <td className="px-5 py-3.5">
                    {lead.city && <div className="flex items-center gap-1 text-gray-600 text-xs"><MapPin size={10} /> {lead.city}</div>}
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={lead.stage}
                      onChange={e => updateStage(lead.id, e.target.value)}
                      className={`${STAGE_COLORS[lead.stage]} text-xs font-medium rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer capitalize`}
                    >
                      {STAGES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs capitalize">{lead.source?.replace('_', ' ')}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(lead.created_at).toLocaleDateString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 text-xs bg-teal-50 text-[#C9A227] px-2.5 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
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
