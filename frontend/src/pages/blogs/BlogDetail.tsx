import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';
import { blogApi } from '@/services/api';
import { buildBreadcrumbSchema, SITE_URL } from '@/utils/seo';
import { format } from 'date-fns';
import { useAppStore } from '@/store/useAppStore';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setAppointmentModal } = useAppStore();

  useEffect(() => {
    blogApi.getBySlug(slug!).then(r => {
      setBlog(r.data.blog);
      setRelated(r.data.related || []);
    }).catch(() => {
      setBlog({
        title: 'What is IVF? A Complete Guide', slug, featured_image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=80',
        published_at: new Date().toISOString(), read_time: 8, author_name: 'Dr. Priya Sharma',
        author_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
        excerpt: 'Everything you need to know about IVF treatment.',
        content: `<h2>What is IVF?</h2><p>IVF (In Vitro Fertilization) is one of the most effective fertility treatments available today. At IVFMedIndia, we achieve a success rate of 65-70% per cycle.</p><h2>How does IVF work?</h2><p>The IVF process involves multiple steps: ovarian stimulation, egg retrieval, fertilization in our advanced embryology laboratory, embryo culture, and embryo transfer.</p><p>Our dedicated team of specialists guides you through every step with expertise and compassion.</p><h2>Who needs IVF?</h2><p>IVF is recommended for couples with blocked fallopian tubes, severe male infertility, unexplained infertility after other treatments, and more.</p>`,
        category: { name: 'IVF & Fertility' },
      });
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-teal-200 border-t-brand-600 rounded-full" /></div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog not found</div>;

  return (
    <>
      <SEOHead
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.excerpt || ''}
        canonicalPath={`/blogs/${slug}`}
        ogType="article"
        ogImage={blog.featured_image}
        schema={buildBreadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Blog', url: `${SITE_URL}/blogs` }, { name: blog.title, url: `${SITE_URL}/blogs/${slug}` }])}
      />

      <article>
        {/* Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />
          <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={13} />
              <Link to="/blogs" className="hover:text-white">Blog</Link>
              <ChevronRight size={13} />
              <span className="text-white truncate max-w-xs">{blog.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 mb-4 leading-tight">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                {blog.author_name && (
                  <div className="flex items-center gap-2">
                    {blog.author_image && <img src={blog.author_image} alt={blog.author_name} className="w-8 h-8 rounded-full object-cover" />}
                    <span>By <strong className="text-gray-700">{blog.author_name}</strong></span>
                  </div>
                )}
                <span className="flex items-center gap-1"><Calendar size={13} /> {blog.published_at ? format(new Date(blog.published_at), 'MMMM d, yyyy') : ''}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {blog.read_time} min read</span>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-5">
                <div className="bg-[#4E9FA3] rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2 font-heading">Book Free Consultation</h3>
                  <p className="text-white/80 text-sm mb-4">Speak with our IVF specialist today.</p>
                  <button onClick={() => setAppointmentModal(true)} className="w-full bg-white text-[#A67C00] font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm">
                    Book Appointment
                  </button>
                </div>

                {related.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-3">
                      {related.map((r: any) => (
                        <Link key={r.id} to={`/blogs/${r.slug}`} className="flex items-center gap-3 group hover:text-[#C9A227] transition-colors">
                          {r.featured_image && <img src={r.featured_image} alt={r.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-[#C9A227] line-clamp-2 leading-snug">{r.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{r.read_time} min read</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
