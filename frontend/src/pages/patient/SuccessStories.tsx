import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '@/components/common/SEOHead';
import { contactApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const fallback = [
  { id: 1, couple_name: 'Rahul & Sunita Verma', city: 'Pune', short_story: 'After 7 years of waiting and 3 failed cycles elsewhere, IVFMedIndia gave us our miracle baby girl through IVF. Dr. Priya\'s personalized approach made all the difference.', treatment_name: 'IVF Treatment', years_of_struggle: 7, success_year: 2023, couple_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', baby_image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=80' },
  { id: 2, couple_name: 'Arjun & Pooja Kulkarni', city: 'Mumbai', short_story: 'We were told we could never conceive due to azoospermia. IVFMedIndia\'s TESA+ICSI procedure gave us our baby boy. Dr. Rajesh is the best andrologist we\'ve ever met.', treatment_name: 'ICSI with TESA', years_of_struggle: 5, success_year: 2023, couple_image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&q=80', baby_image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=80' },
  { id: 3, couple_name: 'Suresh & Lakshmi Rao', city: 'Hyderabad', short_story: 'A decade of infertility. Three miscarriages. Then IVFMedIndia\'s team discovered and treated my uterine issues. Today our twins fill our home with endless joy.', treatment_name: 'IVF with PGT', years_of_struggle: 10, success_year: 2024, couple_image: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=400&q=80', baby_image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=80' },
];

export default function SuccessStories() {
  const [stories, setStories] = useState(fallback);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    contactApi.getSuccessStories().then(r => { if (r.data.stories?.length) setStories(r.data.stories); }).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="IVF Success Stories — Real Patient Journeys | IVFMedIndia"
        description="Read inspiring IVF success stories from IVFMedIndia patients. Real couples who overcame infertility to achieve their dream of parenthood."
        canonicalPath="/success-stories"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Success Stories', url: `${SITE_URL}/success-stories` }])}
      />
      <section className="relative h-56 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1400&q=80" alt="Success Stories" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Success Stories</h1>
          <p className="text-white/80 text-lg">Real couples. Real struggles. Real miracles.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {stories.map((story, i) => (
              <motion.div key={story.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 md:p-8 flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                  <div className="flex-shrink-0 relative">
                    <img src={story.couple_image} alt={story.couple_name} className="w-48 h-48 rounded-2xl object-cover shadow-card" loading="lazy" />
                    <img src={story.baby_image} alt="Baby" className="w-16 h-16 rounded-full object-cover absolute -bottom-3 -right-3 border-4 border-white shadow-lg" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎉</span>
                      <span className="text-[#C9A227] font-semibold text-sm">{story.treatment_name} · {story.success_year}</span>
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-gray-800 mb-1">{story.couple_name}</h2>
                    <p className="text-gray-500 text-sm mb-3">📍 {story.city} · {story.years_of_struggle} years of struggle</p>
                    <p className="text-gray-600 leading-relaxed mb-4">"{story.short_story}"</p>
                    <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm">
                      Begin Your Story →
                    </button>
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
