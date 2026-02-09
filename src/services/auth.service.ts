/**
 * Servicio de autenticacion.
 * Wrapper sobre supabase.auth para que las pantallas
 * no importen supabase directamente.
 */

import { supabase } from '../api/supabase.client';

/** Iniciar sesion con email y password */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** Registrar nuevo usuario */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

/** Cerrar sesion */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Obtener sesion actual */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}
