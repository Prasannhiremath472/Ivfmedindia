import SEOHead from '@/components/common/SEOHead';
import { motion } from 'framer-motion';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const techs = [
  { title: 'Time-Lapse Embryo Incubators', desc: 'EmbryoScope® technology continuously monitors embryo development without disturbing the culture environment.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80', gold: true },
  { title: 'Preimplantation Genetic Testing (PGT)', desc: 'Advanced chromosomal screening of embryos to identify healthy embryos — improving success rates by 30%.', image: 'https://images.unsplash.com/photo-1583912267557-f2b45680c599?w=600&q=80', gold: false },
  { title: 'Vitrification (Flash Freezing)', desc: 'Rapid freezing technology for eggs, sperm, and embryos with 98%+ survival rates — gold standard cryopreservation.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', gold: true },
  { title: 'Laser Assisted Hatching', desc: 'Precision laser technology to assist embryo hatching and improve implantation rates in selected cases.', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80', gold: false },
  { title: 'Sperm DNA Fragmentation Testing', desc: 'Advanced sperm quality analysis to identify DNA damage that may cause IVF failure or miscarriage.', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80', gold: true },
  { title: 'ERA (Endometrial Receptivity Array)', desc: 'Genomic test to identify the personalised window of implantation — significantly improving FET success.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', gold: false },
];

export default function TechnologyLabs() {
  return (
    <>
      <SEOHead title="Technology & Labs | IVF मार्गदर्शन" description="IVF मार्गदर्शन's state-of-the-art embryology labs feature time-lapse incubators, PGT, vitrification and more." canonicalPath="/technology-and-labs" />

      <section className="relative h-56 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=85" alt="Technology" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: TG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-1">Technology & Labs</h1>
          <p className="text-white/70">World-class embryology technology for the best outcomes</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(180deg,#f0f9fa 0%,#fff 40%,#fdfbf0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg,transparent,#4E9FA3)` }} />
              <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white" style={{ background: TG }}>Our Technology</span>
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg,#4E9FA3,transparent)` }} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              State-of-the-Art{' '}
              <span style={{ background: GG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Embryology Lab</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-3">Our laboratory technology matches the best IVF labs in Europe and the USA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techs.map((tech, i) => (
              <motion.div key={tech.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                style={{ border: `1px solid ${tech.gold ? 'rgba(201,162,39,0.2)' : 'rgba(78,159,163,0.2)'}`, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <div className="h-44 overflow-hidden relative">
                  <img src={tech.image} alt={tech.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-20 transition-opacity" style={{ background: tech.gold ? GG : TG }} />
                </div>
                <div className="h-1" style={{ background: tech.gold ? GG : TG }} />
                <div className="p-5 bg-white">
                  <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#C9A227] transition-colors">{tech.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
