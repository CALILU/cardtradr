import React from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Card, Text, Icon } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useAuthStore } from '../store/auth.store';
import { useCollectionStats, useApiUsage } from '../hooks';
import { ErrorMessage } from '../components';
import * as tcgService from '../services/tcg.service';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const stats = useCollectionStats();
  const usage = useApiUsage();

  const refreshing = stats.isRefetching || usage.isRefetching;

  function handleRefresh() {
    stats.refetch();
    usage.refetch();
  }

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
      </View>

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
});
