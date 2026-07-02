import SEOHead from '@/components/common/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GG = 'linear-gradient(135deg,#E8C547 0%,#C9A227 60%,#A67C00 100%)';
const TG = 'linear-gradient(135deg,#7DC4C8,#4E9FA3)';

const team = [
  { name: 'Dr. Sachin Kulkarni', role: 'Chairman, Director, Chief IVF Specialist', image: '/images/doctor1.png', bio: 'Pioneer IVF specialist and director with 25+ years experience in reproductive medicine.', gold: true },
  { name: 'Dr. Swati Kulkarni',  role: 'M.B.B.S, D.G.O',                          image: '/images/doctor2.jpeg', bio: 'Specialist in obstetrics and gynaecology with extensive clinical experience.', gold: false },
  { name: 'Dr. Sharayu Mohite',  role: 'M.B.B.S, D.G.O, D.N.B',                  image: '/images/doctor3.jpeg', bio: 'DNB qualified gynaecologist specialising in infertility and reproductive medicine.', gold: true },
  { name: 'Dr. Uma Gaikwad',     role: 'Fertility Consultant',                    image: '/images/doctor4.jpeg', bio: 'Compassionate fertility consultant dedicated to personalised patient care.', gold: false },
];

export default function ManagementTeam() {
  return (
    <>
      <SEOHead title="Management Team | IVF मार्गदर्शन" description="Meet the expert management team behind IVF मार्गदर्शन — India's leading IVF and fertility specialists." canonicalPath="/management-team" />

      <section className="relative h-56 flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=85" alt="Management Team" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(13,17,23,0.88) 0%,rgba(13,17,23,0.5) 100%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: GG }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-black text-white mb-1">Management Team</h1>
          <p className="text-white/70">The visionaries behind IVF मार्गदर्शन</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(180deg,#fdfbf0 0%,#fff 50%,#f0f9fa 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                style={{ border: `1px solid ${m.gold ? 'rgba(201,162,39,0.2)' : 'rgba(78,159,163,0.2)'}`, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <div className="h-56 overflow-hidden" style={{ background: 'linear-gradient(160deg,#f0f9fa,#fdfbf0)' }}>
                  <img src={m.image} alt={m.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                {/* Top accent bar */}
                <div className="h-1" style={{ background: m.gold ? GG : TG }} />
                <div className="p-5 bg-white">
                  <h3 className="font-black text-gray-900 mb-0.5">{m.name}</h3>
                  <p className="text-sm font-bold mb-2" style={{ color: m.gold ? '#C9A227' : '#4E9FA3' }}>{m.role}</p>
                  <p className="text-gray-500 text-xs mb-4 leading-relaxed">{m.bio}</p>
                  <Link to="/doctors" className="inline-flex items-center gap-1.5 text-sm font-black hover:gap-3 transition-all" style={{ color: m.gold ? '#C9A227' : '#4E9FA3' }}>
                    Full Profile <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
