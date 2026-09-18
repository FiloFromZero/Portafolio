import { Component, OnDestroy, ChangeDetectionStrategy, signal } from '@angular/core';

import { fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [fadeInUp]
})
export class HeroComponent implements OnDestroy {
  isCardFlipped = signal(false);

  private cleanups: (() => void)[] = [];

  constructor() {}

  toggleCardFlip(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.isCardFlipped.update((flipped) => !flipped);
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }
}

