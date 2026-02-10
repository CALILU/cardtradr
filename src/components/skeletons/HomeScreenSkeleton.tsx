import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export function HomeScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Welcome */}
      <SkeletonPlaceholder width="55%" height={24} borderRadius={4} style={{ marginBottom: spacing.md }} />

      {/* 3 stat cards */}
      <View style={styles.statsRow}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.statCard}>
            <SkeletonPlaceholder width={32} height={32} borderRadius={16} />
            <SkeletonPlaceholder width={40} height={22} borderRadius={4} style={{ marginTop: spacing.xs }} />
            <SkeletonPlaceholder width={55} height={12} borderRadius={4} style={{ marginTop: spacing.xs }} />
          </View>
        ))}
      </View>

      {/* API usage section */}
      <SkeletonPlaceholder width={100} height={16} borderRadius={4} style={{ marginBottom: spacing.sm }} />
      <View style={styles.apiCard}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.apiRow}>
            <SkeletonPlaceholder width="40%" height={14} borderRadius={4} />
            <SkeletonPlaceholder width={50} height={14} borderRadius={4} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  apiCard: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginBottom: spacing.md,
  },
  apiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
