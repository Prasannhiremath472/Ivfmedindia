import { useEffect, useState } from 'react';
import { Star, Edit2, Plus, Trash2, Award } from 'lucide-react';
import { doctorApi } from '@/services/api';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorApi.getAll({ limit: 50 }).then(r => setDoctors(r.data.data || [])).catch(() => {
      setDoctors([
        { id: 1, name: 'Dr. Priya Sharma', designation: 'Senior Fertility Specialist', specialization: 'IVF', experience_years: 18, success_rate: 68.5, is_active: true, profile_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80' },
        { id: 2, name: 'Dr. Rajesh Malhotra', designation: 'Lead IVF Consultant', specialization: 'Andrology', experience_years: 15, success_rate: 72.0, is_active: true, profile_image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80' },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Doctors</h1>
          <p className="text-gray-500 text-sm">{doctors.length} specialists</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2.5 px-5"><Plus size={15} /> Add Doctor</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />)
        ) : doctors.map(doc => (
          <div key={doc.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
            <img src={doc.profile_image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80'} alt={doc.name} className="w-16 h-16 rounded-xl object-cover object-top flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-800 text-sm">{doc.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${doc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {doc.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-[#C9A227] text-xs font-medium mt-0.5">{doc.designation}</p>
              <p className="text-gray-500 text-xs">{doc.specialization}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>{doc.experience_years}+ yrs</span>
                <span className="flex items-center gap-0.5"><Award size={10} className="text-gold-500" /> {doc.success_rate}% success</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button className="flex items-center gap-1 text-xs bg-teal-50 text-[#C9A227] px-2.5 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                  <Edit2 size={11} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
