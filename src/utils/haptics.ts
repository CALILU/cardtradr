/**
 * Wrapper sobre expo-haptics para feedback tactil.
 * Cada funcion es fire-and-forget (no await necesario).
 */

import * as Haptics from 'expo-haptics';

export const haptics = {
  /** Toque ligero - toggles, selecciones */
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  /** Toque medio - agregar a coleccion, confirmar */
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  /** Toque fuerte - eliminar, accion destructiva */
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  /** Notificacion de exito */
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  /** Notificacion de error */
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  /** Notificacion de advertencia */
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  /** Cambio de seleccion */
  selection: () => Haptics.selectionAsync(),
};
