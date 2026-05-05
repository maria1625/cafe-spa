import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  filters: {
    availability: false,
    sortBy: "name",
    onlyFavorites: false,
  },
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  clearFilters: () => set({
    filters: {
      availability: false,
      sortBy: "name",
      onlyFavorites: false,
    }
  }),

  updateFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
}));
