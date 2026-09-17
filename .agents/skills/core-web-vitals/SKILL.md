---
name: core-web-vitals
description: >-
  Provee principios y listas de control para optimizar la velocidad de carga (LCP/FCP), la estabilidad visual (CLS = 0) y el rendimiento de renderizado (INP < 100ms / 60 FPS) en aplicaciones Angular, asegurando calificaciones sobresalientes en Google Lighthouse.
---

# Core Web Vitals & Frontend Performance Guidelines

Esta skill establece las pautas de ingeniería de rendimiento para garantizar que las aplicaciones web ofrezcan una experiencia de usuario instantánea, sin saltos de interfaz y con consumo mínimo de recursos.

---

## 1. Cumulative Layout Shift (CLS — Meta: 0.00)

El CLS mide la estabilidad visual. Ningún elemento debe cambiar de posición repentinamente mientras la página o los recursos se cargan.

1. **Dimensiones Explícitas en Medios:**
   - Toda etiqueta `<img>` debe contar con atributos `width` y `height` nativos en el HTML que preserven el *aspect-ratio* antes de que descargue el archivo binario:
     ```html
     <img src="..." width="800" height="800" alt="..." ...>
     ```
2. **Reserva de Espacio para Contenido Dinámico:**
   - Modales, listas o contenedores asíncronos deben definir alturas mínimas o esqueletos visuales para evitar empujar elementos adyacentes al aparecer.
3. **Carga de Tipografías Web:**
   - Usar `font-display: swap` en las fuentes de Google Fonts o autohospedadas.
   - Declarar `preconnect` a los orígenes externos de fuentes (`fonts.googleapis.com` y `fonts.gstatic.com`).

---

## 2. Largest Contentful Paint (LCP — Meta: < 1.2s) & FCP

1. **Priorización de Recursos Críticos:**
   - La imagen principal del hero debe tener `fetchpriority="high"` y `loading="eager"` (o sin `loading="lazy"`).
   - Imágenes bajo el pliegue inicial (*below the fold*) deben usar `loading="lazy"` y `decoding="async"`.
2. **Formatos Modernos y Compresión:**
   - Usar formatos de última generación: **WebP** o **AVIF** con resoluciones ajustadas (ej. `PERFIL_800.webp` en lugar de JPEGs pesados de 4K).
3. **Reducción de Render-Blocking Resources:**
   - Cargar estilos críticos en línea o diferir recursos secundarios.
   - Evitar bundles monolíticos; aprovechar componentes Standalone y tree-shaking nativo de Angular.

---

## 3. Interaction to Next Paint (INP) & Rendimiento en Tiempo de Ejecución (60 FPS)

1. **Desacoplar la Detección de Cambios de Angular:**
   - Toda animación continua (ej. canvas de fondo, listeners de scroll o movimiento de cursor) **debe ejecutarse estrictamente fuera de la zona de Angular**:
     ```typescript
     this.ngZone.runOutsideAngular(() => {
       window.addEventListener('scroll', onScroll, { passive: true });
       this.loop();
     });
     ```
2. **Propiedades Amigables con la GPU (Compositor Thread):**
   - Animar **únicamente** `transform` y `opacity`.
   - **Prohibido:** Animar `width`, `height`, `margin`, `padding`, `top` o `left`, ya que fuerzan *Layout Recalculation* y *Reflow* en el hilo principal de la CPU.
3. **Listeners Pasivos:**
   - Todos los event listeners de `scroll`, `touchstart` y `wheel` deben marcarse con `{ passive: true }` para permitir que el navegador realice scroll suave sin esperar a JavaScript.

---

## 4. Checklist de Auditoría de Rendimiento

- [ ] ¿La imagen del Hero tiene `fetchpriority="high"`, `width` y `height` explícitos?
- [ ] ¿El canvas y los listeners de scroll corren en `runOutsideAngular`?
- [ ] ¿Las animaciones en SCSS usan exclusivamente `transform` y `opacity`?
- [ ] ¿No hay librerías pesadas innecesarias en `package.json`?
- [ ] ¿El bundle de producción compila en menos de 150 kB transferidos para la ruta inicial?
