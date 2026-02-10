import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Button, Divider, Text, Switch } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useAuthStore } from '../store/auth.store';
import { useSettingsStore } from '../store/settings.store';
import { useApiUsage } from '../hooks';
import { tcgapis } from '../api/tcgapis.client';
import * as tcgService from '../services/tcg.service';
import { ConfirmDialog, useSnackbar } from '../components';
import { haptics } from '../utils/haptics';

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useSettingsStore();
  const usage = useApiUsage();
  const { showSnackbar } = useSnackbar();

  const [showClearCacheDialog, setShowClearCacheDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  function handleClearCache() {
    setShowClearCacheDialog(true);
  }

  async function confirmClearCache() {
    await tcgapis.clearCache();
    setShowClearCacheDialog(false);
    showSnackbar({ text: 'Cache limpiado correctamente', type: 'success' });
  }

  function handleSignOut() {
    setShowLogoutDialog(true);
  }

  function handleToggleDarkMode() {
    haptics.selection();
    toggleDarkMode();
  }

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>Cuenta</List.Subheader>
        <List.Item
          title="Email"
          description={user?.email ?? '-'}
          left={(props) => <List.Icon {...props} icon="email-outline" />}
        />
        <List.Item
          title="Usuario"
          description={user?.email?.split('@')[0] ?? '-'}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
        />
        <List.Item
          title="Miembro desde"
          description={user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
          left={(props) => <List.Icon {...props} icon="calendar-outline" />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Uso de API (TCGAPIs)</List.Subheader>
        {usage.data ? (
          <>
            <List.Item
              title="Llamadas hoy"
              description={`${usage.data.current.daily} de ${usage.data.limits.calls}`}
              left={(props) => <List.Icon {...props} icon="chart-bar" />}
            />
            <List.Item
              title="Restantes"
              description={String(usage.data.remaining.calls)}
              left={(props) => <List.Icon {...props} icon="counter" />}
            />
            <List.Item
              title="Llamadas en sesion"
              description={String(tcgService.getSessionCalls())}
              left={(props) => <List.Icon {...props} icon="timer-outline" />}
            />
          </>
        ) : (
          <List.Item
            title="Cargando..."
            left={(props) => <List.Icon {...props} icon="loading" />}
          />
        )}
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Ajustes</List.Subheader>
        <List.Item
          title="Modo oscuro"
          description={isDarkMode ? 'Activado' : 'Desactivado'}
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />}
        />
        <List.Item
          title="Limpiar cache TCGAPIs"
          description="Eliminar datos cacheados localmente"
          left={(props) => <List.Icon {...props} icon="delete-sweep-outline" />}
          onPress={handleClearCache}
        />
      </List.Section>

      <Button
        mode="outlined"
        onPress={handleSignOut}
        style={styles.signOutButton}
        textColor={colors.danger}
        icon="logout"
      >
        Cerrar Sesion
      </Button>

      <ConfirmDialog
        visible={showClearCacheDialog}
        title="Limpiar cache"
        message="Se eliminaran todos los datos cacheados de TCGAPIs."
        confirmLabel="Limpiar"
        onConfirm={confirmClearCache}
        onDismiss={() => setShowClearCacheDialog(false)}
      />

      <ConfirmDialog
        visible={showLogoutDialog}
        title="Cerrar sesion"
        message="Seguro que quieres salir?"
        confirmLabel="Salir"
        onConfirm={() => {
          setShowLogoutDialog(false);
          signOut();
        }}
        onDismiss={() => setShowLogoutDialog(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  signOutButton: {
    margin: spacing.lg,
    borderColor: colors.danger,
  },
});
