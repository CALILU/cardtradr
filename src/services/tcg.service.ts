/**
 * Servicio TCG.
 * Wrapper sobre el cliente tcgapis para mantener
 * consistencia con la capa de servicios.
 */

import { tcgapis } from '../api/tcgapis.client';
import type { TCGGame, TCGExpansion, TCGCard, TCGApiUsage } from '../types';

/** Lista de juegos soportados */
export async function getGames(): Promise<TCGGame[]> {
  return tcgapis.getGames();
}

/** Expansiones de un juego */
export async function getExpansions(
  categoryId: number,
  page?: number,
): Promise<{ expansions: TCGExpansion[]; totalPages: number }> {
  return tcgapis.getExpansions(categoryId, page);
}

/** Cartas de una expansion */
export async function getCards(
  groupId: number,
  page?: number,
): Promise<{ cards: TCGCard[]; totalPages: number }> {
  return tcgapis.getCards(groupId, page);
}

/** Uso actual de la API */
export async function getApiUsage(): Promise<TCGApiUsage> {
  return tcgapis.getUsage();
}

/** Llamadas realizadas en esta sesion */
export function getSessionCalls(): number {
  return tcgapis.sessionCalls;
}
