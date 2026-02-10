import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  type ViewToken,
} from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useSettingsStore } from '../store/settings.store';

interface Slide {
  key: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const SLIDES: Slide[] = [
  {
    key: 'welcome',
    icon: 'cards-playing-outline',
    title: 'Bienvenido a CardTradr',
    description:
      'Tu gestor personal de colecciones de cartas TCG. Organiza, busca y gestiona todas tus cartas en un solo lugar.',
    color: colors.primary,
  },
  {
    key: 'features',
    icon: 'star-outline',
    title: 'Todo lo que necesitas',
    description:
      'Soporte para 50+ juegos TCG. Precios actualizados. Lista de deseos con prioridades. Todo sincronizado en la nube.',
    color: colors.secondary,
  },
  {
    key: 'cta',
    icon: 'rocket-launch-outline',
    title: 'Empieza ahora',
    description:
      'Crea tu cuenta gratuita y comienza a gestionar tu coleccion hoy mismo.',
    color: colors.primaryDark,
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const setOnboardingCompleted = useSettingsStore((s) => s.setOnboardingCompleted);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken<Slide>[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  function handleNext() {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      setOnboardingCompleted();
    }
  }

  return (
    <View style={styles.container}>
      {/* Saltar */}
      <View style={styles.skipContainer}>
        {activeIndex < SLIDES.length - 1 ? (
          <Button mode="text" onPress={setOnboardingCompleted} textColor={colors.textSecondary}>
            Saltar
          </Button>
        ) : (
          <View />
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Icon source={item.icon} size={120} color={item.color} />
            <Text variant="headlineMedium" style={styles.title}>
              {item.title}
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Dots + Button */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((slide, i) => (
            <View
              key={slide.key}
              style={[
                styles.dot,
                { backgroundColor: i === activeIndex ? SLIDES[activeIndex].color : colors.borderLight },
              ]}
            />
          ))}
        </View>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          buttonColor={SLIDES[activeIndex].color}
        >
          {activeIndex === SLIDES.length - 1 ? 'Comenzar' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: spacing.lg,
    color: colors.text,
  },
  description: {
    textAlign: 'center',
    marginTop: spacing.sm,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl * 2,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
  },
});
