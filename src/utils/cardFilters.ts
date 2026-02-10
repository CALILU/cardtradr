import type { TCGCard } from '../types';

// ============================================================
// Tipos
// ============================================================

export type SortField = 'name' | 'number' | 'rarity';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

export interface ExtendedFilterOption {
  fieldName: string;
  displayName: string;
  values: string[];
  isNumeric: boolean;
}

// ============================================================
// Mapa de rareza (orden de menor a mayor)
// ============================================================

const RARITY_ORDER: Record<string, number> = {
  'Common': 1,
  'Uncommon': 2,
  'Rare': 3,
  'Rare Holo': 4,
  'Rare Holo EX': 5,
  'Rare Holo GX': 6,
  'Rare Holo V': 6,
  'Rare Holo VMAX': 7,
  'Rare Holo VSTAR': 7,
  'Rare Ultra': 8,
  'Ultra Rare': 8,
  'Rare Secret': 9,
  'Secret Rare': 9,
  'Rare Rainbow': 10,
  'Rare Shiny': 10,
  'Amazing Rare': 10,
  'Promo': 0,
  // Yu-Gi-Oh
  'Short Print': 2,
  'Super Rare': 5,
  'Starlight Rare': 10,
  'Ghost Rare': 10,
  'Collector\'s Rare': 9,
  // MTG
  'Mythic': 10,
  'Mythic Rare': 10,
  // Generico
  'Special': 8,
};

function getRarityOrder(rarity: string): number {
  return RARITY_ORDER[rarity] ?? 5;
}

// ============================================================
// Extraccion
// ============================================================

export function extractRarities(cards: TCGCard[]): string[] {
  const set = new Set<string>();
  for (const card of cards) {
    if (card.rarity) set.add(card.rarity);
  }
  return Array.from(set).sort((a, b) => getRarityOrder(a) - getRarityOrder(b));
}

export function extractExtendedDataOptions(cards: TCGCard[]): ExtendedFilterOption[] {
  const fieldsMap = new Map<string, { displayName: string; values: Set<string> }>();

  for (const card of cards) {
    if (!card.extendedData) continue;
    for (const ext of card.extendedData) {
      if (!ext.value || ext.value.trim() === '') continue;
      let entry = fieldsMap.get(ext.name);
      if (!entry) {
        entry = { displayName: ext.displayName || ext.name, values: new Set() };
        fieldsMap.set(ext.name, entry);
      }
      entry.values.add(ext.value);
    }
  }

  const result: ExtendedFilterOption[] = [];
  for (const [fieldName, entry] of fieldsMap) {
    const values = Array.from(entry.values);
    // Solo incluir campos con 2+ valores distintos y < 30 valores (evitar ruido)
    if (values.length < 2 || values.length > 30) continue;

    const isNumeric = values.every((v) => /^\d+$/.test(v.trim()));
    result.push({
      fieldName,
      displayName: entry.displayName,
      values: isNumeric ? values.sort((a, b) => Number(a) - Number(b)) : values.sort(),
      isNumeric,
    });
  }

  return result;
}

// ============================================================
// Filtrado
// ============================================================

export function filterByRarity(cards: TCGCard[], selectedRarities: string[]): TCGCard[] {
  if (selectedRarities.length === 0) return cards;
  const set = new Set(selectedRarities);
  return cards.filter((c) => set.has(c.rarity));
}

export function filterByExtendedData(
  cards: TCGCard[],
  filters: Record<string, string[]>,
): TCGCard[] {
  const activeFilters = Object.entries(filters).filter(([, vals]) => vals.length > 0);
  if (activeFilters.length === 0) return cards;

  return cards.filter((card) => {
    for (const [fieldName, selectedValues] of activeFilters) {
      const ext = card.extendedData?.find((d) => d.name === fieldName);
      if (!ext) return false;

      // Para campos numericos con rango [min, max]
      if (selectedValues.length === 2 && selectedValues[0].startsWith('__range:')) {
        const [minStr, maxStr] = selectedValues[0].replace('__range:', '').split(',');
        const val = Number(ext.value);
        const min = Number(minStr);
        const max = Number(maxStr);
        if (isNaN(val) || val < min || val > max) return false;
      } else {
        const set = new Set(selectedValues);
        if (!set.has(ext.value)) return false;
      }
    }
    return true;
  });
}

// ============================================================
// Ordenacion
// ============================================================

export function sortCards(cards: TCGCard[], sortOption: SortOption): TCGCard[] {
  const sorted = [...cards];
  const { field, direction } = sortOption;
  const mult = direction === 'asc' ? 1 : -1;

  sorted.sort((a, b) => {
    switch (field) {
      case 'name': {
        const na = (a.cleanName || a.name).toLowerCase();
        const nb = (b.cleanName || b.name).toLowerCase();
        return mult * na.localeCompare(nb);
      }
      case 'number': {
        const na = parseInt(a.number, 10) || 0;
        const nb = parseInt(b.number, 10) || 0;
        return mult * (na - nb);
      }
      case 'rarity': {
        const ra = getRarityOrder(a.rarity);
        const rb = getRarityOrder(b.rarity);
        if (ra !== rb) return mult * (ra - rb);
        // Desempate por nombre
        return (a.cleanName || a.name).localeCompare(b.cleanName || b.name);
      }
      default:
        return 0;
    }
  });

  return sorted;
}
