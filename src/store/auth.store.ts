/**
 * Store de autenticacion con Zustand.
 *
 * Escucha onAuthStateChange de Supabase para mantener
 * el estado sincronizado. No necesita persist porque
 * Supabase ya guarda la session en AsyncStorage.
 */

import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../api/supabase.client';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;

  /** Llamar una vez al montar la app */
  initialize: () => void;
  /** Cerrar sesion */
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isInitialized: false,

  initialize: () => {
    // onAuthStateChange se dispara inmediatamente con la session actual
    // (restaurada de AsyncStorage si existe)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
        isInitialized: true,
      });
    });
  },

  signOut: async () => {
    set({ isLoading: true });
    await supabase.auth.signOut();
    // onAuthStateChange se encarga de limpiar session/user
  },
}));
