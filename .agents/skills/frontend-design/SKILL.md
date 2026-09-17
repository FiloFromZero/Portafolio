---
name: frontend-design
description: >-
  Guia al asistente en el diseno, estructuracion y estilizado de interfaces y componentes frontend con alta calidad estetica, accesibilidad (a11y), responsive design y consistencia con el sistema de diseno del proyecto. Usar siempre que se creen o modifiquen componentes de UI, vistas, estilos SCSS o animaciones.
---

# Frontend Design & UI/UX Guidelines

Esta skill establece los estandares de diseno visual, arquitectura de componentes frontend y accesibilidad para evitar interfaces genericas y mantener un nivel profesional de grado de produccion.

---

## 1. Filosofia de Diseno (Evitar el "AI Slop")

Cuando disenes o modifiques componentes de interfaz:
- **Jerarquia visual contundente**: Define un unico foco por seccion. Usa contrastes intencionales de tamano, peso de fuente y opacidad en lugar de llenar todo con colores brillantes.
- **Evita gradientes y efectos genericos**: No uses fondos morados/azules genericos. Respeta la paleta distintiva del proyecto (base calida neutra con acento melocoton / terracota suave).
- **Espaciado y ritmo vertical**: Emplea una escala consistente de espaciados (multiplos de 4px u 8px: `0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem`).
- **Microinteracciones discretas**: Transiciones suaves con curvas de aceleracion naturales (`cubic-bezier(0.4, 0, 0.2, 1)`), retroalimentacion tactil/visual al hover y active, y estados de foco visibles.

---

## 2. Tokens de Diseno del Proyecto (Aura Design System)

Utiliza siempre las variables CSS globales definidas en `src/styles.scss`:

### Paleta de Colores
| Variable | Proposito | Modo Oscuro (Default) | Modo Claro |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | Fondo principal de pagina | `#1c1815` | `#faf6f2` |
| `--bg-secondary` | Contenedores y secciones | `#282019` | `#ffffff` |
| `--bg-tertiary` | Elementos de superficie / inputs | `#332a22` | `#f1eae3` |
| `--bg-card` | Tarjetas con glassmorphism | `rgba(40, 32, 25, 0.72)` | `rgba(255, 255, 255, 0.85)` |
| `--text-primary` | Titulos y texto principal | `#f6f1ec` | `#2d241e` |
| `--text-secondary` | Subtitulos y parrafos | `#cdc0b6` | `#57483e` |
| `--text-muted` | Metadata, badges y etiquetas | `#a08f83` | `#78665a` |
| `--accent-primary` | Color de enfasis / CTA | `#f0b49b` (Peach) | `#cf6e48` (Terracotta) |
| `--border-glow` | Resplandor suave en hover | `rgba(240, 180, 155, 0.22)` | `rgba(207, 110, 72, 0.2)` |
| `--border-normal` | Borde sutil delimitador | `rgba(255, 241, 235, 0.08)` | `rgba(45, 36, 30, 0.12)` |

### Tipografia
- **Texto y lectura general**: `--font-sans` (`'Outfit'`, `'Inter'`, sans-serif).
- **Codigo, metricas y tags tecnicos**: `--font-mono` (`'JetBrains Mono'`, monospace).

### Transiciones y Motion
- Transicion estandar: `var(--transition-smooth)` (`all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`).
- Rebote para modales/popups: `var(--transition-bounce)` (`all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`).
- **Importante**: Respeta siempre `prefers-reduced-motion`.

---

## 3. Arquitectura de Componentes Angular

Al crear o refactorizar componentes en este proyecto:

1. **Standalone Components**: Todo componente debe ser `standalone: true`.
2. **OnPush Change Detection**: Declarar siempre `changeDetection: ChangeDetectionStrategy.OnPush`.
3. **Reactividad con Signals**:
   - Para estado interno o parametros mutables, usa `signal()` y `computed()`.
   - Utiliza llamadas directas a senales en el template (`mySignal()`).
4. **HTML Semantico y A11y (WCAG 2.1 AA)**:
   - Usa etiquetas nativas (`<button>`, `<section>`, `<header>`, `<article>`) con atributos `aria-label` claros cuando el icono no tenga texto.
   - Todo modal o panel superpuesto debe soportar cierre con tecla `Escape` y atrapar el foco mientras este abierto.
5. **Imagenes y Recursos**:
   - Atributos `loading="lazy"` o `fetchpriority="high"` segun si esta en el viewport inicial (hero) o no.
   - Formatos modernos WebP/AVIF con fallback y dimensiones `width`/`height` explicitas para prevenir CLS (Cumulative Layout Shift).

---

## 4. Checklist de Verificacion UI

Antes de dar por terminado cualquier cambio en frontend:
- [ ] **Modo Oscuro / Modo Claro**: El contraste del texto es legible en ambos esquemas.
- [ ] **Mobile First / Responsive**: Se adapta fluidamente a pantallas de 360px, 768px y 1280px+ sin scroll horizontal involuntario.
- [ ] **Accesibilidad de Teclado**: Los elementos interactivos son alcanzables con `Tab` y muestran un `outline` o estado `:focus-visible` nitido.
- [ ] **Consistencia de Tokens**: Se usan variables CSS en lugar de valores hexadecimales quemados directamente en el SCSS del componente.
