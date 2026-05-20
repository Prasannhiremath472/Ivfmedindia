import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { TREATMENTS, CITIES, PHONE, EMAIL } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #122b2d 50%, #1a1500 100%)' }}>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* CTA strip */}
      <div className="relative py-14 px-6 border-b" style={{ borderColor: 'rgba(201,162,39,0.2)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <img src="/IVF LOGO.png" alt="IVF Logo" className="h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(201,162,39,0.5))' }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
              Begin Your Parenthood Journey Today
            </h2>
            <p className="text-gray-400 text-base">
              Free consultation with India's best IVF specialists — no obligation, no pressure.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/book-appointment"
              className="font-black px-8 py-3.5 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-gold hover:shadow-gold-lg whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', color: '#fff' }}>
              Book Free Consultation
            </Link>
            <a href={`tel:${PHONE}`}
              className="border-2 font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2 hover:bg-white/10 whitespace-nowrap"
              style={{ borderColor: '#4E9FA3', color: '#7DC4C8' }}>
              <Phone size={15} /> {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/IVF LOGO.png" alt="IVF मार्गदर्शन" className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(201,162,39,0.4))' }} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              India's most trusted IVF & fertility centre. 65–70% success rate. NABH accredited. 7 centres across 5 cities.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mb-5">
              {[
                { label: 'Facebook', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: 'Instagram', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: 'YouTube', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                { label: 'Twitter', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              ].map(({ label, svg }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,162,39,0.2)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#E8C547,#C9A227)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}>
                  {svg}
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={13} style={{ color: '#C9A227' }} /> {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={13} style={{ color: '#4E9FA3' }} /> {EMAIL}
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#E8C547' }}>Treatments</h3>
            <ul className="space-y-2">
              {TREATMENTS.slice(0, 8).map(t => (
                <li key={t.slug}>
                  <Link to={`/treatments/${t.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C9A227' }} />
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Centres */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#7DC4C8' }}>Our Centres</h3>
            <ul className="space-y-2 mb-6">
              {CITIES.map(city => (
                <li key={city.slug}>
                  <Link to={`/ivf-centre/${city.slug}`} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <MapPin size={11} style={{ color: '#4E9FA3' }} /> {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#E8C547' }}>Company</h3>
            <ul className="space-y-2">
              {[['About Us','/about-us'],['Our Doctors','/doctors'],['Success Stories','/success-stories'],['Blog','/blogs'],['Contact Us','/contact-us']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C9A227' }} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient info */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#7DC4C8' }}>Patient Info</h3>
            <ul className="space-y-2 mb-6">
              {[['Patient Testimonials','/patient-testimonials'],['Video Testimonials','/video-testimonials'],['FAQ','/faq'],['Book Appointment','/book-appointment'],['IVF Cost','/treatments/ivf-treatment']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#4E9FA3' }} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Helpline box */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.25)' }}>
              <div className="text-white font-black text-sm mb-0.5">📞 24/7 Helpline</div>
              <a href={`tel:${PHONE}`} className="font-black text-lg hover:opacity-80 transition-opacity"
                style={{ color: '#E8C547' }}>{PHONE}</a>
              <p className="text-gray-500 text-xs mt-1">Free consultation available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t py-5 px-6" style={{ borderColor: 'rgba(201,162,39,0.15)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} IVF मार्गदर्शन. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Made with <Heart size={11} className="fill-red-500 text-red-500" /> for hopeful parents across India
          </span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
