/**
 * Hooks de React Query para wishlist en Supabase.
 * Queries + mutations con invalidacion automatica.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as wishlistService from '../services/wishlist.service';

/** Toda la wishlist del usuario */
export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistService.getWishlist,
  });
}

/** Agregar carta a wishlist */
export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistService.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-stats'] });
    },
  });
}

/** Actualizar item de wishlist (prioridad, precio, notas) */
export function useUpdateWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof wishlistService.updateWishlistItem>[1] }) =>
      wishlistService.updateWishlistItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

/** Eliminar item de wishlist */
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-stats'] });
    },
  });
}

/** Estadisticas de wishlist para HomeScreen */
export function useWishlistStats() {
  return useQuery({
    queryKey: ['wishlist-stats'],
    queryFn: wishlistService.getWishlistStats,
  });
}
