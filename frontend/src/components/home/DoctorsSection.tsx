import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { doctorApi } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

const fallback = [
  { id: 1, name: 'Dr. Sachin Kulkarni',  slug: 'dr-sachin-kulkarni',  designation: 'Chairman, Director, Chief IVF Specialist', specialization: 'IVF & Reproductive Medicine', experience_years: 25, profile_image: '/images/doctor1.png', success_rate: 72.0, total_patients: 5000 },
  { id: 2, name: 'Dr. Swati Kulkarni',   slug: 'dr-swati-kulkarni',   designation: 'M.B.B.S, D.G.O',                           specialization: 'Obstetrics & Gynaecology',    experience_years: 18, profile_image: '/images/doctor2.jpeg', success_rate: 68.5, total_patients: 3200 },
  { id: 3, name: 'Dr. Sharayu Mohite',   slug: 'dr-sharayu-mohite',   designation: 'M.B.B.S, D.G.O, D.N.B',                   specialization: 'Gynaecology & Infertility',   experience_years: 14, profile_image: '/images/doctor3.jpeg', success_rate: 65.0, total_patients: 2800 },
  { id: 4, name: 'Dr. Uma Gaikwad',      slug: 'dr-uma-gaikwad',      designation: 'Fertility Consultant',                     specialization: 'Fertility & IVF',            experience_years: 12, profile_image: '/images/doctor4.jpeg', success_rate: 66.0, total_patients: 2100 },
];

export default function DoctorsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [doctors, setDoctors] = useState(fallback);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    doctorApi.getFeatured().then(r => { if (r.data.data?.length) setDoctors(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdfbf0 0%, #ffffff 40%, #f0f9fa 100%)' }}>

      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4E9FA3, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#4E9FA3]" />
              <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
                style={{ background: 'linear-gradient(135deg, #4E9FA3, #3A7F83)' }}>
                Our Specialists
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Meet Our{' '}
              <span style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Expert Doctors
              </span>
            </h2>
          </div>
          <Link to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
            style={{ borderColor: '#4E9FA3', color: '#4E9FA3' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#4E9FA3'; (e.currentTarget as HTMLElement).style.borderColor = '#4E9FA3'; }}>
            View All Doctors <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <motion.div key={doc.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.09 }}>
              <div className="group rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-gold"
                style={{ border: '1px solid rgba(201,162,39,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>

                {/* Photo area — white bg photos use contain */}
                <div className="relative h-64 overflow-hidden"
                  style={{ background: 'linear-gradient(160deg,#f0f9fa 0%,#fdfbf0 100%)' }}>
                  <img src={doc.profile_image} alt={doc.name}
                    className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  {/* Subtle bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.08) 0%, transparent 100%)' }} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.25) 0%, transparent 60%)' }} />

                  {/* Success rate badge */}
                  <div className="absolute top-3 right-3 rounded-2xl px-3 py-1.5 text-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)' }}>
                    <div className="text-white font-black text-sm leading-none">{doc.success_rate}%</div>
                    <div className="text-white/80 text-[9px] font-medium">Success</div>
                  </div>

                  {/* Patients badge */}
                  <div className="absolute top-3 left-3 rounded-2xl px-3 py-1.5 text-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}>
                    <div className="text-white font-black text-sm leading-none">{(doc.total_patients / 1000).toFixed(1)}K</div>
                    <div className="text-white/80 text-[9px] font-medium">Patients</div>
                  </div>

                  {/* Hover: View Profile link */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/doctors/${doc.slug}`}
                      className="text-white text-xs font-black px-5 py-2 rounded-full flex items-center gap-1.5"
                      style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)' }}>
                      View Profile <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                {/* Info — fixed-height rows so all cards align */}
                <div className="p-5 flex flex-col">
                  {/* Name — 1 line */}
                  <h3 className="font-black text-gray-900 mb-0.5 group-hover:text-[#C9A227] transition-colors leading-snug line-clamp-1">{doc.name}</h3>
                  {/* Designation — fixed height = 2 lines always */}
                  <p className="text-[#4E9FA3] text-sm font-bold mb-0.5 leading-snug" style={{ minHeight: '2.5rem' }}>{doc.designation}</p>
                  {/* Specialization — 1 line */}
                  <p className="text-gray-400 text-xs mb-3 line-clamp-1">{doc.specialization}</p>

                  {/* Stars + experience */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="fill-[#C9A227] text-[#C9A227]" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">{doc.experience_years}+ yrs</span>
                  </div>

                  <button onClick={() => setAppointmentModal(true)}
                    className="w-full py-2.5 rounded-2xl text-xs font-black text-white transition-all duration-200 hover:shadow-gold"
                    style={{ background: 'linear-gradient(135deg,#E8C547 0%,#C9A227 100%)' }}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
