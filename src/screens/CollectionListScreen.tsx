import React, { useState } from 'react';
import { FlatList, RefreshControl, Alert, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  FAB,
  Dialog,
  Portal,
  TextInput,
  Button,
  Chip,
  Menu,
} from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useCollections, useCreateCollection, useUpdateCollection, useDeleteCollection } from '../hooks';
import { LoadingScreen, ErrorMessage, EmptyState } from '../components';
import type { CollectionListScreenProps } from '../navigation/types';
import type { Collection } from '../types';

const TCG_OPTIONS = ['pokemon', 'magic', 'yugioh', 'digimon', 'one-piece', 'otro'];

export default function CollectionListScreen({ navigation }: CollectionListScreenProps) {
  const collectionsQuery = useCollections();
  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection();
  const deleteMutation = useDeleteCollection();

  // Dialog crear coleccion
  const [showDialog, setShowDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTcg, setNewTcg] = useState('pokemon');

  // Menu contextual (long-press)
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  // Dialog editar nombre
  const [editCollection, setEditCollection] = useState<Collection | null>(null);
  const [editName, setEditName] = useState('');

  function handleCreate() {
    if (!newName.trim()) return;
    createMutation.mutate(
      { name: newName.trim(), tcg_type: newTcg },
      {
        onSuccess: () => {
          setShowDialog(false);
          setNewName('');
          setNewTcg('pokemon');
        },
      },
    );
  }

  function handleLongPress(collection: Collection, event: { nativeEvent: { pageX: number; pageY: number } }) {
    setMenuAnchor({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
    setMenuVisible(collection.id);
  }

  function openEdit(collection: Collection) {
    setMenuVisible(null);
    setEditCollection(collection);
    setEditName(collection.name);
  }

  function handleUpdate() {
    if (!editCollection || !editName.trim()) return;
    updateMutation.mutate(
      { id: editCollection.id, updates: { name: editName.trim() } },
      {
        onSuccess: () => setEditCollection(null),
      },
    );
  }

  function handleDelete(collection: Collection) {
    setMenuVisible(null);
    Alert.alert(
      'Eliminar coleccion',
      `Se eliminara "${collection.name}" y todas sus cartas. Esta accion no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(collection.id),
        },
      ],
    );
  }

  if (collectionsQuery.isLoading) return <LoadingScreen message="Cargando colecciones..." />;
  if (collectionsQuery.error)
    return (
      <ErrorMessage
        message={collectionsQuery.error.message}
        onRetry={() => collectionsQuery.refetch()}
      />
    );

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={
          collectionsQuery.data?.length === 0 ? styles.emptyContainer : styles.list
        }
        data={collectionsQuery.data}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={collectionsQuery.isRefetching}
            onRefresh={() => collectionsQuery.refetch()}
          />
        }
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            mode="elevated"
            onPress={() =>
              navigation.navigate('CollectionDetail', {
                collectionId: item.id,
                collectionName: item.name,
              })
            }
            onLongPress={(e) => handleLongPress(item, e)}
          >
            <Card.Title
              title={item.name}
              subtitle={item.description || undefined}
              right={() => (
                <Chip style={styles.tcgChip} compact>
                  {item.tcg_type}
                </Chip>
              )}
            />
          </Card>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="cards-outline"
            title="Sin colecciones"
            subtitle="Crea tu primera coleccion para empezar"
            actionLabel="Crear coleccion"
            onAction={() => setShowDialog(true)}
          />
        }
      />

      {/* Menu contextual */}
      <Menu
        visible={!!menuVisible}
        onDismiss={() => setMenuVisible(null)}
        anchor={menuAnchor}
      >
        <Menu.Item
          leadingIcon="pencil-outline"
          title="Renombrar"
          onPress={() => {
            const col = collectionsQuery.data?.find((c) => c.id === menuVisible);
            if (col) openEdit(col);
          }}
        />
        <Menu.Item
          leadingIcon="delete-outline"
          title="Eliminar"
          onPress={() => {
            const col = collectionsQuery.data?.find((c) => c.id === menuVisible);
            if (col) handleDelete(col);
          }}
        />
      </Menu>

      {/* FAB crear */}
      {(collectionsQuery.data?.length ?? 0) > 0 && (
        <FAB icon="plus" style={styles.fab} onPress={() => setShowDialog(true)} />
      )}

      {/* Dialog crear coleccion */}
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Nueva coleccion</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre"
              value={newName}
              onChangeText={setNewName}
              style={styles.dialogInput}
            />
            <Text variant="labelMedium" style={styles.tcgLabel}>
              Tipo de TCG
            </Text>
            <FlatList
              horizontal
              data={TCG_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Chip
                  selected={newTcg === item}
                  onPress={() => setNewTcg(item)}
                  style={styles.tcgOption}
                >
                  {item}
                </Chip>
              )}
              showsHorizontalScrollIndicator={false}
            />
            {createMutation.error && (
              <Text style={styles.errorText}>
                {createMutation.error instanceof Error
                  ? createMutation.error.message
                  : 'Error al crear'}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancelar</Button>
            <Button
              onPress={handleCreate}
              disabled={!newName.trim() || createMutation.isPending}
              loading={createMutation.isPending}
            >
              Crear
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Dialog editar nombre */}
      <Portal>
        <Dialog visible={!!editCollection} onDismiss={() => setEditCollection(null)}>
          <Dialog.Title>Renombrar coleccion</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre"
              value={editName}
              onChangeText={setEditName}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditCollection(null)}>Cancelar</Button>
            <Button
              onPress={handleUpdate}
              disabled={!editName.trim() || updateMutation.isPending}
              loading={updateMutation.isPending}
            >
              Guardar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.sm,
  },
  tcgChip: {
    marginRight: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.primary,
  },
  dialogInput: {
    marginBottom: spacing.md,
  },
  tcgLabel: {
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  tcgOption: {
    marginRight: spacing.xs,
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.sm,
  },
});
