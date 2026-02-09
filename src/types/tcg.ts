/**
 * Tipos para la API de TCGAPIs (https://api.tcgapis.com/api/v1)
 *
 * IMPORTANTE: Estos tipos reflejan las respuestas REALES de la API
 * verificadas el 09/02/2026 con plan free.
 */

// ============================================================
// Respuesta generica de la API
// ============================================================

export interface TCGApisPagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ============================================================
// Juegos (Games) - GET /games
// ============================================================

export interface TCGGame {
  categoryId: number;
  name: string;
  displayName: string;
  categoryDescription: string | null;
  popularity: number;
  isDirect: boolean;
  isScannable: boolean;
  modifiedOn: string;
  nonSealedLabel: string | null;
  sealedLabel: string | null;
  seoCategoryName: string;
  conditionGuideUrl: string;
}

export interface GamesResponse {
  success: boolean;
  data: {
    games: TCGGame[];
    pagination: TCGApisPagination & {
      totalGames: number;
      gamesPerPage: number;
    };
    filters: {
      search: string | null;
      sortBy: string;
      sortOrder: string;
    };
  };
}

// ============================================================
// Expansiones (Sets) - GET /expansions/{categoryId}
// ============================================================

export interface TCGExpansion {
  groupId: number;
  name: string;
  abbreviation: string;
  categoryId: number;
}

export interface ExpansionsResponse {
  success: boolean;
  data: {
    expansions: TCGExpansion[];
    pagination: TCGApisPagination & {
      totalExpansions: number;
      expansionsPerPage: number;
    };
    filters: {
      categoryId: number;
      sortBy: string;
      sortOrder: string;
    };
  };
}

// ============================================================
// Cartas (Cards) - GET /cards/{groupId}
// ============================================================

export interface TCGCardExtendedData {
  name: string;
  displayName: string;
  value: string;
}

export interface TCGCardSku {
  skuId: number;
  condName: string; // 'Near Mint', 'Lightly Played', etc.
  printingName: string; // 'Normal', 'Holofoil', 'Reverse Holofoil', etc.
  languageName: string; // 'English', etc.
}

export interface TCGCard {
  productId: number;
  name: string;
  cleanName: string;
  number: string;
  rarity: string;
  image: string; // URL de imagen alta calidad
  abbreviation: string;
  categoryId: number;
  groupId: number;
  gameName: string;
  gameSeoName: string;
  expansionName: string;
  expansionAbbreviation: string;
  url: string; // URL en TCGPlayer
  extendedData: TCGCardExtendedData[];
  skus: TCGCardSku[];
}

export interface CardsResponse {
  success: boolean;
  data: {
    cards: TCGCard[];
    pagination: TCGApisPagination & {
      totalCards: number;
      cardsPerPage: number;
    };
  };
}

// ============================================================
// Uso de API - GET /user/usage
// ============================================================

export interface TCGApiUsage {
  current: {
    daily: number;
    monthly: number;
  };
  limits: {
    calls: number;
    period: string;
  };
  remaining: {
    calls: number;
    period: string;
  };
}

export interface UsageResponse {
  success: boolean;
  data: TCGApiUsage;
}

// ============================================================
// Perfil de usuario API - GET /user/profile
// ============================================================

export interface TCGApiUserProfile {
  user: {
    id: string;
    email: string;
    name: string;
    plan: string;
    createdAt: string;
  };
  subscription: {
    plan: string;
    limits: {
      calls: number;
      period: string;
    };
  };
  apiKey: {
    key: string;
    lastUsed: string;
  };
}

// ============================================================
// Tipos auxiliares para la app
// ============================================================

/** Juego simplificado para uso interno (selector de TCG, etc.) */
export interface GameSummary {
  categoryId: number;
  name: string;
  displayName: string;
  isScannable: boolean;
}
