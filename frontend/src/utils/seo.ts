export const SITE_NAME = 'IVFMedIndia';
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.ivfmedindia.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: object | object[];
  noIndex?: boolean;
}

export const buildTitle = (pageTitle: string) => `${pageTitle} | ${SITE_NAME}`;

export const buildCanonical = (path: string) => `${SITE_URL}${path}`;

export const buildBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'IVFMedIndia',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "India's leading IVF & fertility treatment center with 65-70% success rates",
  telephone: '+91-8888-888-888',
  email: 'info@ivfmedindia.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Baner Road',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411045',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/ivfmedindia',
    'https://www.instagram.com/ivfmedindia',
    'https://twitter.com/ivfmedindia',
  ],
  medicalSpecialty: 'Fertility Treatment',
};
