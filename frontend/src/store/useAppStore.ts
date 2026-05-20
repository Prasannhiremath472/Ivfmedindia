import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile_image?: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions?: object;
}

interface AppState {
  // Auth
  user: User | null;
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;

  // UI
  isMobileMenuOpen: boolean;
  isAppointmentModalOpen: boolean;
  isChatbotOpen: boolean;
  selectedTreatment: string | null;
  selectedLocation: string | null;

  // Notifications
  unreadNotifications: number;

  // Actions
  setUser: (user: User | null, token: string | null) => void;
  setAdmin: (admin: Admin | null, token: string | null) => void;
  logout: () => void;
  logoutAdmin: () => void;
  setMobileMenu: (open: boolean) => void;
  setAppointmentModal: (open: boolean, treatment?: string, location?: string) => void;
  setChatbot: (open: boolean) => void;
  setUnreadNotifications: (count: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      admin: null,
      token: null,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      isMobileMenuOpen: false,
      isAppointmentModalOpen: false,
      isChatbotOpen: false,
      selectedTreatment: null,
      selectedLocation: null,
      unreadNotifications: 0,

      setUser: (user, token) => set({ user, token, isAuthenticated: !!user }),
      setAdmin: (admin, token) => {
        if (token) localStorage.setItem('token', token);
        set({ admin, isAdminAuthenticated: !!admin });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      logoutAdmin: () => {
        localStorage.removeItem('token');
        set({ admin: null, isAdminAuthenticated: false });
      },
      setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
      setAppointmentModal: (open, treatment, location) =>
        set({ isAppointmentModalOpen: open, selectedTreatment: treatment || null, selectedLocation: location || null }),
      setChatbot: (open) => set({ isChatbotOpen: open }),
      setUnreadNotifications: (count) => set({ unreadNotifications: count }),
    }),
    {
      name: 'ivfmedindia-store',
      partialize: (state) => ({ user: state.user, admin: state.admin, token: state.token, isAuthenticated: state.isAuthenticated, isAdminAuthenticated: state.isAdminAuthenticated }),
    }
  )
);
