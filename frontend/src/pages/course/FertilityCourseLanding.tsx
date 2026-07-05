import { useState } from 'react';
import {
  Phone, Mail, Globe, CheckCircle, Calendar, Clock, Video,
  Award, BookOpen, Stethoscope, HeartPulse, ShieldCheck, Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SEOHead from '@/components/common/SEOHead';
import { leadApi } from '@/services/api';

const HERO_SLIDES = [
  '/images/IVF SLIDE 012 copy.jpg.jpeg',
  '/images/IVF SLIDE 023 copy.jpg.jpeg',
];

const FACULTY = [
  {
    name: 'Dr. Sachin Kulkarni',
    qualification: 'MBBS, MD, DGO, DNB (OBGYN), FICCG, FRM',
    points: [
      'Senior Consultant & Reproductive Medicine Specialist',
      'International Faculty in Reproductive Medicine & IVF',
      '20+ Years of Experience',
      'Teacher and Mentor',
    ],
    img: '/images/doctor1.png',
  },
  {
    name: 'Dr. Sharayu Mohite',
    qualification: 'MBBS, MD (OBGYN)',
    points: [
      'Fellowship in Reproductive Medicine',
      'Consultant Reproductive Medicine Specialist',
      'Jehangir Hospital, Pune',
      'Academic Faculty and Trainer',
    ],
    img: '/images/doctor2.jpeg',
  },
  {
    name: 'Dr. Hrishikesh Ashok Pandit',
    qualification: 'MBBS, MS (OBGY), FMAS',
    points: [
      'Consultant Obstetrician & Gynecologist',
      'Fellowship in Minimal Access Surgery',
      'Academic Faculty and Trainer',
    ],
    img: '/images/doctor3.jpeg',
    imgPosition: 'center 15%',
  },
  {
    name: 'Dr. Monika Hrishikesh Pandit',
    qualification: 'MBBS, DGO',
    points: [
      'Consultant Obstetrician & Gynecologist',
      'Fertility & Reproductive Health Specialist',
    ],
    img: '/images/doctor4.jpeg',
    imgPosition: 'center 15%',
  },
];

const HIGHLIGHTS = [
  { icon: BookOpen, label: 'Empowering GPs in Fertility Management' },
  { icon: HeartPulse, label: 'Complex Science Made Easy for Practice' },
  { icon: Stethoscope, label: '33 Years of Experienced Teachers' },
  { icon: Award, label: 'Guided by Highest Pregnancy IVF/IUI Success Rates' },
];

const SCHEDULE = [
  { date: '22 Jul 2026', topic: 'Infertility Evaluation in 2026' },
  { date: '29 Jul 2026', topic: 'PCOS Decoded' },
  { date: '05 Aug 2026', topic: 'Male Infertility' },
  { date: '12 Aug 2026', topic: 'Unexplained Repeated Pregnancy Loss' },
  { date: '19 Aug 2026', topic: 'IUI or IVF for Unexplained Infertility' },
  { date: '26 Aug 2026', topic: 'Holistic Care with Specialised Endometriosis / PCOS Clinics' },
  { date: '02 Sep 2026', topic: 'IVF Step-by-Step' },
  { date: '09 Sep 2026', topic: 'What Next After IVF Failure?' },
  { date: '16 Sep 2026', topic: 'Specialized Fertility Clinics' },
  { date: '23 Sep 2026', topic: 'Male & Female Sexual Dysfunction' },
];

const PRIMARY = 'linear-gradient(135deg,#7A7CF5 0%,#5454F0 60%,#3D3DD6 100%)';
const GREEN = '#6CC078';

function RegisterForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await leadApi.create({
        name: form.name,
        phone: form.phone,
        city: form.city || undefined,
        source: 'website',
        utm_campaign: 'fertility-course-2026',
        message: 'Course Registration: Advanced Certificate Course in Fertility Management (Jul-Sep 2026)',
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us at +91 9028290713.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#7A7CF5] focus:ring-2 focus:ring-[#5454F0]/30 transition-all backdrop-blur-sm';
  const labelCls = 'block text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5';

  return (
    <div className="relative rounded-3xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(84,84,240,0.35)', backdropFilter: 'blur(16px)' }}>
      <div className="px-6 sm:px-7 py-5 flex items-center gap-3" style={{ background: PRIMARY }}>
        <div className="w-10 h-10 bg-white/25 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Calendar size={20} className="text-[#14110a]" />
        </div>
        <div>
          <div className="text-[#14110a] font-black text-base sm:text-lg leading-tight">Register for Free</div>
          <div className="text-[#14110a]/80 text-xs">Limited seats · Certificate on completion</div>
        </div>
      </div>

      <div className={compact ? 'p-6 sm:p-7' : 'p-7'}>
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#7A7CF5' }} />
            <h3 className="text-xl font-black mb-2 text-white">Registration Received!</h3>
            <p className="text-gray-300 text-sm">Our team will contact you shortly with joining details for the course.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input className={inputCls} placeholder="Dr. Your Name" required
                value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Mobile *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl text-white/70 text-sm font-bold border border-r-0 border-white/20"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>+91</span>
                <input type="tel" required pattern="[6-9]\d{9}"
                  className="flex-1 bg-white/10 border border-white/20 rounded-r-xl px-3 py-3 text-base sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#7A7CF5] transition-all"
                  placeholder="98765 43210" value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className={labelCls}>City</label>
              <input className={inputCls} placeholder="Your city"
                value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full font-black py-4 rounded-2xl text-base text-[#14110a] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 hover:-translate-y-0.5"
              style={{ background: PRIMARY, boxShadow: '0 6px 24px rgba(84,84,240,0.4)' }}>
              <Calendar size={18} />
              {loading ? 'Submitting...' : 'Register Now — It\'s Free'}
            </button>
            <p className="text-center text-white/40 text-xs">🔒 100% confidential · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function FertilityCourseLanding() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #0a0e18 0%, #12122e 35%, #0a0e18 100%)' }}>
      <SEOHead
        title="Advanced Certificate Course in Fertility Management | Free Registration"
        description="Free 9-session online certificate course in Fertility Management for GPs, family physicians & gynecologists. Learn from Sunanda IVF Academy faculty. Jul-Sep 2026. Limited seats."
        canonicalUrl="https://workshop.ivfmedindia.com/"
        ogType="website"
        noIndex={false}
      />

      {/* Minimal header */}
      <header className="relative z-20 border-b" style={{ borderColor: 'rgba(240,120,36,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg px-3 h-12 sm:h-14 flex items-center">
              <img src="/images/sunanda_logo.jpeg" alt="Sunanda IVF" className="h-7 sm:h-8 w-auto object-contain" />
            </div>
            <div className="h-9 w-px bg-white/15" />
            <div className="bg-white rounded-lg px-3 h-12 sm:h-14 flex items-center">
              <img src="/images/Agoccare_logo.jpeg" alt="AGOC Care Pvt Ltd" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-white/60">
            <Users size={14} style={{ color: '#F07824' }} /> Sunanda IVF Academy & AGOC Care Pvt Ltd
          </div>
        </div>
      </header>

      {/* Hero image slider */}
      <section className="relative z-10">
        <style>{`
          .hero-slider .swiper-pagination-bullet { background: #ffffff; opacity: 0.5; }
          .hero-slider .swiper-pagination-bullet-active { background: #F07824; opacity: 1; }
          .hero-slider .swiper-button-next, .hero-slider .swiper-button-prev { color: #F07824; }
          .hero-slider .swiper-button-next:after, .hero-slider .swiper-button-prev:after { font-size: 22px; }
        `}</style>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="hero-slider"
        >
          {HERO_SLIDES.map((src) => (
            <SwiperSlide key={src}>
              <div className="w-full h-[100svh]">
                <img src={src} alt="Advanced Certificate Course in Fertility Management" className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Hero + Form (above the fold) */}
      <section className="relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #5454F0, transparent)' }} />
        <div className="absolute bottom-[-15%] right-[-5%] w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #F07824, transparent)' }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(135deg, #5454F0 0px, transparent 1px, transparent 60px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(84,84,240,0.15)', border: '1px solid rgba(84,84,240,0.4)', color: '#7A7CF5' }}>
                Registration Open Now
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5">
                Advanced Certificate Course
                <br />
                <span style={{ background: PRIMARY, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  in Fertility Management
                </span>
              </h1>

              <p className="text-base sm:text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">
                For General Practitioners, Family Physicians &amp; Gynecologists —
                a qualification you'll be proud to display, knowledge your patients will trust.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-10">
                {[
                  { icon: Calendar, label: 'July — Sep 2026' },
                  { icon: Clock, label: 'Every Wed | 4:00 PM' },
                  { icon: Video, label: '9 Online + 1 Offline Workshop' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <item.icon size={16} style={{ color: '#7A7CF5' }} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Faculty avatars strip */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex -space-x-3">
                  {FACULTY.map((f) => (
                    <img key={f.name} src={f.img} alt={f.name} loading="lazy"
                      className="w-11 h-11 rounded-full border-2 object-cover" style={{ borderColor: '#5454F0' }} />
                  ))}
                </div>
                <div>
                  <div className="font-black text-sm text-white">4 Expert Faculty Members</div>
                  <div className="text-xs text-gray-400">Sunanda IVF Academy · Jehangir Hospital, Pune</div>
                </div>
              </div>
            </motion.div>

            {/* Right: sticky registration form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 lg:sticky lg:top-6">
              <RegisterForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-center text-xl sm:text-2xl font-black mb-8">Why Learn From This Faculty?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-5 text-center flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              style={{ background: i % 2 === 0 ? 'linear-gradient(160deg,#7A7CF5,#5454F0)' : `linear-gradient(160deg,#8ED198,${GREEN})` }}>
              <h.icon size={30} className="text-[#14110a]" />
              <p className="text-xs sm:text-sm font-bold text-[#14110a] leading-snug">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Faculty */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-center text-xl sm:text-2xl font-black mb-2">Meet Your Faculty</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Organized by Sunanda IVF Academy &amp; AGOC Care Pvt Ltd</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY.map((f, i) => (
            <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-5 text-center transition-transform hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={f.img} alt={f.name}
                className="w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-full object-cover mx-auto mb-4 border-4"
                style={{ borderColor: '#5454F0', objectPosition: f.imgPosition || 'center' }} loading="lazy" />
              <h3 className="font-bold text-sm mb-1">{f.name}</h3>
              <p className="text-xs mb-3" style={{ color: '#7A7CF5' }}>{f.qualification}</p>
              <ul className="text-xs text-gray-300 space-y-1 text-left">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#7A7CF5' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-xl sm:text-2xl font-black mb-5">Course Schedule</h2>
            <div className="rounded-2xl overflow-x-auto border" style={{ borderColor: 'rgba(84,84,240,0.3)' }}>
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr style={{ background: 'rgba(84,84,240,0.15)' }}>
                    <th className="text-left px-4 py-3 font-bold" style={{ color: '#7A7CF5' }}>Date</th>
                    <th className="text-left px-4 py-3 font-bold" style={{ color: '#7A7CF5' }}>Session Topic</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((row, i) => (
                    <tr key={row.date} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                      <td className="px-4 py-3 whitespace-nowrap font-semibold text-white/90">{row.date}</td>
                      <td className="px-4 py-3 text-gray-300">{row.topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl p-7 h-full flex flex-col justify-center text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(84,84,240,0.35)' }}>
              <h3 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#7A7CF5' }}>FREE COURSE</h3>
              <div className="flex items-center justify-center gap-3 mb-4 text-gray-200 text-sm">
                <Video size={20} style={{ color: '#F07824' }} />
                9 Online Zoom Sessions + 1 Offline Grand Workshop
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-1">
                <ShieldCheck size={16} style={{ color: '#7A7CF5' }} /> Limited Seats
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <Award size={16} style={{ color: '#7A7CF5' }} /> Certificate Awarded Upon Completion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-4">Still deciding? Seats are limited.</h2>
        <p className="text-gray-300 mb-8">Scroll up and register in under a minute — our team will confirm your seat by phone.</p>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 font-black text-base px-8 py-4 rounded-2xl text-[#14110a] transition-transform hover:-translate-y-0.5"
          style={{ background: PRIMARY, boxShadow: '0 8px 30px rgba(84,84,240,0.4)' }}>
          Register Now
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <div className="font-bold">Sunanda IVF Academy | AGOC Care Pvt Ltd</div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="tel:+919028290713" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={14} /> +91 9028290713
            </a>
            <a href="mailto:agoccarepvtltd@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={14} /> agoccarepvtltd@gmail.com
            </a>
            <a href="https://www.sunandaivf.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe size={14} /> www.sunandaivf.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
