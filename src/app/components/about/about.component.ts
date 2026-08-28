import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  category: string;
  level: string;
  percentage: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  activeTab = signal<'backend' | 'frontend' | 'persistence' | 'cloud'>('backend');

  skills: Skill[] = [
    // Backend
    { name: 'Java 21 / Spring Boot', category: 'Backend', level: 'Avanzado', percentage: 95 },
    { name: 'Node.js / Express', category: 'Backend', level: 'Avanzado', percentage: 90 },
    { name: 'REST APIs & Security JWT', category: 'Backend', level: 'Avanzado', percentage: 95 },
    // Persistencia
    { name: 'PostgreSQL & SQL', category: 'Persistence', level: 'Avanzado', percentage: 90 },
    { name: 'PostGIS (Bases Espaciales)', category: 'Persistence', level: 'Avanzado', percentage: 88 },
    { name: 'Flyway DB Migrations', category: 'Persistence', level: 'Avanzado', percentage: 85 },
    // Cloud & DevOps
    { name: 'Terraform (IaC)', category: 'Cloud', level: 'Avanzado', percentage: 88 },
    { name: 'Docker & Compose', category: 'Cloud', level: 'Avanzado', percentage: 90 },
    { name: 'AWS (ECS Fargate, RDS)', category: 'Cloud', level: 'Intermedio', percentage: 80 },
    // Frontend
    { name: 'Angular (TypeScript)', category: 'Frontend', level: 'Intermedio', percentage: 85 },
    { name: 'Astro (SSG / Static)', category: 'Frontend', level: 'Avanzado', percentage: 90 },
    { name: 'Vanilla CSS / SCSS', category: 'Frontend', level: 'Avanzado', percentage: 92 }
  ];

  setTab(tab: 'backend' | 'frontend' | 'persistence' | 'cloud') {
    this.activeTab.set(tab);
  }
}
