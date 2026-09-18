import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';

import { fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeInUp]
})
export class ExperienceComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;
  readonly experiences = computed(() => this.t().experience.items);

  constructor() {}
}
