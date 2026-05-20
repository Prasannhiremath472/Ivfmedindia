export const TREATMENTS = [
  { name: 'IVF Treatment', slug: 'ivf-treatment', icon: '🧬' },
  { name: 'ICSI Treatment', slug: 'icsi-treatment', icon: '🔬' },
  { name: 'IUI Treatment', slug: 'iui-treatment', icon: '💉' },
  { name: 'Egg Freezing', slug: 'egg-freezing', icon: '❄️' },
  { name: 'Embryo Freezing', slug: 'embryo-freezing', icon: '🧊' },
  { name: 'Sperm Freezing', slug: 'sperm-freezing', icon: '💧' },
  { name: 'Fertility Preservation', slug: 'fertility-preservation', icon: '🌸' },
  { name: 'Genetic Testing (PGT)', slug: 'genetic-testing', icon: '🧪' },
  { name: 'Donor Program', slug: 'donor-program', icon: '💝' },
  { name: 'Surrogacy', slug: 'surrogacy', icon: '👶' },
  { name: 'Male Infertility', slug: 'male-infertility', icon: '👨' },
  { name: 'Female Infertility', slug: 'female-infertility', icon: '👩' },
  { name: 'PCOS Treatment', slug: 'pcos-treatment', icon: '🌿' },
  { name: 'Endometriosis', slug: 'endometriosis-treatment', icon: '🩺' },
  { name: 'Recurrent Pregnancy Loss', slug: 'recurrent-pregnancy-loss', icon: '💙' },
  { name: 'Advanced Fertility', slug: 'advanced-fertility-treatment', icon: '⚗️' },
];

export const CITIES = [
  { name: 'Pune', slug: 'pune' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
];

export const STATS = [
  { value: 10000, suffix: '+', label: 'Happy Families', icon: '👨‍👩‍👧' },
  { value: 68, suffix: '%', label: 'IVF Success Rate', icon: '📊' },
  { value: 15, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 25, suffix: '+', label: 'Expert Doctors', icon: '👩‍⚕️' },
  { value: 7, suffix: '+', label: 'Centres Across India', icon: '🏥' },
  { value: 5000, suffix: '+', label: 'IVF Cycles/Year', icon: '🔬' },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Highest Success Rates',
    description: '65-70% IVF success rate — among the highest in India, with transparent reporting.',
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
  },
  {
    title: 'World-Class Lab',
    description: 'State-of-the-art embryology laboratory with advanced time-lapse incubators.',
    icon: '🔬',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80',
  },
  {
    title: 'Expert Specialists',
    description: 'Team of 25+ IVF specialists trained at top institutions in India and abroad.',
    icon: '👩‍⚕️',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  },
  {
    title: 'Personalized Care',
    description: 'Customized treatment protocols designed for your unique fertility profile.',
    icon: '💙',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    title: 'Affordable EMI',
    description: 'Zero-cost EMI options and insurance coverage accepted for all treatments.',
    icon: '💰',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80',
  },
  {
    title: 'NABH Accredited',
    description: 'All centres are NABH accredited with strict quality and safety standards.',
    icon: '🏆',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  },
];

export const FERTILITY_JOURNEY_STEPS = [
  { step: 1, title: 'Initial Consultation', description: 'Meet our specialist for a comprehensive fertility assessment and personalized treatment plan.', icon: '🩺' },
  { step: 2, title: 'Fertility Investigation', description: 'Complete hormone tests, ultrasound scans, and semen analysis to understand your fertility profile.', icon: '🔬' },
  { step: 3, title: 'Treatment Planning', description: 'Your doctor creates a customized treatment protocol tailored to your specific needs.', icon: '📋' },
  { step: 4, title: 'Ovarian Stimulation', description: 'Fertility medications stimulate your ovaries to produce multiple eggs for retrieval.', icon: '💉' },
  { step: 5, title: 'Egg Retrieval & Fertilization', description: 'Eggs are retrieved under sedation and fertilized in our world-class embryology lab.', icon: '🧬' },
  { step: 6, title: 'Embryo Transfer', description: 'The healthiest embryo is carefully transferred to your uterus for implantation.', icon: '🌱' },
  { step: 7, title: 'Pregnancy Test', description: 'A blood test 14 days after transfer confirms your pregnancy. Your dream begins!', icon: '🌟' },
];

export const AWARDS = [
  { name: 'NABH Accreditation', year: '2024', icon: '🏆' },
  { name: 'Best IVF Centre - Times Health', year: '2023', icon: '🥇' },
  { name: 'ISO 9001:2015 Certified', year: '2023', icon: '✅' },
  { name: 'Excellence in Patient Care', year: '2023', icon: '💙' },
  { name: 'Best Fertility Hospital', year: '2022', icon: '🌟' },
];

export const PHONE = import.meta.env.VITE_CONTACT_PHONE || '+918888888888';
export const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'info@ivfmedindia.com';
export const WHATSAPP = import.meta.env.VITE_WHATSAPP || '918888888888';
