import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CollectionStackParamList } from './types';
import CollectionListScreen from '../screens/CollectionListScreen';
import CollectionDetailScreen from '../screens/CollectionDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<CollectionStackParamList>();

export default function CollectionStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
      }}
    >
      <Stack.Screen
        name="CollectionList"
        component={CollectionListScreen}
        options={{ title: 'Mis Colecciones' }}
      />
      <Stack.Screen
        name="CollectionDetail"
        component={CollectionDetailScreen}
        options={({ route }) => ({ title: route.params.collectionName })}
      />
    </Stack.Navigator>
  );
}
