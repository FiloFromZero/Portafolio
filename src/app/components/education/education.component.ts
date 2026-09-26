import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;

  readonly educationList = computed(() => this.t().education.educationList);
  readonly certificationsList = computed(() => this.t().education.certificationsList);
  readonly badgesList = computed(() => this.t().education.badgesList);

  constructor() {}
}
