import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { spacing, colors } from '../theme';
import type { TCGCard } from '../types';

interface Props {
  card: TCGCard;
  onPress?: () => void;
}

export function CardPreview({ card, onPress }: Props) {
  const cardType = card.extendedData?.find(
    (d) => d.name === 'CardType' || d.name === 'Type' || d.displayName === 'Card Type',
  )?.value;

  const variantsCount = card.skus?.length ?? 0;

  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content style={styles.content}>
        {card.image ? (
          <Image source={{ uri: card.image }} style={styles.image} resizeMode="contain" />
        ) : null}
        <View style={styles.info}>
          <Text variant="titleSmall" numberOfLines={2}>
            {card.cleanName || card.name}
          </Text>
          <View style={styles.meta}>
            {card.number && (
              <Text variant="bodySmall" style={styles.secondary}>
                #{card.number}
              </Text>
            )}
            {variantsCount > 1 && (
              <Text variant="bodySmall" style={styles.secondary}>
                 · {variantsCount} variantes
              </Text>
            )}
          </View>
          <View style={styles.chips}>
            {card.rarity && (
              <Chip compact style={styles.chip} textStyle={styles.chipText}>
                {card.rarity}
              </Chip>
            )}
            {cardType && (
              <Chip compact style={styles.chipType} textStyle={styles.chipText}>
                {cardType}
              </Chip>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  image: {
    width: 60,
    height: 84,
    borderRadius: 4,
    backgroundColor: colors.surfaceVariant,
  },
  info: {
    flex: 1,
    paddingLeft: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  secondary: {
    color: colors.textSecondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  chipType: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceVariant,
  },
  chipText: {
    fontSize: 10,
  },
});
