import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/auth.store';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import { LoadingScreen } from '../components';

export default function RootNavigator() {
  const { session, isInitialized } = useAuthStore();

  // Mientras se restaura la sesion, mostrar loading
  if (!isInitialized) {
    return <LoadingScreen message="Cargando CardTradr..." />;
  }

  return (
    <NavigationContainer>{session ? <AppTabs /> : <AuthStack />}</NavigationContainer>
  );
}
