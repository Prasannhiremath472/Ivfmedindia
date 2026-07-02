import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Calendar, ChevronRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { doctorApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

export default function DoctorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    doctorApi.getBySlug(slug!).then(r => setDoctor(r.data.doctor)).catch(() => {
      // Fallback data
      // Doctor profiles keyed by slug
      const doctorProfiles: Record<string, any> = {
        'dr-sachin-kulkarni': {
          name: 'Dr. Sachin Kulkarni',
          designation: 'Chairman, Director, Chief IVF Specialist',
          specialization: 'IVF & Reproductive Medicine',
          experience_years: 25,
          success_rate: 72.0,
          total_patients: 5000,
          profile_image: '/images/doctor1.png',
          qualifications: 'M.B.B.S, M.D, Fellowship in Reproductive Medicine',
          bio: "Dr. Sachin Kulkarni is the Chairman and Director of IVF मार्गदर्शन and a pioneer in IVF technology in the region. With over 25 years of experience, he has helped thousands of couples achieve parenthood.\n\nAs the Chief IVF Specialist, Dr. Kulkarni is known for his innovative protocols and outstanding success rates. His vision has shaped IVF मार्गदर्शन into one of India's most trusted fertility centres.",
          expertise: ['IVF & ICSI', 'Advanced Reproductive Technology', 'Male Infertility', 'Recurrent IVF Failure', 'Fertility Preservation'],
          languages: ['English', 'Hindi', 'Marathi'],
        },
        'dr-swati-kulkarni': {
          name: 'Dr. Swati Kulkarni',
          designation: 'M.B.B.S, D.G.O',
          specialization: 'Obstetrics & Gynaecology',
          experience_years: 18,
          success_rate: 68.5,
          total_patients: 3200,
          profile_image: '/images/doctor2.jpeg',
          qualifications: 'M.B.B.S, D.G.O',
          bio: "Dr. Swati Kulkarni is a specialist in Obstetrics & Gynaecology with 18+ years of clinical experience. She provides comprehensive women's health care with a focus on fertility and reproductive health.\n\nHer patient-centred approach and compassionate care have made her a trusted name among patients seeking fertility treatment.",
          expertise: ['Obstetrics', 'Gynaecology', 'IUI Treatment', 'Female Infertility', 'PCOS Management'],
          languages: ['English', 'Hindi', 'Marathi'],
        },
        'dr-sharayu-mohite': {
          name: 'Dr. Sharayu Mohite',
          designation: 'M.B.B.S, D.G.O, D.N.B',
          specialization: 'Gynaecology & Infertility',
          experience_years: 14,
          success_rate: 65.0,
          total_patients: 2800,
          profile_image: '/images/doctor3.jpeg',
          qualifications: 'M.B.B.S, D.G.O, D.N.B (Obstetrics & Gynaecology)',
          bio: "Dr. Sharayu Mohite is a DNB-qualified gynaecologist specialising in infertility and reproductive medicine. Her expertise in both gynaecology and fertility treatment makes her a valued member of the IVF मार्गदर्शन team.\n\nShe is committed to providing evidence-based, personalised fertility care to every couple she treats.",
          expertise: ['Infertility Treatment', 'IVF & ICSI', 'Laparoscopic Surgery', 'PCOS & Endometriosis', 'Recurrent Pregnancy Loss'],
          languages: ['English', 'Hindi', 'Marathi'],
        },
        'dr-uma-gaikwad': {
          name: 'Dr. Uma Gaikwad',
          designation: 'Fertility Consultant',
          specialization: 'Fertility & IVF',
          experience_years: 12,
          success_rate: 66.0,
          total_patients: 2100,
          profile_image: '/images/doctor4.jpeg',
          qualifications: 'M.B.B.S, Diploma in Reproductive Medicine',
          bio: "Dr. Uma Gaikwad is a dedicated fertility consultant at IVF मार्गदर्शन. With 12+ years of experience, she provides compassionate, personalised fertility care to couples on their parenthood journey.\n\nHer empathetic approach and thorough understanding of fertility challenges make her a trusted consultant for patients seeking IVF and fertility treatments.",
          expertise: ['IVF Treatment', 'IUI', 'Fertility Assessment', 'Ovulation Induction', 'Fertility Counselling'],
          languages: ['English', 'Hindi', 'Marathi'],
        },
      };

      const profile = doctorProfiles[slug!] || doctorProfiles['dr-sachin-kulkarni'];
      setDoctor({ ...profile, slug });
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-teal-200 border-t-[#4E9FA3] rounded-full" /></div>;
  if (!doctor) return <div className="min-h-screen flex items-center justify-center text-gray-500">Doctor not found</div>;

  return (
    <>
      <SEOHead
        title={`${doctor.name} - ${doctor.designation} | IVFMedIndia`}
        description={`${doctor.name} — ${doctor.designation} at IVFMedIndia. ${doctor.experience_years}+ years experience. ${doctor.success_rate}% IVF success rate. ${doctor.qualifications}.`}
        canonicalPath={`/doctors/${slug}`}
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Doctors', url: `${SITE_URL}/doctors` }, { name: doctor.name, url: `${SITE_URL}/doctors/${slug}` }])}
      />

      <section className="py-14" style={{ background: 'linear-gradient(135deg,#0d1117 0%,#122b2d 50%,#1a1500 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link to="/doctors" className="hover:text-white transition-colors">Doctors</Link>
            <ChevronRight size={13} />
            <span className="text-white">{doctor.name}</span>
          </nav>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              {/* White-background photo — use contain with teal-tinted bg */}
              <div className="rounded-2xl overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-xs aspect-square"
                style={{ background: 'linear-gradient(160deg,#f0f9fa,#fdfbf0)' }}>
                <img src={doctor.profile_image} alt={doctor.name}
                  className="w-full h-full object-contain object-bottom" loading="eager" />
              </div>
            </div>
            <div className="md:col-span-2 text-white">
              <h1 className="text-4xl font-black mb-2">{doctor.name}</h1>
              <p className="text-xl font-bold mb-1" style={{ color: '#7DC4C8' }}>{doctor.designation}</p>
              <p className="text-white/70 text-lg mb-4">{doctor.specialization}</p>
              <p className="text-white/80 text-sm mb-5">{doctor.qualifications}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: '⭐', label: `${doctor.success_rate}% Success Rate` },
                  { icon: '👨‍👩‍👧', label: `${doctor.total_patients?.toLocaleString()}+ Patients` },
                  { icon: '🏆', label: `${doctor.experience_years}+ Years Experience` },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
                    <span>{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setAppointmentModal(true)} className="bg-white text-[#A67C00] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Calendar size={16} /> Book Appointment
                </button>
                <a href="tel:+918888888888" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-heading mb-4">About Dr. {doctor.name?.split(' ')[1]}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{doctor.bio}</div>
              </div>
              {Array.isArray(doctor.expertise) && doctor.expertise.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-4">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-3">
                    {doctor.expertise.map((e: string) => (
                      <span key={e} className="px-4 py-2 bg-teal-50 text-[#C9A227] rounded-full text-sm font-medium border border-teal-100">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                  <h3 className="font-semibold text-gray-800 mb-3">Book an Appointment</h3>
                  <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all w-full justify-center mb-3"><Calendar size={15} /> Book Now</button>
                  <a href="tel:+918888888888" className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all w-full justify-center"><Phone size={15} /> Call Now</a>
                </div>
                {Array.isArray(doctor.languages) && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                    <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((l: string) => <span key={l} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{l}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
