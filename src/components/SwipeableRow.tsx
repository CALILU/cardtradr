/**
 * Wrapper swipe-to-delete usando react-native-gesture-handler.
 * Deslizar a la izquierda revela boton rojo de eliminar.
 */

import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { colors } from '../theme';
import { haptics } from '../utils/haptics';

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
  enabled?: boolean;
}

export function SwipeableRow({ children, onDelete, enabled = true }: SwipeableRowProps) {
  const swipeableRef = useRef<Swipeable>(null);

  if (!enabled) return <>{children}</>;

  function renderRightActions(
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.deleteContainer}>
        <Animated.View style={[styles.deleteAction, { transform: [{ scale }] }]}>
          <IconButton icon="delete-outline" iconColor="#fff" size={24} />
        </Animated.View>
      </View>
    );
  }

  function handleSwipeOpen() {
    haptics.warning();
    swipeableRef.current?.close();
    onDelete();
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeOpen}
      overshootRight={false}
      rightThreshold={80}
      friction={2}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: 12,
    marginBottom: 8,
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
