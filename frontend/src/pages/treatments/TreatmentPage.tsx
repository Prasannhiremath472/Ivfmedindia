import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone, ChevronRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { useAppStore } from '@/store/useAppStore';
import { buildBreadcrumbSchema, buildFAQSchema, SITE_URL } from '@/utils/seo';

const GOLD = '#C9A227';
const GOLD_LIGHT = '#E8C547';
const TEAL = '#4E9FA3';
const GOLD_GRAD = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TEAL_GRAD = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const treatmentData: Record<string, any> = {
  'ivf-treatment': {
    title: 'IVF Treatment', shortDesc: "In Vitro Fertilization — India's most successful fertility treatment with 65–70% success rate.",
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=85',
    successRate: '65–70%', costMin: 80000, costMax: 150000, duration: '4–6 weeks/cycle',
    description: "IVF (In Vitro Fertilization) is an assisted reproductive technology where eggs are retrieved from a woman's ovaries and fertilized with sperm in our state-of-the-art laboratory. The resulting embryo is then transferred into the uterus. At IVF मार्गदर्शन, we use the latest protocols and world-class embryology labs to achieve the highest possible success rates.",
    causes: ['Blocked or damaged fallopian tubes','Ovulation disorders (PCOS, POI)','Severe male infertility','Endometriosis','Unexplained infertility','Genetic conditions requiring PGT'],
    steps: [
      { title: 'Initial Consultation & Tests', desc: 'Comprehensive fertility assessment including hormone tests, ultrasound, and semen analysis.' },
      { title: 'Ovarian Stimulation', desc: 'Daily hormone injections for 10–14 days to stimulate multiple egg production.' },
      { title: 'Egg Retrieval', desc: 'Minor surgical procedure under sedation to retrieve mature eggs from ovaries.' },
      { title: 'Fertilization in Lab', desc: 'Eggs fertilized with sperm in our advanced embryology laboratory.' },
      { title: 'Embryo Development', desc: 'Embryos cultured 3–5 days with continuous time-lapse monitoring.' },
      { title: 'Embryo Transfer', desc: 'Best quality embryo carefully transferred to the uterus — painless procedure.' },
      { title: 'Pregnancy Test', desc: 'Blood test 14 days after transfer confirms pregnancy.' },
    ],
    benefits: ['Highest success rates of all fertility treatments','Works for multiple causes of infertility','Enables genetic testing (PGT)','Allows embryo freezing for future use','Personalised protocols for every patient'],
    faqs: [
      { q: 'How long does IVF take?', a: 'An IVF cycle typically takes 4–6 weeks from start of stimulation to pregnancy test.' },
      { q: 'What is the IVF success rate at IVF मार्गदर्शन?', a: 'We achieve 65–70% clinical pregnancy rate per cycle — among the highest in India.' },
      { q: 'How many cycles do I need?', a: 'Most patients succeed within 2–3 cycles. Cumulative success over 3 cycles exceeds 85%.' },
      { q: 'Is IVF painful?', a: 'Minimal discomfort. Injections cause mild soreness. Egg retrieval is under sedation. Transfer is painless.' },
    ],
  },
  'icsi-treatment': {
    title: 'ICSI Treatment', shortDesc: 'Intracytoplasmic Sperm Injection — gold standard for male infertility with 60–65% success.',
    heroImage: 'https://images.unsplash.com/photo-1583912267557-f2b45680c599?w=1400&q=85',
    successRate: '60–65%', costMin: 90000, costMax: 160000, duration: '4–6 weeks/cycle',
    description: 'ICSI involves injecting a single sperm directly into each egg. It is the gold standard treatment for male infertility, overcoming low sperm count, poor motility, and abnormal morphology.',
    causes: ['Severe oligospermia','Asthenospermia','Azoospermia','Previous failed IVF fertilization','Anti-sperm antibodies'],
    steps: [
      { title: 'Ovarian Stimulation', desc: 'Hormone injections to stimulate multiple egg production.' },
      { title: 'Egg Retrieval', desc: 'Eggs retrieved under ultrasound guidance.' },
      { title: 'Sperm Preparation', desc: 'Sperm collected or retrieved surgically (TESA/PESA).' },
      { title: 'ICSI Procedure', desc: 'Single healthy sperm injected directly into each mature egg using micromanipulator.' },
      { title: 'Embryo Culture', desc: 'Fertilized eggs cultured 3–5 days.' },
      { title: 'Embryo Transfer', desc: 'Best embryo transferred to uterus.' },
      { title: 'Pregnancy Test', desc: 'Blood test 14 days post-transfer.' },
    ],
    benefits: ['Overcomes severe male infertility','Works with surgically retrieved sperm','High fertilization rates','Allows PGT genetic testing'],
    faqs: [
      { q: 'Difference between IVF and ICSI?', a: 'In IVF sperm and eggs are mixed. In ICSI a single sperm is injected into each egg. ICSI is for male infertility.' },
      { q: 'ICSI cost at IVF मार्गदर्शन?', a: '₹90,000–₹1,60,000 per cycle. Zero-cost EMI available.' },
    ],
  },
  'iui-treatment': {
    title: 'IUI Treatment', shortDesc: 'Intrauterine Insemination — simple, affordable first-line fertility treatment.',
    heroImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=85',
    successRate: '15–20%', costMin: 8000, costMax: 25000, duration: '2–3 weeks/cycle',
    description: 'IUI places prepared sperm directly into the uterus around ovulation. Less invasive and more affordable than IVF — a popular first-line option.',
    causes: ['Unexplained infertility','Mild male infertility','Cervical factor infertility','Use of donor sperm'],
    steps: [
      { title: 'Cycle Monitoring', desc: 'Ultrasound to track follicle growth and predict ovulation.' },
      { title: 'Trigger Injection', desc: 'HCG injection to trigger final egg maturation.' },
      { title: 'Sperm Washing', desc: 'Sperm processed to select most motile.' },
      { title: 'Insemination', desc: 'Prepared sperm placed directly into uterus via thin catheter — 2–3 minutes.' },
      { title: 'Luteal Support', desc: 'Progesterone supplements to support implantation.' },
      { title: 'Pregnancy Test', desc: 'Blood test 14 days after IUI.' },
    ],
    benefits: ['Simple outpatient procedure','Much more affordable than IVF','Minimal risk and discomfort','Option with donor sperm'],
    faqs: [
      { q: 'How many IUI cycles before IVF?', a: 'Most doctors recommend 3–4 IUI cycles before moving to IVF.' },
      { q: 'IUI success rate?', a: '15–20% per cycle. Cumulative over 4 cycles: 40–50%.' },
    ],
  },
};

