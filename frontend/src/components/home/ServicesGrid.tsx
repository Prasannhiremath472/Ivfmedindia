import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// Sunanda-style 10-service icon grid
const services = [
  { name: 'IVF',             slug: 'ivf-treatment',         icon: '🧬', color: '#4E9FA3', bg: '#f0f9fa' },
  { name: 'ICSI',            slug: 'icsi-treatment',        icon: '🔬', color: '#C9A227', bg: '#fdfbf0' },
  { name: 'IUI',             slug: 'iui-treatment',         icon: '💉', color: '#4E9FA3', bg: '#f0f9fa' },
  { name: 'Egg Freezing',    slug: 'egg-freezing',          icon: '❄️', color: '#3A7F83', bg: '#e8f8f8' },
  { name: 'PCOS',            slug: 'pcos-treatment',        icon: '🌸', color: '#C9A227', bg: '#fdfbf0' },
  { name: 'Genetic Testing', slug: 'genetic-testing',       icon: '🧪', color: '#4E9FA3', bg: '#f0f9fa' },
  { name: 'Male Infertility',slug: 'male-infertility',      icon: '👨', color: '#A67C00', bg: '#fdfbf0' },
  { name: 'Laparoscopy',     slug: 'endometriosis-treatment',icon: '🩺', color: '#3A7F83', bg: '#e8f8f8' },
  { name: 'Fertility Preservation', slug: 'fertility-preservation', icon: '🌿', color: '#C9A227', bg: '#fdfbf0' },
  { name: 'Donor Program',   slug: 'donor-program',         icon: '💝', color: '#4E9FA3', bg: '#f0f9fa' },
];

export default function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#4E9FA3]" />
            <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}>
              Our Services
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#4E9FA3]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Comprehensive Fertility{' '}
            <span style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Care
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">All fertility treatments under one roof — personalised to your unique needs</p>
        </motion.div>

        {/* 5-col × 2 row service icon grid — Sunanda style */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.slug}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: i * 0.05 }}>
              <Link to={`/treatments/${s.slug}`}
                className="group flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                style={{ background: s.bg, border: `1px solid ${s.color}20` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = s.color}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${s.color}20`}>
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{ background: 'white', boxShadow: `0 4px 12px ${s.color}25` }}>
                  {s.icon}
                </div>
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#4E9FA3] transition-colors leading-tight">{s.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
