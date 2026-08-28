import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  NgZone
} from '@angular/core';

export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'flip-up';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Animation preset */
  @Input() revealAnimation: RevealAnimation = 'fade-up';
  /** Delay in ms before the animation starts */
  @Input() revealDelay = 0;
  /** Duration of the animation in ms */
  @Input() revealDuration = 600;
  /** Threshold of element visibility needed to trigger the animation */
  @Input() revealThreshold = 0.15;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initStyles();
    this.createObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initStyles(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'transition-property', 'opacity, transform');
    this.renderer.setStyle(el, 'transition-timing-function', 'cubic-bezier(0.22, 1, 0.36, 1)');
    this.renderer.setStyle(el, 'transition-duration', `${this.revealDuration}ms`);
    this.renderer.setStyle(el, 'transition-delay', `${this.revealDelay}ms`);
    this.renderer.setStyle(el, 'will-change', 'opacity, transform');

    this.renderer.setStyle(el, 'opacity', '0');
    this.renderer.setStyle(el, 'transform', this.getInitialTransform());
  }

  private getInitialTransform(): string {
    switch (this.revealAnimation) {
      case 'fade-up':      return 'translate3d(0, 36px, 0)';
      case 'fade-down':    return 'translate3d(0, -36px, 0)';
      case 'fade-left':    return 'translate3d(-36px, 0, 0)';
      case 'fade-right':   return 'translate3d(36px, 0, 0)';
      case 'zoom-in':      return 'scale3d(0.9, 0.9, 1)';
      case 'flip-up':      return 'perspective(600px) rotateX(15deg) translate3d(0, 24px, 0)';
      default:             return 'translate3d(0, 36px, 0)';
    }
  }

  private createObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.reveal();
            } else {
              this.hide();
            }
          });
        },
        { threshold: this.revealThreshold, rootMargin: '0px 0px -40px 0px' }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  private reveal(): void {
    const el = this.el.nativeElement;
    el.style.opacity = '1';
    el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
  }

  private hide(): void {
    const el = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transform = this.getInitialTransform();
  }
}
