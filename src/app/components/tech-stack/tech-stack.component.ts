import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

export type TechCategory = 'Todos' | 'Backend' | 'Frontend' | 'Bases de Datos' | 'Cloud & DevOps';

export interface TechItem {
  name: string;
  category: TechCategory;
  logoUrl: string;
  glowColor: string; // Used for hover glow effects
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ ScrollRevealDirective, MouseFollowDirective],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss']
})
export class TechStackComponent {
  
  categories: TechCategory[] = ['Todos', 'Frontend', 'Backend', 'Bases de Datos', 'Cloud & DevOps'];
  activeCategory = signal<TechCategory>('Todos');

  techs: TechItem[] = [
    // --- FRONTEND ---
    { name: 'Angular', category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', glowColor: 'rgba(221, 0, 49, 0.15)' },
    { name: 'TypeScript', category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', glowColor: 'rgba(49, 120, 198, 0.15)' },
    { name: 'Tailwind CSS', category: 'Frontend', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', glowColor: 'rgba(56, 189, 248, 0.15)' },
    { name: 'Astro', category: 'Frontend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg', glowColor: 'rgba(255, 90, 31, 0.15)' },
    
    // --- BACKEND ---
    { name: 'Java', category: 'Backend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', glowColor: 'rgba(224, 111, 36, 0.15)' },
    { name: 'Spring Boot', category: 'Backend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', glowColor: 'rgba(109, 179, 63, 0.15)' },
    { name: 'Node.js', category: 'Backend', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', glowColor: 'rgba(51, 153, 51, 0.15)' },
    
    // --- BASES DE DATOS ---
    { name: 'PostgreSQL', category: 'Bases de Datos', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', glowColor: 'rgba(51, 103, 145, 0.15)' },
    
    // --- CLOUD & DEVOPS ---
    { name: 'AWS', category: 'Cloud & DevOps', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', glowColor: 'rgba(255, 153, 0, 0.15)' },
    { name: 'Terraform', category: 'Cloud & DevOps', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', glowColor: 'rgba(132, 79, 236, 0.15)' },
    { name: 'Docker', category: 'Cloud & DevOps', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', glowColor: 'rgba(36, 150, 237, 0.15)' },
    { name: 'GitHub Actions', category: 'Cloud & DevOps', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', glowColor: 'rgba(32, 136, 255, 0.15)' }
  ];

  filteredTechs = computed(() => {
    const active = this.activeCategory();
    if (active === 'Todos') return this.techs;
    return this.techs.filter(t => t.category === active);
  });

  setCategory(cat: TechCategory) {
    this.activeCategory.set(cat);
  }
}
