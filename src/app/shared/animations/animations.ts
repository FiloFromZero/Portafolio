import { trigger, style, transition, animate, state } from '@angular/animations';

const reducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(25px)' }),
    animate(
      reducedMotion ? '0s' : '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ])
]);

export const fadeInOverlay = trigger('fadeInOverlay', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(reducedMotion ? '0s' : '0.3s ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate(reducedMotion ? '0s' : '0.25s ease-in', style({ opacity: 0 }))
  ])
]);

export const popupModal = trigger('popupModal', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.88) translateY(20px)' }),
    animate(
      reducedMotion ? '0s' : '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      style({ opacity: 1, transform: 'scale(1) translateY(0)' })
    )
  ]),
  transition(':leave', [
    animate(
      reducedMotion ? '0s' : '0.25s cubic-bezier(0.4, 0, 1, 1)',
      style({ opacity: 0, transform: 'scale(0.92) translateY(12px)' })
    )
  ])
]);

