import { create } from 'zustand';
import { Product } from '../types';

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  performSearch: (products: Product[]) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  performSearch: (products) => {
    set((state) => ({
      searchResults: products.filter((product) =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }));
  }
}));