import SEOHead from '@/components/common/SEOHead';
import { Play } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const videos = [
  { id: 1, title: 'Sneha & Rohit — Twin IVF Success Story', thumbnail: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80', city: 'Pune', treatment: 'IVF' },
  { id: 2, title: 'Kavita — Conquering PCOS with IVF', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', city: 'Mumbai', treatment: 'IVF+PCOS' },
  { id: 3, title: 'Preethi & Karthik — Success After 4 Failed Cycles', thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80', city: 'Bangalore', treatment: 'IVF+PGT' },
  { id: 4, title: 'Ananya — 8 Years, Then Our Baby', thumbnail: 'https://images.unsplash.com/photo-1520810627419-35e592be37b2?w=600&q=80', city: 'Hyderabad', treatment: 'IVF' },
  { id: 5, title: 'Ritu & Vivek — ICSI Success Story', thumbnail: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&q=80', city: 'Pune', treatment: 'ICSI' },
  { id: 6, title: 'Nisha — IUI Works! Our Little Girl', thumbnail: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=600&q=80', city: 'Delhi', treatment: 'IUI' },
];

export default function VideoTestimonials() {
  const { setAppointmentModal } = useAppStore();
  return (
    <>
      <SEOHead title="Video Testimonials — IVF Success Stories | IVFMedIndia" description="Watch real patient video testimonials and IVF success stories from IVFMedIndia families." canonicalPath="/video-testimonials" />
      <section className="relative h-56 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1400&q=80" alt="Video Testimonials" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Video Testimonials</h1>
          <p className="text-white/80 text-lg">Watch real families share their IVFMedIndia journey</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play size={20} className="text-[#C9A227] ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#4E9FA3] text-white text-xs px-2.5 py-1 rounded-full font-medium">{v.treatment}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-[#C9A227] transition-colors">{v.title}</h3>
                  <p className="text-gray-500 text-xs">📍 {v.city}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all">Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}
