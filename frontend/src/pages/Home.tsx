import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import SEOHead from '@/components/common/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection';
import CommitmentSection from '@/components/home/CommitmentSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LocationsSection from '@/components/home/LocationsSection';
import JourneySection from '@/components/home/JourneySection';
import BlogSection from '@/components/home/BlogSection';
import ContactTrioSection from '@/components/home/ContactTrioSection';
import QuickAppointmentForm from '@/components/home/QuickAppointmentForm';
import { buildBreadcrumbSchema, organizationSchema, SITE_URL } from '@/utils/seo';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const faqItems = [
  { q: 'What is IVF?', a: 'IVF (In Vitro Fertilization) is an assisted reproductive technology where eggs are retrieved, fertilized in a lab, and the resulting embryo transferred to the uterus. IVF मार्गदर्शन achieves 65–70% success per cycle.' },
  { q: 'How much does IVF cost at IVF मार्गदर्शन?', a: 'IVF costs ₹80,000–₹1,50,000 per cycle including monitoring, egg retrieval, fertilisation and embryo transfer. Zero-cost EMI options are available.' },
  { q: 'How many IVF cycles are typically needed?', a: 'Most couples succeed within 2–3 cycles. Our cumulative success rate over 3 cycles exceeds 85%.' },
  { q: 'Is IVF treatment painful?', a: 'Most patients experience minimal discomfort. Injections cause mild soreness. Egg retrieval is under sedation. Embryo transfer is usually painless.' },
  { q: 'What is the IVF success rate at IVF मार्गदर्शन?', a: 'We maintain 65–70% clinical pregnancy rate per cycle — among the highest in India. Patients under 35 see rates up to 72%.' },
];

function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg,transparent,#C9A227)' }} />
            <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white" style={{ background: GG }}>FAQ</span>
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg,#C9A227,transparent)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Frequently Asked{' '}
            <span style={{ background: TG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
          </h2>
          <p className="text-gray-500">Everything you need to know about IVF and fertility treatment.</p>
        </motion.div>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <motion.details key={i}
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              className="group rounded-3xl overflow-hidden transition-all duration-300"
              style={{ border: '1px solid rgba(201,162,39,0.18)', background: 'linear-gradient(135deg,#fdfbf0,#fffef8)' }}>
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-gray-800 transition-colors list-none text-sm md:text-base hover:text-[#C9A227]">
                <span className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background: GG }}>{i + 1}</span>
                  {faq.q}
                </span>
                <span className="font-black text-xl ml-3 flex-shrink-0 group-open:rotate-45 transition-transform duration-200" style={{ color: '#C9A227' }}>+</span>
              </summary>
              <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed pt-3" style={{ borderTop: '1px solid rgba(201,162,39,0.15)' }}>{faq.a}</div>
            </motion.details>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-center mt-8">
          <Link to="/faq" className="inline-flex items-center gap-2 font-black text-sm px-7 py-3 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: '#4E9FA3', color: '#4E9FA3' }}>
            View All FAQs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const awards = ['NABH Accredited', 'ISO 9001:2015', 'Times Health Award 2023', 'Best IVF Centre 2023', 'Excellence in Patient Care'];
  return (
    <section ref={ref} className="py-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0d1117 0%,#122b2d 100%)', borderTop: '1px solid rgba(201,162,39,0.2)', borderBottom: '1px solid rgba(201,162,39,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src="/IVF LOGO.png" alt="IVF Logo" className="h-8 w-auto object-contain opacity-80" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Certified by</span>
          </div>
          {awards.map((a, i) => (
            <div key={a} className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: i % 2 === 0 ? '#E8C547' : '#7DC4C8' }}>
              <span style={{ color: i % 2 === 0 ? '#C9A227' : '#4E9FA3' }}>✦</span> {a}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEOHead
        title="IVF मार्गदर्शन — Best IVF Centre in India | 65–70% Success Rate"
        description="IVF मार्गदर्शन is India's leading IVF & fertility treatment centre with 65–70% success rates. World-class IVF, ICSI, IUI in Pune, Mumbai, Delhi, Bangalore, Hyderabad."
        keywords="IVF centre India, best IVF hospital, IVF treatment Pune, IVF treatment Mumbai, fertility specialist India, IVF success rate"
        canonicalPath="/"
        schema={[organizationSchema, buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }])]}
        ogTitle="IVF मार्गदर्शन — India's Most Trusted IVF & Fertility Centre"
        ogDescription="10,000+ families trust IVF मार्गदर्शन. 65–70% IVF success rate. NABH Accredited. 7 centres across India."
      />

      {/* 1. Hero with form */}
      <HeroSection />

      {/* 2. Awards strip */}
      <AwardsSection />

      {/* 3. Services icon grid — Sunanda style 5×2 */}
      <ServicesGrid />

      {/* 4. Why Choose Us — with image banner */}
      <WhyChooseUs />

      {/* 5. Stats counters — dark section */}
      <StatsSection />

      {/* 6. Our Commitment — with image collage + 100% metrics */}
      <CommitmentSection />

      {/* 7. Doctor cards */}
      <DoctorsSection />

      {/* 8. Patient Testimonials carousel */}
      <TestimonialsSection />

      {/* 9. IVF Journey steps */}
      <JourneySection />

      {/* 10. Locations — city cards */}
      <LocationsSection />

      {/* 11. FAQ */}
      <FAQSection />

      {/* 12. Blog section */}
      <BlogSection />

      {/* 13. Contact trio — Sunanda style 3 cards */}
      <ContactTrioSection />

      {/* 14. CTA Form */}
      <QuickAppointmentForm />
    </>
  );
}
