import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Clock } from 'lucide-react';
import { PHONE, EMAIL } from '@/utils/constants';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const contacts = [
  {
    Icon: Phone,
    title: 'Call Us',
    desc: 'Speak directly with our fertility consultants',
    value: PHONE,
    href: `tel:${PHONE}`,
    cta: 'Call Now',
    gold: true,
  },
  {
    Icon: Mail,
    title: 'Email Us',
    desc: 'Send us your queries — we reply within 24 hours',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    cta: 'Send Email',
    gold: false,
  },
  {
    Icon: Clock,
    title: '24/7 Support',
    desc: 'Emergency fertility support available round the clock',
    value: 'Mon–Sat: 9AM–8PM',
    href: '/contact-us',
    cta: 'Get Support',
    gold: true,
  },
];

export default function ContactTrioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white" style={{ background: GG }}>Contact Us</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            We're Here to{' '}
            <span style={{ background: TG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Help You
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">Reach out through any channel — our team responds promptly to all inquiries</p>
        </motion.div>

        {/* 3 contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map(({ Icon, title, desc, value, href, cta, gold }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="group rounded-3xl p-8 text-center h-full flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: gold ? 'linear-gradient(135deg,#fdfbf0,#faf4d3)' : 'linear-gradient(135deg,#f0f9fa,#d9f0f1)',
                  border: gold ? '1px solid rgba(201,162,39,0.25)' : '1px solid rgba(78,159,163,0.25)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = gold ? '0 16px 40px rgba(201,162,39,0.2)' : '0 16px 40px rgba(78,159,163,0.2)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'}>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-md" style={{ background: gold ? GG : TG }}>
                  <Icon size={26} color="white" />
                </div>

                <h3 className="font-black text-gray-900 text-xl mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{desc}</p>
                <p className="font-bold text-sm mb-5" style={{ color: gold ? '#C9A227' : '#4E9FA3' }}>{value}</p>

                <a href={href}
                  className="inline-flex items-center justify-center font-black text-sm px-7 py-3 rounded-full text-white transition-all duration-200 hover:-translate-y-0.5 w-full"
                  style={{ background: gold ? GG : TG, boxShadow: gold ? '0 4px 16px rgba(201,162,39,0.35)' : '0 4px 16px rgba(78,159,163,0.35)' }}>
                  {cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
