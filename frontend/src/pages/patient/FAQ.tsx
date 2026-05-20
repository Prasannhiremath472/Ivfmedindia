import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '@/components/common/SEOHead';
import { faqApi } from '@/services/api';
import { buildBreadcrumbSchema, buildFAQSchema, SITE_URL } from '@/utils/seo';
import { useAppStore } from '@/store/useAppStore';

const fallbackFAQs = [
  { id: 1, question: 'What is IVF?', answer: 'IVF (In Vitro Fertilization) is an assisted reproductive technology where eggs are fertilized by sperm outside the body in a laboratory. The resulting embryo is then transferred into the uterus.' },
  { id: 2, question: 'What is the cost of IVF at IVFMedIndia?', answer: 'IVF at IVFMedIndia costs ₹80,000 – ₹1,50,000 per cycle. This includes consultation, monitoring, egg retrieval, fertilization, and embryo transfer. Zero-cost EMI options are available.' },
  { id: 3, question: 'How many IVF cycles are needed?', answer: 'Most couples achieve success within 2-3 IVF cycles. Our cumulative success rate over 3 cycles is over 85%. Each case is unique and our specialists will recommend the best protocol.' },
  { id: 4, question: 'What is the IVF success rate at IVFMedIndia?', answer: 'IVFMedIndia maintains a clinical pregnancy rate of 65-70% per cycle — among the highest in India. Couples below 35 have success rates up to 72%.' },
  { id: 5, question: 'How long does an IVF cycle take?', answer: 'An IVF cycle typically takes 4-6 weeks from the start of stimulation to pregnancy test.' },
  { id: 6, question: 'Is IVF treatment painful?', answer: 'Most patients experience minimal discomfort. Injections may cause mild soreness. Egg retrieval is done under sedation. Embryo transfer is generally painless.' },
  { id: 7, question: 'What is the difference between IVF and ICSI?', answer: 'In IVF, sperm and eggs are mixed together. In ICSI (Intracytoplasmic Sperm Injection), a single sperm is directly injected into each egg. ICSI is recommended for male infertility.' },
  { id: 8, question: 'What are the age limits for IVF?', answer: 'IVFMedIndia treats patients up to age 50 (with donor eggs). Natural IVF success is highest below age 35. Our doctors assess each case individually.' },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(fallbackFAQs);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    faqApi.getAll({ featured: true }).then(r => { if (r.data.faqs?.length) setFaqs(r.data.faqs); }).catch(() => {});
  }, []);

  const faqSchema = buildFAQSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <SEOHead
        title="IVF FAQ — Frequently Asked Questions | IVFMedIndia"
        description="Get answers to common questions about IVF, ICSI, IUI, fertility treatments, costs, success rates, and more at IVFMedIndia."
        keywords="IVF FAQ, IVF questions, IVF cost FAQ, fertility treatment questions, IVF success rate"
        canonicalPath="/faq"
        schema={[buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'FAQ', url: `${SITE_URL}/faq` }]), faqSchema]}
      />
      <section className="relative h-48 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80" alt="FAQ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading">Frequently Asked Questions</h1>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details key={faq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="group bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="text-[#C9A227] text-xl group-open:rotate-45 transition-transform ml-3 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{faq.answer}</div>
              </motion.details>
            ))}
          </div>
          <div className="text-center mt-10 p-8 bg-teal-50 rounded-2xl border border-teal-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our fertility counselors are happy to answer any questions you have — completely free.</p>
            <button onClick={() => setAppointmentModal(true)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all">Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}
