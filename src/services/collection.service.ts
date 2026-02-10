/**
 * Servicio de colecciones.
 * CRUD para collections y collection_cards en Supabase.
 */

import { supabase } from '../api/supabase.client';
import type { Collection, CollectionCard } from '../types';

// ============================================================
// Collections
// ============================================================

/** Obtener todas las colecciones del usuario */
export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Crear nueva coleccion */
export async function createCollection(params: {
  name: string;
  tcg_type: string;
  description?: string;
}): Promise<Collection> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const { data, error } = await supabase
    .from('collections')
    .insert({ ...params, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Actualizar coleccion */
export async function updateCollection(
  collectionId: string,
  updates: { name?: string; description?: string | null },
): Promise<Collection> {
  const { data, error } = await supabase
    .from('collections')
    .update(updates)
    .eq('id', collectionId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Eliminar coleccion */
export async function deleteCollection(collectionId: string): Promise<void> {
  const { error } = await supabase.from('collections').delete().eq('id', collectionId);
  if (error) throw error;
}

// ============================================================
// Collection Cards
// ============================================================

/** Obtener cartas de una coleccion */
export async function getCollectionCards(collectionId: string): Promise<CollectionCard[]> {
  const { data, error } = await supabase
    .from('collection_cards')
    .select('*')
    .eq('collection_id', collectionId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Agregar carta a coleccion */
export async function addCardToCollection(params: {
  collection_id: string;
  card_id: string;
  tcg_type: string;
  card_name: string;
  set_name?: string;
  cached_image_url?: string;
}): Promise<CollectionCard> {
  const { data, error } = await supabase
    .from('collection_cards')
    .insert(params)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Actualizar carta en coleccion */
export async function updateCollectionCard(
  cardId: string,
  updates: { quantity?: number; condition?: string; notes?: string | null },
): Promise<CollectionCard> {
  const { data, error } = await supabase
    .from('collection_cards')
    .update(updates)
    .eq('id', cardId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Eliminar carta de coleccion */
export async function removeCardFromCollection(cardId: string): Promise<void> {
  const { error } = await supabase.from('collection_cards').delete().eq('id', cardId);
  if (error) throw error;
}

// ============================================================
// Stats
// ============================================================

/** Estadisticas para el HomeScreen */
export async function getCollectionStats(): Promise<{
  totalCollections: number;
  totalCards: number;
}> {
  const [collections, cards] = await Promise.all([
    supabase.from('collections').select('id', { count: 'exact', head: true }),
    supabase.from('collection_cards').select('id', { count: 'exact', head: true }),
  ]);
  return {
    totalCollections: collections.count ?? 0,
    totalCards: cards.count ?? 0,
  };
}
