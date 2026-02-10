import React from 'react';
import { View, ScrollView, RefreshControl, Image, StyleSheet } from 'react-native';
import { Card, Text, Icon, ProgressBar, List } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useAuthStore } from '../store/auth.store';
import { useCollectionStats, useWishlistStats, useApiUsage, useAdvancedStats } from '../hooks';
import { ErrorMessage, HomeScreenSkeleton } from '../components';
import * as tcgService from '../services/tcg.service';

const TCG_COLORS: Record<string, string> = {
  pokemon: colors.tcgPokemon,
  magic: colors.tcgMtg,
  yugioh: colors.tcgYugioh,
  'one-piece': colors.tcgOnePiece,
  lorcana: colors.tcgLorcana,
  digimon: colors.info,
};

function getTcgColor(tcgType: string): string {
  return TCG_COLORS[tcgType.toLowerCase()] ?? colors.primary;
}

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const stats = useCollectionStats();
  const wishlistStats = useWishlistStats();
  const usage = useApiUsage();
  const advancedStats = useAdvancedStats();

  const refreshing =
    stats.isRefetching || usage.isRefetching || wishlistStats.isRefetching || advancedStats.isRefetching;

  function handleRefresh() {
    stats.refetch();
    wishlistStats.refetch();
    usage.refetch();
    advancedStats.refetch();
  }

  const isInitialLoading = stats.isLoading && !stats.data;
  if (isInitialLoading) return <HomeScreenSkeleton />;

  if (stats.error) {
    return <ErrorMessage message={stats.error.message} onRetry={() => stats.refetch()} />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <Text variant="headlineSmall" style={styles.welcome}>
        Hola, {user?.email?.split('@')[0] || 'Coleccionista'}
      </Text>

      <View style={styles.grid}>
        <StatCard
          icon="cards-outline"
          label="Colecciones"
          value={String(stats.data?.totalCollections ?? '-')}
          color={colors.primary}
        />
        <StatCard
          icon="card-multiple-outline"
          label="Cartas"
          value={String(stats.data?.totalCards ?? '-')}
          color={colors.secondary}
        />
        <StatCard
          icon="heart-outline"
          label="Wishlist"
          value={String(wishlistStats.data?.totalItems ?? '-')}
          color={colors.danger}
        />
      </View>

      {/* Valor total */}
      {advancedStats.data && advancedStats.data.totalValue > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Valor total
          </Text>
          <Card style={styles.apiCard} mode="elevated">
            <Card.Content style={styles.valueContent}>
              <Icon source="cash-multiple" size={28} color={colors.secondary} />
              <Text variant="headlineMedium" style={styles.totalValue}>
                ${advancedStats.data.totalValue.toFixed(2)}
              </Text>
            </Card.Content>
          </Card>
        </>
      )}

      {/* Distribucion por TCG */}
      {advancedStats.data && advancedStats.data.tcgDistribution.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Distribucion por TCG
          </Text>
          <Card style={styles.apiCard} mode="elevated">
            <Card.Content>
              {advancedStats.data.tcgDistribution.map((item) => {
                const maxCount = advancedStats.data!.tcgDistribution[0].count;
                return (
                  <View key={item.tcg_type} style={styles.tcgRow}>
                    <View style={styles.tcgLabelRow}>
                      <Text style={styles.tcgName}>{item.tcg_type}</Text>
                      <Text style={styles.tcgCount}>{item.count}</Text>
                    </View>
                    <ProgressBar
                      progress={item.count / maxCount}
                      color={getTcgColor(item.tcg_type)}
                      style={styles.progressBar}
                    />
                  </View>
                );
              })}
            </Card.Content>
          </Card>
        </>
      )}

      {/* Top 5 cartas */}
      {advancedStats.data && advancedStats.data.topCards.length > 0 && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Top cartas mas valiosas
          </Text>
          <Card style={styles.apiCard} mode="elevated">
            <Card.Content>
              {advancedStats.data.topCards.map((card, i) => (
                <List.Item
                  key={`${card.card_name}-${i}`}
                  title={card.card_name}
                  titleNumberOfLines={1}
                  description={`x${card.quantity}`}
                  left={() =>
                    card.cached_image_url ? (
                      <Image source={{ uri: card.cached_image_url }} style={styles.topCardImage} />
                    ) : (
                      <View style={styles.topCardPlaceholder} />
                    )
                  }
                  right={() => (
                    <Text style={styles.topCardPrice}>${card.cached_price.toFixed(2)}</Text>
                  )}
                />
              ))}
            </Card.Content>
          </Card>
        </>
      )}

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Uso de API
      </Text>

      <Card style={styles.apiCard} mode="elevated">
        <Card.Content>
          {usage.data ? (
            <>
              <View style={styles.apiRow}>
                <Text style={styles.apiLabel}>Llamadas hoy</Text>
                <Text style={styles.apiValue}>{usage.data.current.daily}</Text>
              </View>
              <View style={styles.apiRow}>
                <Text style={styles.apiLabel}>Restantes</Text>
                <Text style={styles.apiValue}>{usage.data.remaining.calls}</Text>
              </View>
              <View style={styles.apiRow}>
                <Text style={styles.apiLabel}>Limite</Text>
                <Text style={styles.apiValue}>
                  {usage.data.limits.calls}/{usage.data.limits.period}
                </Text>
              </View>
              <View style={styles.apiRow}>
                <Text style={styles.apiLabel}>Sesion actual</Text>
                <Text style={styles.apiValue}>{tcgService.getSessionCalls()} calls</Text>
              </View>
            </>
          ) : usage.isLoading ? (
            <Text style={styles.apiLabel}>Cargando...</Text>
          ) : (
            <Text style={styles.apiLabel}>No disponible</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card style={styles.statCard} mode="elevated">
      <Card.Content style={styles.statContent}>
        <Icon source={icon} size={32} color={color} />
        <Text variant="headlineMedium" style={[styles.statValue, { color }]}>
          {value}
        </Text>
        <Text variant="bodySmall" style={styles.statLabel}>
          {label}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  welcome: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  apiCard: {
    marginBottom: spacing.md,
  },
  apiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  apiLabel: {
    color: colors.textSecondary,
  },
  apiValue: {
    fontWeight: '600',
  },
  valueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  totalValue: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
  tcgRow: {
    marginBottom: spacing.sm,
  },
  tcgLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  tcgName: {
    textTransform: 'capitalize',
    color: colors.text,
  },
  tcgCount: {
    fontWeight: '600',
    color: colors.textSecondary,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  topCardImage: {
    width: 40,
    height: 56,
    borderRadius: 4,
  },
  topCardPlaceholder: {
    width: 40,
    height: 56,
    borderRadius: 4,
    backgroundColor: colors.surfaceVariant,
  },
  topCardPrice: {
    fontWeight: 'bold',
    color: colors.secondary,
    alignSelf: 'center',
  },
});
