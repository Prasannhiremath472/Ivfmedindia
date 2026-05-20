import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { chatbotApi, leadApi } from '@/services/api';
import { PHONE } from '@/utils/constants';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  time: string;
}

const initMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: "👋 Hi! Welcome to IVFMedIndia.\n\nI can help you with:\n• 🧬 IVF & fertility treatments\n• 💰 Treatment costs\n• 📊 Success rates\n• 📅 Book appointments\n• 📍 Find our centres\n\nHow can I help you today?",
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function Chatbot() {
  const { isChatbotOpen, setChatbot } = useAppStore();
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '' });
  const [leadDone, setLeadDone] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const addBotMsg = (text: string) => {
    setMessages(p => [...p, { id: Date.now().toString(), type: 'bot', text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(p => [...p, { id: Date.now().toString(), type: 'user', text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await chatbotApi.sendMessage(text);
      setTimeout(() => {
        setIsTyping(false);
        addBotMsg(res.data.response.message);
        if (res.data.response.collectInfo) setTimeout(() => setShowLeadForm(true), 600);
      }, 900);
    } catch {
      setTimeout(() => {
        setIsTyping(false);
        addBotMsg(`I'd love to help! Call us directly at ${PHONE} 📞`);
      }, 900);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadData.name || !leadData.phone) return;
    try { await leadApi.create({ ...leadData, source: 'chatbot' }); } catch { /* ok */ }
    setLeadDone(true);
    setShowLeadForm(false);
    addBotMsg(`Thank you ${leadData.name}! 🎉\nOur specialist will call ${leadData.phone} within 30 minutes.\n\nYou can also reach us at ${PHONE}`);
  };

  const quickReplies = ['IVF Cost', 'Success Rate', 'Book Appointment', 'Our Centres'];

  return (
    <AnimatePresence>
      {isChatbotOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          style={{ maxHeight: '560px' }}
        >
          {/* Header */}
          <div className="bg-[#4E9FA3] px-4 py-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm">IVF Assistant</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white/75 text-xs">Online · IVFMedIndia</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={`tel:${PHONE}`} className="text-white/75 hover:text-white p-1 transition-colors">
                <Phone size={16} />
              </a>
              <button onClick={() => setChatbot(false)} className="text-white/75 hover:text-white p-1 transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ maxHeight: '320px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.type === 'user'
                    ? 'bg-[#4E9FA3] text-white rounded-tr-sm'
                    : 'bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.type === 'user' ? 'text-white/60 text-right' : 'text-gray-400'}`}>{msg.time}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 shadow-sm border border-gray-100">
                  {[0,1,2].map(i => <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}

            {showLeadForm && !leadDone && (
              <div className="bg-[#f0f9fa] rounded-2xl p-3.5 border border-[#d9f0f1]">
                <p className="text-sm font-semibold text-gray-700 mb-2.5">📝 Get a callback from our specialist:</p>
                <input className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 mb-2 outline-none focus:border-[#4E9FA3] bg-white" placeholder="Your Name" value={leadData.name} onChange={e => setLeadData(d => ({ ...d, name: e.target.value }))} />
                <input className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 mb-2.5 outline-none focus:border-[#4E9FA3] bg-white" placeholder="Phone Number" value={leadData.phone} onChange={e => setLeadData(d => ({ ...d, phone: e.target.value }))} />
                <button onClick={handleLeadSubmit} className="w-full bg-[#4E9FA3] hover:bg-[#3A7F83] text-white text-sm py-2.5 rounded-xl font-bold transition-colors">
                  Request Callback
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 pt-2.5 flex gap-2 flex-wrap bg-white border-t border-gray-100">
            {quickReplies.map(r => (
              <button key={r} onClick={() => sendMessage(r)} className="text-xs bg-[#f0f9fa] text-[#4E9FA3] border border-[#d9f0f1] rounded-full px-3 py-1 hover:bg-[#d9f0f1] transition-colors font-medium mb-1">
                {r}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                placeholder="Ask about IVF, cost, centres..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim()} className="text-[#4E9FA3] hover:text-[#3A7F83] disabled:opacity-30 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
