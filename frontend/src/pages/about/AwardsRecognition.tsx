import SEOHead from '@/components/common/SEOHead';
import { motion } from 'framer-motion';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const awards = [
  { year: '2024', title: 'NABH Accreditation',            org: 'National Accreditation Board for Hospitals', icon: '🏆', gold: true },
  { year: '2023', title: 'Best IVF Centre of the Year',   org: 'Times Health Awards',                       icon: '🥇', gold: false },
  { year: '2023', title: 'ISO 9001:2015 Certification',   org: 'Bureau Veritas India',                      icon: '✅', gold: true },
  { year: '2023', title: 'Excellence in Patient Care',    org: 'IMA (Indian Medical Association)',           icon: '💙', gold: false },
  { year: '2022', title: 'Best Fertility Hospital – Pune', org: 'Healthcare Excellence Awards',              icon: '🌟', gold: true },
  { year: '2022', title: 'Top IVF Centre in India',       org: 'India Health Report',                       icon: '🏅', gold: false },
  { year: '2021', title: 'Innovation in Reproductive Medicine', org: 'National Fertility Society',          icon: '⚗️', gold: true },
  { year: '2020', title: '10,000 Babies Milestone',       org: 'IVF मार्गदर्शन Achievement',               icon: '👶', gold: false },
];

export default function AwardsRecognition() {
  return (
    <>
      <SEOHead title="Awards & Recognition | IVF मार्गदर्शन" description="IVF मार्गदर्शन's awards — NABH accredited, ISO certified, Times Health Award winning IVF centre." canonicalPath="/awards-and-recognition" />

      <section className="relative h-56 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1400&q=85" alt="Awards" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-1">Awards & Recognition</h1>
          <p className="text-white/70">Excellence recognised by India's leading healthcare bodies</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg,transparent,#C9A227)` }} />
              <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white" style={{ background: GG }}>Our Achievements</span>
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg,#C9A227,transparent)` }} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Recognized for{' '}
              <span style={{ background: TG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-3xl p-6 text-center group hover:-translate-y-2 transition-all duration-300"
                style={{
                  background: a.gold ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)',
                  border: a.gold ? '1px solid rgba(201,162,39,0.25)' : '1px solid rgba(78,159,163,0.25)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}>
                <div className="text-4xl mb-3">{a.icon}</div>
                <div className="text-sm font-black mb-2" style={{ color: a.gold ? '#C9A227' : '#4E9FA3' }}>{a.year}</div>
                <h3 className="font-black text-gray-900 text-sm mb-1 leading-snug">{a.title}</h3>
                <p className="text-gray-400 text-xs leading-snug">{a.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
