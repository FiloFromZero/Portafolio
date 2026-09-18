import { Component, ElementRef, HostListener, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed, inject } from '@angular/core';

import { popupModal, fadeInOverlay, fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService, ProjectItemTranslation } from '../../shared/services/translation.service';

export interface ArchitectureDetail {
  title: string;
  points: string[];
}

export interface Project {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  desc: string;
  problemStatement: string;
  tech: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  details?: {
    summary: string;
    sections: ArchitectureDetail[];
  };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [popupModal, fadeInOverlay, fadeInUp]
})
export class ProjectsComponent {
  @ViewChild('previewPane') previewPane?: ElementRef<HTMLElement>;

  private readonly translationService = inject(TranslationService);

  readonly t = this.translationService.t;

  readonly projects = computed<Project[]>(() => this.t().projects.items as unknown as Project[]);

  readonly activePreviewProjectId = signal<string | null>(null);

  readonly activeProject = computed<Project | null>(() => {
    const id = this.activePreviewProjectId();
    if (!id) return null;
    return this.projects().find(p => p.id === id) || null;
  });

  private lastTriggerElement: HTMLElement | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.activePreviewProjectId()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePreview();
    } else if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  openPreview(projectId: string, triggerEvent?: Event): void {
    if (typeof document !== 'undefined') {
      this.lastTriggerElement = (triggerEvent?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
    }
    this.activePreviewProjectId.set(projectId);
    this.lockBodyScroll(true);
    this.cdr.markForCheck();
    setTimeout(() => {
      const closeBtn = this.previewPane?.nativeElement.querySelector<HTMLElement>('.btn-close');
      if (closeBtn) {
        closeBtn.focus();
      } else {
        this.previewPane?.nativeElement.focus();
      }
    }, 50);
  }

  closePreview(): void {
    if (!this.activePreviewProjectId()) return;
    this.activePreviewProjectId.set(null);
    this.lockBodyScroll(false);
    this.cdr.markForCheck();
    if (this.lastTriggerElement && typeof this.lastTriggerElement.focus === 'function') {
      setTimeout(() => this.lastTriggerElement?.focus(), 50);
    }
  }

  private lockBodyScroll(lock: boolean): void {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  private trapFocus(event: KeyboardEvent): void {
    const pane = this.previewPane?.nativeElement;
    if (!pane) return;

    const focusables = pane.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && (active === first || active === pane)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
