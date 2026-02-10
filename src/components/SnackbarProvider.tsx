/**
 * Proveedor global de Snackbar para notificaciones.
 * Usa Paper Snackbar + Portal, con cola de mensajes.
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Snackbar, Portal } from 'react-native-paper';
import { colors } from '../theme';

interface SnackbarMessage {
  text: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface SnackbarContextType {
  showSnackbar: (msg: SnackbarMessage) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

const TYPE_COLORS: Record<SnackbarMessage['type'], string> = {
  success: colors.secondary,
  error: colors.danger,
  info: colors.primary,
};

const TYPE_DURATION: Record<SnackbarMessage['type'], number> = {
  success: 3000,
  error: 5000,
  info: 3000,
};

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<SnackbarMessage | null>(null);
  const queue = useRef<SnackbarMessage[]>([]);

  const showNext = useCallback(() => {
    if (queue.current.length > 0) {
      const next = queue.current.shift()!;
      setCurrent(next);
      setVisible(true);
    }
  }, []);

  const showSnackbar = useCallback(
    (msg: SnackbarMessage) => {
      if (visible) {
        queue.current.push(msg);
      } else {
        setCurrent(msg);
        setVisible(true);
      }
    },
    [visible],
  );

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setTimeout(showNext, 200);
  }, [showNext]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={handleDismiss}
          duration={current?.duration ?? TYPE_DURATION[current?.type ?? 'info']}
          style={{ backgroundColor: TYPE_COLORS[current?.type ?? 'info'] }}
          action={
            current?.actionLabel
              ? { label: current.actionLabel, onPress: current.onAction }
              : undefined
          }
        >
          {current?.text ?? ''}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
}
