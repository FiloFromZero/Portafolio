import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';

/**
 * Guarda de lectura/resumen del ratón en elementos interactivos.
 * Actualiza las CSS custom properties --b-x / --b-y (posiciones del cursor
 * relativas al elemento) para alimentar un "beam" de luz decorativo definido
 * en CSS. Se ejecuta fuera de la zona Angular y registra su propio cleanup.
 */
@Directive({
  selector: '[appMouseFollow]',
  standalone: true,
})
export class MouseFollowDirective implements OnInit, OnDestroy {
  private cleanups: (() => void)[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      const onMove = (event: MouseEvent) => {
        const rect = nativeEl.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        nativeEl.style.setProperty('--b-x', `${x}px`);
        nativeEl.style.setProperty('--b-y', `${y}px`);
      };

      nativeEl.addEventListener('mousemove', onMove, { passive: true });
      this.cleanups.push(() => nativeEl.removeEventListener('mousemove', onMove));
    });
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }
}
