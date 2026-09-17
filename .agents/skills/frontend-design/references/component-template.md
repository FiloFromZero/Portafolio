# Plantilla de Referencia para Componentes en Aura

A continuacion se presenta la estructura estandar recomendada para cualquier nuevo componente de UI en el portafolio:

### Componente TypeScript (`nombre.component.ts`)

```typescript
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nombre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NombreComponent {
  // Manejo de estado reactivo con Signals
  isExpanded = signal(false);

  toggleExpand(): void {
    this.isExpanded.update(val => !val);
  }
}
```

### Template HTML Semantico (`nombre.component.html`)

```html
<section class="nombre-section" aria-labelledby="section-heading">
  <div class="container">
    <h2 id="section-heading" class="section-title">
      Titulo de la <span class="text-gradient">Seccion</span>
    </h2>
    <div class="card-aura" [class.is-active]="isExpanded()">
      <button 
        type="button" 
        class="action-btn"
        (click)="toggleExpand()"
        [attr.aria-expanded]="isExpanded()"
        aria-label="Alternar visibilidad del contenido">
        <span>Accion</span>
      </button>
    </div>
  </div>
</section>
```

### Estilos SCSS con Tokens Globales (`nombre.component.scss`)

```scss
.nombre-section {
  padding: 4rem 1.5rem;
  background-color: var(--bg-primary);

  .section-title {
    font-family: var(--font-sans);
    color: var(--text-primary);
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .card-aura {
    background: var(--bg-card);
    border: 1px solid var(--border-normal);
    border-radius: 12px;
    padding: 1.5rem;
    backdrop-filter: blur(12px);
    transition: var(--transition-smooth);

    &:hover {
      border-color: var(--border-glow);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }
  }

  .action-btn {
    font-family: var(--font-mono);
    color: var(--text-primary);
    background: var(--bg-tertiary);
    border: 1px solid var(--border-light);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: var(--transition-smooth);

    &:hover {
      background: var(--accent-primary);
      color: var(--bg-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 2px;
    }
  }
}
```
