import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const G = '#C9A227'; const GL = '#E8C547'; const T = '#4E9FA3';
const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

export default function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { setAppointmentModal } = useAppStore();

  return (
    <>
      <SEOHead title="About IVF मार्गदर्शन — India's Leading IVF Fertility Centre" description="IVFMedIndia is India's most trusted IVF & fertility centre. 15+ years, 10,000+ families helped, 65–70% success rate. NABH accredited." canonicalPath="/about-us"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'About Us', url: `${SITE_URL}/about-us` }])} />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=85" alt="About" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.92) 0%,rgba(13,17,23,0.6) 55%,rgba(13,17,23,0.2) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border" style={{ background: `${G}20`, borderColor: `${G}40`, color: GL }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GL }} />About IVF मार्गदर्शन
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">About <span style={{ background: GG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IVF मार्गदर्शन</span></h1>
            <p className="text-white/75 text-lg">India's most trusted IVF & fertility centre — building families for 15+ years.</p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section ref={ref} className="py-20" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-10" style={{ background: `linear-gradient(90deg,transparent,${G})` }} />
                <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white" style={{ background: GG }}>Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">
                15+ Years of <span style={{ background: GG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Making Parenthood Dreams Reality</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">IVF मार्गदर्शन was founded with a single mission: to give every couple the best possible chance of parenthood. Since inception, we've helped over <strong style={{ color: G }}>10,000 families</strong> welcome their babies.</p>
              <p className="text-gray-600 leading-relaxed mb-7">Our team of 25+ fertility specialists, embryologists, and support staff work with one shared passion — turning the dream of parenthood into reality through world-class technology and deeply personalised care.</p>
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[['10,000+','Families Helped'],['68%','IVF Success Rate'],['25+','Expert Specialists'],['7+','Centres in India']].map(([val, label]) => (
                  <div key={label} className="rounded-2xl p-4 text-center" style={{ background: 'linear-gradient(135deg,#fdfbf0,#faf4d3)', border: '1px solid rgba(201,162,39,0.2)' }}>
                    <div className="text-2xl font-black" style={{ background: GG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div className="text-gray-500 text-sm">{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center gap-2 font-black px-8 py-3.5 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all" style={{ background: GG, boxShadow: '0 6px 24px rgba(201,162,39,0.4)' }}>
                Book Free Consultation <ArrowRight size={15} />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="grid grid-cols-2 gap-4">
              {['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80','https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80','https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80','https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80'].map((src, i) => (
                <img key={i} src={src} alt="IVFMedIndia" className={`rounded-2xl h-52 w-full object-cover shadow-lg ${i === 1 ? 'mt-8' : i === 2 ? '-mt-8' : ''}`} loading="lazy" />
              ))}
            </motion.div>
          </div>

          {/* Values */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Our Core <span style={{ background: TG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Excellence', desc: 'We constantly push boundaries to achieve the highest possible success rates using evidence-based protocols and latest technology.', gold: true },
              { icon: '💙', title: 'Compassion', desc: 'Fertility journeys are emotionally challenging. We provide genuine emotional support alongside expert medical care throughout your journey.', gold: false },
              { icon: '🏆', title: 'Integrity', desc: 'We are transparent about success rates, costs, and realistic expectations — helping you make fully informed decisions.', gold: true },
            ].map(({ icon, title, desc, gold }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
                className="rounded-3xl p-7 text-center group hover:-translate-y-1 transition-all duration-300"
                style={{ background: gold ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)', border: `1px solid ${gold ? 'rgba(201,162,39,0.2)' : 'rgba(78,159,163,0.2)'}` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: gold ? GG : TG }}>
                  {icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
