import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, UserCheck, MapPin, Stethoscope,
  FileText, Star, HelpCircle, Settings, Bell, Menu, X, LogOut,
  MessageSquare, BarChart3, Image,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Leads', path: '/admin/leads' },
  { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
  { icon: UserCheck, label: 'Doctors', path: '/admin/doctors' },
  { icon: MapPin, label: 'Locations', path: '/admin/locations' },
  { icon: Stethoscope, label: 'Treatments', path: '/admin/treatments' },
  { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
  { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' },
  { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
  { icon: Image, label: 'Banners', path: '/admin/banners' },
  { icon: BarChart3, label: 'SEO', path: '/admin/seo' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logoutAdmin, unreadNotifications } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-40 w-64 min-h-screen bg-gray-900 text-white flex flex-col shadow-2xl"
          >
            {/* Logo */}
            <div className="p-5 border-b border-gray-700">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[#4E9FA3] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">I</span>
                </div>
                <div>
                  <div className="font-bold text-white font-heading">IVFMedIndia</div>
                  <div className="text-gray-400 text-xs">Admin Panel</div>
                </div>
              </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 overflow-y-auto">
              {navItems.map(({ icon: Icon, label, path }) => {
                const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all duration-150 ${
                      active
                        ? 'bg-[#4E9FA3] text-white shadow-md'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={17} /> {label}
                  </Link>
                );
              })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-[#4E9FA3] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {admin?.name?.[0] || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</div>
                  <div className="text-gray-400 text-xs capitalize">{admin?.role?.replace('_', ' ') || 'Admin'}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm transition-colors">
                <LogOut size={15} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell size={18} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-7 h-7 bg-teal-100 text-[#3A7F83] rounded-full flex items-center justify-center font-semibold text-xs">
                {admin?.name?.[0] || 'A'}
              </div>
              {admin?.name}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
