import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { locationApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const cityInfo: Record<string, { name: string; image: string; desc: string }> = {
  pune:      { name: 'Pune', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1400&q=80', desc: '3 IVF centres across Pune — Baner, Kharadi, and Hinjewadi.' },
  mumbai:    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1400&q=80', desc: 'IVFMedIndia Andheri — serving Mumbai\'s fertility needs.' },
  delhi:     { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=80', desc: 'IVFMedIndia South Delhi — world-class fertility care in the capital.' },
  bangalore: { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1400&q=80', desc: 'IVFMedIndia Koramangala — serving Bangalore\'s growing fertility community.' },
  hyderabad: { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&q=80', desc: 'IVFMedIndia Banjara Hills — premium fertility care in Hyderabad.' },
};

const fallbackLocations = [
  { id: 1, name: 'IVFMedIndia Baner, Pune', slug: 'pune-baner', city: 'Pune', address: 'Kasturi Plaza, Baner Road, Baner, Pune', phone: '+918888888801', hero_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
  { id: 2, name: 'IVFMedIndia Kharadi, Pune', slug: 'pune-kharadi', city: 'Pune', address: 'Zenith Business Park, Kharadi, Pune', phone: '+918888888802', hero_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
];

export default function CityPage() {
  const { city } = useParams<{ city: string }>();
  const [locations, setLocations] = useState(fallbackLocations);
  const { setAppointmentModal } = useAppStore();
  const info = cityInfo[city!] || { name: city?.charAt(0).toUpperCase() + city!.slice(1), image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80', desc: `IVFMedIndia fertility centres in ${city}.` };

  useEffect(() => {
    locationApi.getByCity(city!).then(r => { if (r.data.locations?.length) setLocations(r.data.locations); }).catch(() => {});
  }, [city]);

  return (
    <>
      <SEOHead
        title={`IVF Centre ${info.name} — Best Fertility Hospital | IVFMedIndia`}
        description={`IVFMedIndia ${info.name} — World-class IVF & fertility treatment. 65-70% success rate. ${info.desc}`}
        keywords={`IVF centre ${info.name}, IVF hospital ${info.name}, best fertility clinic ${info.name}, IVFMedIndia ${info.name}`}
        canonicalPath={`/ivf-centre/${city}`}
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: `IVF Centre ${info.name}`, url: `${SITE_URL}/ivf-centre/${city}` }])}
      />

      <section className="relative h-64 flex items-center overflow-hidden">
        <img src={info.image} alt={`IVF Centre ${info.name}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">IVF Centre {info.name}</h1>
          <p className="text-white/80 text-lg">{info.desc}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-black px-4 py-1.5 rounded-full text-white mb-4">📍 Our Centres</span>
            <h2 className="text-3xl font-bold font-heading mb-3">IVFMedIndia Centres in <span className="text-[#C9A227]">{info.name}</span></h2>
            <p className="text-gray-600 max-w-xl mx-auto">State-of-the-art fertility clinics with expert specialists, advanced labs, and personalized care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc, i) => (
              <motion.div key={loc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <div className="h-48 overflow-hidden">
                    <img src={loc.hero_image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80'} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{loc.name}</h3>
                    <div className="flex items-start gap-2 text-gray-500 text-sm mb-2">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C9A227]" /> {loc.address}
                    </div>
                    {loc.phone && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Phone size={14} className="text-[#C9A227]" />
                        <a href={`tel:${loc.phone}`} className="hover:text-[#C9A227]">{loc.phone}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Clock size={14} className="text-[#C9A227]" /> Mon–Sat: 9AM–8PM
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/ivf-centre/${city}/${loc.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all text-sm py-2 justify-center">
                        View Centre <ArrowRight size={13} />
                      </Link>
                      <button onClick={() => setAppointmentModal(true)} className="flex-1 inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2 justify-center">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
