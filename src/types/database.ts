/**
 * Tipos para las tablas de Supabase.
 * Corresponden al esquema en supabase/schema.sql
 */

// ============================================================
// Perfil de usuario
// ============================================================

export interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  preferred_tcg: string;
  created_at: string;
}

// ============================================================
// Colecciones
// ============================================================

export interface Collection {
  id: string;
  user_id: string;
  tcg_type: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
}

// ============================================================
// Cartas en coleccion
// ============================================================

export type CardCondition =
  | 'near_mint'
  | 'lightly_played'
  | 'moderately_played'
  | 'heavily_played'
  | 'damaged';

export interface CollectionCard {
  id: string;
  collection_id: string;
  card_id: string;
  tcg_type: string;
  card_name: string;
  set_name: string | null;
  quantity: number;
  condition: CardCondition;
  language: string;
  is_foil: boolean;
  is_favorite: boolean;
  notes: string | null;
  acquired_date: string | null;
  acquired_price: number | null;
  cached_price: number | null;
  cached_image_url: string | null;
  cached_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Lista de deseos (Wishlist)
// ============================================================

export interface WishlistItem {
  id: string;
  user_id: string;
  card_id: string;
  tcg_type: string;
  card_name: string;
  priority: 1 | 2 | 3 | 4 | 5;
  max_price: number | null;
  notes: string | null;
  cached_price: number | null;
  cached_image_url: string | null;
  cached_at: string | null;
  created_at: string;
}
