import { useEffect, useState } from 'react';
import { Plus, Edit2, Star, Trash2 } from 'lucide-react';
import { testimonialApi } from '@/services/api';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialApi.getAll({ limit: 50 }).then(r => setTestimonials(r.data.data || [])).catch(() => {
      setTestimonials([
        { id: 1, patient_name: 'Sneha & Rohit Patel', patient_city: 'Pune', rating: 5, treatment_name: 'IVF', is_featured: true, is_active: true },
        { id: 2, patient_name: 'Kavita & Arun Mehta', patient_city: 'Mumbai', rating: 5, treatment_name: 'IVF+PCOS', is_featured: true, is_active: true },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Testimonials</h1>
          <p className="text-gray-500 text-sm">{testimonials.length} testimonials</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2.5 px-5"><Plus size={15} /> Add Testimonial</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />)
        ) : testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < (t.rating || 5) ? 'text-gold-400 fill-gold-400' : 'text-gray-200'} />)}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.is_featured ? 'bg-teal-100 text-[#A67C00]' : 'bg-gray-100 text-gray-500'}`}>
                  {t.is_featured ? 'Featured' : 'Normal'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {t.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
            </div>
            <div className="font-semibold text-gray-800 text-sm">{t.patient_name}</div>
            <div className="text-gray-500 text-xs mt-0.5">{t.patient_city} · {t.treatment_name}</div>
            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-1 text-xs bg-teal-50 text-[#C9A227] px-2.5 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                <Edit2 size={11} /> Edit
              </button>
              <button className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
