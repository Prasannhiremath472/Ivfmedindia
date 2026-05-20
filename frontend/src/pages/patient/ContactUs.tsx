import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { contactApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { CITIES, PHONE, EMAIL } from '@/utils/constants';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.submit(form);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact IVFMedIndia — Book Free Consultation"
        description="Contact IVFMedIndia for free fertility consultation. Centres in Pune, Mumbai, Delhi, Bangalore, Hyderabad. Call +91-8888-888-888."
        canonicalPath="/contact-us"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Contact Us', url: `${SITE_URL}/contact-us` }])}
      />

      <section className="relative h-48 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80" alt="Contact Us" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Contact Us</h1>
          <p className="text-white/80 text-lg">We're here to help on your fertility journey</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold font-heading mb-6">Get in Touch</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: 'Phone / WhatsApp', value: PHONE, href: `tel:${PHONE}` },
                  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM', href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-800 font-semibold hover:text-[#C9A227] transition-colors">{value}</a>
                      ) : (
                        <p className="text-gray-800 font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-gray-800 mb-4">Our Centres</h3>
              <div className="grid grid-cols-2 gap-3">
                {CITIES.map(city => (
                  <div key={city.slug} className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin size={13} className="text-[#C9A227]" /> {city.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-5 font-heading">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input type="tel" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="Your phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none resize-none" placeholder="How can we help you?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                    </div>
                    <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all w-full justify-center disabled:opacity-70">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
