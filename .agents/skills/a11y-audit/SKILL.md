---
name: a11y-audit
description: >-
  Provee criterios, reglas y procedimientos de auditoria para verificar y corregir la accesibilidad web (WCAG 2.1 Nivel AA/AAA) en aplicaciones Angular. Usar cuando se audite la navegacion por teclado, trampas de foco en modales, ratios de contraste, compatibilidad con lectores de pantalla (ARIA) y reduccion de movimiento.
---

# Web Accessibility (a11y) Audit Guidelines — WCAG 2.1 AA

Esta skill proporciona un protocolo riguroso para auditar, diagnosticar y resolver deficiencias de accesibilidad en el código de componentes, plantillas y hojas de estilo.

---

## 1. Protocolo de Modales y Diálogos Superpuestos (WAI-ARIA Dialog Pattern)

Todo modal, panel desplegable o drawer debe cumplir con las siguientes 5 reglas fundamentales:

1. **Atributos Semánticos:**
   - Contenedor con `role="dialog"` y `aria-modal="true"`.
   - `[attr.aria-label]="..."` o `[attr.aria-labelledby]="..."` que describa el propósito del modal.
2. **Trampa de Foco (Focus Trap):**
   - Al abrirse, el foco debe trasladarse inmediatamente al primer elemento interactivo (o al botón de cierre).
   - El tabulador (`Tab` y `Shift + Tab`) debe ciclar exclusivamente dentro de los límites del modal; el foco **nunca** debe escapar al fondo de la página.
3. **Cierre con Tecla Escape:**
   - Debe escuchar `document:keydown.escape` y cerrar el modal inmediatamente.
4. **Retorno de Foco:**
   - Al cerrarse, el foco del navegador debe retornar al elemento que disparó la apertura (ej. el botón "Ver Detalles").
5. **Bloqueo de Desplazamiento de Fondo:**
   - `document.body.style.overflow = 'hidden'` mientras el modal esté activo, restaurándolo a `''` al cerrar.

---

## 2. Navegación por Teclado e Interactividad

1. **Elementos Nativos:**
   - Emplear siempre `<button>` para acciones en la aplicación y `<a href="...">` para enlaces y navegación externa.
   - **Antipatrón Prohibido:** Usar `<div (click)="...">` o `<span (click)="...">` sin `tabindex="0"` ni listeners de teclado (`(keydown.enter)` / `(keydown.space)`).
2. **Indicador de Foco Visible (`:focus-visible`):**
   - Nunca suprimir `outline: none` sin proveer un reemplazo visual evidente.
   - Usar `:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 3px; }` en botones, enlaces, tabs e inputs.
3. **Iconos y Elementos Decorativos:**
   - Todo `<svg>` o `<i>` decorativo debe incluir `aria-hidden="true"`.
   - Si un botón o enlace contiene únicamente un icono gráfico (ej. cerrar, cambiar tema, redes sociales), debe incluir un `aria-label` descriptivo en español.

---

## 3. Ratios de Contraste Cromático

Basado en las directrices WCAG 2.1:
* **Texto estándar (< 18pt / < 14pt bold):** Ratio de contraste mínimo de **4.5:1** contra el fondo.
* **Texto grande (≥ 18pt / ≥ 14pt bold) y componentes UI:** Ratio mínimo de **3.0:1**.

### Verificación en Temas del Proyecto:
| Elemento | Modo Oscuro (`--bg-primary`: #1c1815) | Modo Claro (`--bg-primary`: #faf6f2) |
| :--- | :--- | :--- |
| Texto Principal (`--text-primary`) | `#f6f1ec` (> 13:1) ✅ | `#2d241e` (> 12:1) ✅ |
| Texto Secundario (`--text-secondary`) | `#cdc0b6` (> 7:1) ✅ | `#57483e` (> 6.5:1) ✅ |
| Badges Grises (`.badge-gray`) | Fondo `--bg-tertiary`, texto `--text-secondary` | Fondo `--bg-tertiary`, texto `--text-secondary` |
| Enlaces y Acentos (`--accent-primary`) | `#f0b49b` sobre fondos oscuros | `#cf6e48` (Terracota oscuro) sobre fondos claros |

---

## 4. Adaptabilidad y Reducción de Movimiento

Todo efecto cinético o canvas animado debe respetar la preferencia del usuario:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
En canvas / JavaScript:
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  this.renderStatic();
}
```

---

## 5. Checklist de Auditoría Rápida

- [ ] ¿Todos los botones e iconos tienen nombre accesible (`aria-label` o texto visible)?
- [ ] ¿Se puede navegar por todo el sitio usando exclusivamente la tecla `Tab`?
- [ ] ¿El modal de proyectos atrapa el foco y se cierra con `Escape`?
- [ ] ¿El menú móvil bloquea el scroll y soporta `Escape`?
- [ ] ¿Todos los contrastes pasan el umbral 4.5:1 tanto en modo claro como oscuro?
