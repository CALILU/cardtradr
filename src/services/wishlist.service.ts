/**
 * Servicio de wishlist.
 * CRUD para wishlists en Supabase.
 */

import { supabase } from '../api/supabase.client';
import type { WishlistItem } from '../types';

// ============================================================
// Wishlist Items
// ============================================================

/** Obtener toda la wishlist del usuario */
export async function getWishlist(): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Agregar carta a wishlist */
export async function addToWishlist(params: {
  card_id: string;
  tcg_type: string;
  card_name: string;
  priority?: number;
  max_price?: number;
  notes?: string;
  cached_image_url?: string;
}): Promise<WishlistItem> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const { data, error } = await supabase
    .from('wishlists')
    .insert({ ...params, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Actualizar item de wishlist */
export async function updateWishlistItem(
  id: string,
  updates: {
    priority?: number;
    max_price?: number | null;
    notes?: string | null;
  },
): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from('wishlists')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Eliminar item de wishlist */
export async function removeFromWishlist(id: string): Promise<void> {
  const { error } = await supabase.from('wishlists').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Stats
// ============================================================

/** Estadisticas de wishlist para HomeScreen */
export async function getWishlistStats(): Promise<{
  totalItems: number;
}> {
  const { count, error } = await supabase
    .from('wishlists')
    .select('id', { count: 'exact', head: true });
  if (error) throw error;
  return { totalItems: count ?? 0 };
}
