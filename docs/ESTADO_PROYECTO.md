# CardTradr - Estado del Proyecto

## Fecha: 2026-02-09

## Que es CardTradr
App movil (React Native + Expo) para gestionar colecciones de cartas TCG (Pokemon, Magic, Yu-Gi-Oh, etc.). Soporta 86 juegos via TCGAPIs. Proyecto de aprendizaje para Isidro (desarrollador Python/PyQt5, primera app React Native).

## Stack Tecnologico
- **Framework**: Expo SDK 52 + TypeScript strict
- **UI**: React Native Paper (Material Design 3)
- **Navegacion**: React Navigation v7 (native-stack + bottom-tabs)
- **Estado**: Zustand (auth) + React Query (server state)
- **Backend**: Supabase (auth + PostgreSQL + RLS)
- **API externa**: TCGAPIs (catalogo de cartas, plan FREE 100 calls/dia)
- **Cache**: AsyncStorage (games 7d, expansions 24h, cards 24h)

## Repositorio
- **GitHub**: https://github.com/CALILU/cardtradr
- **Local**: `/mnt/f/cardtradr/` (Windows F:\cardtradr)
- **Nota WSL2**: `npm install` NO funciona desde WSL2 en drive NTFS. Ejecutar siempre desde PowerShell de Windows.

## Credenciales

### TCGAPIs (plan FREE, 100 calls/dia)
- Base URL: `https://api.tcgapis.com/api/v1`
- API Key: en `.env` (archivo gitignored)
- Header: `X-API-Key`
- Endpoints disponibles (free): `/health`, `/games`, `/expansions/{categoryId}`, `/cards/{groupId}`, `/user/usage`, `/user/profile`
- Endpoints bloqueados (requieren plan superior): `/prices` (Business), `/skuprices` (Unlimited), `/livelistings` (Unlimited)
- `/recognize` NO existe (el informe original estaba equivocado)

### Supabase
- Proyecto: `cardtradr`
- URL: `https://fnvbrtsquktmvepscfwe.supabase.co`
- Anon Key (legacy JWT): en `.env`
- IMPORTANTE: Supabase cambio formato de API keys. Las nuevas (`sb_publishable_...`) NO funcionan con `@supabase/supabase-js`. Usar las **Legacy keys** (formato `eyJ...`) desde Settings > API > Legacy anon, service_role API keys.
- Contrasena BD: `kcul3tzn8ACGY8CG`
- Schema SQL ejecutado: 4 tablas (profiles, collections, collection_cards, wishlists) + RLS + triggers
- Email provider: activado, confirmacion por email activa (se confirmo manualmente el primer usuario)
- Usuario de prueba: `isidromislata@gmail.com` (confirmado manualmente en dashboard)

## Fases Completadas

