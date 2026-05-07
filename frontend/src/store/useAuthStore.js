import { create } from 'zustand';
import { authApi } from '../api/api';

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem('cafe_user');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error("Error al parsear cafe_user:", e);
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const userData = response.data?.data?.user || response.data?.user || response.user || response;
      const token = response.data?.data?.token || response.data?.token || response.token;
      if (token) userData.token = token;
      
      localStorage.setItem('cafe_user', JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true, loading: false });
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || 'Credenciales inválidas';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('cafe_user');
    set({ user: null, isAuthenticated: false, error: null });
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.register(userData);
      const user = response.data?.data?.user || response.data?.user || response.user || response;
      const token = response.data?.data?.token || response.data?.token || response.token;
      if (token) user.token = token;
      
      localStorage.setItem('cafe_user', JSON.stringify(user));
      set({ user: user, isAuthenticated: true, loading: false });
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Error al registrarse';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },
}));