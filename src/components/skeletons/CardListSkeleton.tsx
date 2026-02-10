import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export function CardListSkeleton() {
  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={styles.listRow}>
          <SkeletonPlaceholder width={40} height={56} borderRadius={4} />
          <View style={styles.textBlock}>
            <SkeletonPlaceholder width="70%" height={14} borderRadius={4} />
            <SkeletonPlaceholder width="45%" height={12} borderRadius={4} style={{ marginTop: 6 }} />
          </View>
          <SkeletonPlaceholder width={24} height={24} borderRadius={12} />
        </View>
      ))}
    </View>
  );
}

export function CardGridSkeleton() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing.sm * 3) / 2;
  const imageHeight = itemWidth * 1.4;

  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View key={i} style={[styles.gridItem, { width: itemWidth }]}>
          <SkeletonPlaceholder width={itemWidth} height={imageHeight} borderRadius={8} />
          <SkeletonPlaceholder width="75%" height={12} borderRadius={4} style={{ marginTop: 8 }} />
          <SkeletonPlaceholder width="40%" height={10} borderRadius={4} style={{ marginTop: 4 }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  textBlock: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  gridItem: {
    marginBottom: spacing.sm,
  },
});
