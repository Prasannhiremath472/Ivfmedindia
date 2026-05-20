import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { leadApi } from '@/services/api';
import { CITIES, TREATMENTS, PHONE, WHATSAPP } from '@/utils/constants';

// ─── Slide data ────────────────────────────────────────────────────────────────
const slides = [
  {
    showLogo: true,                          // ← logo slide
    badge: 'Advanced Fertility Science',
    heading: ['World-Class IVF', 'Technology,', 'Personalised for You'],
    highlightLine: 1,
    sub: 'From IVF and ICSI to egg freezing — the complete spectrum of fertility treatments under one roof.',
    bg: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&q=90',
    accent: '#C9A227',   // gold
  },
  {
    showLogo: false,
    badge: '65–70% IVF Success Rate',
    heading: ['Your Dream of', 'Parenthood', 'Starts Here'],
    highlightLine: 1,
    sub: "India's most trusted IVF centre. Expert specialists. Personalised protocols. Real results.",
    bg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=90',
    accent: '#4E9FA3',   // teal
  },
  {
    showLogo: false,
    badge: '10,000+ Babies Born',
    heading: ['We Turn Your', 'Fertility Journey', 'Into Success'],
    highlightLine: 1,
    sub: "Join thousands of families who achieved parenthood with IVFMedIndia's compassionate expert care.",
    bg: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1920&q=90',
    accent: '#C9A227',
  },
];

const miniStats = [
  { value: '15K+', label: 'Babies Born',      icon: '👶' },
  { value: '72%',  label: 'IVF Success Rate', icon: '📊' },
  { value: '25+',  label: 'IVF Centres',      icon: '🏥' },
];

