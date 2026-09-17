import { Component, ElementRef, HostListener, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { popupModal, fadeInOverlay, fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

export interface ArchitectureDetail {
  title: string;
  points: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
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
  imports: [ ScrollRevealDirective, MouseFollowDirective],
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
      featured: true,
      metrics: [
        { label: 'Pruebas Integrales', value: '59 Tests Green' },
        { label: 'Ambientes Activos', value: 'DEV y PROD' },
        { label: 'Despliegue IaC', value: 'Terraform Automático' }
      ],
      details: {
        summary: 'Registro y consulta de clientes en la nube con arquitectura hexagonal, pruebas exhaustivas y ambientes diferenciados (DEV/PROD).',
        sections: [
          {
            title: 'ARQUITECTURA Y BACKEND',
            points: [
              'Arquitectura Hexagonal (Clean Architecture) en Java 21 + Spring Boot 3.x.',
              'Persistencia desacoplada con JPA/PostgreSQL.',
              'Seguridad por HTTP Basic Auth y filtros JWT.'
            ]
          },
          {
            title: 'FRONTEND, DEVOPS & CI/CD',
            points: [
              'Frontend SPA en Angular 19 con diseño responsivo.',
              'Infraestructura como Código (IaC) con Terraform para AWS EC2 y S3.',
              'Pipelines en GitHub Actions para pruebas y despliegue automático.'
            ]
          }
        ]
      }
    },
    {
      id: 'cloud-kata',
      title: 'Sistema de Gestión de Aprobaciones',
      category: 'Cloud, IaC & DevOps',
      desc: 'Sistema distribuido de aprobaciones jerárquicas con automatización IaC y despliegue elástico serverless en AWS.',
      tech: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Flyway', 'Terraform', 'AWS ECS', 'GitHub Actions'],
      github: 'https://github.com/FiloFromZero/Kata_DesarrolladorCloud',
      featured: true,
      metrics: [
        { label: 'Contenedores ECS', value: '3 Tareas Activas' },
        { label: 'Recursos IaC', value: '12 Gestionados' },
        { label: 'Migraciones DB', value: '100% Flyway Sync' }
      ],
      details: {
        summary: 'Aplicación nativa en la nube (Cloud-Native) diseñada para alta disponibilidad, desplegada sobre contenedores AWS ECS Fargate.',
        sections: [
          {
            title: 'INFRAESTRUCTURA COMO CÓDIGO (IaC)',
            points: [
              'Aprovisionamiento automatizado de AWS ECS, ECR, RDS y Application Load Balancers con Terraform.',
              'Gestión de estado de Terraform en buckets S3 encriptados.'
            ]
          },
          {
            title: 'BACKEND Y BASE DE DATOS',
            points: [
              'Contenedores Docker optimizados para Spring Boot 3.',
              'Gestión de versiones de base de datos con scripts Flyway integrados al pipeline.'
            ]
          }
        ]
      }
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
      ],
      details: {
        summary: 'API Node.js diseñada para cálculo de grafos geoespaciales y rutas óptimas de transporte masivo.',
        sections: [
          {
            title: 'BASES DE DATOS ESPACIALES',
            points: [
              'Uso de PostGIS para consultas de proximidad (ST_DWithin) y uniones espaciales.',
              'Índices GiST para optimización drástica de consultas por cuadrante geográfico.'
            ]
          },
          {
            title: 'ARQUITECTURA DE API',
            points: [
              'Implementación de middlewares de rendimiento y manejo asíncrono en Express.',
              'Entorno contenerizado local con Docker Compose listo para la nube.'
            ]
          }
        ]
      }
    },
    {
      id: 'pagina-jpii',
      title: 'Portal Educativo JPII',
      category: 'Frontend & Static Delivery',
      desc: 'Landing page y blog estático de alto rendimiento para institución educativa. Optimizaciones SEO y carga veloz.',
      tech: ['Astro 4.0', 'Tailwind CSS', 'TypeScript', 'Netlify CDN', 'Netlify Actions'],
      liveDemo: 'https://iejuanpabloiisoacha.edu.co/',
      metrics: [
        { label: 'Puntaje Lighthouse', value: '100 / 100' },
        { label: 'Velocidad FCP', value: '0.4s' },
        { label: 'Tamaño Carga', value: '42 KB' }
      ],
      details: {
        summary: 'Sitio estático (SSG) de grado de producción con métricas web core perfectas, construido con Astro.',
        sections: [
          {
            title: 'RENDIMIENTO Y ESTRATEGIA WEB',
            points: [
              'Hydration parcial con "Island Architecture" de Astro para 0 JavaScript no utilizado.',
              'Imágenes optimizadas en formatos modernos (WebP/AVIF) pre-compiladas.',
              'Despliegue automático a CDN global vía Netlify CI/CD.'
            ]
          },
          {
            title: 'DISEÑO UI / UX',
            points: [
              'Sistema de diseño responsivo basado en utility classes (Tailwind CSS).',
              'Auditoría y cumplimiento 100% en Lighthouse (Performance, A11y, SEO).'
            ]
          }
        ]
      }
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
      ],
      details: {
        summary: 'Aplicación monolítica robusta desarrollada en equipo, simulando un ciclo de vida real mediante metodologías ágiles.',
        sections: [
          {
            title: 'PROCESO DE INGENIERÍA',
            points: [
              'Desarrollo iterativo Scrum con Sprints de 2 semanas y tableros de control.',
              'Revisiones de código en pull requests (Peer Reviews) y despliegue continuo.'
            ]
          },
          {
            title: 'CALIDAD DE SOFTWARE',
            points: [
              'Alta cobertura de pruebas unitarias y de integración (JUnit / Mockito).',
              'Aplicación estricta de principios SOLID y arquitectura limpia (Clean Architecture).'
            ]
          }
        ]
      }
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

  private lastTriggerElement: HTMLElement | null = null;

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.activePreviewProjectId) return;
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
    this.activePreviewProjectId = projectId;
    this.activeProject = this.projects.find(p => p.id === projectId) || null;
    this.lockBodyScroll(true);
    this.cdr.markForCheck();
    // Move focus into the dialog for keyboard accessibility
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
    if (!this.activePreviewProjectId) return;
    this.activePreviewProjectId = null;
    this.activeProject = null;
    this.lockBodyScroll(false);
    this.cdr.markForCheck();
    // Restore focus to trigger button
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
