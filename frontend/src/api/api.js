import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Configuración de la instancia de Axios
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

// Interceptor para inyectar el token en las peticiones
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('cafe_user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Separando funciones de consumo
export const authApi = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
};

export const cafeApi = {
  getCafes: async () => {
    const response = await api.get("/cafes");
    return response.data;
  },
  vote: async (id) => {
    const response = await api.post(`/cafes/${id}/vote`);
    return response.data;
  },
  addReview: async (id, reviewData) => {
    const response = await api.post(`/cafes/${id}/reviews`, reviewData);
    return response.data;
  },
};

export const favoriteApi = {
  getFavorites: async (email) => {
    const response = await api.get(`/favorites/${email}`);
    return response.data;
  },
  toggle: async (email, cafeId) => {
    const response = await api.post("/favorites/toggle", { email, cafeId });
    return response.data;
  },
};

export default api;
