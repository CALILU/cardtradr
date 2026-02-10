import React, { useState, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Image, View, RefreshControl } from 'react-native';
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
import { ErrorMessage, EmptyState, CardGridItem, CardListSkeleton, CardGridSkeleton, ConfirmDialog, useSnackbar, SwipeableRow } from '../components';
import { haptics } from '../utils/haptics';
import { useSettingsStore } from '../store/settings.store';
import { exportCollectionToCsv } from '../utils/exportCsv';
import type { CollectionDetailScreenProps } from '../navigation/types';
import type { CollectionCard } from '../types';

const CONDITION_OPTIONS = [
  { value: 'near_mint', label: 'NM' },
  { value: 'lightly_played', label: 'LP' },
  { value: 'moderately_played', label: 'MP' },
  { value: 'heavily_played', label: 'HP' },
  { value: 'damaged', label: 'DMG' },
];

export default function CollectionDetailScreen({ route, navigation }: CollectionDetailScreenProps) {
  const { collectionId, collectionName } = route.params;
  const cardsQuery = useCollectionCards(collectionId);
  const removeMutation = useRemoveCardFromCollection();
  const updateMutation = useUpdateCollectionCard();
  const { showSnackbar } = useSnackbar();
  const cardViewMode = useSettingsStore((s) => s.cardViewMode);
  const toggleCardViewMode = useSettingsStore((s) => s.toggleCardViewMode);

  // Header: export + grid toggle
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon={cardViewMode === 'list' ? 'view-grid' : 'view-list'}
            size={22}
            onPress={toggleCardViewMode}
          />
          <IconButton
            icon="export-variant"
            size={22}
            onPress={handleExport}
            disabled={!cardsQuery.data?.length}
          />
        </View>
      ),
    });
  }, [navigation, cardsQuery.data, cardViewMode]);

  async function handleExport() {
    if (!cardsQuery.data) return;
    try {
      await exportCollectionToCsv(collectionName, cardsQuery.data);
      showSnackbar({ text: 'Coleccion exportada', type: 'success' });
    } catch {
      showSnackbar({ text: 'No se pudo exportar la coleccion', type: 'error' });
    }
  }

  // Remove dialog
  const [removeTarget, setRemoveTarget] = useState<CollectionCard | null>(null);

  // Edit dialog
  const [editCard, setEditCard] = useState<CollectionCard | null>(null);
  const [editQuantity, setEditQuantity] = useState('1');
  const [editCondition, setEditCondition] = useState('near_mint');
  const [editNotes, setEditNotes] = useState('');

  function handleRemove(card: CollectionCard) {
    setRemoveTarget(card);
  }

  function confirmRemove() {
    if (!removeTarget) return;
    removeMutation.mutate(removeTarget.id, {
      onSuccess: () => {
        showSnackbar({ text: 'Carta eliminada', type: 'success' });
        setRemoveTarget(null);
      },
    });
  }

  function openEditDialog(card: CollectionCard) {
    haptics.medium();
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

  if (cardsQuery.isLoading) return cardViewMode === 'grid' ? <CardGridSkeleton /> : <CardListSkeleton />;
  if (cardsQuery.error)
    return <ErrorMessage message={cardsQuery.error.message} onRetry={() => cardsQuery.refetch()} />;

  const isGrid = cardViewMode === 'grid';

  return (
    <View style={styles.container}>
      <FlatList
        key={cardViewMode}
        contentContainerStyle={cardsQuery.data?.length === 0 ? styles.emptyContainer : styles.list}
        data={cardsQuery.data}
        keyExtractor={(item) => item.id}
        numColumns={isGrid ? 2 : 1}
        columnWrapperStyle={isGrid ? styles.gridRow : undefined}
        refreshControl={
          <RefreshControl
            refreshing={cardsQuery.isRefetching}
            onRefresh={() => cardsQuery.refetch()}
          />
        }
        renderItem={({ item }) =>
          isGrid ? (
            <CardGridItem
              imageUrl={item.cached_image_url}
              name={item.card_name}
              subtitle={`x${item.quantity}`}
              onPress={() => openEditDialog(item)}
              onLongPress={() => handleRemove(item)
            />
          ) : (
            <SwipeableRow onDelete={() => handleRemove(item)}>
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
              />
            </SwipeableRow>
          )
        }
        ListEmptyComponent={
          <EmptyState
            icon="cards-outline"
            title="Coleccion vacia"
            subtitle="Busca cartas y agregalas a esta coleccion"
          />
        }
      />

      {/* Dialog confirmar eliminacion */}
      <ConfirmDialog
        visible={!!removeTarget}
        title="Eliminar carta"
        message={`Quieres eliminar "${removeTarget?.card_name}" de ${collectionName}?`}
        onConfirm={confirmRemove}
        onDismiss={() => setRemoveTarget(null)}
        loading={removeMutation.isPending}
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
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
});
