import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { blogApi } from '@/services/api';
import { format } from 'date-fns';

const fallback = [
  { id: 1, title: 'What is IVF? A Complete Step-by-Step Guide', slug: 'what-is-ivf-guide', featured_image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80', published_at: new Date().toISOString(), read_time: 8, excerpt: 'Everything you need to know about IVF — the process, success rates, costs and what to expect at each stage.', category: { name: 'IVF & Fertility' }, gold: true },
  { id: 2, title: 'PCOS and Fertility: How to Conceive with PCOS', slug: 'pcos-fertility-guide', featured_image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=700&q=80', published_at: new Date().toISOString(), read_time: 6, excerpt: 'PCOS affects 1 in 5 women. Here\'s how to manage PCOS and maximise your chances of a successful pregnancy.', category: { name: 'PCOS & Hormones' }, gold: false },
  { id: 3, title: '10 Signs You May Have a Fertility Problem', slug: '10-signs-fertility-issues', featured_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80', published_at: new Date().toISOString(), read_time: 5, excerpt: 'Recognising early signs of fertility issues can make a significant difference. Here are 10 signs to watch for.', category: { name: 'Expert Advice' }, gold: true },
];

export default function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [blogs, setBlogs] = useState<any[]>(fallback);

  useEffect(() => {
    blogApi.getFeatured().then(r => { if (r.data.data?.length) setBlogs(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">

      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]" />
              <span className="text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full text-white shadow-md"
                style={{ background: 'linear-gradient(135deg,#C9A227,#A67C00)' }}>
                Latest Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Expert{' '}
              <span style={{ background: 'linear-gradient(135deg,#7DC4C8,#4E9FA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Fertility Advice
              </span>
            </h2>
          </div>
          <Link to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
            style={{ borderColor: '#C9A227', color: '#C9A227' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#E8C547,#C9A227)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#C9A227'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A227'; }}>
            All Articles <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => {
            const isGold = (blog.gold ?? i % 2 === 0);
            return (
              <motion.div key={blog.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}>
                <Link to={`/blogs/${blog.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-2"
                  style={{
                    border: `1px solid ${isGold ? 'rgba(201,162,39,0.18)' : 'rgba(78,159,163,0.18)'}`,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = isGold ? '0 12px 40px rgba(201,162,39,0.25)' : '0 12px 40px rgba(78,159,163,0.25)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'}>

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={blog.featured_image} alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-20 group-hover:opacity-40"
                      style={{ background: isGold ? 'linear-gradient(135deg,#C9A227,#A67C00)' : 'linear-gradient(135deg,#4E9FA3,#3A7F83)' }} />

                    {/* Category pill */}
                    {blog.category && (
                      <div className="absolute top-3 left-3 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md"
                        style={{ background: isGold ? 'linear-gradient(135deg,#E8C547,#C9A227)' : 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}>
                        {blog.category.name}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} /> {blog.read_time} min read</span>
                      <span>·</span>
                      <span>{blog.published_at ? format(new Date(blog.published_at), 'MMM d, yyyy') : 'Recent'}</span>
                    </div>
                    <h3 className="font-black text-gray-900 leading-snug line-clamp-2 mb-3 transition-colors duration-200 group-hover:text-[#C9A227]">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-5 flex-1">{blog.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm font-black group-hover:gap-3 transition-all duration-200"
                      style={{ color: isGold ? '#C9A227' : '#4E9FA3' }}>
                      <BookOpen size={14} /> Read Article <ArrowRight size={13} />
                    </div>

                    {/* Animated bottom line */}
                    <div className="h-0.5 w-0 group-hover:w-full mt-4 rounded-full transition-all duration-500"
                      style={{ background: isGold ? 'linear-gradient(90deg,#E8C547,#C9A227)' : 'linear-gradient(90deg,#7DC4C8,#4E9FA3)' }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
