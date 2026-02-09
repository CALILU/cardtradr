import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { List, Button, Divider, Text } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { useAuthStore } from '../store/auth.store';
import { useApiUsage } from '../hooks';
import { tcgapis } from '../api/tcgapis.client';
import * as tcgService from '../services/tcg.service';

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  const usage = useApiUsage();

  function handleClearCache() {
    Alert.alert('Limpiar cache', 'Se eliminaran todos los datos cacheados de TCGAPIs.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpiar',
        style: 'destructive',
        onPress: async () => {
          await tcgapis.clearCache();
          Alert.alert('Cache limpiado');
        },
      },
    ]);
  }

  function handleSignOut() {
    Alert.alert('Cerrar sesion', 'Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: signOut },
    ]);
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
