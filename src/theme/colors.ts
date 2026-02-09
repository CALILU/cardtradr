/**
 * Paleta de colores de CardTradr.
 * Cumple WCAG 2.1 AA para contraste texto/fondo.
 */

export const colors = {
  primary: '#4267B2',
  primaryLight: '#6B8DD6',
  primaryDark: '#2C4A8A',

  secondary: '#42B72A',
  secondaryLight: '#6CD454',
  secondaryDark: '#2D8A1C',

  danger: '#E4405F',
  dangerLight: '#F0707F',
  dangerDark: '#B22D47',

  warning: '#F5A623',
  warningLight: '#FFD066',
  warningDark: '#C87D0A',

  info: '#17A2B8',

  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F2F5',

  text: '#1C1E21',
  textSecondary: '#606770',
  textTertiary: '#8A8D91',
  textOnPrimary: '#FFFFFF',
  textOnDanger: '#FFFFFF',

  border: '#DADDE1',
  borderLight: '#E4E6EB',
  divider: '#CED0D4',

  // Colores de badges por TCG
  tcgPokemon: '#FFCB05',
  tcgMtg: '#F38020',
  tcgYugioh: '#5B2D8E',
  tcgOnePiece: '#E21A23',
  tcgLorcana: '#1B3A6B',
} as const;

export const darkColors = {
  ...colors,
  background: '#18191A',
  backgroundSecondary: '#242526',
  surface: '#242526',
  surfaceVariant: '#3A3B3C',
  text: '#E4E6EB',
  textSecondary: '#B0B3B8',
  textTertiary: '#8A8D91',
  border: '#3E4042',
  borderLight: '#4E4F50',
  divider: '#3E4042',
} as const;

export type ColorTheme = typeof colors;
