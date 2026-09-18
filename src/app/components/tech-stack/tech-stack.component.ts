import { Component, ChangeDetectionStrategy, signal, computed, HostListener, inject } from '@angular/core';
import { fadeInOverlay, popupModal } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService, TechItemTranslation, RoleCategoryTranslation } from '../../shared/services/translation.service';

export type TechItem = TechItemTranslation;

export interface RoleCategory {
  id: 'all' | 'backend' | 'cloud' | 'frontend' | 'data';
  label: string;
  count: number;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss'],
  animations: [fadeInOverlay, popupModal]
})
export class TechStackComponent {
  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;

  // Selected technology for Pop-up Modal
  selectedTech = signal<TechItem | null>(null);

  // Active Role filter tab
  activeRole = signal<'all' | 'backend' | 'cloud' | 'frontend' | 'data'>('all');

  // Master catalog of technologies computed from active language
  readonly techList = computed<TechItem[]>(() => this.t().techStack.techList);

  // Active tech in modal synced with language changes
  readonly activeModalTech = computed<TechItem | null>(() => {
    const selected = this.selectedTech();
    if (!selected) return null;
    return this.techList().find(t => t.id === selected.id) || selected;
  });

  // Role categories for tabs with dynamic counts and translated labels
  readonly roles = computed<RoleCategory[]>(() => {
    const list = this.techList();
    return this.t().techStack.roles.map((r: RoleCategoryTranslation) => ({
      id: r.id,
      label: r.label,
      count: r.id === 'all' ? list.length : list.filter(t => t.category === r.id).length
    }));
  });

  // Filtered technologies computed by active role
  readonly filteredTechs = computed(() => {
    const role = this.activeRole();
    const list = this.techList();
    if (role === 'all') return list;
    return list.filter(t => t.category === role);
  });

  // Dynamic carousel items repeating for seamless infinite marquee
  readonly carouselTrackTechs = computed(() => {
    const items = this.filteredTechs();
    if (!items.length) return [];
    const repeatCount = Math.max(2, Math.ceil(16 / items.length));
    const list: TechItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      list.push(...items);
    }
    return list;
  });

  constructor() {}

  setRole(role: 'all' | 'backend' | 'cloud' | 'frontend' | 'data'): void {
    this.activeRole.set(role);
  }

  openTechPopup(tech: TechItem): void {
    this.selectedTech.set(tech);
  }

  closeTechPopup(): void {
    this.selectedTech.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedTech()) {
      this.closeTechPopup();
    }
  }

  scrollToProject(projectId: string, event?: Event): void {
    if (event) event.preventDefault();
    this.closeTechPopup();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
