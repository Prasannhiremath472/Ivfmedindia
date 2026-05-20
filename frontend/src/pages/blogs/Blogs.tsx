import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Search, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { blogApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { format } from 'date-fns';

const fallback = [
  { id: 1, title: 'What is IVF? A Complete Guide', slug: 'what-is-ivf', featured_image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80', published_at: new Date().toISOString(), read_time: 8, excerpt: 'Everything you need to know about IVF — the process, success rates, costs, and what to expect.', category: { name: 'IVF & Fertility' } },
  { id: 2, title: 'PCOS and Fertility: How to Overcome PCOS to Conceive', slug: 'pcos-fertility', featured_image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80', published_at: new Date().toISOString(), read_time: 6, excerpt: 'PCOS affects 1 in 5 women. Learn how to manage PCOS for fertility.', category: { name: 'PCOS & Hormones' } },
  { id: 3, title: '10 Signs You May Have Fertility Issues', slug: '10-signs-fertility-issues', featured_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80', published_at: new Date().toISOString(), read_time: 5, excerpt: 'Recognize early signs of fertility issues and when to see a specialist.', category: { name: 'Expert Advice' } },
  { id: 4, title: 'Male Infertility: Causes, Diagnosis and Treatment', slug: 'male-infertility-guide', featured_image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80', published_at: new Date().toISOString(), read_time: 7, excerpt: '40% of infertility cases are due to male factors. Understand causes and treatments.', category: { name: 'Male Infertility' } },
  { id: 5, title: 'IVF Success Rates: What Do the Numbers Really Mean?', slug: 'ivf-success-rates-explained', featured_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', published_at: new Date().toISOString(), read_time: 6, excerpt: 'Understanding IVF success statistics and what factors affect your personal success rate.', category: { name: 'IVF & Fertility' } },
  { id: 6, title: 'Emotional Support During IVF: Taking Care of Your Mental Health', slug: 'emotional-support-ivf', featured_image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80', published_at: new Date().toISOString(), read_time: 5, excerpt: 'IVF is emotionally challenging. Here are ways to protect your mental health during treatment.', category: { name: 'Expert Advice' } },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(fallback);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.getAll({ limit: 12 }).then(r => { if (r.data.data?.length) setBlogs(r.data.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <SEOHead
        title="Fertility & IVF Blog — Expert Advice | IVFMedIndia"
        description="Read expert fertility advice, IVF tips, PCOS management guides, and success stories on the IVFMedIndia blog."
        keywords="IVF blog, fertility tips, PCOS treatment, IVF success stories, fertility expert advice"
        canonicalPath="/blogs"
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Blog', url: `${SITE_URL}/blogs` }])}
      />
      <section className="relative h-56 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1400&q=80" alt="Fertility Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-white font-heading mb-2">Fertility & IVF Blog</h1>
          <p className="text-white/80 text-lg">Expert advice, success stories, and fertility insights</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4E9FA3] outline-none shadow-sm"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={`/blogs/${blog.slug}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden block group h-full">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    {(blog as any).category && (
                      <span className="text-xs text-[#C9A227] font-semibold bg-teal-50 px-2.5 py-1 rounded-full mb-2 inline-block">{(blog as any).category.name}</span>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 mt-2">
                      <span className="flex items-center gap-1"><Clock size={11} /> {blog.read_time} min read</span>
                      <span>{blog.published_at ? format(new Date(blog.published_at), 'MMM d, yyyy') : ''}</span>
                    </div>
                    <h2 className="font-bold text-gray-800 group-hover:text-[#C9A227] transition-colors mb-2 line-clamp-2 leading-snug">{blog.title}</h2>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">{blog.excerpt}</p>
                    <div className="flex items-center text-[#C9A227] text-sm font-semibold">
                      Read More <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
