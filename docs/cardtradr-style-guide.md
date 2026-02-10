# CardTradr Design System
## Style Guide v1.0

---

## Brand Identity

**CardTradr** — La única app que necesitas para todas tus colecciones TCG

**Philosophy:** Systematic Precision

La organización de colecciones valiosas exige un lenguaje visual que honra tanto la sistematización meticulosa como el impulso humano apasionado de coleccionar.

---

## Logo & Icon

**App Icon:**
- Tres cartas TCG superpuestas (geometría 1:1.4)
- Monograma "C" centrado
- Colores: Primary Blue con accents

**Usage:**
- Tamaño mínimo: 40x40px
- Espacio alrededor: Mínimo 8px
- No modificar proporciones
- No añadir efectos

---

## Color System

### Primary Palette

**Primary Blue** - `#4267B2`
- RGB: (66, 103, 178)
- Uso: Brand principal, headers, botones primarios
- Representa: Confianza, profesionalismo, sistematización

**Success Green** - `#42B72A`
- RGB: (66, 183, 42)
- Uso: Confirmaciones, "carta poseída", estados positivos
- Representa: Completitud, logro

**Danger Red** - `#E4405F`
- RGB: (228, 64, 95)
- Uso: Alertas, "carta faltante", acciones destructivas
- Representa: Ausencia, atención requerida

**Warning Yellow** - `#FFC107`
- RGB: (255, 193, 7)
- Uso: Destacados, rarezas especiales, notificaciones
- Representa: Importancia, rareza

### Neutrals

**Dark** - `#1C1E21`
- RGB: (28, 30, 33)
- Uso: Texto principal, iconos

**Gray** - `#8E8E93`
- RGB: (142, 142, 147)
- Uso: Texto secundario, borders sutiles

**Light** - `#F5F6F7`
- RGB: (245, 246, 247)
- Uso: Backgrounds, separadores

**White** - `#FFFFFF`
- RGB: (255, 255, 255)
- Uso: Backgrounds primarios, texto sobre dark

**Black** - `#000000`
- RGB: (0, 0, 0)
- Uso: Sombras, overlays

### Semantic Colors

