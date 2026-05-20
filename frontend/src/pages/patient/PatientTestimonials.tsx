import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { testimonialApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const fallback = [
  { id: 1, patient_name: 'Sneha & Rohit Patel', patient_city: 'Pune', patient_image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&q=80', rating: 5, testimonial: 'After 5 years of trying and 2 failed cycles at other clinics, IVFMedIndia was our miracle. Dr. Priya Sharma\'s personalized approach made all the difference. We now have beautiful twin girls!', treatment_name: 'IVF Treatment' },
  { id: 2, patient_name: 'Kavita & Arun Mehta', patient_city: 'Mumbai', patient_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&q=80', rating: 5, testimonial: 'I was diagnosed with severe PCOS and was told IVF was our only option. Dr. Anjali Desai was incredibly patient, explained everything, and designed a protocol specifically for me. We conceived on our second cycle!', treatment_name: 'IVF with PCOS' },
  { id: 3, patient_name: 'Preethi & Karthik Iyer', patient_city: 'Bangalore', patient_image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&q=80', rating: 5, testimonial: 'We had 4 failed IVF cycles before IVFMedIndia. The PGT (genetic testing) they recommended identified embryo issues that previous clinics missed. With a chromosomally normal embryo, we finally had our son!', treatment_name: 'IVF with PGT' },
  { id: 4, patient_name: 'Nisha & Deepak Sharma', patient_city: 'Delhi', patient_image: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=200&q=80', rating: 5, testimonial: 'We chose IVFMedIndia based on success rates. IUI worked for us on the second attempt. The entire team — from the receptionist to the lab staff — was incredibly supportive.', treatment_name: 'IUI Treatment' },
  { id: 5, patient_name: 'Ananya & Suresh Kumar', patient_city: 'Hyderabad', patient_image: 'https://images.unsplash.com/photo-1520810627419-35e592be37b2?w=200&q=80', rating: 5, testimonial: 'After 8 years of marriage, IVFMedIndia Hyderabad gave us our daughter. Dr. Meera was exceptional. We will be forever grateful to the entire team.', treatment_name: 'IVF Treatment' },
  { id: 6, patient_name: 'Ritu & Vivek Joshi', patient_city: 'Pune', patient_image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=200&q=80', rating: 5, testimonial: 'My husband had zero sperm count. IVFMedIndia\'s TESA + ICSI procedure was our last hope. Now our baby boy just turned 1! Dr. Rajesh Malhotra is the best andrologist in India.', treatment_name: 'ICSI with TESA' },
];

export default function PatientTestimonials() {
  const [testimonials, setTestimonials] = useState(fallback);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    testimonialApi.getAll({ limit: 20 }).then(r => { if (r.data.data?.length) setTestimonials(r.data.data); }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Patient Testimonials — Real IVF Success Stories | IVFMedIndia"
        description="Read real testimonials from IVFMedIndia patients. 10,000+ families share their IVF success stories and fertility journey experiences."
        keywords="IVF patient testimonials, IVF success stories, fertility treatment reviews, IVFMedIndia reviews"
        canonicalPath="/patient-testimonials"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Patient Testimonials', url: `${SITE_URL}/patient-testimonials` }])}
      />

      <section className="relative h-56 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1400&q=80" alt="Patient Testimonials" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Patient Testimonials</h1>
          <p className="text-white/80 text-lg">Real stories from real families who trusted IVFMedIndia</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 h-full flex flex-col relative overflow-hidden">
                  <Quote size={50} className="absolute -top-2 -right-2 text-teal-100" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className={j < (t.rating || 5) ? 'text-gold-400 fill-gold-400' : 'text-gray-300'} />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 italic mb-5">"{t.testimonial}"</p>
                  <div>
                    <div className="text-xs text-[#C9A227] font-semibold mb-2">{t.treatment_name}</div>
                    <div className="flex items-center gap-3">
                      <img src={t.patient_image || 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=100&q=80'} alt={t.patient_name} className="w-11 h-11 rounded-full object-cover border-2 border-teal-100" loading="lazy" />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{t.patient_name}</div>
                        <div className="text-gray-500 text-xs">{t.patient_city}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all">
              Begin Your Success Story
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
