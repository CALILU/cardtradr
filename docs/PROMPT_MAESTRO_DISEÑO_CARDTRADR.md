# 🎨 PROMPT MAESTRO: Sistema de Diseño Completo CardTradr

---

## 📋 ÍNDICE DE PROMPTS

1. [Prompt para Claude.ai - Brand Identity & Assets Estáticos](#prompt-1-claudeai)
2. [Prompt para Claude Code - UI Components & Sistema de Diseño](#prompt-2-claude-code)
3. [Prompt para Figma/Canvas - Assets Complementarios](#prompt-3-complementario)

---

# PROMPT 1: Claude.ai (Brand Identity & Assets Estáticos) {#prompt-1-claudeai}

## 🌐 Herramienta: https://claude.ai (NO Claude Code)

## 📝 PROMPT COMPLETO

```markdown
# PROYECTO: CardTradr - Sistema de Identidad Visual Completo

Soy desarrollador creando CardTradr, una aplicación móvil multiplataforma 
(iOS/Android) para gestionar colecciones de Trading Card Games (TCG) como 
Pokémon, Magic: The Gathering, Yu-Gi-Oh!, One Piece, Lorcana, y 50+ juegos más.

## CONTEXTO DE LA APLICACIÓN

**Propuesta de valor:**
"La única app que necesitas para TODAS tus colecciones de cartas TCG"

**Usuarios objetivo:**
- Coleccionistas apasionados de TCG
- Edad: 15-45 años
- Perfil: Organizados, tech-savvy, valoran profesionalismo
- Uso: Gestión diaria de colecciones, búsqueda de cartas, tracking de precios

**Competencia analizada:**
PokeCardex (líder europeo), TCG Hub, Collectr

**Diferenciadores:**
- Multi-TCG (50+ juegos vs mono-juego de competidores)
- Scanner con IA
- Precios en tiempo real
- Modo offline completo

**Paleta de colores base (de análisis de competencia):**
- Primary Blue: #4267B2 (confianza, profesionalismo)
- Success Green: #42B72A (confirmaciones, tengo carta)
- Danger Red: #E4405F (alertas, me falta carta)
- Warning Yellow: #FFC107 (destacados)
- Dark: #1C1E21 (modo oscuro)
- Light: #F5F6F7 (backgrounds)

---

## PARTE 1: FILOSOFÍA DE DISEÑO (Design System Foundation)

**USA LA SKILL: canvas-design**

Antes de crear assets, define la filosofía de diseño completa que guiará 
toda la identidad visual de CardTradr.

### Requisitos de la Filosofía:

**Nombre del movimiento de diseño:** (1-2 palabras evocativas)
Sugerencias: "Chromatic Order", "Geometric Collections", "Systematic Joy", 
"Precision & Play", o crea uno único

**Filosofía visual (4-6 párrafos densos):**

Debe abordar:

1. **Conceptual:** ¿Qué representa visualmente la organización de colecciones?
   - Orden vs caos
   - Sistematización vs pasión coleccionista
   - Profesionalismo vs diversión

2. **Formal:** ¿Cómo se expresa a través de forma y espacio?
   - Geometría (cartas = rectángulos, colecciones = grids)
   - Espaciado y respiración
   - Ritmo y repetición
   - Jerarquía visual

3. **Cromático:** ¿Cómo funciona el color?
   - Azul primario como ancla de confianza
   - Sistema de estados (verde=tengo, rojo=falta)
   - Uso de color para comunicar información
   - Paleta expandida para diferentes TCGs

4. **Tipográfico:** ¿Qué rol tiene el texto?
   - Sans-serif moderno pero distintivo (NO Inter, NO Roboto)
   - Jerarquía clara (títulos vs body vs labels)
   - Números prominentes (cantidades, precios)
   - Pesos variables para énfasis

5. **Material:** ¿Qué sensación táctil/visual?
   - Superficies (flat vs sombras)
   - Profundidad (capas como cartas apiladas)
   - Bordes y corners (sharp vs rounded)
   - Texturas (si aplica)

6. **Craftmanship:** (CRÍTICO - enfatizar múltiples veces)
   - Debe parecer que tomó incontables horas crear
   - Precisión absoluta en cada elemento
   - Trabajo de alguien en la cima de su campo
   - Cada decisión justificada y deliberada

**IMPORTANTE:** La filosofía debe ser genérica (aplicable a múltiples contexts) 
pero con ADN específico de "organización de colecciones de objetos valiosos".

**Output esperado:**
- `cardtradr-design-philosophy.md` (filosofía completa, 4-6 párrafos densos)

---

## PARTE 2: APP ICON (Icono de Aplicación)

**USA LA SKILL: canvas-design**

Usando la filosofía de diseño creada, diseña el icono de la aplicación.

### Especificaciones Técnicas:

**Dimensiones:**
- 1024x1024px (master)
- PNG con fondo sólido (no transparencia para iOS)
- Alta resolución (mínimo 300 DPI)

**Requisitos funcionales:**
- Debe ser reconocible a 40x40px (tamaño más pequeño en pantalla)
- Debe funcionar en fondos claros Y oscuros
- Debe diferenciarse visualmente de competidores
- Memorable a primera vista

**Requisitos conceptuales:**
- Debe evocar "organización de colecciones"
- Puede sugerir cartas (formas rectangulares)
- Puede sugerir múltiples juegos (variedad contenida)
- NO debe parecer específico solo a Pokémon/MTG/un juego

**Restricciones de diseño:**
- NO usar gradientes complejos (se pierden en pequeño)
- NO usar texto extenso (máximo 2-3 letras si acaso)
- Evitar detalles finos que desaparecen al reducir
- Preferir formas bold y colores sólidos

**Paleta de colores:**
- Dominante: Primary Blue #4267B2
- Accents: Success Green #42B72A o Warning Yellow #FFC107
- Background: Blanco, azul muy claro, o gradiente sutil (max 2 colores)

**Inspiración conceptual (NO copiar, solo inspirar):**
- Grids perfectos (organización)
- Cartas superpuestas (colección)
- Formas geométricas limpias (modernidad)
- Monograma estilizado "C" o "CT" (opcional)

**Filosofía a aplicar:**
Sigue EXACTAMENTE la filosofía de diseño creada en Parte 1. Cada decisión 
debe justificarse con la filosofía. El resultado debe verse meticulosamente 
crafted, como si tomara días de refinamiento.

**Output esperado:**
- `cardtradr-app-icon-1024.png` (1024x1024px, alta calidad)
- `cardtradr-icon-design-notes.md` (notas breves sobre decisiones de diseño)

---

## PARTE 3: SPLASH SCREEN (Pantalla de Carga)

**USA LA SKILL: canvas-design**

Usando la MISMA filosofía de diseño, crea el splash screen.

### Especificaciones Técnicas:

**Dimensiones:**
- 1242x2688px (iPhone 14 Pro Max - portrait)
- PNG con fondo sólido
- Alta resolución

**Elementos requeridos:**
1. Logo/Icon (del paso anterior, centrado)
2. Nombre de app: "CardTradr" (tipografía refinada)
3. Tagline (opcional): "Tu colección, organizada" o similar
4. Espacio respiratorio generoso

**Layout:**
```
┌─────────────────────┐
│                     │
│                     │ ← Top 30% vacío
│                     │
│    [APP ICON]       │ ← Logo centrado
│                     │
│    CardTradr        │ ← Nombre app (tipografía distintiva)
│                     │
│ "Tu colección,      │ ← Tagline (opcional, small, light weight)
│   organizada"       │
│                     │
│                     │ ← Bottom 30% vacío
└─────────────────────┘
```

**Requisitos de diseño:**
- Coherente 100% con app icon
- Misma paleta de colores
- Fondo: Sólido o gradiente muy sutil (azul hacia azul oscuro)
- Centrado perfecto vertical y horizontal
- Espaciado matemático

**Tipografía para "CardTradr":**
- Sans-serif moderno pero DISTINTIVO
- NO usar: Inter, Roboto, Arial, Helvetica, San Francisco
- SÍ considerar: Space Grotesk, Archivo, Outfit, DM Sans, Plus Jakarta, 
  Manrope, General Sans, o similares (busca en canvas-fonts)
- Peso: Semibold o Bold
- Tamaño: Prominente pero no abrumador
- Letter spacing: Ligeramente expandido para respiración

**Tagline (si incluido):**
- Mismo font que nombre, pero:
- Peso: Light o Regular
- Tamaño: Mucho más pequeño (1/4 del nombre)
- Color: 70% opacity del color principal

**Filosofía a aplicar:**
El splash debe sentirse como la "portada" de CardTradr. Primera impresión 
al usuario. Debe respirar calidad, profesionalismo, y atención al detalle.

**Output esperado:**
- `cardtradr-splash-1242x2688.png` (iPhone Pro Max)
- `cardtradr-splash-design-notes.md` (decisiones de diseño)

---

## PARTE 4: ICONOGRAFÍA DE SISTEMA (Icon Set)

**USA LA SKILL: canvas-design O algorithmic-art**

Crea un set de iconos para uso dentro de la app.

### Iconos Necesarios (20 iconos):

**Navegación principal (Bottom tabs):**
1. Home / Dashboard
2. Search / Buscar
3. Scanner / Cámara
4. Collection / Mi Colección
5. Wishlist / Lista de Deseos

**Acciones comunes:**
6. Add / Añadir
7. Edit / Editar
8. Delete / Eliminar
9. Filter / Filtrar
10. Sort / Ordenar
11. Share / Compartir
12. Favorite / Favorito (estrella)
13. Info / Información

**Estados de carta:**
14. Owned / Tengo (check mark)
15. Missing / Me falta (X)
16. Foil / Holográfica (brillo)
17. Graded / Graduada (certificado)

**Otros:**
18. Settings / Configuración (engranaje)
19. Sync / Sincronizar (refresh)
20. Price tag / Precio

### Especificaciones:

**Dimensiones:**
- 48x48px (base para @3x)
- Exportar también 32x32px y 24x24px

**Estilo:**
- Consistente con filosofía de diseño
- Line-based o filled (decide según filosofía)
- Peso de línea: 2-3px
- Esquinas: Rounded o sharp (según filosofía)
- Detalles mínimos (deben verse a 24px)

**Colores:**
- Versión monocroma (negro #1C1E21 para light mode)
- Versión monocroma (blanco #FFFFFF para dark mode)
- Versión color para estados (verde=owned, rojo=missing, amarillo=special)

**Sistema:**
- Todos los iconos deben sentirse de la misma familia
- Misma densidad visual
- Mismo nivel de detalle
- Mismo padding interno

**Output esperado:**
- `cardtradr-icons-set.png` (grid con todos los iconos, 48x48 cada uno)
- Alternativamente: carpeta con 20 PNGs individuales
- `cardtradr-icons-guide.md` (especificaciones de uso)

---

## PARTE 5: COMPONENTES VISUALES (Visual Elements Library)

**USA LA SKILL: canvas-design**

Crea elementos visuales reutilizables para la app.

### Elementos a crear:

**1. Card Container / Marco de Carta (Componente más importante):**
- Rectángulo con proporción 1:1.4 (estándar TCG)
- Versión: Vacío (placeholder)
- Versión: Con imagen de ejemplo
- Estados: Default, Hover/Selected, Disabled
- Shadow/elevación sutil
- Border radius: X px (según filosofía)
- Dimensiones: 200x280px (base)

**2. Badges / Insignias:**
- Badge de cantidad: Círculo con número
- Badge de rareza: Forma según nivel (común, raro, mítico)
- Badge de TCG: Pequeño logo/initial del juego
- Badge de foil: Indicador de holográfica
- Tamaño: 24x24px cada uno

**3. Progress Indicators:**
- Barra de progreso (completado de set)
- Indicador circular (% de colección)
- Diseño limpio, consistente con filosofía

**4. Empty States / Estados Vacíos:**
- Ilustración simple cuando no hay cartas
- Ilustración cuando búsqueda no encuentra nada
- Estilo: Minimalista, geometric, acorde a filosofía
- Tamaño: 200x200px

**5. Patterns / Patrones de Fondo (Opcional):**
- Patrón sutil para usar en backgrounds
- Geometric pattern relacionado a cartas/grids
- Muy sutil (5-10% opacity)
- Seamless/tileable

**Output esperado:**
- `cardtradr-visual-components.png` (showcase de todos los elementos)
- O archivos individuales
- `cardtradr-components-specs.md` (especificaciones técnicas)

---

## PARTE 6: STYLE GUIDE / GUÍA DE ESTILO (Documento Maestro)

**USA LA SKILL: canvas-design para visual + presentation style**

Crea un documento visual que compile todo el sistema de diseño.

### Contenido del Style Guide (1-3 páginas):

**Página 1: Identidad**
- Logo/Icon grande
- Nombre: CardTradr
- Tagline
- Filosofía de diseño (resumen 2-3 oraciones)
- "Design Principles": 3-4 principios clave

**Página 2: Sistema Visual**
- Paleta de colores completa (con hex codes)
  - Primarios: Blue, Green, Red, Yellow
  - Neutrals: Grays, Black, White
  - Uso de cada color (cuándo usarlo)
- Tipografía:
  - Font family elegida
  - Pesos disponibles
  - Tamaños (scale: H1, H2, H3, Body, Small, Tiny)
  - Line heights
- Espaciado (8pt grid: 4, 8, 16, 24, 32, 48, 64)
- Shadows/Elevation levels
- Border radius values

**Página 3: Componentes**
- Iconografía (muestra de iconos)
- Card component (estados)
- Buttons (primary, secondary, outline)
- Badges
- Progress bars

### Especificaciones:

**Formato:**
- PDF de alta calidad
- 2480x3508px por página (A4 en 300 DPI)
- Layout editorial, limpio
- Uso generoso de white space
- Grid-based organization

**Estilo:**
- Consistente con filosofía de diseño
- Professional pero accesible
- Ejemplos visuales > texto
- Hex codes visibles
- Measurements visibles

**Output esperado:**
- `cardtradr-style-guide.pdf` (2-3 páginas)
- `cardtradr-style-guide.md` (versión texto para referencia)

---

## PARTE 7: MARKETING ASSETS (Bonus - Opcional)

**USA LA SKILL: canvas-design**

Si hay tiempo/recursos, crea assets de marketing.

### Assets:

**1. Feature Graphic (Google Play):**
- 1024x500px
- Showcase de app con 2-3 screenshots
- Texto: "Gestiona 50+ TCGs en una sola app"
- Visual impactante

**2. App Preview Frame (Template para screenshots):**
- Frame/mock de iPhone/Android
- Para envolver screenshots de la app
- Hace que screenshots se vean profesionales

**3. Promotional Banner:**
- 1200x628px (redes sociales)
- "CardTradr - Tu colección, organizada"
- Call to action: "Descarga gratis"

**Output esperado:**
- `cardtradr-feature-graphic.png`
- `cardtradr-preview-frame.png`
- `cardtradr-promo-banner.png`

---

## RESUMEN DE OUTPUTS ESPERADOS

Al completar este prompt, deberías tener:

### Documentos:
1. ✅ cardtradr-design-philosophy.md
2. ✅ cardtradr-style-guide.pdf
3. ✅ cardtradr-style-guide.md
4. ✅ cardtradr-icon-design-notes.md
5. ✅ cardtradr-splash-design-notes.md
6. ✅ cardtradr-icons-guide.md
7. ✅ cardtradr-components-specs.md

### Assets PNG/PDF:
8. ✅ cardtradr-app-icon-1024.png (1024x1024)
9. ✅ cardtradr-splash-1242x2688.png
10. ✅ cardtradr-icons-set.png (20 iconos)
11. ✅ cardtradr-visual-components.png
12. ✅ cardtradr-feature-graphic.png (opcional)
13. ✅ cardtradr-preview-frame.png (opcional)
14. ✅ cardtradr-promo-banner.png (opcional)

### Total: 14 archivos

---

## INSTRUCCIONES FINALES

**Proceso de trabajo:**
1. Lee COMPLETAMENTE este prompt antes de empezar
2. Empieza por Parte 1 (Filosofía) - es la base de todo
3. Continúa secuencialmente Partes 2-7
4. Mantén coherencia visual entre TODAS las partes
5. Cada decisión debe justificarse con la filosofía
6. Nivel de craftsmanship: MUSEO/EDITORIAL

**Calidad esperada:**
- Esto debe verse como hecho por un diseñador senior con años de experiencia
- Cada pixel cuenta
- Cada color justificado
- Cada espaciado matemático
- Resultado: Portfolio-worthy, production-ready

**Estilo general:**
- Moderno pero no trendy (debe durar años)
- Profesional pero accesible
- Sofisticado pero no pretencioso
- Memorable pero no gimmicky

**Anti-patterns (EVITAR):**
- Gradientes púrpuras cliché
- Fonts genéricos (Inter, Roboto, Arial)
- Iconos de stock sin personalizar
- Sombras exageradas
- Efectos de "bling" innecesarios
- Diseño que grita "hecho con IA"

---

## COMENZAR

Procede paso a paso, comenzando con la **Parte 1: Filosofía de Diseño**.

Usa la skill **canvas-design** ubicada en tus skills disponibles.

Tómate tu tiempo. Esto es la identidad visual completa de una aplicación 
que aspira a ser líder en su categoría.

Demuestra lo que Claude puede crear cuando se compromete completamente a 
una visión de diseño.

¡Adelante! 🎨
```

---

# PROMPT 2: Claude Code (UI Components & Sistema de Diseño) {#prompt-2-claude-code}

## 🌐 Herramienta: https://claude.ai/code

## 📝 PROMPT COMPLETO

```markdown
# PROYECTO: CardTradr - Sistema de Componentes UI para React Native

He creado el sistema de diseño visual completo de CardTradr en Claude.ai 
(filosofía de diseño, app icon, splash, iconografía).

Ahora necesito implementar el **Design System en código** para React Native.

## CONTEXTO

CardTradr es una app móvil (iOS/Android) para gestionar colecciones de TCG.

**Stack:**
- React Native + Expo
- TypeScript
- React Native Paper (base UI)
- Zustand (state)
- React Navigation

**Filosofía de diseño:** [PEGAR AQUÍ LA FILOSOFÍA GENERADA EN CLAUDE.AI]

**Paleta de colores:**
```typescript
const colors = {
  primary: '#4267B2',
  success: '#42B72A',
  danger: '#E4405F',
  warning: '#FFC107',
  dark: '#1C1E21',
  light: '#F5F6F7',
  gray: '#8E8E93',
  white: '#FFFFFF',
  black: '#000000',
}
```

---

## PARTE 1: Theme Configuration (Configuración de Tema)

Crea el archivo `src/config/theme.ts`

### Requisitos:

**Estructura:**
```typescript
export const theme = {
  colors: { /* paleta completa */ },
  spacing: { /* 8pt grid */ },
  typography: { /* scale tipográfico */ },
  shadows: { /* elevaciones */ },
  borderRadius: { /* valores */ },
  layout: { /* breakpoints, grid */ },
}
```

**Especificaciones:**

1. **Colors:**
   - Todos los colores de la paleta
   - Variantes: light, dark modes
   - Semantic colors (error, success, warning, info)
   - Text colors (primary, secondary, disabled)
   - Background colors

2. **Spacing (8pt grid):**
   - Escala: 4, 8, 12, 16, 24, 32, 48, 64
   - Helpers: xs, sm, md, lg, xl, xxl

3. **Typography:**
   - Font family: [LA QUE SE ELIGIÓ EN DISEÑO]
   - Font weights: 300, 400, 500, 600, 700
   - Font sizes: 
     - h1: 32px
     - h2: 24px
     - h3: 20px
     - h4: 18px
     - body: 16px
     - small: 14px
     - tiny: 12px
   - Line heights: 1.2 (headings), 1.5 (body)

4. **Shadows:**
   - Elevation 1 (subtle)
   - Elevation 2 (card)
   - Elevation 3 (modal)
   - Elevation 4 (dropdown)

5. **Border Radius:**
   - none: 0
   - sm: 4px
   - md: 8px
   - lg: 16px
   - xl: 24px
   - full: 9999px

6. **Layout:**
   - Container max width: 1200px
   - Grid columns: 12
   - Breakpoints: mobile (320), tablet (768), desktop (1024)

**Export:**
- Default export del theme object
- Named exports para usar individualmente
- TypeScript types para autocompletado

---

## PARTE 2: Base Components (Componentes Base)

Crea componentes reutilizables en `src/components/atoms/`

### 2.1 Button Component

Archivo: `src/components/atoms/Button.tsx`

**Variants:**
- primary (filled, color primary)
- secondary (outlined, color primary)
- success (filled, color success)
- danger (filled, color danger)
- ghost (transparent, color primary)

**Sizes:**
- small (32px height)
- medium (40px height)
- large (48px height)

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: string;
  fullWidth?: boolean;
}
```

**Features:**
- Ripple effect (Android)
- Scale animation on press (iOS)
- Loading spinner integrado
- Icon support (left or right)
- Disabled state (50% opacity)
- Haptic feedback en press

---

### 2.2 Card Component

Archivo: `src/components/atoms/Card.tsx`

**Variantes:**
- default (subtle shadow)
- elevated (más shadow)
- outlined (border, sin shadow)
- flat (sin shadow ni border)

**Props:**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}
```

**Features:**
- Padding interno consistente (spacing.md)
- Border radius según theme
- Conditional shadow según variant
- Pressable si tiene onPress
- Animación subtle en press

---

### 2.3 Badge Component

Archivo: `src/components/atoms/Badge.tsx`

**Variantes:**
- default (gray background)
- primary (primary color)
- success (success color)
- danger (danger color)
- warning (warning color)

**Tamaños:**
- small (16px height)
- medium (24px height)
- large (32px height)

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  label: string | number;
  icon?: ReactNode;
}
```

---

### 2.4 Input Component

Archivo: `src/components/atoms/Input.tsx`

**Features:**
- Label flotante
- Error state con mensaje
- Clear button
- Icon left/right
- Password toggle (si type='password')
- Character counter (si maxLength)

**Props:**
```typescript
interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
  maxLength?: number;
  disabled?: boolean;
}
```

---

### 2.5 Skeleton Loader

Archivo: `src/components/atoms/Skeleton.tsx`

**Variants:**
- rectangle (ancho x alto custom)
- circle (diámetro custom)
- text (line de texto)

**Features:**
- Animación shimmer (gradiente que se mueve)
- Colors del theme (light mode / dark mode)

**Props:**
```typescript
interface SkeletonProps {
  variant: 'rectangle' | 'circle' | 'text';
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
}
```

---

## PARTE 3: Molecular Components (Componentes Moleculares)

Crea en `src/components/molecules/`

### 3.1 SearchBar Component

Archivo: `src/components/molecules/SearchBar.tsx`

**Features:**
- Input con icono de search
- Clear button (X)
- Debounce de 300ms
- Loading indicator mientras busca
- onSearch callback

**Props:**
```typescript
interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}
```

---

### 3.2 CardGridItem Component

Archivo: `src/components/molecules/CardGridItem.tsx`

Este es el componente MÁS IMPORTANTE - representa una carta TCG en el grid.

**Layout:**
```
┌─────────────────┐
│                 │
│   [Imagen]      │ ← Card image (proporción 1:1.4)
│                 │
├─────────────────┤
│ Card Name       │ ← Nombre (truncado 2 líneas)
│ Set • #123      │ ← Set y número (small, gray)
│ [Badges]  $12   │ ← Badges left, precio right
└─────────────────┘
```

**Props:**
```typescript
interface CardGridItemProps {
  card: {
    id: string;
    name: string;
    imageUrl: string;
    setName: string;
    number: string;
    price?: number;
  };
  owned?: boolean;
  favorite?: boolean;
  quantity?: number;
  onPress: () => void;
  onLongPress?: () => void;
}
```

**Features:**
- Image con loading skeleton
- Badge de owned (checkmark verde)
- Badge de quantity (si > 1)
- Badge de favorite (estrella)
- Precio en bottom right
- Animación en press
- Long press para quick actions

---

### 3.3 StatsCard Component

Archivo: `src/components/molecules/StatsCard.tsx`

**Layout:**
```
┌─────────────────────┐
│ [Icon] Total Cards  │
│        1,234        │ ← Número grande
│    +15 this week    │ ← Subtítulo
└─────────────────────┘
```

**Props:**
```typescript
interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'primary' | 'success';
}
```

---

### 3.4 FilterChip Component

Archivo: `src/components/molecules/FilterChip.tsx`

**Variantes:**
- default (no seleccionado)
- selected (background primary)

**Props:**
```typescript
interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: ReactNode;
  count?: number; // Badge con cantidad
}
```

---

## PARTE 4: Layout Templates (Templates de Pantalla)

Crea en `src/components/templates/`

### 4.1 ScreenTemplate Component

Archivo: `src/components/templates/ScreenTemplate.tsx`

**Layout general para todas las pantallas:**
```
┌─────────────────────┐
│     Header          │ ← Opcional
├─────────────────────┤
│                     │
│     Content         │ ← ScrollView o FlatList
│                     │
│                     │
├─────────────────────┤
│     Footer          │ ← Opcional
└─────────────────────┘
```

**Props:**
```typescript
interface ScreenTemplateProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  scrollable?: boolean;
  refreshControl?: ReactElement;
  backgroundColor?: string;
}
```

**Features:**
- Safe area insets automáticos
- Header opcional (sticky)
- Footer opcional (sticky)
- Content scrollable o fixed
- Pull to refresh support
- Background color customizable

---

### 4.2 ListTemplate Component

Archivo: `src/components/templates/ListTemplate.tsx`

**Template para pantallas con lista:**
```
┌─────────────────────┐
│   SearchBar         │
├─────────────────────┤
│  [FilterChips]      │
├─────────────────────┤
│                     │
│   FlatList          │
│   - Item 1          │
│   - Item 2          │
│   - ...             │
│                     │
└─────────────────────┘
```

**Props:**
```typescript
interface ListTemplateProps<T> {
  data: T[];
  renderItem: (item: T) => ReactNode;
  searchValue: string;
  onSearch: (query: string) => void;
  filters?: FilterChipProps[];
  loading?: boolean;
  emptyState?: ReactNode;
  onRefresh?: () => void;
}
```

---

## PARTE 5: Animations & Transitions

Crea en `src/utils/animations.ts`

### 5.1 Shared Transitions

```typescript
// Fade in animation
export const fadeIn = (duration = 300) => { /* ... */ }

// Scale animation
export const scale = (from = 0.95, to = 1, duration = 200) => { /* ... */ }

// Slide in (from bottom)
export const slideInUp = (duration = 300) => { /* ... */ }

// Stagger animation (para listas)
export const stagger = (index: number, delay = 50) => { /* ... */ }
```

### 5.2 Loading Indicators

```typescript
// Skeleton shimmer animation
export const shimmer = () => { /* ... */ }

// Spinner rotation
export const rotate = () => { /* ... */ }

// Pulse (para badges)
export const pulse = () => { /* ... */ }
```

---

## PARTE 6: Hooks Útiles

Crea en `src/hooks/`

### 6.1 useTheme Hook

Archivo: `src/hooks/useTheme.ts`

```typescript
export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  
  return { colors, isDark, toggleTheme, theme };
}
```

---

### 6.2 useDebounce Hook

Archivo: `src/hooks/useDebounce.ts`

Para SearchBar y otros inputs.

```typescript
export const useDebounce = <T>(value: T, delay = 300): T => {
  /* implementation */
}
```

---

## PARTE 7: Storybook/Documentation (Opcional)

Si quieres documentar componentes:

Crea archivo `src/components/README.md` con:

**Para cada componente:**
- Descripción
- Props interface
- Ejemplos de uso
- Screenshots (si aplica)

---

## ESPECIFICACIONES GENERALES

### TypeScript:
- Strict mode enabled
- Interfaces para todas las props
- Types exportados para reutilización
- No usar `any` (usar `unknown` si necesario)

### Performance:
- React.memo en componentes que no cambian frecuentemente
- useMemo para cálculos costosos
- useCallback para funciones pasadas a children
- FlatList con windowSize optimizado para listas largas

### Accesibilidad:
- accessibilityLabel en todos los touchables
- accessibilityRole apropiado
- accessibilityHint cuando sea útil
- Support para screen readers

### Testing:
- Cada componente debe ser testeable
- Props simples y claras
- Sin side effects ocultos
- Separación de lógica y presentación

---

## ESTRUCTURA DE ARCHIVOS FINAL

```
src/
├── config/
│   └── theme.ts                    ← Theme configuration
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Skeleton.tsx
│   │   └── index.ts                ← Barrel export
│   ├── molecules/
│   │   ├── SearchBar.tsx
│   │   ├── CardGridItem.tsx
│   │   ├── StatsCard.tsx
│   │   ├── FilterChip.tsx
│   │   └── index.ts
│   ├── templates/
│   │   ├── ScreenTemplate.tsx
│   │   ├── ListTemplate.tsx
│   │   └── index.ts
│   └── README.md                   ← Documentation
├── utils/
│   └── animations.ts               ← Shared animations
├── hooks/
│   ├── useTheme.ts
│   ├── useDebounce.ts
│   └── index.ts
└── types/
    └── components.types.ts         ← Shared types
```

---

## INSTRUCCIONES DE IMPLEMENTACIÓN

1. **Comenzar con theme.ts** - Es la base de todo

2. **Implementar componentes atómicos** - Button, Card, Badge primero

3. **Testear componentes** - Crear pantalla de prueba con todos los componentes

4. **Implementar moleculares** - SearchBar, CardGridItem (MÁS IMPORTANTE)

5. **Crear templates** - ScreenTemplate, ListTemplate

6. **Añadir animaciones** - Mejorar UX con micro-interactions

7. **Documentar** - README con ejemplos

---

## CALIDAD ESPERADA

**Code Quality:**
- Clean code, readable
- Comentarios donde sea necesario
- Consistent naming conventions
- Modular y reutilizable

**Visual Quality:**
- Pixel-perfect según theme
- Animaciones smooth (60fps)
- Responsive a diferentes pantallas
- Dark mode support completo

**Developer Experience:**
- Types claros
- Props bien documentadas
- Fácil de extender
- Barrel exports para imports limpios

---

## OUTPUT FINAL

Al completar, deberías tener:

1. ✅ Theme configuration completo
2. ✅ 5+ componentes atómicos
3. ✅ 4+ componentes moleculares
4. ✅ 2+ templates
5. ✅ Animations utilities
6. ✅ Custom hooks
7. ✅ TypeScript types
8. ✅ Documentation

**Todo listo para usarse en las pantallas principales de CardTradr.**

---

## COMENZAR

Procede paso a paso, empezando por **Parte 1: Theme Configuration**.

Usa la skill **frontend-design** si está disponible en tus skills públicas.

Crea código production-ready, no prototipos.

¡Adelante! 💻
```

---

# PROMPT 3: Complementario - Figma/External Tools {#prompt-3-complementario}

## 🌐 Herramientas: Figma, Icon Kitchen, Canva

## 📝 INSTRUCCIONES

Si necesitas refinar o crear assets adicionales fuera de Claude:

### Figma (https://figma.com)

**Para:**
- Refinar iconos generados
- Crear mockups de pantallas
- Exportar en múltiples resoluciones
- Prototipar interacciones

**Workflow:**
1. Importa PNG de Claude.ai (icon, splash)
2. Vectoriza si necesario (Trace)
3. Ajusta detalles
4. Exporta en todas las resoluciones iOS/Android

---

### Icon Kitchen (https://icon.kitchen)

**Para:**
- Generar adaptive icons Android
- Exportar en todos los tamaños automáticamente
- Quick iterations

**Workflow:**
1. Sube PNG del icon (1024x1024)
2. Ajusta background color
3. Download package (todos los tamaños)

---

### Canva (https://canva.com)

**Para:**
- Marketing assets rápidos
- Social media graphics
- Mockups

**Workflow:**
1. Usa template "App Icon" o "Mobile Mockup"
2. Personaliza con colores de CardTradr
3. Exporta PNG

---

## 📊 CHECKLIST FINAL

Una vez completados los 3 prompts, deberías tener:

### De Claude.ai (Prompt 1):
- [ ] Filosofía de diseño completa
- [ ] App icon (1024x1024)
- [ ] Splash screen (1242x2688)
- [ ] Icon set (20 iconos)
- [ ] Visual components library
- [ ] Style guide PDF

### De Claude Code (Prompt 2):
- [ ] Theme configuration
- [ ] Componentes atómicos (Button, Card, Badge, Input, Skeleton)
- [ ] Componentes moleculares (SearchBar, CardGridItem, StatsCard, FilterChip)
- [ ] Templates (ScreenTemplate, ListTemplate)
- [ ] Animations utilities
- [ ] Custom hooks

### Opcional (Prompt 3):
- [ ] Iconos refinados en Figma
- [ ] Adaptive icons de Icon Kitchen
- [ ] Marketing assets de Canva

---

## 🚀 ORDEN DE EJECUCIÓN RECOMENDADO

### Semana 10 (Diseño Visual):

**Día 1-2:** Ejecutar **Prompt 1** en Claude.ai
- Output: Todos los assets visuales

**Día 3:** Refinar en Figma si necesario
- Output: Assets finales en todas las resoluciones

### Semana 11 (Implementación Código):

**Día 1-2:** Ejecutar **Prompt 2** en Claude Code (Parte 1-3)
- Output: Theme + Componentes atómicos

**Día 3-4:** Continuar **Prompt 2** (Parte 4-7)
- Output: Componentes moleculares + Templates

**Día 5:** Testing e integración
- Output: Sistema de diseño funcional

### Resultado Final:

✅ Sistema de diseño visual completo (Claude.ai)
✅ Sistema de componentes en código (Claude Code)
✅ Assets listos para integrar en app
✅ Design system production-ready

---

## 💡 TIPS FINALES

1. **Coherencia es clave**: Todo debe verse de la misma familia visual

2. **Documenta decisiones**: Guarda notas de por qué elegiste X color, Y font, etc.

3. **Itera si necesario**: Primera versión no tiene que ser perfecta

4. **Testea en dispositivos reales**: Los colores se ven diferente en pantalla

5. **Pide feedback**: Muestra a potenciales usuarios antes de finalizar

6. **Mantén simplicidad**: Mejor simple y bien ejecutado que complejo y mediocre

---

**¿Listo para crear el sistema de diseño completo de CardTradr?** 🎨💻

Elige un prompt y ¡comienza!
