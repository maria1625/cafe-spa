import { create } from 'zustand';
import { cafeApi, favoriteApi } from '../api/api';

export const useCoffeeStore = create((set, get) => ({
  cafes: [],
  cart: [],
  favorites: [],
  loading: false,
  error: null,

  // --- ACCIONES ASÍNCRONAS (API) ---
  
  fetchCafes: async () => {
    set({ loading: true, error: null });
    try {
      const cafes = await cafeApi.getCafes();
      set({ cafes, loading: false });
    } catch (err) {
      set({ error: "Error al cargar el catálogo", loading: false });
    }
  },

  fetchFavorites: async (email) => {
    if (!email) return;
    try {
      const favorites = await favoriteApi.getFavorites(email);
      set({ favorites });
    } catch (err) {
      console.error("Error al cargar favoritos", err);
    }
  },

  toggleFavorite: async (id, email) => {
    if (!email) return;
    try {
      const updatedFavorites = await favoriteApi.toggle(email, id);
      set({ favorites: updatedFavorites });
    } catch (err) {
      console.error("Error al actualizar favorito", err);
    }
  },

  voteCoffee: async (id) => {
    try {
      const updatedCafe = await cafeApi.vote(id);
      set((state) => ({
        cafes: state.cafes.map(c => c.id === id ? updatedCafe : c)
      }));
    } catch (err) {
      console.error("Error al votar", err);
    }
  },

  addReview: async (id, reviewData) => {
    try {
      const updatedCafe = await cafeApi.addReview(id, reviewData);
      set((state) => ({
        cafes: state.cafes.map(c => c.id === id ? updatedCafe : c)
      }));
    } catch (err) {
      console.error("Error al añadir reseña", err);
    }
  },

  // --- ACCIONES SÍNCRONAS (UI) ---

  addToCart: (cafe) => set((state) => {
    const exists = state.cart.find(item => item.id === cafe.id);
    if (exists) {
      return {
        cart: state.cart.map(item => 
          item.id === cafe.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...cafe, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => {
    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      return {
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      };
    }
    return {
      cart: state.cart.filter(item => item.id !== id)
    };
  }),

  clearItemFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
}));
