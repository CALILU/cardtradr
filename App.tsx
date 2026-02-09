/**
 * CardTradr - Punto de entrada de la aplicacion.
 *
 * Gestion de colecciones de cartas TCG (50+ juegos).
 * Stack: React Native + Expo + TypeScript + Supabase + TCGAPIs.
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from './src/theme';
import { validateEnv } from './src/utils/env';
import { setupAuthAutoRefresh } from './src/api/supabase.client';
import { useAuthStore } from './src/store/auth.store';
import { RootNavigator } from './src/navigation';

// React Query con defaults conservadores para 100 calls/dia
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 30 * 60 * 1000, // 30 minutos
    },
  },
});

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    const envCheck = validateEnv();
    if (!envCheck.isValid) {
      console.warn(
        `[CardTradr] Variables de entorno faltantes: ${envCheck.missing.join(', ')}`,
      );
    }
    initialize();
    setupAuthAutoRefresh();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <StatusBar style="auto" />
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
