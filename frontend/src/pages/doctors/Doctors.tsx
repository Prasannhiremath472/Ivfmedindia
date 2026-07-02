import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Search } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { doctorApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const fallback = [
  { id: 1, name: 'Dr. Sachin Kulkarni', slug: 'dr-sachin-kulkarni', designation: 'Chairman, Director, Chief IVF Specialist', specialization: 'IVF & Reproductive Medicine', experience_years: 25, profile_image: '/images/doctor1.png', success_rate: 72.0, short_bio: 'Chairman & Director with 25+ years. Pioneer in IVF technology in the region.' },
  { id: 2, name: 'Dr. Swati Kulkarni',  slug: 'dr-swati-kulkarni',  designation: 'M.B.B.S, D.G.O',                          specialization: 'Obstetrics & Gynaecology',    experience_years: 18, profile_image: '/images/doctor2.jpeg', success_rate: 68.5, short_bio: 'Specialist in obstetrics and gynaecology with 18+ years clinical experience.' },
  { id: 3, name: 'Dr. Sharayu Mohite',  slug: 'dr-sharayu-mohite',  designation: 'M.B.B.S, D.G.O, D.N.B',                  specialization: 'Gynaecology & Infertility',   experience_years: 14, profile_image: '/images/doctor3.jpeg', success_rate: 65.0, short_bio: 'DNB qualified gynaecologist specialising in infertility and reproductive medicine.' },
  { id: 4, name: 'Dr. Uma Gaikwad',     slug: 'dr-uma-gaikwad',     designation: 'Fertility Consultant',                    specialization: 'Fertility & IVF',            experience_years: 12, profile_image: '/images/doctor4.jpeg', success_rate: 66.0, short_bio: 'Dedicated fertility consultant providing compassionate, personalised care.' },
];

export default function Doctors() {
  const [doctors, setDoctors] = useState(fallback);
  const [search, setSearch] = useState('');
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    doctorApi.getAll({ limit: 20 }).then(r => { if (r.data.data?.length) setDoctors(r.data.data); }).catch(() => {});
  }, []);

  const filtered = doctors.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead title="Best IVF Doctors & Fertility Specialists | IVF मार्गदर्शन"
        description="Meet our team of 25+ expert IVF doctors. 18+ years experience. Trained at top international institutions."
        canonicalPath="/doctors"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Doctors', url: `${SITE_URL}/doctors` }])} />

      <section className="relative h-56 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=85" alt="Our Doctors" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-1">Our Fertility Specialists</h1>
          <p className="text-white/70">25+ expert doctors trained at top institutions worldwide</p>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="relative w-full max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm focus:outline-none bg-white transition-all"
                style={{ border: '1px solid rgba(201,162,39,0.25)' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C9A227')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(201,162,39,0.25)')}
                placeholder="Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <p className="text-gray-400 text-sm flex-shrink-0">{filtered.length} specialists found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 bg-white"
                  style={{ border: '1px solid rgba(201,162,39,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(201,162,39,0.22)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'}>
                  <div className="relative h-64 overflow-hidden" style={{ background: 'linear-gradient(160deg,#f0f9fa,#fdfbf0)' }}>
                    <img src={doc.profile_image} alt={doc.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-3 right-3 rounded-2xl px-2.5 py-1.5 text-center shadow-lg" style={{ background: GG }}>
                      <div className="text-white font-black text-sm leading-none">{doc.success_rate}%</div>
                      <div className="text-white/80 text-[9px]">Success</div>
                    </div>
                  </div>
                  <div className="h-1" style={{ background: GG }} />
                  <div className="p-5">
                    <h3 className="font-black text-gray-900 mb-0.5 group-hover:text-[#C9A227] transition-colors">{doc.name}</h3>
                    <p className="text-sm font-bold mb-1" style={{ color: '#4E9FA3' }}>{doc.designation}</p>
                    <p className="text-gray-400 text-xs mb-2">{doc.specialization}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{doc.short_bio}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-0.5">{[...Array(5)].map((_,j)=><Star key={j} size={11} className="fill-[#C9A227] text-[#C9A227]"/>)}</div>
                      <span className="text-xs text-gray-400">{doc.experience_years}+ yrs</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/doctors/${doc.slug}`} className="flex-1 text-center py-2.5 rounded-xl text-xs font-black border-2 transition-all"
                        style={{ borderColor: '#4E9FA3', color: '#4E9FA3' }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=TG;(e.currentTarget as HTMLElement).style.color='#fff';(e.currentTarget as HTMLElement).style.borderColor='transparent'}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='';(e.currentTarget as HTMLElement).style.color='#4E9FA3';(e.currentTarget as HTMLElement).style.borderColor='#4E9FA3'}}>
                        View Profile
                      </Link>
                      <button onClick={() => setAppointmentModal(true)} className="flex-1 py-2.5 rounded-xl text-xs font-black text-white" style={{ background: GG }}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}