const getDefault = (slug: string) => ({
  title: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  shortDesc: `Comprehensive ${slug.replace(/-/g, ' ')} treatment at IVF मार्गदर्शन.`,
  heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85',
  successRate: 'Varies', costMin: 20000, costMax: 200000, duration: '2–8 weeks',
  description: `Our specialists provide comprehensive ${slug.replace(/-/g, ' ')} with personalised protocols and compassionate care.`,
  causes: [], steps: [], benefits: [], faqs: [{ q: `What is ${slug.replace(/-/g, ' ')}?`, a: 'Our specialists will explain everything in detail during your free consultation.' }],
});

export default function TreatmentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { setAppointmentModal } = useAppStore();
  const data = treatmentData[slug!] || getDefault(slug!);

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Treatments', url: `${SITE_URL}/treatments` },
    { name: data.title, url: `${SITE_URL}/treatments/${slug}` },
  ]);
  const faqSchema = data.faqs.length ? buildFAQSchema(data.faqs.map((f: any) => ({ question: f.q, answer: f.a }))) : null;

  const relatedTreatments = [
    { name: 'IVF Treatment', slug: 'ivf-treatment' },
    { name: 'ICSI Treatment', slug: 'icsi-treatment' },
    { name: 'IUI Treatment', slug: 'iui-treatment' },
    { name: 'Egg Freezing', slug: 'egg-freezing' },
    { name: 'PCOS Treatment', slug: 'pcos-treatment' },
  ].filter(t => t.slug !== slug).slice(0, 4);

  return (
    <>
      <SEOHead
        title={`${data.title} in India — Cost & Success Rate | IVF मार्गदर्शन`}
        description={`${data.shortDesc} ${data.successRate} success rate. Cost ₹${(data.costMin / 1000).toFixed(0)}K–₹${(data.costMax / 1000).toFixed(0)}K.`}
        canonicalPath={`/treatments/${slug}`}
        schema={faqSchema ? [breadcrumb, faqSchema] : [breadcrumb]}
        ogImage={data.heroImage}
      />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] flex items-end overflow-hidden">
        <img src={data.heroImage} alt={data.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.65) 55%, rgba(13,17,23,0.3) 100%)' }} />
        {/* Gold left bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GOLD_GRAD }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="hover:text-white transition-colors cursor-pointer">Treatments</span>
            <ChevronRight size={13} />
            <span className="text-white">{data.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border"
              style={{ background: `${GOLD}25`, borderColor: `${GOLD}50`, color: GOLD_LIGHT }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_LIGHT }} />
              Fertility Treatment
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-2xl leading-tight">{data.title}</h1>
            <p className="text-white/80 text-lg max-w-xl mb-6">{data.shortDesc}</p>
            <div className="flex flex-wrap gap-3 mb-7">
              {[
                { label: 'Success Rate', value: data.successRate },
                { label: 'Cost', value: `₹${(data.costMin / 1000).toFixed(0)}K–₹${(data.costMax / 1000).toFixed(0)}K` },
                { label: 'Duration', value: data.duration },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
                  style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <span style={{ color: GOLD_LIGHT }} className="font-black">{s.value}</span>
                  <span className="text-white/50">{s.label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setAppointmentModal(true, slug)}
              className="inline-flex items-center gap-2 font-black px-8 py-3.5 rounded-full text-white text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: GOLD_GRAD, boxShadow: '0 6px 24px rgba(201,162,39,0.45)' }}>
              <Phone size={16} /> Book Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 rounded-full" style={{ background: GOLD_GRAD }} />
                <h2 className="text-2xl font-black text-gray-900">What is {data.title}?</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">{data.description}</p>
            </section>

            {/* Steps */}
            {data.steps.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full" style={{ background: TEAL_GRAD }} />
                  <h2 className="text-2xl font-black text-gray-900">The {data.title} Process</h2>
                </div>
                <div className="space-y-4">
                  {data.steps.map((step: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-x-1"
                      style={{ background: 'linear-gradient(135deg,#fdfbf0,#fffef8)', border: '1px solid rgba(201,162,39,0.15)' }}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-sm"
                        style={{ background: i % 2 === 0 ? GOLD_GRAD : TEAL_GRAD }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-500 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Causes + Benefits */}
            {(data.causes.length > 0 || data.benefits.length > 0) && (
              <div className="grid md:grid-cols-2 gap-8">
                {data.causes.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 rounded-full" style={{ background: GOLD_GRAD }} />
                      <h2 className="text-xl font-black text-gray-900">Who Needs This?</h2>
                    </div>
                    <ul className="space-y-2.5">
                      {data.causes.map((c: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                          <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} /> {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {data.benefits.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 rounded-full" style={{ background: TEAL_GRAD }} />
                      <h2 className="text-xl font-black text-gray-900">Benefits</h2>
                    </div>
                    <ul className="space-y-2.5">
                      {data.benefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                          <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: TEAL }} /> {b}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full" style={{ background: GOLD_GRAD }} />
                  <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  {data.faqs.map((faq: any, i: number) => (
                    <details key={i} className="group rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(201,162,39,0.2)', background: 'linear-gradient(135deg,#fdfbf0,#fffef8)' }}>
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-bold text-gray-800 hover:text-[#C9A227] transition-colors list-none text-sm">
                        <span className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                            style={{ background: GOLD_GRAD }}>{i + 1}</span>
                          {faq.q}
                        </span>
                        <span className="font-black text-xl ml-3 flex-shrink-0 group-open:rotate-45 transition-transform" style={{ color: GOLD }}>+</span>
                      </summary>
                      <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed pt-3"
                        style={{ borderTop: '1px solid rgba(201,162,39,0.15)' }}>{faq.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Book now card */}
              <div className="rounded-3xl overflow-hidden shadow-gold"
                style={{ background: 'linear-gradient(135deg,#0d1117,#122b2d)', border: '1px solid rgba(201,162,39,0.25)' }}>
                <div className="px-6 py-4" style={{ background: GOLD_GRAD }}>
                  <div className="flex items-center gap-2.5">
                    <img src="/IVF LOGO.png" alt="Logo" className="h-9 w-auto object-contain" />
                    <div>
                      <div className="text-white font-black text-sm leading-none">Book Free Consultation</div>
                      <div className="text-white/75 text-xs mt-0.5">No charges · Expert advice</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <button onClick={() => setAppointmentModal(true, slug)}
                    className="w-full font-black py-3 rounded-2xl text-white text-sm hover:-translate-y-0.5 transition-all"
                    style={{ background: GOLD_GRAD, boxShadow: '0 4px 16px rgba(201,162,39,0.35)' }}>
                    Book Appointment
                  </button>
                  <a href="tel:+918888888888"
                    className="w-full font-black py-3 rounded-2xl text-sm border-2 flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                    style={{ borderColor: TEAL, color: '#7DC4C8' }}>
                    <Phone size={14} /> Call Now
                  </a>
                </div>
              </div>

              {/* Stats card */}
              <div className="rounded-3xl p-5" style={{ background: 'linear-gradient(135deg,#fdfbf0,#f0f9fa)', border: '1px solid rgba(201,162,39,0.15)' }}>
                <h3 className="font-black text-gray-900 mb-4 text-sm">Treatment Overview</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Success Rate', value: data.successRate, icon: '📊' },
                    { label: 'Cost per Cycle', value: `₹${(data.costMin / 1000).toFixed(0)}K+`, icon: '💰' },
                    { label: 'Duration', value: data.duration, icon: '⏱' },
                    { label: 'Experience', value: '15+ Years', icon: '🏆' },
                    { label: 'Happy Families', value: '10,000+', icon: '👨‍👩‍👧' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">{item.icon} {item.label}</span>
                      <span className="font-black text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related treatments */}
              <div className="rounded-3xl p-5" style={{ border: '1px solid rgba(78,159,163,0.2)', background: 'white' }}>
                <h3 className="font-black text-gray-900 mb-4 text-sm">Related Treatments</h3>
                <div className="space-y-1">
                  {relatedTreatments.map(t => (
                    <Link key={t.slug} to={`/treatments/${t.slug}`}
                      className="flex items-center justify-between text-sm py-2.5 border-b last:border-0 hover:text-[#C9A227] transition-colors font-medium text-gray-600"
                      style={{ borderColor: 'rgba(201,162,39,0.1)' }}>
                      {t.name} <ArrowRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
