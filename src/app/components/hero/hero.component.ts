import { Component, ElementRef, AfterViewInit, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUp } from '../../shared/animations/animations';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MagneticDirective, ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [fadeInUp]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private cleanups: (() => void)[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initSpotlight();
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }

  // Efecto "spotlight" del ratón aplicado sobre .text-gradient del título
  private initSpotlight(): void {
    if (typeof window === 'undefined') return;
    const host = this.el.nativeElement;
    const gradientEl = host.querySelector<HTMLElement>('.text-gradient');
    if (!gradientEl) return;

    this.ngZone.runOutsideAngular(() => {
      const onMove = (event: MouseEvent) => {
        const rect = host.getBoundingClientRect();
        const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
        gradientEl.style.setProperty('--mx', `${x}%`);
        gradientEl.style.setProperty('--my', `${y}%`);
      };
      host.addEventListener('mousemove', onMove, { passive: true });
      this.cleanups.push(() => host.removeEventListener('mousemove', onMove));
    });
  }
}

