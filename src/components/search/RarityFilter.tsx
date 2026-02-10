import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { spacing } from '../../theme';

interface RarityFilterProps {
  availableRarities: string[];
  selectedRarities: string[];
  onSelectionChange: (rarities: string[]) => void;
}

export function RarityFilter({ availableRarities, selectedRarities, onSelectionChange }: RarityFilterProps) {
  if (availableRarities.length === 0) return null;

  function toggle(rarity: string) {
    if (selectedRarities.includes(rarity)) {
      onSelectionChange(selectedRarities.filter((r) => r !== rarity));
    } else {
      onSelectionChange([...selectedRarities, rarity]);
    }
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {availableRarities.map((rarity) => (
        <Chip
          key={rarity}
          selected={selectedRarities.includes(rarity)}
          onPress={() => toggle(rarity)}
          style={styles.chip}
          compact
        >
          {rarity}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
  },
});
