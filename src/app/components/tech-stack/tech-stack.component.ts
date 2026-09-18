import { Component, ChangeDetectionStrategy, signal, computed, HostListener } from '@angular/core';
import { fadeInOverlay, popupModal } from '../../shared/animations/animations';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

export interface ProjectUsage {
  id: string;
  name: string;
  implementation: string;
}

export interface TechItem {
  id: string;
  name: string;
  role: string;
  category: 'backend' | 'cloud' | 'frontend' | 'data';
  categoryLabel: string;
  tag: string;
  logoUrl: string;
  uses: string[];
  projects: ProjectUsage[];
}

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
  // Selected technology for Pop-up Modal (no downwards accordion)
  selectedTech = signal<TechItem | null>(null);

  // Active Role filter tab
  activeRole = signal<'all' | 'backend' | 'cloud' | 'frontend' | 'data'>('all');

  // Master catalog of technologies
  readonly techList: TechItem[] = [
    {
      id: 'java-21',
      name: 'Java 21',
      role: 'Plataforma empresarial moderna con tipado estricto, Virtual Threads y alto rendimiento.',
      category: 'backend',
      categoryLabel: 'Backend & Core',
      tag: 'RUNTIME',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      uses: [
        'Arquitectura Hexagonal (Ports & Adapters) desacoplando lógica de dominio de frameworks.',
        'Concurrencia eficiente y escalable con Virtual Threads (Project Loom) para APIs I/O intensivas.',
        'Pruebas unitarias e integración rigurosas con JUnit 5 y Mockito.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Diseño hexagonal de microservicios transaccionales con 59 pruebas automatizadas.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Lógica centralizada de validación y aprobaciones bancarias en runtime Java 21.'
        }
      ]
    },
    {
      id: 'spring-boot-3',
      name: 'Spring Boot 3',
      role: 'Ecosistema de microservicios, inyección de dependencias y APIs REST transaccionales.',
      category: 'backend',
      categoryLabel: 'Backend & Core',
      tag: 'FRAMEWORK',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      uses: [
        'Exposición de endpoints RESTful con validaciones Jakarta y DTOs estrictos.',
        'Capa de persistencia desacoplada mediante Spring Data JPA e Hibernate.',
        'Configuración declarativa externalizada por perfiles para paridad DEV / PROD.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Controladores REST, manejo global de excepciones y persistencia JPA.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Microservicio contenerizado con perfiles de configuración dinámicos.'
        }
      ]
    },
    {
      id: 'spring-security',
      name: 'Spring Security & JWT',
      role: 'Autenticación stateless, filtros de seguridad y autorización RBAC por roles.',
      category: 'backend',
      categoryLabel: 'Backend & Core',
      tag: 'SECURITY',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      uses: [
        'Filtros personalizados para interceptar y validar tokens Bearer JWT.',
        'Control de acceso basado en roles (RBAC) a nivel de endpoint y servicio.',
        'Políticas estrictas de CORS y encriptación de credenciales con BCrypt.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Filtro de seguridad JWT stateless protegiendo endpoints de gestión de clientes.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Validación de jerarquías y privilegios de aprobación bancaria.'
        }
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      role: 'Servicios REST ligeros y microservicios asíncronos orientados a eventos.',
      category: 'backend',
      categoryLabel: 'Backend & Core',
      tag: 'ENGINE',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      uses: [
        'Microservicios I/O asíncronos de alto throughput con event-loop no bloqueante.',
        'Middlewares de validación, compresión y proxies ligeros de integración.'
      ],
      projects: [
        {
          id: 'transmiapp',
          name: 'Transmiapp Motor de Ruteo',
          implementation: 'API asíncrona de alta velocidad conectada directamente al motor espacial PostGIS.'
        }
      ]
    },
    {
      id: 'aws',
      name: 'AWS Cloud',
      role: 'Cómputo elástico, balanceo de carga y almacenamiento seguro en la nube.',
      category: 'cloud',
      categoryLabel: 'Cloud & DevOps',
      tag: 'CLOUD PLATFORM',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      uses: [
        'Despliegue de microservicios contenerizados en AWS ECS Fargate y EC2.',
        'Almacenamiento durable en buckets Amazon S3 para artefactos y sitios estáticos.',
        'Configuración de redes virtuales VPC, subnets públicas/privadas y ALB.'
      ],
      projects: [
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Cluster ECS Fargate con balanceador de carga ALB y base de datos relacional.'
        },
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Alojamiento en AWS EC2, bucket S3 para assets y pipeline de entrega.'
        }
      ]
    },
    {
      id: 'terraform',
      name: 'Terraform',
      role: 'Infraestructura como Código (IaC) declarativa con estado remoto seguro.',
      category: 'cloud',
      categoryLabel: 'Cloud & DevOps',
      tag: 'IaC ENGINE',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      uses: [
        'Aprovisionamiento automatizado de infraestructura completa en AWS.',
        'Estado remoto encriptado en S3 con control de concurrencia en DynamoDB.',
        'Paridad estricta y reproducible entre entornos DEV y PROD.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Scripts Terraform modulares para aprovisionamiento automatizado de EC2 y S3.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: '12 recursos de nube aprovisionados declarativamente sin intervención manual.'
        }
      ]
    },
    {
      id: 'docker',
      name: 'Docker',
      role: 'Contenerización optimizada multi-stage para microservicios y paridad de entornos.',
      category: 'cloud',
      categoryLabel: 'Cloud & DevOps',
      tag: 'CONTAINERS',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      uses: [
        'Builds multi-stage que reducen el tamaño de imágenes en más de 65%.',
        'Garantía de paridad absoluta entre desarrollo local y servidores cloud.',
        'Composición de servicios locales con Docker Compose para desarrollo ágil.'
      ],
      projects: [
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Imágenes distroless optimizadas corriendo como tareas Fargate.'
        },
        {
          id: 'transmiapp',
          name: 'Transmiapp Motor de Ruteo',
          implementation: 'Entorno de desarrollo local con contenedor de PostgreSQL + PostGIS.'
        }
      ]
    },
    {
      id: 'github-actions',
      name: 'GitHub Actions',
      role: 'Pipelines automatizados de pruebas unitarias, análisis estático y CI/CD.',
      category: 'cloud',
      categoryLabel: 'Cloud & DevOps',
      tag: 'CI/CD',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
      uses: [
        'Ejecución automatizada de suites de test en cada Pull Request.',
        'Análisis estático de código y empaquetado de artefactos Docker.',
        'Despliegue continuo hacia entornos cloud tras la validación de tests.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Pipeline automatizado que valida 59 pruebas y despliega la infraestructura.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Pipeline CI/CD que actualiza los servicios en AWS ECS Fargate.'
        }
      ]
    },
    {
      id: 'angular-19',
      name: 'Angular 19',
      role: 'Framework frontend SPA para plataformas web empresariales reactivas.',
      category: 'frontend',
      categoryLabel: 'Frontend & Web',
      tag: 'FRONTEND',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
      uses: [
        'Gestión reactiva de estado fino con Signals (signal, computed, effect).',
        'Rendimiento óptimo de renderizado con ChangeDetectionStrategy.OnPush.',
        'Estructura modular con componentes Standalone y lazy loading de rutas.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'SPA modular de gestión de clientes bancarios conectada a la API REST.'
        },
        {
          id: 'portfolio',
          name: 'Portafolio Personal',
          implementation: 'Arquitectura OnPush, signals para estado y accesibilidad WCAG AA.'
        }
      ]
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      role: 'Contratos de datos sincronizados extremo a extremo y tipado estricto.',
      category: 'frontend',
      categoryLabel: 'Frontend & Web',
      tag: 'LANGUAGE',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      uses: [
        'Interfaces y tipos estrictos compartidos con contratos de backend.',
        'Detección estática de errores en tiempo de desarrollo y compilación.',
        'Control estricto de nulos (strictNullChecks) para fiabilidad total.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Modelado estricto de DTOs y respuestas de API sincronizadas.'
        },
        {
          id: 'transmiapp',
          name: 'Transmiapp Motor de Ruteo',
          implementation: 'Tipado estricto de geometrías espaciales y resultados de grafo.'
        }
      ]
    },
    {
      id: 'astro-4',
      name: 'Astro 4',
      role: 'Generación estática (SSG), arquitectura de islas y métricas web óptimas.',
      category: 'frontend',
      categoryLabel: 'Frontend & Web',
      tag: 'SSG ENGINE',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg',
      uses: [
        'Generación de páginas web institucionales con cero JavaScript innecesario.',
        'Carga ultrarrápida y puntuaciones Lighthouse 100/100 en rendimiento.',
        'Arquitectura de islas para componentes interactivos aislados.'
      ],
      projects: [
        {
          id: 'pagina-jpii',
          name: 'Portal Educativo JPII',
          implementation: 'Sitio institucional con tiempo de carga FCP de 0.4s y 100/100 en Core Web Vitals.'
        }
      ]
    },
    {
      id: 'scss',
      name: 'SCSS & Design Systems',
      role: 'Tokens de diseño centralizados, accesibilidad WCAG AA y CSS modular.',
      category: 'frontend',
      categoryLabel: 'Frontend & Web',
      tag: 'STYLING',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      uses: [
        'Tokens CSS personalizados para alternancia nativa de tema oscuro/claro.',
        'Garantía de ratios de contraste accesibles y diseño responsivo fluido.',
        'Arquitectura de estilos modular y limpia sin dependencias pesadas.'
      ],
      projects: [
        {
          id: 'portfolio',
          name: 'Portafolio Personal',
          implementation: 'Sistema de diseño Terracota Basalto, modo claro/oscuro y tokens tipográficos.'
        },
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Vistas limpias y diseño responsivo adaptado a lineamientos bancarios.'
        }
      ]
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      role: 'Persistencia relacional ACID, optimización de queries y alta integridad.',
      category: 'data',
      categoryLabel: 'Datos & Geoespacial',
      tag: 'DATABASE',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      uses: [
        'Modelado relacional normalizado con integridad referencial estricta.',
        'Optimización de queries y planes de ejecución con EXPLAIN ANALYZE.',
        'Pool de conexiones optimizado con HikariCP para alto throughput.'
      ],
      projects: [
        {
          id: 'kata-bbog',
          name: 'Plataforma Banco de Bogotá',
          implementation: 'Persistencia de entidades de cliente con transacciones ACID.'
        },
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: 'Almacenamiento de flujos de aprobación y auditoría relacional.'
        }
      ]
    },
    {
      id: 'postgis',
      name: 'PostGIS',
      role: 'Cálculo de grafos geoespaciales, consultas de proximidad e indexación GiST.',
      category: 'data',
      categoryLabel: 'Datos & Geoespacial',
      tag: 'SPATIAL DB',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      uses: [
        'Almacenamiento y consulta de geometrías espaciales (puntos, polígonos, rutas).',
        'Consultas de proximidad y contención espacial aceleradas con índices GiST.',
        'Operaciones avanzadas ST_Distance, ST_Contains y transformaciones SRID.'
      ],
      projects: [
        {
          id: 'transmiapp',
          name: 'Transmiapp Motor de Ruteo',
          implementation: 'Cálculo de distancias y ruteo espacial en <6ms utilizando índices GiST.'
        }
      ]
    },
    {
      id: 'flyway',
      name: 'Flyway',
      role: 'Control de versiones declarativo de base de datos integrado en pipelines.',
      category: 'data',
      categoryLabel: 'Datos & Geoespacial',
      tag: 'MIGRATIONS',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      uses: [
        'Versionamiento declarativo de esquemas SQL en el repositorio de código.',
        'Migraciones automatizadas en el arranque de microservicios sin downtime.',
        'Auditoría y trazabilidad histórica de cambios en la base de datos.'
      ],
      projects: [
        {
          id: 'cloud-kata',
          name: 'Sistema de Aprobaciones Cloud',
          implementation: '100% de sincronización automática de esquema en despliegues con Fargate.'
        }
      ]
    }
  ];

  // Role categories for tabs
  readonly roles: RoleCategory[] = [
    { id: 'all', label: 'Todos', count: this.techList.length },
    { id: 'backend', label: 'Backend & Core', count: this.techList.filter(t => t.category === 'backend').length },
    { id: 'cloud', label: 'Cloud & DevOps', count: this.techList.filter(t => t.category === 'cloud').length },
    { id: 'frontend', label: 'Frontend & Web', count: this.techList.filter(t => t.category === 'frontend').length },
    { id: 'data', label: 'Datos & Geoespacial', count: this.techList.filter(t => t.category === 'data').length }
  ];

  // Filtered technologies computed by active role
  filteredTechs = computed(() => {
    const role = this.activeRole();
    if (role === 'all') return this.techList;
    return this.techList.filter(t => t.category === role);
  });

  // Dynamic carousel items repeating for seamless infinite marquee
  carouselTrackTechs = computed(() => {
    const items = this.filteredTechs();
    if (!items.length) return [];
    const repeatCount = Math.max(2, Math.ceil(16 / items.length));
    const list: TechItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      list.push(...items);
    }
    return list;
  });

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
