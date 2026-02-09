/**
 * Cliente para la API de TCGAPIs (https://api.tcgapis.com/api/v1)
 *
 * Plan FREE = 100 llamadas/dia.
 * Cache agresivo con AsyncStorage para minimizar llamadas.
 *
 * Estrategia de cache:
 * - Juegos: 7 dias (cambian raramente)
 * - Expansiones: 24 horas
 * - Cartas de un set: 24 horas
 * - Uso API: sin cache
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TCGAPIS_CONFIG } from '../utils/env';
import type {
  TCGGame,
  GamesResponse,
  TCGExpansion,
  ExpansionsResponse,
  TCGCard,
  CardsResponse,
  TCGApiUsage,
  UsageResponse,
  TCGApiUserProfile,
} from '../types';

// ============================================================
// Duracion de cache (milisegundos)
// ============================================================

const CACHE_MS = {
  GAMES: 7 * 24 * 60 * 60 * 1000, // 7 dias
  EXPANSIONS: 24 * 60 * 60 * 1000, // 24 horas
  CARDS: 24 * 60 * 60 * 1000, // 24 horas
} as const;

const CACHE_PREFIX = '@tcgapis:';

// ============================================================
// Cache helpers
// ============================================================

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

async function getCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

async function setCache<T>(key: string, data: T, durationMs: number): Promise<void> {
  try {
    const entry: CacheEntry<T> = { data, expiresAt: Date.now() + durationMs };
    await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Silenciar errores de cache - no es critico
  }
}

// ============================================================
// Cliente principal
// ============================================================

class TCGAPIsClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private _sessionCalls = 0;

  constructor() {
    this.baseUrl = TCGAPIS_CONFIG.baseUrl;
    this.headers = {
      'X-API-Key': TCGAPIS_CONFIG.apiKey,
      'Content-Type': 'application/json',
    };
  }

  /** Peticion HTTP base con manejo de errores */
  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    this._sessionCalls++;

    const response = await fetch(url, { method: 'GET', headers: this.headers });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API Key invalida. Verifica EXPO_PUBLIC_TCGAPIS_API_KEY');
      }
      if (response.status === 403) {
        throw new Error('Endpoint requiere plan superior. Verifica tu plan en tcgapis.com');
      }
      if (response.status === 429) {
        throw new Error('Limite de llamadas alcanzado (100/dia). Reintenta manana.');
      }
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // ==========================================================
  // Endpoints publicos
  // ==========================================================

  /** Lista de todos los juegos soportados. Cache: 7 dias. */
  async getGames(): Promise<TCGGame[]> {
    const cached = await getCache<TCGGame[]>('games');
    if (cached) return cached;

    const res = await this.request<GamesResponse>('/games');
    if (res.success) {
      await setCache('games', res.data.games, CACHE_MS.GAMES);
      return res.data.games;
    }
    throw new Error('Error obteniendo lista de juegos');
  }

  /** Expansiones/sets de un juego por categoryId. Cache: 24h. */
  async getExpansions(categoryId: number, page = 1): Promise<{
    expansions: TCGExpansion[];
    totalPages: number;
  }> {
    const cacheKey = `expansions:${categoryId}:p${page}`;
    const cached = await getCache<{ expansions: TCGExpansion[]; totalPages: number }>(cacheKey);
    if (cached) return cached;

    const res = await this.request<ExpansionsResponse>(
      `/expansions/${categoryId}?page=${page}`,
    );
    if (res.success) {
      const result = {
        expansions: res.data.expansions,
        totalPages: res.data.pagination.totalPages,
      };
      await setCache(cacheKey, result, CACHE_MS.EXPANSIONS);
      return result;
    }
    throw new Error(`Error obteniendo expansiones de categoryId ${categoryId}`);
  }

  /** Cartas de un set/grupo por groupId. Cache: 24h. */
  async getCards(groupId: number, page = 1): Promise<{
    cards: TCGCard[];
    totalPages: number;
  }> {
    const cacheKey = `cards:${groupId}:p${page}`;
    const cached = await getCache<{ cards: TCGCard[]; totalPages: number }>(cacheKey);
    if (cached) return cached;

    const res = await this.request<CardsResponse>(`/cards/${groupId}?page=${page}`);
    if (res.success) {
      const result = {
        cards: res.data.cards,
        totalPages: res.data.pagination.totalPages,
      };
      await setCache(cacheKey, result, CACHE_MS.CARDS);
      return result;
    }
    throw new Error(`Error obteniendo cartas del grupo ${groupId}`);
  }

  /** Uso actual de la API. Sin cache. */
  async getUsage(): Promise<TCGApiUsage> {
    const res = await this.request<UsageResponse>('/user/usage');
    if (res.success) return res.data;
    throw new Error('Error obteniendo uso de API');
  }

  /** Perfil del usuario en la API. Sin cache. */
  async getUserProfile(): Promise<TCGApiUserProfile> {
    const res = await this.request<{ success: boolean; data: TCGApiUserProfile }>(
      '/user/profile',
    );
    if (res.success) return res.data;
    throw new Error('Error obteniendo perfil de API');
  }

  /** Health check. Sin cache. */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await this.request<{ success: boolean }>('/health');
      return res.success;
    } catch {
      return false;
    }
  }

  /** Limpiar todo el cache de TCGAPIs */
  async clearCache(): Promise<void> {
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter((k) => k.startsWith(CACHE_PREFIX));
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  }

  /** Llamadas API realizadas en esta sesion (debug) */
  get sessionCalls(): number {
    return this._sessionCalls;
  }
}

export const tcgapis = new TCGAPIsClient();
