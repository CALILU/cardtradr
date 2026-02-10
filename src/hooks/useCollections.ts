/**
 * Hooks de React Query para colecciones en Supabase.
 * Queries + mutations con invalidacion automatica.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as collectionService from '../services/collection.service';

/** Todas las colecciones del usuario */
export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: collectionService.getCollections,
  });
}

/** Cartas de una coleccion especifica */
export function useCollectionCards(collectionId: string) {
  return useQuery({
    queryKey: ['collection-cards', collectionId],
    queryFn: () => collectionService.getCollectionCards(collectionId),
    enabled: !!collectionId,
  });
}

/** Actualizar coleccion (nombre, descripcion) */
export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof collectionService.updateCollection>[1] }) =>
      collectionService.updateCollection(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

/** Eliminar coleccion */
export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collectionService.deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection-stats'] });
    },
  });
}

/** Actualizar carta en coleccion (cantidad, condicion, notas) */
export function useUpdateCollectionCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof collectionService.updateCollectionCard>[1] }) =>
      collectionService.updateCollectionCard(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection-cards'] });
    },
  });
}

/** Crear nueva coleccion */
export function useCreateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collectionService.createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection-stats'] });
    },
  });
}

/** Agregar carta a coleccion */
export function useAddCardToCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collectionService.addCardToCollection,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collection-cards', variables.collection_id] });
      queryClient.invalidateQueries({ queryKey: ['collection-stats'] });
    },
  });
}

/** Eliminar carta de coleccion */
export function useRemoveCardFromCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collectionService.removeCardFromCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection-cards'] });
      queryClient.invalidateQueries({ queryKey: ['collection-stats'] });
    },
  });
}

/** Estadisticas para HomeScreen */
export function useCollectionStats() {
  return useQuery({
    queryKey: ['collection-stats'],
    queryFn: collectionService.getCollectionStats,
  });
}

/** Estadisticas avanzadas: valor, distribucion TCG, top cartas */
export function useAdvancedStats() {
  return useQuery({
    queryKey: ['advanced-stats'],
    queryFn: collectionService.getAdvancedStats,
    staleTime: 5 * 60 * 1000,
  });
}
