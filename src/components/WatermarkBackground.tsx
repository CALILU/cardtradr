import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BG_IMAGES = [
  require('../../assets/backgrounds/bg-cards-1.png'),
  require('../../assets/backgrounds/bg-cards-2.png'),
];

interface WatermarkBackgroundProps {
  /** Index 0 or 1 to pick which background image to use */
  variant?: 0 | 1;
  children: React.ReactNode;
}

/**
 * Full-screen watermark background that renders one of the two
 * TCG-themed images at low opacity so UI content stays readable.
 */
export function WatermarkBackground({ variant = 0, children }: WatermarkBackgroundProps) {
  const source = BG_IMAGES[variant % BG_IMAGES.length];

  return (
    <View style={styles.root}>
      <ImageBackground
        source={source}
        style={styles.background}
        imageStyle={styles.image}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  image: {
    opacity: 0.06,
  },
});
