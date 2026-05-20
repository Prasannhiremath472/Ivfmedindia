import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Treatments
export const treatmentApi = {
  getAll: (params?: object) => api.get('/treatments', { params }),
  getBySlug: (slug: string) => api.get(`/treatments/${slug}`),
  getCategories: () => api.get('/treatments/categories'),
};

// Doctors
export const doctorApi = {
  getAll: (params?: object) => api.get('/doctors', { params }),
  getBySlug: (slug: string) => api.get(`/doctors/${slug}`),
  getFeatured: () => api.get('/doctors', { params: { featured: true, limit: 6 } }),
};

// Blogs
export const blogApi = {
  getAll: (params?: object) => api.get('/blogs', { params }),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  getCategories: () => api.get('/blogs/categories'),
  getFeatured: () => api.get('/blogs', { params: { featured: true, limit: 3 } }),
};

// Locations
export const locationApi = {
  getAll: (params?: object) => api.get('/locations', { params }),
  getBySlug: (slug: string) => api.get(`/locations/${slug}`),
  getByCity: (city: string) => api.get(`/locations/city/${city}`),
  getFeatured: () => api.get('/locations', { params: { featured: true } }),
};

// Appointments
export const appointmentApi = {
  create: (data: object) => api.post('/appointments', data),
  getSlots: (params: object) => api.get('/appointments/slots', { params }),
  getById: (id: string) => api.get(`/appointments/${id}`),
};

// Leads
export const leadApi = {
  create: (data: object) => api.post('/leads', data),
};

// Testimonials
export const testimonialApi = {
  getAll: (params?: object) => api.get('/testimonials', { params }),
  getFeatured: () => api.get('/testimonials', { params: { featured: true, limit: 8 } }),
  getVideos: () => api.get('/testimonials', { params: { is_video: true } }),
};

// FAQ
export const faqApi = {
  getAll: (params?: object) => api.get('/faq', { params }),
  getFeatured: () => api.get('/faq', { params: { featured: true } }),
  getByTreatment: (treatmentId: number) => api.get('/faq', { params: { treatment_id: treatmentId } }),
};

// SEO
export const seoApi = {
  getByPath: (path: string) => api.get('/seo', { params: { path } }),
};

// Contact / Admin
export const contactApi = {
  submit: (data: object) => api.post('/admin/contact', data),
  getSuccessStories: (params?: object) => api.get('/admin/success-stories', { params }),
  getBanners: () => api.get('/admin/banners'),
};

// Chatbot
export const chatbotApi = {
  sendMessage: (message: string, sessionId?: string) => api.post('/chatbot/message', { message, sessionId }),
  submitLead: (data: object) => api.post('/chatbot/lead', data),
};

// Auth
export const authApi = {
  login: (data: object) => api.post('/auth/login', data),
  register: (data: object) => api.post('/auth/register', data),
  adminLogin: (data: object) => api.post('/auth/admin/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Admin
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getLeads: (params?: object) => api.get('/leads', { params }),
  updateLead: (id: number, data: object) => api.put(`/leads/${id}`, data),
  getLeadStats: () => api.get('/leads/stats'),
  getAppointments: (params?: object) => api.get('/appointments', { params }),
  updateAppointment: (id: number, data: object) => api.put(`/appointments/${id}/status`, data),
  getNotifications: () => api.get('/admin/notifications'),
  markNotificationsRead: () => api.put('/admin/notifications/read'),
  getContacts: () => api.get('/admin/contacts'),
  createDoctor: (data: FormData) => api.post('/doctors', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateDoctor: (id: number, data: FormData) => api.put(`/doctors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  createBlog: (data: FormData) => api.post('/blogs', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateBlog: (id: number, data: FormData) => api.put(`/blogs/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getSeoList: () => api.get('/seo/all'),
  saveSeo: (data: object) => api.post('/seo', data),
};

export default api;
