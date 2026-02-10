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
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
    }),
    {
      name: 'cardtradr-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
