import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useAuthStore } from '../store/auth.store';
import { useSettingsStore } from '../store/settings.store';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import { LoadingScreen, OfflineBanner } from '../components';
import { colors, darkColors } from '../theme';

// Navigation themes que coinciden con Paper themes
const navLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

const navDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primaryLight,
    background: darkColors.background,
    card: darkColors.surface,
    text: darkColors.text,
    border: darkColors.border,
  },
};

export default function RootNavigator() {
  const { session, isInitialized } = useAuthStore();
  const isDarkMode = useSettingsStore((s) => s.isDarkMode);
  const onboardingCompleted = useSettingsStore((s) => s.onboardingCompleted);

  // Mientras se restaura la sesion, mostrar loading
  if (!isInitialized) {
    return <LoadingScreen message="Cargando CardTradr..." />;
  }

  // Onboarding antes de auth
  if (!onboardingCompleted) {
    return <OnboardingScreen />;
  }

  return (
    <View style={rootStyles.flex}>
      <OfflineBanner />
      <NavigationContainer theme={isDarkMode ? navDarkTheme : navLightTheme}>
        {session ? <AppTabs /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
}

const rootStyles = StyleSheet.create({
  flex: { flex: 1 },
});
