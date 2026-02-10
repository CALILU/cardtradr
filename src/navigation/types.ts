/**
 * Tipos de navegacion para CardTradr.
 * Define los parametros de cada pantalla y navigator.
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// ============================================================
// Param Lists
// ============================================================

/** Stack de autenticacion (login/registro) */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/** Stack de busqueda (buscar → detalle carta) */
export type SearchStackParamList = {
  Search: undefined;
  CardDetail: { productId: number; cardName: string; groupId: number };
};

/** Stack de coleccion (lista → detalle) */
export type CollectionStackParamList = {
  CollectionList: undefined;
  CollectionDetail: { collectionId: string; collectionName: string };
};

/** Stack de wishlist */
export type WishlistStackParamList = {
  Wishlist: undefined;
};

/** Tabs principales de la app */
export type AppTabsParamList = {
  HomeTab: undefined;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  CollectionTab: NavigatorScreenParams<CollectionStackParamList>;
  WishlistTab: NavigatorScreenParams<WishlistStackParamList>;
  ProfileTab: undefined;
};

/** Navigator raiz (auth gate) */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabsParamList>;
};

// ============================================================
// Screen Props (usar en cada componente de pantalla)
// ============================================================

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabsParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type SearchScreenProps = NativeStackScreenProps<SearchStackParamList, 'Search'>;
export type CardDetailScreenProps = NativeStackScreenProps<SearchStackParamList, 'CardDetail'>;

export type CollectionListScreenProps = NativeStackScreenProps<
  CollectionStackParamList,
  'CollectionList'
>;
export type CollectionDetailScreenProps = NativeStackScreenProps<
  CollectionStackParamList,
  'CollectionDetail'
>;

export type WishlistScreenProps = NativeStackScreenProps<WishlistStackParamList, 'Wishlist'>;

export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabsParamList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
