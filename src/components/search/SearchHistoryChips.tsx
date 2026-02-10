import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip, Button, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';

interface SearchHistoryChipsProps {
  history: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
}

export function SearchHistoryChips({ history, onSelect, onClear }: SearchHistoryChipsProps) {
  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="labelSmall" style={styles.label}>
          Busquedas recientes
        </Text>
        <Button mode="text" compact onPress={onClear} labelStyle={styles.clearLabel}>
          Borrar
        </Button>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {history.map((term) => (
          <Chip
            key={term}
            icon="history"
            onPress={() => onSelect(term)}
            style={styles.chip}
            compact
          >
            {term}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
  },
  clearLabel: {
    fontSize: 11,
  },
  chips: {
    gap: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
  },
});
