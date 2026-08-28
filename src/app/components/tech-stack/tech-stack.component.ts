import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

export interface TechItem {
  name: string;
  category: 'Backend' | 'Frontend' | 'DevOps & Cloud';
  logoUrl: string;
  glowColor: string; // Used for hover glow effects
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, MouseFollowDirective],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss']
})
export class TechStackComponent {
  techs: TechItem[] = [
    {
      name: 'Java',
      category: 'Backend',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      glowColor: 'rgba(224, 111, 36, 0.15)'
    },
    {
      name: 'Spring Boot',
      category: 'Backend',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      glowColor: 'rgba(109, 179, 63, 0.15)'
    },
    {
      name: 'Angular',
      category: 'Frontend',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
      glowColor: 'rgba(221, 0, 49, 0.15)'
    },
    {
      name: 'Docker',
      category: 'DevOps & Cloud',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      glowColor: 'rgba(36, 150, 237, 0.15)'
    },
    {
      name: 'AWS',
      category: 'DevOps & Cloud',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      glowColor: 'rgba(255, 153, 0, 0.15)'
    },
    {
      name: 'Terraform',
      category: 'DevOps & Cloud',
      logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      glowColor: 'rgba(132, 79, 236, 0.15)'
    }
  ];
}
