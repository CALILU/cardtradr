/**
 * Componente base skeleton con efecto shimmer.
 * Usa react-native-reanimated para animacion fluida.
 */

import React, { useEffect } from 'react';
import { StyleSheet, type DimensionValue, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';

interface SkeletonPlaceholderProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonPlaceholder({
  width,
  height,
  borderRadius = 4,
  style,
}: SkeletonPlaceholderProps) {
  const theme = useTheme();
  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [translateX]);

  const baseColor = theme.dark ? 'rgba(255,255,255,0.08)' : theme.colors.surfaceVariant;
  const shimmerColor = theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)';

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value * 200 }],
    opacity: 0.5 + translateX.value * 0.3,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: baseColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: shimmerColor },
          shimmerStyle,
        ]}
      />
    </Animated.View>
  );
}
