const { Lead } = require('../models');
const { sendEmail, leadNotificationTemplate } = require('../utils/mailer');

const knowledgeBase = {
  greetings: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'namaste'],
  ivf: ['ivf', 'in vitro', 'test tube baby', 'ivf treatment'],
  iui: ['iui', 'intrauterine insemination'],
  icsi: ['icsi', 'intracytoplasmic'],
  cost: ['cost', 'price', 'fee', 'charges', 'how much', 'rate'],
  success: ['success rate', 'success', 'chances', 'probability'],
  appointment: ['appointment', 'book', 'schedule', 'consult', 'consultation', 'meet doctor'],
  location: ['location', 'centre', 'center', 'clinic', 'address', 'where', 'pune', 'mumbai', 'delhi', 'bangalore', 'hyderabad'],
  doctor: ['doctor', 'specialist', 'expert', 'gynaecologist', 'gynecologist'],
  pcos: ['pcos', 'polycystic', 'irregular periods', 'hormones'],
  male: ['male infertility', 'sperm', 'low sperm', 'azoospermia', 'male factor'],
};

const getResponse = (message) => {
  const lower = message.toLowerCase();

  if (knowledgeBase.greetings.some((g) => lower.includes(g))) {
    return { message: "Hello! Welcome to IVFMedIndia 👋 I'm your fertility assistant. How can I help you today?\n\n• 🧬 IVF Treatment\n• 💊 PCOS Treatment\n• 👨‍⚕️ Book Appointment\n• 📍 Find a Centre\n• 💰 Treatment Cost", type: 'greeting' };
  }
  if (knowledgeBase.cost.some((k) => lower.includes(k))) {
    return { message: "💰 **Treatment Costs at IVFMedIndia:**\n\n• IVF: ₹80,000 - ₹1,50,000/cycle\n• ICSI: ₹90,000 - ₹1,60,000/cycle\n• IUI: ₹8,000 - ₹25,000/cycle\n• Egg Freezing: ₹50,000 - ₹1,00,000\n\n*Costs may vary based on protocol. Book a free consultation for exact pricing.*", type: 'cost' };
  }
  if (knowledgeBase.success.some((k) => lower.includes(k))) {
    return { message: "📊 **IVFMedIndia Success Rates:**\n\n• Overall IVF: 65-70% per cycle\n• Under 35 years: Up to 72%\n• ICSI: 60-65% per cycle\n• Cumulative (3 cycles): 85%+\n\n*India's highest success rates, NABH accredited.*", type: 'success_rate' };
  }
  if (knowledgeBase.appointment.some((k) => lower.includes(k))) {
    return { message: "📅 **Book Your Free Consultation**\n\nShare your details and we'll schedule your appointment:\n\nPlease provide:\n1. Your Name\n2. Phone Number\n3. Preferred City\n4. Preferred Date", type: 'appointment_lead', collectInfo: true };
  }
  if (knowledgeBase.ivf.some((k) => lower.includes(k))) {
    return { message: "🧬 **IVF Treatment at IVFMedIndia**\n\nIVF (In Vitro Fertilization) is our most successful fertility treatment:\n\n✅ 65-70% success rate per cycle\n✅ State-of-the-art embryology lab\n✅ Expert IVF specialists\n✅ Personalized protocols\n✅ Emotional support throughout\n\nWould you like to book a FREE consultation?", type: 'ivf' };
  }
  if (knowledgeBase.pcos.some((k) => lower.includes(k))) {
    return { message: "🌸 **PCOS Treatment at IVFMedIndia**\n\nPCOS is the most common cause of female infertility. Our approach:\n\n✅ Complete hormonal evaluation\n✅ Lifestyle management\n✅ Ovulation induction\n✅ IUI or IVF if needed\n✅ 60-70% success rate with PCOS\n\nBook a FREE consultation today!", type: 'pcos' };
  }
  if (knowledgeBase.location.some((k) => lower.includes(k))) {
    return { message: "📍 **IVFMedIndia Centres:**\n\n• 🏥 Pune: Baner, Kharadi, Hinjewadi\n• 🏥 Mumbai: Andheri\n• 🏥 Delhi: South Delhi\n• 🏥 Bangalore: Koramangala\n• 🏥 Hyderabad: Banjara Hills\n\nCall: +91 8888 888 888\nAll centres open Mon-Sat, 9AM-8PM", type: 'location' };
  }
  if (knowledgeBase.doctor.some((k) => lower.includes(k))) {
    return { message: "👩‍⚕️ **Our Expert Doctors:**\n\n• Dr. Priya Sharma - 18+ yrs (IVF Specialist)\n• Dr. Rajesh Malhotra - 15 yrs (Andrology)\n• Dr. Anjali Desai - 12 yrs (PCOS Expert)\n• Dr. Vikram Nair - 14 yrs (Embryologist)\n\nAll trained at top international institutes. Book a consultation!", type: 'doctor' };
  }

  return { message: "I'm here to help with your fertility journey! 💙\n\nI can assist with:\n• 🧬 Treatment information\n• 💰 Cost & pricing\n• 📊 Success rates\n• 📅 Booking appointments\n• 📍 Finding our centres\n\nOr call us: **+91 8888 888 888**", type: 'default' };
};

const chat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message required' });

    const response = getResponse(message);
    res.json({ success: true, response, sessionId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Chatbot error' });
  }
};

const submitChatLead = async (req, res) => {
  try {
    const { name, phone, email, city, message } = req.body;
    const lead = await Lead.create({ name, phone, email, city, message, source: 'chatbot' });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Chatbot Lead: ${name} - ${phone}`,
      html: leadNotificationTemplate({ name, phone, email, message, source: 'Chatbot', location: city }),
    });

    res.status(201).json({ success: true, message: "Thank you! Our team will call you within 30 minutes. 📞", lead: { id: lead.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save lead' });
  }
};

module.exports = { chat, submitChatLead };