### FASE 0: Setup (completada)
- Proyecto Expo creado manualmente (no con create-expo-app, por problemas WSL2)
- Todas las dependencias instaladas
- TypeScript strict, ESLint + Prettier configurados
- Cliente TCGAPIs con cache agresivo en AsyncStorage
- Cliente Supabase con auth persistente
- Esquema SQL con RLS ejecutado
- Tema MD3 (primary #4267B2, dark mode preparado)
- Tipos TypeScript basados en respuestas reales de la API
- Git init + push a GitHub

### FASE 1: Navegacion + Pantallas + Auth (completada)
- React Navigation v7 con auth gate (AuthStack vs AppTabs)
- 8 pantallas: Login, Register, Home, Search, CardDetail, CollectionList, CollectionDetail, Profile
- SearchScreen con drill-down 3 niveles (games → expansions → cards)
- CardDetailScreen con dialog "Agregar a coleccion"
- Services layer (auth, collection, tcg)
- React Query hooks (useGames, useExpansions, useCards, useCollections, etc.)
- Zustand store para auth state
- 4 componentes reutilizables (LoadingScreen, ErrorMessage, EmptyState, CardPreview)

## Estado Actual
- **Auth funciona**: login/registro con Supabase operativo
- **Navegacion funciona**: tabs (Inicio, Buscar, Coleccion, Perfil) + stacks anidados
- **CORS en web**: TCGAPIs bloquea llamadas desde el navegador (localhost). Esto es SOLO en web. En movil (Expo Go) funciona sin problemas.
- **Para probar al 100%**: usar Expo Go en movil (misma WiFi, escanear QR)

## Estructura de Archivos

```
cardtradr/
├── App.tsx                              # Entry point: providers + RootNavigator
├── app.json                             # Config Expo
├── package.json                         # Dependencias
├── tsconfig.json                        # TypeScript strict
├── babel.config.js                      # Babel + Paper plugin
├── eslint.config.js                     # ESLint + Prettier
├── .prettierrc                          # Formato
├── .env                                 # API keys (gitignored)
├── .env.example                         # Template
├── assets/                              # Iconos placeholder (reemplazar)
├── docs/
│   ├── informe_ejecutivo_final_cardtradr.pdf
│   └── ESTADO_PROYECTO.md               # << ESTE ARCHIVO
├── imagenes/android/                    # Screenshots diseño original
├── supabase/
│   └── schema.sql                       # 4 tablas + RLS + triggers
└── src/
    ├── api/
    │   ├── tcgapis.client.ts            # Cliente TCGAPIs + cache AsyncStorage
    │   ├── supabase.client.ts           # Cliente Supabase + auto-refresh
    │   └── __tests__/tcgapis.test.ts    # Test manual conexion API
    ├── components/
    │   ├── LoadingScreen.tsx
    │   ├── ErrorMessage.tsx
    │   ├── EmptyState.tsx
    │   ├── CardPreview.tsx
    │   └── index.ts
    ├── hooks/
    │   ├── useTCG.ts                    # useGames, useExpansions, useCards, useApiUsage
    │   ├── useCollections.ts            # useCollections, useCollectionCards, mutations
    │   └── index.ts
    ├── navigation/
    │   ├── types.ts                     # ParamList + screen props tipados
    │   ├── AuthStack.tsx                # Login + Register
    │   ├── SearchStack.tsx              # Search + CardDetail
    │   ├── CollectionStack.tsx          # CollectionList + CollectionDetail
    │   ├── AppTabs.tsx                  # Bottom tabs (4 tabs)
    │   ├── RootNavigator.tsx            # Auth gate
    │   └── index.ts
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── RegisterScreen.tsx
    │   ├── HomeScreen.tsx               # Dashboard con stats
    │   ├── SearchScreen.tsx             # 3 niveles: games→expansions→cards
    │   ├── CardDetailScreen.tsx         # Detalle + agregar a coleccion
    │   ├── CollectionListScreen.tsx     # Lista colecciones + crear nueva
    │   ├── CollectionDetailScreen.tsx   # Cartas en coleccion
    │   └── ProfileScreen.tsx            # Info usuario + API usage + logout
    ├── services/
    │   ├── auth.service.ts              # signIn, signUp, signOut
    │   ├── collection.service.ts        # CRUD collections + cards
    │   ├── tcg.service.ts               # Wrapper tcgapis
    │   └── index.ts
    ├── store/
    │   └── auth.store.ts                # Zustand: session, user, initialize
    ├── theme/
    │   ├── colors.ts                    # Paleta + dark mode + badges TCG
    │   ├── spacing.ts                   # Base 4px
    │   ├── typography.ts                # Fuentes sistema
    │   └── index.ts                     # lightTheme + darkTheme para Paper
    ├── types/
    │   ├── tcg.ts                       # Tipos TCGAPIs (basados en API real)
    │   ├── database.ts                  # Tipos Supabase
    │   └── index.ts
    └── utils/
        └── env.ts                       # Config env + validacion
```

## Arquitectura

```
Pantallas (screens/)
    ↓ usan
Hooks (hooks/) ← React Query
    ↓ llaman a
Services (services/)
    ↓ llaman a
API Clients (api/)
    ↓
TCGAPIs / Supabase
```

- Screens NUNCA importan supabase/tcgapis directamente
- Zustand solo para auth state (session, user)
- React Query para todo dato async (con loading/error/refetch gratis)

## Navegacion

```
RootNavigator (auth gate)
├── AuthStack (no autenticado)
│   ├── LoginScreen
│   └── RegisterScreen
└── AppTabs (autenticado)
    ├── HomeTab → HomeScreen
    ├── SearchTab → SearchStack
    │   ├── SearchScreen
    │   └── CardDetailScreen
    ├── CollectionTab → CollectionStack
    │   ├── CollectionListScreen
    │   └── CollectionDetailScreen
    └── ProfileTab → ProfileScreen
```

## Comandos Utiles

```powershell
# SIEMPRE desde PowerShell de Windows (NO WSL2)
cd F:\cardtradr

# Arrancar app
npx expo start

# Abrir en web (limitado por CORS de TCGAPIs)
# Pulsar 'w' en la terminal de Expo

# Instalar dependencia nueva
npm install nombre-paquete

# O con compatibilidad Expo
npx expo install nombre-paquete

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

## Problemas Conocidos

1. **CORS en web**: TCGAPIs devuelve `Access-Control-Allow-Origin: false`. Las llamadas a la API solo funcionan en movil (Expo Go), no en navegador.
2. **WSL2 + NTFS**: npm install se cuelga indefinidamente desde WSL2 en drives NTFS (F:\). Siempre usar PowerShell nativo.
3. **Supabase API keys**: Las nuevas claves `sb_publishable_...` no funcionan con supabase-js. Usar Legacy keys `eyJ...`.
4. **Email confirmation**: Esta activa en Supabase. Nuevos usuarios necesitan confirmacion manual desde el dashboard (Authentication → Users → 3 puntos → Verify).
5. **Assets placeholder**: Los iconos en assets/ son PNGs de 1x1 pixel. Reemplazar con iconos reales de la app.

## Proximos Pasos (FASE 2+)

- [ ] Probar la app completa en Expo Go (movil)
- [ ] Reemplazar assets con iconos reales
- [ ] Wishlist (pantalla + CRUD)
- [ ] Busqueda por nombre de carta (no solo navegacion por juego/expansion)
- [ ] Dark mode toggle
- [ ] Paginacion mejorada en SearchScreen
- [ ] Mejoras UX (skeleton loading, pull-to-refresh en mas pantallas)
- [ ] Tests unitarios
- [ ] Desactivar email confirmation o configurar SMTP para emails reales
