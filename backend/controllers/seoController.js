const { SEO } = require('../models');
const { generateOrganizationSchema } = require('../utils/seoSchema');

const getSeoByPath = async (req, res) => {
  try {
    const pagePath = req.query.path || '/';
    let seo = await SEO.findOne({ where: { page_path: pagePath, is_active: true } });

    if (!seo) {
      seo = {
        title: 'IVFMedIndia - Best IVF Centre in India | 65-70% Success Rate',
        description: "IVFMedIndia is India's leading IVF & fertility treatment center with 65-70% success rates.",
        keywords: 'IVF centre India, best IVF hospital, fertility treatment India',
        og_title: 'IVFMedIndia - Best IVF Centre in India',
        og_description: "India's most trusted IVF & fertility center with world-class technology.",
        og_image: 'https://www.ivfmedindia.com/og-image.jpg',
        twitter_card: 'summary_large_image',
        robots: 'index, follow',
        schema_markup: JSON.stringify(generateOrganizationSchema()),
      };
    }

    res.json({ success: true, seo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch SEO data' });
  }
};

const createOrUpdateSeo = async (req, res) => {
  try {
    const { page_path } = req.body;
    const [seo, created] = await SEO.findOrCreate({
      where: { page_path },
      defaults: req.body,
    });
    if (!created) await seo.update(req.body);
    res.json({ success: true, message: created ? 'SEO created' : 'SEO updated', seo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save SEO' });
  }
};

const getAllSeo = async (req, res) => {
  try {
    const seoList = await SEO.findAll({ where: { is_active: true }, order: [['page_path', 'ASC']] });
    res.json({ success: true, seoList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch SEO list' });
  }
};

const generateSitemap = async (req, res) => {
  try {
    const { Treatment, Blog, Doctor, Location } = require('../models');
    const baseUrl = 'https://www.ivfmedindia.com';

    const [treatments, blogs, doctors, locations] = await Promise.all([
      Treatment.findAll({ where: { is_active: true }, attributes: ['slug', 'updated_at'] }),
      Blog.findAll({ where: { status: 'published' }, attributes: ['slug', 'updated_at'] }),
      Doctor.findAll({ where: { is_active: true }, attributes: ['slug', 'updated_at'] }),
      Location.findAll({ where: { is_active: true }, attributes: ['slug', 'city_slug', 'updated_at'] }),
    ]);

    const staticPages = ['', '/about-us', '/our-story', '/management-team', '/mission-vision', '/awards-and-recognition', '/technology-and-labs', '/doctors', '/blogs', '/patient-testimonials', '/video-testimonials', '/success-stories', '/faq', '/contact-us', '/book-appointment'];
    const cities = ['pune', 'mumbai', 'delhi', 'bangalore', 'hyderabad'];

    let urls = staticPages.map((path) => `  <url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
    treatments.forEach((t) => urls.push(`  <url><loc>${baseUrl}/treatments/${t.slug}</loc><lastmod>${new Date(t.updated_at).toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`));
    blogs.forEach((b) => urls.push(`  <url><loc>${baseUrl}/blogs/${b.slug}</loc><lastmod>${new Date(b.updated_at).toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`));
    doctors.forEach((d) => urls.push(`  <url><loc>${baseUrl}/doctors/${d.slug}</loc><lastmod>${new Date(d.updated_at).toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`));
    locations.forEach((l) => urls.push(`  <url><loc>${baseUrl}/ivf-centre/${l.city_slug}/${l.slug}</loc><lastmod>${new Date(l.updated_at).toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`));
    cities.forEach((c) => urls.push(`  <url><loc>${baseUrl}/ivf-centre/${c}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate sitemap' });
  }
};

module.exports = { getSeoByPath, createOrUpdateSeo, getAllSeo, generateSitemap };
