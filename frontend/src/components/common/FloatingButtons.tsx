import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { PHONE, WHATSAPP } from '@/utils/constants';

const WA_URL = `https://wa.me/${WHATSAPP}?text=Hi%20IVFMedIndia%2C%20I%20want%20to%20know%20about%20IVF%20treatment`;

export default function FloatingButtons() {
  const { isChatbotOpen, setChatbot } = useAppStore();
  const [showCallOptions, setShowCallOptions] = useState(false);

  return (
    <div className="fixed right-5 bottom-8 z-50 flex flex-col items-center gap-3">

      {/* Call options popup */}
      <AnimatePresence>
        {showCallOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-56 mb-1"
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Contact Us</p>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors mb-1"
            >
              <div className="w-8 h-8 bg-[#4E9FA3] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-700">Call Us</div>
                <div className="text-xs text-gray-500">{PHONE}</div>
              </div>
            </a>
            <a
              href={WA_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-700">WhatsApp</div>
                <div className="text-xs text-gray-500">Chat with us</div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button — top */}
      <motion.a
        href={WA_URL}
        target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200"
        style={{ background: '#25d366' }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25" />
      </motion.a>

      {/* Chat / AI bot button — middle */}
      <motion.button
        onClick={() => setChatbot(!isChatbotOpen)}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200"
        style={{ background: 'linear-gradient(135deg,#7DC4C8,#4E9FA3)' }}
        aria-label="Chat"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </motion.button>

      {/* Phone button — bottom */}
      <motion.button
        onClick={() => setShowCallOptions(v => !v)}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200"
        style={{ background: 'linear-gradient(135deg,#E8C547,#C9A227)', boxShadow: '0 6px 20px rgba(201,162,39,0.45)' }}
        aria-label="Call"
      >
        <Phone size={22} className="text-white" />
      </motion.button>
    </div>
  );
}
