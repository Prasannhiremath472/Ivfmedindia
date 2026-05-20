import SEOHead from '@/components/common/SEOHead';
import { motion } from 'framer-motion';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

export default function OurStory() {
  return (
    <>
      <SEOHead title="Our Story | IVF मार्गदर्शन" description="The inspiring story of how IVF मार्गदर्शन was founded and grew to become India's most trusted fertility centre." canonicalPath="/our-story" />
      <section className="relative h-56 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1400&q=85" alt="Our Story" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-2">Our Story</h1>
          <p className="text-white/70">From a single clinic to India's most trusted fertility network</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 text-gray-600 leading-relaxed text-base">
            <p>IVF मार्गदर्शन was founded in 2009 by Dr. Priya Sharma and Dr. Rajesh Malhotra, driven by a vision to make world-class fertility care accessible to every Indian couple.</p>
            <p>What started as a single clinic in Pune has grown into a network of 7 state-of-the-art centres across 5 major Indian cities, serving thousands of families every year.</p>
            <p>Our founders experienced the emotional journey of fertility treatment personally and were determined to build a centre where couples feel genuinely supported — not just treated medically, but cared for holistically.</p>
          </div>

          {/* Milestones */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['2009','Founded'],['2012','1,000 babies born'],['2018','5 cities'],['2024','10,000+ families']].map(([year, event], i) => (
              <motion.div key={year} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5 text-center" style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)', border: `1px solid ${i % 2 === 0 ? 'rgba(201,162,39,0.2)' : 'rgba(78,159,163,0.2)'}` }}>
                <div className="text-2xl font-black mb-1" style={{ background: i % 2 === 0 ? GG : TG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{year}</div>
                <div className="text-gray-500 text-sm">{event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
