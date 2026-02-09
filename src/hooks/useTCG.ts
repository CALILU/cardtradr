/**
 * Hooks de React Query para datos de TCGAPIs.
 * El cliente tcgapis ya cachea en AsyncStorage,
 * React Query agrega cache en memoria y estados loading/error.
 */

import { useQuery } from '@tanstack/react-query';
import * as tcgService from '../services/tcg.service';

/** Lista de juegos soportados. Cache largo (cambian raramente). */
export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: tcgService.getGames,
    staleTime: 60 * 60 * 1000, // 1h en React Query (AsyncStorage cachea 7d)
  });
}

/** Expansiones de un juego por categoryId */
export function useExpansions(categoryId: number, page = 1) {
  return useQuery({
    queryKey: ['expansions', categoryId, page],
    queryFn: () => tcgService.getExpansions(categoryId, page),
    enabled: categoryId > 0,
  });
}

/** Cartas de una expansion por groupId */
export function useCards(groupId: number, page = 1) {
  return useQuery({
    queryKey: ['cards', groupId, page],
    queryFn: () => tcgService.getCards(groupId, page),
    enabled: groupId > 0,
  });
}

/** Uso actual de la API. Cache corto. */
export function useApiUsage() {
  return useQuery({
    queryKey: ['api-usage'],
    queryFn: tcgService.getApiUsage,
    staleTime: 30 * 1000, // 30 segundos
  });
}
