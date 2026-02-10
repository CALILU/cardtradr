import React, { useState } from 'react';
import { FlatList, StyleSheet, Image, View, Alert, RefreshControl } from 'react-native';
import {
  List,
  Text,
  IconButton,
  Dialog,
  Portal,
  Button,
  TextInput,
  SegmentedButtons,
} from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useCollectionCards, useRemoveCardFromCollection, useUpdateCollectionCard } from '../hooks';
import { LoadingScreen, ErrorMessage, EmptyState } from '../components';
import type { CollectionDetailScreenProps } from '../navigation/types';
import type { CollectionCard } from '../types';

const CONDITION_OPTIONS = [
  { value: 'near_mint', label: 'NM' },
  { value: 'lightly_played', label: 'LP' },
  { value: 'moderately_played', label: 'MP' },
  { value: 'heavily_played', label: 'HP' },
  { value: 'damaged', label: 'DMG' },
];

export default function CollectionDetailScreen({ route }: CollectionDetailScreenProps) {
  const { collectionId, collectionName } = route.params;
  const cardsQuery = useCollectionCards(collectionId);
  const removeMutation = useRemoveCardFromCollection();
  const updateMutation = useUpdateCollectionCard();

  // Edit dialog
  const [editCard, setEditCard] = useState<CollectionCard | null>(null);
  const [editQuantity, setEditQuantity] = useState('1');
  const [editCondition, setEditCondition] = useState('near_mint');
  const [editNotes, setEditNotes] = useState('');

  function handleRemove(cardId: string, cardName: string) {
    Alert.alert('Eliminar carta', `Quieres eliminar "${cardName}" de ${collectionName}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => removeMutation.mutate(cardId),
      },
    ]);
  }

  function openEditDialog(card: CollectionCard) {
    setEditCard(card);
    setEditQuantity(String(card.quantity));
    setEditCondition(card.condition);
    setEditNotes(card.notes || '');
  }

  function handleUpdate() {
    if (!editCard) return;
    const qty = Number(editQuantity);
    if (isNaN(qty) || qty < 1) return;

    updateMutation.mutate(
      {
        id: editCard.id,
        updates: {
          quantity: qty,
          condition: editCondition,
          notes: editNotes || null,
        },
      },
      { onSuccess: () => setEditCard(null) },
    );
  }

  if (cardsQuery.isLoading) return <LoadingScreen message="Cargando cartas..." />;
  if (cardsQuery.error)
    return <ErrorMessage message={cardsQuery.error.message} onRetry={() => cardsQuery.refetch()} />;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={cardsQuery.data?.length === 0 ? styles.emptyContainer : styles.list}
        data={cardsQuery.data}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={cardsQuery.isRefetching}
            onRefresh={() => cardsQuery.refetch()}
          />
        }
        renderItem={({ item }) => (
          <List.Item
            title={item.card_name}
            description={`x${item.quantity} - ${item.condition.replace(/_/g, ' ')}`}
            onPress={() => openEditDialog(item)}
            left={() =>
              item.cached_image_url ? (
                <Image source={{ uri: item.cached_image_url }} style={styles.thumbnail} />
              ) : (
                <View style={styles.placeholderThumb} />
              )
            }
            right={() => (
              <IconButton
                icon="delete-outline"
                size={20}
                onPress={() => handleRemove(item.id, item.card_name)}
              />
            )}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="cards-outline"
            title="Coleccion vacia"
            subtitle="Busca cartas y agregalas a esta coleccion"
          />
        }
      />

      {/* Dialog editar carta */}
      <Portal>
        <Dialog visible={!!editCard} onDismiss={() => setEditCard(null)}>
          <Dialog.Title numberOfLines={2}>{editCard?.card_name}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Cantidad"
              value={editQuantity}
              onChangeText={setEditQuantity}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
            <Text variant="labelMedium" style={styles.fieldLabel}>
              Condicion
            </Text>
            <SegmentedButtons
              value={editCondition}
              onValueChange={setEditCondition}
              buttons={CONDITION_OPTIONS}
              style={styles.segmented}
            />
            <TextInput
              label="Notas (opcional)"
              value={editNotes}
              onChangeText={setEditNotes}
              mode="outlined"
              multiline
              numberOfLines={2}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditCard(null)}>Cancelar</Button>
            <Button
              onPress={handleUpdate}
              loading={updateMutation.isPending}
              disabled={updateMutation.isPending}
            >
              Guardar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
  },
  list: {
    paddingVertical: spacing.sm,
  },
  thumbnail: {
    width: 40,
    height: 56,
    borderRadius: 4,
    marginLeft: spacing.md,
  },
  placeholderThumb: {
    width: 40,
    height: 56,
    borderRadius: 4,
    marginLeft: spacing.md,
    backgroundColor: colors.surfaceVariant,
  },
  input: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  segmented: {
    marginBottom: spacing.md,
  },
});
