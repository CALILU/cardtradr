import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';

interface ResultsCounterProps {
  filteredCount: number;
  totalCount: number;
}

export function ResultsCounter({ filteredCount, totalCount }: ResultsCounterProps) {
  const hasFilter = filteredCount !== totalCount;
  const text = hasFilter
    ? `${filteredCount} de ${totalCount} cartas`
    : `${totalCount} cartas`;

  return (
    <Text variant="labelSmall" style={styles.text}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
});
