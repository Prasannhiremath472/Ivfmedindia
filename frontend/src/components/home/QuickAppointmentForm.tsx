import { useState } from 'react';
import { Phone, MapPin, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { leadApi } from '@/services/api';
import { CITIES, TREATMENTS } from '@/utils/constants';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function QuickAppointmentForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', phone: '', city: '', treatment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await leadApi.create({ ...form, source: 'website' }); } catch { /* ok */ }
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = "w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#E8C547] focus:ring-2 focus:ring-[#C9A227]/30 transition-all backdrop-blur-sm";
  const labelCls = "block text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5";

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1117 0%, #122b2d 40%, #1a1500 100%)' }}>

      {/* Gold shimmer */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #C9A227 0px, transparent 1px, transparent 60px)', backgroundSize: '60px 60px' }} />

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4E9FA3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-white">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-7">
              <img src="/IVF LOGO.png" alt="IVF Logo" className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 16px rgba(201,162,39,0.5))' }} />
              <div className="h-12 w-px" style={{ background: 'linear-gradient(180deg, transparent, #C9A227, transparent)' }} />
              <div>
                <div className="font-black text-lg text-white leading-none">Free Consultation</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: '#E8C547' }}>Talk to a Specialist Today</div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5">
              Begin Your Journey<br />
              <span style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Towards Parenthood
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our fertility specialists are available 6 days a week. Get personalised advice at absolutely no cost.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '✅', label: '100% Free Consultation' },
                { icon: '⚡', label: 'Reply within 30 mins' },
                { icon: '🔒', label: 'Completely Confidential' },
                { icon: '📍', label: 'Available in 5 Cities' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5 text-white/80 text-sm font-medium">
                  <span className="text-base flex-shrink-0">{item.icon}</span> {item.label}
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="flex -space-x-3">
                {['https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=60&q=80','https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=60&q=80','https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=60&q=80','https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=60&q=80'].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 object-cover"
                    style={{ borderColor: '#C9A227' }} loading="lazy" />
                ))}
              </div>
              <div>
                <div className="font-black text-sm text-white">10,000+ Happy Families</div>
                <div className="text-xs text-gray-400">Joined their parenthood journey with us</div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative rounded-3xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.25)', backdropFilter: 'blur(12px)' }}>

              {/* Form header */}
              <div className="px-7 py-5 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)' }}>
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="/IVF LOGO.png" alt="" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <div className="text-white font-black text-base">Book Free Consultation</div>
                  <div className="text-white/80 text-xs">No charges · Speak to a specialist</div>
                </div>
              </div>

              <div className="p-7">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#E8C547' }} />
                    <h3 className="text-xl font-black text-white mb-2">Request Received!</h3>
                    <p className="text-gray-300 text-sm">Our team will call you within 30 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input className={inputCls} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div>
                        <label className={labelCls}>Mobile *</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-2xl text-white/70 text-sm font-bold border border-r-0 border-white/20"
                            style={{ background: 'rgba(255,255,255,0.08)' }}>+91</span>
                          <input type="tel" className="flex-1 bg-white/10 border border-white/20 rounded-r-2xl px-3 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#E8C547] transition-all" placeholder="98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required pattern="[6-9]\d{9}" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>City</label>
                        <select className={inputCls + ' cursor-pointer'} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}>
                          <option value="" className="text-gray-800">Select city</option>
                          {CITIES.map(c => <option key={c.slug} value={c.name} className="text-gray-800">{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Treatment</label>
                        <select className={inputCls + ' cursor-pointer'} value={form.treatment} onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}>
                          <option value="" className="text-gray-800">Select</option>
                          {TREATMENTS.slice(0, 8).map(t => <option key={t.slug} value={t.name} className="text-gray-800">{t.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full font-black py-4 rounded-2xl text-base text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)', boxShadow: '0 6px 24px rgba(201,162,39,0.4)' }}>
                      <Calendar size={18} />
                      {loading ? 'Submitting...' : 'Get Free Consultation'}
                    </button>
                    <p className="text-center text-white/40 text-xs flex items-center justify-center gap-1.5">
                      🔒 100% confidential · No spam ever
                    </p>
                  </form>
                )}
              </div>

              {/* Gold glow border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(201,162,39,0.3)' }} />
            </div>

            {/* Glow behind form */}
            <div className="absolute -inset-4 rounded-3xl blur-3xl -z-10 opacity-20"
              style={{ background: 'linear-gradient(135deg,#C9A227,#4E9FA3)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
