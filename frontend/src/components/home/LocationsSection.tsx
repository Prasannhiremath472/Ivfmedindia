import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { CITIES } from '@/utils/constants';

const cityData: Record<string, { image: string; clinics: number; phone: string; highlight: string }> = {
  pune:      { image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=85', clinics: 3, phone: '+91 8888 888 801', highlight: '3 Centres' },
  mumbai:    { image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=85', clinics: 1, phone: '+91 8888 888 804', highlight: 'Andheri West' },
  delhi:     { image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=85', clinics: 1, phone: '+91 8888 888 805', highlight: 'South Delhi' },
  bangalore: { image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=85', clinics: 1, phone: '+91 8888 888 806', highlight: 'Koramangala' },
  hyderabad: { image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=85', clinics: 1, phone: '+91 8888 888 807', highlight: 'Banjara Hills' },
};

export default function LocationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdfbf0 0%, #f0f9fa 100%)' }}>

      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#4E9FA3]" />
            <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
              style={{ background: 'linear-gradient(135deg,#4E9FA3,#3A7F83)' }}>
              Our Centres
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#4E9FA3]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            IVF मार्गदर्शन{' '}
            <span style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Across India
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            7 state-of-the-art fertility centres in 5 cities — world-class care close to home.
          </p>
        </motion.div>

        {/* City grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          {CITIES.map((city, i) => {
            const d = cityData[city.slug];
            return (
              <motion.div key={city.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link to={`/ivf-centre/${city.slug}`}
                  className="group block relative rounded-3xl overflow-hidden h-60 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold"
                  style={{ border: '2px solid rgba(201,162,39,0.12)' }}>
                  {/* Image */}
                  <img src={d.image} alt={`IVF ${city.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />

                  {/* Dark gradient */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.2) 60%, transparent 100%)' }} />

                  {/* Gold badge top */}
                  <div className="absolute top-3 right-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md"
                    style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)' }}>
                    {d.highlight}
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 text-white font-black text-base mb-0.5">
                      <MapPin size={13} style={{ color: '#E8C547' }} /> {city.name}
                    </div>
                    <div className="text-gray-300 text-xs mb-2">{d.clinics} Centre{d.clinics > 1 ? 's' : ''}</div>
                    <div className="flex items-center gap-1 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: '#E8C547' }}>
                      View Centre <ArrowRight size={11} />
                    </div>
                  </div>

                  {/* Gold border glow on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 2px #C9A227' }} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #0d1117 0%, #122b2d 100%)' }}>

          {/* Gold dots pattern */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '28px 28px' }} />

          {/* Left gold bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
            style={{ background: 'linear-gradient(180deg,#E8C547,#C9A227,#A67C00)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#E8C547' }}>
                ✦ Can't find a centre near you?
              </div>
              <h3 className="text-2xl font-black text-white mb-1">
                We Offer Video Consultations
              </h3>
              <p className="text-gray-400 text-sm">Talk to our fertility specialists from anywhere in India — free of charge.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="tel:+918888888888"
                className="flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm shadow-gold hover:shadow-gold-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', color: '#fff' }}>
                <Phone size={15} /> Call Now
              </a>
              <Link to="/contact-us"
                className="flex items-center justify-center gap-2 border-2 font-black px-7 py-3 rounded-full text-sm transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: '#4E9FA3', color: '#7DC4C8' }}>
                Find Nearest Centre <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
