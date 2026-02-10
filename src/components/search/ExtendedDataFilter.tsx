import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Chip, Button, TextInput } from 'react-native-paper';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { colors, spacing } from '../../theme';
import type { ExtendedFilterOption } from '../../utils/cardFilters';

interface ExtendedDataFilterProps {
  availableFilters: ExtendedFilterOption[];
  activeFilters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
}

export function ExtendedDataFilter({
  availableFilters,
  activeFilters,
  onFiltersChange,
}: ExtendedDataFilterProps) {
  const [expanded, setExpanded] = useState(false);

  if (availableFilters.length === 0) return null;

  function toggleValue(fieldName: string, value: string) {
    const current = activeFilters[fieldName] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...activeFilters, [fieldName]: next });
  }

  function setRange(fieldName: string, min: string, max: string) {
    if (!min && !max) {
      const { [fieldName]: _, ...rest } = activeFilters;
      onFiltersChange(rest);
    } else {
      onFiltersChange({
        ...activeFilters,
        [fieldName]: [`__range:${min || '0'},${max || '9999'}`],
      });
    }
  }

  const activeCount = Object.values(activeFilters).filter((v) => v.length > 0).length;

  return (
    <View style={styles.container}>
      <Button
        mode="text"
        compact
        icon={expanded ? 'chevron-up' : 'tune-variant'}
        onPress={() => setExpanded(!expanded)}
        style={styles.toggleButton}
      >
        Filtros avanzados{activeCount > 0 ? ` (${activeCount})` : ''}
      </Button>

      {expanded && (
        <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutUp.duration(150)}>
          {availableFilters.map((filter) => (
            <View key={filter.fieldName} style={styles.filterSection}>
              <Text variant="labelSmall" style={styles.fieldLabel}>
                {filter.displayName}
              </Text>
              {filter.isNumeric ? (
                <NumericRange
                  values={filter.values}
                  activeRange={activeFilters[filter.fieldName]?.[0] ?? ''}
                  onRangeChange={(min, max) => setRange(filter.fieldName, min, max)}
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipsRow}
                >
                  {filter.values.map((value) => (
                    <Chip
                      key={value}
                      selected={(activeFilters[filter.fieldName] ?? []).includes(value)}
                      onPress={() => toggleValue(filter.fieldName, value)}
                      style={styles.chip}
                      compact
                    >
                      {value}
                    </Chip>
                  ))}
                </ScrollView>
              )}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

// Subcomponente para rangos numericos
function NumericRange({
  values,
  activeRange,
  onRangeChange,
}: {
  values: string[];
  activeRange: string;
  onRangeChange: (min: string, max: string) => void;
}) {
  const parsed = activeRange.startsWith('__range:')
    ? activeRange.replace('__range:', '').split(',')
    : ['', ''];
  const [min, setMin] = useState(parsed[0] === '0' ? '' : parsed[0]);
  const [max, setMax] = useState(parsed[1] === '9999' ? '' : parsed[1]);

  const numValues = values.map(Number).filter((n) => !isNaN(n));
  const rangeMin = Math.min(...numValues);
  const rangeMax = Math.max(...numValues);

  return (
    <View style={styles.rangeRow}>
      <TextInput
        mode="outlined"
        label={`Min (${rangeMin})`}
        value={min}
        onChangeText={(v) => {
          setMin(v);
          onRangeChange(v, max);
        }}
        keyboardType="numeric"
        dense
        style={styles.rangeInput}
      />
      <Text style={styles.rangeSep}>—</Text>
      <TextInput
        mode="outlined"
        label={`Max (${rangeMax})`}
        value={max}
        onChangeText={(v) => {
          setMax(v);
          onRangeChange(min, v);
        }}
        keyboardType="numeric"
        dense
        style={styles.rangeInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
  },
  toggleButton: {
    alignSelf: 'flex-start',
  },
  filterSection: {
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  chipsRow: {
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rangeInput: {
    flex: 1,
  },
  rangeSep: {
    color: colors.textTertiary,
  },
});