// ─── Booking form (right panel) ────────────────────────────────────────────────
function HeroForm() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', treatment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await leadApi.create({ ...form, source: 'hero_form' }); } catch { /* ok */ }
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220 }}>
          <CheckCircle size={60} className="text-[#4E9FA3] mx-auto mb-4" />
        </motion.div>
        <h3 className="text-white font-black text-xl mb-2">Request Received!</h3>
        <p className="text-gray-300 text-sm">Our specialist will call you within 30 minutes.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#4E9FA3] rounded-full animate-pulse" />
          <span className="text-[#7DC4C8] text-xs font-semibold tracking-wide">IVF</span>
          <span className="w-1.5 h-1.5 bg-[#4E9FA3] rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const inputCls = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4E9FA3] focus:ring-2 focus:ring-[#4E9FA3]/25 transition-all";
  const labelCls = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className={labelCls}>Full Name *</label>
        <input
          className={inputCls}
          placeholder="Your full name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className={labelCls}>Mobile Number *</label>
        <div className="flex">
          <span className="inline-flex items-center px-3.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-semibold">
            +91
          </span>
          <input
            type="tel"
            className="flex-1 bg-white border border-gray-200 rounded-r-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4E9FA3] focus:ring-2 focus:ring-[#4E9FA3]/25 transition-all"
            placeholder="98765 43210"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            required
            pattern="[6-9]\d{9}"
          />
        </div>
      </div>

      {/* City + Treatment */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>City</label>
          <select
            className={inputCls + ' cursor-pointer'}
            value={form.city}
            onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
          >
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Treatment</label>
          <select
            className={inputCls + ' cursor-pointer'}
            value={form.treatment}
            onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}
          >
            <option value="">Select</option>
            {TREATMENTS.slice(0, 8).map(t => (
              <option key={t.slug} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit — Teal CTA */}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-60 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #7DC4C8 0%, #4E9FA3 60%, #3A7F83 100%)', color: '#fff' }}
      >
        <Calendar size={18} />
        {loading ? 'Submitting...' : 'Get Free Consultation'}
      </button>

      <p className="text-center text-gray-500 text-xs flex items-center justify-center gap-1.5">
        🔒 100% confidential · No spam ever
      </p>
    </form>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const go = (n: number) => { setCurrent(n); startTimer(); };
  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2535 0%, #1c3035 50%, #1a2535 100%)',
      }}
    >
      {/* ── Background image ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.75 }}
          />
          {/* Left side darker for text readability, right side lighter so image shows */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/75 via-[#0d1117]/40 to-[#0d1117]/10" />
          {/* Brand-coloured glow blob bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-[700px] h-[350px] blur-3xl rounded-full pointer-events-none"
            style={{ background: `${slide.accent}18` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT: Slide text ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.55 }}
              >
                {/* ── LOGO (only on first slide) ── */}
                {slide.showLogo && (
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                  >
                    {/* Logo card with glow */}
                    <div className="inline-flex items-center gap-4 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4">
                      <img
                        src="/IVF LOGO.png"
                        alt="IVF मार्गदर्शन"
                        className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(201,162,39,0.5))' }}
                      />
                      <div className="border-l border-white/20 pl-4">
                        <div className="text-white font-black text-lg md:text-xl leading-tight">IVF मार्गदर्शन</div>
                        <div className="text-[#E8C547] text-xs font-semibold tracking-wide mt-0.5">
                          India's Trusted Fertility Centre
                        </div>
                        {/* Gold underline */}
                        <div
                          className="h-0.5 w-16 mt-2 rounded-full"
                          style={{ background: 'linear-gradient(90deg, #E8C547, #C9A227)' }}
                        />
                      </div>
                    </div>

                    {/* Trust badges row */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['NABH Accredited', 'ISO Certified', '15K+ Babies Born'].map(badge => (
                        <span
                          key={badge}
                          className="text-xs font-semibold px-3 py-1 rounded-full border"
                          style={{ borderColor: '#C9A22760', color: '#E8C547', background: '#C9A22715' }}
                        >
                          ✓ {badge}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Badge pill */}
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-wide border"
                  style={{
                    background: `${slide.accent}18`,
                    borderColor: `${slide.accent}45`,
                    color: slide.accent,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: slide.accent }}
                  />
                  {slide.badge}
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-tight mb-6">
                  {slide.heading.map((line, i) => (
                    <span key={i} className="block">
                      {i === slide.highlightLine ? (
                        <span
                          className="relative inline-block"
                          style={{
                            background: `linear-gradient(135deg, ${slide.accent === '#C9A227' ? '#E8C547 0%, #C9A227 100%' : '#7DC4C8 0%, #4E9FA3 100%'})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {line}
                        </span>
                      ) : (
                        <span className="text-white">{line}</span>
                      )}
                    </span>
                  ))}
                </h1>

                {/* Sub */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=Hi%20IVFMedIndia%2C%20I%20want%20to%20know%20about%20IVF%20treatment`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-[#25d366] hover:bg-[#1fba58] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl text-sm hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-2.5 bg-white/10 hover:bg-white/18 border border-white/25 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 text-sm"
                  >
                    <Phone size={16} />
                    {PHONE}
                  </a>
                </div>

                {/* Mini stats */}
                <div className="flex flex-wrap gap-7 mt-9 pt-9 border-t border-white/10">
                  {miniStats.map(s => (
                    <div key={s.label} className="flex items-center gap-2.5">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <div
                          className="font-black text-lg leading-none"
                          style={{ color: slide.accent }}
                        >
                          {s.value}
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="flex items-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 28 : 10,
                    height: 10,
                    background: i === current ? slide.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Booking form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative"
          >
            <div className="bg-[#131c27]/90 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

              {/* Card header — teal gradient */}
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #7DC4C8 0%, #4E9FA3 60%, #3A7F83 100%)' }}
              >
                {/* Small logo in form header */}
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src="/IVF LOGO.png" alt="Logo" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">Book Free Consultation</div>
                  <div className="text-white/80 text-xs mt-0.5">No charges · Talk to a specialist today</div>
                </div>
              </div>

              {/* Form body */}
              <div className="px-7 py-7">
                <HeroForm />
              </div>
            </div>

            {/* Gold glow behind card */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl -z-10 opacity-30"
              style={{ background: 'linear-gradient(135deg, #C9A227, #4E9FA3)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => go((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
