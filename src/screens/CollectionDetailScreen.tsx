import React from 'react';
import { FlatList, StyleSheet, Image, View, Alert } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useCollectionCards, useRemoveCardFromCollection } from '../hooks';
import { LoadingScreen, ErrorMessage, EmptyState } from '../components';
import type { CollectionDetailScreenProps } from '../navigation/types';

export default function CollectionDetailScreen({ route }: CollectionDetailScreenProps) {
  const { collectionId, collectionName } = route.params;
  const cardsQuery = useCollectionCards(collectionId);
  const removeMutation = useRemoveCardFromCollection();

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

  if (cardsQuery.isLoading) return <LoadingScreen message="Cargando cartas..." />;
  if (cardsQuery.error)
    return <ErrorMessage message={cardsQuery.error.message} onRetry={() => cardsQuery.refetch()} />;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={cardsQuery.data?.length === 0 ? styles.emptyContainer : styles.list}
      data={cardsQuery.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <List.Item
          title={item.card_name}
          description={`${item.set_name ?? ''} x${item.quantity} - ${item.condition.replace('_', ' ')}`}
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
});
