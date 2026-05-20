import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AppointmentModal from '@/components/common/AppointmentModal';
import FloatingButtons from '@/components/common/FloatingButtons';
import Chatbot from '@/components/common/Chatbot';
import { motion } from 'framer-motion';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />

      {/* Global modals & floating UI */}
      <AppointmentModal />
      <FloatingButtons />
      <Chatbot />
    </div>
  );
}
