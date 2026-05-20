import SEOHead from '@/components/common/SEOHead';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

export default function MissionVision() {
  return (
    <>
      <SEOHead title="Mission & Vision | IVF मार्गदर्शन" description="IVF मार्गदर्शन's mission is to make world-class fertility care accessible to every couple in India." canonicalPath="/mission-vision" />

      <section className="relative h-52 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=85" alt="Mission" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-1">Mission & Vision</h1>
          <p className="text-white/70">Our purpose, direction and values</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Target, title: 'Our Mission', color: 'gold', content: 'To provide every couple with compassionate, evidence-based, and affordable fertility care — giving them the best possible chance of parenthood through world-class technology and individualised treatment.' },
              { Icon: Eye,    title: 'Our Vision',  color: 'teal', content: 'To be the most trusted fertility partner for families across India, setting global benchmarks in IVF success rates, patient experience, and ethical medical practice.' },
              { Icon: Heart,  title: 'Our Values',  color: 'gold', content: 'Excellence in clinical outcomes. Compassionate care throughout. Transparency in pricing and success rates. Continuous innovation. Patient-first approach in everything we do.' },
            ].map(({ Icon, title, color, content }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl p-7 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: color === 'gold' ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)',
                  border: color === 'gold' ? '1px solid rgba(201,162,39,0.2)' : '1px solid rgba(78,159,163,0.2)',
                  borderTop: `3px solid ${color === 'gold' ? '#C9A227' : '#4E9FA3'}`,
                }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: color === 'gold' ? GG : TG }}>
                  <Icon size={22} color="white" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
