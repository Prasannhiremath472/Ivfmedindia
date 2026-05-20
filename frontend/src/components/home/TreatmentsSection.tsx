import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const treatments = [
  { name: 'IVF Treatment',        slug: 'ivf-treatment',        icon: '🧬', desc: 'In Vitro Fertilization with 65–70% success rate using advanced personalised protocols.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80',  tag: '65–70% Success' },
  { name: 'ICSI Treatment',       slug: 'icsi-treatment',       icon: '🔬', desc: 'Intracytoplasmic Sperm Injection — gold standard for male infertility cases.',               image: 'https://images.unsplash.com/photo-1583912267557-f2b45680c599?w=500&q=80',  tag: 'Male Infertility' },
  { name: 'IUI Treatment',        slug: 'iui-treatment',        icon: '💉', desc: 'Intrauterine Insemination — simple, affordable, and effective first-line treatment.',          image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80',  tag: 'Affordable' },
  { name: 'Egg Freezing',         slug: 'egg-freezing',         icon: '❄️', desc: 'Preserve your fertility with world-class vitrification technology for future planning.',        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',  tag: 'Fertility Preservation' },
  { name: 'PCOS Treatment',       slug: 'pcos-treatment',       icon: '🌸', desc: 'Comprehensive PCOS management and fertility optimisation for successful conception.',           image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80',  tag: '60–70% Success' },
  { name: 'Male Infertility',     slug: 'male-infertility',     icon: '👨', desc: 'Advanced sperm analysis, TESA/PESA and complete male factor fertility solutions.',              image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80',  tag: 'Expert Care' },
  { name: 'Genetic Testing (PGT)',slug: 'genetic-testing',      icon: '🧪', desc: 'Preimplantation Genetic Testing selects the healthiest embryo to improve success rates.',      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80',  tag: '+30% Success' },
  { name: 'Fertility Preservation',slug: 'fertility-preservation',icon: '🌿', desc: 'Egg, sperm and embryo cryopreservation for cancer patients and planned future pregnancies.',  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80', tag: 'For Future' },
];

export default function TreatmentsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f9fa 0%, #ffffff 60%, #fdfbf0 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4E9FA3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#4E9FA3]" />
            <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #4E9FA3, #3A7F83)' }}>
              Fertility Services
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#4E9FA3]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Comprehensive{' '}
            <span style={{ background: 'linear-gradient(135deg, #E8C547, #C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Fertility Treatments
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every treatment personalised to your unique fertility profile — from basic assessments to advanced IVF.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {treatments.map((t, i) => (
            <motion.div key={t.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}>
              <Link to={`/treatments/${t.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-gold transition-all duration-300 hover:-translate-y-2 h-full"
                style={{ border: '1px solid rgba(201,162,39,0.12)' }}>
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.7) 0%, rgba(13,17,23,0.1) 100%)' }} />
                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg bg-white/95">
                    {t.icon}
                  </div>
                  {/* Tag */}
                  <div className="absolute top-3 right-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #E8C547, #C9A227)' }}>
                    {t.tag}
                  </div>
                  {/* Title over image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-black text-base leading-tight">{t.name}</h3>
                  </div>
                </div>
                {/* Body */}
                <div className="p-4">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{t.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm font-black group-hover:gap-3 transition-all duration-200"
                    style={{ color: '#4E9FA3' }}>
                    Learn More <ArrowRight size={14} />
                  </div>
                  {/* Animated underline */}
                  <div className="h-0.5 w-0 group-hover:w-full mt-3 rounded-full transition-all duration-500"
                    style={{ background: 'linear-gradient(90deg, #C9A227, #4E9FA3)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link to="/treatments/ivf-treatment"
            className="inline-flex items-center gap-2 font-black px-9 py-3.5 rounded-full text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: '#C9A227', color: '#C9A227' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#E8C547,#C9A227)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#C9A227'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A227'; }}>
            View All Treatments <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
