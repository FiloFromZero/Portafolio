import { Component, ElementRef, HostListener, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { popupModal, fadeInOverlay, fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  github: string;
  metrics?: { label: string; value: string }[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, MouseFollowDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [popupModal, fadeInOverlay, fadeInUp]
})
export class ProjectsComponent {
  @ViewChild('previewPane') previewPane?: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  projects: Project[] = [
    {
      id: 'kata-bbog',
      title: 'Plataforma de Gestión de Clientes - Banco de Bogotá',
      category: 'Hexagonal Architecture & Multi-Cloud CI/CD',
      desc: 'API REST y SPA para gestión de clientes con arquitectura hexagonal, seguridad JWT, despliegue automatizado con Terraform en AWS EC2/S3 y pipelines de GitHub Actions.',
      tech: ['Java 21', 'Spring Boot', 'Spring Security', 'Angular 19', 'PostgreSQL', 'Docker', 'Terraform', 'AWS EC2/S3', 'GitHub Actions'],
      github: 'https://github.com/FiloFromZero/kata_bbog',
      metrics: [
        { label: 'Pruebas Integrales', value: '59 Tests Green' },
        { label: 'Ambientes Activos', value: 'DEV y PROD' },
        { label: 'Despliegue IaC', value: 'Terraform Automático' }
      ]
    },
    {
      id: 'cloud-kata',
      title: 'Sistema de Gestión de Aprobaciones',
      category: 'Cloud, IaC & DevOps',
      desc: 'Sistema distribuido de aprobaciones jerárquicas con automatización IaC y despliegue elástico serverless en AWS.',
      tech: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Flyway', 'Terraform', 'AWS ECS', 'GitHub Actions'],
      github: 'https://github.com/FiloFromZero/Kata_DesarrolladorCloud',
      metrics: [
        { label: 'Contenedores ECS', value: '3 Tareas Activas' },
        { label: 'Recursos IaC', value: '12 Gestionados' },
        { label: 'Migraciones DB', value: '100% Flyway Sync' }
      ]
    },
    {
      id: 'transmiapp',
      title: 'Transmiapp',
      category: 'Backend & Spatial Database',
      desc: 'Motor de cálculo de rutas eficientes sobre la red de transporte público utilizando PostgreSQL y la extensión espacial PostGIS.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'Docker Compose', 'GIS Spatial Indexing'],
      github: 'https://github.com/FiloFromZero/Transmiapp',
      metrics: [
        { label: 'Latencia Ruteo', value: '< 6ms' },
        { label: 'Indexación', value: 'GiST Spatial' },
        { label: 'API Throughput', value: '1.2k req/seg' }
      ]
    },
    {
      id: 'pagina-jpii',
      title: 'Portal Educativo JPII',
      category: 'Frontend & Static Delivery',
      desc: 'Landing page y blog estático de alto rendimiento para institución educativa. Optimizaciones SEO y carga veloz.',
      tech: ['Astro 4.0', 'Tailwind CSS', 'TypeScript', 'Netlify CDN', 'Netlify Actions'],
      github: 'https://iejuanpabloiisoacha.edu.co/',
      metrics: [
        { label: 'Puntaje Lighthouse', value: '100 / 100' },
        { label: 'Velocidad FCP', value: '0.4s' },
        { label: 'Tamaño Carga', value: '42 KB' }
      ]
    },
    {
      id: 'scrum-final-project',
      title: 'DriveMaster',
      category: 'Software Engineering & Scrum',
      desc: 'Sistema de Gestión basado en Suscripción para Academias de Conducción Colombianas',
      tech: ['Clean Architecture', 'GitHub Actions CI', 'JUnit', 'Scrum SDLC', 'Integration Testing'],
      github: 'https://github.com/cristianar1008/software-engineering-seminar-final-project',
      metrics: [
        { label: 'Cobertura Pruebas', value: '94.2% Passed' },
        { label: 'Pipeline CI', value: 'Green (14 runs)' },
        { label: 'Velocidad Scrum', value: '38 pts/Sprint' }
      ]
    }
  ];

  activePreviewProjectId: string | null = null;
  activeProject: Project | null = null;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activePreviewProjectId) {
      this.closePreview();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.activePreviewProjectId && event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  openPreview(projectId: string): void {
    this.activePreviewProjectId = projectId;
    this.activeProject = this.projects.find(p => p.id === projectId) || null;
    this.lockBodyScroll(true);
    this.cdr.markForCheck();
    // Move focus into the dialog for keyboard accessibility
    setTimeout(() => this.previewPane?.nativeElement.focus(), 0);
  }

  closePreview(): void {
    if (!this.activePreviewProjectId) return;
    this.activePreviewProjectId = null;
    this.activeProject = null;
    this.lockBodyScroll(false);
    this.cdr.markForCheck();
    this.previewPane?.nativeElement.removeAttribute('tabindex');
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
