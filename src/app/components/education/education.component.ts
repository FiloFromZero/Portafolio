import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educationList: EducationItem[] = [
    {
      institution: 'Universidad Distrital Francisco José de Caldas',
      degree: 'Ingeniería de Sistemas',
      period: '2020 — 2026',
      location: 'Bogotá, Colombia',
      description: 'Enfoque en arquitectura de software, bases de datos espaciales, sistemas distribuidos e integración cloud.'
    }
  ];

  certificationsList: CertificationItem[] = [
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
  ];
}
