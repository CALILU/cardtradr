import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SearchStackParamList } from './types';
import SearchScreen from '../screens/SearchScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar Cartas' }} />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={({ route }) => ({
          title: route.params.cardName,
          animation: 'slide_from_bottom',
        })}
      />
    </Stack.Navigator>
  );
}
