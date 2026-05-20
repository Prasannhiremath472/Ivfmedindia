import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonialApi } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';
import { ArrowRight } from 'lucide-react';

const fallback = [
  { id: 1, patient_name: 'Sneha & Rohit Patel',    patient_city: 'Pune',      patient_image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&q=80', rating: 5, short_testimonial: 'After 5 years and 2 failed cycles elsewhere, IVFMedIndia gave us our twin babies! Dr. Priya Sharma\'s personalised approach made all the difference.', treatment_name: 'IVF Treatment' },
  { id: 2, patient_name: 'Kavita & Arun Mehta',    patient_city: 'Mumbai',    patient_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80', rating: 5, short_testimonial: 'PCOS was not a barrier — Dr. Anjali made our dream come true! Exceptional personalised care throughout the entire journey.', treatment_name: 'IVF with PCOS' },
  { id: 3, patient_name: 'Preethi & Karthik Iyer', patient_city: 'Bangalore', patient_image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&q=80', rating: 5, short_testimonial: 'PGT at IVFMedIndia identified what 4 previous cycles at other clinics missed entirely. Our son is perfectly healthy!', treatment_name: 'IVF with PGT' },
  { id: 4, patient_name: 'Nisha & Deepak Sharma',  patient_city: 'Delhi',     patient_image: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=200&q=80', rating: 5, short_testimonial: 'Successful IUI on the second attempt. The entire team from reception to lab was incredibly supportive and professional.', treatment_name: 'IUI Treatment' },
  { id: 5, patient_name: 'Ritu & Vivek Joshi',     patient_city: 'Hyderabad', patient_image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=200&q=80', rating: 5, short_testimonial: 'Zero sperm count — declared impossible. IVFMedIndia\'s ICSI+TESA procedure gave us our baby boy. A true miracle!', treatment_name: 'ICSI with TESA' },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [testimonials, setTestimonials] = useState(fallback);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    testimonialApi.getFeatured().then(r => { if (r.data.data?.length) setTestimonials(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f9fa 0%, #fdfbf0 100%)' }}>

      {/* Decorative quote marks */}
      <div className="absolute top-12 left-8 text-[200px] font-black leading-none opacity-[0.04] pointer-events-none select-none"
        style={{ color: '#C9A227' }}>"</div>
      <div className="absolute bottom-12 right-8 text-[200px] font-black leading-none opacity-[0.04] pointer-events-none select-none"
        style={{ color: '#4E9FA3', transform: 'rotate(180deg)' }}>"</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
              style={{ background: 'linear-gradient(135deg,#C9A227,#A67C00)' }}>
              Patient Stories
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Real Families.{' '}
            <span style={{ background: 'linear-gradient(135deg,#7DC4C8,#4E9FA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Real Happiness.
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            10,000+ families trusted IVFMedIndia. Here are their stories.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  className="group relative bg-white rounded-3xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-gold"
                  style={{ border: '1px solid rgba(201,162,39,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>

                  {/* Top gold accent bar */}
                  <div className="h-1.5 w-full" style={{ background: i % 2 === 0 ? 'linear-gradient(90deg,#E8C547,#C9A227)' : 'linear-gradient(90deg,#7DC4C8,#4E9FA3)' }} />

                  <div className="p-6">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-[#C9A227] text-[#C9A227]" />
                      ))}
                      <span className="ml-auto text-xs font-bold text-gray-400">{t.treatment_name}</span>
                    </div>

                    {/* Quote icon */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)' }}>
                      <Quote size={16} style={{ color: i % 2 === 0 ? '#C9A227' : '#4E9FA3' }} />
                    </div>

                    {/* Testimonial */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic flex-1">
                      "{t.short_testimonial}"
                    </p>

                    {/* Patient info */}
                    <div className="flex items-center gap-3 pt-4 border-t"
                      style={{ borderColor: i % 2 === 0 ? 'rgba(201,162,39,0.15)' : 'rgba(78,159,163,0.15)' }}>
                      <div className="relative flex-shrink-0">
                        <img src={t.patient_image} alt={t.patient_name}
                          className="w-12 h-12 rounded-2xl object-cover" loading="lazy" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] shadow-md"
                          style={{ background: i % 2 === 0 ? 'linear-gradient(135deg,#E8C547,#C9A227)' : 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}>✓</div>
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm">{t.patient_name}</div>
                        <div className="text-gray-400 text-xs">📍 {t.patient_city}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="text-center">
          <button onClick={() => setAppointmentModal(true)}
            className="inline-flex items-center gap-2 font-black px-10 py-4 rounded-full text-base text-white shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)' }}>
            Begin Your Success Story <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
