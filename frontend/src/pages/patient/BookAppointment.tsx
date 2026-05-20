import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, User, MapPin, Stethoscope, CheckCircle, Clock } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { appointmentApi } from '@/services/api';
import { CITIES, TREATMENTS } from '@/utils/constants';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ patient_name: '', patient_phone: '', patient_email: '', appointment_date: '', appointment_time: '', location_city: '', treatment: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '17:00'];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const r = await appointmentApi.create({ ...form, appointment_time: form.appointment_time || '10:00', source: 'booking_page' });
      setBookingId(r.data.bookingId);
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
        title="Book IVF Appointment — Free Consultation | IVFMedIndia"
        description="Book your free IVF consultation at IVFMedIndia. Choose your preferred doctor, location, and time. Easy online booking."
        canonicalPath="/book-appointment"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Book Appointment', url: `${SITE_URL}/book-appointment` }])}
      />

      <section className="relative h-48 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=80" alt="Book Appointment" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#4E9FA3] opacity-85" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Book an Appointment</h1>
          <p className="text-white/80 text-lg">Free consultation with India's best IVF specialists</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
              <CheckCircle size={70} className="text-green-500 mx-auto mb-5" />
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-3">Appointment Confirmed!</h2>
              <div className="bg-teal-50 rounded-2xl p-6 mb-6 border border-teal-100">
                <p className="text-gray-500 text-sm mb-1">Your Booking ID</p>
                <p className="text-3xl font-bold text-[#C9A227]">{bookingId}</p>
              </div>
              <p className="text-gray-600 mb-2">Our team will call you to confirm details within 30 minutes.</p>
              <p className="text-gray-500 text-sm">Questions? Call <a href="tel:+918888888888" className="text-[#C9A227] font-semibold">+91 8888 888 888</a></p>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-8">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`flex items-center gap-2 flex-1 ${s < 3 ? 'after:flex-1 after:h-0.5 after:bg-gray-200 after:content-[""]' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${step >= s ? 'bg-[#4E9FA3] text-white' : 'bg-gray-100 text-gray-500'}`}>{s}</div>
                    <span className={`text-xs font-medium ${step >= s ? 'text-[#C9A227]' : 'text-gray-400'}`}>{['Personal Info', 'Date & Time', 'Treatment'][s - 1]}</span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Your Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="Your full name" value={form.patient_name} onChange={e => setForm(f => ({ ...f, patient_name: e.target.value }))} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="10-digit mobile" value={form.patient_phone} onChange={e => setForm(f => ({ ...f, patient_phone: e.target.value }))} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                    <input type="email" className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" placeholder="your@email.com" value={form.patient_email} onChange={e => setForm(f => ({ ...f, patient_email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred City *</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" value={form.location_city} onChange={e => setForm(f => ({ ...f, location_city: e.target.value }))} required>
                        <option value="">Select city</option>
                        {CITIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => form.patient_name && form.patient_phone && form.location_city && setStep(2)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all w-full justify-center mt-2">
                    Continue →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Date & Time</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" min={today} className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" value={form.appointment_date} onChange={e => setForm(f => ({ ...f, appointment_date: e.target.value }))} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map(slot => (
                        <button key={slot} type="button" onClick={() => setForm(f => ({ ...f, appointment_time: slot }))}
                          className={`py-2 text-sm rounded-lg border transition-all ${form.appointment_time === slot ? 'bg-[#4E9FA3] text-white border-[#4E9FA3]' : 'border-gray-200 text-gray-600 hover:border-teal-300'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all flex-1 justify-center">← Back</button>
                    <button onClick={() => form.appointment_date && form.appointment_time && setStep(3)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all flex-1 justify-center">Continue →</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Treatment & Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Interest</label>
                    <div className="relative">
                      <Stethoscope size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none" value={form.treatment} onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}>
                        <option value="">Select treatment</option>
                        {TREATMENTS.map(t => <option key={t.slug} value={t.name}>{t.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea rows={3} className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none resize-none" placeholder="Any specific concerns or questions?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  {/* Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> {form.patient_name}</p>
                    <p><strong>Phone:</strong> {form.patient_phone}</p>
                    <p><strong>Date:</strong> {form.appointment_date} at {form.appointment_time}</p>
                    <p><strong>City:</strong> {form.location_city}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-sm border-2 border-[#4E9FA3] text-[#4E9FA3] hover:bg-teal-50 transition-all flex-1 justify-center">← Back</button>
                    <button onClick={handleSubmit} disabled={loading} className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all flex-1 justify-center disabled:opacity-70">
                      {loading ? 'Booking...' : '✓ Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
