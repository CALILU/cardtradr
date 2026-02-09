/**
 * Cliente de Supabase para CardTradr.
 *
 * Antes de usar:
 * 1. Crear proyecto en https://supabase.com
 * 2. Ejecutar supabase/schema.sql en SQL Editor
 * 3. Copiar URL y anon key al .env
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Platform } from 'react-native';
import { SUPABASE_CONFIG } from '../utils/env';

export const supabase = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

/** Auto-refresh de tokens segun estado de la app (foreground/background) */
export function setupAuthAutoRefresh(): void {
  if (Platform.OS === 'web') return;

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
