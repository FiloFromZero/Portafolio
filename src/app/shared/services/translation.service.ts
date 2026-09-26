import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'en';

const LANG_STORAGE_KEY = 'aura-lang';

export interface NavTranslations {
  home: string;
  experience: string;
  stack: string;
  projects: string;
  education: string;
  menu: string;
  dockLabel: string;
  homeAria: string;
  menuToggleAria: string;
  themeToggleAria: string;
  themeLight: string;
  themeDark: string;
  langToggleAria: string;
  langTooltip: string;
  langLabel: string;
}

export interface HeroTranslations {
  eyebrow: string;
  rolePrefix: string;
  roleAccent: string;
  roleSuffix: string;
  leadHtml: string;
  stackLabel: string;
  downloadCv: string;
  downloadCvAria: string;
  githubAria: string;
  linkedinAria: string;
  photoAlt: string;
  flipPromptFront: string;
  cardAriaFront: string;
  cardAriaBack: string;
  quotePill: string;
  quoteText: string;
  quoteAuthor: string;
  flipPromptBack: string;
  scrollLabel: string;
  scrollAria: string;
}

export interface ExperienceItemTranslation {
  period: string;
  role: string;
  company: string;
  location: string;
  scope: string;
  badge?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ExperienceTranslations {
  title: string;
  subtitle: string;
  items: ExperienceItemTranslation[];
}

export interface ProjectUsageTranslation {
  id: string;
  name: string;
  implementation: string;
}

export interface TechItemTranslation {
  id: string;
  name: string;
  role: string;
  category: 'backend' | 'cloud' | 'frontend' | 'data';
  categoryLabel: string;
  tag: string;
  logoUrl: string;
  uses: string[];
  projects: ProjectUsageTranslation[];
}

export interface RoleCategoryTranslation {
  id: 'all' | 'backend' | 'cloud' | 'frontend' | 'data';
  label: string;
}

export interface TechStackTranslations {
  title: string;
  subtitle: string;
  rolesTabsAria: string;
  carouselAria: string;
  hint: string;
  roles: RoleCategoryTranslation[];
  modalUsesHeading: string;
  modalProjectsHeading: string;
  modalViewProject: string;
  modalCloseBtn: string;
  modalCloseAria: string;
  techList: TechItemTranslation[];
}

export interface ProjectArchitectureDetail {
  title: string;
  points: string[];
}

export interface ProjectItemTranslation {
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
    sections: ProjectArchitectureDetail[];
  };
}

export interface ProjectsTranslations {
  title: string;
  subtitle: string;
  featuredBadge: string;
  inspectBtn: string;
  inspectBtnAria: string;
  githubLink: string;
  liveDemoLink: string;
  modalSummaryHeading: string;
  modalGithubBtn: string;
  modalLiveDemoBtn: string;
  modalCloseAria: string;
  items: ProjectItemTranslation[];
}

export interface EducationItemTranslation {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
}

export interface CertificationItemTranslation {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface BadgeItemTranslation {
  name: string;
  issuer: string;
  date: string;
  description: string;
  platform: 'credly' | 'aws' | 'google' | 'microsoft' | 'other';
  badgeImageUrl: string;
  verificationUrl: string;
}

export interface EducationTranslations {
  title: string;
  subtitle: string;
  universityColTitle: string;
  certsColTitle: string;
  badgesColTitle: string;
  verifyBtn: string;
  verifyAria: string;
  educationList: EducationItemTranslation[];
  certificationsList: CertificationItemTranslation[];
  badgesList: BadgeItemTranslation[];
}

export interface FooterTranslations {
  tagline: string;
  backToTopTitle: string;
  backToTopAria: string;
  githubAria: string;
  linkedinAria: string;
  copyright: string;
}

export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  experience: ExperienceTranslations;
  techStack: TechStackTranslations;
  projects: ProjectsTranslations;
  education: EducationTranslations;
  footer: FooterTranslations;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly currentLang = signal<Language>('es');

