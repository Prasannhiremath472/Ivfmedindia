import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight } from 'lucide-react';

const reasons = [
  {
    icon: '🔬',
    title: 'State-of-the-Art Lab',
    desc: 'Time-lapse incubators, advanced embryology, and cutting-edge reproductive technology.',
    stat: '99%',
    statLabel: 'Lab Success',
    color: 'from-[#4E9FA3] to-[#3A7F83]',
    lightColor: 'from-teal-50 to-teal-100',
    borderColor: '#4E9FA3',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  },
  {
    icon: '📊',
    title: 'Highest Success Rates',
    desc: '65–70% IVF success rate per cycle — the highest in India, with full transparency.',
    stat: '70%',
    statLabel: 'Success Rate',
    color: 'from-[#C9A227] to-[#A67C00]',
    lightColor: 'from-gold-50 to-gold-100',
    borderColor: '#C9A227',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    featured: true,
  },
  {
    icon: '👩‍⚕️',
    title: '25+ Expert Specialists',
    desc: 'Internationally trained fertility doctors, embryologists and support staff.',
    stat: '25+',
    statLabel: 'Specialists',
    color: 'from-[#4E9FA3] to-[#3A7F83]',
    lightColor: 'from-teal-50 to-teal-100',
    borderColor: '#4E9FA3',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
  },
  {
    icon: '💙',
    title: 'Personalised Protocols',
    desc: 'Every patient gets a customised treatment plan — no one-size-fits-all approach.',
    stat: '100%',
    statLabel: 'Personalised',
    color: 'from-[#C9A227] to-[#A67C00]',
    lightColor: 'from-gold-50 to-gold-100',
    borderColor: '#C9A227',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
  },
  {
    icon: '🏆',
    title: 'NABH Accredited',
    desc: 'All centres meet the highest national standards for quality and patient safety.',
    stat: '7+',
    statLabel: 'Accredited Centres',
    color: 'from-[#4E9FA3] to-[#3A7F83]',
    lightColor: 'from-teal-50 to-teal-100',
    borderColor: '#4E9FA3',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  },
  {
    icon: '💰',
    title: 'Affordable EMI Plans',
    desc: 'Zero-cost EMI and insurance options so finances never stand in the way of parenthood.',
    stat: '0%',
    statLabel: 'EMI Interest',
    color: 'from-[#C9A227] to-[#A67C00]',
    lightColor: 'from-gold-50 to-gold-100',
    borderColor: '#C9A227',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { setAppointmentModal } = useAppStore();

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4E9FA3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <span className="bg-gradient-to-r from-[#C9A227] to-[#A67C00] text-white text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Our Advantage
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
            Why Choose{' '}
            <span style={{
              background: 'linear-gradient(135deg, #E8C547 0%, #C9A227 50%, #A67C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              IVF मार्गदर्शन?
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            International protocols. Expert specialists. Personalised care.
            We give you every advantage on your path to parenthood.
          </p>
        </motion.div>

        {/* ── Main banner card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-10 h-[300px] md:h-[360px] shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85"
            alt="IVF Lab"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Gold to transparent overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.7) 55%, rgba(13,17,23,0.15) 100%)' }} />

          {/* Decorative gold border left */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
            style={{ background: 'linear-gradient(180deg, #E8C547 0%, #C9A227 50%, #A67C00 100%)' }} />

          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8C547] animate-pulse" />
              <span className="text-[#E8C547] text-xs font-bold uppercase tracking-widest">NABH Accredited · ISO Certified</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight max-w-xl">
              India's Most Trusted<br />
              <span style={{ color: '#E8C547' }}>IVF Centre</span>
            </h3>
            <p className="text-white/75 text-base max-w-md leading-relaxed mb-6">
              Trusted by 10,000+ families. Backed by science. Driven by compassion.
              We've been turning dreams into reality for 15+ years.
            </p>
            <button
              onClick={() => setAppointmentModal(true)}
              className="inline-flex items-center gap-2 text-sm font-black px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-fit hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #E8C547 0%, #C9A227 100%)', color: '#fff' }}
            >
              Book Free Consultation <ArrowRight size={15} />
            </button>
          </div>

          {/* Floating stats on the right side of banner */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
            {[
              { val: '10K+', label: 'Happy Families' },
              { val: '68%',  label: 'Success Rate' },
              { val: '15+',  label: 'Years of Excellence' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center min-w-[120px]">
                <div className="font-black text-xl" style={{ color: '#E8C547' }}>{s.val}</div>
                <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 6 feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.07 }}
              className={`group relative rounded-3xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 ${r.featured ? 'ring-2 ring-[#C9A227] shadow-gold-lg' : 'shadow-card hover:shadow-card-hover'}`}
              style={{ border: r.featured ? undefined : `1px solid ${r.borderColor}20` }}
            >
              {/* Card image background */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient over image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-80 group-hover:opacity-70 transition-opacity`}
                />

                {/* Stat on image */}
                <div className="absolute top-4 right-4 bg-white/95 rounded-2xl px-3.5 py-2 text-center shadow-lg">
                  <div className="font-black text-lg leading-none text-gray-900">{r.stat}</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">{r.statLabel}</div>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {r.icon}
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white p-5">
                <h3 className="font-black text-gray-900 text-base mb-1.5 group-hover:text-[#C9A227] transition-colors duration-200">
                  {r.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{r.desc}</p>

                {/* Bottom accent line */}
                <div
                  className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${r.borderColor}, transparent)` }}
                />
              </div>

              {/* Featured ribbon */}
              {r.featured && (
                <div
                  className="absolute top-3 left-0 text-white text-[10px] font-black px-4 py-1 rounded-r-full shadow-md uppercase tracking-widest"
                  style={{ background: 'linear-gradient(90deg, #E8C547, #C9A227)' }}
                >
                  ★ Most Popular
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#C9A227]/20"
          style={{ background: 'linear-gradient(135deg, #fdfbf0 0%, #f0f9fa 100%)' }}
        >
          <div className="text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#C9A227' }}>
              Ready to Start?
            </div>
            <h4 className="text-xl font-black text-gray-900 mb-1">
              Take the First Step Towards Parenthood
            </h4>
            <p className="text-gray-500 text-sm">
              Free consultation · No obligation · Expert advice from day one
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => setAppointmentModal(true)}
              className="font-black px-7 py-3 rounded-full text-sm shadow-gold hover:shadow-gold-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #E8C547 0%, #C9A227 100%)', color: '#fff' }}
            >
              Book Free Consultation <ArrowRight size={14} />
            </button>
            <a
              href="tel:+918888888888"
              className="font-black px-7 py-3 rounded-full text-sm border-2 transition-all duration-200 flex items-center gap-2"
              style={{ borderColor: '#4E9FA3', color: '#4E9FA3' }}
            >
              📞 Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
