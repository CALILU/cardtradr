import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Menu, Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import type { SortOption, SortField, SortDirection } from '../../utils/cardFilters';

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

interface SortMenuItem {
  label: string;
  field: SortField;
  direction: SortDirection;
}

const SORT_OPTIONS: SortMenuItem[] = [
  { label: 'Nombre A-Z', field: 'name', direction: 'asc' },
  { label: 'Nombre Z-A', field: 'name', direction: 'desc' },
  { label: 'Numero ↑', field: 'number', direction: 'asc' },
  { label: 'Numero ↓', field: 'number', direction: 'desc' },
  { label: 'Rareza ↑', field: 'rarity', direction: 'asc' },
  { label: 'Rareza ↓', field: 'rarity', direction: 'desc' },
];

export function SortSelector({ currentSort, onSortChange }: SortSelectorProps) {
  const [visible, setVisible] = useState(false);

  const currentLabel = SORT_OPTIONS.find(
    (o) => o.field === currentSort.field && o.direction === currentSort.direction,
  )?.label ?? 'Ordenar';

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <View style={styles.anchor}>
            <IconButton
              icon="sort-variant"
              size={20}
              onPress={() => setVisible(true)}
            />
            <Text variant="labelSmall" style={styles.label} numberOfLines={1}>
              {currentLabel}
            </Text>
          </View>
        }
      >
        {SORT_OPTIONS.map((opt) => {
          const isActive = currentSort.field === opt.field && currentSort.direction === opt.direction;
          return (
            <Menu.Item
              key={`${opt.field}-${opt.direction}`}
              title={opt.label}
              leadingIcon={isActive ? 'check' : undefined}
              onPress={() => {
                onSortChange({ field: opt.field, direction: opt.direction });
                setVisible(false);
              }}
            />
          );
        })}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  anchor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
});
