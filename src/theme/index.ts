/**
 * Tema centralizado de CardTradr.
 * Se usa con React Native Paper PaperProvider.
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { colors, darkColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export { colors, darkColors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.danger,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceVariant,
    onPrimary: colors.textOnPrimary,
    onSurface: colors.text,
    onSurfaceVariant: colors.textSecondary,
    outline: colors.border,
  },
  custom: { colors, spacing, typography },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primaryLight,
    secondary: colors.secondaryLight,
    error: colors.dangerLight,
    background: darkColors.background,
    surface: darkColors.surface,
    surfaceVariant: darkColors.surfaceVariant,
    onPrimary: colors.textOnPrimary,
    onSurface: darkColors.text,
    onSurfaceVariant: darkColors.textSecondary,
    outline: darkColors.border,
  },
  custom: { colors: darkColors, spacing, typography },
};
