const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'IVFMedIndia',
  url: 'https://www.ivfmedindia.com',
  logo: 'https://www.ivfmedindia.com/logo.png',
  description: 'India\'s leading IVF & fertility treatment center with highest success rates',
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
    'https://www.youtube.com/ivfmedindia',
  ],
  medicalSpecialty: 'Fertility Treatment',
});

const generateDoctorSchema = (doctor) => ({
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: `Dr. ${doctor.name}`,
  image: doctor.image,
  description: doctor.bio,
  medicalSpecialty: doctor.specialization,
  worksFor: {
    '@type': 'MedicalOrganization',
    name: 'IVFMedIndia',
  },
  alumniOf: doctor.education,
  knowsAbout: doctor.expertise,
});

const generateTreatmentSchema = (treatment) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: treatment.name,
  description: treatment.description,
  procedureType: 'Therapeutic',
  bodyLocation: 'Reproductive System',
  followup: treatment.followup || '',
  howPerformed: treatment.procedure || '',
  preparation: treatment.preparation || '',
  status: 'ActiveActionStatus',
});

const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const generateLocalBusinessSchema = (location) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: `IVFMedIndia - ${location.name}`,
  image: location.image,
  telephone: location.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: location.address,
    addressLocality: location.city,
    addressRegion: location.state,
    postalCode: location.pincode,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: location.lat,
    longitude: location.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  url: `https://www.ivfmedindia.com/ivf-centre/${location.citySlug}/${location.slug}`,
});

const generateArticleSchema = (blog) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  headline: blog.title,
  description: blog.excerpt,
  image: blog.featuredImage,
  datePublished: blog.publishedAt,
  dateModified: blog.updatedAt,
  author: {
    '@type': 'Person',
    name: blog.authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: 'IVFMedIndia',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ivfmedindia.com/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.ivfmedindia.com/blogs/${blog.slug}`,
  },
});

module.exports = {
  generateOrganizationSchema,
  generateDoctorSchema,
  generateTreatmentSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateArticleSchema,
};
