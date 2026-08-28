import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  private reduced = false;
  private cleanups: (() => void)[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {
    this.reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnInit() {
    if (this.reduced) return;
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'transition', 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)');

    // Run mouse interaction directly in native DOM, outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      const onMouseMove = (event: MouseEvent) => {
        const rect = nativeEl.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        
        const pullX = 0.15;
        const pullY = 0.15;

        nativeEl.style.transform = `translate3d(${x * pullX}px, ${y * pullY}px, 0) scale(1.02)`;
      };

      const onMouseLeave = () => {
        nativeEl.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
      };

      nativeEl.addEventListener('mousemove', onMouseMove, { passive: true });
      nativeEl.addEventListener('mouseleave', onMouseLeave, { passive: true });

      this.cleanups.push(() => nativeEl.removeEventListener('mousemove', onMouseMove));
      this.cleanups.push(() => nativeEl.removeEventListener('mouseleave', onMouseLeave));
    });
  }

  ngOnDestroy() {
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];
  }
}
