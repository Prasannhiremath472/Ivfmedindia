import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { useAppStore } from '@/store/useAppStore';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const AboutUs = lazy(() => import('@/pages/about/AboutUs'));
const OurStory = lazy(() => import('@/pages/about/OurStory'));
const ManagementTeam = lazy(() => import('@/pages/about/ManagementTeam'));
const MissionVision = lazy(() => import('@/pages/about/MissionVision'));
const AwardsRecognition = lazy(() => import('@/pages/about/AwardsRecognition'));
const TechnologyLabs = lazy(() => import('@/pages/about/TechnologyLabs'));
const TreatmentPage = lazy(() => import('@/pages/treatments/TreatmentPage'));
const Doctors = lazy(() => import('@/pages/doctors/Doctors'));
const DoctorProfile = lazy(() => import('@/pages/doctors/DoctorProfile'));
const Blogs = lazy(() => import('@/pages/blogs/Blogs'));
const BlogDetail = lazy(() => import('@/pages/blogs/BlogDetail'));
const CityPage = lazy(() => import('@/pages/locations/CityPage'));
const ClinicPage = lazy(() => import('@/pages/locations/ClinicPage'));
const PatientTestimonials = lazy(() => import('@/pages/patient/PatientTestimonials'));
const VideoTestimonials = lazy(() => import('@/pages/patient/VideoTestimonials'));
const SuccessStories = lazy(() => import('@/pages/patient/SuccessStories'));
const FAQ = lazy(() => import('@/pages/patient/FAQ'));
const ContactUs = lazy(() => import('@/pages/patient/ContactUs'));
const BookAppointment = lazy(() => import('@/pages/patient/BookAppointment'));

// Admin pages
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminLeads = lazy(() => import('@/pages/admin/Leads'));
const AdminAppointments = lazy(() => import('@/pages/admin/Appointments'));
const AdminDoctors = lazy(() => import('@/pages/admin/Doctors'));
const AdminBlogs = lazy(() => import('@/pages/admin/Blogs'));
const AdminTestimonials = lazy(() => import('@/pages/admin/Testimonials'));
const AdminSEO = lazy(() => import('@/pages/admin/SEO'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 border-4 border-teal-200 border-t-[#4E9FA3] rounded-full animate-spin" />
      <p className="text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAdminAuthenticated } = useAppStore();
  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/management-team" element={<ManagementTeam />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/awards-and-recognition" element={<AwardsRecognition />} />
            <Route path="/technology-and-labs" element={<TechnologyLabs />} />

            {/* Treatments */}
            <Route path="/treatments/:slug" element={<TreatmentPage />} />

            {/* Doctors */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:slug" element={<DoctorProfile />} />

            {/* Blogs */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            {/* Locations */}
            <Route path="/ivf-centre/:city" element={<CityPage />} />
            <Route path="/ivf-centre/:city/:clinic" element={<ClinicPage />} />

            {/* Patient */}
            <Route path="/patient-testimonials" element={<PatientTestimonials />} />
            <Route path="/video-testimonials" element={<VideoTestimonials />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<AdminGuard><AdminLayout /></AdminGuard>}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="seo" element={<AdminSEO />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