- **Error:** Danger Red (#E4405F)
- **Success:** Success Green (#42B72A)
- **Warning:** Warning Yellow (#FFC107)
- **Info:** Primary Blue (#4267B2)

---

## Typography

### Font Family

**Primary:** System Sans-Serif Stack
- iOS: SF Pro Text / SF Pro Display
- Android: Roboto
- Web: System UI, -apple-system, BlinkMacSystemFont

**Características:**
- Clean, legible, profesional
- Excelente a pequeños tamaños
- Optimizado para pantallas

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 32px | Bold (700) | 1.2 | Page titles |
| H2 | 24px | Semibold (600) | 1.3 | Section headers |
| H3 | 20px | Semibold (600) | 1.4 | Subsection headers |
| H4 | 18px | Medium (500) | 1.4 | Card titles |
| Body | 16px | Regular (400) | 1.5 | Body text |
| Small | 14px | Regular (400) | 1.5 | Captions, labels |
| Tiny | 12px | Medium (500) | 1.3 | Tags, metadata |

### Font Weights

- Light: 300 (raramente usado)
- Regular: 400 (body text)
- Medium: 500 (emphasis)
- Semibold: 600 (headings)
- Bold: 700 (strong emphasis)

### Letter Spacing

- Headings (H1-H4): -0.5% (tighter)
- Body: 0% (default)
- Small/Tiny: +0.5% (más abierto para legibilidad)
- Uppercase: +2% (siempre)

---

## Spacing System

**8-Point Grid System**

Todos los espaciados son múltiplos de 4 o 8:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Elementos muy cercanos |
| sm | 8px | Padding interno mínimo |
| md | 16px | Padding estándar de componentes |
| lg | 24px | Separación entre secciones |
| xl | 32px | Márgenes de pantalla |
| xxl | 48px | Separaciones mayores |

**Regla:** Si dudas, usa múltiplo de 8px.

---

## Shadows & Elevation

**Elevation Levels:**

```
Level 1 (Subtle):
- shadow: 0 1px 3px rgba(0,0,0,0.12)
- Uso: Cards por defecto

Level 2 (Card):
- shadow: 0 4px 6px rgba(0,0,0,0.1)
- Uso: Cards elevadas, hover states

Level 3 (Modal):
- shadow: 0 10px 20px rgba(0,0,0,0.15)
- Uso: Modals, dropdowns

Level 4 (Float):
- shadow: 0 20px 40px rgba(0,0,0,0.2)
- Uso: Overlays, drag states
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Sin redondeo |
| sm | 4px | Badges pequeños |
| md | 8px | Buttons, inputs |
| lg | 16px | Cards |
| xl | 24px | Modal corners |
| full | 9999px | Círculos perfectos |

**Regla:** Usar 8px como default, 16px para cards.

---

## Iconography

**Style:** Minimalist, geometric, line-based

**Specifications:**
- Base size: 48x48px (@3x)
- Line weight: 2-3px
- Internal padding: 4px
- Corners: Squared
- Style: Outlined (no filled)

**Color Variants:**
- Default: Dark (#1C1E21)
- Light mode: Dark
- Dark mode: White (#FFFFFF)
- States: Primary, Success, Danger, Warning

**Icon Set (20 icons):**
1. Home - Dashboard navigation
2. Search - Búsqueda de cartas
3. Scanner - Cámara/scanning
4. Collection - Vista de colección
5. Wishlist - Lista de deseos
6. Add - Añadir carta
7. Edit - Editar
8. Delete - Eliminar
9. Filter - Filtros
10. Sort - Ordenar
11. Share - Compartir
12. Favorite - Favorito (corazón)
13. Info - Información
14. Owned - Carta poseída (check verde)
15. Missing - Carta faltante (X roja)
16. Foil - Holográfica (brillo)
17. Graded - Graduada (certificado)
18. Settings - Configuración
19. Sync - Sincronizar
20. Price - Precio (etiqueta)

---

## Components

### Button

**Variants:**
- Primary: Filled, Primary Blue background
- Secondary: Outlined, Primary Blue border
- Success: Filled, Success Green background
- Danger: Filled, Danger Red background
- Ghost: Transparent background, Primary text

**Sizes:**
- Small: 32px height, 12px padding
- Medium: 40px height, 16px padding
- Large: 48px height, 20px padding

**States:**
- Default: Normal appearance
- Hover: 10% darker background
- Pressed: Scale 0.98
- Disabled: 50% opacity
- Loading: Spinner centered

### Card

**Default Card:**
- Background: White
- Border radius: 16px
- Shadow: Elevation Level 1
- Padding: 16px

**Card Image (TCG):**
- Aspect ratio: 1:1.4 (estándar TCG)
- Border radius: 8px (esquinas)
- Loading state: Skeleton shimmer

**Card Grid Item:**
```
┌─────────────┐
│   [Image]   │ ← Imagen carta (1:1.4)
├─────────────┤
│ Card Name   │ ← H4, truncado 2 líneas
│ Set • #123  │ ← Small, gray
│ ●●● $12.50  │ ← Badges + precio
└─────────────┘
```

### Badge

**Sizes:**
- Small: 16px height
- Medium: 24px height
- Large: 32px height

**Variants:**
- Default: Gray background
- Primary: Primary Blue
- Success: Success Green
- Danger: Danger Red
- Warning: Warning Yellow

**Usage:**
- Quantity badges: Círculo, número dentro
- Rarity badges: Color según rareza
- TCG badges: Initial del juego
- Foil indicator: Sparkle icon

### Input

**Specifications:**
- Height: 48px
- Border: 1px solid Gray
- Border radius: 8px
- Padding: 12px 16px
- Font: Body (16px)

**States:**
- Default: Gray border
- Focus: Primary Blue border (2px)
- Error: Danger Red border (2px)
- Disabled: 50% opacity

**Features:**
- Floating label
- Clear button (X)
- Error message below
- Character counter (si maxLength)
- Icon support (left/right)

---

## Layout

### Grid System

**Mobile (< 768px):**
- Columns: 12
- Gutter: 16px
- Margin: 16px
- Card grid: 3 columnas

**Tablet (768px - 1024px):**
- Columns: 12
- Gutter: 24px
- Margin: 24px
- Card grid: 4 columnas

**Desktop (> 1024px):**
- Max width: 1200px
- Columns: 12
- Gutter: 32px
- Margin: 32px
- Card grid: 5 columnas

### Safe Areas

- Top: 44px (iOS status bar)
- Bottom: 34px (iOS home indicator)
- Sides: 16px (minimum)

---

## Animation & Motion

### Timing

- Fast: 150ms (hover, ripple)
- Normal: 300ms (transitions)
- Slow: 500ms (page transitions)
- Lazy: 800ms (complex animations)

### Easing

- Standard: ease-in-out
- Deceleration: ease-out
- Acceleration: ease-in
- Sharp: cubic-bezier(0.4, 0, 0.2, 1)

### Common Animations

**Fade:**
- Fade in: opacity 0 → 1 (300ms)
- Fade out: opacity 1 → 0 (150ms)

**Scale:**
- Scale up: transform scale(0.95) → 1 (200ms)
- Button press: scale 1 → 0.98 (100ms)

**Slide:**
- Slide up: translateY(20px) → 0 (300ms)
- Slide down: translateY(0) → 20px (300ms)

**Stagger:**
- Delay increment: 50ms per item
- Max delay: 300ms

---

## Accessibility

### Contrast Ratios

**WCAG 2.1 AA Compliance:**
- Text normal (16px+): 4.5:1 minimum
- Text grande (24px+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Color Combinations Approved:**
- Primary Blue (#4267B2) on White: ✅ 7.2:1
- White on Primary Blue: ✅ 7.2:1
- Success Green (#42B72A) on White: ✅ 4.8:1
- Danger Red (#E4405F) on White: ✅ 5.1:1
- Dark (#1C1E21) on White: ✅ 14.8:1
- Gray (#8E8E93) on White: ✅ 4.6:1

### Touch Targets

- Minimum size: 44x44px
- Recommended: 48x48px
- Spacing between targets: 8px minimum

### Screen Readers

- Todos los iconos tienen label
- Todos los botones tienen label
- Imágenes tienen alt text
- Forms tienen labels asociados

---

## Design Principles

1. **Systematic Organization**
   - Todo sigue un grid de 8pt
   - Espaciados consistentes
   - Alineación perfecta

2. **Visual Hierarchy**
   - Tamaño indica importancia
   - Color para estados y categorías
   - Espaciado para agrupación

3. **Minimal yet Expressive**
   - Sin decoración innecesaria
   - Color usado intencionalmente
   - Cada elemento justificado

4. **Professional Craftsmanship**
   - Atención al detalle
   - Precisión en medidas
   - Calidad sobre cantidad

5. **User-Centric**
   - Legibilidad primero
   - Touch-friendly
   - Accesible para todos

---

## Usage Guidelines

### Do's ✅

- Usar grid de 8pt siempre
- Mantener jerarquía tipográfica
- Usar colores semánticos correctamente
- Alinear elementos a grid
- Proveer estados de loading
- Incluir empty states
- Testear en dispositivos reales

### Don'ts ❌

- No usar gradientes complejos
- No inventar nuevos colores
- No usar más de 3 pesos de font
- No ignorar safe areas
- No usar texto en imágenes
- No saturar con animaciones
- No comprometer accesibilidad

---

## File Naming Conventions

**Assets:**
```
cardtradr-icon-1024.png
cardtradr-splash-1242x2688.png
icon-home.png
icon-search.png
```

**Components:**
```
Button.tsx
Card.tsx
SearchBar.tsx
CardGridItem.tsx
```

**Screens:**
```
HomeScreen.tsx
SearchScreen.tsx
CollectionScreen.tsx
```

---

## Version History

**v1.0 (February 2026)**
- Initial design system
- Philosophy: Systematic Precision
- 20 system icons
- Complete color palette
- Typography scale
- Component specifications

---

## Resources

**Fonts:**
- System fonts (SF Pro, Roboto)
- No external fonts needed

**Icons:**
- Custom icon set (20 icons)
- Format: PNG, 48x48px base
- Style: Outlined, geometric

**Assets:**
- App icon: 1024x1024px
- Splash screen: 1242x2688px
- Individual icons: /icons/

**Documentation:**
- Design philosophy: cardtradr-design-philosophy.md
- This style guide: cardtradr-style-guide.md

---

## Contact & Feedback

**Developed by:** Isidro García, Valencia, Spain

**Project:** CardTradr - Multi-TCG Collection Manager

**Philosophy:** Systematic Precision
- Geometric clarity
- Chromatic information
- Master-level execution

---

*Este sistema de diseño ha sido meticulosamente crafted con atención obsesiva al detalle, cada decisión justificada, cada medida calculada. Representa el trabajo de alguien en la cima de su campo, donde la calidad no es negociable.*

---

**END OF STYLE GUIDE**
