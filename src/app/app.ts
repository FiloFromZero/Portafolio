import { Component, OnInit, AfterViewInit, OnDestroy, signal, ChangeDetectionStrategy, NgZone, HostListener } from '@angular/core';

import { ParticleCanvasComponent } from './shared/components/particle-canvas/particle-canvas.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';

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
export class App implements OnInit, AfterViewInit, OnDestroy {
  isLightTheme = signal(false);
  activeSection = signal('hero');
  isMobileMenuOpen = signal(false);
  scrollProgress = signal(0);
  isHeaderScrolled = signal(false);

  private readonly sectionIds = ['hero', 'experience', 'tech-stack', 'education', 'projects'];
  private observer?: IntersectionObserver;
  private scrollCleanups: (() => void)[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadSavedTheme();
    this.initScrollProgress();
  }

  ngAfterViewInit(): void {
    this.initScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollCleanups.forEach((fn) => fn());
    this.scrollCleanups = [];
  }

  private loadSavedTheme(): void {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === null) {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      this.isLightTheme.set(prefersLight);
      this.applyThemeClass(prefersLight);
      return;
    }
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
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 78;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      this.activeSection.set(sectionId);
      if (typeof history !== 'undefined' && history.pushState) {
        history.pushState(null, '', '#' + sectionId);
      }
    }
  }

  private applyThemeClass(light: boolean): void {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('light-theme', light);
  }

  private initScrollSpy(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible && this.activeSection() !== visible.target.id) {
            this.activeSection.set(visible.target.id);
          }
        },
        { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4] }
      );

      this.sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.observer?.observe(el);
      });
    });
  }

  // Barra de progreso de lectura y compresión del header al hacer scroll.
  private initScrollProgress(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      let ticking = false;
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        this.scrollProgress.set(progress);
        this.isHeaderScrolled.set(window.scrollY > 12);
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      update();
      this.scrollCleanups.push(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
