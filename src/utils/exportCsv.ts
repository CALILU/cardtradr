import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { CollectionCard } from '../types';

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export async function exportCollectionToCsv(
  collectionName: string,
  cards: CollectionCard[],
): Promise<void> {
  const header = 'Nombre,Cantidad,Condicion,Precio Adquisicion,Precio Actual,Foil,Notas';

  const rows = cards.map((card) => {
    const name = escapeCsvField(card.card_name);
    const qty = card.quantity;
    const condition = card.condition.replace(/_/g, ' ');
    const acquiredPrice = card.acquired_price ?? '';
    const currentPrice = card.cached_price ?? '';
    const foil = card.is_foil ? 'Si' : 'No';
    const notes = escapeCsvField(card.notes ?? '');
    return `${name},${qty},${condition},${acquiredPrice},${currentPrice},${foil},${notes}`;
  });

  const csvContent = [header, ...rows].join('\n');

  const fileName = `${collectionName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.csv`;
  const filePath = `${FileSystem.cacheDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(filePath, csvContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(filePath, {
      mimeType: 'text/csv',
      dialogTitle: `Exportar ${collectionName}`,
    });
  }
}
