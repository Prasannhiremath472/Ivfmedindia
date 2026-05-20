import { useEffect, useState } from 'react';
import { Plus, Edit2, Eye, Trash2, Clock } from 'lucide-react';
import { blogApi } from '@/services/api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.getAll({ limit: 50 }).then(r => setBlogs(r.data.data || [])).catch(() => {
      setBlogs([
        { id: 1, title: 'What is IVF? A Complete Guide', slug: 'what-is-ivf', status: 'published', published_at: new Date().toISOString(), read_time: 8, views: 1234, featured_image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&q=80' },
        { id: 2, title: 'PCOS and Fertility', slug: 'pcos-fertility', status: 'draft', published_at: null, read_time: 6, views: 0, featured_image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&q=80' },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  const STATUS_COLORS: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-600',
    archived: 'bg-red-100 text-red-600',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Blog CMS</h1>
          <p className="text-gray-500 text-sm">{blogs.length} articles</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 font-black px-7 py-3 rounded-full text-white text-sm hover:-translate-y-0.5 transition-all text-sm py-2.5 px-5"><Plus size={15} /> New Article</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Article</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Status</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Published</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Views</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Loading...</td></tr>
              ) : blogs.map(blog => (
                <tr key={blog.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {blog.featured_image && <img src={blog.featured_image} alt="" className="w-12 h-9 rounded object-cover flex-shrink-0" loading="lazy" />}
                      <div>
                        <div className="font-medium text-gray-800 line-clamp-1">{blog.title}</div>
                        <div className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} /> {blog.read_time} min read</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[blog.status] || 'bg-gray-100 text-gray-600'}`}>{blog.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{blog.published_at ? format(new Date(blog.published_at), 'MMM d, yyyy') : '—'}</td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs font-medium">{blog.views?.toLocaleString() || 0}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs bg-teal-50 text-[#C9A227] px-2.5 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1">
                        <Edit2 size={11} /> Edit
                      </button>
                      <Link to={`/blogs/${blog.slug}`} target="_blank" className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-200 flex items-center gap-1">
                        <Eye size={11} /> View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
