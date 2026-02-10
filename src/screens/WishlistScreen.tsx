import React, { useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  Chip,
  IconButton,
  Dialog,
  Portal,
  Button,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useWishlist, useUpdateWishlistItem, useRemoveFromWishlist } from '../hooks';
import { ErrorMessage, EmptyState, WishlistSkeleton, ConfirmDialog, useSnackbar, SwipeableRow } from '../components';
import { haptics } from '../utils/haptics';
import type { WishlistItem } from '../types';

const PRIORITY_LABELS: Record<number, string> = {
  1: 'Baja',
  2: 'Normal',
  3: 'Media',
  4: 'Alta',
  5: 'Urgente',
};

const PRIORITY_COLORS: Record<number, string> = {
  1: colors.textTertiary,
  2: colors.info,
  3: colors.secondary,
  4: colors.warning,
  5: colors.danger,
};

export default function WishlistScreen() {
  const wishlist = useWishlist();
  const updateMutation = useUpdateWishlistItem();
  const removeMutation = useRemoveFromWishlist();
  const { showSnackbar } = useSnackbar();

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<WishlistItem | null>(null);

  // Edit dialog
  const [editItem, setEditItem] = useState<WishlistItem | null>(null);
  const [editPriority, setEditPriority] = useState('3');
  const [editMaxPrice, setEditMaxPrice] = useState('');
  const [editNotes, setEditNotes] = useState('');

  if (wishlist.isLoading) return <WishlistSkeleton />;
  if (wishlist.error)
    return <ErrorMessage message={wishlist.error.message} onRetry={() => wishlist.refetch()} />;

  function openEditDialog(item: WishlistItem) {
    setEditItem(item);
    setEditPriority(String(item.priority));
    setEditMaxPrice(item.max_price ? String(item.max_price) : '');
    setEditNotes(item.notes || '');
  }

  function handleUpdate() {
    if (!editItem) return;
    updateMutation.mutate(
      {
        id: editItem.id,
        updates: {
          priority: Number(editPriority),
          max_price: editMaxPrice ? Number(editMaxPrice) : null,
          notes: editNotes || null,
        },
      },
      {
        onSuccess: () => {
          haptics.success();
          setEditItem(null);
        },
      },
    );
  }

  function handleDelete(item: WishlistItem) {
    setDeleteTarget(item);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    removeMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        showSnackbar({ text: 'Eliminada de wishlist', type: 'success' });
        setDeleteTarget(null);
      },
    });
  }

  function renderItem({ item }: { item: WishlistItem }) {
    return (
      <SwipeableRow onDelete={() => handleDelete(item)}>
        <Card style={styles.card} mode="elevated" onPress={() => openEditDialog(item)}>
          <Card.Content style={styles.cardContent}>
            {item.cached_image_url && (
              <Card.Cover
                source={{ uri: item.cached_image_url }}
                style={styles.cardImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.cardInfo}>
              <Text variant="titleSmall" numberOfLines={2}>
                {item.card_name}
              </Text>
              <Text variant="bodySmall" style={styles.tcgType}>
                {item.tcg_type}
              </Text>
              <View style={styles.chipRow}>
                <Chip
                  compact
                  textStyle={styles.chipText}
                  style={[styles.priorityChip, { backgroundColor: PRIORITY_COLORS[item.priority] + '20' }]}
                >
                  {PRIORITY_LABELS[item.priority] || 'Normal'}
                </Chip>
                {item.max_price && (
                  <Chip compact icon="cash" textStyle={styles.chipText}>
                    Max {item.max_price.toFixed(2)}
                  </Chip>
                )}
              </View>
            </View>
          </Card.Content>
        </Card>
      </SwipeableRow>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist.data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={wishlist.data?.length === 0 ? styles.emptyContainer : styles.list}
        refreshControl={
          <RefreshControl refreshing={wishlist.isRefetching} onRefresh={() => wishlist.refetch()} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Wishlist vacia"
            subtitle="Busca cartas y agregalas a tu lista de deseos"
          />
        }
      />

      {/* Dialog confirmar eliminacion */}
      <ConfirmDialog
        visible={!!deleteTarget}
        title="Eliminar de wishlist"
        message={`Quitar "${deleteTarget?.card_name}" de la wishlist?`}
        onConfirm={confirmDelete}
        onDismiss={() => setDeleteTarget(null)}
        loading={removeMutation.isPending}
      />

      {/* Dialog editar item */}
      <Portal>
        <Dialog visible={!!editItem} onDismiss={() => setEditItem(null)}>
          <Dialog.Title>Editar {editItem?.card_name}</Dialog.Title>
          <Dialog.Content>
            <Text variant="labelMedium" style={styles.fieldLabel}>
              Prioridad
            </Text>
            <SegmentedButtons
              value={editPriority}
              onValueChange={setEditPriority}
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
              label="Precio maximo"
              value={editMaxPrice}
              onChangeText={setEditMaxPrice}
              keyboardType="numeric"
              mode="outlined"
              left={<TextInput.Icon icon="cash" />}
              style={styles.input}
            />
            <TextInput
              label="Notas"
              value={editNotes}
              onChangeText={setEditNotes}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditItem(null)}>Cancelar</Button>
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
  list: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: spacing.sm,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: colors.surfaceVariant,
  },
  cardInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  tcgType: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  priorityChip: {
    height: 28,
  },
  chipText: {
    fontSize: 11,
  },
  fieldLabel: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  segmented: {
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
});
