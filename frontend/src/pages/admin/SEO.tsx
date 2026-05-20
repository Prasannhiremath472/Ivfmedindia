import { useEffect, useState } from 'react';
import { Search, Save, Plus, CheckCircle } from 'lucide-react';
import { adminApi } from '@/services/api';

export default function AdminSEO() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi.getSeoList().then(r => setSeoList(r.data.seoList || [])).catch(() => {
      setSeoList([
        { id: 1, page_path: '/', title: 'IVFMedIndia - Best IVF Centre', description: 'India\'s leading IVF centre', page_type: 'home' },
        { id: 2, page_path: '/treatments/ivf-treatment', title: 'IVF Treatment India | IVFMedIndia', description: 'Best IVF treatment in India', page_type: 'treatment' },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await adminApi.saveSeo(selected);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">SEO Management</h1>
          <p className="text-gray-500 text-sm">Manage meta tags, schema markup, and page SEO</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2.5 px-5"><Plus size={15} /> Add Page</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Page list */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Search pages..." />
            </div>
          </div>
          <div className="overflow-y-auto max-h-96">
            {loading ? (
              <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
            ) : seoList.map(seo => (
              <button key={seo.id} onClick={() => setSelected({ ...seo })}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selected?.id === seo.id ? 'bg-teal-50 border-l-2 border-l-brand-500' : ''}`}>
                <div className="font-medium text-gray-800 text-sm truncate">{seo.page_path}</div>
                <div className="text-gray-500 text-xs capitalize">{seo.page_type}</div>
              </button>
            ))}
          </div>
        </div>

        {/* SEO form */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Edit: {selected.page_path}</h2>
                <button onClick={handleSave} disabled={saving} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2 px-4 disabled:opacity-70 flex items-center gap-2">
                  {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save'}</>}
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-gray-400 font-normal text-xs">(50-60 chars)</span></label>
                  <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" value={selected.title || ''} onChange={e => setSelected((s: any) => ({ ...s, title: e.target.value }))} />
                  <div className="text-xs text-gray-400 mt-1">{selected.title?.length || 0} / 60 chars</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-gray-400 font-normal text-xs">(150-160 chars)</span></label>
                  <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3] resize-none" value={selected.description || ''} onChange={e => setSelected((s: any) => ({ ...s, description: e.target.value }))} />
                  <div className="text-xs text-gray-400 mt-1">{selected.description?.length || 0} / 160 chars</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                  <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="keyword1, keyword2, keyword3" value={selected.keywords || ''} onChange={e => setSelected((s: any) => ({ ...s, keywords: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                  <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4E9FA3]" placeholder="https://..." value={selected.og_image || ''} onChange={e => setSelected((s: any) => ({ ...s, og_image: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Robots</label>
                  <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none" value={selected.robots || 'index, follow'} onChange={e => setSelected((s: any) => ({ ...s, robots: e.target.value }))}>
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>Select a page to edit its SEO settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
