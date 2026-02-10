import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  Card,
  Chip,
  Dialog,
  Portal,
  RadioButton,
  ActivityIndicator,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useCards, useCollections, useAddCardToCollection, useAddToWishlist } from '../hooks';
import { LoadingScreen, ErrorMessage } from '../components';
import type { CardDetailScreenProps } from '../navigation/types';
import type { TCGCard } from '../types';

export default function CardDetailScreen({ route }: CardDetailScreenProps) {
  const { productId, cardName, groupId } = route.params;

  // Buscar la carta en el cache de React Query
  const cardsQuery = useCards(groupId);
  const card = cardsQuery.data?.cards.find((c) => c.productId === productId);

  // Dialog "Agregar a coleccion"
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const collectionsQuery = useCollections();
  const addMutation = useAddCardToCollection();

  // Dialog "Agregar a wishlist"
  const [showWishlistDialog, setShowWishlistDialog] = useState(false);
  const [wishlistPriority, setWishlistPriority] = useState('3');
  const [wishlistMaxPrice, setWishlistMaxPrice] = useState('');
  const addToWishlistMutation = useAddToWishlist();

  if (cardsQuery.isLoading) return <LoadingScreen message="Cargando carta..." />;
  if (cardsQuery.error)
    return <ErrorMessage message={cardsQuery.error.message} onRetry={() => cardsQuery.refetch()} />;
  if (!card) return <ErrorMessage message={`Carta "${cardName}" no encontrada`} />;

  async function handleAddToCollection() {
    if (!selectedCollectionId || !card) return;

    addMutation.mutate(
      {
        collection_id: selectedCollectionId,
        card_id: String(card.productId),
        tcg_type: String(card.groupId),
        card_name: card.cleanName || card.name,
        set_name: card.number ?? undefined,
        cached_image_url: card.image ?? undefined,
      },
      {
        onSuccess: () => {
          setShowDialog(false);
          setSelectedCollectionId('');
        },
      },
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Imagen */}
      {card.image && (
        <Image source={{ uri: card.image }} style={styles.image} resizeMode="contain" />
      )}

      {/* Info basica */}
      <Text variant="headlineSmall" style={styles.name}>
        {card.cleanName || card.name}
      </Text>

      <View style={styles.chips}>
        {card.rarity && <Chip icon="star">{card.rarity}</Chip>}
        {card.number && <Chip icon="numeric">#{card.number}</Chip>}
      </View>

      {/* Datos extendidos */}
      {card.extendedData && card.extendedData.length > 0 && (
        <Card style={styles.section} mode="elevated">
          <Card.Title title="Detalles" />
          <Card.Content>
            {card.extendedData.map((ext, i) => (
              <View key={i} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{ext.displayName || ext.name}</Text>
                <Text>{ext.value}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* SKUs */}
      {card.skus && card.skus.length > 0 && (
        <Card style={styles.section} mode="elevated">
          <Card.Title title="Versiones disponibles" />
          <Card.Content>
            {card.skus.map((sku) => (
              <View key={sku.skuId} style={styles.detailRow}>
                <Text>
                  {sku.condName} - {sku.printingName}
                </Text>
                <Text style={styles.detailLabel}>{sku.languageName}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Botones agregar */}
      <Button
        mode="contained"
        icon="plus"
        onPress={() => setShowDialog(true)}
        style={styles.addButton}
      >
        Agregar a Coleccion
      </Button>
      <Button
        mode="outlined"
        icon="heart-outline"
        onPress={() => setShowWishlistDialog(true)}
        style={styles.wishlistButton}
      >
        Agregar a Wishlist
      </Button>

      {/* Dialog seleccionar coleccion */}
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Seleccionar coleccion</Dialog.Title>
          <Dialog.Content>
            {collectionsQuery.isLoading && <ActivityIndicator />}
            {collectionsQuery.data?.length === 0 && (
              <Text>No tienes colecciones. Crea una primero.</Text>
            )}
            <RadioButton.Group
              value={selectedCollectionId}
              onValueChange={setSelectedCollectionId}
            >
              {collectionsQuery.data?.map((col) => (
                <RadioButton.Item key={col.id} label={col.name} value={col.id} />
              ))}
            </RadioButton.Group>
            {addMutation.error && (
              <Text style={styles.errorText}>
                {addMutation.error instanceof Error
                  ? addMutation.error.message
                  : 'Error al agregar'}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancelar</Button>
            <Button
              onPress={handleAddToCollection}
              disabled={!selectedCollectionId || addMutation.isPending}
              loading={addMutation.isPending}
            >
              Agregar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Dialog wishlist */}
      <Portal>
        <Dialog visible={showWishlistDialog} onDismiss={() => setShowWishlistDialog(false)}>
          <Dialog.Title>Agregar a Wishlist</Dialog.Title>
          <Dialog.Content>
            <Text variant="labelMedium" style={styles.fieldLabel}>
              Prioridad
            </Text>
            <SegmentedButtons
              value={wishlistPriority}
              onValueChange={setWishlistPriority}
              buttons={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
              ]}
              style={styles.segmented}
            />
            <TextInput
              label="Precio maximo (opcional)"
              value={wishlistMaxPrice}
              onChangeText={setWishlistMaxPrice}
              keyboardType="numeric"
              mode="outlined"
              left={<TextInput.Icon icon="cash" />}
            />
            {addToWishlistMutation.error && (
              <Text style={styles.errorText}>
                {addToWishlistMutation.error instanceof Error
                  ? addToWishlistMutation.error.message
                  : 'Error al agregar'}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowWishlistDialog(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                if (!card) return;
                addToWishlistMutation.mutate(
                  {
                    card_id: String(card.productId),
                    tcg_type: String(card.groupId),
                    card_name: card.cleanName || card.name,
                    priority: Number(wishlistPriority),
                    max_price: wishlistMaxPrice ? Number(wishlistMaxPrice) : undefined,
                    cached_image_url: card.image ?? undefined,
                  },
                  {
                    onSuccess: () => {
                      setShowWishlistDialog(false);
                      setWishlistPriority('3');
                      setWishlistMaxPrice('');
                    },
                  },
                );
              }}
              loading={addToWishlistMutation.isPending}
              disabled={addToWishlistMutation.isPending}
            >
              Agregar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  image: {
    width: '100%',
    height: 350,
    marginBottom: spacing.md,
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  detailLabel: {
    color: colors.textSecondary,
  },
  addButton: {
    marginTop: spacing.md,
  },
  wishlistButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  fieldLabel: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  segmented: {
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.sm,
  },
});
