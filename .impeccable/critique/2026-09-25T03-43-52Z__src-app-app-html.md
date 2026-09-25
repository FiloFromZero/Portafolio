---
target: src/app/app.html
total_score: 29
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
target_identity: "file:/home/mateo-m/Documentos/Dev_Mateo/src/app/app.html"
target_fingerprint: "sha256:459a002774c35080d97db3098d611e8c59155dc6b3ab360ce3caa15c4a02d207"
target_path: /home/mateo-m/Documentos/Dev_Mateo/src/app/app.html
timestamp: 2026-09-25T03-43-52Z
slug: src-app-app-html
---
# Critique: Daniel Mateo Montoya Portfolio (Aura)

Target: `src/app/app.html`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Barra de progreso superior y dock lateral con running-pip activo impecables. |
| 2 | Match Between System & Real World | 4 | Metáfora de dock Ubuntu y etiquetas técnicas reflejan fielmente el entorno dev. |
| 3 | User Control and Freedom | 4 | Alternador instantáneo Dark/Light, selector ES/EN y scroll suave directo. |
| 4 | Consistency and Standards | 3 | Desviación tipográfica menor (Georgia en cita de Séneca vs tokens de DESIGN.md). |
| 5 | Error Prevention | 4 | Enlaces externos con rel seguro, descargas directas de CV con formato y nombre explícitos. |
| 6 | Recognition Rather Than Recall | 4 | Tooltips en dock, chips con stack explícito y jerarquía visual evidente. |
| 7 | Flexibility and Efficiency of Use | 3 | Navegación fluida pero carece de atajos de teclado o buscador rápido de tecnologías. |
| 8 | Aesthetic and Minimalist Design | 3 | Gran atmósfera mineral, pero texto con clipping de degradado y rebotes restan sobriedad. |
| 9 | Error Recovery | 3 | Aplicación estática con comportamiento robusto; sin estados vacíos complejos. |
| 10 | Help and Documentation | n/a | Superficie de Showcase/Portafolio; no aplica documentación de ayuda de usuario. |
| **Total** | | **29/36** | **Strong / Production-Grade (80.5%)** |

## Design Specificity Verdict

**LLM Assessment:**
El diseño posee una fuerte especificidad de autor. No se siente como una plantilla genérica de Tailwind ni un tema genérico de IA. El dock lateral estilo Ubuntu, la matriz de partículas ambiental sutil y la paleta cálida mineral (basalto/terracota) crean una identidad reconocible que respalda el perfil de ingeniería de sistemas y cloud. Sin embargo, persisten dos vestigios de "plantilla efectista": el degradado en el texto del titular y las animaciones con rebote (`bounceDown`, curvas elásticas), que diluyen el rigor bancario y arquitectónico del candidato.

**Deterministic Scan:**
- Total de hallazgos detectados: **28** (7 advertencias, 21 avisos).
- **Advertencias clave:**
  - `gradient-text` (2): Uso de `background-clip: text` en `hero.component.scss` (líneas 78 y 95).
  - `bounce-easing` (2): Rebotes elásticos en `hero.component.scss` (líneas 443 y 545).
  - `design-system-font` (1): `font-family: Georgia` en cita de Séneca (`hero.component.scss:364`), fuera del catálogo de `DESIGN.md`.
  - `broken-image` (2): Falso positivo por sintaxis Angular `[src]="tech.logoUrl"` en `tech-stack.component.html`.
- **Avisos (Advisories):** Desviaciones menores de colores literales en sombras translúcidas (`rgba(0,0,0,...)`).

## Overall Impression
Un portafolio sumamente distinguido, técnicamente maduro y visualmente convincente. La combinación de calidez mineral y ergonomía de desarrollador es memorable. Pulir los degradados en texto y calmar las animaciones elásticas consolidará el estándar a nivel de premio de diseño.

## What's Working
1. **Dock lateral estilo Ubuntu:** Proporciona identidad única y navegación persistente sin invadir el viewport de lectura.
2. **Paleta cromática mineral:** El basalto cálido (`#141210`) y la terracota (`#cf6d48`) rompen con el cliché azul frío de portafolios técnicos genéricos.
3. **Tarjeta 3D interactiva de filosofía estoica:** Aporta dimensión humana y personalidad genuina sin estorbar la lectura del perfil técnico.

## Priority Issues

### [P1] Texto del Titular con Gradient-Clip
- **Por qué importa:** El degradado de blanco a terracota aplicado con `background-clip: text` degrada el contraste y la nitidez de lectura rápida por parte de reclutadores y directores de ingeniería.
- **Solución:** Reemplazar por color sólido en Lino Crudo (`#f6f1ec`) para el nombre y aplicar el acento terracota exclusivamente al rol técnico.
- **Comando sugerido:** `$impeccable typeset src/app/components/hero/`

### [P1] Animaciones con Rebote Elástico en Portafolio Arquitectónico
- **Por qué importa:** El keyframe `bounceDown` y la curva `cubic-bezier(0.34, 1.4, 0.64, 1)` añaden una física de dibujo animado que desentona con la solvencia bancaria y cloud del perfil.
- **Solución:** Sustituir los rebotes por transiciones suaves y continuas (`var(--transition-smooth)`).
- **Comando sugerido:** `$impeccable quieter src/app/components/hero/`

### [P2] Falsos Positivos de Imágenes Rotas en Tech Stack
- **Por qué importa:** El detector estático no interpreta el binding dinámico de Angular `[src]="tech.logoUrl"`.
- **Solución:** Agregar atributo de respaldo `src` con placeholder SVG inline o registrar la regla en el archivo de ignores.
- **Comando sugerido:** `$impeccable harden src/app/components/tech-stack/`

### [P2] Deriva Tipográfica en Cita de Séneca
- **Por qué importa:** Uso de `font-family: Georgia` no declarada en el sistema de diseño oficial (`DESIGN.md`).
- **Solución:** Unificar la cita bajo `DM Sans` con variante `italic` o incorporar explícitamente la fuente serifa a los tokens.
- **Comando sugerido:** `$impeccable polish src/app/components/hero/`

## Persona Red Flags

- **Sarah (Tech Recruiter - 20s de escaneo):** El degradado en el titular principal reduce la velocidad de asimilación del nombre en pantallas con brillo medio. Necesita ver nombre y rol técnico en contraste absoluto inmediato.
- **Marcus (Engineering Manager / Staff Architect):** El rebote elástico en el indicador de scroll transmite una sensación lúdica que contradice las métricas de alta latencia y rigor de misión crítica del Banco de Bogotá.
- **Elena (A11y Specialist):** La ausencia de atajos de teclado directos para saltar entre secciones limita la eficiencia de usuarios que dependen exclusivamente del teclado.

## Minor Observations
- En pantallas ultra-anchas (>1600px), el contenedor centrado luce impecable, pero el dock lateral se mantiene fijo a la izquierda creando una amplia distancia con el contenido.
- El contraste en modo claro es excelente (5.8:1), pero requiere verificar que los bordes sutiles no se pierdan en monitores con bajo rango dinámico.

## Questions to Consider
1. ¿Qué tan más autoritario se sentiría el Hero si el titular principal fuera completamente sobrio en color marfil sólido, dejando la terracota solo como punto focal quirúrgico?
2. ¿Aportaría al perfil técnico reemplazar el rebote elástico del scroll por un pulso continuo estilo pulso de servidor?
3. ¿Sería valioso añadir atajos de teclado tipo Vim/Unix (ej. `j`/`k` o números `1-5`) en el dock de Ubuntu para deleitar a los evaluadores técnicos?
