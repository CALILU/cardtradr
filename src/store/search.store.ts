/**
 * Store de busqueda con persistencia en AsyncStorage.
 * Historial de busqueda + preferencias de ordenacion.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SortOption } from '../utils/cardFilters';

const MAX_HISTORY = 10;

interface SearchState {
  // Ordenacion (persiste)
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;

  // Historial de busqueda (persiste)
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  removeSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      sortOption: { field: 'number', direction: 'asc' },
      setSortOption: (option) => set({ sortOption: option }),

      searchHistory: [],
      addSearchTerm: (term) =>
        set((s) => {
          const filtered = s.searchHistory.filter((t) => t !== term);
          return { searchHistory: [term, ...filtered].slice(0, MAX_HISTORY) };
        }),
      removeSearchTerm: (term) =>
        set((s) => ({
          searchHistory: s.searchHistory.filter((t) => t !== term),
        })),
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'cardtradr-search',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
