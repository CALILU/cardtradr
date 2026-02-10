import React, { useState, useMemo } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Searchbar, List, Button, Text, Divider, IconButton } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useGames, useExpansions, useCards } from '../hooks';
import { ErrorMessage, EmptyState, CardPreview, CardGridItem, CollectionListSkeleton, CardListSkeleton, CardGridSkeleton, WatermarkBackground } from '../components';
import { RarityFilter, SortSelector, ResultsCounter, SearchHistoryChips, ExtendedDataFilter } from '../components/search';
import { useSettingsStore } from '../store/settings.store';
import { useSearchStore } from '../store/search.store';
import {
  extractRarities,
  extractExtendedDataOptions,
  filterByRarity,
  filterByExtendedData,
  sortCards,
} from '../utils/cardFilters';
import type { SearchScreenProps } from '../navigation/types';
import type { TCGGame, TCGExpansion } from '../types';

type Level = 'games' | 'expansions' | 'cards';

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [level, setLevel] = useState<Level>('games');
  const [selectedGame, setSelectedGame] = useState<TCGGame | null>(null);
  const [selectedExpansion, setSelectedExpansion] = useState<TCGExpansion | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const cardViewMode = useSettingsStore((s) => s.cardViewMode);
  const toggleCardViewMode = useSettingsStore((s) => s.toggleCardViewMode);

  // Search store (persistido)
  const sortOption = useSearchStore((s) => s.sortOption);
  const setSortOption = useSearchStore((s) => s.setSortOption);
  const searchHistory = useSearchStore((s) => s.searchHistory);
  const addSearchTerm = useSearchStore((s) => s.addSearchTerm);
  const clearSearchHistory = useSearchStore((s) => s.clearSearchHistory);

  // Filtros locales (efimeros, se resetean al cambiar expansion)
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [extendedFilters, setExtendedFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Queries
  const gamesQuery = useGames();
  const expansionsQuery = useExpansions(selectedGame?.categoryId ?? 0, page);
  const cardsQuery = useCards(selectedExpansion?.groupId ?? 0, page);

  // Datos para filtros (memoizados)
  const allCards = cardsQuery.data?.cards ?? [];

  const availableRarities = useMemo(() => extractRarities(allCards), [allCards]);
  const availableExtendedFilters = useMemo(() => extractExtendedDataOptions(allCards), [allCards]);

  // Pipeline de filtrado: texto → rareza → extendedData → sort
  const filteredGames = useMemo(() => {
    if (!gamesQuery.data || !search.trim()) return gamesQuery.data ?? [];
    const q = search.toLowerCase();
    return gamesQuery.data.filter((g) => g.displayName.toLowerCase().includes(q));
  }, [gamesQuery.data, search]);

  const filteredExpansions = useMemo(() => {
    const items = expansionsQuery.data?.expansions ?? [];
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((e) => e.name.toLowerCase().includes(q));
  }, [expansionsQuery.data, search]);

  const filteredCards = useMemo(() => {
    let items = allCards;

    // Etapa 1: texto
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((c) => (c.cleanName || c.name).toLowerCase().includes(q));
    }

    // Etapa 2: rareza
    if (selectedRarities.length > 0) {
      items = filterByRarity(items, selectedRarities);
    }

    // Etapa 3: extended data
    if (Object.values(extendedFilters).some((v) => v.length > 0)) {
      items = filterByExtendedData(items, extendedFilters);
    }

    // Etapa 4: sort
    items = sortCards(items, sortOption);

    return items;
  }, [allCards, search, selectedRarities, extendedFilters, sortOption]);

  // Navegacion
  function selectGame(game: TCGGame) {
    setSelectedGame(game);
    setLevel('expansions');
    setSearch('');
    setPage(1);
  }

  function selectExpansion(expansion: TCGExpansion) {
    setSelectedExpansion(expansion);
    setLevel('cards');
    setSearch('');
    setPage(1);
    setSelectedRarities([]);
    setExtendedFilters({});
    setShowFilters(false);
  }

  function goBack() {
    if (level === 'cards') {
      setLevel('expansions');
      setSelectedExpansion(null);
      setSelectedRarities([]);
      setExtendedFilters({});
      setShowFilters(false);
    } else if (level === 'expansions') {
      setLevel('games');
      setSelectedGame(null);
    }
    setSearch('');
    setPage(1);
  }

  // Breadcrumb
  const breadcrumb = useMemo(() => {
    const parts: string[] = ['Juegos'];
    if (selectedGame) parts.push(selectedGame.displayName);
    if (selectedExpansion) parts.push(selectedExpansion.name);
    return parts;
  }, [selectedGame, selectedExpansion]);

  const hasActiveFilters = selectedRarities.length > 0 || Object.values(extendedFilters).some((v) => v.length > 0);

  return (
    <WatermarkBackground variant={level === 'cards' ? 0 : 1}>
    <View style={styles.container}>
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        {breadcrumb.map((part, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Text style={styles.breadcrumbSep}> &gt; </Text>}
            <Text
              style={[styles.breadcrumbText, i === breadcrumb.length - 1 && styles.breadcrumbActive]}
              numberOfLines={1}
            >
              {part}
            </Text>
          </React.Fragment>
        ))}
      </View>

      {/* Barra de busqueda */}
      <Searchbar
        placeholder={`Buscar en ${breadcrumb[breadcrumb.length - 1]}...`}
        value={search}
        onChangeText={setSearch}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        onSubmitEditing={() => {
          if (search.trim()) addSearchTerm(search.trim());
        }}
        style={styles.searchbar}
      />

      {/* Historial de busqueda */}
      {level === 'cards' && isSearchFocused && !search.trim() && (
        <SearchHistoryChips
          history={searchHistory}
          onSelect={(term) => setSearch(term)}
          onClear={clearSearchHistory}
        />
      )}

      {/* Toolbar */}
      <View style={styles.toolbar}>
        {level !== 'games' ? (
          <Button icon="arrow-left" mode="text" onPress={goBack} compact>
            Volver
          </Button>
        ) : (
          <View />
        )}
        <View style={styles.toolbarRight}>
          {level === 'cards' && !cardsQuery.isLoading && (
            <ResultsCounter filteredCount={filteredCards.length} totalCount={allCards.length} />
          )}
          {level === 'cards' && (
            <>
              <IconButton
                icon="filter-variant"
                size={22}
                onPress={() => setShowFilters((v) => !v)}
                iconColor={hasActiveFilters ? colors.primary : undefined}
              />
              <IconButton
                icon={cardViewMode === 'list' ? 'view-grid' : 'view-list'}
                size={22}
                onPress={toggleCardViewMode}
              />
            </>
          )}
        </View>
      </View>

      {/* Filtros (colapsable) */}
      {level === 'cards' && showFilters && (
        <View style={styles.filtersSection}>
          <View style={styles.filterRow}>
            <SortSelector currentSort={sortOption} onSortChange={setSortOption} />
          </View>
          <RarityFilter
            availableRarities={availableRarities}
            selectedRarities={selectedRarities}
            onSelectionChange={setSelectedRarities}
          />
          <ExtendedDataFilter
            availableFilters={availableExtendedFilters}
            activeFilters={extendedFilters}
            onFiltersChange={setExtendedFilters}
          />
          {hasActiveFilters && (
            <Button
              mode="text"
              compact
              icon="close"
              onPress={() => {
                setSelectedRarities([]);
                setExtendedFilters({});
              }}
              style={styles.clearFilters}
            >
              Limpiar filtros
            </Button>
          )}
        </View>
      )}

      {/* Contenido */}
      {level === 'games' && renderGames()}
      {level === 'expansions' && renderExpansions()}
      {level === 'cards' && renderCards()}
    </View>
    </WatermarkBackground>
  );

  function renderGames() {
    if (gamesQuery.isLoading) return <CollectionListSkeleton />;
    if (gamesQuery.error)
      return <ErrorMessage message={gamesQuery.error.message} onRetry={() => gamesQuery.refetch()} />;
    if (filteredGames.length === 0)
      return <EmptyState icon="magnify" title="Sin resultados" subtitle="Prueba con otro termino" />;

    return (
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => String(item.categoryId)}
        refreshControl={
          <RefreshControl refreshing={gamesQuery.isRefetching} onRefresh={() => gamesQuery.refetch()} />
        }
        renderItem={({ item }) => (
          <List.Item
            title={item.displayName}
            description={`ID: ${item.categoryId}`}
            left={(props) => <List.Icon {...props} icon="cards-playing-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => selectGame(item)}
          />
        )}
        ItemSeparatorComponent={Divider}
      />
    );
  }

  function renderExpansions() {
    if (expansionsQuery.isLoading) return <CollectionListSkeleton />;
    if (expansionsQuery.error)
      return (
        <ErrorMessage
          message={expansionsQuery.error.message}
          onRetry={() => expansionsQuery.refetch()}
        />
      );
    if (filteredExpansions.length === 0)
      return <EmptyState icon="magnify" title="Sin resultados" />;

    const totalPages = expansionsQuery.data?.totalPages ?? 1;

    return (
      <FlatList
        data={filteredExpansions}
        keyExtractor={(item) => String(item.groupId)}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.abbreviation ? `(${item.abbreviation})` : undefined}
            left={(props) => <List.Icon {...props} icon="package-variant" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => selectExpansion(item)}
          />
        )}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={
          totalPages > page ? (
            <Button onPress={() => setPage((p) => p + 1)} style={styles.loadMore}>
              Cargar mas (pagina {page + 1}/{totalPages})
            </Button>
          ) : null
        }
      />
    );
  }

  function renderCards() {
    if (cardsQuery.isLoading) return cardViewMode === 'grid' ? <CardGridSkeleton /> : <CardListSkeleton />;
    if (cardsQuery.error)
      return <ErrorMessage message={cardsQuery.error.message} onRetry={() => cardsQuery.refetch()} />;
    if (filteredCards.length === 0)
      return <EmptyState icon="magnify" title="Sin cartas" subtitle={hasActiveFilters ? 'Prueba ajustando los filtros' : undefined} />;

    const totalPages = cardsQuery.data?.totalPages ?? 1;
    const isGrid = cardViewMode === 'grid';

    return (
      <FlatList
        key={cardViewMode}
        data={filteredCards}
        keyExtractor={(item) => String(item.productId)}
        numColumns={isGrid ? 2 : 1}
        columnWrapperStyle={isGrid ? styles.gridRow : undefined}
        contentContainerStyle={isGrid ? styles.gridContainer : undefined}
        renderItem={({ item }) => {
          const variantsCount = item.skus?.length ?? 0;

          return isGrid ? (
            <CardGridItem
              imageUrl={item.image}
              name={item.cleanName || item.name}
              subtitle={item.rarity}
              variantsCount={variantsCount > 1 ? variantsCount : undefined}
              onPress={() =>
                navigation.navigate('CardDetail', {
                  productId: item.productId,
                  cardName: item.cleanName || item.name,
                  groupId: item.groupId,
                })
              }
            />
          ) : (
            <CardPreview
              card={item}
              onPress={() =>
                navigation.navigate('CardDetail', {
                  productId: item.productId,
                  cardName: item.cleanName || item.name,
                  groupId: item.groupId,
                })
              }
            />
          );
        }}
        ListFooterComponent={
          totalPages > page ? (
            <Button onPress={() => setPage((p) => p + 1)} style={styles.loadMore}>
              Cargar mas (pagina {page + 1}/{totalPages})
            </Button>
          ) : null
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  breadcrumbText: {
    color: colors.textSecondary,
    fontSize: 13,
    flexShrink: 1,
  },
  breadcrumbActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  breadcrumbSep: {
    color: colors.textTertiary,
    fontSize: 13,
  },
  searchbar: {
    margin: spacing.sm,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersSection: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.xs,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  clearFilters: {
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
  },
  loadMore: {
    margin: spacing.md,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  gridContainer: {
    paddingTop: spacing.sm,
  },
});
