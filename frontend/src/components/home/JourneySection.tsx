import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight } from 'lucide-react';

const stages = [
  {
    id: 'planning', emoji: '🌱',
    title: 'Planning a Family', subtitle: "You're ready to start",
    desc: 'Get a complete fertility health check, understand your options, and create a personalised roadmap to parenthood with our expert specialists.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=85',
    accentGold: true,
  },
  {
    id: 'trying', emoji: '💪',
    title: 'Trying to Conceive', subtitle: "Let's find out why",
    desc: "If you've been trying for over 12 months, a full fertility investigation identifies exactly what's needed for success.",
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85',
    accentGold: false,
  },
  {
    id: 'struggling', emoji: '🤝',
    title: 'Facing Challenges', subtitle: 'You are not alone',
    desc: "If previous treatments haven't worked, our specialists use advanced diagnostics and protocols to find and solve underlying causes.",
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85',
    accentGold: true,
  },
  {
    id: 'preserving', emoji: '❄️',
    title: 'Fertility Preservation', subtitle: 'Plan for the future',
    desc: 'Freeze your eggs, sperm or embryos today with our world-class vitrification technology for a planned future pregnancy.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85',
    accentGold: false,
  },
];

const steps = [
  { n: 1, icon: '🩺', title: 'Consultation' },
  { n: 2, icon: '🔬', title: 'Testing' },
  { n: 3, icon: '📋', title: 'Protocol' },
  { n: 4, icon: '💉', title: 'Stimulation' },
  { n: 5, icon: '🥚', title: 'Egg Retrieval' },
  { n: 6, icon: '🧬', title: 'Fertilisation' },
  { n: 7, icon: '🌱', title: 'Transfer' },
];

export default function JourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { setAppointmentModal } = useAppStore();
  const [active, setActive] = useState(0);

  const stage = stages[active];
  const accent = stage.accentGold ? '#C9A227' : '#4E9FA3';
  const accentLight = stage.accentGold ? '#E8C547' : '#7DC4C8';
  const accentGrad = stage.accentGold
    ? 'linear-gradient(135deg, #E8C547 0%, #C9A227 100%)'
    : 'linear-gradient(135deg, #7DC4C8 0%, #4E9FA3 100%)';

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4E9FA3 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #C9A227, #A67C00)' }}>
              Your Journey
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            We're With You at{' '}
            <span style={{ background: 'linear-gradient(135deg, #7DC4C8, #4E9FA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Every Stage
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Tell us where you are — we'll guide you to the right next step.</p>
        </motion.div>

        {/* Stage tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-10">
          {stages.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-all duration-200 hover:-translate-y-0.5"
              style={active === i ? {
                background: s.accentGold ? 'linear-gradient(135deg,#E8C547,#C9A227)' : 'linear-gradient(135deg,#7DC4C8,#4E9FA3)',
                color: '#fff',
                boxShadow: s.accentGold ? '0 4px 20px rgba(201,162,39,0.4)' : '0 4px 20px rgba(78,159,163,0.4)',
              } : { background: '#f8fafc', color: '#6b7280', border: '1px solid #e5e7eb' }}>
              <span>{s.emoji}</span> {s.title}
            </button>
          ))}
        </motion.div>

        {/* Active stage card */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="rounded-3xl overflow-hidden grid md:grid-cols-2 mb-16 shadow-xl"
          style={{ border: `2px solid ${accent}30` }}>
          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />
            {/* Stage emoji */}
            <div className="absolute top-6 left-6 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-xl bg-white/95">
              {stage.emoji}
            </div>
          </div>
          {/* Content */}
          <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>{stage.subtitle}</div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">{stage.title}</h3>
            <p className="text-gray-500 leading-relaxed mb-8">{stage.desc}</p>
            <button onClick={() => setAppointmentModal(true)}
              className="inline-flex items-center gap-2 font-black px-8 py-3.5 rounded-full text-sm text-white w-fit shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: accentGrad }}>
              Talk to a Specialist <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>

        {/* IVF Process steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <h3 className="text-2xl font-black text-gray-900 text-center mb-10">
            The IVF Process —{' '}
            <span style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Step by Step
            </span>
          </h3>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[7%] right-[7%] h-0.5 pointer-events-none rounded-full"
              style={{ background: 'linear-gradient(90deg, #E8C547, #C9A227, #4E9FA3, #C9A227, #E8C547)' }} />

            <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-2">
              {steps.map((step, i) => (
                <motion.div key={step.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex flex-col items-center text-center group cursor-default">
                  <div className="relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center text-2xl mb-3 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-gold bg-white"
                    style={{ border: '2px solid rgba(201,162,39,0.25)', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                    {step.icon}
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-md"
                      style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#E8C547,#C9A227)' : 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}>
                      {step.n}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-600 leading-tight group-hover:text-[#C9A227] transition-colors">{step.title}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button onClick={() => setAppointmentModal(true)}
              className="inline-flex items-center gap-2 font-black px-10 py-4 rounded-full text-base text-white shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #E8C547 0%, #C9A227 60%, #A67C00 100%)' }}>
              Start My IVF Journey Today <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
