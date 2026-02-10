import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export function CardDetailSkeleton() {
  return (
    <View style={styles.container}>
      {/* Imagen grande */}
      <SkeletonPlaceholder width="100%" height={350} borderRadius={8} />

      {/* Nombre */}
      <SkeletonPlaceholder width="70%" height={22} borderRadius={4} style={{ marginTop: spacing.md }} />

      {/* Chips */}
      <View style={styles.chips}>
        <SkeletonPlaceholder width={80} height={28} borderRadius={14} />
        <SkeletonPlaceholder width={60} height={28} borderRadius={14} />
      </View>

      {/* Section detalles */}
      <View style={styles.section}>
        <SkeletonPlaceholder width={90} height={16} borderRadius={4} style={{ marginBottom: spacing.sm }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.detailRow}>
            <SkeletonPlaceholder width="35%" height={14} borderRadius={4} />
            <SkeletonPlaceholder width="25%" height={14} borderRadius={4} />
          </View>
        ))}
      </View>

      {/* Botones */}
      <SkeletonPlaceholder width="100%" height={42} borderRadius={20} style={{ marginTop: spacing.md }} />
      <SkeletonPlaceholder width="100%" height={42} borderRadius={20} style={{ marginTop: spacing.sm }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
