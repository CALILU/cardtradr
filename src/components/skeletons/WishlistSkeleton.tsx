import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export function WishlistSkeleton() {
  return (
    <View style={styles.container}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View key={i} style={styles.card}>
          <SkeletonPlaceholder width={60} height={80} borderRadius={4} />
          <View style={styles.info}>
            <SkeletonPlaceholder width="70%" height={14} borderRadius={4} />
            <SkeletonPlaceholder width="35%" height={12} borderRadius={4} style={{ marginTop: 6 }} />
            <View style={styles.chipRow}>
              <SkeletonPlaceholder width={50} height={24} borderRadius={12} />
              <SkeletonPlaceholder width={70} height={24} borderRadius={12} />
            </View>
          </View>
          <SkeletonPlaceholder width={24} height={24} borderRadius={12} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});
