import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Calendar, Menu, X, MapPin } from 'lucide-react';

import { TREATMENTS, CITIES, PHONE } from '@/utils/constants';
import { useAppStore } from '@/store/useAppStore';

const aboutLinks = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Management Team', path: '/management-team' },
  { label: 'Mission & Vision', path: '/mission-vision' },
  { label: 'Awards & Recognition', path: '/awards-and-recognition' },
  { label: 'Technology & Labs', path: '/technology-and-labs' },
];

const patientLinks = [
  { label: 'Patient Testimonials', path: '/patient-testimonials' },
  { label: 'Video Testimonials', path: '/video-testimonials' },
  { label: 'Success Stories', path: '/success-stories' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Book Appointment', path: '/book-appointment' },
];

// Reusable dropdown panel
const DropPanel = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    transition={{ duration: 0.15 }}
    className="absolute top-full left-0 mt-0 bg-white shadow-2xl border-t-2 border-[#C9A227] rounded-b-xl z-50 min-w-[220px] overflow-hidden"
  >
    {children}
  </motion.div>
);

const dropLinkClass = "block px-5 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-[#4E9FA3] transition-colors border-b border-gray-50 last:border-0 font-medium";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { setAppointmentModal } = useAppStore();
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [location.pathname]);

  const open = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinkCls = (active?: boolean) =>
    `px-3 py-2 text-sm font-semibold rounded transition-colors ${active ? 'text-[#C9A227]' : 'text-gray-700 hover:text-[#4E9FA3]'}`;

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="bg-[#122b2d] text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">🏥 7 IVF Centres Across India</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">⭐ 65–70% IVF Success Rate</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">🏆 NABH Accredited</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 hover:text-[#E8C547] transition-colors font-semibold">
              <Phone size={11} /> {PHONE}
            </a>
            <span className="text-white/30">|</span>
            <span>Mon–Sat: 9AM–8PM</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white ${scrolled ? 'shadow-lg' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/IVF LOGO.png"
                alt="IVF मार्गदर्शन"
                className="h-12 w-auto object-contain"
              />
              {/* Optional text tagline beside logo */}
              <div className="hidden xl:block border-l border-gray-200 pl-3">
                <div className="text-[11px] font-semibold text-gray-500 leading-tight">India's Trusted</div>
                <div className="text-[11px] font-bold text-[#4E9FA3] leading-tight">Fertility Centre</div>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <Link to="/" className={navLinkCls(location.pathname === '/')}>Home</Link>

              {/* About */}
              <div className="relative" onMouseEnter={() => open('about')} onMouseLeave={close}>
                <button className={`flex items-center gap-1 ${navLinkCls()}`}>
                  About <ChevronDown size={13} className={`transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'about' && (
                    <DropPanel>
                      {aboutLinks.map(l => <Link key={l.path} to={l.path} className={dropLinkClass}>{l.label}</Link>)}
                    </DropPanel>
                  )}
                </AnimatePresence>
              </div>

              {/* Treatments mega */}
              <div className="relative" onMouseEnter={() => open('treatments')} onMouseLeave={close}>
                <button className={`flex items-center gap-1 ${navLinkCls()}`}>
                  Treatments <ChevronDown size={13} className={`transition-transform ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'treatments' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-0 bg-white shadow-2xl border-t-2 border-[#C9A227] rounded-b-xl z-50 w-[580px] overflow-hidden"
                    >
                      <div className="grid grid-cols-2 p-2">
                        {TREATMENTS.map(t => (
                          <Link key={t.slug} to={`/treatments/${t.slug}`} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-[#4E9FA3] rounded transition-colors font-medium">
                            <span className="text-base w-5 text-center">{t.icon}</span> {t.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Centres */}
              <div className="relative" onMouseEnter={() => open('centres')} onMouseLeave={close}>
                <button className={`flex items-center gap-1 ${navLinkCls()}`}>
                  Centres <ChevronDown size={13} className={`transition-transform ${activeDropdown === 'centres' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'centres' && (
                    <DropPanel>
                      {CITIES.map(city => (
                        <Link key={city.slug} to={`/ivf-centre/${city.slug}`} className={`${dropLinkClass} flex items-center gap-2`}>
                          <MapPin size={12} className="text-[#C9A227]" /> IVF Centre {city.name}
                        </Link>
                      ))}
                    </DropPanel>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/doctors" className={navLinkCls(location.pathname.startsWith('/doctors'))}>Doctors</Link>

              {/* Patient corner */}
              <div className="relative" onMouseEnter={() => open('patient')} onMouseLeave={close}>
                <button className={`flex items-center gap-1 ${navLinkCls()}`}>
                  Patients <ChevronDown size={13} className={`transition-transform ${activeDropdown === 'patient' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'patient' && (
                    <DropPanel>
                      {patientLinks.map(l => <Link key={l.path} to={l.path} className={dropLinkClass}>{l.label}</Link>)}
                    </DropPanel>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blogs" className={navLinkCls(location.pathname.startsWith('/blogs'))}>Blog</Link>
              <Link to="/contact-us" className={navLinkCls(location.pathname === '/contact-us')}>Contact</Link>
            </nav>

            {/* ── RIGHT CTAs ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-bold text-[#4E9FA3] hover:text-[#3A7F83] transition-colors">
                <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100">
                  <Phone size={14} className="text-[#4E9FA3]" />
                </div>
                {PHONE}
              </a>
              <button
                onClick={() => setAppointmentModal(true)}
                className="bg-gradient-gold text-white text-sm font-black px-6 py-2.5 rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Calendar size={14} /> Book Appointment
              </button>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-gray-700 hover:text-[#C9A227] transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
                {/* Logo in mobile menu */}
                <div className="flex justify-center py-3 mb-2 border-b border-gray-100">
                  <img src="/IVF LOGO.png" alt="IVF Logo" className="h-10 w-auto" />
                </div>

                <Link to="/" className="block py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded">Home</Link>

                {[
                  { key: 'mob-about', label: 'About Us', links: aboutLinks },
                  { key: 'mob-patient', label: 'Patient Corner', links: patientLinks },
                ].map(({ key, label, links }) => (
                  <div key={key}>
                    <button onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)} className="w-full flex items-center justify-between py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">
                      {label} <ChevronDown size={14} className={`transition-transform text-[#C9A227] ${mobileExpanded === key ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === key && (
                      <div className="pl-4 border-l-2 border-[#C9A227] ml-3 mb-2">
                        {links.map(l => <Link key={l.path} to={l.path} className="block py-2 px-3 text-sm text-gray-600 hover:text-[#4E9FA3] font-medium">{l.label}</Link>)}
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  <button onClick={() => setMobileExpanded(mobileExpanded === 'mob-t' ? null : 'mob-t')} className="w-full flex items-center justify-between py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">
                    Treatments <ChevronDown size={14} className={`transition-transform text-[#C9A227] ${mobileExpanded === 'mob-t' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'mob-t' && (
                    <div className="pl-4 border-l-2 border-[#C9A227] ml-3 mb-2">
                      {TREATMENTS.map(t => <Link key={t.slug} to={`/treatments/${t.slug}`} className="block py-1.5 px-3 text-sm text-gray-600 hover:text-[#4E9FA3] font-medium">{t.icon} {t.name}</Link>)}
                    </div>
                  )}
                </div>

                <div>
                  <button onClick={() => setMobileExpanded(mobileExpanded === 'mob-c' ? null : 'mob-c')} className="w-full flex items-center justify-between py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">
                    Our Centres <ChevronDown size={14} className={`transition-transform text-[#C9A227] ${mobileExpanded === 'mob-c' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'mob-c' && (
                    <div className="pl-4 border-l-2 border-[#C9A227] ml-3 mb-2">
                      {CITIES.map(c => <Link key={c.slug} to={`/ivf-centre/${c.slug}`} className="block py-1.5 px-3 text-sm text-gray-600 hover:text-[#4E9FA3] font-medium">📍 {c.name}</Link>)}
                    </div>
                  )}
                </div>

                <Link to="/doctors" className="block py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">Doctors</Link>
                <Link to="/blogs" className="block py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">Blog</Link>
                <Link to="/contact-us" className="block py-2.5 px-3 font-bold text-gray-800 hover:text-[#C9A227] rounded transition-colors">Contact</Link>

                <div className="pt-3 pb-2 flex flex-col gap-2 border-t border-gray-100 mt-2">
                  <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 border-2 border-[#4E9FA3] text-[#4E9FA3] font-bold py-2.5 rounded-full text-sm">
                    <Phone size={15} /> {PHONE}
                  </a>
                  <button onClick={() => setAppointmentModal(true)} className="bg-gradient-gold text-white font-black py-3 rounded-full flex items-center justify-center gap-2 text-sm shadow-gold">
                    <Calendar size={15} /> Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
