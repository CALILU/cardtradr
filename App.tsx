/**
 * CardTradr - Punto de entrada de la aplicacion.
 *
 * Gestion de colecciones de cartas TCG (50+ juegos).
 * Stack: React Native + Expo + TypeScript + Supabase + TCGAPIs.
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from './src/theme';
import { validateEnv } from './src/utils/env';

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
  useEffect(() => {
    const envCheck = validateEnv();
    if (!envCheck.isValid) {
      console.warn(
        `[CardTradr] Variables de entorno faltantes: ${envCheck.missing.join(', ')}`,
      );
    }
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container}>
            <Text style={styles.title}>CardTradr</Text>
            <Text style={styles.subtitle}>Tu coleccion de cartas TCG</Text>
            <Text style={styles.info}>50+ juegos soportados</Text>
            <StatusBar style="auto" />
          </View>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4267B2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#606770',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#8A8D91',
  },
});
