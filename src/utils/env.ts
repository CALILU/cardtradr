/**
 * Acceso seguro a variables de entorno.
 * Expo usa el prefijo EXPO_PUBLIC_ para exponer variables al cliente.
 */

export const TCGAPIS_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_TCGAPIS_BASE_URL || 'https://api.tcgapis.com/api/v1',
  apiKey: process.env.EXPO_PUBLIC_TCGAPIS_API_KEY || '',
} as const;

export const SUPABASE_CONFIG = {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
} as const;

/** Valida que las variables de entorno criticas esten configuradas */
export function validateEnv(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!TCGAPIS_CONFIG.apiKey) missing.push('EXPO_PUBLIC_TCGAPIS_API_KEY');
  if (!SUPABASE_CONFIG.url) missing.push('EXPO_PUBLIC_SUPABASE_URL');
  if (!SUPABASE_CONFIG.anonKey) missing.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');

  return { isValid: missing.length === 0, missing };
}
