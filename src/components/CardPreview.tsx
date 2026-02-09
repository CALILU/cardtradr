import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { spacing, colors } from '../theme';
import type { TCGCard } from '../types';

interface Props {
  card: TCGCard;
  onPress?: () => void;
}

export function CardPreview({ card, onPress }: Props) {
  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content style={styles.content}>
        {card.image ? (
          <Image source={{ uri: card.image }} style={styles.image} resizeMode="contain" />
        ) : null}
        <Card.Content style={styles.info}>
          <Text variant="titleSmall" numberOfLines={2}>
            {card.cleanName || card.name}
          </Text>
          {card.number && (
            <Text variant="bodySmall" style={styles.secondary}>
              #{card.number}
            </Text>
          )}
          {card.rarity && (
            <Chip compact style={styles.chip} textStyle={styles.chipText}>
              {card.rarity}
            </Chip>
          )}
        </Card.Content>
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
  secondary: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  chipText: {
    fontSize: 10,
  },
});