  private readonly translations: Record<Language, TranslationDictionary> = {
    es: {
      nav: {
        home: 'Inicio',
        experience: 'Experiencia',
        stack: 'Stack',
        projects: 'Proyectos',
        education: 'Estudios',
        menu: 'MENÚ',
        dockLabel: 'Dock lateral estilo Ubuntu',
        homeAria: 'Daniel Mateo Montoya - Inicio',
        menuToggleAria: 'Alternar menú de navegación',
        themeToggleAria: 'Alternar tema de color',
        themeLight: 'Modo Oscuro',
        themeDark: 'Modo Claro',
        langToggleAria: 'Cambiar idioma a Inglés (Switch to English)',
        langTooltip: 'Idioma: Español (Cambiar a EN)',
        langLabel: 'Idioma (Language)'
      },
      hero: {
        eyebrow: 'Ingeniero de Sistemas • Bogotá, Colombia',
        rolePrefix: 'Desarrollador',
        roleAccent: 'Desarrollador',
        roleSuffix: 'Full-Stack & Cloud',
        leadHtml: 'Diseño y construyo arquitecturas limpias, microservicios empresariales de alto rendimiento con <strong class="text-primary">Java 21 (Spring Boot)</strong> y aplicaciones web modernas con <strong class="text-primary">Angular</strong>. Automatizo infraestructura reproducible en la nube con <strong class="text-primary">AWS y Terraform</strong>, garantizando escalabilidad, consistencia y rigor de producción.',
        stackLabel: 'Core Stack:',
        downloadCv: 'Descargar Hoja de Vida',
        downloadCvAria: 'Descargar Hoja de Vida en PDF',
        githubAria: 'Perfil de GitHub de Daniel Mateo Montoya',
        linkedinAria: 'Perfil de LinkedIn de Daniel Mateo Montoya',
        photoAlt: 'Daniel Mateo Montoya - Ingeniero Full-Stack & Cloud Specialist',
        flipPromptFront: 'Click para girar',
        cardAriaFront: 'Girar tarjeta para leer frase de Séneca',
        cardAriaBack: 'Volver a ver la foto de perfil',
        quotePill: 'Filosofía estoica',
        quoteText: '«No nos atrevemos a muchas cosas porque son difíciles, pero son difíciles porque no nos atrevemos.»',
        quoteAuthor: 'Séneca',
        flipPromptBack: 'Volver a la foto',
        scrollLabel: 'SCROLL',
        scrollAria: 'Desplazarse a experiencia'
      },
      experience: {
        title: 'Experiencia',
        subtitle: 'Trayectoria técnica construyendo plataformas bancarias, modernización de software y arquitecturas en la nube.',
        items: [
          {
            period: '2026 — Julio 2026',
            role: 'Developer Intern',
            company: 'Banco de Bogotá',
            location: 'Bogotá, Colombia',
            scope: 'Core Banking · Legacy Modernization',
            badge: 'Banca & FinTech',
            description: 'Mantenimiento evolutivo y modernización de plataformas críticas de back-office, asegurando continuidad operativa bajo altos estándares de seguridad bancaria e integrando pipelines automatizados en la nube.',
            highlights: [
              'Ejecución del mantenimiento evolutivo y estrategia de migración de aplicaciones legacy de Back-Office desarrolladas en Java 11, jQuery y servicios SOAP, garantizando continuidad operativa en Oracle WebLogic.',
              'Modernización de vistas críticas de plataformas heredadas mediante la adopción de Angular, garantizando compatibilidad multiplataforma y reduciendo tiempos de respuesta de cara al operador.',
              'Liderazgo en la entrega de soluciones digitales en iniciativas de innovación bancaria, construyendo productos full-cycle y optimizando tiempos de entrega a producción con CI/CD (GitHub Actions) en la nube.'
            ],
            technologies: ['Java 11', 'Spring Boot', 'Angular', 'Oracle WebLogic', 'SOAP / REST', 'GitHub Actions', 'AWS']
          },
          {
            period: '2025 — Enero 2026',
            role: 'Desarrollador Full Stack',
            company: 'Instituto Psicopedagógico Juan Pablo II',
            location: 'Soacha, Cundinamarca',
            scope: 'Cloud Architecture & Web Modernization',
            badge: 'EdTech & Cloud',
            description: 'Desarrollo, modernización y despliegue de plataformas web educativas escalables y optimización de infraestructura cloud con enfoque en costos y alta disponibilidad.',
            highlights: [
              'Desarrollo de aplicaciones web escalables con Astro, TypeScript, Java (Spring Boot) y AWS.',
              'Migración de hosting para la aplicación y automatización de despliegues continuos reduciendo tiempos de inactividad.',
              'Colaboración en la migración de la plataforma educativa hacia una nueva arquitectura asegurando la integridad de la información mediante APIs y optimizando costos operativos.'
            ],
            technologies: ['Astro', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'APIs REST', 'CI/CD']
          },
          {
            period: 'Julio 2024 — Diciembre 2024',
            role: 'Monitor Académico & Desarrollador',
            company: 'Universidad Distrital Francisco José de Caldas',
            location: 'Bogotá, Colombia',
            scope: 'Spatial Data & Lab Management Systems',
            badge: 'Investigación & Academia',
            description: 'Desarrollo de software para la gestión de laboratorios académicos y arquitectura de servicios en la nube para procesamiento de datos experimentales.',
            highlights: [
              'Desarrollo y mantenimiento de módulos para el software de gestión de laboratorios con Angular, TypeScript y Java (Spring Boot), optimizando registro, trazabilidad y procesamiento de datos experimentales.',
              'Implementación de arquitectura cloud en AWS y consumo de APIs RESTful para el aplicativo de laboratorio, garantizando alta disponibilidad e integridad de resultados.'
            ],
            technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'APIs REST', 'PostgreSQL']
          }
        ]
      },
      techStack: {
        title: 'Stack Tecnológico',
        subtitle: 'Ecosistema de ingeniería categorizado por rol. Selecciona una categoría y pulsa sobre cualquier tecnología en el carrusel para abrir su ficha técnica, casos de uso e implementación en proyectos reales.',
        rolesTabsAria: 'Filtrar tecnologías por rol',
        carouselAria: 'Carrusel interactivo del stack tecnológico',
        hint: 'Pulsa sobre cualquier tecnología del carrusel para desplegar su ficha técnica, casos de uso y proyectos vinculados.',
        roles: [
          { id: 'all', label: 'Todos' },
          { id: 'backend', label: 'Backend & Core' },
          { id: 'cloud', label: 'Cloud & DevOps' },
          { id: 'frontend', label: 'Frontend & Web' },
          { id: 'data', label: 'Datos & Geoespacial' }
        ],
        modalUsesHeading: 'USOS Y CAPACIDADES EN PRODUCCIÓN',
        modalProjectsHeading: 'IMPLEMENTADO EN LOS PROYECTOS',
        modalViewProject: 'Ver proyecto ↗',
        modalCloseBtn: 'Cerrar ficha',
        modalCloseAria: 'Cerrar ventana de detalles',
        techList: [
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
        ]
      },
      projects: {
        title: 'Proyectos',
        subtitle: 'Casos de estudio de ingeniería con arquitectura desacoplada, métricas comprobadas en producción y código fuente.',
        featuredBadge: 'DESTACADO',
        inspectBtn: 'Arquitectura & Especificación Técnica',
        inspectBtnAria: 'Inspeccionar especificación técnica de',
        githubLink: 'GitHub ↗',
        liveDemoLink: 'Demo ↗',
        modalSummaryHeading: 'RESUMEN DEL SISTEMA //',
        modalGithubBtn: 'Repositorio en GitHub ↗',
        modalLiveDemoBtn: 'Despliegue en Vivo ↗',
        modalCloseAria: 'Cerrar detalles arquitectónicos',
        items: [
          {
            id: 'kata-bbog',
            caseNumber: 'CASE.01',
            title: 'Plataforma de Gestión de Clientes - Banco de Bogotá',
            category: 'Hexagonal Architecture & Multi-Cloud CI/CD',
            desc: 'API REST y SPA para gestión de clientes con arquitectura hexagonal, autenticación JWT, despliegue automatizado con Terraform en AWS EC2/S3 y pipelines de GitHub Actions.',
            problemStatement: 'Desacoplar la lógica bancaria de los adaptadores de infraestructura, garantizando paridad entre ambientes DEV/PROD con infraestructura reproducible como código.',
            tech: ['Java 21', 'Spring Boot 3', 'Spring Security', 'Angular 19', 'PostgreSQL', 'Docker', 'Terraform', 'AWS EC2/S3', 'GitHub Actions'],
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
                    'Persistencia desacoplada con JPA/PostgreSQL mediante adaptadores de salida.',
                    'Seguridad por HTTP Basic Auth y filtros JWT stateless.'
                  ]
                },
                {
                  title: 'FRONTEND, DEVOPS & CI/CD',
                  points: [
                    'Frontend SPA en Angular 19 con diseño responsivo y arquitectura modular.',
                    'Infraestructura como Código (IaC) con Terraform para AWS EC2 y S3.',
                    'Pipelines en GitHub Actions para pruebas y despliegue continuo.'
                  ]
                }
              ]
            }
          },
          {
            id: 'cloud-kata',
            caseNumber: 'CASE.02',
            title: 'Sistema de Gestión de Aprobaciones Cloud',
            category: 'Cloud-Native, AWS ECS & IaC',
            desc: 'Sistema distribuido de aprobaciones jerárquicas con automatización de infraestructura como código (IaC) y despliegue elástico en AWS ECS Fargate.',
            problemStatement: 'Orquestar microservicios contenerizados de alta disponibilidad con balanceo de carga automático y migraciones de base de datos sin tiempo de inactividad.',
            tech: ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'Flyway', 'Terraform', 'AWS ECS Fargate', 'GitHub Actions'],
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
                    'Contenedores Docker optimizados multi-stage para Spring Boot 3.',
                    'Gestión de versiones de base de datos con scripts Flyway integrados al pipeline.'
                  ]
                }
              ]
            }
          },
          {
            id: 'transmiapp',
            caseNumber: 'CASE.03',
            title: 'Transmiapp - Motor de Ruteo Espacial',
            category: 'Spatial Database & Graph Engine',
            desc: 'Motor de cálculo de rutas eficientes sobre la red de transporte público utilizando PostgreSQL y la extensión espacial PostGIS con indexación GiST.',
            problemStatement: 'Procesar coordenadas geográficas masivas en tiempo real y calcular trayectorias de transbordo en milisegundos sin sobrecargar la CPU.',
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
            caseNumber: 'CASE.04',
            title: 'Portal Educativo JPII',
            category: 'Frontend & Edge Delivery (SSG)',
            desc: 'Portal web institucional de alto rendimiento construido con Astro 4 y Tailwind CSS. Optimización extrema de Core Web Vitals y entrega vía CDN global.',
            problemStatement: 'Garantizar tiempos de carga instantáneos en dispositivos móviles de gama baja y asegurar 100% de cumplimiento en accesibilidad y SEO.',
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
                    'Sistema de diseño responsivo y tipografía accesible.',
                    'Auditoría y cumplimiento 100% en Lighthouse (Performance, A11y, SEO).'
                  ]
                }
              ]
            }
          },
          {
            id: 'scrum-final-project',
            caseNumber: 'CASE.05',
            title: 'DriveMaster - Plataforma de Academias de Conducción',
            category: 'Software Engineering & Clean Architecture',
            desc: 'Sistema de gestión de suscripciones para academias de conducción con alta cobertura de pruebas automatizadas y ciclo iterativo ágil Scrum.',
            problemStatement: 'Modelar un dominio complejo con múltiples reglas de negocio y dependencias desacopladas, validando el sistema mediante integración continua estricta.',
            tech: ['Java', 'Clean Architecture', 'GitHub Actions CI', 'JUnit', 'Scrum SDLC'],
            github: 'https://github.com/cristianar1008/software-engineering-seminar-final-project',
            metrics: [
              { label: 'Cobertura Pruebas', value: '94.2% Passed' },
              { label: 'Pipeline CI', value: 'Green (14 runs)' },
              { label: 'Velocidad Scrum', value: '38 pts/Sprint' }
            ],
            details: {
              summary: 'Aplicación robusta desarrollada en equipo, simulando un ciclo de vida real mediante metodologías ágiles.',
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
                    'Aplicación estricta de principios SOLID y arquitectura limpia.'
                  ]
                }
              ]
            }
          }
        ]
      },
      education: {
        title: 'Formación & Certificaciones',
        subtitle: 'Acreditación universitaria en ingeniería de sistemas y credenciales técnicas oficiales de especialización.',
        universityColTitle: 'Grado Universitario',
        certsColTitle: 'Certificaciones Oficiales',
        badgesColTitle: 'Credenciales & Badges',
        verifyBtn: 'Verificar',
        verifyAria: 'Verificar credencial oficial:',
        educationList: [
          {
            institution: 'Universidad Distrital Francisco José de Caldas',
            degree: 'Ingeniería de Sistemas',
            period: '2020 — 2026',
            location: 'Bogotá, Colombia',
            description: 'Enfoque en arquitectura de software, bases de datos espaciales, sistemas distribuidos e integración cloud.'
          }
        ],
        certificationsList: [
          {
            name: 'Flask - Construye aplicaciones web profesionales con Python',
            issuer: 'Udemy',
            date: '2025',
            credentialId: 'UC-bf083e40-3d37-4e19-91a6-7c53d493a364',
            verificationUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf083e40-3d37-4e19-91a6-7c53d493a364.pdf'
          },
          {
            name: 'Universidad JavaScript - De Cero a Experto JavaScript!',
            issuer: 'Udemy',
            date: '2025',
            credentialId: 'UC-f5003ac4-8865-4fb6-aa13-1b7d5fa25c23',
            verificationUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-f5003ac4-8865-4fb6-aa13-1b7d5fa25c23.pdf'
          }
        ],
        badgesList: [
          {
            name: 'AWS SimuLearn — Cloud Practitioner',
            issuer: 'Amazon Web Services',
            date: '2026',
            description: 'Conocimiento fundamental de AWS Cloud: cómputo, redes, base de datos y servicios de seguridad. Experiencia práctica construyendo soluciones con servicios AWS esenciales.',
            platform: 'credly',
            badgeImageUrl: 'images/AWS.png',
            verificationUrl: 'https://www.credly.com/badges/01509a65-d723-455e-b397-07ae50215a85'
          }
        ]
      },
      footer: {
        tagline: 'Ingeniero de Sistemas • Full-Stack & Cloud Specialist • Bogotá, Colombia',
        backToTopTitle: 'Volver al inicio',
        backToTopAria: 'Volver al inicio de la página',
        githubAria: 'Perfil de GitHub de Daniel Mateo Montoya',
        linkedinAria: 'Perfil de LinkedIn de Daniel Mateo Montoya',
        copyright: '© 2026 Daniel Mateo Montoya • Java 21 • Angular • AWS • Terraform'
      }
    },
    en: {
      nav: {
        home: 'Home',
        experience: 'Experience',
        stack: 'Stack',
        projects: 'Projects',
        education: 'Education',
        menu: 'MENU',
        dockLabel: 'Ubuntu-style lateral dock',
        homeAria: 'Daniel Mateo Montoya - Home',
        menuToggleAria: 'Toggle navigation menu',
        themeToggleAria: 'Toggle color theme',
        themeLight: 'Dark Mode',
        themeDark: 'Light Mode',
        langToggleAria: 'Switch language to Spanish (Cambiar a Español)',
        langTooltip: 'Language: English (Switch to ES)',
        langLabel: 'Language'
      },
      hero: {
        eyebrow: 'Systems Engineer • Bogotá, Colombia',
        rolePrefix: 'Developer',
        roleAccent: 'Developer',
        roleSuffix: 'Full-Stack & Cloud',
        leadHtml: 'I design and build clean architectures, high-performance enterprise microservices with <strong class="text-primary">Java 21 (Spring Boot)</strong>, and modern web applications with <strong class="text-primary">Angular</strong>. I automate reproducible cloud infrastructure using <strong class="text-primary">AWS and Terraform</strong>, ensuring scalability, consistency, and production rigor.',
        stackLabel: 'Core Stack:',
        downloadCv: 'Download Resume',
        downloadCvAria: 'Download Resume in PDF',
        githubAria: 'GitHub profile of Daniel Mateo Montoya',
        linkedinAria: 'LinkedIn profile of Daniel Mateo Montoya',
        photoAlt: 'Daniel Mateo Montoya - Full-Stack Engineer & Cloud Specialist',
        flipPromptFront: 'Click to flip',
        cardAriaFront: 'Flip card to read Seneca quote',
        cardAriaBack: 'Flip back to profile picture',
        quotePill: 'Stoic Philosophy',
        quoteText: '“It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”',
        quoteAuthor: 'Seneca',
        flipPromptBack: 'Back to photo',
        scrollLabel: 'SCROLL',
        scrollAria: 'Scroll down to experience'
      },
      experience: {
        title: 'Experience',
        subtitle: 'Technical track record building banking platforms, modernizing enterprise software, and deploying cloud architectures.',
        items: [
          {
            period: '2026 — July 2026',
            role: 'Developer Intern',
            company: 'Banco de Bogotá',
            location: 'Bogotá, Colombia',
            scope: 'Core Banking · Legacy Modernization',
            badge: 'Banking & FinTech',
            description: 'Evolutionary maintenance and modernization of mission-critical back-office platforms, ensuring operational continuity under rigorous banking security standards and integrating automated cloud pipelines.',
            highlights: [
              'Executed evolutionary maintenance and migration strategies for legacy Back-Office applications developed in Java 11, jQuery, and SOAP services, ensuring operational continuity on Oracle WebLogic.',
              'Modernized critical views of legacy platforms by introducing Angular, ensuring cross-platform compatibility and cutting operator response latency.',
              'Led digital solution delivery across banking innovation initiatives, delivering full-cycle products and accelerating time-to-production with cloud CI/CD (GitHub Actions).'
            ],
            technologies: ['Java 11', 'Spring Boot', 'Angular', 'Oracle WebLogic', 'SOAP / REST', 'GitHub Actions', 'AWS']
          },
          {
            period: '2025 — January 2026',
            role: 'Full Stack Developer',
            company: 'Juan Pablo II Psychopedagogical Institute',
            location: 'Soacha, Cundinamarca',
            scope: 'Cloud Architecture & Web Modernization',
            badge: 'EdTech & Cloud',
            description: 'Development, modernization, and deployment of scalable educational web platforms and cloud infrastructure optimization focused on cost efficiency and high availability.',
            highlights: [
              'Engineered scalable web applications utilizing Astro, TypeScript, Java (Spring Boot), and AWS.',
              'Migrated application hosting and automated continuous deployments, significantly cutting downtime.',
              'Collaborated in migrating the educational platform toward a modern architecture, securing data integrity via APIs and reducing operational overhead.'
            ],
            technologies: ['Astro', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'REST APIs', 'CI/CD']
          },
          {
            period: 'July 2024 — December 2024',
            role: 'Academic Monitor & Developer',
            company: 'Francisco José de Caldas District University',
            location: 'Bogotá, Colombia',
            scope: 'Spatial Data & Lab Management Systems',
            badge: 'Research & Academia',
            description: 'Software engineering for academic laboratory management and cloud service architecture for experimental data processing.',
            highlights: [
              'Developed and maintained laboratory management modules using Angular, TypeScript, and Java (Spring Boot), streamlining experimental logging, auditability, and data processing.',
              'Implemented cloud architecture on AWS and RESTful API consumption for the lab suite, ensuring high availability and scientific result integrity.'
            ],
            technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'AWS', 'REST APIs', 'PostgreSQL']
          }
        ]
      },
      techStack: {
        title: 'Tech Stack',
        subtitle: 'Engineering ecosystem categorized by role. Select a category and click on any technology in the carousel to inspect its technical spec, production capabilities, and implementation in real-world projects.',
        rolesTabsAria: 'Filter technologies by role',
        carouselAria: 'Interactive technology stack carousel',
        hint: 'Click on any technology in the carousel to open its technical spec sheet, production capabilities, and linked projects.',
        roles: [
          { id: 'all', label: 'All' },
          { id: 'backend', label: 'Backend & Core' },
          { id: 'cloud', label: 'Cloud & DevOps' },
          { id: 'frontend', label: 'Frontend & Web' },
          { id: 'data', label: 'Data & Geospatial' }
        ],
        modalUsesHeading: 'PRODUCTION USES & CAPABILITIES',
        modalProjectsHeading: 'IMPLEMENTED IN PROJECTS',
        modalViewProject: 'View project ↗',
        modalCloseBtn: 'Close spec',
        modalCloseAria: 'Close details window',
        techList: [
          {
            id: 'java-21',
            name: 'Java 21',
            role: 'Modern enterprise runtime with strict typing, Virtual Threads, and high throughput.',
            category: 'backend',
            categoryLabel: 'Backend & Core',
            tag: 'RUNTIME',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            uses: [
              'Hexagonal Architecture (Ports & Adapters) isolating domain logic from external frameworks.',
              'Scalable concurrency via Virtual Threads (Project Loom) for I/O-intensive services.',
              'Rigorous unit and integration test coverage utilizing JUnit 5 and Mockito.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Hexagonal microservice design with 59 automated test suites.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'Centralized business validation and banking approval engine in Java 21.'
              }
            ]
          },
          {
            id: 'spring-boot-3',
            name: 'Spring Boot 3',
            role: 'Microservice ecosystem, dependency injection, and transactional REST APIs.',
            category: 'backend',
            categoryLabel: 'Backend & Core',
            tag: 'FRAMEWORK',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
            uses: [
              'RESTful endpoint exposure with strict Jakarta validation and robust DTOs.',
              'Decoupled data persistence layer utilizing Spring Data JPA and Hibernate.',
              'Externalized profile configurations ensuring strict parity between DEV and PROD.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'REST controllers, global error handling, and transactional JPA persistence.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'Containerized microservice with dynamic environment profiles.'
              }
            ]
          },
          {
            id: 'spring-security',
            name: 'Spring Security & JWT',
            role: 'Stateless authentication, security filters, and role-based access control (RBAC).',
            category: 'backend',
            categoryLabel: 'Backend & Core',
            tag: 'SECURITY',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
            uses: [
              'Custom security filters to intercept, parse, and validate Bearer JWT tokens.',
              'Fine-grained role-based access control (RBAC) across endpoints and services.',
              'Strict CORS policies, CSRF mitigation, and credential encryption with BCrypt.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Stateless JWT security filter safeguarding customer management endpoints.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'Approval hierarchy validation and elevated banking permission checks.'
              }
            ]
          },
          {
            id: 'nodejs',
            name: 'Node.js & Express',
            role: 'Lightweight REST services and asynchronous event-driven microservices.',
            category: 'backend',
            categoryLabel: 'Backend & Core',
            tag: 'ENGINE',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            uses: [
              'High-throughput asynchronous I/O microservices powered by non-blocking event-loop.',
              'Validation middlewares, response compression, and lightweight proxy layers.'
            ],
            projects: [
              {
                id: 'transmiapp',
                name: 'Transmiapp Routing Engine',
                implementation: 'High-speed asynchronous API directly interfaced with the PostGIS spatial engine.'
              }
            ]
          },
          {
            id: 'aws',
            name: 'AWS Cloud',
            role: 'Elastic compute, resilient load balancing, and durable cloud storage.',
            category: 'cloud',
            categoryLabel: 'Cloud & DevOps',
            tag: 'CLOUD PLATFORM',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
            uses: [
              'Containerized microservice deployment via AWS ECS Fargate and EC2.',
              'Durable object storage on Amazon S3 buckets for build artifacts and static assets.',
              'Virtual Private Cloud (VPC) topology design with public/private subnets and ALB.'
            ],
            projects: [
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'ECS Fargate cluster configured with Application Load Balancer and RDS.'
              },
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'AWS EC2 hosting, S3 bucket for SPA assets, and cloud delivery pipeline.'
              }
            ]
          },
          {
            id: 'terraform',
            name: 'Terraform',
            role: 'Declarative Infrastructure as Code (IaC) with secure remote state locking.',
            category: 'cloud',
            categoryLabel: 'Cloud & DevOps',
            tag: 'IaC ENGINE',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
            uses: [
              'Fully automated end-to-end cloud infrastructure provisioning on AWS.',
              'Encrypted remote state management in S3 with DynamoDB distributed locking.',
              'Strict, deterministic configuration parity between DEV and PROD environments.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Modular Terraform scripts for automated EC2 and S3 provisioning.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: '12 cloud resources provisioned declaratively with zero manual steps.'
              }
            ]
          },
          {
            id: 'docker',
            name: 'Docker',
            role: 'Multi-stage containerization for microservices and environmental parity.',
            category: 'cloud',
            categoryLabel: 'Cloud & DevOps',
            tag: 'CONTAINERS',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            uses: [
              'Multi-stage builds shrinking production container image footprint by over 65%.',
              'Guaranteed parity between local development setups and cloud environments.',
              'Local multi-service orchestration with Docker Compose for accelerated workflows.'
            ],
            projects: [
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'Distroless optimized images running as managed Fargate container tasks.'
              },
              {
                id: 'transmiapp',
                name: 'Transmiapp Routing Engine',
                implementation: 'Local containerized development environment with PostgreSQL + PostGIS.'
              }
            ]
          },
          {
            id: 'github-actions',
            name: 'GitHub Actions',
            role: 'Automated test execution suites, static code analysis, and CI/CD pipelines.',
            category: 'cloud',
            categoryLabel: 'Cloud & DevOps',
            tag: 'CI/CD',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
            uses: [
              'Automated test suite execution and verification on every Pull Request.',
              'Static security analysis, linting, and Docker container artifact builds.',
              'Continuous zero-downtime deployment to cloud infrastructure upon test validation.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Automated CI/CD workflow validating 59 tests and deploying cloud infrastructure.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'CI/CD deployment pipeline refreshing services in AWS ECS Fargate.'
              }
            ]
          },
          {
            id: 'angular-19',
            name: 'Angular 19',
            role: 'Frontend SPA framework for high-performance reactive enterprise applications.',
            category: 'frontend',
            categoryLabel: 'Frontend & Web',
            tag: 'FRONTEND',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
            uses: [
              'Fine-grained reactive state management with Signals (signal, computed, effect).',
              'Optimal change detection and DOM rendering with ChangeDetectionStrategy.OnPush.',
              'Clean modular architecture using Standalone Components and lazy-loaded routes.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Modular banking client management SPA interfaced with REST backend.'
              },
              {
                id: 'portfolio',
                name: 'Personal Portfolio',
                implementation: 'OnPush architecture, signals for state, and WCAG AA accessibility.'
              }
            ]
          },
          {
            id: 'typescript',
            name: 'TypeScript',
            role: 'End-to-end synchronized data contracts and compile-time type safety.',
            category: 'frontend',
            categoryLabel: 'Frontend & Web',
            tag: 'LANGUAGE',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
            uses: [
              'Strict interfaces and shared type definitions aligned with backend contracts.',
              'Static defect detection at compile time, eliminating runtime regressions.',
              'Strict null checks (strictNullChecks) delivering total system reliability.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Strict DTO modeling and typed API response schemas.'
              },
              {
                id: 'transmiapp',
                name: 'Transmiapp Routing Engine',
                implementation: 'Rigorous spatial geometry typing and graph path result contracts.'
              }
            ]
          },
          {
            id: 'astro-4',
            name: 'Astro 4',
            role: 'Static site generation (SSG), island architecture, and peak web metrics.',
            category: 'frontend',
            categoryLabel: 'Frontend & Web',
            tag: 'SSG ENGINE',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg',
            uses: [
              'Production static sites delivered with zero unnecessary client-side JavaScript.',
              'Sub-second first paint times and 100/100 Lighthouse performance metrics.',
              'Islands architecture for isolated, progressive component hydration.'
            ],
            projects: [
              {
                id: 'pagina-jpii',
                name: 'JPII Educational Portal',
                implementation: 'Institutional web platform with 0.4s FCP and 100/100 Core Web Vitals.'
              }
            ]
          },
          {
            id: 'scss',
            name: 'SCSS & Design Systems',
            role: 'Centralized design tokens, WCAG AA accessibility, and modular styling.',
            category: 'frontend',
            categoryLabel: 'Frontend & Web',
            tag: 'STYLING',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
            uses: [
              'Custom CSS properties enabling native dark/light theme switching.',
              'Audited accessible contrast ratios and fluid responsive typography.',
              'Clean, maintainable SCSS structure without bulky CSS framework dependencies.'
            ],
            projects: [
              {
                id: 'portfolio',
                name: 'Personal Portfolio',
                implementation: 'Terracotta Basalt design system, light/dark themes, and typographic scale.'
              },
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Polished views and responsive layouts conforming to banking guidelines.'
              }
            ]
          },
          {
            id: 'postgresql',
            name: 'PostgreSQL',
            role: 'ACID relational persistence, query plan optimization, and data integrity.',
            category: 'data',
            categoryLabel: 'Data & Geospatial',
            tag: 'DATABASE',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            uses: [
              'Normalized relational data modeling with strict foreign key constraints.',
              'Query execution plan tuning using EXPLAIN ANALYZE for complex joins.',
              'Optimized connection pooling via HikariCP ensuring high throughput.'
            ],
            projects: [
              {
                id: 'kata-bbog',
                name: 'Banco de Bogotá Platform',
                implementation: 'Customer entity persistence with strict ACID transaction guarantees.'
              },
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: 'Transactional storage of approval workflows and audit trails.'
              }
            ]
          },
          {
            id: 'postgis',
            name: 'PostGIS',
            role: 'Geospatial graph computation, spatial proximity queries, and GiST indexing.',
            category: 'data',
            categoryLabel: 'Data & Geospatial',
            tag: 'SPATIAL DB',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            uses: [
              'Storage and manipulation of spatial geometries (points, polygons, transit routes).',
              'High-speed proximity and containment queries accelerated with GiST indexes.',
              'Advanced spatial operations using ST_Distance, ST_Contains, and SRID transforms.'
            ],
            projects: [
              {
                id: 'transmiapp',
                name: 'Transmiapp Routing Engine',
                implementation: 'Distance computation and route optimization in <6ms utilizing GiST indexes.'
              }
            ]
          },
          {
            id: 'flyway',
            name: 'Flyway',
            role: 'Declarative database schema migrations integrated into CI/CD pipelines.',
            category: 'data',
            categoryLabel: 'Data & Geospatial',
            tag: 'MIGRATIONS',
            logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            uses: [
              'Declarative versioning of SQL schema evolution directly in source control.',
              'Automated migration execution on microservice startup with zero downtime.',
              'Comprehensive auditability and historical traceability of schema modifications.'
            ],
            projects: [
              {
                id: 'cloud-kata',
                name: 'Cloud Approvals System',
                implementation: '100% automated database migration synchronization in Fargate deployments.'
              }
            ]
          }
        ]
      },
      projects: {
        title: 'Projects',
        subtitle: 'Engineering case studies featuring decoupled architecture, production-verified metrics, and full source code.',
        featuredBadge: 'FEATURED',
        inspectBtn: 'Architecture & Technical Spec',
        inspectBtnAria: 'Inspect technical specification for',
        githubLink: 'GitHub ↗',
        liveDemoLink: 'Demo ↗',
        modalSummaryHeading: 'SYSTEM OVERVIEW //',
        modalGithubBtn: 'GitHub Repository ↗',
        modalLiveDemoBtn: 'Live Deployment ↗',
        modalCloseAria: 'Close architectural details',
        items: [
          {
            id: 'kata-bbog',
            caseNumber: 'CASE.01',
            title: 'Customer Management Platform - Banco de Bogotá',
            category: 'Hexagonal Architecture & Multi-Cloud CI/CD',
            desc: 'REST API and SPA for customer management with hexagonal architecture, JWT authentication, automated Terraform provisioning on AWS EC2/S3, and GitHub Actions CI/CD.',
            problemStatement: 'Decouple core banking business logic from infrastructure adapters, ensuring deterministic parity between DEV and PROD with reproducible infrastructure as code.',
            tech: ['Java 21', 'Spring Boot 3', 'Spring Security', 'Angular 19', 'PostgreSQL', 'Docker', 'Terraform', 'AWS EC2/S3', 'GitHub Actions'],
            github: 'https://github.com/FiloFromZero/kata_bbog',
            featured: true,
            metrics: [
              { label: 'Comprehensive Tests', value: '59 Tests Green' },
              { label: 'Active Environments', value: 'DEV & PROD' },
              { label: 'IaC Provisioning', value: 'Automated Terraform' }
            ],
            details: {
              summary: 'Customer onboarding and management in the cloud featuring hexagonal architecture, comprehensive test suites, and segregated DEV/PROD environments.',
              sections: [
                {
                  title: 'ARCHITECTURE & BACKEND',
                  points: [
                    'Hexagonal Architecture (Clean Architecture) in Java 21 + Spring Boot 3.x.',
                    'Decoupled persistence with JPA/PostgreSQL through outbound adapters.',
                    'Security via HTTP Basic Auth and stateless JWT filters.'
                  ]
                },
                {
                  title: 'FRONTEND, DEVOPS & CI/CD',
                  points: [
                    'Modular Angular 19 SPA frontend with accessible, responsive layout.',
                    'Infrastructure as Code (IaC) with Terraform for AWS EC2 and S3.',
                    'Continuous integration and automated deployment pipelines in GitHub Actions.'
                  ]
                }
              ]
            }
          },
          {
            id: 'cloud-kata',
            caseNumber: 'CASE.02',
            title: 'Cloud Approvals Management System',
            category: 'Cloud-Native, AWS ECS & IaC',
            desc: 'Distributed hierarchical approvals system with automated Infrastructure as Code (IaC) and elastic container deployment on AWS ECS Fargate.',
            problemStatement: 'Orchestrate highly available containerized microservices with automated load balancing and zero-downtime database schema migrations.',
            tech: ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'Flyway', 'Terraform', 'AWS ECS Fargate', 'GitHub Actions'],
            github: 'https://github.com/FiloFromZero/Kata_DesarrolladorCloud',
            featured: true,
            metrics: [
              { label: 'ECS Tasks', value: '3 Active Tasks' },
              { label: 'IaC Resources', value: '12 Managed' },
              { label: 'DB Migrations', value: '100% Flyway Sync' }
            ],
            details: {
              summary: 'Cloud-Native enterprise application architected for high availability, deployed over AWS ECS Fargate serverless containers.',
              sections: [
                {
                  title: 'INFRASTRUCTURE AS CODE (IaC)',
                  points: [
                    'Automated provisioning of AWS ECS, ECR, RDS, and Application Load Balancers via Terraform.',
                    'Encrypted remote Terraform state managed in Amazon S3 buckets.'
                  ]
                },
                {
                  title: 'BACKEND & DATABASE',
                  points: [
                    'Multi-stage optimized Docker containers for Spring Boot 3.',
                    'Database versioning and schema migrations managed with Flyway integrated into CI/CD.'
                  ]
                }
              ]
            }
          },
          {
            id: 'transmiapp',
            caseNumber: 'CASE.03',
            title: 'Transmiapp - Spatial Routing Engine',
            category: 'Spatial Database & Graph Engine',
            desc: 'High-performance route calculation engine across public transit networks utilizing PostgreSQL and PostGIS with GiST spatial indexing.',
            problemStatement: 'Process massive real-time transit coordinates and calculate transfer trajectories in single-digit milliseconds without CPU spikes.',
            tech: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'Docker Compose', 'GIS Spatial Indexing'],
            github: 'https://github.com/FiloFromZero/Transmiapp',
            metrics: [
              { label: 'Routing Latency', value: '< 6ms' },
              { label: 'Indexing', value: 'GiST Spatial' },
              { label: 'API Throughput', value: '1.2k req/sec' }
            ],
            details: {
              summary: 'Node.js API designed for spatial graph computation and optimal route finding across urban transit systems.',
              sections: [
                {
                  title: 'SPATIAL DATABASES',
                  points: [
                    'PostGIS integration for proximity queries (ST_DWithin) and spatial joins.',
                    'GiST spatial indexes drastically reducing query latency per geographic quadrant.'
                  ]
                },
                {
                  title: 'API ARCHITECTURE',
                  points: [
                    'High-performance Express middlewares with asynchronous non-blocking event-loop handling.',
                    'Containerized local setup via Docker Compose, pre-configured for cloud rollout.'
                  ]
                }
              ]
            }
          },
          {
            id: 'pagina-jpii',
            caseNumber: 'CASE.04',
            title: 'JPII Educational Portal',
            category: 'Frontend & Edge Delivery (SSG)',
            desc: 'High-performance institutional web portal built with Astro 4 and Tailwind CSS. Extreme Core Web Vitals optimization and global CDN delivery.',
            problemStatement: 'Guarantee instantaneous load times on low-tier mobile devices while ensuring 100% compliance across accessibility and SEO.',
            tech: ['Astro 4.0', 'Tailwind CSS', 'TypeScript', 'Netlify CDN', 'Netlify Actions'],
            liveDemo: 'https://iejuanpabloiisoacha.edu.co/',
            metrics: [
              { label: 'Lighthouse Score', value: '100 / 100' },
              { label: 'FCP Speed', value: '0.4s' },
              { label: 'Bundle Size', value: '42 KB' }
            ],
            details: {
              summary: 'Production-grade static site (SSG) with flawless core web vitals, built with modern Astro architecture.',
              sections: [
                {
                  title: 'PERFORMANCE & WEB STRATEGY',
                  points: [
                    'Partial hydration with Astro Island Architecture eliminating unused JavaScript.',
                    'Modern optimized image assets (WebP/AVIF) pre-compiled at build time.',
                    'Automated deployment to global edge CDN via Netlify CI/CD.'
                  ]
                },
                {
                  title: 'UI / UX DESIGN',
                  points: [
                    'Fluid responsive design system with accessible typography.',
                    '100% audited score on Google Lighthouse (Performance, A11y, SEO).'
                  ]
                }
              ]
            }
          },
          {
            id: 'scrum-final-project',
            caseNumber: 'CASE.05',
            title: 'DriveMaster - Driving Academy Platform',
            category: 'Software Engineering & Clean Architecture',
            desc: 'Subscription and student management system for driving schools with high test coverage and iterative Scrum lifecycle execution.',
            problemStatement: 'Model a complex business domain with decoupled dependencies and enforce continuous quality through automated integration pipelines.',
            tech: ['Java', 'Clean Architecture', 'GitHub Actions CI', 'JUnit', 'Scrum SDLC'],
            github: 'https://github.com/cristianar1008/software-engineering-seminar-final-project',
            metrics: [
              { label: 'Test Coverage', value: '94.2% Passed' },
              { label: 'CI Pipeline', value: 'Green (14 runs)' },
              { label: 'Scrum Velocity', value: '38 pts/Sprint' }
            ],
            details: {
              summary: 'Robust team-engineered application simulating real-world enterprise software delivery using Agile methodologies.',
              sections: [
                {
                  title: 'ENGINEERING PROCESS',
                  points: [
                    'Iterative Scrum development with 2-week sprints and velocity tracking.',
                    'Rigorous peer pull request reviews and automated continuous integration.'
                  ]
                },
                {
                  title: 'SOFTWARE QUALITY',
                  points: [
                    'High unit and integration test coverage with JUnit and Mockito.',
                    'Strict adherence to SOLID principles and Clean Architecture guidelines.'
                  ]
                }
              ]
            }
          }
        ]
      },
      education: {
        title: 'Education & Certifications',
        subtitle: 'University degree in Systems Engineering and official specialized technical credentials.',
        universityColTitle: 'University Degree',
        certsColTitle: 'Official Certifications',
        badgesColTitle: 'Credentials & Badges',
        verifyBtn: 'Verify',
        verifyAria: 'Verify official credential:',
        educationList: [
          {
            institution: 'Francisco José de Caldas District University',
            degree: 'B.S. in Systems Engineering',
            period: '2020 — 2026',
            location: 'Bogotá, Colombia',
            description: 'Focus on software architecture, spatial databases, distributed systems, and cloud integration.'
          }
        ],
        certificationsList: [
          {
            name: 'Flask - Build professional web applications with Python',
            issuer: 'Udemy',
            date: '2025',
            credentialId: 'UC-bf083e40-3d37-4e19-91a6-7c53d493a364',
            verificationUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf083e40-3d37-4e19-91a6-7c53d493a364.pdf'
          },
          {
            name: 'JavaScript University - From Zero to Expert JavaScript!',
            issuer: 'Udemy',
            date: '2025',
            credentialId: 'UC-f5003ac4-8865-4fb6-aa13-1b7d5fa25c23',
            verificationUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-f5003ac4-8865-4fb6-aa13-1b7d5fa25c23.pdf'
          }
        ],
        badgesList: [
          {
            name: 'AWS SimuLearn — Cloud Practitioner',
            issuer: 'Amazon Web Services',
            date: '2026',
            description: 'Foundational AWS Cloud knowledge: compute, networking, database and security services. Hands-on experience building solutions with core AWS services.',
            platform: 'credly',
            badgeImageUrl: 'images/AWS.png',
            verificationUrl: 'https://www.credly.com/badges/01509a65-d723-455e-b397-07ae50215a85'
          }
        ]
      },
      footer: {
        tagline: 'Systems Engineer • Full-Stack & Cloud Specialist • Bogotá, Colombia',
        backToTopTitle: 'Back to top',
        backToTopAria: 'Back to top of page',
        githubAria: 'GitHub profile of Daniel Mateo Montoya',
        linkedinAria: 'LinkedIn profile of Daniel Mateo Montoya',
        copyright: '© 2026 Daniel Mateo Montoya • Java 21 • Angular • AWS • Terraform'
      }
    }
  };

  readonly t = computed(() => this.translations[this.currentLang()]);

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (saved === 'es' || saved === 'en') {
      this.currentLang.set(saved);
      document.documentElement.lang = saved;
      return;
    }
    // Español como idioma predeterminado
    this.currentLang.set('es');
    document.documentElement.lang = 'es';
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const next: Language = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }
}
