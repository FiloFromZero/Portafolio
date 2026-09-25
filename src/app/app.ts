import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy, NgZone, HostListener, inject } from '@angular/core';

import { ParticleCanvasComponent } from './shared/components/particle-canvas/particle-canvas.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TranslationService } from './shared/services/translation.service';

const THEME_KEY = 'aura-theme';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    
    ParticleCanvasComponent,
    HeroComponent,
    ExperienceComponent,
    TechStackComponent,
    EducationComponent,
    ProjectsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  private readonly translationService = inject(TranslationService);

  isLightTheme = signal(false);
  activeSection = signal('hero');
  isMobileMenuOpen = signal(false);
  scrollProgress = signal(0);
  isHeaderScrolled = signal(false);

  readonly currentLang = this.translationService.currentLang;
  readonly t = this.translationService.t;

  private readonly sectionIds = ['hero', 'experience', 'tech-stack', 'projects', 'education'];
  private isNavigating = false;
  private navTimeout?: ReturnType<typeof setTimeout>;
  private scrollCleanups: (() => void)[] = [];

  constructor(private ngZone: NgZone) {}

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  ngOnInit(): void {
    this.loadSavedTheme();
    this.initScrollEngine();
  }

  ngOnDestroy(): void {
    if (this.navTimeout) clearTimeout(this.navTimeout);
    this.scrollCleanups.forEach((fn) => fn());
    this.scrollCleanups = [];
  }

  private loadSavedTheme(): void {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(THEME_KEY);
    // Modo oscuro de forma predeterminada
    const light = saved === 'light';
    this.isLightTheme.set(light);
    this.applyThemeClass(light);
  }

  toggleTheme() {
    const light = !this.isLightTheme();
    this.isLightTheme.set(light);
    this.applyThemeClass(light);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const key = event.key;
    if (key >= '1' && key <= '5') {
      const index = parseInt(key, 10) - 1;
      if (this.sectionIds[index]) {
        this.scrollTo(this.sectionIds[index]);
      }
    } else if (key === 't' || key === 'T') {
      this.toggleTheme();
    }
  }

  toggleMobileMenu() {
    const newState = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(newState);
    this.lockBodyScroll(newState);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.lockBodyScroll(false);
  }

  private lockBodyScroll(lock: boolean): void {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  scrollTo(sectionId: string, event?: Event) {
    if (event) event.preventDefault();
    this.closeMobileMenu();
    this.activeSection.set(sectionId);

    // Prevent scrollspy from fluttering across intermediate sections during smooth travel
    this.isNavigating = true;
    if (this.navTimeout) clearTimeout(this.navTimeout);
    this.navTimeout = setTimeout(() => {
      this.isNavigating = false;
    }, 850);

    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 68;
        const offsetPosition = Math.max(0, el.offsetTop - headerOffset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    if (typeof history !== 'undefined' && history.pushState) {
      history.pushState(null, '', '#' + sectionId);
    }
  }

  private applyThemeClass(light: boolean): void {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('light-theme', light);
  }

  // Unified high-performance scroll engine: reading progress + header state + focal-point scroll spy
  private initScrollEngine(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      let ticking = false;

      const update = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = docHeight - viewportHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

        this.scrollProgress.set(progress);
        this.isHeaderScrolled.set(scrollY > 12);

        // Update active navigation section if not in programmatic smooth scroll
        if (!this.isNavigating) {
          this.updateActiveSection(scrollY, viewportHeight, docHeight);
        }

        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();

      this.scrollCleanups.push(() => window.removeEventListener('scroll', onScroll));
      this.scrollCleanups.push(() => window.removeEventListener('resize', onScroll));
    });
  }

  private updateActiveSection(scrollY: number, viewportHeight: number, docHeight: number): void {
    // 1. Bottom of page threshold (reaches education cleanly)
    if (scrollY + viewportHeight >= docHeight - 40) {
      if (this.activeSection() !== 'education') {
        this.activeSection.set('education');
      }
      return;
    }

    // 2. Top of page threshold (reaches hero cleanly)
    if (scrollY < 140) {
      if (this.activeSection() !== 'hero') {
        this.activeSection.set('hero');
      }
      return;
    }

    // 3. Focal zone tracking (calibrated at 35% from the top of the viewport)
    const focalPoint = scrollY + viewportHeight * 0.35;
    let currentSection = 'hero';

    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const id = this.sectionIds[i];
      const el = document.getElementById(id);
      if (el && focalPoint >= el.offsetTop) {
        currentSection = id;
        break;
      }
    }

    if (this.activeSection() !== currentSection) {
      this.activeSection.set(currentSection);
    }
  }
}
