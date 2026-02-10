import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { colors, spacing } from '../theme';

interface CardGridItemProps {
  imageUrl: string | null;
  name: string;
  subtitle?: string;
  variantsCount?: number;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function CardGridItem({ imageUrl, name, subtitle, variantsCount, onPress, onLongPress }: CardGridItemProps) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing.sm * 3) / 2;
  const imageHeight = itemWidth * 1.4;

  return (
    <Card
      style={[styles.card, { width: itemWidth }]}
      mode="elevated"
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={[styles.image, { width: itemWidth - 2, height: imageHeight }]}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.placeholder, { width: itemWidth - 2, height: imageHeight }]}>
            <Text style={styles.placeholderText}>Sin imagen</Text>
          </View>
        )}
        {variantsCount != null && variantsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{variantsCount}</Text>
          </View>
        )}
      </View>
      <Card.Content style={styles.content}>
        <Text variant="labelMedium" numberOfLines={1}>
          {name}
        </Text>
        {subtitle ? (
          <Text variant="bodySmall" style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  image: {
    alignSelf: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholder: {
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderText: {
    color: colors.textTertiary,
    fontSize: 12,
  },
  content: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.textOnPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
});
