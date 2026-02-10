import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export function CollectionListSkeleton() {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textBlock}>
              <SkeletonPlaceholder width="65%" height={16} borderRadius={4} />
              <SkeletonPlaceholder width="40%" height={12} borderRadius={4} style={{ marginTop: 8 }} />
            </View>
            <SkeletonPlaceholder width={60} height={28} borderRadius={14} />
          </View>
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
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    marginRight: spacing.md,
  },
});
