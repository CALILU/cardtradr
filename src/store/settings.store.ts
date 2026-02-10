/**
 * Store de configuraciones con persistencia en AsyncStorage.
 * Zustand + persist middleware.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cardViewMode: 'list' | 'grid';
  toggleCardViewMode: () => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
      cardViewMode: 'list' as const,
      toggleCardViewMode: () =>
        set((s) => ({ cardViewMode: s.cardViewMode === 'list' ? 'grid' : 'list' })),
      onboardingCompleted: false,
      setOnboardingCompleted: () => set({ onboardingCompleted: true }),
    }),
    {
      name: 'cardtradr-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
