import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUp } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  badge?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, MouseFollowDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeInUp]
})
export class ExperienceComponent {
  experiences: ExperienceItem[] = [
    {
      period: '2026 — Julio 2026',
      role: 'Practicante Empresarial',
      company: 'Banco de Bogotá',
      location: 'Bogotá, Colombia',
      badge: 'Actual',
      description: 'Mantenimiento evolutivo y modernización de plataformas críticas de back-office, implementando arquitecturas modernas y flujos continuos de integración y despliegue.',
      highlights: [
        'Ejecución del mantenimiento evolutivo y estrategia de migración de aplicaciones legacy de Back-Office desarrolladas en Java 11, jQuery y servicios SOAP, garantizando continuidad operativa en Oracle WebLogic.',
        'Modernización de vistas críticas de plataformas heredadas mediante la adopción de Angular, garantizando compatibilidad multiplataforma y reduciendo tiempos de respuesta.',
        'Liderazgo en la entrega de soluciones digitales en iniciativas de innovación bancaria, construyendo productos full-cycle y optimizando tiempos de entrega a producción con CI/CD (GitHub Actions) en la nube.'
      ],
      technologies: ['Java 11', 'Spring Boot', 'Angular', 'Oracle WebLogic', 'SOAP / REST', 'GitHub Actions', 'AWS']
    },
    {
      period: '2025 — Enero 2026',
      role: 'Desarrollador Full Stack',
      company: 'Instituto Psicopedagógico Juan Pablo II',
      location: 'Soacha, Cundinamarca',
      description: 'Desarrollo, modernización y despliegue de plataformas web educativas escalables y optimización de infraestructura cloud.',
      highlights: [
        'Desarrollo de aplicaciones web escalables con Astro, TypeScript, Java (Spring Boot) y AWS.',
        'Migración de hosting para la aplicación y automatización de despliegues continuos.',
        'Colaboración en la migración de la plataforma educativa hacia una nueva arquitectura asegurando la integridad de la información mediante APIs y optimizando costos operativos.'
      ],
      technologies: ['Astro', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'APIs REST', 'CI/CD']
    },
    {
      period: 'Julio 2024 — Diciembre 2024',
      role: 'Monitor Académico',
      company: 'Universidad Distrital Francisco José de Caldas',
      location: 'Bogotá, Colombia',
      description: 'Desarrollo de software para la gestión de laboratorios académicos y arquitectura de servicios en la nube.',
      highlights: [
        'Desarrollo y mantenimiento de módulos para el software de gestión de laboratorios con Angular, TypeScript y Java (Spring Boot), optimizando registro, trazabilidad y procesamiento de datos experimentales.',
        'Implementación de arquitectura cloud en AWS y consumo de APIs RESTful para el aplicativo de laboratorio, garantizando alta disponibilidad e integridad de resultados.'
      ],
      technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'APIs REST', 'PostgreSQL']
    }
  ];
}
