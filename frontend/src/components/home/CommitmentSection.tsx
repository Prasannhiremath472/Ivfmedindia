import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight } from 'lucide-react';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

export default function CommitmentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { setAppointmentModal } = useAppStore();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0d1117 0%,#122b2d 50%,#1a1500 100%)' }}>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left: Image collage */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80" alt="IVF Lab" className="rounded-2xl h-48 w-full object-cover" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80" alt="Doctor" className="rounded-2xl h-48 w-full object-cover mt-8" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80" alt="Specialist" className="rounded-2xl h-48 w-full object-cover -mt-8" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=500&q=80" alt="Family" className="rounded-2xl h-48 w-full object-cover" loading="lazy" />
            </div>
            {/* Gold badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-2xl"
              style={{ background: GG, minWidth: 240 }}>
              <div className="text-center">
                <div className="text-white font-black text-2xl leading-none">68%</div>
                <div className="text-white/80 text-xs">IVF Success Rate</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <div className="text-white font-black text-2xl leading-none">10K+</div>
                <div className="text-white/80 text-xs">Happy Families</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white" style={{ background: TG }}>Our Commitment</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
              Our Commitment to{' '}
              <span style={{ background: GG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Your Parenthood
              </span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              At IVF मार्गदर्शन, we combine world-class technology with deeply personalised care. Every couple gets a tailored treatment protocol — because no two fertility journeys are the same.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm">
              We believe in complete transparency — in our success rates, costs, and realistic expectations. Your trust is our biggest responsibility, and we honour it every day.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { pct: '100%', label: 'Standards', color: '#C9A227' },
                { pct: '100%', label: 'Quality',   color: '#4E9FA3' },
                { pct: '100%', label: 'Transparency', color: '#C9A227' },
              ].map(m => (
                <div key={m.label} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.25)' }}>
                  <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.pct}</div>
                  <div className="text-gray-400 text-xs">{m.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setAppointmentModal(true)}
              className="inline-flex items-center gap-2 font-black px-8 py-3.5 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: GG, boxShadow: '0 6px 24px rgba(201,162,39,0.4)' }}>
              Make an Appointment <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
