import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 10000, suffix: '+', label: 'IVF Pregnancies',     icon: '👶', color: '#E8C547' },
  { value: 68,    suffix: '%', label: 'IVF Success Rate',    icon: '📊', color: '#C9A227' },
  { value: 7,     suffix: '+', label: 'Centres Across India',icon: '🏥', color: '#E8C547' },
  { value: 25,    suffix: '+', label: 'Expert Specialists',   icon: '👩‍⚕️', color: '#C9A227' },
  { value: 15,    suffix: '+', label: 'Years of Excellence',  icon: '🏆', color: '#E8C547' },
  { value: 5000,  suffix: '+', label: 'IVF Cycles / Year',   icon: '🔬', color: '#C9A227' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1117 0%, #122b2d 50%, #1a1500 100%)' }}>

      {/* Gold shimmer lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C9A227 0px, transparent 1px, transparent 80px)', backgroundSize: '80px 100%' }} />
      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4E9FA3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <img src="/IVF LOGO.png" alt="IVF Logo" className="h-10 w-auto object-contain opacity-90" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            Numbers That{' '}
            <span style={{ background: 'linear-gradient(135deg, #E8C547, #C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Speak for Themselves
            </span>
          </h2>
          <p className="text-gray-400 text-base">India's most trusted IVF centre — proven by results</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative rounded-3xl overflow-hidden text-center px-4 py-7 hover:-translate-y-2 transition-all duration-300 cursor-default"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.2)', backdropFilter: 'blur(8px)' }}>

              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(78,159,163,0.10) 100%)' }} />

              <div className="relative z-10">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-3xl font-black leading-none mb-1" style={{ color: s.color }}>
                  {inView ? <CountUp end={s.value} duration={2.5} separator="," /> : '0'}{s.suffix}
                </div>
                <div className="text-gray-400 text-xs font-medium leading-tight mt-1">{s.label}</div>
              </div>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #E8C547, #4E9FA3)' }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom logo strip */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="mt-10 pt-8 border-t flex flex-wrap items-center justify-center gap-6 md:gap-10"
          style={{ borderColor: 'rgba(201,162,39,0.2)' }}>
          {['NABH Accredited', 'ISO 9001:2015', 'Times Health Award 2023', 'Best IVF Centre', '15+ Years Excellence'].map(a => (
            <div key={a} className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#E8C547' }}>
              <span style={{ color: '#C9A227' }}>✦</span> {a}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
