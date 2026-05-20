import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { locationApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

export default function ClinicPage() {
  const { city, clinic } = useParams<{ city: string; clinic: string }>();
  const [location, setLocation] = useState<any>(null);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    locationApi.getBySlug(clinic!).then(r => setLocation(r.data.location)).catch(() => {
      setLocation({ name: `IVFMedIndia ${clinic?.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}`, city: city?.charAt(0).toUpperCase()+city!.slice(1), address: 'IVFMedIndia Clinic, Premium Location', phone: '+918888888888', hero_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80', description: 'Our state-of-the-art IVF centre provides world-class fertility treatment with a team of expert specialists.', map_embed_url: '', gallery: [] });
    });
  }, [clinic]);

  if (!location) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-teal-200 border-t-brand-600 rounded-full" /></div>;

  return (
    <>
      <SEOHead
        title={`${location.name} — IVF Centre | IVFMedIndia`}
        description={`${location.name} — World-class IVF & fertility treatment in ${location.city}. Expert specialists, advanced lab, personalized care.`}
        canonicalPath={`/ivf-centre/${city}/${clinic}`}
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: `IVF Centre ${location.city}`, url: `${SITE_URL}/ivf-centre/${city}` }, { name: location.name, url: `${SITE_URL}/ivf-centre/${city}/${clinic}` }])}
      />

      <section className="relative h-64 flex items-center overflow-hidden">
        <img src={location.hero_image} alt={location.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={13} />
            <Link to={`/ivf-centre/${city}`} className="hover:text-white">IVF Centre {location.city}</Link>
            <ChevronRight size={13} />
            <span className="text-white">{location.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">{location.name}</h1>
          <p className="text-white/80">{location.city}, India</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold font-heading mb-4">About This Centre</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{location.description}</p>

              {location.map_embed_url && (
                <div>
                  <h3 className="text-xl font-bold font-heading mb-4">Location Map</h3>
                  <div className="rounded-2xl overflow-hidden h-64 border border-gray-200">
                    <iframe src={location.map_embed_url} width="100%" height="100%" allowFullScreen loading="lazy" title="Clinic Location Map" />
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 sticky top-20">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Contact & Info</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 text-gray-600 text-sm">
                    <MapPin size={16} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                    {location.address}
                  </div>
                  {location.phone && (
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <Phone size={16} className="text-[#C9A227]" />
                      <a href={`tel:${location.phone}`} className="hover:text-[#C9A227]">{location.phone}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Clock size={16} className="text-[#C9A227]" />
                    Mon–Sat: 9:00 AM – 8:00 PM
                  </div>
                </div>
                <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all w-full justify-center mb-3">
                  Book Appointment
                </button>
                <a href={`tel:${location.phone || '+918888888888'}`} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all w-full justify-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
